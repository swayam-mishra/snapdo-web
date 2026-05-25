import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const steps = [
  {
    n: "01",
    title: "Create an account",
    body: "Sign up at snapdo.in/signup. No credit card required. You're on the Free plan by default.",
    code: null,
  },
  {
    n: "02",
    title: "Generate an API key",
    body: "Go to Settings → API Keys and click \"Create new key\". Copy the key — it's only shown once.",
    code: null,
  },
  {
    n: "03",
    title: "Make your first extraction",
    body: "Send a POST request to /v1/extract with your WhatsApp message in the request body.",
    code: `curl -X POST https://api.snapdo.in/v1/extract \\
  -H "Authorization: Bearer sk_live_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "bhai 5kg aata, 2 packet maggi aur 1 sarso tel bhejna aaj"
  }'`,
  },
  {
    n: "04",
    title: "Review the extracted order",
    body: "The response contains structured line items with confidence score. Orders above 0.90 confidence are safe to auto-confirm.",
    code: `{
  "order_id": "ord_01J9X2K8M3N5P7Q4R6",
  "confidence": 0.97,
  "items": [
    { "name": "Aata",      "qty": 5, "unit": "kg"     },
    { "name": "Maggi",     "qty": 2, "unit": "packet" },
    { "name": "Sarso Tel", "qty": 1, "unit": "bottle" }
  ]
}`,
  },
  {
    n: "05",
    title: "Generate a GST invoice",
    body: "Once the order is confirmed, generate a GST invoice PDF. The type (CGST/SGST or IGST) is automatically determined by your business state.",
    code: `curl -X POST https://api.snapdo.in/v1/orders/ord_01J9X.../invoice \\
  -H "Authorization: Bearer sk_live_your_key"

# Response includes a signed PDF download URL
{
  "invoice_id": "inv_01J9X2...",
  "pdf_url": "https://cdn.snapdo.in/invoices/inv_01J9X2....pdf",
  "expires_at": "2025-05-26T09:00:00Z"
}`,
  },
];

export default function Quickstart() {
  return (
    <div className="min-h-screen bg-canvas-cream px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp}>
          <Link
            to="/docs"
            className="inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to API Reference
          </Link>

          <p className="text-eyebrow text-shade-50 mb-2">Guide</p>
          <h1 className="text-heading-xl text-ink mb-4">Quickstart</h1>
          <p className="text-body-md text-shade-50 mb-12">
            Get from zero to your first GST invoice in under 5 minutes. You'll need a terminal with <code className="bg-shade-30 text-ink rounded px-1.5 py-0.5 text-[13px] font-mono">curl</code> or any HTTP client.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6"
            >
              <div className="flex items-start gap-4">
                <span className="text-display-md text-shade-30 font-[330] leading-none shrink-0 mt-1">{step.n}</span>
                <div className="flex-1">
                  <h2 className="text-heading-md text-ink mb-2">{step.title}</h2>
                  <p className="text-body-md text-shade-50 mb-4">{step.body}</p>
                  {step.code && (
                    <pre className="bg-canvas-night rounded-xl p-4 overflow-x-auto">
                      <code className="text-[13px] font-mono text-aloe whitespace-pre">{step.code}</code>
                    </pre>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.45 }} className="mt-8">
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6">
            <h2 className="text-heading-md text-ink mb-3">Next steps</h2>
            <div className="flex flex-col gap-2">
              <Link to="/docs/webhooks" className="text-body-md text-link-cool-1 hover:text-ink transition-colors">
                → Set up webhooks for real-time event notifications
              </Link>
              <Link to="/settings/api-keys" className="text-body-md text-link-cool-1 hover:text-ink transition-colors">
                → Manage your API keys
              </Link>
              <Link to="/docs" className="text-body-md text-link-cool-1 hover:text-ink transition-colors">
                → Explore the full API reference
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
