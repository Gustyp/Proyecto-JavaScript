const crearNuevoModal = () => {
    let nuevoModal = document.createElement(`div`);
    nuevoModal.innerHTML = `
    <!-- Botón Modal -->
    <button type="button" class="btn btn-primary hidden operacion-modal" data-bs-toggle="modal" data-bs-target="#transferencia"></button>
    <!-- Modal -->
    <div class="modal fade" id="transferencia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form id="transaccion">
                    <div class="modal-header">
                        <p class="modal-title h4" id="tituloModal"></p>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Enviar</button>
                        <button type="button" id="volverAlHome" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>`
    return nuevoModal;
}

const crearModalTransferencia = () => {
    const main = document.querySelector(`main`);
    const nuevoModal = crearNuevoModal();
    main.appendChild(nuevoModal);
    document.querySelector(`.modal-body`).innerHTML = 
    `<div class="input-group align-items-center">
        <small for="transferencia" class="pe-2" id="textoTransferencia"></small>
        <input type="number" name="transferencia" class="form-control m-2" placeholder="$">
    </div>
    <div class="input-group align-items-center">
        <small for="transferencia" class="pe-2" id="textoDestinatario"></small>
        <input type="text" name="destinatario" class="form-control m-2" placeholder="CVU / nombre de usuario / mail">
    </div>`
    document.querySelector(`#tituloModal`).innerHTML = `Transferencia`;         
    document.querySelector('#textoTransferencia').innerHTML = `Ingrese el valor de su transferencia:`;
    document.querySelector(`#textoDestinatario`).innerHTML = `Ingrese destinatario:`;
    document.querySelector(`.operacion-modal`).click();
}

const crearModalDeposito = () => {
    const main = document.querySelector(`main`);
    let nuevoModal = crearNuevoModal();
    main.appendChild(nuevoModal);
    document.querySelector(`.modal-body`).innerHTML = 
    `<div class="input-group align-items-center">
        <small for="transferencia" class="pe-2" id="textoTransferencia"></small>
        <input type="number" name="transferencia" class="form-control m-2" placeholder="$">
    </div>`  
    document.querySelector('#textoTransferencia').innerHTML = `Ingrese el valor de su depósito:`;
    document.querySelector(`.operacion-modal`).click();
}