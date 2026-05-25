import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";
import PillTag from "../../components/ui/PillTag";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const features = [
  {
    tag: "Language",
    headline: "It understands the way you actually talk.",
    body: "Your customers don't write in perfect English. They say 'bhai 5kg aata bhejo' or 'ek daal ka packet dena'. Snapdo gets it — Hinglish, Hindi, regional shortcuts, informal phrasing. No training, no setup. It just works.",
    visual: (
      <div className="rounded-xl overflow-hidden shadow-elev-2" style={{ backgroundColor: "#111B21" }}>
        <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#1F2C34" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-[600]" style={{ backgroundColor: "#25D366", color: "#111B21" }}>S</div>
          <p className="text-caption text-on-primary font-[500]">Suresh Provision Store</p>
          <img src="/WhatsApp_Logo_0.svg" alt="WhatsApp" className="h-3 ml-auto opacity-50" />
        </div>
        <div className="p-4 flex flex-col gap-3">
          {[
            "bhai ek box maggi, 2 packet namkeen, teen wala surf excel",
            "aur haan pichle baar wala oil bhi dena, same brand",
          ].map((msg, i) => (
            <div key={i} className="flex justify-start">
              <div className="max-w-[90%] rounded-xl rounded-tl-sm px-3 py-2" style={{ backgroundColor: "#1F2C34" }}>
                <p className="text-caption text-on-primary">{msg}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-1">
            <span className="text-micro px-3 py-1 rounded-pill font-[500]" style={{ backgroundColor: "#E6FFDA", color: "#111B21" }}>
              ✓ 4 items extracted
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "Invoices",
    headline: "GST invoices in one tap. No accountant needed.",
    body: "Every confirmed order can become a proper GST invoice in seconds. CGST, SGST, IGST — Snapdo calculates it based on your state and the customer's. Download it as a PDF, share it on WhatsApp, done.",
    visual: (
      <div className="bg-canvas-light rounded-xl border border-hairline-light p-6 shadow-elev-3">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-heading-md text-ink">TAX INVOICE</p>
            <p className="text-micro text-shade-50 mt-1">INV-2026-0284</p>
          </div>
          <span className="text-micro rounded-pill px-3 py-1 font-[500]" style={{ backgroundColor: "#E6FFDA", color: "#111B21" }}>Paid</span>
        </div>
        <div className="flex flex-col gap-2 mb-5">
          {[
            { name: "Basmati Rice 25kg", amount: "₹3,000" },
            { name: "Toor Dal 10kg", amount: "₹1,450" },
            { name: "Surf Excel 1kg × 3", amount: "₹540" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between py-1.5 border-b border-hairline-light last:border-0">
              <span className="text-caption text-shade-50">{item.name}</span>
              <span className="text-caption text-ink font-[500]">{item.amount}</span>
            </div>
          ))}
        </div>
        <div className="bg-canvas-cream rounded-lg p-3 flex flex-col gap-1.5">
          <div className="flex justify-between text-micro text-shade-50"><span>CGST (9%)</span><span>₹446</span></div>
          <div className="flex justify-between text-micro text-shade-50"><span>SGST (9%)</span><span>₹446</span></div>
          <div className="flex justify-between text-caption text-ink font-[600] pt-1 border-t border-hairline-light mt-1">
            <span>Total</span><span>₹5,882</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "Orders",
    headline: "Every order saved. Nothing ever lost.",
    body: "Every order you extract is saved automatically. Search by customer name, filter by date, see what's pending, what's delivered, what's cancelled. No more digging through WhatsApp chats to find what Ramesh ordered last Tuesday.",
    visual: (
      <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden">
        <div className="px-5 py-4 border-b border-hairline-light flex items-center justify-between">
          <p className="text-heading-md text-ink">Recent orders</p>
          <span className="text-micro text-shade-50">148 this month</span>
        </div>
        {[
          { name: "Ramesh Enterprises", items: "Aata, Daal, Tel", total: "₹8,450", status: "Pending", bg: "#d4d4d8", fg: "#3f3f46" },
          { name: "Sharma Kirana", items: "Rice, Sugar, Namkeen", total: "₹12,300", status: "Confirmed", bg: "#E6FFDA", fg: "#111B21" },
          { name: "Mehta Traders", items: "Sunflower Oil × 20", total: "₹9,800", status: "Delivered", bg: "#d4f9e0", fg: "#111B21" },
        ].map((order, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-hairline-light last:border-0">
            <div>
              <p className="text-caption text-ink font-[500]">{order.name}</p>
              <p className="text-micro text-shade-50">{order.items}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-caption text-ink font-[500]">{order.total}</span>
              <span className="text-micro rounded-pill px-2.5 py-0.5 font-[500]" style={{ backgroundColor: order.bg, color: order.fg }}>{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "Analytics",
    headline: "See your business growing, week by week.",
    body: "Which customers order the most? Which days are busiest? What's your revenue this month vs last? Snapdo shows you the numbers that matter — so you can make better decisions without hiring an accountant.",
    visual: (
      <div className="bg-canvas-light rounded-xl border border-hairline-light p-6 shadow-elev-3">
        <p className="text-heading-md text-ink mb-5">May 2026</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Total revenue", value: "₹4,32,500", note: "↑ 12% vs last month", up: true },
            { label: "Orders", value: "148", note: "↑ 8% vs last month", up: true },
            { label: "Avg order value", value: "₹2,922", note: "↓ 3% vs last month", up: false },
            { label: "Top customer", value: "Sharma Kirana", note: null, up: null },
          ].map((stat, i) => (
            <div key={i} className="bg-canvas-cream rounded-lg p-3">
              <p className="text-micro text-shade-50">{stat.label}</p>
              <p className="text-heading-md text-ink mt-1">{stat.value}</p>
              {stat.note && (
                <p className="text-micro mt-0.5 font-[500]" style={{ color: stat.up ? "#25D366" : "#ef4444" }}>{stat.note}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-1 items-end h-14">
          {[40, 60, 45, 80, 65, 90, 55, 75, 85, 70, 95, 100, 88, 72].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: i === 12 ? "#25D366" : "#E6FFDA" }} />
          ))}
        </div>
        <p className="text-micro text-shade-40 mt-2 text-center">Daily orders — last 14 days</p>
      </div>
    ),
  },
  {
    tag: "Privacy",
    headline: "Your business data belongs to you. Always.",
    body: "Your orders, your customers, your revenue — no one else can see it. Every business on Snapdo is completely isolated. We don't sell your data, we don't share it, and you can delete everything any time.",
    visual: (
      <div className="bg-canvas-night rounded-xl p-6 shadow-elev-1">
        <div className="flex flex-col gap-3">
          {[
            { icon: "🔒", title: "Encrypted end-to-end", body: "All data travels and rests encrypted. No one can intercept your orders." },
            { icon: "🏠", title: "Your space, only yours", body: "Your account is completely separate from every other business on Snapdo." },
            { icon: "🗑️", title: "Delete any time", body: "Request full deletion of your data at any time. No questions asked." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: "#1F2C34" }}>
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-caption text-on-primary font-[500]">{item.title}</p>
                <p className="text-micro text-shade-40 mt-1">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Features() {
  return (
    <div>
      {/* ── DARK: Hero ───────────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 pt-32 pb-24 text-center">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl">
          <PillTag variant="mint" className="mb-6">Features</PillTag>
          <h1 className="text-display-xl text-on-primary">
            Built for the way Indian<br />businesses actually work.
          </h1>
          <p className="mt-6 text-body-lg text-shade-40 max-w-xl mx-auto">
            No complicated setup. No training. Just paste a WhatsApp message and get a structured order and a GST invoice.
          </p>
        </motion.div>
      </section>

      {/* ── Alternating feature sections ─────────────────── */}
      {features.map((feature, i) => {
        const dark = i % 2 !== 0;
        return (
          <section key={i} className={`px-6 py-24 ${dark ? "bg-canvas-night" : "bg-canvas-cream"}`}>
            <div className="mx-auto max-w-5xl">
              <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <PillTag variant={dark ? "shade" : "mint"} className="mb-5">{feature.tag}</PillTag>
                  <h2 className={`text-display-md mb-5 ${dark ? "text-on-primary" : "text-ink"}`}>
                    {feature.headline}
                  </h2>
                  <p className={`text-body-lg ${dark ? "text-shade-40" : "text-shade-50"}`}>
                    {feature.body}
                  </p>
                </div>
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  {feature.visual}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ── DARK: CTA ─────────────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 py-28 text-center border-t border-hairline-dark">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl">
          <h2 className="text-display-md text-on-primary mb-6">
            Ready to stop managing orders by hand?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sign-up"><Button variant="primary" size="lg">Start for free</Button></Link>
            <Link to="/pricing"><Button variant="outline-dark" size="lg">See pricing <ArrowRight size={16} /></Button></Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
