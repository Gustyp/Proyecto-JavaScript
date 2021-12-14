/**
 * Clase que simuula un depósito en la cuenta del usuario
 */
class Deposito{
    /**
     * 
     * @param {Number} monto Monto que se depositará en la cuenta del usuario
     * @param {String} tipo Tipo de operación que ha realizado el usuario
     */
    constructor(monto, tipo){
        this.monto = monto;
        this.tipo = tipo;
        this.descripcion = `- Se ha depositado $${this.monto} en su cuenta.`
    }
}

/**
 * Clase que simula una transferencia desde la cuenta del usuario a algún usuario registrado
 */
class Transferencia{
    /**
     * 
     * @param {Number} monto Monto que se transferirá de la cuenta del usuario
     * @param {String} tipo Tipo de operación que ha realizado el usuario
     * @param {String} destinatario Destinatario de la cuenta a la cuál se realiza la transferencia
     */
    constructor(monto, tipo, destinatario){
        this.monto = monto;
        this.tipo = tipo;
        this.destinatario = destinatario;
        this.descripcion = `- Se ha transferido $${this.monto} de su cuenta a : ${this.destinatario}`
    }
}

/**
 * 
 * @param {Number} monto Monto del depósito
 * @returns {Object} Devuelve el depósito creado
 */
const crearDeposito = (monto) => {
    const tipo = `Depósito`
    const deposito = new Deposito(monto, tipo);
    return deposito;
}

/**
 * 
 * @param {Number} monto Monto de la transferencia 
 * @returns {Object} Devuelve la transferencia creada
 */
const crearTransferencia = (monto) => {
    const tipo = `Transferencia`;
    const transferencia = new Transferencia(monto, tipo);
    return transferencia;
}