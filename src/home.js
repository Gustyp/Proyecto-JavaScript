const volverAHome = () => window.location.href="./home.html";

const coincideUsuario = (destinatario, dineroTransferencia) => {
    arrayUsuarioValido = [];
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    const existeUsuarioNombre = GestionUsuarios.usuarios.find(usuario => usuario.usuario == destinatario);
    const existeUsuarioMail = GestionUsuarios.usuarios.find(usuario => usuario.mail == destinatario)
    const existeUsuarioCvu = GestionUsuarios.usuarios.find(usuario => usuario.cvu == destinatario)
    arrayUsuarioValido.push(existeUsuarioNombre, existeUsuarioMail, existeUsuarioCvu);
    console.log(arrayUsuarioValido);
    const noExisteUsuario = arrayUsuarioValido.every(e => e == undefined);
    if (noExisteUsuario){
        console.log(`El usuario no existe`);
        return false;
    }
    const filterUsuarioEncontrado = arrayUsuarioValido.filter(e => e);
    const usuarioEncontrado = filterUsuarioEncontrado[0];
    console.log(`El usuario encontrado es: `);
    console.log(usuarioEncontrado.usuario);
    console.log(`Arriba lee.`);
    const transferenciaRecibida = crearTransferenciaRecibida(dineroTransferencia, usuarioEnUso.usuario);
    console.log(`La transferencia que recibirá ${usuarioEncontrado.usuario} es de $${dineroTransferencia}`);
    console.log(dineroTransferencia);
    usuarioEncontrado.movimientos.push(transferenciaRecibida);
    localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));
    return true;
}

const transferirAUsuario = e => {
    e.preventDefault();
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    const data = new FormData(e.target);
    const dineroTransferencia = data.get(`transferencia`);
    const destinatario = data.get(`destinatario`);
        if (coincideUsuario(destinatario, dineroTransferencia)){
            const transferencia = crearTransferencia(dineroTransferencia, destinatario);
            console.log(`La transferencia es de ${dineroTransferencia}`);
            console.log(transferencia);
            usuarioEnUso.movimientos.push(transferencia);
            console.log(usuarioEnUso.movimientos);
            document.querySelector(`.operacion-realizada-modal`).click();
            document.querySelector('#textoOperacionRealizada').innerHTML = `¡Operación realizada con éxito!`;
            usuarioEnUso.saldo-= Number(dineroTransferencia);
            localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));
            // document.querySelector('#transaccionRealizada').addEventListener('click', volverAHome);
            $(() => $('#transaccionRealizada').on('click', volverAHome));
        }
}

const transferirDinero = () =>{
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    console.log(usuarioEnUso);
    const saldoDisponible = document.querySelector('#saldoDisponible');
    console.log(`Transferencia de dinero`);
    const main = document.querySelector(`main`);
    let nuevoModal = document.createElement(`div`);
    nuevoModal.innerHTML = `
    <!-- Botón Modal -->
    <button type="button" class="btn btn-primary hidden transferencia-modal" data-bs-toggle="modal" data-bs-target="#transferencia"></button>
    <!-- Modal -->
    <div class="modal fade" id="transferencia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form id="transaccion">
                    <div class="modal-header">
                        <p class="modal-title h4" id="exampleModalLabel">Transferencia</p>
                    </div>
                    <div class="modal-body">
                        <div class="input-group align-items-center">
                            <small for="transferencia" class="pe-2" id="textoTransferencia"></small>
                            <input type="number" name="transferencia" class="form-control m-2" placeholder="$">
                        </div>
                        <div class="input-group align-items-center">
                            <small for="transferencia" class="pe-2" id="textoDestinatario"></small>
                            <input type="text" name="destinatario" class="form-control m-2" placeholder="CVU / nombre de usuario / mail">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Enviar</button>
                        <button type="button" id="volverAlHome" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>`
    main.appendChild(nuevoModal);         
    document.querySelector('#textoTransferencia').innerHTML = `Ingrese el valor de su transferencia:`;
    document.querySelector(`#textoDestinatario`).innerHTML = `Ingrese destinatario:`;
    document.querySelector(`.transferencia-modal`).click();
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    $(() => $('#volverAlHome').on('click', volverAHome));  
    // document.querySelector('#transaccion').addEventListener('submit', e =>{
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
    usuarioEnUso.movimientos.push(deposito);
    console.log(usuarioEnUso.movimientos);
    document.querySelector(`.operacion-realizada-modal`).click();
    document.querySelector('#textoOperacionRealizada').innerHTML = `¡Operación realizada con éxito!`;
    usuarioEnUso.saldo+= Number(dineroDeposito);
    localStorage.setItem('Usuarios', JSON.stringify(GestionUsuarios.usuarios));
    // document.querySelector('#transaccionRealizada').addEventListener('click', volverAHome);
    $(() => $('#transaccionRealizada').on('click', volverAHome));
}

const depositarDinero = () => {
    const saldoDisponible = document.querySelector('#saldoDisponible');
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    console.log(usuarioEnUso);
    console.log(`Depósito de dinero`);
    const main = document.querySelector(`main`);
    let nuevoModal = document.createElement(`div`);
    nuevoModal.innerHTML = `
    <!-- Botón Modal -->
    <button type="button" class="btn btn-primary hidden transferencia-modal" data-bs-toggle="modal" data-bs-target="#transferencia"></button>
    <!-- Modal -->
    <div class="modal fade" id="transferencia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form id="transaccion">
                    <div class="modal-header">
                        <p class="modal-title h4" id="exampleModalLabel">Transferencia</p>
                    </div>
                    <div class="modal-body">
                        <div class="input-group align-items-center">
                            <small for="transferencia" class="pe-2" id="textoTransferencia"></small>
                            <input type="number" name="transferencia" class="form-control m-2" placeholder="$">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Enviar</button>
                        <button type="button" id="volverAlHome" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>`
    main.appendChild(nuevoModal);  
    document.querySelector('#textoTransferencia').innerHTML = `Ingrese el valor de su depósito:`;
    document.querySelector(`.transferencia-modal`).click();
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    // document.querySelector('#transaccion').addEventListener('submit', depositarEnCuenta);
    // document.querySelector(`#volverAlHome`).addEventListener('click', volverAHome);
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

const mostrarNoHayMovimientos = usuarioEnUso => {
    const resumen = document.querySelector(`#ultimosMovimientos`);
    if(usuarioEnUso.movimientos.length == 0){
        let sinMovimientos = document.createElement(`p`);
        sinMovimientos.innerHTML = `No se registraron movimientos hasta el momento.`
        resumen.appendChild(sinMovimientos);
    }
}

const iniciar = () => {
    GestionUsuarios.iniciar();
    const usuarioEnUso = GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    saldoDisponible.innerHTML = `Saldo disponible: $${usuarioEnUso.saldo}`;
    console.log(usuarioEnUso.movimientos);
    mostrarNoHayMovimientos(usuarioEnUso);
    agregarMovimientos(usuarioEnUso);
    // document.querySelector(`#ingresoDinero`).addEventListener(`click`, depositarDinero);
    // document.querySelector(`#envioDinero`).addEventListener(`click`, transferirDinero);
    $(() => $('#ingresoDinero').on('click', depositarDinero));
    $(() => $('#envioDinero').on('click', transferirDinero));
}


// Este evento carga la información desde el localStorage
$(() => iniciar());
// window.addEventListener('load', iniciar);
