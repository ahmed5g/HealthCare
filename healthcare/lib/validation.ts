import { z } from "zod";

export const userFormValidation = z.object({
  username: z.string()
  .min(2, "Username must be at least 2 characters.")
  .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Ivalid email adress"),
  phone : z.string().refine((phone) => /^\+\d{10,15}$/.test(phone),{
    message: "Invalid phone number",
  })})