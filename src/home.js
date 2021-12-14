const volverAHome = () => window.location.href="./home.html";

const transferirDinero = () =>{
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    console.log(usuarioEnUso);
    const saldoDisponible = document.querySelector('#saldoDisponible');
    console.log(`Transferencia de dinero`);
    document.querySelector('#textoTransferencia').innerHTML = `Ingrese el valor de su transferencia:`;
    document.querySelector(`.transferencia-modal`).click();
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    document.querySelector(`#volverAlHome`).addEventListener('click', () => {
        window.location.href="./home.html";
    })  
    document.querySelector('#transaccion').addEventListener('submit', e =>{
        e.preventDefault();
        const data = new FormData(e.target);
        const dineroTransferencia = data.get(`transferencia`);
        const transferencia = crearTransferencia(dineroTransferencia);
        console.log(`La transferencia es de ${dineroTransferencia}`);
        console.log(transferencia);
        usuarioEnUso.movimientos.push(transferencia);
        console.log(usuarioEnUso.movimientos);
        document.querySelector(`.operacion-realizada-modal`).click();
        document.querySelector('#textoOperacionRealizada').innerHTML = `¡Operación realizada con éxito!`;
        usuarioEnUso.saldo-= Number(dineroTransferencia);
        localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));
        document.querySelector('#transaccionRealizada').addEventListener('click', volverAHome);
    })
}

const depositarEnCuenta = e => {
    e.preventDefault();
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    const data = new FormData(e.target);
    const dineroDeposito = data.get(`transferencia`);
    const deposito = crearDeposito(dineroDeposito);
    console.log(`El depósito es de ${dineroDeposito}`);
    console.log(deposito);
    usuarioEnUso.movimientos.push(deposito);
    console.log(usuarioEnUso.movimientos);
    document.querySelector(`.operacion-realizada-modal`).click();
    document.querySelector('#textoOperacionRealizada').innerHTML = `¡Operación realizada con éxito!`;
    usuarioEnUso.saldo+= Number(dineroDeposito);
    localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));
    document.querySelector('#transaccionRealizada').addEventListener('click', volverAHome);
}

const depositarDinero = () => {
    const saldoDisponible = document.querySelector('#saldoDisponible');
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    console.log(usuarioEnUso);
    console.log(`Depósito de dinero`);
    document.querySelector('#textoTransferencia').innerHTML = `Ingrese el valor de su depósito:`;
    document.querySelector(`.transferencia-modal`).click();
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    document.querySelector('#transaccion').addEventListener('submit', depositarEnCuenta);
    document.querySelector(`#volverAlHome`).addEventListener('click', volverAHome);
}

const agregarMovimientos = () => {
    const resumen = document.querySelector(`#ultimosMovimientos`);
    usuarioEnUso.movimientos.forEach( e => {
        let nuevaOperacion = document.createElement(`p`);
        nuevaOperacion.innerHTML = e.descripcion;
        resumen.appendChild(nuevaOperacion);
    })
}

const iniciar = () => {
    GestionUsuarios.iniciar();
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    console.log(usuarioEnUso.movimientos);
    const resumen = document.querySelector(`#ultimosMovimientos`);
    if(usuarioEnUso.movimientos.length == 0){
        let sinMovimientos = document.createElement(`p`);
        sinMovimientos.innerHTML = `No se registraron movimientos hasta el momento.`
        resumen.appendChild(sinMovimientos);
    }
    // usuarioEnUso.movimientos.forEach( e => {
    //     let nuevaOperacion = document.createElement(`p`);
    //     nuevaOperacion.innerHTML = e.descripcion;
    //     resumen.appendChild(nuevaOperacion);
    // })
    document.querySelector(`#ingresoDinero`).addEventListener(`click`, depositarDinero);
    document.querySelector(`#envioDinero`).addEventListener(`click`, transferirDinero);
}

// Este evento carga la información desde el localStorage
window.addEventListener('load', iniciar);