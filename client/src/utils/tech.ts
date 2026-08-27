import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostman,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

export const frontend = ["react", "typescript", "javascript", "tailwind"];
export const backend = ["nodejs", "express"];
export const databases = ["mongodb", "postgresql"];
export const tools = ["git", "github", "docker", "vite", "postman", "figma"];

type TechEntry = {
  label: string;
  Icon: IconType;
  color: string;
};

export const techMap: Record<string, TechEntry> = {
  react: { label: "React", Icon: SiReact, color: "#61DAFB" },
  typescript: { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  javascript: { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  tailwind: { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  nodejs: { label: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  express: { label: "Express", Icon: SiExpress, color: "#FFFFFF" },
  mongodb: { label: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  postgresql: { label: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  git: { label: "Git", Icon: SiGit, color: "#F05032" },
  github: { label: "GitHub", Icon: SiGithub, color: "#181717" },
  docker: { label: "Docker", Icon: SiDocker, color: "#2496ED" },
  vite: { label: "Vite", Icon: SiVite, color: "#646CFF" },
  postman: { label: "Postman", Icon: SiPostman, color: "#FF6C37" },
  figma: { label: "Figma", Icon: SiFigma, color: "#F24E1E" },
} as const;