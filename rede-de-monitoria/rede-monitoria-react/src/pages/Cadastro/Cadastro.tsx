import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo_RDM.png";
import { useState } from "react";

function Cadastro(){

    const [nomeCompleto, setNomeCompleto] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const novoUsuario = { nomeCompleto, matricula, email, senha };
        console.log("Cadastro:", novoUsuario);

        navigate("/login");
    }

    return(
    <main className="min-h-screen flex">

    <section className="w-full md:w-1/2 bg-gradient-to-br from-green-800 to-green-600 flex flex-col justify-center items-center p-16 gap-8 hidden md:flex">

      <div className="w-44 bg-white p-4 rounded-xl shadow-lg">
        <img src={Logo} alt="logo" className="w-full" />
      </div>

      <div className="text-center max-w-md">
        <h2 className="text-white text-2xl font-bold mb-2">Crie sua conta!</h2>

        <p className="text-white">
          Faça parte da Rede de Monitoria e conecte-se com alunos, monitores e coordenadores em um só lugar.
        </p>
      </div>
    </section>

    <section className="w-full md:w-1/2 flex items-center justify-center bg-white">
        
      <div className="max-w-md w-full px-8 py-8">

        <h1 className="text-3xl text-gray-800 font-bold mb-8">Cadastro</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <div>
            <label htmlFor="nomeCompleto" className="block mb-2">Nome completo</label>

            <input required id="nomeCompleto" value={nomeCompleto} onChange={(e)=> setNomeCompleto(e.target.value)} type="text" placeholder="Digite seu nome completo" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-600 focus:shadow-sm transition"/>
          </div>

          <div>
            <label htmlFor="matricula" className="block mb-2">Matrícula</label>

            <input required id="matricula" value={matricula} onChange={(e)=> setMatricula(e.target.value)} type="text" inputMode="numeric" placeholder="Digite sua matrícula" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-600 focus:shadow-sm transition"/>
          </div>

          <div>
            <label htmlFor="email" className="block mb-2">E-mail acadêmico</label>

            <input required id="email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="seuemail@academico.com" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-600 focus:shadow-sm transition"/>
          </div>

          <div>
            <label htmlFor="senha" className="block mb-2">Senha</label>

            <input required id="senha" value={senha} onChange={(e)=> setSenha(e.target.value)} type="password" placeholder="Crie uma senha" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-600 focus:shadow-sm transition"/>
          </div>
          <button type="submit" className="w-full bg-[#166534] text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-sm cursor-pointer hover:shadow-md mt-2">Criar conta</button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Já possui uma conta?
          <Link to="/login" className="text-[#166534] font-bold hover:underline">Faça login</Link>
        </p>
      </div>
    </section>
  </main>
    );
}

export default Cadastro;