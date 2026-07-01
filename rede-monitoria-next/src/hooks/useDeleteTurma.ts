import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletarTurma } from "@/services/turmaService";

export default function useDeleteTurma() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deletarTurma(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["turmas"]});
    },
  });
}
