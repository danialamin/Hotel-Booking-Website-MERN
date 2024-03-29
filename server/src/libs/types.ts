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

export const schemaAddHotel = z.object({
  name: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
  description: z.string().nonempty(),
  type: z.string().nonempty(),
  adultCount: z.number(),
  childCount: z.number(),
  facilities: z.array(z.string()).nonempty(),
  pricePerNight: z.number(),
  starRating: z.number().min(1).max(5),
  imageFiles: z.instanceof(File).array().min(1).max(6)
})