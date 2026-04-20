import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Package, Truck, Home, Search, MessageCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { trackOrder, TrackResult } from "@/lib/sheetsApi";

const OWNER_WHATSAPP = "919840247628";

// Order of status progression, used to light up the timeline.
const STATUS_ORDER = ["New", "Confirmed", "Packed", "Dispatched", "Delivered"] as const;
type StatusKey = (typeof STATUS_ORDER)[number];

const statusRank = (s: string) => {
  const i = STATUS_ORDER.indexOf(s as StatusKey);
  return i === -1 ? 0 : i;
};

const Track = () => {
  const [params] = useSearchParams();
  const initialId = params.get("id") || "";
  const initialPhone = params.get("phone") || "";

  const [orderId, setOrderId] = useState(initialId);
  const [phone, setPhone] = useState(initialPhone);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const runLookup = async (id: string, ph: string) => {
    if (!id.trim() || !/^\d{10}$/.test(ph.trim())) {
      setResult({ ok: false, error: "Enter a valid Order ID and 10-digit phone number." });
      return;
    }
    setLoading(true);
    setTouched(true);
    const r = await trackOrder(id.trim(), ph.trim());
    setResult(r);
    setLoading(false);
  };

  // Auto-lookup if both params were provided (e.g. from the email link)
  useEffect(() => {
    if (initialId && /^\d{10}$/.test(initialPhone)) {
      runLookup(initialId, initialPhone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 max-w-xl">
        <h1 className="font-body text-2xl md:text-3xl font-bold text-foreground mb-1">
          Track Your Order
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Enter your order ID and the phone number used at checkout.
        </p>

        {/* Lookup form */}
        <div className="bg-white rounded-xl border border-border/50 p-5 mb-6 shadow-sm">
          <div className="space-y-3">
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                Order ID
              </label>
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase().trim())}
                placeholder="NKS-20260420-XXXX"
                className="w-full mt-1 px-3 py-2.5 rounded-lg border border-border/60 font-body text-sm text-foreground bg-[#FAF7F2] focus:outline-none focus:border-[#FF8900] focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                Phone Number
              </label>
              <div className="flex gap-2 mt-1">
                <div className="flex items-center px-3 rounded-lg bg-muted border border-border/60 font-body text-sm text-muted-foreground">
                  +91
                </div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit number"
                  inputMode="numeric"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-border/60 font-body text-sm text-foreground bg-[#FAF7F2] focus:outline-none focus:border-[#FF8900] focus:bg-white transition-colors"
                />
              </div>
            </div>
            <button
              onClick={() => runLookup(orderId, phone)}
              disabled={loading}
              className="w-full mt-2 py-3 rounded-lg font-body font-semibold text-white text-sm transition-transform active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#FF8900" }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              {loading ? "Checking..." : "Track Order"}
            </button>
          </div>
        </div>

        {/* Result */}
        {touched && result && !result.ok && !loading && (
          <div className="bg-white rounded-xl border border-red-200 p-5 text-center shadow-sm">
            <p className="font-body text-sm font-semibold text-foreground mb-1">
              Hmm, we couldn't find that order
            </p>
            <p className="font-body text-xs text-muted-foreground mb-4">
              {result.error}
            </p>
            <a
              href={`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(`Hi, I can't find my order ${orderId || ""}. Can you help me track it?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold"
              style={{ color: "#FF8900" }}
            >
              <MessageCircle size={14} />
              Message us on WhatsApp
            </a>
          </div>
        )}

        {result && result.ok && <OrderStatusCard data={result} />}
      </div>
    </div>
  );
};

type OkResult = Extract<TrackResult, { ok: true }>;

const OrderStatusCard = ({ data }: { data: OkResult }) => {
  const rank = statusRank(String(data.status));
  const deliveredAt = rank >= 4;
  const cancelled = String(data.status).toLowerCase() === "cancelled";

  const placedDate = useMemo(() => {
    try {
      return new Date(data.date).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    } catch {
      return "";
    }
  }, [data.date]);

  const waOwner = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(
    `Hi! Following up on my order ${data.orderId}.`
  )}`;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl border border-border/50 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wider">
            Order
          </p>
          <span
            className="font-body text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: cancelled ? "#FEE2E2" : deliveredAt ? "#DCFCE7" : "#FEF3C7",
              color: cancelled ? "#991B1B" : deliveredAt ? "#166534" : "#92400E",
            }}
          >
            {data.status}
          </span>
        </div>
        <p className="font-body text-lg font-bold text-foreground tracking-wide">
          {data.orderId}
        </p>
        <p className="font-body text-xs text-muted-foreground mt-0.5">
          Placed on {placedDate} · {data.name}
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-border/50 p-5 shadow-sm">
        <h2 className="font-body text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
          Progress
        </h2>
        <ol className="space-y-4">
          <TLStep icon={<CheckCircle2 size={16} />} title="Order placed" done last={false} />
          <TLStep
            icon={<Package size={16} />}
            title="Packed fresh"
            done={rank >= 2}
            last={false}
          />
          <TLStep
            icon={<Truck size={16} />}
            title={
              data.awb
                ? `Dispatched · ${data.courier || "Courier"} · ${data.awb}`
                : "Dispatched"
            }
            done={rank >= 3}
            last={false}
          />
          <TLStep
            icon={<Home size={16} />}
            title="Delivered"
            done={rank >= 4}
            last
          />
        </ol>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-border/50 p-5 shadow-sm">
        <h2 className="font-body text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
          Order summary
        </h2>
        <div className="space-y-1 mb-3">
          {String(data.items)
            .split("\n")
            .filter(Boolean)
            .map((line, i) => (
              <p key={i} className="font-body text-sm text-foreground">
                • {line}
              </p>
            ))}
        </div>
        <div className="border-t border-dashed border-border/60 pt-3 flex justify-between items-center">
          <span className="font-body text-sm text-muted-foreground">Total</span>
          <span className="font-body text-lg font-bold" style={{ color: "#FF8900" }}>
            ₹{data.subtotal}
          </span>
        </div>
      </div>

      {/* Help */}
      <a
        href={waOwner}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block py-3.5 rounded-lg font-body font-semibold text-foreground text-sm bg-white border border-border/60 hover:border-foreground/40 transition-colors text-center flex items-center justify-center gap-2"
      >
        <MessageCircle size={16} />
        Questions? Chat with us
      </a>
    </div>
  );
};

const TLStep = ({
  icon,
  title,
  done,
  last,
}: {
  icon: React.ReactNode;
  title: string;
  done: boolean;
  last: boolean;
}) => {
  const color = done ? "bg-green-600 text-white" : "bg-muted text-muted-foreground";
  const titleColor = done ? "text-foreground" : "text-muted-foreground";
  return (
    <li className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
          {icon}
        </div>
        {!last && <div className="w-px flex-1 bg-border/60 mt-1" style={{ minHeight: 18 }} />}
      </div>
      <div className="pb-1">
        <p className={`font-body text-sm font-semibold ${titleColor}`}>{title}</p>
      </div>
    </li>
  );
};

export default Track;
