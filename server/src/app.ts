import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { env } from "./config/env";
import { securityMiddleware } from "./middleware/security.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { ApiError } from "./utils/ApiError";

import authRoutes from "./modules/auth/auth.routes";
import projectRoutes from "./modules/projects/project.routes";
import messageRoutes from "./modules/messages/message.routes";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = ["http://localhost:5173", env.clientUrl].filter(Boolean) as string[];

const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(securityMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

app.all("*", (req, _res, next) => next(new ApiError(404, `Route not found: ${req.originalUrl}`)));

app.use(errorMiddleware);

export default app;