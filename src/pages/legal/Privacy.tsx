import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Privacy() {
  return (
    <div className="bg-canvas-cream text-ink">
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Legal</p>
          <h1 className="text-display-md text-ink mb-2">Privacy Policy</h1>
          <p className="text-caption text-shade-50 mb-12">Last updated: 1 April 2025</p>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-heading-lg text-ink mb-4">1. Information we collect</h2>
              <p className="text-body-md text-shade-50 mb-3">We collect information you provide directly: account details (name, email, business name), WhatsApp message content you submit for extraction, and payment information processed via our payment processor.</p>
              <p className="text-body-md text-shade-50">We also collect usage data automatically: IP addresses, browser type, pages visited, API request logs, and error reports — solely to improve service quality and security.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">2. How we use your information</h2>
              <p className="text-body-md text-shade-50 mb-3">Your data is used to provide the Snapdo service: extracting orders, generating invoices, processing payments, and sending transactional notifications. We do not use your business data to train shared AI models without explicit consent.</p>
              <p className="text-body-md text-shade-50">We may use anonymized, aggregated data to improve our AI extraction models.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">3. Data sharing</h2>
              <p className="text-body-md text-shade-50">We do not sell your data. We share data only with sub-processors necessary to deliver the service (cloud infrastructure, payment processing, email delivery). All sub-processors are contractually bound to equivalent data protection standards.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">4. Data retention</h2>
              <p className="text-body-md text-shade-50">Free plan data is retained for 90 days from inactivity. Pro plan data is retained for 1 year. Enterprise plans negotiate custom retention terms. You may request deletion at any time by emailing hello.almostperfect@gmail.com.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">5. Your rights</h2>
              <p className="text-body-md text-shade-50">Under applicable law you have the right to access, correct, delete, and export your personal data. Contact hello.almostperfect@gmail.com to exercise these rights. We respond within 30 days.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">6. Security</h2>
              <p className="text-body-md text-shade-50">Data is encrypted in transit using TLS 1.3 and at rest using AES-256. Access is restricted via role-based controls. We conduct periodic security audits. See our Security page for full details.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">7. Cookies</h2>
              <p className="text-body-md text-shade-50">We use essential cookies for authentication and functional cookies for preferences. See our Cookie Policy for details.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">8. Contact</h2>
              <p className="text-body-md text-shade-50">Privacy questions: hello.almostperfect@gmail.com. Snapdo Technologies Pvt. Ltd., Bangalore, Karnataka, India.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
