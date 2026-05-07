import users from '../data/usuarios.js'

let botao = document.getElementById('btn_login')

botao.addEventListener('click', function login(){
    event.preventDefault();

    let getMatricula = document.getElementById('matricula').value
    let getSenha = document.getElementById('senha').value
    let loginValido = false;

    for (const user of users){
        if (getMatricula == user.matricula && getSenha == user.senha){
            loginValido = true
            break
        }
    };

    if (loginValido == true){
        location.href = 'home_aluno.html'
        alert('Sucesso!')
    }else{
        alert('Erro')
    }
})