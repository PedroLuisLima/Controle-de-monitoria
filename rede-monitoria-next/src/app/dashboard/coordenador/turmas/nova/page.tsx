"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TurmaForm from "@/components/turmas/TurmaForm";
import {criarTurma,} from "@/services/turmaService";
import { TurmaFormData } from "@/schemas/turmaSchema";

import { supabase } from "@/services/supabase";

/* A implementar
async function handleCreate(data: TurmaFormData) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Sessão:", session);

  await criarTurma(data.nome, data.curso);
}
*/
export default function NovaTurmaPage() {

  const router = useRouter();

  async function handleCreate(
    data: TurmaFormData
  ) {

    try {
      await criarTurma(
        data.nome,
        data.curso
      );

      toast.success("Turma criada com sucesso!");
      router.push("/dashboard/coordenador/turmas");

    } catch {
      toast.error("Erro ao criar turma.");
    }
  }

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">
        Nova Turma
      </h1>
      <TurmaForm
        onSubmit={handleCreate}
      />
    </main>
  );
}