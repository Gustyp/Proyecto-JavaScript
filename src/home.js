const volverAHome = () => window.location.href="./home.html";

const esMontoValido = dineroTransferencia => {
    if (dineroTransferencia <= 0 || dineroTransferencia == ``){
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

const esDepositoValido = dineroDeposito => esMontoValido(dineroDeposito);


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
    return usuarioEncontrado.usuario;
}

const esUsuarioValido = (destinatario, dineroTransferencia) => {
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
        console.log(`La transferencia que recibirá ${usuarioEncontrado.usuario} es de $${dineroTransferencia}`);
        console.log(dineroTransferencia);
        usuarioEncontrado.movimientos.push(transferenciaRecibida);
        localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));
        return true;
    }
    return false;
}

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
        localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));
        $(() => $('#transaccionRealizada').on('click', volverAHome));
    }
}

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
        document.querySelector(`.operacion-realizada-modal`).click();
        document.querySelector('#textoOperacionRealizada').innerHTML = `¡Operación realizada con éxito!`;
        usuarioEnUso.saldo+= Number(dineroDeposito);
        localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));
        $(() => $('#transaccionRealizada').on('click', volverAHome));
    }
}

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

const agregarMovimientos = usuarioEnUso => {
    const resumen = document.querySelector(`#ultimosMovimientos`);
    usuarioEnUso.movimientos.forEach( e => {
        let nuevaOperacion = document.createElement(`p`);
        nuevaOperacion.innerHTML = e.descripcion;
        resumen.appendChild(nuevaOperacion);
    })
}

/**
 * 
 * @param {*} usuarioEnUso 
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
 * 
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
