import { cadastrarUser } from '../services/storage';

let form = document.querySelector('form')

form.addEventListener('submit', async function cadastro(evt){
    evt.preventDefault();
    
    let getNome = document.getElementById('nomeCompleto').value.trim()
    let getMatricula = document.getElementById('matricula').value.trim()
    let getEmail = document.getElementById('email').value.trim().toLowerCase()
    let getSenha = document.getElementById('senha').value
    
    const valores={
        nome: getNome,
        matricula: getMatricula,
        email: getEmail,
        senha: getSenha,
    }

    await cadastrarUser(valores)
});