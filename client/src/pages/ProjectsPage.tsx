import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { ApiListResponse, Project } from "../types/api";
import Container from "../components/ui/Container";
import ProjectListItem from "../components/projects/ProjectListItem";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const run = async () => {
      try {
        setError("");
        const res = await api<ApiListResponse<Project>>("/api/projects");
        setProjects(res.data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <Container className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Selected work with a focus on clean architecture, performance, and real-world patterns.
        </p>
      </header>

      {loading ? <div className="text-sm text-muted">Loading…</div> : null}
      {error ? <div className="text-sm text-red-300">{error}</div> : null}

      <div className="space-y-4">
        {projects.map((p) => (
          <ProjectListItem key={p._id ?? p.id ?? p.slug} project={p} />
        ))}
      </div>
    </Container>
  );
};

export default ProjectsPage;