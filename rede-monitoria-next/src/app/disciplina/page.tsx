"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabase";
import { useAuth } from "@/hooks/useAuth";

type Material = {
  id: string;
  title: string;
  link: string;
};

export default function Disciplina(){
  const { id } = useParams();
  const { profile, loading: authLoading } = useAuth();
  const [nome, setNome] = useState("Nome da disciplina");
  const [professor, setProfessor] = useState("Prof. Exemplo");
  const [turma, setTurma] = useState("-");
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!authLoading && id) {
      if (!profile) {
        setAccessDenied(true);
        return;
      }

      const role = profile.role?.toLowerCase?.() ?? "";
      const studentHasAccess = role === "aluno" && String(profile.turma_id) === String(id);
      const isStudent = role === "aluno";

      if (isStudent && !studentHasAccess) {
        setAccessDenied(true);
        return;
      }

      setAccessDenied(false);
      setNome(`Disciplina ${id}`);
      setProfessor("Prof. Exemplo");
      setTurma("CT-01");

      const fetchMaterials = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data, error } = await supabase
            .from("materiais")
            .select("id, title, link")
            .eq("disciplina_id", id);

          if (error) {
            console.error("Erro ao buscar materiais:", error);
            setError("Erro ao buscar materiais");
            setMateriais([]);
            return;
          }

          const mapped = (data ?? []).map((m: any) => ({
            id: String(m.id),
            title: m.title ?? "(sem título)",
            link: m.link ?? "",
          }));

          setMateriais(mapped as Material[]);
        } catch (err) {
          console.error("Erro inesperado ao buscar materiais:", err);
          setError("Erro inesperado ao buscar materiais");
          setMateriais([]);
        } finally {
          setLoading(false);
        }
      };

      fetchMaterials();
    }
  }, [id, profile, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="bg-[#f5f5f2] min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="bg-[#f5f5f2] min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-sm max-w-xl text-center">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Acesso negado</h1>
          <p className="text-gray-700">
            Você não tem permissão para acessar esta disciplina.
          </p>
        </div>
      </div>
    );
  }

  return(
    <div className="bg-[#f5f5f2] min-h-screen">
      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-br from-green-500 to-green-800">
          <div className="flex items-center gap-3">
            <img src="./assets/Logo_RDM-removebg-preview.png" className="w-14 md:w-20" alt="logo" />
            <div>
              <h1 className="font-bold text-white">Rede de</h1>
              <h1 className="font-bold text-white">Monitoria IFPB</h1>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white hidden md:block">Disciplina</h1>
        </header>

        <main className="flex flex-1 px-6 py-8">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            <section className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-green-900">{nome}</h1>
                  <p className="mt-2 text-gray-700">{professor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">2026.1</p>
                  <p className="text-xl font-semibold text-gray-900">{turma}</p>
                </div>
              </div>
            </section>

            <section className="grid gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">Materiais</h2>
                <div className="mt-4 text-gray-700">
                  {loading ? (
                    <p>Carregando materiais...</p>
                  ) : error ? (
                    <p className="text-red-600">{error}</p>
                  ) : materiais.length === 0 ? (
                    <p>Nenhum material encontrado para esta disciplina.</p>
                  ) : (
                    <ul className="space-y-4">
                      {materiais.map((material) => (
                        <li key={material.id}>
                          {material.link ? (
                            <a
                              href={material.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-green-800 hover:underline"
                            >
                              {material.title}
                            </a>
                          ) : (
                            <span className="font-medium">{material.title}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <footer className="bg-[#166534] text-white text-center text-xs py-2">
        &copy; 2026 - Rede de Monitoria. Todos os direitos reservados.
      </footer>
    </div>
  );
}