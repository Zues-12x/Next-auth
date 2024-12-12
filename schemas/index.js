import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Please enter your password" }),
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
