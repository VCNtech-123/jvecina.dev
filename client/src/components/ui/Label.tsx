import type { LabelHTMLAttributes } from "react";
import cn from "../../utils/cn";

const Label = ({ className = "", ...props }: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label className={cn("text-sm font-medium text-text", className)} {...props} />;
};

export default Label;