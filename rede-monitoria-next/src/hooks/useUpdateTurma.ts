import { useMutation, useQueryClient } from "@tanstack/react-query";
import { atualizarTurma } from "@/services/turmaService";
import { TurmaFormData } from "@/schemas/turmaSchema";

type UpdateTurmaVariables = {
  id: string;
  data: TurmaFormData;
};

export default function useUpdateTurma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateTurmaVariables) => {
      await atualizarTurma(id, data.nome, data.curso);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
    },
  });
}
