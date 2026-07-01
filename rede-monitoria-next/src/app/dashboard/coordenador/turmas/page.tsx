"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { listarTurmas,deletarTurma } from "@/services/turmaService";

interface Turma {
  id: string;
  nome: string;
  curso: string;
}

export default function TurmasPage() {
  const [turmas, setTurmas] = useState<Turma[]>([]);

  async function carregarTurmas() {
    const data = await listarTurmas();
    setTurmas(data ?? []);
  }

  async function handleDelete(id: string) {
    const confirmar = confirm("Deseja realmente excluir esta turma?");

    if (!confirmar) return;

    try {
      await deletarTurma(id);

      await carregarTurmas();

      alert("Turma excluída com sucesso!");

    } catch {
      alert("Erro ao excluir turma.");
    }
  }

  useEffect(() => {
    carregarTurmas();
  }, []);

  return (
    <main className="max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Gerenciamento de Turmas
        </h1>
        <Link
          href="/dashboard/coordenador/turmas/nova"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Nova Turma
        </Link>
      </div>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">
              Nome
            </th>
            <th className="border p-2">
              Curso
            </th>
            <th className="border p-2 w-56">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {turmas.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center p-4"
              >
                Nenhuma turma cadastrada.
              </td>
            </tr>
          ) : (
            turmas.map((turma) => (
              <tr key={turma.id}>
                <td className="border p-2">
                  {turma.nome}
                </td>
                <td className="border p-2">
                  {turma.curso}
                </td>
                <td className="border p-2">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/dashboard/coordenador/turmas/editar/${turma.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(turma.id)}
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
    </main>
  );
}