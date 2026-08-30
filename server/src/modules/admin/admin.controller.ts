import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/ApiError";
import { env } from "../../config/env";

export const publish = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    if (!env.vercelDeployHookUrl) {
      return next(new ApiError(500, "Missing VERCEL_DEPLOY_HOOK_URL"));
    }

    const r = await fetch(env.vercelDeployHookUrl, { method: "POST" });

    if (!r.ok) {
      return next(new ApiError(502, `Failed to trigger Vercel deploy (HTTP ${r.status})`));
    }

    return res.status(202).json({
      status: "success",
      message: "Deploy triggered",
    });
  } catch (e) {
    return next(e);
  }
};