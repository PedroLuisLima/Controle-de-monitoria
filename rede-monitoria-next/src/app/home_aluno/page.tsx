import { disciplinas } from "@/data/turmas";
import Link from "next/link";

export default function HomeAluno() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f2]">

      <header className="flex items-center justify-between px-6 py-2.5 bg-gradient-to-br from-green-500 to-green-800">

        <div className="flex items-center gap-3">
          <img
            src="/Logo_RDM.png"
            alt="Rede de Monitoria"
            className="w-10 h-10 rounded"
          />

          <div>
            <h1 className="font-bold text-lg text-white">Rede de Monitoria</h1>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Turmas
        </h1>

        <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-sm font-semibold text-white cursor-pointer hover:bg-white hover:text-[#166534] transition-all duration-200">
          User
        </button>
      </header>

      <main className="flex-1 px-6 py-10">

        <div className="max-w-6xl mx-auto">

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Suas monitorias</h2>

            <p className="text-gray-600">
              Acesse suas turmas e acompanhe os conteúdos disponibilizados pelos monitores.
            </p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {disciplinas.map((disciplina, index) => (
              <div
                key={index}
                className="bg-white border-2 border-green-700 rounded-xl p-8 shadow-sm hover:border-[#166534] transition-all duration-200">
                <h3 className="text-xl font-bold text-[#166534] mb-4">
                  {disciplina.nome}
                </h3>

                <p className="text-gray-600 mb-6">
                  Monitor: {disciplina.monitor}
                </p>

                <Link href="/disciplina" className="inline-block bg-[#166534] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-all duration-200 cursor-pointer">
                  Acessar turma
                </Link>
              </div>
            ))}
          </section>

        </div>
      </main>

      <footer className="bg-[#166534] text-white text-center text-xs py-2.5">
        © 2026 - Rede de Monitoria. Todos os direitos reservados.
      </footer>

    </div>
  );
}