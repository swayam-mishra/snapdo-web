import { motion } from "motion/react";
import PillTag from "../../components/ui/PillTag";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const changelog = [
  {
    version: "v0.9.0",
    date: "20 May 2025",
    additions: [
      "Webhooks: support for order.created, order.updated, job.completed, job.failed",
      "Delivery logs with per-request status codes and timestamps",
      "Settings: notification preferences with per-channel toggles",
    ],
    fixes: [
      "Fixed invoice PDF generation for IGST inter-state transactions",
      "Improved confidence scoring for quantities with unit ambiguity",
    ],
    removals: [],
  },
  {
    version: "v0.8.0",
    date: "1 May 2025",
    additions: [
      "Async extraction jobs with SQS-backed queue",
      "Dead-letter queue monitoring and threshold alerts",
      "API Keys settings page with masked key display",
    ],
    fixes: [
      "Fixed order extraction for messages with mixed Devanagari and Latin script",
      "Fixed duplicate customer creation on rapid successive extractions",
    ],
    removals: ["Removed legacy synchronous batch endpoint (use /v1/jobs instead)"],
  },
  {
    version: "v0.7.0",
    date: "10 Apr 2025",
    additions: [
      "Analytics dashboard: revenue trends, top customers, SKU breakdown",
      "Customer detail page with order history",
      "Invoice download as PDF with business logo support",
    ],
    fixes: [
      "Improved GST number validation for all state codes",
      "Fixed pagination cursor on /orders endpoint",
    ],
    removals: [],
  },
  {
    version: "v0.6.0",
    date: "15 Mar 2025",
    additions: [
      "Initial public beta launch",
      "Hinglish AI extraction for WhatsApp messages",
      "GST invoice generation (CGST/SGST/IGST)",
      "Multi-tenant organization support",
      "REST API with API key authentication",
    ],
    fixes: [],
    removals: [],
  },
];

export default function Changelog() {
  return (
    <div className="bg-canvas-cream text-ink">
      <section className="px-6 pt-32 pb-16 text-center">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Changelog</p>
          <h1 className="text-display-md text-ink">What's new in Snapdo.</h1>
          <p className="mt-4 text-body-lg text-shade-50 max-w-lg mx-auto">
            We ship often. Here's everything that's changed, in reverse order.
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {changelog.map((entry, i) => (
            <motion.div
              key={entry.version}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-7"
            >
              <div className="flex items-center gap-3 mb-1">
                <PillTag variant="mint">{entry.version}</PillTag>
                <span className="text-caption text-shade-50">{entry.date}</span>
              </div>

              {entry.additions.length > 0 && (
                <div className="mt-5">
                  <p className="text-eyebrow text-shade-50 mb-2">Added</p>
                  <ul className="flex flex-col gap-2">
                    {entry.additions.map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-body-md text-ink">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-aloe shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.fixes.length > 0 && (
                <div className="mt-5">
                  <p className="text-eyebrow text-shade-50 mb-2">Fixed</p>
                  <ul className="flex flex-col gap-2">
                    {entry.fixes.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-body-md text-shade-50">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-shade-40 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.removals.length > 0 && (
                <div className="mt-5">
                  <p className="text-eyebrow text-shade-50 mb-2">Removed</p>
                  <ul className="flex flex-col gap-2">
                    {entry.removals.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-body-md text-red-500">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
