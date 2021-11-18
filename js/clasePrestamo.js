class Prestamo {
    constructor(){
        this.montoInicial = 0;
        this.cuotas = 0;
        this.interes = 0;
        this.montoFinal = 0;
    }

    // Muestra por consola las cuotas disponibles al usuario
    ofrecerCuotas(){
        console.log(interesPorCuotas);
    }

    // Establece el monto final del préstamo a devolver
    establecerMontoFinal() {
        this.montoFinal = (this.montoInicial + this.montoInicial * this.interes / 100);
    }

    // Establece el porcentaje de interés que el usuario ha elegido
    establecerPorcentajeInteres(){
        switch (this.cuotas){
            case (1):
                this.interes = 7;
                break;
            case (3):
                this.interes = 15;
                break;
            case (6):
                this.interes = 22;
                break;
            case (9):
                this.interes = 35;
                break;
            case (12):
                this.interes = 46;
        }
    }

    // Se pide al usuario el monto pretendido de su préstamo
    solicitarMonto(){
        let monto = Number(prompt("Ingrese el monto de su préstamo:"));
        let montoValido = verificarNumeroValido(monto);
    
        this.montoInicial = montoValido;
    }

    // Se pide al usuario la cantidad de cuotas en las que desea pagar el préstamo solicitado
    solicitarCantidadCuotas(){
        let cuotas = parseInt(prompt(`¿En cuántas cuotas desea el préstamo?`));
        let cuotasValidas = verificarCuotasvalidas(cuotas);
    
        this.cuotas = cuotasValidas;
    }

    // Muestra por consola los datos finales del prétamo solicitado
    toString() {
        return `Usted ha solicitado un préstamo de $${this.montoInicial}.\nDeberá devolverlo en ${this.cuotas} cuotas con un interés del ${this.interes}%.\nEl monto total a devolver será de $${this.montoFinal}\n`
    }
}