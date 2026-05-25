import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ShoppingBasket, Truck, UtensilsCrossed } from "lucide-react";
import PillTag from "../../components/ui/PillTag";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const useCases = [
  {
    id: "kirana",
    icon: ShoppingBasket,
    title: "Kirana stores",
    tagline: "Turn WhatsApp orders into structured records instantly.",
    description: "Kirana owners receive 100+ orders a day across multiple WhatsApp chats. Snapdo extracts every item, quantity, and price automatically — no manual entry required.",
  },
  {
    id: "distributor",
    icon: Truck,
    title: "FMCG distributors",
    tagline: "Manage bulk orders from dozens of retailers at once.",
    description: "Distributors juggle orders from 50+ retailers. Snapdo handles the extraction, auto-generates GST invoices, and gives you a single dashboard for all outstanding orders.",
  },
  {
    id: "tiffin",
    icon: UtensilsCrossed,
    title: "Tiffin services",
    tagline: "Automate daily meal order collection and billing.",
    description: "Tiffin services receive daily subscription updates and one-off orders on WhatsApp. Snapdo tracks recurring orders, handles special requests, and invoices monthly.",
  },
];

export default function UseCases() {
  return (
    <div>
      {/* ── DARK: Hero ───────────────────────────────────── */}
      <section className="bg-canvas-night text-on-primary px-6 pt-32 pb-24 text-center">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl">
          <PillTag variant="mint" className="mb-6">Use cases</PillTag>
          <h1 className="text-display-xl text-on-primary">
            Built for your business type.
          </h1>
          <p className="mt-6 text-body-lg text-shade-40 max-w-xl mx-auto">
            Snapdo is tailored to how different Indian businesses actually operate — not a one-size-fits-all solution.
          </p>
        </motion.div>
      </section>

      {/* ── LIGHT: Cards ─────────────────────────────────── */}
      <section className="bg-canvas-cream px-6 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div key={uc.id} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Link to={`/use-cases/${uc.id}`} className="block h-full group">
                  <div className="bg-canvas-light border border-hairline-light rounded-xl p-7 h-full flex flex-col gap-5 shadow-elev-3 hover:border-ink transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-aloe flex items-center justify-center">
                      <Icon size={22} className="text-ink" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-heading-lg text-ink mb-3">{uc.title}</h2>
                      <p className="text-body-strong text-shade-50 mb-3">{uc.tagline}</p>
                      <p className="text-body-md text-shade-50">{uc.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-caption text-shade-40 group-hover:text-ink transition-colors group-hover:gap-2">
                      Learn more <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
