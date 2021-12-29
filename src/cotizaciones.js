$(() =>{
    const cotizacionDolarBlue = () => {
        fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
        .then(response => response.json())
        .then(datosDolar => {
            console.log(datosDolar);
            let dolarBlue = (Object.entries(datosDolar).find(dolarArray => dolarArray[1].casa.nombre == "Dolar Blue"));
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
        })
    }

    const cotizacionDolarOficial = () => {
        fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
        .then(response => response.json())
        .then(datosDolar => {
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
        })
    }

    const cotizacionEuro = () => {
        fetch(`https://api-dolar-argentina.herokuapp.com/api/euro/nacion`)
        .then(response => response.json())
        .then(datoseuro => {
            console.log(datoseuro);
            let euro = (Object.entries(datoseuro).find(euroArray => euroArray[1].casa.nombre == "euro"));
            console.log(euro);
            let euroCompra = euro[1].casa.compra;
            console.log(euroCompra);
            let euroVenta = euro[1].casa.venta;
            console.log(euroVenta);
            let euroVariacion = euro[1].casa.variacion;
            console.log(euroVariacion);
            document.querySelector("#EuroCompra").innerHTML = `$ ${euroCompra}`;
            document.querySelector("#EuroVenta").innerHTML = `$ ${euroVenta}`;
        })
    }

    cotizacionDolarOficial();
    cotizacionDolarBlue();
    // cotizacionEuro();
})