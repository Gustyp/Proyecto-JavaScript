const girarTarjeta = () => {
    const tarjeta = document.querySelector("#card");
    tarjeta.classList.toggle(`is-flipped`);
};

const cargarDatosDeUsuario = () => {
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const inputNombreApellido = document.querySelector(`#nombreCompletoUsuario`)
    const inputEdadUsuario = document.querySelector(`#edadUsuario`);
    const inputSueldoUsuario = document.querySelector(`#sueldoUsuario`);
    if (usuarioEnUso.hayDatosCargados){
        inputNombreApellido.value = `${usuarioEnUso.nombre} ${usuarioEnUso.apellido}`;
        inputEdadUsuario.value = `${usuarioEnUso.edad}`;
        inputSueldoUsuario.value = `${usuarioEnUso.sueldo}`;
    }
    else{
        Swal.fire({
        icon: 'info',
        title: 'Ups...',
        text: 'Aún tienes datos sin cargar.',
        })
    }
}

const solicitarTarjeta = () => {
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const edadUsuario = document.querySelector(`#edadUsuario`).value;
    if (!usuarioEnUso.tarjetaSolicitada){
        if (ValidacionUsuario.esMayorDeEdad(edadUsuario)){
            Swal.fire({
                icon: 'success',
                title: '¡Solicitud enviada!',
                text: 'Recibirá noticias en un período de 72hs hábiles en su dirección de correo electrónico si ha sido aprobada.',
                heightAuto: false,
            })
            usuarioEnUso.tarjetaSolicitada = true;
            GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
        }
    }
    else{
        Swal.fire({
            icon: 'info',
            title: '¡Ups!',
            text: 'Ya tienes una solicitud pendiente de aprobación.',
            heightAuto: false,
        })
    } 
}

/**
 * Función que se encarga de cargar los datos almacenados en localStorage
 */
const iniciar = () => {
    GestionUsuarios.iniciar();
    $(`#card`).on('click', girarTarjeta);
    $('#cargarDatos').on('click', cargarDatosDeUsuario);
    $(`#misDatos`).on(`click`, cargarDatosPersonales);
    $(`#enviarSolicitud`).on(`click`, solicitarTarjeta);
}

// Este evento carga la información desde el localStorage
$(() => iniciar());