import express from 'express'
import cookieParser from 'cookie-parser'
import { securityMiddleware } from './middleware/security.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import authRoutes from './modules/auth/auth.routes'


const app = express()

app.use(express.json())
app.use(securityMiddleware)
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use(errorMiddleware)

export default app;