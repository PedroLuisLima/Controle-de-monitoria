import { disciplinasP1 } from "../components/turmas"

const perfil = document.getElementById('profile')
const menu = document.getElementById('menu')

perfil.addEventListener('click', function dropdown(){
    menu.classList.toggle('hidden')
})

const cardsContainer = document.getElementById('cards-section')

disciplinasP1.forEach(disciplina => {
    cardsContainer.innerHTML+= `
    <div onclick="event.stopPropagation(); window.location.href='disciplina.html?nome=${encodeURIComponent(disciplina.nome)}'" class="bg-white border-2 border-green-800 rounded-xl shadow-sm flex flex-col items-center justify-center text-center w-72 h-48 hover:shadow-md transition-shadow cursor-pointer">
        <h2 class="text-xl md:text-2xl font-bold text-green-900 px-4">${disciplina.nome}</h2>
        <p class="mt-2 text-sm text-gray-600 font-medium">Monitor: ${disciplina.monitor}</p>
    </div>
    `
});

