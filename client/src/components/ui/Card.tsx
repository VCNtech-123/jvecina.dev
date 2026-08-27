import type { HTMLAttributes } from "react";
import cn from "../../utils/cn";

const Card = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("rounded-[var(--radius-card)] border border-border bg-surface/75", className)}
      {...props}
    />
  );
};

export default Card;