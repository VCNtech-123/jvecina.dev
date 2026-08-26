
import Router from 'express'
import { protect } from '../../middleware/auth.middleware'
import { createProject } from './project.controller'

const router = Router()

router.post("/", protect, createProject)

export default router;