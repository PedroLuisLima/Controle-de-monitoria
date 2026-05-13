const urlParams = new URLSearchParams(window.location.search);
const nomeDisciplina = urlParams.get('nome');

const tituloPagina = document.getElementById('disciplina-nome');
const breadcrumb = document.getElementById('breadcrumb-atual');

if (nomeDisciplina) {
    tituloPagina.innerText = nomeDisciplina;
    
    document.title = `Monitoria - ${nomeDisciplina}`;
}