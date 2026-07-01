import { supabase } from "./supabase";

interface CadastroUsuario {
  nome: string;
  email: string;
  senha: string;
}

export async function cadastrarUsuario({
  nome,
  email,
  senha,
}: CadastroUsuario) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: {
        nome,
      },
    },
  });

  if (error) throw error;

  return data;
}