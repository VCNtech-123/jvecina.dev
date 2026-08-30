import { useState } from "react";
import Container from "../ui/Container";
import { TechIcon } from "../projects/TechBadge";
import Profile from "../../assets/profile.png";
import Resume from "../../assets/John_Francis_Vecina_Resume.pdf"

const STAGES = ["Idea", "Design", "Building", "Deploy"] as const;
const ACTIVE_STAGE_INDEX = 2;

const CORE_STACK = ["react", "typescript", "nodejs", "mongodb"];

const INITIALS = "JV";

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
              className={["h-px w-5 sm:w-7", i < ACTIVE_STAGE_INDEX ? "bg-accent/40" : "bg-border"].join(" ")}
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

const ProfilePanel = () => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-70 lg:ml-auto lg:mr-0 lg:max-w-75">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 -z-10 animate-glow-pulse rounded-4xl bg-accent/25 blur-[60px] motion-reduce:animate-none"
      />

      <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-surface to-surface-hover">
          <span className="font-mono text-4xl font-semibold text-muted">{INITIALS}</span>
        </div>

        {!imageFailed ? (
          <img
            src={Profile}
            alt="Portrait of John Francis Vecina"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        ) : null}
      </div>

      <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 shadow-card">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="whitespace-nowrap text-xs font-medium text-text">Open to work</span>
      </div>
    </div>
  );
};

const HomeHero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden py-12 lg:py-0">
      <Container className="relative w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* Left: copy */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex animate-fade-up items-center gap-3 motion-reduce:animate-none">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                John Francis Vecina · Full-stack dev
              </p>
            </div>

            {/* Main heading */}
            <h1
              className="mt-5 animate-fade-up text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] motion-reduce:animate-none sm:text-[48px] md:text-[54px] lg:text-[58px]"
              style={{ animationDelay: "80ms" }}
            >
              Building web apps
              <br className="hidden sm:block" />
              <span className="text-accent"> from idea to deployment.</span>
            </h1>

            {/* Description */}
            <p
              className="mt-6 max-w-135 animate-fade-up text-[16px] leading-relaxed text-muted motion-reduce:animate-none md:text-[17px]"
              style={{ animationDelay: "160ms" }}
            >
              I work with React, TypeScript, Node.js, and MongoDB to build practical applications with clean interfaces, structured APIs, and maintainable code.
            </p>

            {/* Actions */}
            <div
              className="mt-8 flex animate-fade-up flex-wrap items-center gap-4 motion-reduce:animate-none"
              style={{ animationDelay: "240ms" }}
            >
              <a href="#projects" className="group/cta btn-primary">
                View projects
                <ArrowIcon className="ml-1.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </a>

              <a href="#contact" className="btn-secondary">
                Get in touch
              </a>

              <a href={Resume} target="_blank" rel="noreferrer" className="group/cta btn-ghost">
                Resume
                <ArrowIcon className="ml-1.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </a>
            </div>

            <div
              className="mt-12 flex animate-fade-up flex-col gap-8 motion-reduce:animate-none sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-12 sm:gap-y-8"
              style={{ animationDelay: "320ms" }}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Currently</p>
                <div className="mt-3">
                  <BuildPipeline />
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Stack</p>
                <div className="mt-3 flex items-center -space-x-3">
                  {CORE_STACK.map((t) => (
                    <TechIcon key={t} techKey={t} />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Based in</p>
                <p className="mt-3 text-sm text-text">Manila, Philippines</p>
              </div>
            </div>
          </div>

          {/* Right: portrait */}
          <div
            className="order-first w-full animate-fade-up motion-reduce:animate-none lg:order-last"
            style={{ animationDelay: "40ms" }}
          >
            <ProfilePanel />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;