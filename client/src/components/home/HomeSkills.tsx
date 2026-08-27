// client/src/components/home/HomeSkills.tsx
import Container from "../ui/Container";
import Card from "../ui/Card";
import TechBadge from "../projects/TechBadge";

type SkillGroup = {
  label: string;
  description: string;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Frontend",
    description: "React + TypeScript UI, built with consistent structure and accessible interactions.",
    items: ["react", "typescript", "tailwind"],
  },
  {
    label: "Backend",
    description: "Express APIs with auth, validation, and clean service/controller separation.",
    items: ["nodejs", "express"],
  },
  {
    label: "Database",
    description: "Modeling data and writing reliable queries across relational and document stores.",
    items: ["postgresql", "mongodb"],
  },
];

const HomeSkills = () => {
  return (
    <section className="mt-14">
      <Container>
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">Toolkit</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">What I build with</h2>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <Card key={group.label} className="p-6">
              <h3 className="text-[17px] font-semibold tracking-tight">{group.label}</h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">{group.description}</p>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-border/60 pt-4">
                {group.items.map((key) => (
                  <TechBadge key={key} techKey={key} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeSkills;