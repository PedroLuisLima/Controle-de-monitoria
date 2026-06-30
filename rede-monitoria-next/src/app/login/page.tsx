"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){

    const [matricula, setMatricula] = useState("");
    const [senha, setSenha] = useState("");

    const router = useRouter();
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        console.log("Matrícula", matricula)
        console.log("Senha:", senha)
        router.push("/");
    }

    return(
        <main className="min-h-screen flex">
            <section className="w-full md:w-1/2 bg-gradient-to-br from-green-800 to-green-600 flex flex-col justify-center items-center p-16 gap-8 hidden md:flex">
                <div className="w-44 bg-white p-4 rounded-xl shadow-lg">
                    <img src="/Logo_RDM.png"
                    alt="logo da Rede de Monitoria"
                    className="w-full" />
                </div>
                <div className="text-center max-w-md">
                    <h2 className="text-white text-2xl font-bold mb-2">Bem vindo a Rede de Monitoria!</h2>
                    <p className="text-white">A plataforma onde alunos e monitores se encontram para ensinar e aprender!</p>
                </div>
            </section>
            <section className="w-full md:w-1/2 flex items-center justify-center bg-white">
                <div className="max-w-md w-full px-8">
                    <h1 className="text-3xl text-gray-800 font-bold mb-8">Login</h1>
                    <form className="flex flex-col gap-4 py-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="matricula" className="block mb-2 w-full">Matrícula</label>
                            <input required id="matricula" value={matricula} onChange={(event)=> setMatricula(event.target.value)} type="text" inputMode="numeric" placeholder="Insira sua matrícula" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-600 focus:shadow-sm transition w-full" />
                        </div>
                        <div>
                            <label htmlFor="senha" className="block mb-2 w-full">Senha</label>
                            <input required id="senha" value={senha} onChange={(event)=> setSenha(event.target.value)} type="password" placeholder="Insira sua senha" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-600 focus:shadow-sm transition w-full" />
                        </div>
                        <button type="submit" className="w-full bg-[#166534] text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-sm cursor-pointer hover:shadow-md">Entrar</button>
                    </form>
                    <p className="text-center mt-8 text-gray-600">
                        Não tem uma conta? 
                        <Link href="/cadastro" className="text-[#166534] font-bold cursor-pointer hover:underline">
                        Cadastre-se
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}