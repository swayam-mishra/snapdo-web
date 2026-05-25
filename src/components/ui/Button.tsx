import { forwardRef } from "react";
import { clsx } from "clsx";

type ButtonVariant =
  | "primary"
  | "outline-dark"
  | "outline-light"
  | "aloe";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  as?: "button" | "a";
  href?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 font-body text-body-md rounded-pill transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-on-primary hover:bg-shade-70 active:bg-shade-70",
  "outline-dark":
    "bg-canvas-night text-on-primary border-2 border-on-primary hover:bg-shade-70 hover:border-shade-70 active:bg-shade-70",
  "outline-light":
    "bg-canvas-light text-ink border border-ink hover:bg-shade-30 active:bg-shade-30",
  aloe:
    "bg-aloe text-ink hover:opacity-90 active:opacity-80",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-[18px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
