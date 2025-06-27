import { z } from "zod";

export const addSaleSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid().optional(),
    client_id: z.string({required_error:"Selecione um cliente"}).uuid(),
    order_date: z.string({required_error:"Selecione a data do pedido"}).date(),
    delivery_date: z.string({required_error:"Selecione a data da entrega"}).date(),
    party_theme: z.string().trim().optional(),
    birthday_person_name: z.string().trim().optional(),
    age_to_complete: z
        .string()
        .transform((val) => Number(val))
        .pipe(z.number().min(0, "A idade deve ser um número positivo")).optional(),
    entry_value: z
        .string().default("0")
        .transform((val) => Number(val))
        .pipe(z.number().min(0, {message: "O valor de entrada deve ser um número positivo"})),
    total_value: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .pipe(z.number().min(0, "O valor total deve ser um número positivo")),
        remaining_payment_date: z.string().date().optional().nullish(),
    payment_method: z.string({required_error:"Selecione o método de pagamento"}),
    observations: z.string().trim().nullable().optional(),
    status_delivery: z
        .boolean()
        .default(false)
        .optional(),
});



export type AddSaleProps = z.infer<typeof addSaleSchema>;




export const updateSaleSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid().optional(),
    client_id: z.string().uuid().min(1, "Selecione um cliente"),
    order_date: z.string().min(1, "A data do pedido é obrigatória"),
    delivery_date: z.string().min(1, "A data de entrega é obrigatória"),
    party_theme: z.string().trim().optional(),
    birthday_person_name: z.string().trim().optional(),
    age_to_complete: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .pipe(z.number().min(0, "A idade deve ser um número positivo")).optional(),
    entry_value: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .pipe(z.number().min(0, "O valor de entrada deve ser um número positivo")),
    total_value: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .pipe(z.number().min(0, "O valor total deve ser um número positivo")),
    remaining_payment_date: z.string().date().optional().nullish(),
    payment_method: z.string().min(1, "O método de pagamento é obrigatório"),
    observations: z.string().trim().nullable().optional(),
    status_delivery: z
        .boolean()
        .default(false)
        .optional(),
});


export type UpdateSaleProps = z.infer<typeof updateSaleSchema>;

export type SaleCardProps = {
    id: string;
    party_theme?: string,
    birthday_person_name?: string,
    order_date: string;
    delivery_date: string;
    status_delivery: boolean;
    clients: {
        name: string;
    };
};

export type SaleProps = {
    id?: string;
    user_id?: string;
    client_id: string;
    clients: {
        name: string;
    };
    order_date: string;
    delivery_date: string;
    party_theme?: string;
    birthday_person_name?: string;
    age_to_complete?: number;
    entry_value: number;
    total_value: number;
    remaining_payment_date: string;
    payment_method: string;
    observations?: string;
    status_delivery: boolean;
};

export type ProductSaleProps = {
    id: string,
    sale_id: string,
    product_id: string,
    quantity: number,
    unit_price: number,
    products: {name: string}
}