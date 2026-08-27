import type { InputHTMLAttributes } from "react";
import cn from "../../utils/cn";

const Input = ({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-[var(--radius-control)] border border-border bg-bg/40 px-3 text-sm text-text placeholder:text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className
      )}
      {...props}
    />
  );
};

export default Input;