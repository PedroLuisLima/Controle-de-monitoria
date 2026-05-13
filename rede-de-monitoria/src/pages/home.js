const perfil = document.getElementById('profile')
const menu = document.getElementById('menu')

perfil.addEventListener('click', function dropdown(){
    menu.classList.toggle('hidden')
})