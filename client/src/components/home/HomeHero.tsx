
import { Link } from "react-router-dom";
import Container from "../ui/Container";

const STAGES = ["Idea", "Design", "Building", "Deploy"] as const;
const ACTIVE_STAGE_INDEX = 2; 

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const BuildPipeline = () => (
  <div>
    <div className="flex items-center" aria-hidden="true">
      {STAGES.map((stage, i) => (
        <div key={stage} className="flex items-center">
          <span
            className={[
              "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300",
              i < ACTIVE_STAGE_INDEX ? "bg-accent/40" : i === ACTIVE_STAGE_INDEX ? "bg-accent" : "bg-border",
              i === ACTIVE_STAGE_INDEX ? "animate-pulse motion-reduce:animate-none" : "",
            ].join(" ")}
          />
          {i < STAGES.length - 1 ? (
            <span
              className={[
                "h-px w-5 sm:w-7",
                i < ACTIVE_STAGE_INDEX ? "bg-accent/40" : "bg-border",
              ].join(" ")}
            />
          ) : null}
        </div>
      ))}
    </div>
    <p className="mt-2 text-sm text-text">
      {STAGES[ACTIVE_STAGE_INDEX]} stage · <span className="text-accent">Plinth</span>
    </p>
  </div>
);

const HomeHero = () => {
  return (
    <section className="relative overflow-hidden py-10 md:py-28 lg:py-15">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-glow-pulse rounded-full bg-accent/20 blur-[100px] motion-reduce:animate-none"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex animate-fade-up items-center gap-3 motion-reduce:animate-none">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              John Francis Vecina · Full-stack developer
            </p>
          </div>

          {/* Main heading */}
          <h1
            className="mt-6 max-w-4xl animate-fade-up text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] motion-reduce:animate-none sm:text-[56px] md:text-[68px] lg:text-[76px]"
            style={{ animationDelay: "80ms" }}
          >
            I build web applications
            <br className="hidden sm:block" />
            <span className="text-accent"> from idea to deployment.</span>
          </h1>

          {/* Description */}
          <p
            className="mt-7 max-w-2xl animate-fade-up text-[16px] leading-7 text-muted motion-reduce:animate-none md:text-[17px]"
            style={{ animationDelay: "160ms" }}
          >
            I work with React, TypeScript, Node.js, and MongoDB to build practical applications with clean interfaces, 
            structured APIs, and maintainable code.
          </p>

          {/* Actions */}
          <div
            className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 motion-reduce:animate-none"
            style={{ animationDelay: "240ms" }}
          >
            <Link to="/projects" className="group/cta btn-primary">
              View projects
              <ArrowIcon className="ml-1.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>

            <Link to="/contact" className="btn-secondary">
              Get in touch
            </Link>

            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="group/cta btn-ghost">
              Resume
              <ArrowIcon className="ml-1.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </div>

          {/* Bottom metadata */}
          <div
            className="mt-12 flex animate-fade-up flex-col gap-5 border-t border-border pt-6 motion-reduce:animate-none sm:flex-row sm:items-center sm:gap-8"
            style={{ animationDelay: "320ms" }}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Currently</p>
              <div className="mt-1.5">
                <BuildPipeline />
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Stack</p>
              <p className="mt-1 text-sm text-text">React · TypeScript · Node.js · MongoDB</p>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Based in</p>
              <p className="mt-1 text-sm text-text">Manila, Philippines</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;