import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Please enter your password" }),
    code: z.optional(z.string())
})

export const ResetSchema = z.object({
    email: z.string().email(),
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be atleast 6 chars long" }),
    name: z.string().min(1, { message: "Name is required" }),
})
export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "Password must be atleast 6 chars long" }),
})

export const SettingsSchema = z.object({
    name: z.optional(z.string())
})
