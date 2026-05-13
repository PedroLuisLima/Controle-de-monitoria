let btnLogout = document.getElementById('logout')

btnLogout.addEventListener('click', function logout(){
    sessionStorage.clear()
    location.reload()
})