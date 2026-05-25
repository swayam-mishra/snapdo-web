import { motion } from "motion/react";
import { ShieldCheck, Lock, Server, Eye } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const highlights = [
  { icon: Lock, title: "Encryption", body: "TLS 1.3 in transit. AES-256 at rest. All database backups are encrypted." },
  { icon: ShieldCheck, title: "Authentication", body: "API key authentication with per-org scoping. HTTPS-only. Secure cookie flags." },
  { icon: Server, title: "Infrastructure", body: "Hosted on AWS in ap-south-1 (Mumbai). VPC isolation. No public database access." },
  { icon: Eye, title: "Access controls", body: "Role-based access internally. All production access is logged and audited." },
];

export default function Security() {
  return (
    <div className="bg-canvas-cream text-ink">
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Security</p>
          <h1 className="text-display-md text-ink mb-4">Security at Snapdo</h1>
          <p className="text-body-lg text-shade-50 mb-12">
            We take the security of your business data seriously. Here's an overview of our security practices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-5">
                  <div className="w-9 h-9 rounded-lg bg-shade-30 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-shade-50" />
                  </div>
                  <h3 className="text-body-strong text-ink mb-1">{h.title}</h3>
                  <p className="text-caption text-shade-50">{h.body}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-heading-lg text-ink mb-4">Data isolation</h2>
              <p className="text-body-md text-shade-50">All user data is isolated at the database level using row-level security. An authenticated user can only access data belonging to their organization. This is enforced at the query layer — not just the application layer.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Vulnerability disclosure</h2>
              <p className="text-body-md text-shade-50 mb-3">We welcome responsible disclosure of security vulnerabilities. If you discover an issue, email hello.almostperfect@gmail.com with a detailed description. We aim to acknowledge reports within 48 hours and patch critical issues within 7 days.</p>
              <p className="text-body-md text-shade-50">Please do not publicly disclose the issue until we've had the opportunity to address it.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Compliance</h2>
              <p className="text-body-md text-shade-50">We are currently working towards SOC 2 Type II certification. Our data processing practices are aligned with India's Digital Personal Data Protection Act (DPDPA) 2023. Enterprise customers requiring specific compliance documentation can request our security questionnaire.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Incident response</h2>
              <p className="text-body-md text-shade-50">In the event of a security incident affecting your data, we will notify affected organizations within 72 hours of becoming aware of the breach, in line with applicable data protection laws.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
