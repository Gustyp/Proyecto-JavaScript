/**
 * Clase para manejar el inicio y cierre de sesión
 */
class ControlSesion{
    /**
     * Se encarga de simular el inicio de sesión si se encuentra un usuario y contraseña que coincidan con los datos ingresados
     * @param {String} usuario Nombre de usuario
     * @param {String} password Contraseña del usuario
     */
    static iniciarSesion = (usuario, password) => {
        let loginExitoso = GestionUsuarios.usuarios.find(Usuario => (Usuario.usuario == usuario)  && (password === Usuario.password));
        if(loginExitoso){
            GestionUsuarios.usuarioActual = loginExitoso;
            localStorage.setItem('Usuario-Actual', GestionUsuarios.usuarioActual.usuario);            
            GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);            
            window.location.href="./home.html";  
        } 
        else{
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Usuario y/o contraseñas inválidos, por favor intente otra vez.',
                heightAuto: false,
            })
        }
    }

    /**
     * Se encarga de simular el cierre de sesión
     */
    static cerrarSesion = () => {
        GestionUsuarios.usuarioActual = null;
        localStorage.removeItem(`Usuario-Actual`)
        window.location.href="./index.html";
    }
}