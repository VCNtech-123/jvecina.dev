import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { getErrorMessage } from "../api/api";
import type { ApiOneResponse, Project } from "../types/api";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import ButtonLink from "../components/ui/ButtonLink";
import Card from "../components/ui/Card";
import GithubReadme from "../components/projects/GithubReadme";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let ignore = false;

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
        const res = await api.get<ApiOneResponse<Project>>(`/api/projects/${slug}`);
        if (!ignore) setProject(res.data.data);
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
        <Card className="max-w-lg p-6 text-sm text-red-300">
          <p className="font-medium">Something went wrong</p>
          <p className="mt-1 text-red-300/80">{error}</p>
          <Link to="/projects" className="mt-4 inline-block text-sm underline underline-offset-4">
            Back to projects
          </Link>
        </Card>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="py-12">
        <Card className="max-w-lg p-6 text-sm text-muted">
          <p className="font-medium">Project not found</p>
          <Link to="/projects" className="mt-4 inline-block text-sm underline underline-offset-4">
            Back to projects
          </Link>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <Link to="/projects" className="text-sm text-muted transition hover:text-current">
        ← All projects
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        {project.summary ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {project.summary}
          </p>
        ) : null}
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
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
                      className={`shrink-0 overflow-hidden rounded-lg border transition ${
                        i === activeImage ? "border-current" : "border-border opacity-60 hover:opacity-100"
                      }`}
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

        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          {project.githubUrl || project.liveUrl ? (
            <Card className="p-5">
              <h3 className="text-sm font-semibold tracking-tight">Links</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.githubUrl ? <ButtonLink href={project.githubUrl}>GitHub</ButtonLink> : null}
                {project.liveUrl ? <ButtonLink href={project.liveUrl}>Live</ButtonLink> : null}
              </div>
            </Card>
          ) : null}

          {project.techStack?.length ? (
            <Card className="p-5">
              <h3 className="text-sm font-semibold tracking-tight">Tech stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <Badge key={t}>{t}</Badge>
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