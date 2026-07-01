import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarTurma } from "@/services/turmaService";
import { TurmaFormData } from "@/schemas/turmaSchema";

export default function useCreateTurma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TurmaFormData) => {
      await criarTurma(data.nome, data.curso);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
    },
  });
}
