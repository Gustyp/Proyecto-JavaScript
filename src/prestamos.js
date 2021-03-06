/**
 * Se encarga de mostrar en pantalla mediante un input el valor calculado de la solicitud de préstamo solicitada
 */
const mostrarMontoADevolver = () => {
    const inputMonto = document.querySelector(`#montoPrestamo`);
    const inputCuotas = document.querySelector(`#cantidadCuotas`);
    const inputTotalADevolver = document.querySelector(`#montoADevolver`);
    const interesFijo = 9;
    const interesPorCantidadDeCuotas = Math.trunc(inputCuotas.value / 3);
    const interesAcumulado = (interesFijo * interesPorCantidadDeCuotas);
    const montoAcumuladoConInteres = ((inputMonto.value * interesAcumulado) / 100);
    const montoTotalADevolver = (Number(inputMonto.value) + montoAcumuladoConInteres);
    inputTotalADevolver.value = `$ ${montoTotalADevolver}`;
}

/**
 * Se encarga de simular la solicitud de préstamo en caso de que los datos ingresados sean válidos, solamente permitido uno por usuario
 * @param {Number} montoPrestamo Monto ingresado por el usuario en la solicitud
 * @param {Number} cantidadCuotas Cantidad de cuotas ingresadas por el usuario en la solicitud
 */
const solicitarPrestamo = (montoPrestamo, cantidadCuotas) => {
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const esPrestamoValido = ValidacionOperacion.verificarPrestamoValido(montoPrestamo, cantidadCuotas);
    const poseePrestamoPrevio = usuarioEnUso.prestamoSolicitado;
    const esMayorDe18 = ValidacionUsuario.esMayorDeEdad(usuarioEnUso.edad);
    const montoMinimoPrestamo = (usuarioEnUso.sueldo * 35 / 100);
    const montoMaximoPrestamo = (usuarioEnUso.sueldo * 50 / 100);
    const montoSolicitado = document.querySelector(`#montoPrestamo`).value; 
    const cumpleRequisitosSueldo = ValidacionUsuario.verificarRequisitosSueldo(montoSolicitado, montoMinimoPrestamo, montoMaximoPrestamo);

    if (esMayorDe18){
        if(cumpleRequisitosSueldo){   
            const prestamo = crearPrestamo(montoPrestamo, cantidadCuotas);
            if (esPrestamoValido){
                if (poseePrestamoPrevio){
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'Ya has solicitado un préstamo con anterioridad.',
                    })
                }
                else{
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '¡Operación realizada con éxito!',
                        allowOutsideClick: false,
                        heightAuto: false,
                    })
                    usuarioEnUso.movimientos.unshift(prestamo);
                    usuarioEnUso.prestamoSolicitado = true;
                    GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
                }
            }
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Debes ser mayor de edad para poder solicitar un préstamo.',
        })
    }
}

/**
 * Función que se encarga de obtener los datos del formulario de solicitud de préstamo
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
    // Evento que se encarga de otener los datos del formulario de solicitud de préstamo
    $('#creditForm').on('submit', obtenerDatosFormulario); 
    $('#calcularPrestamo').on('click', mostrarMontoADevolver);
    $(`#misDatos`).on(`click`, cargarDatosPersonales);
}

// Este evento carga la información desde el localStorage
$(() => iniciar());