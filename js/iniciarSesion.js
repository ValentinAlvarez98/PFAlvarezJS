const formularioIngreso = document.querySelector('#formularioIngreso');

formularioIngreso.addEventListener("submit", (e) => {
    e.preventDefault();
    ingreso();
})
    
function ingreso() {

    let emailIngresado = document.querySelector('#emailUsuarioInicio').value;
    let passwordIngresada = document.querySelector('#passwordUsuarioInicio').value;

    emailIngresado === "" ?
        
        [ocultarTodoLogin(), mostrarError(emailVacioInicio)] :

        /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|gmail|banifox)\.(?:|com|com.uy|es)+$/i.test(emailIngresado) === false ?
            
            [ocultarTodoLogin(), mostrarError(emailIncorrectoInicio)] :

            passwordIngresada === "" ?
                
                [ocultarTodoLogin(), ocultarError(emailIncorrectoInicio), mostrarError(passwordVaciaInicio)] :

            [ocultarTodoLogin(), comparadorUsuarios()];

    function comparadorUsuarios() {
        let usuarioAIngresar = {
            emailUsuario: emailIngresado.toLowerCase(),
            passwordUsuario: passwordIngresada
        };
        let ingresarUsuario = new Promise((resolve, reject) => {
        let usuarioExiste = JSON.parse(localStorage.getItem(`${usuarioAIngresar.emailUsuario}`, usuarioAIngresar.emailUsuario && usuarioAIngresar.passwordUsuario));
        if (usuarioExiste !== null && usuarioExiste.emailUsuario === usuarioAIngresar.emailUsuario && usuarioExiste.passwordUsuario === usuarioAIngresar.passwordUsuario) {
            usuarioActivo.push(usuarioExiste);
            sessionStorage.setItem('Usuario Activo', JSON.stringify(usuarioActivo));
            resolve();
        } else {
            reject();
        }
    });   
    ingresarUsuario
        .then(() => {
            ocultarTodoLogin();
            setTimeout(() => {
                sesion();
                window.location.href = /* "/pages/miCuenta.html" */ '/PFAlvarez/pages/miCuenta.html';
            }, 200);
        })
        .catch(() => {
            mostrarError(usuarioNoExiste);
        });
    }

}
