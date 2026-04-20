/**
 * Thin client for the Google Apps Script webhook that backs
 * the Nakshatra orders + leads pipeline.
 *
 * - POSTs are "fire and forget" — we use `mode: 'no-cors'` so the
 *   browser doesn't issue a CORS preflight that Apps Script can't
 *   answer. We never block the user's flow on these.
 * - GETs (track-order lookup) do support CORS natively and return JSON.
 *
 * Set the webhook URL in `.env.local`:
 *   VITE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXX/exec
 */

const WEBHOOK_URL =
  (import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined) ||
  "https://script.google.com/macros/s/AKfycbw3KNBNeNhmdz9vsAL0dD9vFTUSdF6q0Bkv8_JOz0hRLg-tZJmeUmZuVb3i4J_e93b89g/exec";

export type OrderPayload = {
  orderId: string;
  name: string;
  phone: string;            // 10-digit
  email?: string;
  items: string;            // Multi-line, human-readable
  subtotal: number;
  paymentMethod: "card" | "upi" | "cod";
  paymentId?: string;       // Razorpay payment id, if applicable
  address: string;
  deliveryInstructions?: string;
};

export type LeadPayload = {
  name: string;
  phone: string;            // 10-digit
  items?: string;
  total?: number;
  step: "Contact" | "Address" | "Payment";
};

/** Report a successful order. Never throws. */
export async function reportOrder(payload: OrderPayload): Promise<void> {
  await postSilently({ type: "order", ...payload });
}

/** Report an abandoned-cart lead. Never throws. */
export async function reportLead(payload: LeadPayload): Promise<void> {
  await postSilently({ type: "lead", ...payload });
}

async function postSilently(body: unknown): Promise<void> {
  if (!WEBHOOK_URL) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[sheetsApi] VITE_SHEETS_WEBHOOK_URL not set — skipping POST", body);
    }
    return;
  }
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      // `text/plain` avoids CORS preflight; Apps Script reads raw body.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
      keepalive: true, // so it survives page navigation right after payment
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[sheetsApi] POST failed — continuing silently", err);
  }
}

/** Look up order status for the /track page. */
export type TrackResult =
  | {
      ok: true;
      orderId: string;
      date: string;
      name: string;
      items: string;
      subtotal: number | string;
      status: string;
      courier?: string;
      awb?: string;
    }
  | { ok: false; error: string };

export async function trackOrder(orderId: string, phone: string): Promise<TrackResult> {
  if (!WEBHOOK_URL) {
    return { ok: false, error: "Tracking service is not configured yet." };
  }
  try {
    const url = `${WEBHOOK_URL}?action=track&orderId=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`;
    const res = await fetch(url, { method: "GET" });
    const data = (await res.json()) as TrackResult;
    return data;
  } catch (err) {
    return { ok: false, error: "Could not reach tracking service. Please try again." };
  }
}

/**
 * Client-side order ID generator. Kept in sync with the Apps Script format
 * so what we pass to the webhook matches what the owner sees in the Sheet
 * and what the customer sees on the success page / email.
 *   Format: NKS-YYYYMMDD-XXXX  (XXXX = 4 upper-case alphanumeric)
 */
export function generateOrderId(): string {
  const d = new Date();
  const ymd =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NKS-${ymd}-${rand}`;
}
