// client/src/components/home/HomeContactSection.tsx
import Container from "../ui/Container";
import ContactForm from "../contact/ContactForm";

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

const CONTACT_LINKS = [
  { label: "johnvecina640@gmail.com", href: "mailto:johnvecina640@gmail.com", Icon: MailIcon, external: false },
  { label: "GitHub", href: "https://github.com/your-username", Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-linkedin/", Icon: LinkedinIcon, external: true },
];

const HomeContactSection = () => {
  return (
    <section id="contact" className="py-16 scroll-mt-24 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-16">

          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">Get in touch</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Let's talk</h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
              Want to collaborate or talk about a role? Send a message, I usually reply within{" "}
              <span className="text-text">24-48 hours</span>.
            </p>

            <div className="mt-8 space-y-3 border-t border-border/60 pt-6">
              {CONTACT_LINKS.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="flex items-center gap-2.5 text-[15px] text-muted transition-colors hover:text-text"
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
};

export default HomeContactSection;