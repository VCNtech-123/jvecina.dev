import { Link } from "react-router-dom";
import Container from "../ui/Container";

const HomeHero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      <Container>
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" />

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              John Francis Vecina · Full-stack developer
            </p>
          </div>

          {/* Main heading */}
          <h1 className="mt-6 max-w-4xl text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[56px] md:text-[68px] lg:text-[76px]">
            I build web applications
            <br className="hidden sm:block" />
            <span className="text-accent"> from idea to deployment.</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-[16px] leading-7 text-muted md:text-[17px]">
            Full-stack developer focused on React, TypeScript, Node.js, and
            MongoDB. I build practical applications with clean interfaces,
            structured APIs, and maintainable code.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="btn-primary">
              View projects
            </Link>

            <Link to="/contact" className="btn-secondary">
              Get in touch
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Resume ↗
            </a>
          </div>

          {/* Bottom metadata */}
          <div className="mt-12 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Currently
              </p>
              <p className="mt-1 text-sm text-text">
                Building <span className="text-accent">Plinth</span>
              </p>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Stack
              </p>
              <p className="mt-1 text-sm text-text">
                React · TypeScript · Node.js · MongoDB
              </p>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Based in
              </p>
              <p className="mt-1 text-sm text-text">
                Manila, Philippines
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;