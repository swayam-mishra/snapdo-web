import { Link } from "react-router";
import { Check, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";
import PillTag from "../../components/ui/PillTag";

const settingsNav = [
  { label: "Profile", to: "/settings/profile" },
  { label: "Organization", to: "/settings/organization" },
  { label: "API Keys", to: "/settings/api-keys" },
  { label: "Webhooks", to: "/settings/webhooks" },
  { label: "Billing", to: "/settings/billing" },
  { label: "Notifications", to: "/settings/notifications" },
];

const usage = [
  { label: "Orders extracted", used: 67, total: 100, unit: "orders" },
  { label: "Invoices generated", used: 19, total: 25, unit: "invoices" },
  { label: "API calls", used: 420, total: 1000, unit: "calls" },
];

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "/mo",
    current: true,
    features: ["100 orders/mo", "25 invoices/mo", "Basic API access", "Email support"],
    cta: "Current plan",
    ctaVariant: "outline-light" as const,
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹999",
    period: "/mo",
    current: false,
    features: ["2,000 orders/mo", "500 invoices/mo", "Webhooks", "Priority support", "Advanced analytics", "Custom branding"],
    cta: "Upgrade to Pro",
    ctaVariant: "primary" as const,
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    current: false,
    features: ["Unlimited orders", "Unlimited invoices", "SLA guarantee", "Dedicated support", "On-premise option", "SSO"],
    cta: "Contact sales",
    ctaVariant: "outline-light" as const,
    highlight: false,
  },
];

export default function Billing() {
  return (
    <div className="min-h-screen bg-canvas-cream px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <nav className="flex flex-wrap gap-1 mb-8 bg-canvas-light rounded-pill border border-hairline-light p-1.5 shadow-elev-3">
          {settingsNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-1.5 rounded-pill text-caption text-shade-50 hover:text-ink hover:bg-shade-30 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <h1 className="text-heading-xl text-ink mb-6">Billing</h1>

        <div className="flex flex-col gap-6">
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-heading-md text-ink">Current plan</h2>
              <PillTag variant="mint">Free</PillTag>
            </div>

            <div className="flex flex-col gap-4">
              {usage.map((u) => {
                const pct = Math.round((u.used / u.total) * 100);
                const danger = pct >= 80;
                return (
                  <div key={u.label}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-caption text-ink">{u.label}</span>
                      <span className="text-micro text-shade-50">{u.used} / {u.total} {u.unit}</span>
                    </div>
                    <div className="h-2 bg-shade-30 rounded-pill overflow-hidden">
                      <div
                        className={`h-full rounded-pill transition-all ${danger ? "bg-red-400" : "bg-aloe"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-micro text-shade-50 mt-4">Resets on the 1st of each month.</p>
          </div>

          <div>
            <h2 className="text-heading-md text-ink mb-4">Upgrade your plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-xl border shadow-elev-3 p-5 flex flex-col gap-4 ${
                    plan.highlight
                      ? "bg-aloe border-aloe"
                      : "bg-canvas-light border-hairline-light"
                  }`}
                >
                  <div>
                    {plan.highlight && (
                      <p className="text-eyebrow text-ink mb-2">Most popular</p>
                    )}
                    <h3 className="text-heading-md text-ink">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-display-md text-ink">{plan.price}</span>
                      {plan.period && <span className="text-caption text-shade-50">{plan.period}</span>}
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check size={14} className="text-ink shrink-0" />
                        <span className="text-caption text-ink">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.id === "enterprise" ? (
                    <Link to="/contact" className="w-full">
                      <Button variant="outline-light" size="sm" className="w-full">
                        {plan.cta}
                        <ArrowRight size={14} />
                      </Button>
                    </Link>
                  ) : plan.current ? (
                    <Button variant="outline-light" size="sm" disabled>{plan.cta}</Button>
                  ) : (
                    <Button variant="primary" size="sm">{plan.cta}</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
