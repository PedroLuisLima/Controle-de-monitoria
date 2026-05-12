import bcrypt from "bcryptjs";

let botaoLogin = document.getElementById('btn_login')

botaoLogin.addEventListener('click', async function login(evt){
    evt.preventDefault();

    let getMatricula = document.getElementById('matricula').value
    let getSenha = document.getElementById('senha').value
    let loginValido = false;

    const users = JSON.parse(localStorage.getItem("usuarios")) || []
    
    if (typeof getSenha !== "string"){
        getSenha = getSenha.toString()
    }

    for (const user of users){
        const senhaValida = await bcrypt.compare(getSenha, user.senha)

        if (getMatricula == user.matricula && senhaValida){
            loginValido = true;
            break
        }
    };

    if (loginValido == true){
        const userLogado = {
            matricula: getMatricula,
        }
        sessionStorage.setItem("userLogado", JSON.stringify(userLogado))
        window.location.href = 'home_aluno.html'
        alert('Sucesso!');
    }else{
        alert('Erro');
    }
});