import bcrypt from "bcryptjs";

let botaoLogin = document.getElementById('btn_login')

botaoLogin.addEventListener('click', function login(evt){
    evt.preventDefault();

    let getMatricula = document.getElementById('matricula').value
    let getSenha = document.getElementById('senha').value
    let loginValido = false;

    const users = JSON.parse(localStorage.getItem("usuarios")) || []
    
    if (typeof getSenha !== "string"){
        getSenha = getSenha.toString()
    }

    getSenha = bcrypt.hash(getSenha, 10)

    for (const user of users){
        if (getMatricula == user.matricula && getSenha == user.senha){
            loginValido = true
            break
        }
    };

    if (loginValido == true){
        location.href = 'home_aluno.html'
        alert('Sucesso!');
    }else{
        alert('Erro');
    }
});