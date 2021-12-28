const URL_API_DOLARSI = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
const URL_API_DOLAR_ARGENTINA_EURO = "https://api-dolar-argentina.herokuapp.com/api/euro/nacion"
const URL_API_DOLAR_ARGENTINA_REAL = "https://api-dolar-argentina.herokuapp.com/api/real/nacion"


const servicioDolar = () => {
    let valorDolarOficialVariacion;
    let valorDolarOficialCompra;
    let valorDolarOficialVenta;
    let valorDolarBlueCompra;
    let valorDolarBlueVenta;
    let valorDolarBlueVariacion;
    let actualizacionDolar;

    $.get(URL_API_DOLARSI, (res) => {
        let resultado = [];

        console.log(res);
        res.map(p => resultado.push(p)); // arreglo temporal.
        // El valor de compra del dolar oficial es
        valorDolarOficialCompra = res[0].casa.compra;
        valorDolarOficialVenta = res[0].casa.venta;
        valorDolarOficialVariacion = res[0].casa.variacion;
        valorDolarBlueCompra = res[1].casa.compra;
        valorDolarBlueVenta = res[1].casa.venta;
        valorDolarBlueVariacion = res[1].casa.variacion;

        // Actualizo los valores de moneda
        document.getElementById("DolarOffCompra").textContent = valorDolarOficialCompra;
        document.getElementById("DolarOffVenta").textContent = valorDolarOficialVenta;
        document.getElementById("DolarOffVariacion").textContent = valorDolarOficialVariacion;

        document.getElementById("DolarBlueCompra").textContent = valorDolarBlueCompra;
        document.getElementById("DolarBlueVenta").textContent = valorDolarBlueVenta;
        document.getElementById("DolarBlueVariacion").textContent = valorDolarBlueVariacion;

        // Actualizo horario
        actualizacionDolar = formatDate(new Date());
        document.getElementById("actualizacionDolar").textContent = actualizacionDolar;

    });
}

const servicioEuro = () => {

    let valorEuroCompra;
    let valorEuroVenta;
    let actualizacionEuro;
    // Leo los valores del euro
    $.ajax({

        url: URL_API_DOLAR_ARGENTINA_EURO,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            let resultado = [];
            resultado.push(res);

            valorEuroCompra = res.compra;
            valorEuroVenta = res.venta;
            console.log(res);

            // Actualizo los valores de Euro
            document.getElementById("EuroCompra").textContent = String(valorEuroCompra);
            document.getElementById("EuroVenta").textContent = String(valorEuroVenta);
            // Actualizo horario
            actualizacionEuro = formatDate(new Date());
            document.getElementById("actualizacionEuro").textContent = actualizacionEuro;
        },
        // error: function() { console.log('Falla'); },
    });
}

const servicioReal = () => {

    let valorRealCompra;
    let valorRealVenta;
    let actualizacionReal;
    // Leo los valores del real
    $.ajax({

        url: URL_API_DOLAR_ARGENTINA_REAL,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            console.log("Success");
            let resultado = [];
            resultado.push(res); // arreglo temporal.

            valorRealCompra = res.compra;
            valorRealVenta = res.venta;
            console.log(res);
            // Actualizo los valores de Real
            document.getElementById("RealCompra").textContent = String(valorRealCompra);
            document.getElementById("RealVenta").textContent = String(valorRealVenta);
            // Actualizo horario
            actualizacionReal = formatDate(new Date());
            document.getElementById("actualizacionReal").textContent = actualizacionReal;
        },
        // error: function() { console.log('Falla'); },
    });


}