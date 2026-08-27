import type { HTMLAttributes } from "react";
import cn from "../../utils/cn";

const Badge = ({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-bg/30 px-2.5 py-1 text-xs text-muted",
        className
      )}
      {...props}
    />
  );
};

export default Badge;