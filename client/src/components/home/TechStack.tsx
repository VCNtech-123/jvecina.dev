import type { ComponentType, ReactNode } from "react";
import { Layout, Server, Database, Wrench } from "lucide-react";
import Container from "../ui/Container";
import Card from "../ui/Card";
import TechBadge from "../projects/TechBadge";

const StackCard = ({
  icon: Icon,
  title,
  description,
  children,
  className = "",
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Card
      className={[
        "group relative overflow-hidden p-6",
        "transition-transform duration-200 hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg/30 text-muted transition-colors group-hover:text-accent">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-[17px] font-semibold tracking-tight text-text">{title}</h3>
      <p className="mt-2 text-[15px] leading-6 text-muted">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">{children}</div>
    </Card>
  );
};

const TechStackSection = () => {
  const frontend = ["react", "typescript", "javascript", "tailwind"];
  const backend = ["nodejs", "express"];
  const databases = ["mongodb", "postgresql"];

  const tools = ["git", "github", "docker", "vite", "postman", "figma"];

  return (
    <section id="skills" className="py-12 scroll-mt-24">
      <Container>
        <header className="mb-8">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
            Skills
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Tech stack</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted">
            Tools I use to build full-stack applications with clean UI, reliable APIs, and solid data models.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StackCard
            icon={Layout}
            title="Frontend"
            description="Component architecture, UI consistency, and state-driven UX."
          >
            {frontend.map((t) => (
              <TechBadge key={t} techKey={t} />
            ))}
          </StackCard>

          <StackCard
            icon={Server}
            title="Backend"
            description="Auth, REST design, and clean service/controller structure."
          >
            {backend.map((t) => (
              <TechBadge key={t} techKey={t} />
            ))}
          </StackCard>

          <StackCard
            icon={Database}
            title="Databases"
            description="Schema design, indexes, and query patterns for real apps."
            className="md:col-span-2 lg:col-span-1"
          >
            {databases.map((t) => (
              <TechBadge key={t} techKey={t} />
            ))}
          </StackCard>

          <Card className="p-6 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg/30 text-muted">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight text-text">Tools</h3>
                <p className="mt-2 text-[15px] leading-6 text-muted">
                  Workflow tools for building, debugging, and shipping.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end">
                {tools.map((t) => (
                  <TechBadge key={t} techKey={t} />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default TechStackSection;