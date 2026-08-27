import ProjectCardSkeleton from "./ProjectCardSkeleton";

const ProjectsSkeletonGrid = () => (
  <div className="grid gap-4 lg:grid-cols-12" aria-hidden="true">
    <div className="lg:col-span-6">
      <ProjectCardSkeleton featured />
    </div>
    <div className="lg:col-span-6">
      <ProjectCardSkeleton featured />
    </div>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="lg:col-span-4">
        <ProjectCardSkeleton />
      </div>
    ))}
  </div>
);

export default ProjectsSkeletonGrid;