import {z} from "zod";

export const productSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
    price: z.preprocess((val) => {
        if (typeof val === "string") {
            // Substitui a vírgula por ponto e tenta converter para número
            return parseFloat(val.replace(",", "."));
        }
        return val;
    }, z.number().min(0, "O preço deve ser um valor positivo")),
    user_id: z.string().uuid().optional(),
});

export type ProductProps = z.infer<typeof productSchema>

export type ProductListProps = {
    id: string,
    user_id?: string,
    name:string,
    price:number,
    quantity: number,
}