// client/src/pages/ProjectsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../api/api";
import type { ApiListResponse, Project } from "../types/api";

import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import TechBadge from "../components/projects/TechBadge";

const ExternalLinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
  </svg>
);

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  const cover = project.images?.[0];
  const tags = project.techStack?.slice(0, featured ? 8 : 6) ?? [];

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5">
      <Link to={`/projects/${project.slug}`} className="block">
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
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
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
      </Link>

      <div className={featured ? "flex flex-1 flex-col p-6" : "flex flex-1 flex-col p-5"}>
        <Link to={`/projects/${project.slug}`} className="block w-fit">
          <h3
            className={[
              "relative inline-block font-bold leading-tight tracking-tight",
              featured ? "text-[19px]" : "text-[17px]",
            ].join(" ")}
          >
            {project.title}
            <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </h3>
        </Link>

        <p
          className={[
            "text-muted",
            featured ? "mt-3 line-clamp-3 text-[15px] leading-6" : "mt-2.5 line-clamp-2 text-[14px] leading-6",
          ].join(" ")}
        >
          {project.summary}
        </p>

        {tags.length ? (
          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2">
            {tags.map((t, i) => (
              <span key={t} className="flex items-center gap-2.5">
                {i > 0 ? <span className="text-border">·</span> : null}
                <TechBadge techKey={t} />
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-5">
          <Link
            to={`/projects/${project.slug}`}
            className="group/cta inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-text"
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
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
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
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <ExternalLinkIcon />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get<ApiListResponse<Project>>("/api/projects");
        if (!ignore) setProjects(res.data.data);
      } catch (e) {
        if (!ignore) setError(getErrorMessage(e));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    run();

    return () => {
      ignore = true;
    };
  }, []);

  const { featured, rest } = useMemo(() => {
    const f = projects.filter((p) => p.featured);
    const r = projects.filter((p) => !p.featured);
    return { featured: f, rest: r };
  }, [projects]);

  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted">
          A selection of full-stack work—focused on clean APIs, reliable data models, and polished UI.
        </p>
      </header>

      {loading ? <div className="text-[15px] text-muted">Loading…</div> : null}
      {error ? <div className="text-[15px] text-red-300">{error}</div> : null}

      <div className="grid gap-4 lg:grid-cols-12">
        {featured.map((p) => (
          <div key={p.id ?? p._id ?? p.slug} className="lg:col-span-6">
            <ProjectCard project={p} featured />
          </div>
        ))}

        {rest.map((p) => (
          <div key={p.id ?? p._id ?? p.slug} className="lg:col-span-4">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProjectsPage;