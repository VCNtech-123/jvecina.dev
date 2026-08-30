import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { env } from './config/env';
import { securityMiddleware } from './middleware/security.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import authRoutes from './modules/auth/auth.routes'
import projectRoutes from './modules/projects/project.routes'
import messageRoutes from './modules/messages/message.routes'
import adminRoutes from './modules/admin/admin.routes'


const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173", 
    env.clientUrl
  ],
  credentials: true
}));
app.use(express.json())
app.use(securityMiddleware)
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/admin", adminRoutes)
app.use(errorMiddleware)

export default app;