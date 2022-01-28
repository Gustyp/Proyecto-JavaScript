/**
 * Se encarga de recargar la página actual
 */
const recargarPagina = () => window.location.reload();

/**
 * Se encarga de guardar los datos, si es que son válidos y hay campos vacios
 */
const guardarDatos = e => {
    e.preventDefault();
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const data = new FormData(e.target);
    const nombreCompleto = data.get(`nombreApellido`);
    const edad = data.get(`edad`);
    const sueldo = data.get(`sueldo`);
    const arrayNombreCompleto = nombreCompleto.split(' ', 2);
    console.log(arrayNombreCompleto);
    if (ValidacionUsuario.sonDatosValidos(arrayNombreCompleto[0],arrayNombreCompleto[1], edad, sueldo)){
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

/**
 * Si hay datos previamente cargado, se encarga de mostrarlo mediante los inputs, sino se permite la opción de cargarlos
 */
const cargarDatosPersonales = () => {
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    crearModalDatosPersonales();
    const inputNombreCompleto = document.querySelector(`#nombreGuardado`);
    const inputEdad = document.querySelector(`#edadGuardada`);
    const inputSueldo = document.querySelector(`#sueldoGuardado`);
    if (usuarioEnUso.hayDatosCargados){
        inputNombreCompleto.value = `${usuarioEnUso.nombre} ${usuarioEnUso.apellido}`;
        inputEdad.value = `${usuarioEnUso.edad}`;
        inputSueldo.value = `${usuarioEnUso.sueldo}`;
    }
    $(`#modalForm`).on(`submit`, guardarDatos);
    $('#volverAlHome').on('click', recargarPagina);
}