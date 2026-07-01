import {z} from "zod";

export const turmaSchema = z.object({
    nome: z.string().min(3, "Informe um nome válido"),
    curso: z.string().min(3, "Informe um nome válido."),
})

export type TurmaFormData = z.infer<typeof turmaSchema>;