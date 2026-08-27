import type { HTMLAttributes } from "react";
import cn from "../../utils/cn";

type Props = HTMLAttributes<HTMLDivElement> & { interactive?: boolean };

const Card = ({ className = "", interactive = false, ...props }: Props) => {
  return (
    <div
      className={cn(
        "card-shell",
        interactive ? "hover:-translate-y-px" : "",
        className
      )}
      {...props}
    />
  );
};

export default Card;