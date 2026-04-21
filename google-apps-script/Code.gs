/**
 * ═══════════════════════════════════════════════════════════════
 *  NAKSHATRA FOODS — ORDERS & LEADS WEBHOOK
 *  Google Apps Script (Web App) backing the Nakshatra site.
 *
 *  WHAT THIS DOES
 *   1. Receives orders + abandoned-cart leads from the site
 *   2. Writes them to the "Orders" / "Leads" tabs in this Sheet
 *   3. Sends the customer a branded HTML confirmation email
 *   4. Pings the owner instantly on Telegram for real orders
 *   5. Holds leads for ~20 min before deciding if they're abandoned
 *      (a time-based trigger sweeps them — see installSweepTrigger)
 *   6. Serves order status to the /track page on the site
 *
 *  HOW TO DEPLOY
 *   Extensions → Apps Script → paste this file → Save →
 *   Deploy → New deployment → Type: Web app →
 *   Execute as: Me  ·  Who has access: Anyone → Deploy →
 *   Copy the Web App URL → hand to the frontend.
 *
 *   If you ever change anything in this file,
 *   Deploy → Manage deployments → pencil icon → Version: New → Deploy
 *   (otherwise the old code keeps running).
 *
 *  ONE-TIME SETUP FOR LEAD SWEEP
 *   In the Apps Script editor, run `installSweepTrigger` once.
 *   It schedules `sweepPendingLeads` to run every 15 minutes.
 *   You can also run `sweepPendingLeads` manually any time.
 * ═══════════════════════════════════════════════════════════════
 */

const CONFIG = {
  // Telegram — where the owner gets instant order alerts
  TELEGRAM_BOT_TOKEN: '8545731342:AAEE-H40y2tIeb1X_nj7bEFe0mvft5-5ik0',
  TELEGRAM_CHAT_ID:   '1006955161',

  // Brand + links that appear in customer emails
  BRAND_NAME:     'Nakshatra Foods',
  SITE_URL:       'https://nakshatrafoods.in',
  LOGO_URL:       'https://pub-f43385626ccb4562b4a9240e54322e61.r2.dev/Nakshatra%20Logo.png',
  OWNER_WHATSAPP: '919840247628',            // no +, no spaces — for wa.me links
  SUPPORT_EMAIL:  'quazrelevate@gmail.com',  // Reply-To on customer emails

  // Delivery promise (used for "Expected by" in the email)
  DELIVERY_DAYS: 2,

  // How long to wait before deciding a lead is truly abandoned.
  // Covers OTP delays, back-and-forth, bathroom breaks, etc.
  LEAD_ABANDON_AFTER_MINUTES: 20,

  // Sheet tab names — must match exactly
  SHEETS: {
    ORDERS: 'Orders',
    LEADS:  'Leads',
  },
};


/* ───────────────────────────────────────────────────────────
 *  ENTRY POINTS
 * ─────────────────────────────────────────────────────────── */

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.type === 'order') return handleOrder(body);
    if (body.type === 'lead')  return handleLead(body);
    return json({ ok: false, error: 'Unknown payload type' });
  } catch (err) {
    // Always log so failures show up in Executions
    console.error('doPost failed', err);
    return json({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const action = (e.parameter && e.parameter.action) || '';
  if (action === 'track') {
    return handleTrack(e.parameter.orderId, e.parameter.phone);
  }
  // Health check — useful to visit the Web App URL in a browser
  return json({ ok: true, service: 'Nakshatra Orders Webhook', time: new Date().toISOString() });
}


/* ───────────────────────────────────────────────────────────
 *  ORDER FLOW
 * ─────────────────────────────────────────────────────────── */

function handleOrder(data) {
  const sheet = getSheet(CONFIG.SHEETS.ORDERS);
  ensureHeaders(sheet, [
    'Order ID', 'Date', 'Name', 'Phone', 'Email',
    'Items', 'Subtotal', 'Payment Method', 'Payment ID',
    'Address', 'Delivery Instructions',
    'Status', 'Courier', 'AWB / Tracking',
    'WhatsApp Confirm', 'Confirmation Sent?', 'Notes',
  ]);

  const orderId = data.orderId || generateOrderId();
  const whatsappMsg = buildCustomerWhatsAppMessage(data, orderId);
  const whatsappLink = `https://wa.me/91${data.phone}?text=${encodeURIComponent(whatsappMsg)}`;
  const hyperlink = `=HYPERLINK("${whatsappLink}","📱 Send")`;

  sheet.appendRow([
    orderId,
    new Date(),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.items || '',
    data.subtotal || '',
    (data.paymentMethod || '').toUpperCase(),
    data.paymentId || '',
    data.address || '',
    data.deliveryInstructions || '',
    'New',            // Status
    '',               // Courier
    '',               // AWB
    hyperlink,        // WhatsApp link
    false,            // Confirmation Sent? (checkbox)
    '',               // Notes
  ]);

  applyOrdersFormatting(sheet);

  // Customer confirmation email (branded HTML)
  if (data.email) {
    try { sendCustomerEmail(data, orderId); }
    catch (err) { console.error('Email failed', err); }
  }

  // Owner alert on Telegram
  const telegramMsg =
    `🛒 *NEW ORDER* — ${orderId}\n\n` +
    `👤 ${escapeMd(data.name)}\n` +
    `📱 +91 ${data.phone}\n` +
    `💰 ₹${data.subtotal}  ·  ${String(data.paymentMethod || '').toUpperCase()}\n\n` +
    `${escapeMd(String(data.items || '').split('\n').join(', '))}\n\n` +
    `📍 ${escapeMd(data.address)}` +
    (data.deliveryInstructions ? `\n📝 ${escapeMd(data.deliveryInstructions)}` : '');

  try { sendTelegram(telegramMsg); }
  catch (err) { console.error('Telegram failed', err); }

  // Any matching Pending leads from this phone → mark Converted immediately
  try { markLeadsConvertedForPhone(data.phone); }
  catch (err) { console.error('Lead conversion sweep failed', err); }

  return json({ ok: true, orderId });
}


/* ───────────────────────────────────────────────────────────
 *  LEAD / ABANDONED-CART FLOW
 *
 *  New behavior:
 *   - handleLead just records a "Pending" lead. No alerts.
 *   - sweepPendingLeads (scheduled every 15 min) decides which
 *     Pending leads are truly abandoned (no matching order within
 *     LEAD_ABANDON_AFTER_MINUTES) and only then fires Telegram.
 *   - Orders immediately mark matching Pending leads as Converted.
 * ─────────────────────────────────────────────────────────── */

const LEAD_HEADERS = [
  'Date', 'Name', 'Phone', 'Items in Cart',
  'Estimated Total', 'Dropped At',
  'WhatsApp Recovery', 'Status', 'Notified?', 'Recovered?', 'Notes',
];

function handleLead(data) {
  const sheet = getSheet(CONFIG.SHEETS.LEADS);
  ensureHeaders(sheet, LEAD_HEADERS);
  ensureLeadColumns(sheet);  // migrates older sheets that predate Status

  const recoveryMsg =
    `Hi ${data.name || ''}! 👋\n\n` +
    `Noticed your pickles got left behind in the cart 🌶️ — anything I can help with?\n\n` +
    `Here's a little something to come back: WELCOME10 (10% off)\n` +
    `${CONFIG.SITE_URL}/billing\n\n` +
    `— Ruban, Nakshatra Foods`;
  const recoveryLink = `https://wa.me/91${data.phone}?text=${encodeURIComponent(recoveryMsg)}`;
  const hyperlink = `=HYPERLINK("${recoveryLink}","📱 Recover")`;

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.items || '',
    data.total || '',
    data.step || 'Contact',
    hyperlink,
    'Pending',    // Status  ← NEW
    false,        // Notified? (checkbox) — flipped when Telegram fires
    false,        // Recovered?
    '',           // Notes
  ]);

  applyLeadsFormatting(sheet);

  // NO Telegram here. We wait until sweepPendingLeads confirms abandonment.
  return json({ ok: true, queued: true });
}

/**
 * Called from handleOrder. Any Leads rows with this phone that are
 * still Pending (or previously Abandoned) get flipped to Converted so
 * they stop showing up as "to recover" in the dashboard.
 */
function markLeadsConvertedForPhone(phone) {
  if (!phone) return;
  const sheet = getSheet(CONFIG.SHEETS.LEADS);
  if (sheet.getLastRow() < 2) return;

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const phoneCol  = headers.indexOf('Phone') + 1;
  const statusCol = headers.indexOf('Status') + 1;
  if (phoneCol === 0 || statusCol === 0) return;

  const lastRow = sheet.getLastRow();
  const phones  = sheet.getRange(2, phoneCol,  lastRow - 1, 1).getValues();
  const statuses = sheet.getRange(2, statusCol, lastRow - 1, 1).getValues();

  for (let i = 0; i < phones.length; i++) {
    const ph = String(phones[i][0] || '').trim();
    const st = String(statuses[i][0] || '').trim();
    if (ph === String(phone).trim() && (st === 'Pending' || st === 'Abandoned' || st === '')) {
      sheet.getRange(i + 2, statusCol).setValue('Converted');
    }
  }
}

/**
 * Time-based trigger target. Runs every 15 min (see installSweepTrigger).
 *
 * For each Pending lead older than LEAD_ABANDON_AFTER_MINUTES:
 *   - If an Order with the same phone was created after the lead → Converted (silent)
 *   - Else → Abandoned + fire one Telegram and flip Notified? = true
 *
 * Safe to run manually any time.
 */
function sweepPendingLeads() {
  const leadsSheet  = getSheet(CONFIG.SHEETS.LEADS);
  const ordersSheet = getSheet(CONFIG.SHEETS.ORDERS);
  ensureLeadColumns(leadsSheet);

  if (leadsSheet.getLastRow() < 2) return;

  const lHeaders = leadsSheet.getRange(1, 1, 1, leadsSheet.getLastColumn()).getValues()[0];
  const col = {
    date:     lHeaders.indexOf('Date') + 1,
    phone:    lHeaders.indexOf('Phone') + 1,
    status:   lHeaders.indexOf('Status') + 1,
    notified: lHeaders.indexOf('Notified?') + 1,
    name:     lHeaders.indexOf('Name') + 1,
    items:    lHeaders.indexOf('Items in Cart') + 1,
    total:    lHeaders.indexOf('Estimated Total') + 1,
    step:     lHeaders.indexOf('Dropped At') + 1,
  };
  if (col.date === 0 || col.status === 0 || col.phone === 0) return;

  // Build a Set of phones that have placed an order (with lead->order time map)
  const orderPhonesByDate = buildOrderPhoneIndex(ordersSheet);

  const lastRow = leadsSheet.getLastRow();
  const numRows = lastRow - 1;
  const range   = leadsSheet.getRange(2, 1, numRows, leadsSheet.getLastColumn());
  const values  = range.getValues();

  const now = new Date();
  const cutoffMs = CONFIG.LEAD_ABANDON_AFTER_MINUTES * 60 * 1000;

  for (let i = 0; i < values.length; i++) {
    const rowIdx = i + 2;
    const status = String(values[i][col.status - 1] || '').trim();
    if (status !== 'Pending' && status !== '') continue;

    const leadDate = values[i][col.date - 1];
    if (!(leadDate instanceof Date)) continue;
    if (now.getTime() - leadDate.getTime() < cutoffMs) continue; // too young, wait

    const phone = String(values[i][col.phone - 1] || '').trim();

    // Did this phone place an order AFTER the lead was captured?
    const orderTimes = orderPhonesByDate[phone] || [];
    const converted = orderTimes.some(t => t.getTime() >= leadDate.getTime() - 60 * 1000);

    if (converted) {
      leadsSheet.getRange(rowIdx, col.status).setValue('Converted');
      continue;
    }

    // Truly abandoned. Mark + notify once.
    leadsSheet.getRange(rowIdx, col.status).setValue('Abandoned');
    if (col.notified > 0) leadsSheet.getRange(rowIdx, col.notified).setValue(true);

    const name  = String(values[i][col.name  - 1] || '');
    const items = String(values[i][col.items - 1] || 'N/A');
    const total = values[i][col.total - 1];
    const step  = String(values[i][col.step  - 1] || 'Contact');

    const ageMin = Math.round((now.getTime() - leadDate.getTime()) / 60000);

    const telegramMsg =
      `⚠️ *Abandoned Cart*\n\n` +
      `👤 ${escapeMd(name)}\n` +
      `📱 +91 ${phone}\n` +
      `🛒 ${escapeMd(items)}\n` +
      `💰 ₹${total || '—'}\n` +
      `↩ Dropped at: *${escapeMd(step)}*  ·  ${ageMin} min ago`;

    try { sendTelegram(telegramMsg); }
    catch (err) { console.error('Telegram (abandoned) failed', err); }
  }
}

/** Map of phone → [order dates], built once per sweep. */
function buildOrderPhoneIndex(ordersSheet) {
  const index = {};
  if (ordersSheet.getLastRow() < 2) return index;
  const headers = ordersSheet.getRange(1, 1, 1, ordersSheet.getLastColumn()).getValues()[0];
  const phoneCol = headers.indexOf('Phone');
  const dateCol  = headers.indexOf('Date');
  if (phoneCol === -1 || dateCol === -1) return index;

  const values = ordersSheet.getRange(2, 1, ordersSheet.getLastRow() - 1, ordersSheet.getLastColumn()).getValues();
  for (const row of values) {
    const ph = String(row[phoneCol] || '').trim();
    const dt = row[dateCol];
    if (!ph || !(dt instanceof Date)) continue;
    if (!index[ph]) index[ph] = [];
    index[ph].push(dt);
  }
  return index;
}

/**
 * Run this ONCE from the Apps Script editor. Schedules sweepPendingLeads
 * to run every 15 minutes. Safe to re-run — it removes any older copy first.
 */
function installSweepTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const t of triggers) {
    if (t.getHandlerFunction() === 'sweepPendingLeads') {
      ScriptApp.deleteTrigger(t);
    }
  }
  ScriptApp.newTrigger('sweepPendingLeads')
    .timeBased()
    .everyMinutes(15)
    .create();
  console.log('Sweep trigger installed — runs every 15 minutes.');
}

/**
 * Migrates pre-existing Leads sheets that don't yet have the Status /
 * Notified? columns. Safe to call every time handleLead runs.
 */
function ensureLeadColumns(sheet) {
  if (sheet.getLastRow() === 0) return;
  const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
  const needed = ['Status', 'Notified?'];
  let added = false;
  for (const name of needed) {
    if (headers.indexOf(name) === -1) {
      const newCol = sheet.getLastColumn() + 1;
      sheet.getRange(1, newCol).setValue(name);
      sheet.getRange(1, newCol).setFontWeight('bold').setBackground('#FFF3E0').setFontColor('#5D2E00');
      added = true;
      headers.push(name);
    }
  }
  if (added) SpreadsheetApp.flush();
}


/* ───────────────────────────────────────────────────────────
 *  TRACKING ENDPOINT (used by /track page on the site)
 * ─────────────────────────────────────────────────────────── */

function handleTrack(orderId, phone) {
  if (!orderId || !phone) {
    return json({ ok: false, error: 'Missing orderId or phone' });
  }

  const sheet = getSheet(CONFIG.SHEETS.ORDERS);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return json({ ok: false, error: 'Order not found' });

  const headers = values[0];
  const idx = {
    id:       headers.indexOf('Order ID'),
    date:     headers.indexOf('Date'),
    name:     headers.indexOf('Name'),
    phone:    headers.indexOf('Phone'),
    items:    headers.indexOf('Items'),
    subtotal: headers.indexOf('Subtotal'),
    status:   headers.indexOf('Status'),
    courier:  headers.indexOf('Courier'),
    awb:      headers.indexOf('AWB / Tracking'),
  };

  const row = values.find((r, i) =>
    i > 0 &&
    String(r[idx.id]).trim() === String(orderId).trim() &&
    String(r[idx.phone]).trim() === String(phone).trim()
  );

  if (!row) {
    return json({ ok: false, error: 'Order not found. Check your order ID and phone.' });
  }

  return json({
    ok: true,
    orderId: row[idx.id],
    date:    row[idx.date] instanceof Date ? row[idx.date].toISOString() : row[idx.date],
    name:    row[idx.name],
    items:   row[idx.items],
    subtotal: row[idx.subtotal],
    status:  row[idx.status] || 'New',
    courier: row[idx.courier] || '',
    awb:     row[idx.awb] || '',
  });
}


/* ───────────────────────────────────────────────────────────
 *  EMAIL TO CUSTOMER
 * ─────────────────────────────────────────────────────────── */

function sendCustomerEmail(data, orderId) {
  const trackLink = `${CONFIG.SITE_URL}/track?id=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(data.phone)}`;
  const waOwnerLink = `https://wa.me/${CONFIG.OWNER_WHATSAPP}`;

  const d = new Date();
  d.setDate(d.getDate() + CONFIG.DELIVERY_DAYS);
  const expected = Utilities.formatDate(d, 'Asia/Kolkata', 'EEE, d MMM yyyy');

  const itemsHtml = String(data.items || '')
    .split('\n')
    .filter(Boolean)
    .map(line => `<div style="padding:6px 0;border-bottom:1px dashed #eee;color:#444;font-size:14px;">${escapeHtml(line)}</div>`)
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:24px 12px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.04);">
        <tr><td style="padding:28px 32px 8px;text-align:center;">
          <img src="${CONFIG.LOGO_URL}" alt="Nakshatra Foods" style="height:56px;" />
        </td></tr>
        <tr><td style="padding:0 32px 8px;text-align:center;">
          <div style="display:inline-block;background:#E6F9F0;color:#166534;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:600;letter-spacing:.5px;">
            ✓ PAYMENT RECEIVED
          </div>
          <h1 style="color:#FF8900;font-size:26px;margin:14px 0 6px;">Order Confirmed</h1>
          <p style="color:#666;margin:0;font-size:15px;">Hi ${escapeHtml(data.name)}, your pickle is being packed fresh 🧡</p>
        </td></tr>

        <tr><td style="padding:20px 32px 0;">
          <div style="background:#FAF7F2;border-radius:10px;padding:14px 16px;">
            <div style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Order Number</div>
            <div style="font-size:18px;font-weight:700;color:#222;margin-top:2px;letter-spacing:.5px;">${escapeHtml(orderId)}</div>
          </div>
        </td></tr>

        <tr><td style="padding:22px 32px 0;">
          <div style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Your Order</div>
          ${itemsHtml}
          <div style="padding:12px 0 0;text-align:right;font-size:18px;font-weight:700;color:#FF8900;">
            Total Paid: ₹${escapeHtml(String(data.subtotal || ''))}
          </div>
        </td></tr>

        <tr><td style="padding:20px 32px 0;">
          <div style="background:#E6F9F0;border-radius:10px;padding:14px 16px;color:#166534;font-size:14px;">
            📦 <strong>Expected delivery: ${expected}</strong><br>
            <span style="font-size:13px;color:#3f8a5e;">Shipped within 24 hours · Delivered in ${CONFIG.DELIVERY_DAYS} days</span>
          </div>
        </td></tr>

        <tr><td style="padding:20px 32px 0;">
          <div style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Delivery Address</div>
          <div style="color:#444;font-size:14px;line-height:1.6;">
            ${escapeHtml(data.name)}<br>
            +91 ${escapeHtml(String(data.phone || ''))}<br>
            ${escapeHtml(data.address)}
          </div>
        </td></tr>

        <tr><td style="padding:26px 32px 8px;text-align:center;">
          <a href="${trackLink}" style="display:inline-block;background:#FF8900;color:#fff;padding:13px 30px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
            🔍 Track Your Order
          </a>
        </td></tr>

        <tr><td style="padding:8px 32px 24px;text-align:center;">
          <p style="color:#999;font-size:13px;margin:10px 0 4px;">
            You'll receive a personal confirmation on WhatsApp within 10 minutes.
          </p>
          <p style="color:#666;font-size:13px;margin:0;">
            Questions? <a href="${waOwnerLink}" style="color:#FF8900;text-decoration:none;font-weight:600;">WhatsApp us</a>
          </p>
        </td></tr>

        <tr><td style="padding:18px 32px;background:#FAF7F2;text-align:center;color:#999;font-size:12px;">
          Made with love in Chennai 🧡 · Team Nakshatra<br>
          <a href="${CONFIG.SITE_URL}" style="color:#aaa;text-decoration:none;">${CONFIG.SITE_URL.replace('https://', '')}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  MailApp.sendEmail({
    to: data.email,
    subject: `✓ Your Nakshatra Pickle order is confirmed — ${orderId}`,
    htmlBody: html,
    name: CONFIG.BRAND_NAME,
    replyTo: CONFIG.SUPPORT_EMAIL,
  });
}

function buildCustomerWhatsAppMessage(data, orderId) {
  return (
    `Hi ${data.name}! 🎉\n\n` +
    `Your Nakshatra Pickle order is confirmed!\n\n` +
    `Order: ${orderId}\n` +
    `${data.items}\n` +
    `Total Paid: ₹${data.subtotal}\n\n` +
    `📦 Shipping within 24 hours — expected delivery in 2 days.\n` +
    `🔍 Track: ${CONFIG.SITE_URL}/track?id=${orderId}&phone=${data.phone}\n\n` +
    `Thank you for ordering with us! 🧡\n— Team Nakshatra`
  );
}


/* ───────────────────────────────────────────────────────────
 *  TELEGRAM
 * ─────────────────────────────────────────────────────────── */

function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
  UrlFetchApp.fetch(url, {
    method: 'post',
    payload: {
      chat_id: CONFIG.TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'Markdown',
      disable_web_page_preview: 'true',
    },
    muteHttpExceptions: true,
  });
}

// Optional: run once from the Apps Script editor to confirm Telegram works
function testTelegram() {
  sendTelegram('✅ Telegram wired up. Orders will land here.');
}


/* ───────────────────────────────────────────────────────────
 *  SHEET HELPERS
 * ─────────────────────────────────────────────────────────── */

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#FFF3E0')
      .setFontColor('#5D2E00');
    sheet.setFrozenRows(1);
    // Reasonable column widths
    sheet.setColumnWidth(1, 150);
    for (let i = 2; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 140);
    }
  }
}

function applyOrdersFormatting(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const statusCol = headers.indexOf('Status') + 1;
  const sentCol   = headers.indexOf('Confirmation Sent?') + 1;

  // Status dropdown
  if (statusCol > 0) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['New', 'Confirmed', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, statusCol, lastRow - 1, 1).setDataValidation(rule);
  }

  // Checkbox for "Confirmation Sent?"
  if (sentCol > 0) {
    sheet.getRange(2, sentCol, lastRow - 1, 1).insertCheckboxes();
  }
}

function applyLeadsFormatting(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  const statusCol   = headers.indexOf('Status') + 1;
  const notifiedCol = headers.indexOf('Notified?') + 1;
  const recCol      = headers.indexOf('Recovered?') + 1;

  if (statusCol > 0) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Pending', 'Converted', 'Abandoned'], true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(2, statusCol, lastRow - 1, 1).setDataValidation(rule);
  }
  if (notifiedCol > 0) {
    sheet.getRange(2, notifiedCol, lastRow - 1, 1).insertCheckboxes();
  }
  if (recCol > 0) {
    sheet.getRange(2, recCol, lastRow - 1, 1).insertCheckboxes();
  }
}


/* ───────────────────────────────────────────────────────────
 *  MISC HELPERS
 * ─────────────────────────────────────────────────────────── */

function generateOrderId() {
  const d = new Date();
  const ymd = Utilities.formatDate(d, 'Asia/Kolkata', 'yyyyMMdd');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NKS-${ymd}-${rand}`;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeMd(str) {
  // Light escape for Telegram Markdown
  return String(str == null ? '' : str).replace(/([*_`\[])/g, '\\$1');
}
