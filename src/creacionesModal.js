/**
 * Se encarga de crear un nuevo modal genérico
 * @returns {String} Devuelve el modal creado
 */
const crearNuevoModal = () => {
    let nuevoModal = document.createElement(`div`);
    nuevoModal.innerHTML = `
    <!-- Botón Modal -->
    <button type="button" class="btn btn-primary hidden operacion-modal" data-bs-toggle="modal" data-bs-target="#modal"></button>
    <!-- Modal -->
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="card card--modal m-auto">
                    <div class="card-header">
                        <h2 class="titulo-home m-auto" id="tituloModal"></h2>
                    </div>
                    <div class="card-body mt-3">
                        <form id="modalForm">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    return nuevoModal;
}

/**
 * Se encarga de crear el nuevo modal de transferencia
 */
const crearModalTransferencia = () => {
    const main = document.querySelector(`main`);
    const nuevoModal = crearNuevoModal();
    main.appendChild(nuevoModal);
    document.querySelector(`#modalForm`).innerHTML = `
    <div class="input-group">
        <span class="input-group-text"><ion-icon size="large" name="logo-usd"></ion-icon></span>
        <input type="number" for="modalForm" name="transferencia" class="form-control" placeholder="Ingrese el valor de su transferencia">
        <small class="col-12 mt-1"><p></p></small>
    </div>
    <div class="input-group">
        <span class="input-group-text"><ion-icon size="large" name="person-outline"></ion-icon></span>
        <input type="text" for="modalForm" name="destinatario" class="form-control" placeholder="Ingrese destinatario CVU / user / mail">
        <small class="col-12 mt-1"><p></p></small>
    </div> 
    <div class="modal-footer p-0">
        <button type="submit" class="btn btn-primary">Enviar</button>
        <button type="button" id="volverAlHome" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
    </div>`;
    document.querySelector(`#tituloModal`).innerHTML = `Transferencia`;         
    document.querySelector(`.operacion-modal`).click();
}

/**
 * Se encarga de crear el nuevo modal de depósito
 */
const crearModalDeposito = () => {
    const main = document.querySelector(`main`);
    let nuevoModal = crearNuevoModal();
    main.appendChild(nuevoModal);
    document.querySelector(`#modalForm`).innerHTML = 
    `<div class="input-group">
        <span class="input-group-text"><ion-icon size="large" name="logo-usd"></ion-icon></span>
        <input type="number" name="transferencia" class="form-control" placeholder="Ingrese el valor de su depósito">
        <small class="col-12 mt-1"><p></p></small>
    </div>
    <div class="modal-footer p-0">
        <button type="submit" class="btn btn-primary">Enviar</button>
        <button type="button" id="volverAlHome" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
    </div>`
    document.querySelector(`#tituloModal`).innerHTML = `Depósito`;  
    document.querySelector(`.operacion-modal`).click();
}

const crearModalDatosPersonales = () => {
    const main = document.querySelector(`main`);
    let nuevoModal = crearNuevoModal();
    main.appendChild(nuevoModal);
    document.querySelector(`#modalForm`).innerHTML = `
    <div class="input-group">
        <span class="input-group-text"><ion-icon size="large" name="person-outline"></ion-icon></span>
        <input id="nombreGuardado" type="text" name="nombreApellido" class="form-control" placeholder="Nombre y apellido">
        <small class="col-12 mt-1"><p></p></small>
    </div>
    <div class="input-group">
        <span class="input-group-text"><ion-icon size="large" name="arrow-forward-outline"></ion-icon></span>
        <input id="edadGuardada" type="number" name="edad" class="form-control" placeholder="Edad">
        <small class="col-12 mt-1"><p></p></small>
    </div> 
    <div class="input-group">
        <span class="input-group-text"><ion-icon size="large" name="arrow-forward-outline"></ion-icon></span>
        <input id="sueldoGuardado" type="number" name="sueldo" class="form-control" placeholder="Sueldo actual">
        <small class="col-12 mt-1"><p></p></small>
    </div> 
    <div class="d-flex justify-content-end pt-4 gap-3">
        <button id="cargarDatos" type="submit" class="btn btn-primary">Cargar datos</button>
        <button type="button" id="volverAlHome" class="btn btn-primary">Cerrar</button>
    </div>`;

    document.querySelector(`#tituloModal`).innerHTML = `Datos Personales`;  
    document.querySelector(`.operacion-modal`).click();
}