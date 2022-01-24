/**
 * Se encarga de obtener los datos de la cotización del dólar oficial y dólar blue
 */
async function cotizacionDolar() {
    const response = await fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
    const datosDolar = await response.json()
    let dolarBlue = (Object.entries(datosDolar).find(dolarBlueArray => dolarBlueArray[1].casa.nombre == "Dolar Blue"));
    let dolarBlueCompra = dolarBlue[1].casa.compra;
    let dolarBlueVenta = dolarBlue[1].casa.venta;
    let dolarBlueVariacion = dolarBlue[1].casa.variacion;
    document.querySelector("#DolarBlueCompra").innerHTML = `$ ${dolarBlueCompra}`;
    document.querySelector("#DolarBlueVenta").innerHTML = `$ ${dolarBlueVenta}`;
    document.querySelector("#DolarBlueVariacion").innerHTML = `$ ${dolarBlueVariacion}`;

    console.log(datosDolar);
    let dolarOficial = (Object.entries(datosDolar).find(dolarArray => dolarArray[1].casa.nombre == "Dolar Oficial"));
    let dolarOficialCompra = dolarOficial[1].casa.compra;
    let dolarOficialVenta = dolarOficial[1].casa.venta;
    let dolarOficialVariacion = dolarOficial[1].casa.variacion;
    document.querySelector("#DolarOficialCompra").innerHTML = `$ ${dolarOficialCompra}`;
    document.querySelector("#DolarOficialVenta").innerHTML = `$ ${dolarOficialVenta}`;
    document.querySelector("#DolarOficialVariacion").innerHTML = `$ ${dolarOficialVariacion}`;
}

/**
 * Se encarga de obtener los datos de la cotización del euro
 */
async function cotizacionEuro() {
    const response = await fetch(`https://www.dolarsi.com/api/api.php?type=euro`)
    const datosEuro = await response.json()
    let euro = (Object.entries(datosEuro).find(euroArray => euroArray[1].casa.nombre == "Banco Nación"));
    let euroCompra = euro[1].casa.compra;
    let euroVenta = euro[1].casa.venta;
    document.querySelector("#EuroCompra").innerHTML = `$ ${euroCompra}`;
    document.querySelector("#EuroVenta").innerHTML = `$ ${euroVenta}`;
}

/**
 * Se encarga de obtener los datos de la cotización del real
 */
async function cotizacionReal() {
    const response = await fetch(`https://www.dolarsi.com/api/api.php?type=real`)
    const datosReal = await response.json()
    let real = (Object.entries(datosReal).find(realArray => realArray[1].casa.nombre == "Banco Nación"));
    let realCompra = real[1].casa.compra;
    let realVenta = real[1].casa.venta;
    document.querySelector("#RealCompra").innerHTML = `$ ${realCompra}`;
    document.querySelector("#RealVenta").innerHTML = `$ ${realVenta}`;
}

/**
 * Se encarga de cargar los datos de la última actualización hecha sobre las cotizaciones
 */
const cargarHoraActual = () => {
    const fecha = new Date();
    const fechaActual = fecha.toLocaleDateString();
    const horaActual = fecha.toLocaleTimeString();
    const ultimaActualizacionDolar = document.querySelector(`#ultimaActualizacionDolar`);
    const ultimaActualizacionEuro = document.querySelector(`#ultimaActualizacionEuro`);
    const ultimaActualizacionReal = document.querySelector(`#ultimaActualizacionReal`);
    ultimaActualizacionDolar.innerHTML = `${horaActual}`;
    ultimaActualizacionEuro.innerHTML = `${horaActual}`;
    ultimaActualizacionReal.innerHTML = `${horaActual}`;
}

$(() =>{
    cargarHoraActual();
    cotizacionDolar();
    cotizacionEuro();
    cotizacionReal();
})