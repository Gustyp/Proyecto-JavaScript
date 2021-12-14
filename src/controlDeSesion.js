/**
 * Clase para manejar el inicio y cierre de sesión
 */
class ControlSesion{
    /**
     * Se encarga de simular el inicio de sesión si se encuentra un usuario y contraseña que coincidan con los datos ingresados
     * @param {String} usuario Nombre de usuario
     * @param {String} password Contraseña del usuario
     */
    static iniciarSesion(usuario, password){
        let loginExitoso = GestionUsuarios.usuarios.find(Usuario => (Usuario.usuario == usuario)  && (password === Usuario.password));
        if(loginExitoso){
            GestionUsuarios.usuarioActual = loginExitoso;
            localStorage.setItem('Usuario-Actual', GestionUsuarios.usuarioActual.usuario);            
            localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));            
            window.location.href="./home.html";  
        } 
        else{
            document.querySelector('#loginRechazadoTexto').innerHTML = `Usuario y/o contraseñas inválidos, por favor intente otra vez.`;
            document.querySelector(`.login-rechazado-modal`).click();
        }
    }

    /**
     * Se encarga de simular el cierre de sesión
     */
    static cerrarSesion(){
        GestionUsuarios.usuarioActual = null;
        localStorage.removeItem(`Usuario-Actual`)
        window.location.href="./index.html";
    }
}