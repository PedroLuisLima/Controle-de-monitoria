const logado = sessionStorage.getItem("userLogado")

if (logado === null){
    alert("Faça login para acessar a home.")
    window.location.href = 'cadastro.html'
};