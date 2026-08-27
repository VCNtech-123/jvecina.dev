import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../../api/api";
import type { ApiListResponse, Project } from "../../types/api";

import Container from "../ui/Container";
import ProjectCard from "../projects/ProjectCard";
import ProjectCardSkeleton from "../projects/ProjectCardSkeleton";

const FeaturedProjects = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        // if your backend supports ?featured=true, this is best:
        const res = await api.get<ApiListResponse<Project>>("/api/projects?featured=true&limit=6", {
          signal: controller.signal,
        });

        setItems(res.data.data);
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(getErrorMessage(e));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, []);

  return (
    <section className="mt-14">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
              Selected work
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Featured projects
            </h2>
          </div>

          <Link to="/projects" className="text-sm font-medium text-muted hover:text-text">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ProjectCardSkeleton featured />
            <ProjectCardSkeleton featured />
          </div>
        ) : error ? (
          <div className="mt-6 rounded-card border border-border bg-surface px-6 py-10">
            <p className="text-sm text-muted">Failed to load featured projects.</p>
            <p className="mt-1 text-sm text-red-300">{error}</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {items.map((p) => (
              <ProjectCard key={p.id ?? p._id ?? p.slug} project={p} featured />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProjects;