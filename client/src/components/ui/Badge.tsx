import type { HTMLAttributes } from "react";

const Badge = ({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full",
        "border border-white/10 bg-white/4",
        "px-2.5 py-1 text-xs text-muted",
        className,
      ].join(" ")}
      {...props}
    />
  );
};

export default Badge;