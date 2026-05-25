import { motion } from "motion/react";
import { Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-canvas-night text-on-primary flex-1 flex flex-col items-center justify-center px-6 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-display-xl font-[330] text-on-primary tracking-tight mb-10">Snapdo</span>
          <div className="w-14 h-14 rounded-xl bg-shade-70 flex items-center justify-center mb-6">
            <Wrench size={24} className="text-shade-40" />
          </div>
          <h1 className="text-heading-xl text-on-primary mb-3">We'll be back shortly.</h1>
          <p className="text-body-lg text-shade-40 max-w-md">
            Snapdo is undergoing scheduled maintenance. We're upgrading things to serve you better.
          </p>
        </motion.div>
      </div>
      <div className="bg-canvas-cream px-6 py-12 flex flex-col items-center gap-3">
        <div className="bg-canvas-light border border-hairline-light rounded-xl px-8 py-5 text-center shadow-elev-3">
          <p className="text-caption text-shade-50">Estimated completion</p>
          <p className="text-heading-md text-ink mt-1">Today, ~2:00 PM IST</p>
        </div>
        <p className="text-micro text-shade-40">Check back soon.</p>
      </div>
    </div>
  );
}
