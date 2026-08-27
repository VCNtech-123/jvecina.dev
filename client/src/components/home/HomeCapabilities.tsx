import Container from "../ui/Container";
import Card from "../ui/Card";

const HomeCapabilities = () => {
  return (
    <section className="mt-14">
      <Container>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-[17px] font-semibold tracking-tight">Frontend</h3>
            <p className="mt-2 text-[15px] leading-6 text-muted">
              React + TypeScript UI with good component structure, consistent styling, and accessible
              interactions.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-[17px] font-semibold tracking-tight">Backend</h3>
            <p className="mt-2 text-[15px] leading-6 text-muted">
              Express APIs with auth, validation, error handling, and clean service/controller
              separation.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-[17px] font-semibold tracking-tight">Data</h3>
            <p className="mt-2 text-[15px] leading-6 text-muted">
              MongoDB + PostgreSQL experience—modeling data, writing reliable queries, and designing
              predictable API responses.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default HomeCapabilities;