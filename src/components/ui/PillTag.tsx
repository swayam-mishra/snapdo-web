import { clsx } from "clsx";

type PillTagVariant = "mint" | "shade";

interface PillTagProps {
  variant?: PillTagVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<PillTagVariant, string> = {
  mint:  "bg-aloe text-ink",
  shade: "bg-shade-30 text-ink",
};

export default function PillTag({ variant = "mint", children, className }: PillTagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-pill px-3 py-1 text-eyebrow",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
