import { useQuery } from "@tanstack/react-query";
import { listarTurmas } from "@/services/turmaService";

export function useTurmas() {
    return useQuery({
        queryKey: ["turmas"],
        queryFn: listarTurmas,
    });
}