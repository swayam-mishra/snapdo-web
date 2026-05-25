import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";
import PillTag from "../../components/ui/PillTag";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

interface UseCaseData {
  title: string;
  hero: string;
  description: string;
  chat: { from: "customer" | "business"; text: string; time: string }[];
  order: { name: string; qty: string; price: string }[];
  total: string;
  benefits: string[];
}

const useCases: Record<string, UseCaseData> = {
  kirana: {
    title: "Kirana stores",
    hero: "From WhatsApp message to invoice in one click.",
    description: "Kirana owners in India receive hundreds of orders daily across multiple WhatsApp chats. Manually entering each order takes hours and introduces errors. Snapdo eliminates that entirely.",
    chat: [
      { from: "customer", text: "bhai aaj 5kg aata, 2 packet maggi, 1 litre sarso tel, 200g jeera bhejna", time: "9:15 AM" },
      { from: "business", text: "✓ Order received. Total: ₹385. Delivery by 12pm.", time: "9:15 AM" },
      { from: "customer", text: "ok bhai aur 500ml shampoo bhi add karo", time: "9:16 AM" },
      { from: "business", text: "✓ Updated. New total: ₹445.", time: "9:16 AM" },
    ],
    order: [
      { name: "Aata", qty: "5 kg", price: "₹250" },
      { name: "Maggi", qty: "2 packets", price: "₹56" },
      { name: "Sarso Tel", qty: "1 litre", price: "₹145" },
      { name: "Jeera", qty: "200 g", price: "₹60" },
      { name: "Shampoo", qty: "500 ml", price: "₹89" },
    ],
    total: "₹600",
    benefits: ["Zero manual data entry", "Auto-detects item updates in follow-up messages", "GST invoice generated instantly on confirm", "Customer order history searchable any time"],
  },
  distributor: {
    title: "FMCG distributors",
    hero: "Manage 50 retailers' orders without breaking a sweat.",
    description: "FMCG distributors coordinate bulk orders from dozens of retailers simultaneously. Each retailer sends orders informally over WhatsApp — often with their own shorthand. Snapdo normalizes all of it.",
    chat: [
      { from: "customer", text: "ramesh bhai: 10 cs bisleri 1L, 5 cs frooti 200ml, 2 cs lays big pack", time: "8:00 AM" },
      { from: "business", text: "✓ Order logged for Ramesh Traders. 17 cases confirmed.", time: "8:00 AM" },
      { from: "customer", text: "aur 3 cs sprite 600ml add kar do", time: "8:02 AM" },
      { from: "business", text: "✓ Updated. Total: 20 cases. Invoice on dispatch.", time: "8:02 AM" },
    ],
    order: [
      { name: "Bisleri 1L", qty: "10 cases", price: "₹1,200" },
      { name: "Frooti 200ml", qty: "5 cases", price: "₹600" },
      { name: "Lays Big Pack", qty: "2 cases", price: "₹480" },
      { name: "Sprite 600ml", qty: "3 cases", price: "₹540" },
    ],
    total: "₹2,820",
    benefits: ["Handles distributor-specific SKU shorthand", "Multiple retailer orders in a single dashboard", "Batch GST invoicing with IGST/CGST auto-detection", "Outstanding order tracking with aging"],
  },
  tiffin: {
    title: "Tiffin services",
    hero: "Daily meal subscriptions on autopilot.",
    description: "Tiffin services deal with a mix of daily subscription customers and one-off requests. Customers send messages about skipping days, changing items, or adding extras. Snapdo tracks all of it.",
    chat: [
      { from: "customer", text: "didi kal se 1 week break, 5 june se start karna", time: "7:30 PM" },
      { from: "business", text: "✓ Paused 26 May – 4 June. Resumes 5 June.", time: "7:30 PM" },
      { from: "customer", text: "aaj dinner mein extra roti chahiye, 4 ki jagah 6 karna", time: "7:31 PM" },
      { from: "business", text: "✓ Updated for today's dinner: 6 rotis. ₹10 extra added.", time: "7:31 PM" },
    ],
    order: [
      { name: "Monthly subscription", qty: "22 days", price: "₹2,200" },
      { name: "Extra rotis (1 day)", qty: "2 rotis", price: "₹10" },
    ],
    total: "₹2,210",
    benefits: ["Subscription pause/resume tracking", "Per-meal modifications without manual adjustments", "Automated monthly billing summary", "Customer preference history"],
  },
};

const fallback: UseCaseData = {
  title: "Not found", hero: "This use case doesn't exist.",
  description: "Try navigating back.", chat: [], order: [], total: "", benefits: [],
};

export default function UseCaseDetail() {
  const { id } = useParams<{ id: string }>();
  const data = id ? (useCases[id] ?? fallback) : fallback;

  return (
    <div>
      {/* ── DARK: Hero ───────────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <Link to="/use-cases" className="inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-on-primary transition-colors mb-10">
              <ArrowLeft size={14} />All use cases
            </Link>
            <PillTag variant="shade" className="mb-5">{data.title}</PillTag>
            <h1 className="text-display-lg text-on-primary mb-6 max-w-3xl">{data.hero}</h1>
            <p className="text-body-lg text-shade-40 max-w-2xl">{data.description}</p>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHT: Chat mockup + order ────────────────────── */}
      {data.chat.length > 0 && (
        <section className="bg-canvas-cream px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chat */}
              <div>
                <p className="text-eyebrow text-shade-40 mb-5">Sample conversation</p>
                <div className="rounded-xl overflow-hidden shadow-elev-2" style={{ backgroundColor: "#111B21" }}>
                  <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#1F2C34" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-[600]" style={{ backgroundColor: "#25D366", color: "#111B21" }}>C</div>
                    <p className="text-caption text-on-primary font-[500]">Customer</p>
                    <img src="/WhatsApp_Logo_0.svg" alt="WhatsApp" className="h-3 ml-auto opacity-50" />
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    {data.chat.map((msg, i) => (
                      <div key={i} className={`flex ${msg.from === "customer" ? "justify-start" : "justify-end"}`}>
                        <div className="max-w-[85%] rounded-xl px-3 py-2" style={{ backgroundColor: msg.from === "customer" ? "#1F2C34" : "#005C4B" }}>
                          <p className="text-caption text-on-primary">{msg.text}</p>
                          <p className="text-micro mt-1 text-right" style={{ color: "#8696A0" }}>{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order */}
              <div>
                <p className="text-eyebrow text-shade-40 mb-5">Extracted order</p>
                <div className="bg-canvas-light border border-hairline-light rounded-xl overflow-hidden shadow-elev-3">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-hairline-light bg-canvas-cream">
                        <th className="text-left text-eyebrow text-shade-50 px-5 py-3">Item</th>
                        <th className="text-left text-eyebrow text-shade-50 px-5 py-3">Qty</th>
                        <th className="text-right text-eyebrow text-shade-50 px-5 py-3">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.order.map((item, i) => (
                        <tr key={i} className="border-b border-hairline-light last:border-0">
                          <td className="px-5 py-3 text-body-md text-ink">{item.name}</td>
                          <td className="px-5 py-3 text-caption text-shade-50">{item.qty}</td>
                          <td className="px-5 py-3 text-caption text-ink text-right">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-hairline-light bg-canvas-cream">
                        <td colSpan={2} className="px-5 py-3 text-caption text-shade-50">Total</td>
                        <td className="px-5 py-3 text-heading-md text-ink text-right" style={{ color: "#25D366" }}>{data.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── LIGHT: Benefits ───────────────────────────────── */}
      {data.benefits.length > 0 && (
        <section className="bg-canvas-light px-6 py-16 border-t border-hairline-light">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp}>
              <p className="text-eyebrow text-shade-40 mb-8">Why it works for {data.title.toLowerCase()}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.benefits.map((b, i) => (
                  <div key={i} className="bg-canvas-cream border border-hairline-light rounded-xl px-5 py-4 flex items-start gap-3 shadow-elev-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#25D366" }} />
                    <span className="text-body-md text-shade-50">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── DARK: CTA ─────────────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 py-24 text-center">
        <motion.div {...fadeUp} className="mx-auto max-w-xl">
          <h2 className="text-display-md text-on-primary mb-6">Start for free</h2>
          <p className="text-body-lg text-shade-40 mb-8 max-w-lg mx-auto">
            100 order extractions and 25 invoices every month. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sign-up"><Button variant="primary" size="lg">Create free account</Button></Link>
            <Link to="/use-cases"><Button variant="outline-dark" size="lg">See all use cases <ArrowRight size={16} /></Button></Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
