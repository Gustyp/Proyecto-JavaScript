class Deposito {
    constructor(){
        this.monto;
    }

    // Se pide al usuario el monto que desea depositar
    solicitarMontoADepositar(){
        let monto = Number(prompt("Ingrese el monto a depositar:"));
        let montoValido = verificarNumeroValido(monto);
        this.monto = montoValido;
    }

    // Muestra por consola todos los datos ingresados hasta el momento
    toString() {
        return `Datos ingresados:
    Se ha realizado un depósito de $${this.monto} a su cuenta.`
    }
}