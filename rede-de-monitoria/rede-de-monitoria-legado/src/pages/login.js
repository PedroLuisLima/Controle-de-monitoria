import { login } from "../services/session";

let form = document.querySelector('form')

form.addEventListener('submit', login);