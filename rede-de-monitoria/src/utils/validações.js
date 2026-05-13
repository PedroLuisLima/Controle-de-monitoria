function existeEmail(users, email){
    return users.some(
      user => user.email === email
  );
} 

function existeMatricula(users, matricula){
    return users.some(
        user => user.matricula === matricula
    );
}

export {existeEmail, existeMatricula};