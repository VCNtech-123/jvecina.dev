
import Router from 'express'
import { loginUser, register } from './auth.controller'
import { validate } from '../../middleware/validation.middleware'
import { loginSchema, registerSchema } from './auth.validation'

const router = Router()

router.post('/login', validate(loginSchema), loginUser)
router.post('/register', validate(registerSchema), register)

export default router;