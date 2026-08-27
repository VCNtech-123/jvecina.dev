import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../api/api"; 
import type { ApiListResponse, Project } from "../types/api";

import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import TechBadge from "../components/projects/TechBadge";

const ExternalLinkIcon = () => (
  <svg
    width="13"
    height="13"
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

const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  const cover = project.images?.[0];

  return (
    <Card
      className={[
        "group flex h-full flex-col overflow-hidden p-0",
        "transition-all duration-200 hover:-translate-y-0.5",
      ].join(" ")}
    >
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
            <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-[color:var(--color-accent-ink)] shadow-sm">
              Featured
            </span>
          ) : null}
        </div>
      </Link>

      <div className={featured ? "flex flex-1 flex-col p-6" : "flex flex-1 flex-col p-5"}>
        <Link to={`/projects/${project.slug}`} className="block">
          <h3
            className={[
              "font-semibold leading-tight tracking-tight transition-colors",
              "group-hover:text-accent",
              featured ? "text-[18px]" : "text-[17px]",
            ].join(" ")}
          >
            {project.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 text-[15px] leading-6 text-muted">
          {project.summary}
        </p>

        {project.techStack?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, featured ? 10 : 8).map((t) => (
              <TechBadge key={t} techKey={t} />
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="text-[14.5px] font-medium text-muted transition-colors hover:text-text"
          >
            View project
          </Link>

          <div className="flex items-center gap-4">
            {project.githubUrl ? (
              <a
                className="flex items-center gap-1.5 text-[14.5px] text-muted transition-colors hover:text-text"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            ) : null}

            {project.liveUrl ? (
              <a
                className="flex items-center gap-1.5 text-[14.5px] text-muted transition-colors hover:text-text"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLinkIcon />
                Live
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

      {/* 12-col grid = better hierarchy control */}
      <div className="grid gap-4 lg:grid-cols-12">
        {featured.map((p) => (
          <div key={p.id ?? p._id ?? p.slug} className="lg:col-span-6">
            <ProjectCard project={p} featured />
          </div>
        ))}

        {rest.map((p) => (
          <div key={p.id ?? p._id ?? p.slug} className="sm:col-span-1 lg:col-span-4">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProjectsPage;