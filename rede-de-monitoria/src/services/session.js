import bcrypt from "bcryptjs";
import { getUsers } from "./storage";

function logout(){
    sessionStorage.clear()
    location.reload()
}

async function login(evt){
    evt.preventDefault();
    
    let getMatricula = document.getElementById('matricula').value
    let getSenha = document.getElementById('senha').value
    let senhaValida = false;
    
    const users = getUsers()
    
    const user = users.find(
        user => user.matricula === getMatricula
    );
    
    if (user){
        senhaValida = await bcrypt.compare(getSenha, user.senha)
    };
    
    if (senhaValida){
        const userLogado = {
            id: user.id,
            nome: user.nome,
            matricula: user.matricula,
        }
        sessionStorage.setItem("userLogado", JSON.stringify(userLogado))
        alert('Sucesso!');
        window.location.href = 'home_aluno.html'
    }else{
        alert('Matrícula ou senha incorretos.');
    }
}

export {logout, login};