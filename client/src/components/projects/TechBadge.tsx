import { memo } from "react";
import type { CSSProperties } from "react";
import Badge from "../ui/Badge";
import { techMap } from "../../utils/tech";

const FALLBACK_DOT_COLOR = "#a1a1aa";

const TechBadge = ({ techKey }: { techKey: string }) => {
  const entry = techMap[techKey];

  // unknown key
  if (!entry) {
    return (
      <Badge className="gap-1.5 whitespace-nowrap text-text/80">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: FALLBACK_DOT_COLOR }}
        />
        <span>{techKey}</span>
      </Badge>
    );
  }

  const { label, Icon, color } = entry;

  const iconStyle: CSSProperties | undefined = color ? { color } : undefined;

  return (
    <Badge className="gap-1.5 whitespace-nowrap text-text/80">
      {Icon ? (
        <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" style={iconStyle} />
      ) : (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: color ?? FALLBACK_DOT_COLOR }}
        />
      )}
      <span>{label}</span>
    </Badge>
  );
};

export default memo(TechBadge);