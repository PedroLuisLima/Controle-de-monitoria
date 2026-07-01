"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema, CadastroFormData } from "@/schemas/cadastroSchema";

export default function Cadastro() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema)
  });

  function onSubmit(data: CadastroFormData) {

    const usuariosSalvos = localStorage.getItem("usuarios");

    const usuarios = usuariosSalvos
      ? JSON.parse(usuariosSalvos)
      : [];

    const usuarioExistente = usuarios.find(
      (usuario: CadastroFormData) =>
        usuario.matricula === data.matricula
    );

    if (usuarioExistente) {
      alert("Matrícula já cadastrada");
      return;
    }

    usuarios.push(data);

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuarios)
    );

    console.log("Usuário cadastrado:", data);

    router.push("/login");
  }

  return (
    <main className="min-h-screen flex">

      <section className="w-full md:w-1/2 bg-gradient-to-br from-green-800 to-green-600 flex flex-col justify-center items-center p-16 gap-8 hidden md:flex">

        <div className="w-44 bg-white p-4 rounded-xl shadow-lg">
          <img src="/Logo_RDM.png" alt="logo" className="w-full" />
        </div>

        <div className="text-center max-w-md">
          <h2 className="text-white text-2xl font-bold mb-2">
            Crie sua conta!
          </h2>

          <p className="text-white">
            Faça parte da Rede de Monitoria e conecte-se com alunos,
            monitores e coordenadores em um só lugar.
          </p>
        </div>
      </section>

      <section className="w-full md:w-1/2 flex items-center justify-center bg-white">

        <div className="max-w-md w-full px-8 py-8">

          <h1 className="text-3xl text-gray-800 font-bold mb-8">
            Cadastro
          </h1>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >

            <div>
              <label htmlFor="nome" className="block mb-2">
                Nome completo
              </label>

              <input
                id="nome"
                {...register("nome")}
                type="text"
                placeholder="Digite seu nome completo"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-600 focus:shadow-sm transition"
              />

              {errors.nome && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="matricula" className="block mb-2">
                Matrícula
              </label>

              <input
                id="matricula"
                {...register("matricula")}
                type="text"
                inputMode="numeric"
                placeholder="Digite sua matrícula"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-600 focus:shadow-sm transition"
              />

              {errors.matricula && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.matricula.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">
                E-mail acadêmico
              </label>

              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="seuemail@academico.com"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-600 focus:shadow-sm transition"
              />

              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="senha" className="block mb-2">
                Senha
              </label>

              <input
                id="senha"
                {...register("senha")}
                type="password"
                placeholder="Crie uma senha"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-600 focus:shadow-sm transition"
              />

              {errors.senha && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.senha.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#166534] text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-sm cursor-pointer hover:shadow-md mt-2"
            >
              Criar conta
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Já possui uma conta?{" "}

            <Link
              href="/login"
              className="text-[#166534] font-bold hover:underline"
            >
              Faça login
            </Link>
          </p>

        </div>
      </section>
    </main>
  );
}