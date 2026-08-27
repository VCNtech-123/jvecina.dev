
import Router from 'express'
import { loginUser, register } from './auth.controller'
import { validate } from '../../middleware/validation.middleware'
import { loginSchema, registerSchema } from './auth.validation'
import { contactLimiter } from '../../middleware/rateLimit.middleware'

const router = Router()

router.post('/login', contactLimiter, validate(loginSchema), loginUser)
router.post('/register', validate(registerSchema), register)

export default router;