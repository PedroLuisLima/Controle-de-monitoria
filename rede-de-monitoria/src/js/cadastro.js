import {v4 as uuidv4} from 'uuid';
import bcrypt from "bcryptjs";

let form = document.querySelector('form')

form.addEventListener('submit', async function cadastro(evt){
    evt.preventDefault();
    
    let getNome = document.getElementById('nomeCompleto').value.trim()
    let getMatricula = document.getElementById('matricula').value.trim()
    let getEmail = document.getElementById('email').value.trim().toLowerCase()
    let getSenha = document.getElementById('senha').value
    let id = uuidv4()

    const users = JSON.parse(localStorage.getItem("usuarios")) || []
    
    const existeEmail = users.some(
        user => user.email === getEmail
    );

    const existeMatricula = users.some(
        user => user.matricula === getMatricula
    );
    
    if (!existeEmail && !existeMatricula){
        
        const senhaHash = await bcrypt.hash(getSenha, 10)
        
        let user = {
            id: id,
            nome: getNome,
            matricula: getMatricula,
            email: getEmail,
            senha: senhaHash,
        }
        users.push(user)
        localStorage.setItem("usuarios", JSON.stringify(users))
        window.location.href = "login.html"
    } else{
        window.alert("Email ou matrícula já cadastrados.")
    }
});