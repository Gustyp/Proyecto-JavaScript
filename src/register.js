const obtenerDatosFormulario = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const usuario = data.get(`user`);
    const email = data.get('mail');
    const password = data.get('password');
    const rePassword = data.get('repassword');

    console.log(`${data}, ${usuario}, ${email}, ${password}, ${rePassword}`);
    GestionUsuarios.crearNuevoUsuario(usuario, email, password, rePassword);
}

const iniciar = () => {
    localStorage.removeItem('Usuario-Actual');
    GestionUsuarios.iniciar();
    // Evento que se encarga de otener los datos del formulario de registro al presionar el botón Enviar
    document.querySelector('#registerForm').addEventListener('submit', obtenerDatosFormulario);
    
}

// Este evento carga la información desde el localStorage
window.addEventListener('load', iniciar);