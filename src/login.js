/**
 * Función que se encarga de obtener los datos del formulario de login
 */
const obtenerDatosFormulario = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const usuario = data.get(`user`);
    const password = data.get('password');
    const checkbox = data.get(`checkRecuerdame`)
    ControlSesion.iniciarSesion(usuario, password, checkbox); 
}

/**
 * Función que se encarga de cargar los datos almacenados en localStorage
 */
const iniciar = () => {
    GestionUsuarios.iniciar();
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const recordarUsuario = localStorage.getItem('Recuerdame');
    const inputUsuario = document.querySelector(`#user`);
    const inputPassword = document.querySelector(`#password`);
    if(recordarUsuario){
        const usuarioGuardado = usuarioEnUso.usuario;
        const passwordGuardado = usuarioEnUso.password;
        inputUsuario.value = usuarioGuardado;
        inputPassword.value = passwordGuardado;
    }
    // localStorage.removeItem('Usuario-Actual');
    // Evento que se encarga de otener los datos del formulario de login al presionar el botón Enviar
    $('#loginForm').on('submit', obtenerDatosFormulario); 
}

// Este evento carga la información desde el localStorage
$(() => iniciar());