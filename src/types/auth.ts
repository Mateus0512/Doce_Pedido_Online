import {z} from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido").trim(),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export const signinSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});