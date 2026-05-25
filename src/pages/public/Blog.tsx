import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import PillTag from "../../components/ui/PillTag";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const posts = [
  {
    slug: "how-hinglish-ai-works",
    title: "How Hinglish AI works under the hood",
    excerpt: "A deep dive into how we fine-tuned a language model to understand the way real Indian merchants communicate — from regional shortcuts to mixed-script messages.",
    tag: "Product",
    date: "18 May 2025",
    readTime: "8 min read",
  },
  {
    slug: "gst-invoicing-guide",
    title: "The complete GST invoicing guide for small businesses",
    excerpt: "CGST, SGST, IGST — what each tax type means, when it applies, and how Snapdo generates compliant invoices automatically based on your business state.",
    tag: "Tutorial",
    date: "5 May 2025",
    readTime: "12 min read",
  },
  {
    slug: "india-smb-digital-tools",
    title: "Why most SaaS tools fail India's small businesses",
    excerpt: "A frank look at why western software products rarely make it in India's informal SMB sector — and what it takes to build for the 60 million businesses that run on WhatsApp.",
    tag: "India SMB",
    date: "22 Apr 2025",
    readTime: "6 min read",
  },
  {
    slug: "webhooks-integration-guide",
    title: "Building real-time integrations with Snapdo Webhooks",
    excerpt: "Step-by-step guide to setting up Snapdo webhooks, verifying payloads, handling retries, and building robust event-driven workflows on top of Snapdo's API.",
    tag: "API",
    date: "10 Apr 2025",
    readTime: "10 min read",
  },
];

const tagVariants: Record<string, "mint" | "shade"> = {
  Product: "mint",
  Tutorial: "shade",
  "India SMB": "shade",
  API: "mint",
};

export default function Blog() {
  return (
    <div className="bg-canvas-cream text-ink">
      <section className="px-6 pt-32 pb-16 text-center">
        <motion.div {...fadeUp}>
          <p className="text-eyebrow text-shade-50 mb-4">Blog</p>
          <h1 className="text-display-md text-ink">Thoughts from the Snapdo team.</h1>
          <p className="mt-4 text-body-lg text-shade-50 max-w-lg mx-auto">
            Guides, product updates, and essays on building for India's informal economy.
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="bg-canvas-light rounded-xl border border-hairline-light shadow-elev-3 p-7 h-full flex flex-col gap-4 hover:border-shade-40 transition-colors group">
                  <div className="flex items-center gap-2">
                    <PillTag variant={tagVariants[post.tag] ?? "shade"}>{post.tag}</PillTag>
                    <span className="text-micro text-shade-50">{post.date}</span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-heading-md text-ink group-hover:text-shade-60 transition-colors mb-3">
                      {post.title}
                    </h2>
                    <p className="text-body-md text-shade-50">{post.excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-micro text-shade-40">{post.readTime}</span>
                    <span className="text-caption text-ink flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
