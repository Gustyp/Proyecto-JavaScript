/**
 * Se encarga de regresar a la home mediante un evento
 */
const volverAHome = () => window.location.href="./home.html";

/**
 * Se encarga de realizar la transferencia de dinero, si es un monto válido y si es que existe el destinatario
 */
const transferirAUsuario = e => {
    e.preventDefault();
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const data = new FormData(e.target);
    const dineroTransferencia = data.get(`transferencia`);
    const destinatario = data.get(`destinatario`);
    if (ValidacionOperacion.esUsuarioValido(destinatario, dineroTransferencia)){
        const transferencia = crearTransferencia(dineroTransferencia, destinatario);
        usuarioEnUso.movimientos.unshift(transferencia);
        Swal.fire({
            position: 'center',
            icon: 'success',
            timer: 2000,
            title: '¡Operación realizada con éxito!',
            showConfirmButton: false,
            allowOutsideClick: false,
            heightAuto: false
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                usuarioEnUso.saldo-= Number(dineroTransferencia);
                GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
                volverAHome();
            }
        })
    }
}

/**
 * Se encarga de crear el modal de transferencia de dinero, y administrar el evento para transferir a otra cuenta o volver a la home
 */
const transferirDinero = () =>{
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const saldoDisponible = document.querySelector('#saldoDisponible');
    crearModalTransferencia();
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    $('#volverAlHome').on('click', volverAHome);  
    $('#modalForm').on('submit', transferirAUsuario);    
}

/**
 * Se encarga de realizar el depósito de dinero en la cuenta del usuario si es un monto válido
 */
const depositarEnCuenta = e => {
    e.preventDefault();
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    const data = new FormData(e.target);
    const dineroDeposito = data.get(`transferencia`);
    const deposito = crearDeposito(dineroDeposito);
    if (ValidacionOperacion.esDepositoValido(dineroDeposito)){
        usuarioEnUso.movimientos.unshift(deposito);
        Swal.fire({
            position: 'center',
            icon: 'success',
            timer: 2000,
            title: '¡Operación realizada con éxito!',
            showConfirmButton: false,
            allowOutsideClick: false,
            heightAuto: false,
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                usuarioEnUso.saldo+= Number(dineroDeposito);
                GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
                volverAHome();
            }
        })
    }
}

/**
 * Se encarga de crear el modal de depósito de dinero, y administrar el evento para depositar en la cuenta o volver a la home
 */
const depositarDinero = () => {
    const saldoDisponible = document.querySelector('#saldoDisponible');
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    crearModalDeposito();
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    $('#modalForm').on('submit', depositarEnCuenta);
    $('#volverAlHome').on('click', volverAHome);
}

/**
 * Se encarga de cargar todos los movimientos que ha realizado el usuario cada vez que se recarga la home
 * @param {Object} usuarioEnUso Objeto que representa el usuario que tiene la sesión iniciada en ese momento
 */
const agregarMovimientos = usuarioEnUso => {
    const resumen = document.querySelector(`#ultimosMovimientos`);
    usuarioEnUso.movimientos.forEach( e => {
        let nuevaOperacion = document.createElement(`p`);
        nuevaOperacion.innerHTML = e.descripcion;
        resumen.appendChild(nuevaOperacion);
    })
}

/**
 * Se encarga de verificar si no hay movimientos recientes, en caso de que no haya muestra un mensaje de movimientos nulos
 * @param {Object} usuarioEnUso Objeto que representa el usuario que tiene la sesión iniciada en ese momento
 */
const mostrarNoHayMovimientos = usuarioEnUso => {
    const resumen = document.querySelector(`#ultimosMovimientos`);
    if(usuarioEnUso.movimientos.length == 0){
        let sinMovimientos = document.createElement(`p`);
        sinMovimientos.innerHTML = `No se registraron movimientos hasta el momento.`
        resumen.appendChild(sinMovimientos);
    }
}

const copiarCvu = cvu => {
    navigator.clipboard.writeText(cvu);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })    
    Toast.fire({
    icon: 'success',
    title: 'Copiado con éxito al portapapeles'
    })
}

const mostrarCvu = () => {
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    Swal.fire({
        title: 'Su CVU:',
        icon: 'info',
        text: `${usuarioEnUso.cvu}`,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        showCancelButton: true,
        confirmButtonColor: '#00CC99',
        cancelButtonColor: '#6600FF',
        confirmButtonText: 'Copiar',
        cancelButtonText: 'Cerrar',
    }).then((result) => {
        if (result.isConfirmed) {
            copiarCvu(usuarioEnUso.cvu);
        }
    })
}

const cargarDatosPersonales = () => {
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
    crearModalDatosPersonales(); 
}

/**
 * Función que se encarga de cargar los datos almacenados en localStorage, y administra los eventos de depósito y transferencia
 */
const iniciar = () => {
    GestionUsuarios.iniciar();
    const saldoDisponible = document.querySelector('#saldoDisponible');
    const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();    
    saldoDisponible.innerHTML = `Saldo disponible: $ ${usuarioEnUso.saldo}`;
    mostrarNoHayMovimientos(usuarioEnUso);
    agregarMovimientos(usuarioEnUso);
    $('#ingresoDinero').on('click', depositarDinero);
    $('#envioDinero').on('click', transferirDinero);
    $('#cvuUsuario').on('click', mostrarCvu);
    $(`#misDatos`).on(`click`, cargarDatosPersonales);
}

// Este evento carga la información desde el localStorage
$(() => iniciar());
