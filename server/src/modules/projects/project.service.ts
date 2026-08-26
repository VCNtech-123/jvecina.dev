import type { HydratedDocument } from "mongoose";
import { ApiError } from "../../utils/ApiError";
import { slugify } from "../../utils/slugify";
import { Project, type IProject } from "./project.model"; 
import type { CreateProjectBody } from "./project.validation";

export type ProjectDoc = HydratedDocument<IProject>;

export const createProjectService = async (payload: CreateProjectBody): Promise<ProjectDoc> => {
  const slugSource = payload.slug?.length ? payload.slug : payload.title;
  const slug = slugify(slugSource);

  const exists = await Project.findOne({ slug }).select("_id");
  if (exists) {
    throw new ApiError(409, "Project slug already exists");
  }

  try {
    const project = await Project.create({
      ...payload,
      slug,
    });

    return project;
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as { code: number }).code === 11000) {
      throw new ApiError(409, "Project slug already exists");
    }
    throw err;
  }
};