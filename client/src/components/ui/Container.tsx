import type { HTMLAttributes } from "react";
import cn from "../../utils/cn";

const Container = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("container-page", className)} {...props} />;
};

export default Container;