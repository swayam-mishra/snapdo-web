import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const cookieTypes = [
  { name: "Session cookies", purpose: "Maintain your login session across page navigations.", duration: "Session (expires on browser close)", required: true },
  { name: "Authentication cookies", purpose: "Keep you signed in for up to 30 days.", duration: "30 days", required: true },
  { name: "Preference cookies", purpose: "Remember your UI preferences (e.g. sidebar state, table column widths).", duration: "1 year", required: false },
  { name: "Analytics cookies", purpose: "Understand how users navigate the product to improve UX. No personal data shared.", duration: "90 days", required: false },
];

export default function Cookies() {
  return (
    <div className="bg-canvas-cream text-ink">
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Legal</p>
          <h1 className="text-display-md text-ink mb-2">Cookie Policy</h1>
          <p className="text-caption text-shade-50 mb-12">Last updated: 1 April 2025</p>

          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-heading-lg text-ink mb-4">What are cookies?</h2>
              <p className="text-body-md text-shade-50">Cookies are small text files stored on your device when you visit a website. They help us deliver a functional, personalized experience. We use minimal cookies — only what's necessary to run the service plus optional analytics.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Cookies we use</h2>
              <div className="flex flex-col gap-3">
                {cookieTypes.map((c) => (
                  <div key={c.name} className="bg-canvas-light rounded-xl border border-hairline-light p-5 shadow-elev-3">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-body-strong text-ink">{c.name}</h3>
                      <span className={`text-micro rounded-pill px-2 py-0.5 ${c.required ? "bg-aloe text-ink" : "bg-shade-30 text-shade-50"}`}>
                        {c.required ? "Required" : "Optional"}
                      </span>
                    </div>
                    <p className="text-caption text-shade-50 mb-1">{c.purpose}</p>
                    <p className="text-micro text-shade-40">Duration: {c.duration}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Third-party cookies</h2>
              <p className="text-body-md text-shade-50">We do not use third-party advertising cookies or tracking pixels. Our analytics are self-hosted. Payment processing uses Razorpay, which may set its own cookies — see Razorpay's privacy policy for details.</p>
            </section>

            <section>
              <h2 className="text-heading-lg text-ink mb-4">Managing cookies</h2>
              <p className="text-body-md text-shade-50">You can decline optional cookies via the cookie banner when you first visit. Essential cookies cannot be disabled without affecting core functionality. You can clear cookies at any time through your browser settings.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
