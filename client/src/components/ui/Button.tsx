import type { ButtonHTMLAttributes } from "react";
import cn from "../../utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

const Button = ({ variant = "primary", size = "md", className = "", type = "button", ...props }: Props) => {
  const base =
    "inline-flex items-center justify-center font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-50 disabled:pointer-events-none";

  const sizes = size === "sm" ? "h-9 px-3 text-sm rounded-[var(--radius-control)]" : "h-10 px-4 text-sm rounded-[var(--radius-control)]";

  const variants =
    variant === "primary"
      ? "bg-accent text-[color:var(--color-accent-ink)] hover:opacity-90"
      : variant === "secondary"
        ? "border border-border bg-white/0 hover:bg-white/5"
        : "bg-transparent hover:bg-white/5";

  return <button type={type} className={cn(base, sizes, variants, className)} {...props} />;
};

export default Button;