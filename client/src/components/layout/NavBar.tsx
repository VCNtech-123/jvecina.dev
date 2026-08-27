import { NavLink } from "react-router-dom";
import Container from "../ui/Container";
import cn from "../../utils/cn";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm transition",
      isActive ? "text-text" : "text-muted hover:text-text"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="text-sm font-semibold tracking-tight">
            <span className="text-muted">jvecina</span>
            <span className="text-accent">.dev</span>
          </NavLink>

          <nav className="hidden items-center gap-4 md:flex">
            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            className="text-sm text-muted transition hover:text-text"
            href="https://github.com/your-username"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-sm text-muted transition hover:text-text"
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;