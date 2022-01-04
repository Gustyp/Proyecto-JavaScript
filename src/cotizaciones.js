async function cotizacionDolar() {
    const response = await fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
    const datosDolar = await response.json()
    console.log(datosDolar);
    let dolarBlue = (Object.entries(datosDolar).find(dolarBlueArray => dolarBlueArray[1].casa.nombre == "Dolar Blue"));
    console.log(dolarBlue);
    let dolarBlueCompra = dolarBlue[1].casa.compra;
    console.log(dolarBlueCompra);
    let dolarBlueVenta = dolarBlue[1].casa.venta;
    console.log(dolarBlueVenta);
    let dolarBlueVariacion = dolarBlue[1].casa.variacion;
    console.log(dolarBlueVariacion);
    document.querySelector("#DolarBlueCompra").innerHTML = `$ ${dolarBlueCompra}`;
    document.querySelector("#DolarBlueVenta").innerHTML = `$ ${dolarBlueVenta}`;
    document.querySelector("#DolarBlueVariacion").innerHTML = `$ ${dolarBlueVariacion}`;

    console.log(datosDolar);
    let dolarOficial = (Object.entries(datosDolar).find(dolarArray => dolarArray[1].casa.nombre == "Dolar Oficial"));
    console.log(dolarOficial);
    let dolarOficialCompra = dolarOficial[1].casa.compra;
    console.log(dolarOficialCompra);
    let dolarOficialVenta = dolarOficial[1].casa.venta;
    console.log(dolarOficialVenta);
    let dolarOficialVariacion = dolarOficial[1].casa.variacion;
    console.log(dolarOficialVariacion);
    document.querySelector("#DolarOficialCompra").innerHTML = `$ ${dolarOficialCompra}`;
    document.querySelector("#DolarOficialVenta").innerHTML = `$ ${dolarOficialVenta}`;
    document.querySelector("#DolarOficialVariacion").innerHTML = `$ ${dolarOficialVariacion}`;
}

async function cotizacionEuro() {
    const response = await fetch(`https://www.dolarsi.com/api/api.php?type=euro`)
    const datosEuro = await response.json()
    console.log(datosEuro);
    let euro = (Object.entries(datosEuro).find(euroArray => euroArray[1].casa.nombre == "Banco Nación"));
    console.log(euro);
    let euroCompra = euro[1].casa.compra;
    console.log(euroCompra);
    let euroVenta = euro[1].casa.venta;
    console.log(euroVenta);
    document.querySelector("#EuroCompra").innerHTML = `$ ${euroCompra}`;
    document.querySelector("#EuroVenta").innerHTML = `$ ${euroVenta}`;
}

async function cotizacionReal() {
    const response = await fetch(`https://www.dolarsi.com/api/api.php?type=real`)
    const datosReal = await response.json()
    console.log(datosReal);
    let real = (Object.entries(datosReal).find(realArray => realArray[1].casa.nombre == "Banco Nación"));
    console.log(real);
    let realCompra = real[1].casa.compra;
    console.log(realCompra);
    let realVenta = real[1].casa.venta;
    console.log(realVenta);
    document.querySelector("#RealCompra").innerHTML = `$ ${realCompra}`;
    document.querySelector("#RealVenta").innerHTML = `$ ${realVenta}`;
}

cotizacionDolar();
cotizacionEuro();
cotizacionReal();