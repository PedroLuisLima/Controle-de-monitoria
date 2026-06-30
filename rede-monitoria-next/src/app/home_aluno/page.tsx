import { disciplinas } from "@/data/turmas";
import Link from "next/link";

export default function HomeAluno() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <header className="bg-[#166534] text-white">
        <div className="w-full px-6 py-2.5 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <img
              src="/Logo_RDM.png"
              alt="Rede de Monitoria"
              className="w-9 h-9 rounded"
            />

            <h1 className="font-bold text-lg">Rede de Monitoria</h1>
          </div>

          <h1 className="text-xl md:text-2xl font-bold">Turmas</h1>

          <button className="w-9 h-9 rounded-full border border-white flex items-center justify-center font-medium text-white cursor-pointer hover:bg-white hover:text-[#166534] transition-all duration-200">
            <i className="fa-solid fa-user text-base"></i>
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12 text-center">

            <h2 className="text-3xl font-bold text-gray-800 mb-3">Suas monitorias</h2>

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
                <h3 className="text-xl font-bold text-[#166534] mb-4">
                  {disciplina.nome}
                </h3>

                <p className="text-gray-600 mb-6">
                  Monitor: {disciplina.monitor}
                </p>

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