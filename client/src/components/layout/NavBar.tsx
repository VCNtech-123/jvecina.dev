import { NavLink } from "react-router-dom";
import Container from "../ui/Container";
import cn from "../../utils/cn";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative px-2 py-1.5 text-[13px] font-medium transition-colors",
      "after:absolute after:inset-x-2 after:-bottom-[7px] after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform",
      isActive
        ? "text-text after:scale-x-100"
        : "text-muted hover:text-text"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        {/* Brand + Navigation */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className="group flex items-center text-[15px] font-semibold tracking-tight"
            aria-label="jvecina.dev home"
          >
            <span className="text-text transition-colors group-hover:text-accent">
              jvecina
            </span>
            <span className="text-accent">.dev</span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>

            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>
        </div>

        {/* External Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] font-medium text-muted transition-colors hover:text-text"
          >
            GitHub
            <span className="ml-1 text-[10px] opacity-50">↗</span>
          </a>

          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] font-medium text-muted transition-colors hover:text-text"
          >
            LinkedIn
            <span className="ml-1 text-[10px] opacity-50">↗</span>
          </a>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;