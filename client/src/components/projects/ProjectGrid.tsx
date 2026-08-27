import type { Project } from "../../types/api";
import ProjectCard from "./ProjectCard";

const STAGGER_STEP_MS = 60;
const STAGGER_CAP_MS = 420;

const ProjectsGrid = ({ featured, rest }: { featured: Project[]; rest: Project[] }) => {
  const staggerDelay = (index: number) =>
    `${Math.min(index * STAGGER_STEP_MS, STAGGER_CAP_MS)}ms`;

  return (
    <div className="flex flex-col gap-4">
      {featured.length ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-4">
          {featured.map((p, i) => (
            <div
              key={p.id ?? p._id ?? p.slug}
              className="animate-fade-up"
              style={{ animationDelay: staggerDelay(i) }}
            >
              <ProjectCard project={p} featured />
            </div>
          ))}
        </div>
      ) : null}

      {rest.length ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
          {rest.map((p, i) => (
            <div
              key={p.id ?? p._id ?? p.slug}
              className="animate-fade-up"
              style={{ animationDelay: staggerDelay(featured.length + i) }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProjectsGrid;