import type { Project } from "../../types/api";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import ButtonLink from "../ui/ButtonLink";

const ProjectListItem = ({ project }: { project: Project }) => {
  const cover = project.images?.[0];

  return (
    <Card className="p-4">
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-bg/30">
          {cover ? (
            <img
              src={cover}
              alt={`${project.title} screenshot`}
              className="h-40 w-full object-cover md:h-full"
              loading="lazy"
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center text-xs text-muted md:h-full">
              No preview
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {project.summary}
              </p>
            </div>
          </div>

          {project.techStack?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.slice(0, 8).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink to={`/projects/${project.slug}`} variant="primary">
              View case study
            </ButtonLink>

            {project.githubUrl ? (
              <ButtonLink href={project.githubUrl} variant="secondary">
                GitHub
              </ButtonLink>
            ) : null}

            {project.liveUrl ? (
              <ButtonLink href={project.liveUrl} variant="secondary">
                Live
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectListItem;