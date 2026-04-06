import { useState } from "react";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", query: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/919010291295?text=${encodeURIComponent(
    `Hi, Nakshatra foods, May I have your time !!! I have a query.\nName: ${form.name}\nPhone: ${form.phone}\nQuery: ${form.query}`
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container mx-auto px-4 pt-4 pb-16 max-w-lg">
        <h1 className="font-navbar text-2xl md:text-3xl font-bold text-foreground text-center mb-2">Get in Touch</h1>
        <p className="font-body text-muted-foreground text-center text-sm mb-8">Questions, bulk orders, or just want to say hi. We're here.</p>

        {submitted ? (
          <div className="text-center py-12">
            <p className="font-navbar text-xl font-bold text-foreground mb-2">Message sent!</p>
            <p className="font-body text-muted-foreground text-sm">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              required
              maxLength={100}
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              required
              maxLength={15}
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              required
              maxLength={255}
              type="email"
              placeholder="Email ID"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              placeholder="Your query or message..."
              maxLength={1000}
              value={form.query}
              onChange={e => setForm(f => ({ ...f, query: e.target.value }))}
              rows={4}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />

            <button
              type="submit"
              className="w-full font-body font-semibold text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#FF8900" }}
            >
              Send Message
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 font-body font-semibold text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact via WhatsApp
            </a>
          </form>
        )}

        {/* Map Placeholder */}
        <div className="mt-8 w-full aspect-video rounded-2xl bg-muted border border-border flex items-center justify-center">
          <span className="font-body text-muted-foreground text-xs uppercase tracking-widest">Location Map</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
