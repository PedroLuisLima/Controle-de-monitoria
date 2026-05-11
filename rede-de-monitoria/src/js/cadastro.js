import {v4 as uuidv4} from 'uuid';
import bcrypt from "bcryptjs";

let botaoCadastro = document.getElementById('btn_cadastro')

botaoCadastro.addEventListener('click', function cadastro(evt){
    evt.preventDefault();
    
    let getNome = document.getElementById('nomeCompleto').value
    let getMatricula = document.getElementById('matricula').value
    let getEmail = document.getElementById('email').value
    let getSenha = document.getElementById('senha').value
    let getFoto = document.getElementById('foto').value
    let id = uuidv4()

    if (typeof getSenha !== "string"){
        getSenha = getSenha.toString()
    }

    let verifiedMatricula = true;
    let verifiedEmail = true;

    const users = JSON.parse(localStorage.getItem("usuarios")) || []
    
    for (let user of users){
        if (user.email.toLowerCase() === getEmail.toLowerCase()){
            alert("E-mail já cadastrado, faça login.")
            verifiedEmail = false;
            break
        }else if (user.matricula === getMatricula){
            alert("Matrícula já cadastrada, faça login.")
            verifiedMatricula = false;
            break
        }
    }

    if ((verifiedEmail && verifiedMatricula) === true){
        let user = {
            id: id,
            nome: getNome,
            matricula: getMatricula,
            email: getEmail,
            senha: bcrypt.hash(getSenha, 10),
            foto: getFoto,
        }
        users.push(user)
        localStorage.setItem("usuarios", JSON.stringify(users))
        location.href = "login.html"
    }
});