import type { Request, Response, NextFunction } from "express";
import type { ValidatedLocals } from "../../middleware/validation.middleware";
import { createProjectSchema, GetProjectsQuery, GetBySlugParam } from "./project.validation";
import { createProjectService, getProjectsService, getProjectBySlugService } from "./project.service";

type Locals = ValidatedLocals<typeof createProjectSchema>;

export const createProject = async (
  _req: Request,
  res: Response, 
  next: NextFunction
) => {
  try {
    const { body } = (res.locals as Locals).validated;
    const project = await createProjectService(body);

    return res.status(201).json({ status: "success", data: project });
  } catch (err) {
    return next(err);
  }
};

export const getProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {

    const { query } = res.locals.validated as {
      query: GetProjectsQuery
    };

    const projects = await getProjectsService({
      featured: query.featured,
      page: query.page,
      limit: query.limit,
    });

    return res.status(200).json({
      status: "success",
      results: projects.length,
      data: projects,
    });
};

export const getProjectBySlug = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
    const { params } = res.locals.validated as {
      params: GetBySlugParam
    };

    const project = await getProjectBySlugService(params.slug);

    return res.status(200).json({
      status: "success",
      data: project,
    });
};