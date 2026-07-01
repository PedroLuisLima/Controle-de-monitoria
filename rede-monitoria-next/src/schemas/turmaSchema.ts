import {z} from "zod";

const nomeRegex = /^[A-Za-zÀ-ÿ0-9\s-]+$/;
const cursoRegex= /^[A-Za-zÀ-ÿ\s]+$/;

export const turmaSchema = z.object({
    nome: z.string().min(3, "Informe um nome válido")
    .regex(nomeRegex, "Apenas letras, números, espaço e hífen são permitidos."),

    curso: z.string().min(3, "Informe um nome válido.")
    .regex(cursoRegex, "Apenas letras são permitidos."),
})

export type TurmaFormData = z.infer<typeof turmaSchema>;