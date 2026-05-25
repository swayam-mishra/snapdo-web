import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import PillTag from "../../components/ui/PillTag";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const posts: Record<string, { title: string; tag: string; date: string; content: string[] }> = {
  "how-hinglish-ai-works": {
    title: "How Hinglish AI works under the hood",
    tag: "Product",
    date: "18 May 2025",
    content: [
      "When a kirana store owner in Lucknow types 'bhai 5kg aata, 2 packet maggi, 1 sarso tel aur 500g jeera bhejna aaj shaam', they're not thinking about structured data. They're thinking about their customer. Snapdo's job is to bridge that gap silently.",
      "The core challenge of Hinglish NLP is that it's not a single language — it's a continuum. The same item might be written as 'aata', 'atta', 'wheat flour', or even 'गेहूं का आटा' in the same conversation. Our model needs to handle all of these, often in the same message.",
      "We started by collecting 50,000 real WhatsApp order messages (with consent) from merchants across Delhi, Bangalore, and Mumbai. This corpus was hand-labeled by native Hinglish speakers — not linguists, but actual merchants who understood the context.",
      "The model architecture is a fine-tuned multilingual transformer. We specifically chose a model pre-trained on Indian language data rather than starting from an English-only base. This gave us significantly better out-of-the-box performance on Devanagari-Latin code-switching.",
      "Quantity extraction was the hardest problem. '5kg', '5 kilo', '5 किलो', 'pach kilo', and 'ek bori' (one sack, implying ~50kg depending on context) all mean different things. We built a separate quantity resolution layer that uses product category context to disambiguate.",
      "The confidence score you see in the UI is a composite metric: token-level extraction confidence, unit resolution confidence, and product name normalization confidence. When any component drops below 0.75, we flag the extraction for human review rather than auto-confirming.",
      "We're currently working on a customer-specific fine-tuning feature where the model adapts to the specific vocabulary of your business — your product names, your shorthand, your customers' quirks. This is coming in v1.0.",
    ],
  },
  "gst-invoicing-guide": {
    title: "The complete GST invoicing guide for small businesses",
    tag: "Tutorial",
    date: "5 May 2025",
    content: [
      "GST has been in effect since July 2017, but a majority of small businesses in India still struggle with invoicing compliance. This guide explains what you need to know — and how Snapdo handles it automatically.",
      "There are three types of GST that appear on invoices: CGST (Central GST), SGST (State GST), and IGST (Integrated GST). The type that applies depends on whether the transaction is within the same state (intra-state) or across states (inter-state).",
      "For intra-state transactions, CGST and SGST each apply at half the combined GST rate. So a 18% GST item would show 9% CGST + 9% SGST. Snapdo detects this by comparing your registered business state (configured in Profile settings) with the customer's delivery state.",
      "For inter-state transactions, only IGST applies — at the full rate. An 18% item shows 18% IGST, no split. This is automatically determined based on the customer address you've saved.",
      "Snapdo generates compliant invoices with all mandatory fields: GSTIN, place of supply, HSN/SAC code support, sequential invoice numbering, and digital signature readiness. Invoices are generated as PDFs and can include your business logo.",
      "If you're on the composition scheme, invoices work differently. Reach out to our team for guidance on setting up composition scheme invoicing — it requires a different template.",
    ],
  },
};

const fallbackPost = {
  title: "Blog post not found",
  tag: "Product",
  date: "",
  content: ["This post doesn't exist yet. Check back soon."],
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? (posts[slug] ?? fallbackPost) : fallbackPost;

  return (
    <div className="bg-canvas-cream text-ink">
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <motion.div {...fadeUp}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <PillTag variant="mint">{post.tag}</PillTag>
            {post.date && <span className="text-caption text-shade-50">{post.date}</span>}
          </div>

          <h1 className="text-display-md text-ink mb-10">{post.title}</h1>

          <div className="h-px bg-hairline-light mb-10" />

          <div className="flex flex-col gap-6">
            {post.content.map((para, i) => (
              <p key={i} className="text-body-lg text-shade-60 leading-relaxed">{para}</p>
            ))}
          </div>

          <div className="h-px bg-hairline-light mt-12 mb-8" />

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-caption text-shade-50 hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all posts
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
