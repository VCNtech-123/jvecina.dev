import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { securityMiddleware } from './middleware/security.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import authRoutes from './modules/auth/auth.routes'
import projectRoutes from './modules/projects/projet.routes'


const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(securityMiddleware)
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use(errorMiddleware)

export default app;