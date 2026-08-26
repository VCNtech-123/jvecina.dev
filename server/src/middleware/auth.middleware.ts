import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { Admin } from "../modules/admin/admin.model";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Not authorized");
  }

  try {
    const decoded = jwt.verify(token, env.jwt as string) as {
      id: string;
    };

    const currentUser = await Admin.findById(decoded.id);

    if (!currentUser) {
      throw new ApiError(401, "Admin no longer exists");
    }

    req.user = currentUser;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};