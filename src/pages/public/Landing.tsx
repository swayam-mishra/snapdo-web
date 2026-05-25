import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MessageSquare, FileText, Zap, Globe, Shield, BarChart2, Layers, Download } from "lucide-react";
import Button from "../../components/ui/Button";
import PillTag from "../../components/ui/PillTag";
import { apiFetch, type DemoResponse } from "../../lib/api";

const chatMessages = [
  { from: "customer", text: "bhai 5kg aata, 2kg daal, 1 bottle sarso tel bhejo aaj", time: "10:42 AM" },
  { from: "snapdo", text: "✓ Order received", time: "10:42 AM", isSystem: true },
];

const extractedOrder = {
  items: [
    { name: "Aata", qty: "5 kg", price: "₹250" },
    { name: "Daal", qty: "2 kg", price: "₹180" },
    { name: "Sarso Tel", qty: "1 bottle", price: "₹145" },
  ],
  total: "₹575",
};

const problems = [
  { icon: MessageSquare, title: "WhatsApp chaos", body: "Orders buried in 200+ daily messages. No structure, no tracking, no history." },
  { icon: Zap, title: "Manual entry hell", body: "Copy-pasting into Excel sheets. Errors every day. Hours lost every week." },
  { icon: FileText, title: "No GST record", body: "No proper invoices means no input tax credit and audit risk every quarter." },
];

const features = [
  { icon: Globe, title: "Hinglish AI", body: "Understands mixed Hindi-English orders, regional shortcuts, and informal language." },
  { icon: FileText, title: "GST invoices", body: "Auto-generates CGST/SGST/IGST invoices. Compliant, downloadable PDFs in seconds." },
  { icon: Zap, title: "Order history", body: "Every order logged, searchable, and filterable. Never lose a record again." },
  { icon: Layers, title: "API-first", body: "Full REST API. Integrate with your existing tools or build custom workflows." },
  { icon: Shield, title: "Multi-tenant", body: "Complete data isolation between businesses. Your data stays yours." },
  { icon: BarChart2, title: "Analytics", body: "Revenue trends, top customers, order velocity — all in one dashboard." },
];

const steps = [
  { n: "01", title: "Paste the chat", body: "Copy any WhatsApp message or full conversation and paste it into Snapdo." },
  { n: "02", title: "AI extracts the order", body: "Our Hinglish-trained model pulls items, quantities, units, and prices in under a second." },
  { n: "03", title: "Download the invoice", body: "Review, confirm, and generate a GST-compliant PDF invoice instantly." },
];

const testimonials = [
  { quote: "We process 300+ WhatsApp orders daily. Snapdo cut our entry time by 80%.", name: "Ramesh K.", role: "Kirana owner, Bangalore" },
  { quote: "The GST invoice generation alone saves us ₹5,000/month in accountant fees.", name: "Priya M.", role: "Tiffin service, Mumbai" },
  { quote: "Finally a tool that understands how Indian businesses actually communicate.", name: "Ankit S.", role: "Distributor, Delhi" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const SAMPLE = `Ramesh: bhai 5kg aata chahiye
Ramesh: aur 2kg toor daal bhi
Ramesh: sarso tel ek litre bhi add karo
Vendor: theek hai kal tak bhej deta hoon`;

function LiveDemo() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DemoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (customInput?: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const body = customInput
        ? {
            messages: customInput.split("\n").filter(Boolean).map(line => {
              const i = line.indexOf(":");
              return i === -1
                ? { sender: "Unknown", text: line.trim() }
                : { sender: line.slice(0, i).trim(), text: line.slice(i + 1).trim() };
            }),
          }
        : undefined;

      const data = await apiFetch<DemoResponse>("/demo/run", {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      });
      setResult(data);
    } catch (err: unknown) {
      const status = (err as { status?: number }).status;
      if (status === 429) {
        setError("Demo limit reached — sign up for full access.");
      } else {
        setError("Something went wrong. Try again in a moment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src="/WhatsApp_Logo_0.svg" alt="WhatsApp" className="h-4" />
            <span className="text-heading-md text-ink">Paste a chat — or use sample</span>
          </div>
          <button
            onClick={() => setInput(SAMPLE)}
            className="text-micro text-shade-50 hover:text-ink transition-colors underline underline-offset-2"
          >
            Use sample
          </button>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={"Ramesh: bhai 5kg aata chahiye\nRamesh: aur daal bhi\nVendor: theek hai"}
          rows={4}
          className="w-full bg-canvas-cream text-ink text-body-md rounded-lg border border-hairline-light px-4 py-3 outline-none focus:border-ink focus:ring-1 focus:ring-ink placeholder:text-shade-40 resize-none transition-colors"
        />
        <div className="flex gap-3 mt-4">
          <Button
            variant="primary"
            size="md"
            loading={loading}
            onClick={() => run(input.trim() || undefined)}
            className="flex-1"
          >
            <Zap size={15} />
            {loading ? "Claude is reading your chat…" : "Try it live — no sign up needed"}
          </Button>
        </div>
        {error && (
          <div className="mt-3 flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <p className="text-caption text-red-700">{error}</p>
            {error.includes("sign up") && (
              <Link to="/sign-up">
                <Button variant="primary" size="sm">Sign up free</Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Extracted order */}
            <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-hairline-light">
                <h3 className="text-heading-md text-ink">Extracted order</h3>
                <span className="text-micro rounded-pill px-3 py-1 font-[500]"
                  style={{ backgroundColor: result.order.confidence === "high" ? "#E6FFDA" : result.order.confidence === "medium" ? "#d4f9e0" : "#fee2e2", color: result.order.confidence === "low" ? "#b91c1c" : "#111B21" }}>
                  {result.order.confidence} confidence
                </span>
              </div>
              <div className="px-6 py-4">
                {result.order.customer_name && (
                  <p className="text-caption text-shade-50 mb-3">Customer: <span className="text-ink font-[500]">{result.order.customer_name}</span></p>
                )}
                <div className="flex flex-col gap-2">
                  {result.order.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-hairline-light last:border-0">
                      <span className="text-body-md text-ink">{item.product_name} × {item.quantity}</span>
                      <span className="text-body-md text-ink">{item.price != null ? `₹${item.price * item.quantity}` : "—"}</span>
                    </div>
                  ))}
                </div>
                {result.order.total != null && (
                  <div className="flex justify-between mt-3 pt-3 border-t border-hairline-light">
                    <span className="text-caption text-shade-50">Total</span>
                    <span className="text-heading-md text-ink" style={{ color: "#25D366" }}>₹{result.order.total}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Invoice preview */}
            <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-hairline-light">
                <h3 className="text-heading-md text-ink">GST Invoice — {result.invoice.invoice_number}</h3>
                <a href={result.pdf_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline-light" size="sm">
                    <Download size={14} /> Download PDF
                  </Button>
                </a>
              </div>
              <div className="px-6 py-4 bg-canvas-cream">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-caption text-shade-50">
                    <span>Subtotal</span><span>₹{result.invoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-caption text-shade-50">
                    <span>CGST</span><span>₹{result.invoice.cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-caption text-shade-50">
                    <span>SGST</span><span>₹{result.invoice.sgst.toFixed(2)}</span>
                  </div>
                  {result.invoice.igst != null && (
                    <div className="flex justify-between text-caption text-shade-50">
                      <span>IGST</span><span>₹{result.invoice.igst.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-body-strong text-ink pt-2 border-t border-hairline-light mt-1">
                    <span>Total</span><span>₹{result.invoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/sign-up">
                <Button variant="primary" size="lg">
                  Sign up to save this order <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Landing() {
  return (
    <div>

      {/* ── DARK: Hero ───────────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary relative min-h-[92vh] flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(193,251,212,0.06) 0%, transparent 70%)" }} />

        <motion.div {...fadeUp} className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-pill px-3 py-1 text-eyebrow mb-8" style={{ backgroundColor: "#25D366", color: "#111B21" }}>
            <img src="/WhatsApp_Logo_0.svg" alt="" className="h-3" style={{ filter: "brightness(0)" }} />
            Now in beta — free while we build
          </span>
          <h1 className="text-display-xxl text-on-primary max-w-5xl">
            WhatsApp orders,<br />structured instantly.
          </h1>
          <p className="mt-8 text-body-lg text-shade-40 max-w-xl">
            Paste a Hinglish WhatsApp message. Get a structured order and a GST invoice. Built for kiranas, distributors, and tiffin services across India.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a href="#live-demo">
              <Button variant="primary" size="lg">
                <Zap size={16} /> Try demo — no sign up
              </Button>
            </a>
            <Link to="/sign-up"><Button variant="outline-dark" size="lg">Start for free <ArrowRight size={16} /></Button></Link>
          </div>
        </motion.div>

        {/* WhatsApp chat mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 mt-20 w-full max-w-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WhatsApp-styled chat bubble */}
            <div className="rounded-xl overflow-hidden shadow-elev-2" style={{ backgroundColor: "#111B21" }}>
              {/* Chat header bar */}
              <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: "#1F2C34" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-[600]" style={{ backgroundColor: "#25D366", color: "#111B21" }}>R</div>
                <div>
                  <p className="text-caption font-[500] text-on-primary">Ramesh Kirana</p>
                  <p className="text-micro" style={{ color: "#8696A0" }}>online</p>
                </div>
                <img src="/WhatsApp_Logo_0.svg" alt="WhatsApp" className="h-3.5 ml-auto opacity-60" />
              </div>
              {/* Chat body */}
              <div className="p-4 flex flex-col gap-3" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "20px 20px" }}>
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl rounded-tl-sm px-3 py-2" style={{ backgroundColor: "#1F2C34" }}>
                    <p className="text-body-md text-on-primary">bhai 5kg aata, 2kg daal, 1 bottle sarso tel bhejo aaj</p>
                    <p className="text-micro mt-1 text-right" style={{ color: "#8696A0" }}>10:42 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-xl rounded-tr-sm px-3 py-2" style={{ backgroundColor: "#005C4B" }}>
                    <p className="text-body-md text-on-primary">✓ Order received & extracting…</p>
                    <p className="text-micro mt-1 text-right" style={{ color: "#8696A0" }}>10:42 AM</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <span className="text-micro px-3 py-1 rounded-pill" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#8696A0" }}>Today</span>
                </div>
              </div>
            </div>

            {/* Extracted order result */}
            <div className="bg-canvas-night-elevated rounded-xl border border-hairline-dark p-5 shadow-elev-2">
              <div className="flex items-center justify-between mb-4">
                <p className="text-eyebrow text-shade-40">Extracted order</p>
                <span className="text-micro font-[500] rounded-pill px-2 py-0.5" style={{ backgroundColor: "#E6FFDA", color: "#111B21" }}>✓ 98% match</span>
              </div>
              <div className="flex flex-col gap-2">
                {extractedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-hairline-dark last:border-0">
                    <div>
                      <p className="text-body-md text-on-primary">{item.name}</p>
                      <p className="text-micro text-shade-40">{item.qty}</p>
                    </div>
                    <p className="text-body-strong text-on-primary">{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-hairline-dark flex justify-between items-center">
                <span className="text-caption text-shade-40">Total</span>
                <span className="text-heading-md font-[500]" style={{ color: "#25D366" }}>{extractedOrder.total}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── LIGHT: Social proof bar ───────────────────────── */}
      <section className="border-y border-hairline-light py-5 px-6" style={{ backgroundColor: "#E6FFDA" }}>
        <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <img src="/WhatsApp_Logo_0.svg" alt="WhatsApp" className="h-3.5 opacity-60" />
          {["Kirana stores", "FMCG distributors", "Tiffin services", "Wholesale traders", "Cloud kitchens"].map((label) => (
            <span key={label} className="text-caption" style={{ color: "#111B21" }}>{label}</span>
          ))}
        </div>
      </section>

      {/* ── LIGHT: Problem section ────────────────────────── */}
      <section className="bg-canvas-light px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-eyebrow text-shade-40 mb-4">The problem</p>
            <h2 className="text-display-lg text-ink">Running a business on WhatsApp is chaos.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {problems.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-canvas-cream rounded-xl border border-hairline-light p-8 shadow-elev-3">
                  <div className="w-10 h-10 rounded-lg bg-shade-30 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-shade-50" />
                  </div>
                  <h3 className="text-heading-md text-ink mb-3">{p.title}</h3>
                  <p className="text-body-md text-shade-50">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LIGHT: Live Demo ─────────────────────────────── */}
      <section id="live-demo" className="bg-canvas-cream px-6 py-24 border-t border-hairline-light">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="text-center mb-10">
            <PillTag variant="mint" className="mb-5">Live demo — no sign up needed</PillTag>
            <h2 className="text-display-md text-ink">Try it right now.</h2>
            <p className="mt-4 text-body-lg text-shade-50 max-w-lg mx-auto">
              Paste any WhatsApp order chat. Snapdo extracts the order and generates a real GST invoice in seconds.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
            <LiveDemo />
          </motion.div>
        </div>
      </section>

      {/* ── DARK: How it works ────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-eyebrow text-shade-50 mb-4">How it works</p>
            <h2 className="text-display-lg text-on-primary">Three steps, five minutes.</h2>
          </motion.div>
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex gap-8 py-10 border-b border-hairline-dark last:border-0">
                <span className="text-display-md text-shade-70 font-[330] tabular-nums shrink-0 leading-none mt-1">{step.n}</span>
                <div>
                  <h3 className="text-heading-xl text-on-primary mb-3">{step.title}</h3>
                  <p className="text-body-lg text-shade-40 max-w-lg">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHT: Feature highlights ─────────────────────── */}
      <section className="bg-canvas-cream px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-eyebrow text-shade-40 mb-4">Features</p>
            <h2 className="text-display-lg text-ink">Everything you need, nothing you don't.</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="bg-canvas-light rounded-xl border border-hairline-light p-7 shadow-elev-3 group hover:border-ink transition-colors">
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center mb-5"
                    style={{ backgroundColor: i === 0 ? "#25D366" : "#c1fbd4" }}
                  >
                    <Icon size={18} className="text-ink" />
                  </div>
                  <h3 className="text-heading-md text-ink mb-2">{f.title}</h3>
                  <p className="text-caption text-shade-50">{f.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LIGHT: Pricing preview ────────────────────────── */}
      <section className="bg-canvas-light px-6 py-24 border-t border-hairline-light">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div {...fadeUp}>
            <p className="text-eyebrow text-shade-40 mb-4">Pricing</p>
            <h2 className="text-display-md text-ink mb-6">Start free. Scale when you're ready.</h2>
            <p className="text-body-lg text-shade-50 mb-8">
              Free tier includes 100 order extractions and 25 invoices per month. No credit card required.
            </p>
            <Link to="/pricing">
              <Button variant="outline-light" size="md">View pricing <ArrowRight size={16} /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DARK: Testimonials ────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-eyebrow text-shade-50 mb-4">From our users</p>
            <h2 className="text-display-md text-on-primary">Real businesses, real results.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-canvas-night-elevated border border-hairline-dark rounded-xl p-7 shadow-elev-1">
                <p className="text-body-lg text-on-primary mb-6">"{t.quote}"</p>
                <div>
                  <p className="text-caption text-on-primary font-[500]">{t.name}</p>
                  <p className="text-micro text-shade-40">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK: Final CTA ───────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 py-32 border-t border-hairline-dark">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-display-xl text-on-primary mb-8">
              Start managing orders<br />in 5 minutes.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/sign-up"><Button variant="primary" size="lg">Create free account</Button></Link>
              <Link to="/contact"><Button variant="outline-dark" size="lg">Talk to us</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
