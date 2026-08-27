import type { TextareaHTMLAttributes } from "react";
import cn from "../../utils/cn";

const Textarea = ({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-[var(--radius-control)] border border-border bg-bg/40 px-3 py-2 text-sm text-text placeholder:text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;