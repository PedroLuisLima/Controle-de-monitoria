import {v4 as uuidv4} from 'uuid';
import bcrypt from "bcryptjs";
import { existeEmail, existeMatricula } from '../utils/validações';


function getUsers(){
    return JSON.parse(localStorage.getItem("usuarios") || "[]")
}

function saveUser(users){
    localStorage.setItem("usuarios", JSON.stringify(users) || "[]") 
}

async function cadastrarUser(valores) {

        const usuarios= getUsers()

        const emailExiste= existeEmail(usuarios, valores.email)
        
        const matriculaExiste= existeMatricula(usuarios, valores.matricula)

        if (!emailExiste && !matriculaExiste){
            
            const senhaHash = await bcrypt.hash(valores.senha, 10)
            
            let user = {
                id: uuidv4(),
                nome: valores.nome,
                matricula: valores.matricula,
                email: valores.email,
                senha: senhaHash,
            }
            usuarios.push(user)
            saveUser(usuarios)
            window.location.href = "login.html"
        } else{
            window.alert("Email ou matrícula já cadastrados.")
        }
}

export {getUsers, saveUser, cadastrarUser};