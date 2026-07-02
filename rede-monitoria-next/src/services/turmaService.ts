import {supabase} from "./supabase"


export async function listarTurmas() {
    const{data, error} = await supabase.from("turmas").select("*").order("nome");

    if (error){
        throw error;
    }

    return data
}

export async function criarTurma(nome: string, curso: string) {
  const{error}= await supabase.from("turmas").insert({nome, curso});
  
  if(error){
    throw error;
  }
}

export async function atualizarTurma(id: string, nome:string, curso:string) {
  const {error} = await supabase.from("turmas").update({nome, curso}).eq("id",id)

  if(error){
    throw error;
  }
}

export async function deletarTurma(id: string) {
  const{error} = await supabase.from("turmas").delete().eq("id",id)

  if(error){
    throw error;
  }
}

export async function buscarTurmaPorId(id: string) {

    const { data, error } = await supabase
        .from("turmas")
        .select("*")
        .eq("id", id)
        .single();

    if (error)
        throw error;

    return data;

}