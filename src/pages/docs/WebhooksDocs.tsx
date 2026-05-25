import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const events = [
  {
    name: "order.created",
    desc: "Fired when an order is successfully extracted from a message.",
    example: `{
  "event": "order.created",
  "data": {
    "order_id": "ord_01J9X2K8M3N5P7Q4R6",
    "confidence": 0.96,
    "items": [
      { "name": "Aata", "qty": 5, "unit": "kg" }
    ],
    "created_at": "2025-05-25T09:14:22Z"
  }
}`,
  },
  {
    name: "order.updated",
    desc: "Fired when an order's status changes (e.g. confirmed, cancelled).",
    example: `{
  "event": "order.updated",
  "data": {
    "order_id": "ord_01J9X2K8M3N5P7Q4R6",
    "status": "confirmed",
    "updated_at": "2025-05-25T09:17:00Z"
  }
}`,
  },
  {
    name: "job.completed",
    desc: "Fired when an async batch extraction job completes successfully.",
    example: `{
  "event": "job.completed",
  "data": {
    "job_id": "job_01J9X2K8M3N5P7Q4R7",
    "orders_extracted": 42,
    "errors": 0,
    "completed_at": "2025-05-25T09:20:00Z"
  }
}`,
  },
  {
    name: "job.failed",
    desc: "Fired when a job fails after all retry attempts are exhausted.",
    example: `{
  "event": "job.failed",
  "data": {
    "job_id": "job_01J9X2K8M3N5P7Q4R8",
    "reason": "input_too_large",
    "failed_at": "2025-05-25T09:25:00Z"
  }
}`,
  },
];

export default function WebhooksDocs() {
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
          <h1 className="text-heading-xl text-ink mb-4">Webhooks</h1>
          <p className="text-body-md text-shade-50 mb-12">
            Snapdo sends HTTP POST requests to your endpoint when events occur. Use webhooks to build real-time integrations without polling.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.08 }}>
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6 mb-6">
            <h2 className="text-heading-md text-ink mb-4">Setup</h2>
            <p className="text-body-md text-shade-50 mb-3">
              Register webhook endpoints in{" "}
              <Link to="/settings/webhooks" className="text-link-cool-1 hover:text-ink transition-colors">
                Settings → Webhooks
              </Link>
              . Select the events you want to receive.
            </p>
            <p className="text-body-md text-shade-50">
              Snapdo expects your endpoint to return a <code className="bg-shade-30 text-ink rounded px-1.5 py-0.5 text-[13px] font-mono">2xx</code> HTTP response within 10 seconds. If not received, delivery is retried with exponential back-off up to 5 times.
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.12 }}>
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6 mb-6">
            <h2 className="text-heading-md text-ink mb-4">Payload verification</h2>
            <p className="text-body-md text-shade-50 mb-4">
              Every webhook request includes a <code className="bg-shade-30 text-ink rounded px-1.5 py-0.5 text-[13px] font-mono">X-Snapdo-Signature</code> header containing an HMAC-SHA256 signature. Verify it using your webhook secret to confirm the request originated from Snapdo.
            </p>
            <pre className="bg-canvas-night rounded-xl p-4 overflow-x-auto">
              <code className="text-[13px] font-mono text-aloe whitespace-pre">{`import hmac
import hashlib

def verify_signature(payload_body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload_body,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)`}</code>
            </pre>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.16 }}>
          <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6 mb-6">
            <h2 className="text-heading-md text-ink mb-4">Example server (Node.js)</h2>
            <pre className="bg-canvas-night rounded-xl p-4 overflow-x-auto">
              <code className="text-[13px] font-mono text-aloe whitespace-pre">{`import express from 'express'
import crypto from 'crypto'

const app = express()
app.use(express.raw({ type: 'application/json' }))

app.post('/webhooks/snapdo', (req, res) => {
  const sig = req.headers['x-snapdo-signature']
  const expected = 'sha256=' + crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(req.body)
    .digest('hex')

  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return res.status(401).send('Invalid signature')
  }

  const event = JSON.parse(req.body)

  switch (event.event) {
    case 'order.created':
      // handle new order
      break
    case 'job.completed':
      // handle job completion
      break
  }

  res.status(200).send('ok')
})

app.listen(3000)`}</code>
            </pre>
          </div>
        </motion.div>

        <h2 className="text-heading-md text-ink mb-4">Event types</h2>
        <div className="flex flex-col gap-4">
          {events.map((ev, i) => (
            <motion.div
              key={ev.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6"
            >
              <code className="text-body-strong text-ink font-mono">{ev.name}</code>
              <p className="text-caption text-shade-50 mt-1 mb-4">{ev.desc}</p>
              <pre className="bg-canvas-night rounded-xl p-4 overflow-x-auto">
                <code className="text-[13px] font-mono text-shade-40 whitespace-pre">{ev.example}</code>
              </pre>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
