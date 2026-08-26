
import type { RequestHandler } from "express";
import { z } from "zod";
import { ApiError } from "../utils/ApiError";

export const validate = <S extends z.ZodTypeAny>(schema: S): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const issue = result.error.issues[0];
      const path = issue.path.join(".");
      return next(new ApiError(400, path ? `${path}: ${issue.message}` : issue.message));
    }

    res.locals.validated = result.data;
    return next();
  };
};

export type ValidatedLocals<S extends z.ZodTypeAny> = {
  validated: z.infer<S>;
};