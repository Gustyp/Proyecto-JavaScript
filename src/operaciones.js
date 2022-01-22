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
        this.descripcion = `- Se ha transferido $${this.monto} de su cuenta a : ${this.destinatario}.`
    }
}

/**
 * Clase que simula una transferencia recibida
 */
class TransferenciaRecibida{
    /**
     * 
     * @param {Number} monto Monto que se transferirá de la cuenta del usuario
     * @param {String} tipo Tipo de operación que ha realizado el usuario
     * @param {String} remitente Remitente de la cuenta desde la cuál se realiza la transferencia
     */
    constructor(monto, tipo, remitente){
        this.monto = monto;
        this.tipo = tipo;
        this.remitente = remitente;
        this.descripcion = `- Ha recibido $${this.monto} en su cuenta desde: ${this.remitente}.`
    }
}

/**
 * Clase que simuula una solicitud de préstamo en la cuenta del usuario
 */
class Prestamo{
    /**
     * 
     * @param {Number} monto Monto solicitado en el préstamo
     * @param {String} tipo Tipo de operación que ha realizado el usuario
     * @param {Number} cuotas Cantidad de cuotas solicitadas en el préstamo
     */
    constructor(monto, tipo, cuotas){
        this.monto = monto;
        this.tipo = tipo;
        this.cuotas = cuotas;
        this.descripcion = `- Se ha solicitado un préstamo de $${this.monto} a devolver en ${this.cuotas} cuotas.`
    }
}


/**
 * 
 * @param {Number} monto Monto del depósito
 * @returns {Object} Devuelve el depósito creado
 */
const crearDeposito = monto => {
    const tipo = `Depósito`
    const deposito = new Deposito(monto, tipo);
    return deposito;
}

/**
 * 
 * @param {Number} monto Monto de la transferencia 
 * @returns {Object} Devuelve la transferencia creada
 */
const crearTransferencia = (monto, destinatario) => {
    const tipo = `Transferencia`;
    const transferencia = new Transferencia(monto, tipo, destinatario);
    return transferencia;
}

/**
 * 
 * @param {Number} monto Monto de la transferencia
 * @param {String} remitente Remitente quién envia la transferencia
 * @returns {Object} Devuelve la transferencia recibida creada
 */
const crearTransferenciaRecibida = (monto, remitente) => {
    const tipo = `Transferencia recibida`;
    const transferencia = new TransferenciaRecibida(monto, tipo, remitente);
    return transferencia;
}

const crearPrestamo = (monto, cuotas) => {
    const tipo = `Préstamo`;
    const prestamo = new Prestamo(monto, tipo, cuotas);
    return prestamo;
}