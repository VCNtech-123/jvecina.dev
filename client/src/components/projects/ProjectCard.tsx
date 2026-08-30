import { Link } from "react-router-dom";
import type { Project } from "../../types/api";
import Card from "../ui/Card";
import TechBadge from "./TechBadge";
import { ArrowIcon, ExternalLinkIcon, GithubIcon } from "./icons";

const FEATURED_TAG_LIMIT = 8;
const DEFAULT_TAG_LIMIT = 6;

const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  const cover = project.images?.[0];
  const tagLimit = featured ? FEATURED_TAG_LIMIT : DEFAULT_TAG_LIMIT;
  const tags = (project.techStack ?? []).slice(0, tagLimit);
  const detailHref = `/${project.slug}`;

  return (
    <Card
      className={[
        "group relative flex h-full flex-col overflow-hidden p-0",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card",
      ].join(" ")}
    >
      <Link
        to={detailHref}
        className="flex flex-1 flex-col rounded-t-card outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <div
          className={[
            "relative overflow-hidden border-b border-border bg-bg/30",
            featured ? "aspect-4/2" : "aspect-4/3",
          ].join(" ")}
        >
          {cover ? (
            <img
              src={cover}
              alt={`${project.title} screenshot`}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted">
              No preview
            </div>
          )}

          {project.featured ? (
            <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-ink shadow-sm">
              Featured
            </span>
          ) : null}
        </div>

        <div className={featured ? "flex flex-1 flex-col p-6" : "flex flex-1 flex-col p-5"}>
          <h3
            className={[
              "relative w-fit font-bold leading-tight tracking-tight",
              featured ? "text-[19px]" : "text-[17px]",
            ].join(" ")}
          >
            {project.title}
            <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </h3>

          <p
            className={[
              "text-muted",
              featured ? "mt-3 line-clamp-3 text-[15px] leading-6" : "mt-2.5 line-clamp-2 text-[14px] leading-6",
            ].join(" ")}
          >
            {project.summary}
          </p>

          {tags.length ? (
            <div
              className="mt-5 flex flex-nowrap items-center gap-x-2.5 overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 85%, transparent 100%)",
              }}
            >
              {tags.map((t, i) => (
                <span key={t} className="flex shrink-0 items-center gap-2.5">
                  {i > 0 ? <span className="text-border">·</span> : null}
                  <TechBadge techKey={t} />
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 px-5 py-4 md:px-6 md:py-5">
        <Link
          to={detailHref}
          className="group/cta inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-text outline-none focus-visible:text-accent"
        >
          View project
          <ArrowIcon className="transition-transform duration-200 group-hover/cta:translate-x-1" />
        </Link>

        <div className="flex items-center gap-2">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted outline-none transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
            >
              <GithubIcon />
            </a>
          ) : null}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live site`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted outline-none transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
            >
              <ExternalLinkIcon />
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;