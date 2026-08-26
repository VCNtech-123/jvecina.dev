import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(80),
    slug: z.string().min(2).max(120).optional(),
    summary: z.string().min(10).max(200),

    description: z.string().max(5000).optional(),
    highlights: z.array(z.string().min(1).max(200)).optional(),
    techStack: z.array(z.string().min(1).max(40)).optional(),

    githubUrl: z.url().optional(),
    liveUrl: z.url().optional(),

    images: z.array(z.url()).optional(),
    featured: z.boolean().optional(),
    order: z.number().int().min(0).optional(),
  }).strict(),

  params: z.object({}).strict(),
  query: z.object({}).strict(),
});

export const getProjectsSchema = z.object({
  body: z.object({}).strict(),
  params: z.object({}).strict(),
  query: z
    .object({
      featured: z.coerce.boolean().optional(),
      page: z.coerce.number().int().min(1).optional(),
      limit: z.coerce.number().int().min(1).max(50).optional(),
    })
    .strict(),
});

export const getProjectBySlugSchema = z.object({
  body: z.object({}).strict(),
  params: z
    .object({
      slug: z.string().min(2).max(120),
    })
    .strict(),
  query: z.object({}).strict(),
});

export type CreateProjectBody = z.infer<typeof createProjectSchema>["body"];
export type GetProjectsQuery = z.infer<typeof getProjectsSchema>["query"];
export type GetBySlugParam = z.infer<typeof getProjectBySlugSchema>["params"];