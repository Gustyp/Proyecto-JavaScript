class Transferencia {
    constructor(){
        this.monto = 0;
        this.mail;
        this.cvu;
    }

    // Se pide al usuario el monto que desea enviar
    solicitarMontoAEnviar(){
        let monto = Number(prompt("Ingrese el monto a enviar:"));
        let montoValido = verificarNumeroValido(monto);

        this.monto = montoValido;
    }

    // Se pide al usuario la dirección de correo electrónico del destinatario
    solicitarMail(){
        let mail = prompt(`Ingrese su correo electrónico:`);
        let mailValido = verificarEsMailValido(mail);
    
        this.mail = mailValido;
    }

    solicitarCvu(){
        let cvu = Number(prompt("Ingrese el CVU del destinatario:"));
        let cvuValido = verificarNumeroValido(cvu);

        this.cvu = cvuValido;
    }

    // Muestra por consola todos los datos ingresados hasta el momento
    toString() {
        return `Datos ingresados:
    Se le enviará una transferencia con un monto de $${this.monto} a la cuenta con cvu correspondiente: ${this.cvu}.
    El destinatario será notificado al siguiente correo electrónico: ${this.mail}.`
    }
}