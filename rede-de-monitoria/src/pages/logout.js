import { logout } from "../services/session"

let btnLogout = document.getElementById('logout')

btnLogout.addEventListener('click', logout)