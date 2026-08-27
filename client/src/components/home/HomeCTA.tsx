// client/src/components/home/HomeCTA.tsx
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Card from "../ui/Card";

const HomeCTA = () => {
  return (
    <section className="mt-14 mb-16">
      <Container>
        <Card className="flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Have something to build?</h2>
            <p className="mt-1.5 text-[15px] text-muted">
              Open to full-stack roles — and happy to walk through how any of these were built.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Link to="/contact" className="btn-primary">
              Get in touch
            </Link>
            <Link to="/projects" className="btn-secondary">
              See the work
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default HomeCTA;