import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, RefreshCw } from "lucide-react";
import Button from "../../components/ui/Button";

export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-canvas-night text-on-primary flex-1 flex flex-col items-center justify-center px-6 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <p className="text-display-xxl text-shade-70 font-[330] leading-none mb-6">500</p>
          <h1 className="text-heading-xl text-on-primary mb-3">Something broke on our end.</h1>
          <p className="text-body-lg text-shade-40 max-w-sm mb-4">
            We've been notified and are looking into it. Usually resolves within a few minutes.
          </p>
          <p className="text-caption text-shade-50">
            Still broken? Email{" "}
            <a href="mailto:hello.almostperfect@gmail.com" className="text-on-primary underline underline-offset-2">
              hello.almostperfect@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
      <div className="bg-canvas-cream px-6 py-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="primary" size="md" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />Try again
        </Button>
        <Link to="/"><Button variant="outline-light" size="md"><Home size={16} />Go home</Button></Link>
      </div>
    </div>
  );
}
