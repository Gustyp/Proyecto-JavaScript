const verificarPrestamoValido = (montoPrestamo, cantidadCuotas) => ValidacionOperacion.esMontoValido(montoPrestamo) && ValidacionOperacion.sonCuotasValidas(cantidadCuotas);

const solicitarPrestamo = (montoPrestamo, cantidadCuotas) => {
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const esPrestamoValido = verificarPrestamoValido(montoPrestamo, cantidadCuotas);
    const poseePrestamoPrevio = usuarioEnUso.prestamoSolicitado;
    const prestamo = crearPrestamo(montoPrestamo, cantidadCuotas);
    console.log(`El monto es de ${montoPrestamo} y la cantidad de cuotas es de ${cantidadCuotas}`);
    if (esPrestamoValido){
        console.log(`Préstamo válido`);
        console.log(`El valor de poseeprestamoprevio es ${poseePrestamoPrevio}`);
        if (poseePrestamoPrevio){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Ya has solicitado un préstamo con anterioridad.',
            })
        }
        else{
            console.log(`no tenes un prestamo previo, podes pedir uno`);
            usuarioEnUso.movimientos.unshift(prestamo);
            usuarioEnUso.prestamoSolicitado = true;
            GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
        }
    }
    else{
        console.log(`Préstamo inválido`);
    }
}

/**
 * Función que se encarga de obtener los datos del formulario de login
 */
const obtenerDatosFormulario = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const montoPrestamo = data.get(`monto`);
    const cantidadCuotas = data.get('cuotas');
    solicitarPrestamo(montoPrestamo, cantidadCuotas);
}

/**
 * Función que se encarga de cargar los datos almacenados en localStorage
 */
const iniciar = () => {
    GestionUsuarios.iniciar();
    // Evento que se encarga de otener los datos del formulario de login al presionar el botón Enviar
    $('#creditForm').on('submit', obtenerDatosFormulario); 
}

// Este evento carga la información desde el localStorage
$(() => iniciar());