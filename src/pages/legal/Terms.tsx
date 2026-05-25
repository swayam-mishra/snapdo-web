import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Terms() {
  return (
    <div className="bg-canvas-cream text-ink">
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Legal</p>
          <h1 className="text-display-md text-ink mb-2">Terms of Service</h1>
          <p className="text-caption text-shade-50 mb-12">Last updated: 1 April 2025</p>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-heading-lg text-ink mb-4">1. Acceptance</h2>
              <p className="text-body-md text-shade-50">By accessing or using Snapdo, you agree to these Terms. If you use Snapdo on behalf of a business, that business also accepts these Terms. If you do not agree, do not use the service.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">2. Description of service</h2>
              <p className="text-body-md text-shade-50">Snapdo is a SaaS platform that uses AI to extract structured order data from WhatsApp messages and generate GST-compliant invoices. The service is provided "as is" and features may change with notice.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">3. Accounts</h2>
              <p className="text-body-md text-shade-50">You must provide accurate information when creating an account. You are responsible for all activity under your account. API keys must be kept confidential. Notify us immediately of unauthorized access at hello.almostperfect@gmail.com.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">4. Acceptable use</h2>
              <p className="text-body-md text-shade-50 mb-3">You may not use Snapdo to: process data you do not have rights to use, circumvent usage limits, attempt unauthorized access to other users' data, or use the service for illegal purposes.</p>
              <p className="text-body-md text-shade-50">Violation of acceptable use terms may result in immediate account suspension.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">5. Payment and billing</h2>
              <p className="text-body-md text-shade-50">Paid plans are billed monthly in advance. Usage above plan limits results in service restriction, not overage charges. Refunds are governed by our Refund Policy. We may change prices with 30 days notice.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">6. Intellectual property</h2>
              <p className="text-body-md text-shade-50">Snapdo retains all rights to the platform, AI models, and software. You retain all rights to your business data. You grant Snapdo a limited license to process your data solely to deliver the service.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">7. Limitation of liability</h2>
              <p className="text-body-md text-shade-50">Snapdo's liability is limited to the amount you paid in the 3 months preceding the claim. We are not liable for indirect, incidental, or consequential damages. The AI extraction service is a tool to assist — verify critical financial information independently.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">8. Termination</h2>
              <p className="text-body-md text-shade-50">You may cancel at any time from Settings. We may suspend accounts that violate these Terms. Upon termination, you may export your data within 30 days. After that, data is deleted per our Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">9. Governing law</h2>
              <p className="text-body-md text-shade-50">These Terms are governed by the laws of India. Disputes shall be resolved in courts of Bangalore, Karnataka. For Enterprise customers with specific jurisdictional requirements, contact hello.almostperfect@gmail.com.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
