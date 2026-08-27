import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";
import type { IconType } from "react-icons";

type TechEntry = {
  label: string;
  Icon: IconType;
  color: string;
};

export const techMap: Record<string, TechEntry> = {
  react: { label: "React", Icon: SiReact, color: "#61DAFB" },
  typescript: { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  javascript: { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  nodejs: { label: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  express: { label: "Express", Icon: SiExpress, color: "#FFFFFF" },
  mongodb: { label: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  postgresql: { label: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  tailwind: { label: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
} as const;