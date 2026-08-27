import Container from "../ui/Container";
import Card from "../ui/Card";
import TechBadge from "../projects/TechBadge";

const StackCard = ({
  title,
  desc,
  tech,
  className = "",
}: {
  title: string;
  desc: string;
  tech: string[];
  className?: string;
}) => {
  return (
    <Card className={["h-full p-6", className].join(" ")}>
      <div className="flex h-full flex-col">
        <div>
          <h3 className="text-[17px] font-semibold tracking-tight text-text">{title}</h3>
          <p className="mt-2 text-[15px] leading-6 text-muted">{desc}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {tech.map((t) => (
              <TechBadge key={t} techKey={t} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

const TechStackSection = () => {
  const frontend = ["react", "typescript", "javascript", "tailwind", "vite"];
  const backend = ["nodejs", "express", "zod", "jwt", "cookies", "rest"];
  const data = ["mongodb", "postgresql", "redis"];
  const qualityInfra = ["jest", "supertest", "docker", "githubactions"];
  const workflow = ["git", "github", "postman", "figma"];
  const deployment = ["vercel", "render", "atlas"];

  return (
    <section id="skills" className="py-12 scroll-mt-24">
      <Container>
        <header className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Tech stack</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted">
            Tools I use to build production-style full-stack apps UI, APIs, data, testing, and shipping.
          </p>
        </header>

        {/* grounded layout: 12-col grid */}
        <div className="grid items-stretch gap-4 lg:grid-cols-12">
          {/* Top row */}
          <div className="lg:col-span-4">
            <StackCard
              title="Frontend"
              desc="Component architecture, UI consistency, and strong typing."
              tech={frontend}
            />
          </div>

          <div className="lg:col-span-4">
            <StackCard
              title="Backend"
              desc="Auth, validation, and clean service/controller structure."
              tech={backend}
            />
          </div>

          <div className="lg:col-span-4">
            <StackCard
              title="Data & caching"
              desc="Schema design, indexes, query patterns, and performance-minded reads."
              tech={data}
            />
          </div>

          {/* Bottom row (balanced) */}
          <div className="lg:col-span-6">
            <StackCard
              title="Quality & infrastructure"
              desc="Tests, containers, and CI as a quality gate."
              tech={qualityInfra}
            />
          </div>

          <div className="lg:col-span-3">
            <StackCard
              title="Workflow"
              desc="Daily tools for building and debugging."
              tech={workflow}
            />
          </div>

          <div className="lg:col-span-3">
            <StackCard
              title="Deployment"
              desc="Where I host and ship projects."
              tech={deployment}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TechStackSection;