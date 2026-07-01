"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TurmaForm from "@/components/turmas/TurmaForm";
import { TurmaFormData } from "@/schemas/turmaSchema";
import useCreateTurma from "@/hooks/useCreateTurma";

export default function NovaTurmaPage() {

  const router = useRouter();
  const createTurmaMutation = useCreateTurma();

  async function handleCreate(data: TurmaFormData) {
    try {
      await createTurmaMutation.mutateAsync(data);

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