const ProjectCardSkeleton = ({ featured = false }: { featured?: boolean }) => (
  <div className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface">
    <div className={["animate-pulse bg-surface-hover", featured ? "aspect-[4/2]" : "aspect-[4/3]"].join(" ")} />
    <div className={featured ? "flex flex-1 flex-col gap-3 p-6" : "flex flex-1 flex-col gap-3 p-5"}>
      <div className="h-4 w-2/3 animate-pulse rounded bg-surface-hover" />
      <div className="h-3 w-full animate-pulse rounded bg-surface-hover" />
      <div className="h-3 w-4/5 animate-pulse rounded bg-surface-hover" />
      <div className="mt-auto flex gap-2 border-t border-border/60 pt-5">
        <div className="h-6 w-16 animate-pulse rounded-md bg-surface-hover" />
        <div className="h-6 w-16 animate-pulse rounded-md bg-surface-hover" />
      </div>
    </div>
  </div>
);

export default ProjectCardSkeleton;