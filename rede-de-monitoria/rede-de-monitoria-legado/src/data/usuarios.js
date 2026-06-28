if (!localStorage.getItem("usuarios")){
    const usersArray = []
    localStorage.setItem("usuarios", JSON.stringify(usersArray));
}