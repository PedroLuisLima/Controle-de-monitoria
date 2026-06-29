import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../assets/Logo_RDM.png";

type Material = {
  id: string;
  title: string;
  link: string;
};

type Duvida = {
  id: string;
  question: string;
  author: string;
};

function Disciplina(){
  const { id } = useParams();
  const [nome, setNome] = useState("Nome da disciplina");
  const [professor, setProfessor] = useState("Indefinido");
  const [turma, setTurma] = useState("-");
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [duvidas, setDuvidas] = useState<Duvida[]>([]);

  useEffect(() => {
    if (id) {
      setNome(`Disciplina ${id}`);
      setProfessor("Prof. Exemplo");
      setTurma("CT-01");
      setMateriais([
        { id: "1", title: "Aula 1 - Introdução", link: "#" },
        { id: "2", title: "Aula 2 - Material de apoio", link: "#" },
      ]);
      setDuvidas([
        { id: "1", question: "Quando é a entrega do trabalho?", author: "Aluno A" },
        { id: "2", question: "Qual o peso da avaliação?", author: "Aluno B" },
      ]);
    }
  }, [id]);

  return(
    <div className="bg-[#f5f5f2] min-h-screen">
      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-br from-green-500 to-green-800">
          <div className="flex items-center gap-3">
            <img src={Logo} className="w-14 md:w-20" alt="logo" />
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

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">Materiais</h2>
                <ul className="mt-4 space-y-4 text-gray-700">
                  {materiais.map((material) => (
                    <li key={material.id}>
                      <a href={material.link} className="font-medium text-green-800 hover:underline">
                        {material.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800">Dúvidas</h2>
                  <ul className="mt-4 space-y-3 text-gray-700">
                    {duvidas.map((duvida) => (
                      <li key={duvida.id}>
                        <p className="font-medium">{duvida.question}</p>
                        <p className="text-sm text-gray-500">{duvida.author}</p>
                      </li>
                    ))}
                  </ul>
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

export default Disciplina;