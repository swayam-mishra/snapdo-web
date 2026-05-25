import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Refund() {
  return (
    <div className="bg-canvas-cream text-ink">
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Legal</p>
          <h1 className="text-display-md text-ink mb-2">Refund Policy</h1>
          <p className="text-caption text-shade-50 mb-12">Last updated: 1 April 2025</p>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-heading-lg text-ink mb-4">Free plan</h2>
              <p className="text-body-md text-shade-50">The Free plan has no associated charges, so no refunds apply.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Pro plan</h2>
              <p className="text-body-md text-shade-50 mb-3">If you upgrade to Pro and are not satisfied, you may request a full refund within 7 days of the charge. After 7 days, no refunds are issued — you will retain access until the end of the billing period.</p>
              <p className="text-body-md text-shade-50">Refunds are issued to the original payment method within 5–7 business days. To request a refund, email hello.almostperfect@gmail.com with your registered email and order ID.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Enterprise plan</h2>
              <p className="text-body-md text-shade-50">Enterprise refund terms are governed by the individual contract signed at onboarding. Contact your dedicated account manager or email hello.almostperfect@gmail.com.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Exceptions</h2>
              <p className="text-body-md text-shade-50">Refunds will not be issued for: accounts terminated due to Terms of Service violations, partial months where service was used, or downgrade scenarios (you'll retain Pro features until period end).</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Technical issues</h2>
              <p className="text-body-md text-shade-50">If a verified service outage lasting more than 24 continuous hours occurs, affected customers will receive a pro-rated credit on their next bill, regardless of the 7-day window. This applies to outages logged on our status page.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Contact</h2>
              <p className="text-body-md text-shade-50">For refund requests: hello.almostperfect@gmail.com. Include your registered email, charge date, and reason for the request.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
