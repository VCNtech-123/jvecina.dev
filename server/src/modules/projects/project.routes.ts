
import { Router } from 'express'
import { protect } from '../../middleware/auth.middleware'
import { createProject, getProjects, getProjectBySlug } from './project.controller'
import { validate } from '../../middleware/validation.middleware'
import { createProjectSchema, getProjectsSchema, getProjectBySlugSchema } from './project.validation'

const router = Router()

router.post("/", protect, validate(createProjectSchema), createProject)
router.get("/", validate(getProjectsSchema), getProjects)
router.get("/:slug", validate(getProjectBySlugSchema), getProjectBySlug)

export default router;