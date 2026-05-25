import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";
import PillTag from "../../components/ui/PillTag";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export default function About() {
  return (
    <div>

      {/* ── DARK: Hero ───────────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          <motion.div {...fadeUp}>
            <PillTag variant="mint" className="mb-8">Our story</PillTag>
            <h1 className="text-display-xl text-on-primary">
              Built solo, won first prize, kept going.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHT: Founder story ─────────────────────────── */}
      <section className="bg-canvas-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div {...fadeUp} className="flex flex-col gap-10">

            {/* The moment */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-canvas-night flex items-center justify-center shrink-0">
                  <span className="text-on-primary text-heading-md font-[500]">S</span>
                </div>
                <div>
                  <p className="text-heading-md text-ink">Swayam Mishra</p>
                  <p className="text-caption text-shade-50">Founder, Snapdo</p>
                  <div className="flex items-center gap-4 mt-1">
                    <a href="mailto:swayammishra1504@gmail.com" className="text-micro text-shade-40 hover:text-ink transition-colors">
                      swayammishra1504@gmail.com
                    </a>
                    <a href="https://swayam.codes" target="_blank" rel="noopener noreferrer" className="text-micro text-shade-40 hover:text-ink transition-colors">
                      swayam.codes ↗
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-body-lg text-shade-50 leading-relaxed">
                I built the first version of Snapdo — then called Chat2Cash — in February 2026, alone, for a hackathon.
              </p>
              <p className="text-body-lg text-shade-50 leading-relaxed">
                The problem I was trying to solve wasn't abstract. India has 60+ million small businesses that run almost entirely on WhatsApp. Kiranas, textile distributors, tiffin services, wholesale traders. They confirm orders over chat, create invoices manually in Excel late at night, track payments from memory, and lose 10–15% of their revenue every month just because the chaos of WhatsApp makes things fall through the cracks.
              </p>
              <p className="text-body-lg text-shade-50 leading-relaxed">
                For a business doing ₹10 lakh a month, that's ₹1 lakh lost. Every single month. Not because they're doing anything wrong — just because the tools they have weren't built for the way they actually work.
              </p>
            </div>

            {/* The hackathon */}
            <div className="bg-canvas-night rounded-xl p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <p className="text-heading-md text-on-primary">1st Prize — Build for India</p>
              </div>
              <p className="text-body-md text-shade-40">
                Chat2Cash won first place in the Build for India track at Devfolio. The judges' reasoning was simple: it doesn't ask businesses to change how they work. It just makes WhatsApp smarter — turning unstructured Hinglish conversations into structured orders, invoices, and payment records automatically.
              </p>
              <p className="text-caption text-shade-50">February 15, 2026 · Built solo</p>
            </div>

            {/* The why */}
            <div className="flex flex-col gap-5">
              <p className="text-body-lg text-shade-50 leading-relaxed">
                After the hackathon, I kept building. The core insight felt too important to leave as a demo. India's informal economy runs on conversations — voice notes, Hinglish texts, informal references. No existing tool understood that. Most CRMs assume you'll enter data manually. Most invoice tools assume clean English input.
              </p>
              <p className="text-body-lg text-shade-50 leading-relaxed">
                Snapdo doesn't ask you to change anything. You keep using WhatsApp exactly the way you do today. We work in the background — extracting orders, generating invoices, tracking what's paid and what isn't — so you don't have to.
              </p>
            </div>

            {/* The numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: "60M+", label: "SMBs in India on WhatsApp" },
                { value: "~94%", label: "Extraction accuracy in testing" },
                { value: "< 30s", label: "From WhatsApp message to GST invoice" },
              ].map((stat, i) => (
                <div key={i} className="bg-canvas-light border border-hairline-light rounded-xl p-5 shadow-elev-3">
                  <p className="text-display-md text-ink">{stat.value}</p>
                  <p className="text-caption text-shade-50 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Mission */}
            <div className="border-l-2 pl-6" style={{ borderColor: "#25D366" }}>
              <p className="text-heading-lg text-ink mb-2">The mission</p>
              <p className="text-body-lg text-shade-50 leading-relaxed">
                Convert conversations into structured revenue. Without asking Indian business owners to change a single thing about how they work.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DARK: CTA ─────────────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 py-24 text-center">
        <motion.div {...fadeUp} className="mx-auto max-w-xl">
          <h2 className="text-display-md text-on-primary mb-6">
            Want to see it in action?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sign-up">
              <Button variant="primary" size="lg">Try it free</Button>
            </Link>
            <a href="mailto:swayammishra1504@gmail.com">
              <Button variant="outline-dark" size="lg">Talk to Swayam <ArrowRight size={16} /></Button>
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
