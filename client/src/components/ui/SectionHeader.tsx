import cn from "../../utils/cn";

const SectionHeader = ({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
    </div>
  );
};

export default SectionHeader;