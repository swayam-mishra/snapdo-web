import { Link } from "react-router";
import { motion } from "motion/react";
import { Key, Zap, Webhook, ChevronRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const endpoints = [
  { method: "POST", path: "/v1/extract", desc: "Extract structured order from WhatsApp message" },
  { method: "GET",  path: "/v1/orders", desc: "List orders with pagination and filters" },
  { method: "GET",  path: "/v1/orders/:id", desc: "Get single order by ID" },
  { method: "POST", path: "/v1/orders/:id/invoice", desc: "Generate GST invoice for an order" },
  { method: "GET",  path: "/v1/customers", desc: "List customers for the organization" },
  { method: "GET",  path: "/v1/customers/:id", desc: "Get customer profile and order history" },
  { method: "POST", path: "/v1/jobs", desc: "Submit async batch extraction job" },
  { method: "GET",  path: "/v1/jobs/:id", desc: "Poll async job status and result" },
];

const methodColors: Record<string, string> = {
  GET: "bg-aloe text-ink",
  POST: "bg-pistachio text-ink",
  DELETE: "bg-red-100 text-red-700",
  PATCH: "bg-shade-30 text-ink",
};

export default function Docs() {
  return (
    <div className="min-h-screen bg-canvas-cream px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-2">API Reference</p>
          <h1 className="text-heading-xl text-ink mb-4">Snapdo API</h1>
          <p className="text-body-md text-shade-50 mb-8">
            Base URL:{" "}
            <code className="bg-shade-30 text-ink rounded px-2 py-0.5 text-[13px] font-mono">
              https://api.snapdo.in/v1
            </code>
          </p>

          <div className="flex gap-3 mb-12 flex-wrap">
            <Link to="/docs/quickstart">
              <div className="bg-canvas-light border border-hairline-light rounded-xl p-4 flex items-center gap-3 shadow-elev-3 hover:border-shade-40 transition-colors group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-shade-30 flex items-center justify-center">
                  <Zap size={16} className="text-shade-50" />
                </div>
                <div>
                  <p className="text-body-strong text-ink">Quickstart</p>
                  <p className="text-micro text-shade-50">5 minutes to first extraction</p>
                </div>
                <ChevronRight size={16} className="text-shade-40 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
            <Link to="/docs/webhooks">
              <div className="bg-canvas-light border border-hairline-light rounded-xl p-4 flex items-center gap-3 shadow-elev-3 hover:border-shade-40 transition-colors group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-shade-30 flex items-center justify-center">
                  <Webhook size={16} className="text-shade-50" />
                </div>
                <div>
                  <p className="text-body-strong text-ink">Webhooks</p>
                  <p className="text-micro text-shade-50">Events, payloads, verification</p>
                </div>
                <ChevronRight size={16} className="text-shade-40 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Key size={18} className="text-shade-50" />
              <h2 className="text-heading-md text-ink">Authentication</h2>
            </div>
            <p className="text-body-md text-shade-50 mb-4">
              All requests require an API key in the <code className="bg-shade-30 text-ink rounded px-1.5 py-0.5 text-[13px] font-mono">Authorization</code> header.
            </p>
            <pre className="bg-canvas-night rounded-xl p-4 overflow-x-auto">
              <code className="text-[13px] font-mono text-aloe whitespace-pre">{`curl https://api.snapdo.in/v1/orders \\
  -H "Authorization: Bearer sk_live_your_api_key" \\
  -H "Content-Type: application/json"`}</code>
            </pre>
            <p className="text-caption text-shade-50 mt-4">
              Create API keys in{" "}
              <Link to="/settings/api-keys" className="text-link-cool-1 hover:text-ink transition-colors">
                Settings → API Keys
              </Link>
              . Never share or expose keys in client-side code.
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-hairline-light">
              <h2 className="text-heading-md text-ink">Endpoints</h2>
            </div>
            <div>
              {endpoints.map((ep, i) => (
                <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i < endpoints.length - 1 ? "border-b border-hairline-light" : ""}`}>
                  <span className={`text-micro font-mono font-[600] rounded-pill px-2.5 py-0.5 shrink-0 ${methodColors[ep.method] ?? "bg-shade-30 text-ink"}`}>
                    {ep.method}
                  </span>
                  <code className="text-[13px] font-mono text-ink shrink-0 hidden sm:block">{ep.path}</code>
                  <span className="text-caption text-shade-50 flex-1 min-w-0">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6">
            <h2 className="text-heading-md text-ink mb-4">Extract an order</h2>
            <p className="text-body-md text-shade-50 mb-4">Pass a raw WhatsApp message string. The AI returns structured line items.</p>
            <pre className="bg-canvas-night rounded-xl p-4 overflow-x-auto mb-4">
              <code className="text-[13px] font-mono text-aloe whitespace-pre">{`curl -X POST https://api.snapdo.in/v1/extract \\
  -H "Authorization: Bearer sk_live_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "bhai 5kg aata, 2 packet maggi, 1 sarso tel",
    "customer_id": "cust_01J9X2K8M3N5P7Q"
  }'`}</code>
            </pre>
            <p className="text-caption text-shade-50 mb-3">Response:</p>
            <pre className="bg-canvas-night rounded-xl p-4 overflow-x-auto">
              <code className="text-[13px] font-mono text-shade-40 whitespace-pre">{`{
  "order_id": "ord_01J9X2K8M3N5P7Q4R6",
  "confidence": 0.96,
  "items": [
    { "name": "Aata",      "qty": 5, "unit": "kg",     "price": null },
    { "name": "Maggi",     "qty": 2, "unit": "packet", "price": null },
    { "name": "Sarso Tel", "qty": 1, "unit": "bottle", "price": null }
  ],
  "raw_message": "bhai 5kg aata, 2 packet maggi, 1 sarso tel",
  "created_at": "2025-05-25T09:14:22Z"
}`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
