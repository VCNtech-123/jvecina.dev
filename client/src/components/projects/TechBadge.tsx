// client/src/components/projects/TechBadge.tsx
import React, { memo } from "react";
import Badge from "../ui/Badge";
import { techMap } from "../../utils/tech";

const FALLBACK_DOT_COLOR = "#a1a1aa";

interface TechProps {
  techKey: string;
}

type TechEntry = {
  label: string;
  Icon?: React.ElementType;
  color?: string;
};

const TechBadge = memo(function TechBadge({ techKey }: TechProps) {
  const entry = techMap[techKey as keyof typeof techMap] as TechEntry | undefined;

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

  return (
    <Badge className="gap-1.5 whitespace-nowrap text-text/80">
      {Icon ? (
        <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" style={{ color }} />
      ) : (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: color || FALLBACK_DOT_COLOR }}
        />
      )}
      <span>{label}</span>
    </Badge>
  );
});

TechBadge.displayName = "TechBadge";
export default TechBadge;

export const TechIcon = memo(function TechIcon({ techKey }: TechProps) {
  const entry = techMap[techKey as keyof typeof techMap] as TechEntry | undefined;

  if (!entry) {
    return (
      <span
        role="img"
        title={techKey}
        aria-label={techKey}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-muted ring-4 ring-bg transition-transform duration-200 hover:-translate-y-0.5"
      >
        {techKey.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  const { label, Icon, color } = entry;

  return (
    <span
      role="img"
      title={label}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface ring-4 ring-bg transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent/40"
    >
      {Icon ? (
        <Icon aria-hidden="true" className="h-5 w-5" style={{ color }} />
      ) : (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color || FALLBACK_DOT_COLOR }}
        />
      )}
    </span>
  );
});

TechIcon.displayName = "TechIcon";