/**
 * Se encarga de regresar a la home mediante un evento
 */
const volverAHome = () => window.location.href="./home.html";

/**
 * Se encarga de verificar que el monto ingresado sea válido
 * @param {Number} monto Monto de la operación a realizarse
 * @returns {Boolean} Devuelve true en caso de que el valor ingresado sea mayor a 0 y no se encuentre vacío, en caso contrario devolverá false
 */
const esMontoValido = monto => {
    if (monto <= 0 || monto == ``){
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Has ingresado un monto inválido.',
        })
        console.log(`Ha ingresado un monto inválido.`);
        return false;
    }
    return true;
}

/**
 * Se encarga de verificar que la solicitud de depósito sea válida
 * @param {Number} dineroDeposito Monto del depósito a realizarse
 * @returns {Boolean} Devuelve true solamente en caso de que el depósito sea válido
 */
const esDepositoValido = dineroDeposito => esMontoValido(dineroDeposito);

/**
 * Se encarga de verificar que el destinatario exista
 * @param {String} destinatario Identificatorio del usuario al que se le enviará el dinero 
 * @returns Devuelve el usuario encontrado en caso de que se encuentre similitud a una cuenta creada, de lo contrario devolverá false
 */
const existeUsuario = destinatario => {
    arrayUsuarioExistente = [];
    const existeUsuarioNombre = GestionUsuarios.usuarios.find(usuario => usuario.usuario == destinatario);
    const existeUsuarioMail = GestionUsuarios.usuarios.find(usuario => usuario.mail == destinatario)
    const existeUsuarioCvu = GestionUsuarios.usuarios.find(usuario => usuario.cvu == destinatario)
    arrayUsuarioExistente.push(existeUsuarioNombre, existeUsuarioMail, existeUsuarioCvu);
    console.log(arrayUsuarioExistente);
    const noExisteUsuario = arrayUsuarioExistente.every(e => e == undefined);
    if (noExisteUsuario){
        Swal.fire(
            '¡Error!',
            'Usuario inexistente.',
            'question'
        )
        return false;
    }
    const filterUsuarioEncontrado = arrayUsuarioExistente.filter(e => e);
    const usuarioEncontrado = filterUsuarioEncontrado[0];
    console.log(`El usuario encontrado es: `);
    console.log(usuarioEncontrado.usuario);
    return usuarioEncontrado;
}

/**
 * Se encarga de verificar si el usuario al que se envia la transferencia existe y si el monto a enviar es válido
 * @param {String} destinatario Identificatorio del usuario al que se le enviará el dinero 
 * @param {Number} dineroTransferencia Monto de la transferencia a realizarse
 * @returns {Boolean} Devuelve true en caso de que el usuario exista y el monto sea válido, en caso contrario devolverá false
 */
const esUsuarioValido = (destinatario, dineroTransferencia) => {
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    const usuarioExistente = existeUsuario(destinatario);
    const montoAceptado = esMontoValido(dineroTransferencia);
    if (usuarioExistente && montoAceptado){
        if (GestionUsuarios.usuarioActual == usuarioExistente){
            console.log(`Soy yo mismo`);
            Swal.fire({
                title: '¿Estás bien?',
                text: "¡Es imposible enviarte una transferencia a ti mismo!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
            });
            return false;
        }
        console.log(`Arriba lee.`);
        const transferenciaRecibida = crearTransferenciaRecibida(dineroTransferencia, usuarioEnUso.usuario);
        console.log(`La transferencia que recibirá ${usuarioExistente.usuario} es de $${dineroTransferencia}`);
        console.log(dineroTransferencia);
        usuarioExistente.movimientos.push(transferenciaRecibida);
        GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
        return true;
    }
    return false;
}

/**
 * Se encarga de realizar la transferencia de dinero, si es un monto válido y si es que existe el destinatario
 */
const transferirAUsuario = e => {
    e.preventDefault();
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    const data = new FormData(e.target);
    const dineroTransferencia = data.get(`transferencia`);
    const destinatario = data.get(`destinatario`);
    if (esUsuarioValido(destinatario, dineroTransferencia)){
        const transferencia = crearTransferencia(dineroTransferencia, destinatario);
        console.log(`La transferencia es de ${dineroTransferencia}`);
        console.log(transferencia);
        usuarioEnUso.movimientos.push(transferencia);
        console.log(usuarioEnUso.movimientos);
        document.querySelector(`.operacion-realizada-modal`).click();
        document.querySelector('#textoOperacionRealizada').innerHTML = `¡Operación realizada con éxito!`;
        usuarioEnUso.saldo-= Number(dineroTransferencia);
        GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
        $(() => $('#transaccionRealizada').on('click', volverAHome));
    }
}

/**
 * Se encarga de crear el modal de transferencia de dinero, y administrar el evento para transferir a otra cuenta o volver a la home
 */
const transferirDinero = () =>{
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    console.log(usuarioEnUso);
    const saldoDisponible = document.querySelector('#saldoDisponible');
    console.log(`Transferencia de dinero`);
    crearModalTransferencia();
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    $(() => $('#volverAlHome').on('click', volverAHome));  
    $(() => $('#transaccion').on('submit', transferirAUsuario));    
}

/**
 * Se encarga de realizar el depósito de dinero en la cuenta del usuario si es un monto válido
 */
const depositarEnCuenta = e => {
    e.preventDefault();
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    const data = new FormData(e.target);
    const dineroDeposito = data.get(`transferencia`);
    const deposito = crearDeposito(dineroDeposito);
    console.log(`El depósito es de ${dineroDeposito}`);
    console.log(deposito);
    if (esDepositoValido(dineroDeposito)){
        usuarioEnUso.movimientos.push(deposito);
        console.log(usuarioEnUso.movimientos);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Operación realizada con éxito!',
            showConfirmButton: true,
            confirmButtonText: 'Cerrar',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
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
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    console.log(usuarioEnUso);
    console.log(`Depósito de dinero`);
    crearModalDeposito();
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    $(() => $('#transaccion').on('submit', depositarEnCuenta));
    $(() => $('#volverAlHome').on('click', volverAHome));
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

/**
 * Función que se encarga de cargar los datos almacenados en localStorage, y administra los eventos de depósito y transferencia
 */
const iniciar = () => {
    GestionUsuarios.iniciar();
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    console.log(usuarioEnUso.movimientos);
    mostrarNoHayMovimientos(usuarioEnUso);
    agregarMovimientos(usuarioEnUso);
    $(() => $('#ingresoDinero').on('click', depositarDinero));
    $(() => $('#envioDinero').on('click', transferirDinero));
}

// Este evento carga la información desde el localStorage
$(() => iniciar());
