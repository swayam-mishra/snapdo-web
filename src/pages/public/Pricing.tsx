import { Link } from "react-router";
import { motion } from "motion/react";
import { Check, X, ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import Button from "../../components/ui/Button";
import PillTag from "../../components/ui/PillTag";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "/mo",
    tagline: "For individuals getting started",
    featured: false,
    features: [
      "100 order extractions/mo",
      "25 GST invoices/mo",
      "Basic REST API",
      "Email support",
      "90-day data retention",
    ],
    cta: "Start free",
    ctaTo: "/signup",
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹999",
    period: "/mo",
    tagline: "For growing businesses",
    featured: true,
    features: [
      "2,000 order extractions/mo",
      "500 GST invoices/mo",
      "Webhooks",
      "Priority support (4h SLA)",
      "1-year data retention",
      "Advanced analytics",
      "Custom invoice branding",
    ],
    cta: "Upgrade to Pro",
    ctaTo: "/signup",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For large-scale operations",
    featured: false,
    features: [
      "Unlimited extractions",
      "Unlimited invoices",
      "SLA guarantee (99.9% uptime)",
      "Dedicated success manager",
      "On-premise deployment option",
      "SSO / SAML",
      "Custom integrations",
    ],
    cta: "Contact sales",
    ctaTo: "/contact",
  },
];

const comparisonFeatures = [
  { label: "Order extractions / mo", free: "100", pro: "2,000", enterprise: "Unlimited" },
  { label: "GST invoices / mo", free: "25", pro: "500", enterprise: "Unlimited" },
  { label: "Webhooks", free: false, pro: true, enterprise: true },
  { label: "Advanced analytics", free: false, pro: true, enterprise: true },
  { label: "Custom branding", free: false, pro: true, enterprise: true },
  { label: "Priority support", free: false, pro: true, enterprise: true },
  { label: "SLA guarantee", free: false, pro: false, enterprise: true },
  { label: "SSO / SAML", free: false, pro: false, enterprise: true },
];

const faqs = [
  {
    q: "Do I need a credit card to start?",
    a: "No. The Free plan requires no payment details. You can upgrade anytime from your Billing settings.",
  },
  {
    q: "What happens when I hit my monthly limit?",
    a: "Extractions and invoice generation will be paused until your next billing cycle. You'll get an email warning at 80% usage. Upgrade to Pro for higher limits.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Yes. Cancel anytime from Settings → Billing. Your plan remains active until the end of the current billing period. No cancellation fees.",
  },
];

export default function Pricing() {
  return (
    <div className="bg-canvas-cream text-ink">
      <section className="px-6 pt-32 pb-20 text-center">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Pricing</p>
          <h1 className="text-display-lg text-ink max-w-2xl mx-auto">Simple, honest pricing.</h1>
          <p className="mt-4 text-body-lg text-shade-50 max-w-lg mx-auto">
            Start free, scale when you need it. No hidden fees, no overage charges.
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-xl border shadow-elev-3 p-7 flex flex-col gap-5 ${
                plan.featured ? "bg-aloe border-aloe" : "bg-canvas-light border-hairline-light"
              }`}
            >
              <div>
                {plan.featured && (
                  <div className="mb-3">
                    <PillTag variant="shade">Most popular</PillTag>
                  </div>
                )}
                <h2 className="text-heading-lg text-ink">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-display-md text-ink">{plan.price}</span>
                  {plan.period && <span className="text-caption text-shade-50">{plan.period}</span>}
                </div>
                <p className="text-caption text-shade-50 mt-1">{plan.tagline}</p>
              </div>

              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={14} className="text-ink shrink-0" />
                    <span className="text-caption text-ink">{f}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.ctaTo}>
                <Button
                  variant={plan.featured ? "primary" : "outline-light"}
                  size="md"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading-xl text-ink mb-6 text-center">Compare plans</h2>
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline-light">
                  <th className="text-left text-eyebrow text-shade-50 px-6 py-4">Feature</th>
                  <th className="text-center text-eyebrow text-shade-50 px-4 py-4">Free</th>
                  <th className="text-center text-eyebrow text-shade-50 px-4 py-4">Pro</th>
                  <th className="text-center text-eyebrow text-shade-50 px-4 py-4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.label} className={i < comparisonFeatures.length - 1 ? "border-b border-hairline-light" : ""}>
                    <td className="px-6 py-3.5 text-caption text-ink">{row.label}</td>
                    {(["free", "pro", "enterprise"] as const).map((tier) => {
                      const val = row[tier];
                      return (
                        <td key={tier} className="px-4 py-3.5 text-center">
                          {typeof val === "boolean" ? (
                            val ? <Check size={16} className="text-ink mx-auto" /> : <X size={16} className="text-shade-40 mx-auto" />
                          ) : (
                            <span className="text-caption text-ink">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-heading-xl text-ink mb-6 text-center">Frequently asked questions</h2>
          <Accordion.Root type="single" collapsible className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`faq-${i}`}
                className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden"
              >
                <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-shade-30/30 transition-colors group">
                  <span className="text-body-md text-ink font-[500]">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-shade-50 shrink-0 transition-transform group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 pb-5 text-body-md text-shade-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                  {faq.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      <section className="border-t border-hairline-light px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-display-md text-ink mb-4">Start for free today.</h2>
            <p className="text-body-lg text-shade-50 mb-8">No credit card. Cancel anytime.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/sign-up">
                <Button variant="primary" size="lg">Create free account</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline-light" size="lg">Talk to sales</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
