import type { Request, Response, NextFunction } from "express";
import type { ValidatedLocals } from "../../middleware/validation.middleware";
import { createProjectSchema } from "./project.validation";
import { createProjectService } from "./project.service";

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