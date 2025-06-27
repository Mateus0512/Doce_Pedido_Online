import {z} from "zod";

export const clientSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string({required_error:"O preenchimento do nome é obrigatório"}).trim().min(3,{message:"O nome deve ter no mínimo 3 caracteres"}),
    phone: z
    .string({ required_error: "O campo de telefone é obrigatório." }).trim()
    .transform((val) =>
        val
        .replace(/\s+/g, "")     // remove espaços
        .replace(/[\(\)\-]/g, "") // remove parênteses e traços
        .replace(/^\+55/, "")    // remove o +55
    )
    .refine((val) => /^\d{10,11}$/.test(val), {
        message: "Número de telefone inválido",
    }),
    house_number: z.string().trim().optional(),
    street: z.string().trim().optional(),
    neighborhood: z.string().trim().optional(),
    city: z.string().trim().optional(),
    notes: z.string().trim().optional(),
    user_id: z.string().uuid().trim().optional(),
});

export type ClientProps = z.infer<typeof clientSchema>;