/**
 * Se encarga de regresar a la home mediante un evento
 */
const recargarPagina = () => window.location.reload();

const guardarDatos = e => {
    e.preventDefault();
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const data = new FormData(e.target);
    const nombreCompleto = data.get(`nombreApellido`);
    const edad = data.get(`edad`);
    const sueldo = data.get(`sueldo`);
    const arrayNombreCompleto = nombreCompleto.split(' ', 2);
    console.log(arrayNombreCompleto);
    if (ValidacionOperacion.sonDatosValidos(arrayNombreCompleto[0],arrayNombreCompleto[1], edad, sueldo)){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Datos actualizados con éxito!',
            timer: 2000,
            showConfirmButton: false,
            allowOutsideClick: false,
            heightAuto: false,
        });
        usuarioEnUso.nombre = arrayNombreCompleto[0];
        usuarioEnUso.apellido = arrayNombreCompleto[1];
        usuarioEnUso.edad = edad;
        usuarioEnUso.sueldo = sueldo;
        usuarioEnUso.hayDatosCargados = true;
        GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
    }
    console.table(usuarioEnUso);
}

const cargarDatosPersonales = () => {
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    crearModalDatosPersonales();
    const inputNombreCompleto = document.querySelector(`#nombreCompletoUsuario`);
    const inputEdad = document.querySelector(`#edadUsuario`);
    const inputSueldo = document.querySelector(`#sueldoUsuario`);
    if (usuarioEnUso.hayDatosCargados){
        inputNombreCompleto.value = `${usuarioEnUso.nombre} ${usuarioEnUso.apellido}`;
        inputEdad.value = `${usuarioEnUso.edad}`;
        inputSueldo.value = `${usuarioEnUso.sueldo}`;
    }
    $(`#modalForm`).on(`submit`, guardarDatos);
    $('#volverAlHome').on('click', recargarPagina);
}