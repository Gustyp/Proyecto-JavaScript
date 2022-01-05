/**
 * Función que se encarga de obtener los datos del formulario de login
 */
const obtenerDatosFormulario = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const usuario = data.get(`user`);
    const password = data.get('password');
    ControlSesion.iniciarSesion(usuario, password); 
}

/**
 * Función que se encarga de cargar los datos almacenados en localStorage
 */
const iniciar = () => {
    localStorage.removeItem('Usuario-Actual');
    GestionUsuarios.iniciar();
    // Evento que se encarga de otener los datos del formulario de login al presionar el botón Enviar
    $(() => $('#loginForm').on('submit', obtenerDatosFormulario)); 
}

// Este evento carga la información desde el localStorage
$(() => iniciar());