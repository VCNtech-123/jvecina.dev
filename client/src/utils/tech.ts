import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiDocker,
  SiVite,
  SiPostman,
  SiFigma,
  SiRedis,
  SiJest,
  SiGithubactions,
  SiVercel,
  SiZod,
  SiRender,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type TechEntry = {
  label: string;
  Icon?: IconType;
  color?: string;
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

  rest: { label: "REST" },
  jwt: { label: "JWT" },
  cookies: { label: "httpOnly Cookies" },
  rbac: { label: "RBAC" },
  ratelimit: { label: "Rate limiting" },
  supertest: { label: "Supertest" },

  git: { label: "Git", Icon: SiGit, color: "#F05032" },
  github: { label: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
  docker: { label: "Docker", Icon: SiDocker, color: "#2496ED" },
  vite: { label: "Vite", Icon: SiVite, color: "#646CFF" },
  postman: { label: "Postman", Icon: SiPostman, color: "#FF6C37" },
  figma: { label: "Figma", Icon: SiFigma, color: "#F24E1E" },

  redis: { label: "Redis", Icon: SiRedis, color: "#DC382D" },
  jest: { label: "Jest", Icon: SiJest, color: "#C21325" },
  githubactions: { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
  zod: { label: "Zod", Icon: SiZod, color: "#3B82F6" },

  vercel: { label: "Vercel", Icon: SiVercel, color: "#FFFFFF" },

  render: { label: "Render", Icon: SiRender, color: "#46E3B7" },

  atlas: { label: "MongoDB Atlas", Icon: SiMongodb, color: "#47A248" },
} as const;