import { z } from "zod";

export const cadastroSchema = z.object({
    nome: z
        .string()
        .min(3, "Nome deve ter pelo menos 3 letras"),

    matricula: z
        .string()
        .regex(/^\d{11}$/, "Matrícula deve conter 11 números"),

    email: z.email("Digite um email válido"),

    senha: z
        .string()
        .min(6, "A senha deve possuir pelo menos 6 caracteres"),
    
    confirmarSenha: z.string(),
})

.refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
});

export type CadastroFormData = z.infer<typeof cadastroSchema>;