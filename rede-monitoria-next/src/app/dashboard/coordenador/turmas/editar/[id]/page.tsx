"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TurmaForm from "@/components/turmas/TurmaForm";
import { supabase } from "@/services/supabase";
import { buscarTurmaPorId, listarTurmas, atualizarTurma } from "@/services/turmaService";
import { TurmaFormData } from "@/schemas/turmaSchema";

interface Turma {
  id: string;
  nome: string;
  curso: string;
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: string;
}

export default function EditarTurmaPage() {

    const { id } = useParams();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [defaultValues, setDefaultValues] =
        useState<TurmaFormData>();

    useEffect(() => {

        async function carregar() {
            try {
                const [turma, turmasList, usuariosResponse] = await Promise.all([
                    buscarTurmaPorId(id as string),
                    listarTurmas(),
                    supabase.from("profiles").select("id, full_name, email, role"),
                ]);

                if (usuariosResponse.error) {
                    console.error("Erro ao buscar usuários:", usuariosResponse.error);
                }

                setDefaultValues({
                    nome: turma.nome,
                    curso: turma.curso,
                });
                setTurmas(turmasList ?? []);
                setUsuarios(
                    (usuariosResponse.data ?? []).map((usuario: any) => ({
                        id: String(usuario.id),
                        nome: usuario.full_name ?? usuario.nome ?? "",
                        email: usuario.email ?? "",
                        perfil: usuario.role ?? usuario.perfil ?? "",
                    }))
                );
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

    if (loading) return <p>Carregando...</p>;

    return (
        <main className="max-w-7xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Editar Turma</h1>
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <div className="space-y-6">
                    <section className="bg-white rounded-3xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Turmas</h2>
                        <table className="w-full border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border p-2 text-left">Nome</th>
                                    <th className="border p-2 text-left">Curso</th>
                                    <th className="border p-2 w-56 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turmas.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="text-center p-4">
                                            Nenhuma turma cadastrada.
                                        </td>
                                    </tr>
                                ) : (
                                    turmas.map((turma) => (
                                        <tr key={turma.id}>
                                            <td className="border p-2">{turma.nome}</td>
                                            <td className="border p-2">{turma.curso}</td>
                                            <td className="border p-2">
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </section>

                    <section className="bg-white rounded-3xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Editar Turma</h2>
                        <TurmaForm
                            defaultValues={defaultValues}
                            onSubmit={handleUpdate}
                        />
                    </section>
                </div>

                <section className="bg-white rounded-3xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Usuários</h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2 text-left">Nome</th>
                                <th className="border p-2 text-left">Email</th>
                                <th className="border p-2 text-left">Perfil</th>
                                <th className="border p-2 w-56 text-left">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td className="border p-2">{usuario.nome}</td>
                                    <td className="border p-2">{usuario.email}</td>
                                    <td className="border p-2">{usuario.perfil}</td>
                                    <td className="border p-2">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <button
                                                type="button"
                                                disabled
                                                className="bg-yellow-500/70 text-white px-3 py-1 rounded cursor-not-allowed"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                disabled
                                                className="bg-red-600/70 text-white px-3 py-1 rounded cursor-not-allowed"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </main>
    );
}