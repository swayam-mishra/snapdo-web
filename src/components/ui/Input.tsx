import { forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-caption text-ink font-[500]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full bg-canvas-light text-ink text-body-md rounded-md border px-3 py-[10px] outline-none transition-colors",
            "placeholder:text-shade-40",
            error
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
              : "border-hairline-light focus:border-ink focus:ring-1 focus:ring-ink",
            className
          )}
          {...props}
        />
        {error && <p className="text-micro text-red-500">{error}</p>}
        {hint && !error && <p className="text-micro text-shade-50">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
