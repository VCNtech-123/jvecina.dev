import { useCallback, useEffect, useMemo, useState } from "react";
import api, { getErrorMessage } from "../api/api";
import type { ApiListResponse, Project } from "../types/api";

import Container from "../components/ui/Container";
import ProjectsGrid from "../components/projects/ProjectGrid";
import ProjectsSkeletonGrid from "../components/projects/ProjectSkeletonGrid";
import ProjectsErrorState from "../components/projects/ProjectsErrorState";
import ProjectsEmptyState from "../components/projects/ProjectEmptyState";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get<ApiListResponse<Project>>("/api/projects", {
          signal: controller.signal,
        });

        setProjects(res.data.data);
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(getErrorMessage(e));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [reloadToken]);

  const retry = useCallback(() => setReloadToken((n) => n + 1), []);

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
          A selection of full-stack work — focused on clean APIs, reliable data models, and polished UI.
        </p>
      </header>

      {loading ? (
        <ProjectsSkeletonGrid />
      ) : error ? (
        <ProjectsErrorState message={error} onRetry={retry} />
      ) : projects.length === 0 ? (
        <ProjectsEmptyState />
      ) : (
        <ProjectsGrid featured={featured} rest={rest} />
      )}
    </Container>
  );
};

export default ProjectsPage;