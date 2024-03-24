import { z } from 'zod'

export const schemaSignin = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty()
})

export const schemaSignup = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
  confirmPassword: z.string().min(6).nonempty()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
})