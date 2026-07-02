"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TurmaForm from "@/components/turmas/TurmaForm";
import { buscarTurmaPorId, atualizarTurma } from "@/services/turmaService";
import { TurmaFormData } from "@/schemas/turmaSchema";

export default function EditarTurmaPage() {

    const { id } = useParams();

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [defaultValues, setDefaultValues] =
        useState<TurmaFormData>();

    useEffect(() => {

        async function carregar() {
            try {
                const turma =
                    await buscarTurmaPorId(id as string);

                setDefaultValues({
                    nome: turma.nome,
                    curso: turma.curso,
                });
            } finally {
                setLoading(false);
            }
        }
        carregar();
    }, [id]);

    async function handleUpdate(
        data: TurmaFormData
    ) {
        try {
            await atualizarTurma(
                id as string,
                data.nome,
                data.curso
            );
            alert("Turma atualizada!");
            router.push(
                "/dashboard/coordenador/turmas"
            );
        } catch {
            alert("Erro ao atualizar.");
        }
    }

    if (loading)
        return <p>Carregando...</p>;

    return (
        <main className="max-w-xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">
                Editar Turma
            </h1>
            <TurmaForm
                defaultValues={defaultValues}
                onSubmit={handleUpdate}
            />
        </main>
    );
}