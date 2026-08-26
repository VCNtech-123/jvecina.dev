import express from 'express'
import { securityMiddleware } from './middleware/security.middleware';


const app = express()

app.use(express.json())
app.use(securityMiddleware)

export default app;