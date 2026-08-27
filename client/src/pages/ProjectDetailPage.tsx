import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { getErrorMessage } from "../api/api";
import type { ApiOneResponse, Project } from "../types/api";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import ButtonLink from "../components/ui/ButtonLink";
import Card from "../components/ui/Card";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      setLoading(true);
      setError("");
      setProject(null);

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

  if (loading) return <Container className="py-12 text-sm text-muted">Loading…</Container>;
  if (error) return <Container className="py-12 text-sm text-red-300">{error}</Container>;
  if (!project) return <Container className="py-12 text-sm text-muted">Not found.</Container>;

  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.githubUrl ? <ButtonLink href={project.githubUrl}>GitHub</ButtonLink> : null}
          {project.liveUrl ? <ButtonLink href={project.liveUrl}>Live</ButtonLink> : null}
        </div>

        {project.techStack?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        ) : null}
      </header>

      <div className="grid gap-6">
        {project.images?.length ? (
          <Card className="p-3">
            <img
              src={project.images[0]}
              alt={`${project.title} preview`}
              className="w-full rounded-xl border border-border object-cover"
            />
          </Card>
        ) : null}

        <Card className="p-6">
          <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
          <p className="mt-2 whitespace-pre-line text-sm text-muted">
            {project.description || "No description yet."}
          </p>

          {project.highlights?.length ? (
            <>
              <h3 className="mt-6 text-sm font-semibold">Highlights</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </>
          ) : null}
        </Card>
      </div>
    </Container>
  );
};

export default ProjectDetailPage;