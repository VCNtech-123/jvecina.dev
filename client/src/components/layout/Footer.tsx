import Container from "../ui/Container";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} John Francis Vecina
        </p>

        <p className="text-sm text-muted">
          Built with React, TypeScript, Tailwind, Node.js, and MongoDB.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;