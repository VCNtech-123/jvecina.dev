import express from 'express'
import { securityMiddleware } from './middleware/security.middleware';
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error.middleware';


const app = express()

app.use(express.json())
app.use(securityMiddleware)
app.use(cookieParser())

app.use(errorMiddleware)

export default app;