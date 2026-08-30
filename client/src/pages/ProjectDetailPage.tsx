// client/src/pages/ProjectDetailPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { SiGithub } from "react-icons/si";

import api, { getErrorMessage } from "../api/api";
import type { ApiOneResponse, Project } from "../types/api";

import Container from "../components/ui/Container";
import ButtonLink from "../components/ui/ButtonLink";
import Card from "../components/ui/Card";
import GithubReadme from "../components/projects/GithubReadme";
import TechBadge from "../components/projects/TechBadge";

const BackToProjectsButton = ({ onClick, className = "" }: { onClick: () => void; className?: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "inline-flex items-center gap-2",
      "rounded-md px-2 py-1 -ml-2",
      "text-sm font-medium text-muted",
      "transition-colors hover:text-text hover:bg-surface-hover",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
      className,
    ].join(" ")}
  >
    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
    <span>Back to projects</span>
  </button>
);

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [activeImage, setActiveImage] = useState(0);

  const goBackToProjectsSection = () => {
    navigate("/", { state: { scrollTo: "projects" } });
  };

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      setError("");
      setProject(null);
      setActiveImage(0);

      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        try {
          const staticRes = await api.get<Project[]>("/projects.json", {
            baseURL: "",
            withCredentials: false,
            signal: controller.signal,
          });

          if (Array.isArray(staticRes.data)) {
            const found = staticRes.data.find((p) => p.slug === slug);
            if (found) {
              setProject(found);
              setLoading(false);
              return;
            }
          }
        } catch {
        }

        const res = await api.get<ApiOneResponse<Project>>(`/api/projects/${slug}`, {
          signal: controller.signal,
        });

        setProject(res.data.data);
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(getErrorMessage(e));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <Container className="py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-24 rounded bg-white/5" />
          <div className="h-9 w-2/3 rounded bg-white/5" />
          <div className="h-4 w-full max-w-xl rounded bg-white/5" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-64 rounded-xl bg-white/5 lg:col-span-2" />
            <div className="h-64 rounded-xl bg-white/5" />
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-12">
        <Card className="max-w-lg p-6 text-sm">
          <p className="font-medium text-text">Something went wrong</p>
          <p className="mt-1 text-red-300/80">{error}</p>

          <BackToProjectsButton className="mt-4" onClick={goBackToProjectsSection} />
        </Card>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="py-12">
        <Card className="max-w-lg p-6 text-sm">
          <p className="font-medium text-text">Project not found</p>
          <p className="mt-1 text-muted">The project you're looking for doesn't exist.</p>

          <BackToProjectsButton className="mt-4" onClick={goBackToProjectsSection} />
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <BackToProjectsButton onClick={goBackToProjectsSection} />

      <header className="mb-10 mt-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        {project.summary ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {project.summary}
          </p>
        ) : null}
      </header>

      <div className="grid gap-8 lg:grid-cols-3 lg:grid-rows-[auto_1fr]">
        {(project.githubUrl || project.liveUrl) && (
          <Card className="order-1 p-5 lg:order-2 lg:col-start-3 lg:row-start-1">
            <h3 className="text-sm font-semibold tracking-tight">Links</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.githubUrl ? (
                <ButtonLink href={project.githubUrl}>
                  <span className="inline-flex items-center gap-1.5">
                    <SiGithub className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </span>
                </ButtonLink>
              ) : null}

              {project.liveUrl ? (
                <ButtonLink href={project.liveUrl}>
                  <span className="inline-flex items-center gap-1.5">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live
                  </span>
                </ButtonLink>
              ) : null}
            </div>
          </Card>
        )}

        <div className="order-2 space-y-6 lg:order-1 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1">
          {project.images?.length ? (
            <Card className="p-3">
              <img
                src={project.images[activeImage]}
                alt={`${project.title} preview`}
                className="w-full rounded-xl border border-border object-cover"
              />

              {project.images.length > 1 ? (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {project.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={[
                        "shrink-0 overflow-hidden rounded-lg border transition",
                        i === activeImage ? "border-accent" : "border-border opacity-60 hover:opacity-100",
                      ].join(" ")}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} alt="" className="h-14 w-20 object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </Card>
          ) : null}

          <Card className="p-6">
            <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
            <div className="mt-2">
              <GithubReadme githubUrl={project.githubUrl} fallback={project.description} />
            </div>
          </Card>
        </div>

        <div className="order-3 space-y-6 lg:order-3 lg:col-start-3 lg:row-start-2 lg:self-start">
          {project.techStack?.length ? (
            <Card className="p-5">
              <h3 className="text-sm font-semibold tracking-tight">Tech stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <TechBadge key={t} techKey={t} />
                ))}
              </div>
            </Card>
          ) : null}

          {project.highlights?.length ? (
            <Card className="p-5">
              <h3 className="text-sm font-semibold tracking-tight">Highlights</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default ProjectDetailPage;