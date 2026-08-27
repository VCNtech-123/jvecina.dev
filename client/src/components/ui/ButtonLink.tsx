import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import cn from "../../utils/cn";

type Props = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
} & (
  | { to: string; href?: never; external?: never }
  | { href: string; to?: never; external?: boolean }
);

const ButtonLink = (props: Props & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { variant = "secondary", size = "md", className = "", ...rest } = props;

  const base =
    "inline-flex items-center justify-center font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";
  const sizes =
    size === "sm"
      ? "h-9 px-3 text-sm rounded-[var(--radius-control)]"
      : "h-10 px-4 text-sm rounded-[var(--radius-control)]";

  const variants =
    variant === "primary"
      ? "bg-accent text-[color:var(--color-accent-ink)] hover:opacity-90"
      : variant === "secondary"
        ? "border border-border bg-white/0 hover:bg-white/5"
        : "bg-transparent hover:bg-white/5";

  const classes = cn(base, sizes, variants, className);

  if (rest.to) {
    return <Link to={rest.to} className={classes}>{rest.children}</Link>;
  }

  const external = rest.external ?? true;
  return (
    <a
      href={rest.href}
      className={classes}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {rest.children}
    </a>
  );
};

export default ButtonLink;