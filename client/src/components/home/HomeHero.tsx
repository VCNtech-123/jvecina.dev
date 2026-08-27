import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Card from "../ui/Card";
import TechBadge from "../projects/TechBadge";

const HomeHero = () => {
  return (
    <section className="pt-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          {/* Left: editorial hero */}
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
              Full-stack developer
            </p>

            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              I build full-stack web apps with clean APIs, reliable data, and sharp UI.
            </h1>

            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
              MERN + PostgreSQL experience. I like projects that involve authentication, dashboards,
              and real-world CRUD workflows—built with maintainable architecture.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/projects" className="btn-primary">
                View projects
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact
              </Link>
              <a
                className="btn-ghost"
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-text">Core stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["react", "typescript", "nodejs", "express", "mongodb", "postgresql", "tailwind"].map((t) => (
                  <TechBadge key={t} techKey={t} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: “now” card */}
          <Card className="p-5">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
              Now
            </p>

            <h2 className="mt-2 text-[17px] font-semibold tracking-tight">
              What I’m focused on
            </h2>

            <ul className="mt-3 space-y-3 text-[15px] leading-6 text-muted">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>Building production-style CRUD apps with good validation + error handling.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>Improving UI hierarchy (typography, spacing, layout composition).</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>Deployments + environment configuration + API security basics.</span>
              </li>
            </ul>

            <div className="mt-5 border-t border-border pt-4">
              <p className="text-sm text-muted">
                Based in <span className="text-text">PH</span> • Open to{" "}
                <span className="text-text">full-stack roles</span>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;