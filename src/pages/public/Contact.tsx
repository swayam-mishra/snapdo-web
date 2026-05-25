import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Mail, Clock } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

interface ContactForm {
  name: string;
  email: string;
  businessType: string;
  message: string;
}

const businessTypes = [
  "Kirana / Grocery store",
  "FMCG distributor",
  "Tiffin service",
  "Cloud kitchen",
  "Wholesale trader",
  "Other",
];

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>();

  function onSubmit(_data: ContactForm) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success("Message sent! We'll reply within 24 hours.");
        reset();
        resolve();
      }, 800);
    });
  }

  return (
    <div className="bg-canvas-cream text-ink">
      <section className="px-6 pt-32 pb-20 text-center">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Contact</p>
          <h1 className="text-display-md text-ink">Get in touch.</h1>
          <p className="mt-4 text-body-lg text-shade-50 max-w-lg mx-auto">
            Questions, feedback, or want to explore Enterprise? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div {...fadeUp} className="md:col-span-2">
            <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-7">
              <h2 className="text-heading-md text-ink mb-5">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                  label="Your name"
                  placeholder="Ramesh Kumar"
                  error={errors.name?.message}
                  {...register("name", { required: "Name is required" })}
                />

                <Input
                  label="Email address"
                  type="email"
                  placeholder="ramesh@example.com"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                  })}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-caption text-ink font-[500]">Business type</label>
                  <select
                    className="w-full bg-canvas-light text-ink text-body-md rounded-md border border-hairline-light px-3 py-[10px] outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors"
                    {...register("businessType")}
                  >
                    <option value="">Select your business type</option>
                    {businessTypes.map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-caption text-ink font-[500]">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us what you're looking for..."
                    className="w-full bg-canvas-light text-ink text-body-md rounded-md border border-hairline-light px-3 py-[10px] outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors resize-none placeholder:text-shade-40"
                    {...register("message", { required: "Message is required" })}
                  />
                  {errors.message && <p className="text-micro text-red-500">{errors.message.message}</p>}
                </div>

                <div className="flex justify-end mt-2">
                  <Button type="submit" variant="primary" size="md" loading={isSubmitting}>
                    Send message
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="flex flex-col gap-4">
            <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6">
              <div className="w-9 h-9 rounded-lg bg-shade-30 flex items-center justify-center mb-3">
                <Mail size={16} className="text-shade-50" />
              </div>
              <p className="text-caption text-shade-50 mb-1">Email us at</p>
              <a href="mailto:hello.almostperfect@gmail.com" className="text-body-md text-ink hover:underline break-all">
                hello.almostperfect@gmail.com
              </a>
            </div>

            <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-6">
              <div className="w-9 h-9 rounded-lg bg-shade-30 flex items-center justify-center mb-3">
                <Clock size={16} className="text-shade-50" />
              </div>
              <p className="text-caption text-shade-50 mb-1">Response time</p>
              <p className="text-body-strong text-ink">Usually within 24 hours</p>
              <p className="text-micro text-shade-50 mt-1">Monday – Saturday, 9am – 7pm IST</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
