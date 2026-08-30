
import Container from "../ui/Container";
import Card from "../ui/Card";
import Resume from "../../assets/John_Francis_Vecina_Resume.pdf"

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const FlaskIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6" />
    <path d="M10 3v6.5L4.5 19a1 1 0 0 0 .87 1.5h13.26a1 1 0 0 0 .87-1.5L14 9.5V3" />
    <path d="M7.5 16h9" />
  </svg>
);

const BoxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3.5 7 8.5-4 8.5 4-8.5 4-8.5-4Z" />
    <path d="M3.5 7v10l8.5 4 8.5-4V7" />
    <path d="M12 11v10" />
  </svg>
);

const HIGHLIGHTS = [
  { Icon: LockIcon, title: "Auth flows", detail: "JWT via httpOnly cookies, protected routes." },
  { Icon: ShieldCheckIcon, title: "Validation-first APIs", detail: "Zod schemas, consistent error responses." },
  { Icon: FlaskIcon, title: "Testing mindset", detail: "Jest / Supertest where reliability matters." },
  { Icon: BoxIcon, title: "Deployment-ready", detail: "Docker, CI basics, environment config." },
];

const HomeAboutSection = () => {
  return (
    <section id="about" className="py-14 scroll-mt-24 md:py-20">
      <Container>
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">About</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">How I like to build things</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-6 text-muted">
          A quick snapshot of how I work and what I focus on.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {/* Main narrative */}
          <Card className="p-6 lg:col-span-7">
            <h3 className="text-[18px] font-semibold tracking-tight text-text">
              Building production-style full-stack apps
            </h3>

            <p className="mt-3 text-[15px] leading-7 text-muted">
              I'm a full-stack developer focused on shipping clean, maintainable web applications. I
              like building systems where the UI, API, and database design all feel consistent good
              validation, predictable error handling, and a smooth user experience.
            </p>

            <div className="mt-6 rounded-xl border border-border/60 bg-surface-hover/40 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Currently building
              </p>
              <p className="mt-1.5 text-[15px] leading-7 text-text">
                <span className="font-medium text-accent">Plinth</span> - a multi-tenant SaaS-style app
                with workspace-based access control, caching, and integration tests.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn-secondary">
                View projects
              </a>
              <a href={Resume} target="_blank" rel="noreferrer" className="btn-ghost">
                Resume
              </a>
            </div>
          </Card>

          {/* Quick focus / highlights */}
          <Card className="p-6 lg:col-span-5">
            <h3 className="text-[18px] font-semibold tracking-tight text-text">
              What you'll see in my work
            </h3>

            <ul className="mt-5 space-y-4">
              {HIGHLIGHTS.map(({ Icon, title, detail }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon />
                  </span>
                  <span className="text-[15px] leading-6 text-muted">
                    <span className="font-medium text-text">{title}</span> - {detail}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border/60 pt-5">
              <p className="text-sm text-muted">
                Based in <span className="text-text">Manila, Philippines</span> · Open to{" "}
                <span className="text-text">full-stack roles</span>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default HomeAboutSection;