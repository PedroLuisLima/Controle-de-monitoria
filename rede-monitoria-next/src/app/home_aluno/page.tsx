"use client";

import { disciplinas } from "@/data/turmas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/services/supabase";

export default function HomeAluno() {
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Erro ao sair da conta");
      console.log(error);
      return;
    }

    localStorage.removeItem("usuarioLogado");

    alert("Logout realizado com sucesso!");

    router.replace("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-[#166534] text-white">
        <div className="w-full px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/Logo_RDM.png"
              alt="Rede de Monitoria"
              className="w-9 h-9 rounded"
            />
            <h1 className="font-bold text-lg">Rede de Monitoria</h1>
          </div>

          <h1 className="text-xl md:text-2xl font-bold">
            Turmas
          </h1>

          <div className="relative">

            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="w-9 h-9 rounded-full border border-white flex items-center justify-center font-medium text-white cursor-pointer hover:bg-white hover:text-[#166534] transition-all duration-200"
            >
              <i className="fa-solid fa-user text-base"></i>
            </button>

            {menuAberto && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden z-10">

                <Link
                  href="/perfil"
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <i className="fa-solid fa-user"></i>
                  Meu perfil
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Sair
                </button>

              </div>
            )}

          </div>

        </div>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">

            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Suas monitorias
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Acesse suas turmas e acompanhe conteúdos disponibilizados pelos monitores de forma simples e organizada.
            </p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disciplinas.map((disciplina, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#166534] mb-4">{disciplina.nome}</h3>
                <p className="text-gray-600 mb-6">Monitor: {disciplina.monitor}</p>
                <Link
                  href="/disciplina"
                  className="inline-block bg-[#166534] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Acessar turma
                </Link>
              </div>
            ))}

          </section>
        </div>
      </main>

      <footer className="bg-[#166534] text-white text-center text-xs py-2.5">
        &copy; 2026 - Rede de Monitoria. Todos os direitos reservados.
      </footer>

    </div>
  );
}