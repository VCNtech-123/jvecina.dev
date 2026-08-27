import type { HTMLAttributes } from "react";
import cn from "../../utils/cn";

const Badge = ({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white/0 px-2.5 py-1 text-xs text-muted",
        className
      )}
      {...props}
    />
  );
};

export default Badge;