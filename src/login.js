const obtenerDatosFormulario = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const usuario = data.get(`user`);
    const password = data.get('password');
    ControlSesion.iniciarSesion(usuario, password); 
}

const iniciar = () => {
    localStorage.removeItem('Usuario-Actual');
    GestionUsuarios.iniciar();
    // Evento que se encarga de otener los datos del formulario de login al presionar el botón Enviar
    $(() => $('#loginForm').on('submit', obtenerDatosFormulario)); 
    // document.querySelector('#loginForm').addEventListener('submit', obtenerDatosFormulario);
}

// Este evento carga la información desde el localStorage
$(() => iniciar());
// window.addEventListener('load', iniciar);