
import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters long")
  .max(128, "Password is too long")
  .refine(
    (password) => /[a-z]/.test(password),
    "Password must include at least one lowercase letter"
  )
  .refine(
    (password) => /[A-Z]/.test(password),
    "Password must include at least one uppercase letter"
  )
  .refine(
    (password) => /\d/.test(password),
    "Password must include at least one number"
  );

const loginBody = z.object({
    email: z.email(),
    password: passwordSchema,
}).strict()

const registerBody = z.object({
    name: z.string().trim(),
    email: z.email(),
    password: z.string().min(8),
}).strict()

export const loginSchema = z.object({
    body: loginBody
})

export const registerSchema = z.object({
    body: registerBody
})