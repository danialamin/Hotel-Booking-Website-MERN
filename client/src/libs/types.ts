import { z } from 'zod'

export const schemaSignin = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty()
})

export type FormFieldsSignin = z.infer<typeof schemaSignin>