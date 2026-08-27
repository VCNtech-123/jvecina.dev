import Badge from "../ui/Badge";
import { techMap } from "../../utils/tech";

const TechBadge = ({ techKey }: { techKey: string }) => {
  const entry = techMap[techKey];

  if (!entry) return <Badge className="text-text/80">{techKey}</Badge>;

  const { label, Icon, color } = entry;

  return (
    <Badge className="text-text/80">
      <Icon className="h-3.5 w-3.5" style={{ color }} />
      <span>{label}</span>
    </Badge>
  );
};

export default TechBadge;