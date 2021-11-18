class Usuario {
    constructor(){
        this.nombre;
        this.apellido;
        this.edad;
        this.salario;
        this.mail;
        this.contrasenia;
        this.esMayorDeEdad;
        this.esSalarioMinimoAceptado;
        this.saldoDisponible = 0;
    }

    // Se pide al usuario su nombre
    solicitarNombre(){
        let nombre = prompt(`Ingrese su nombre:`);
        let nombreValido = verificarContieneSoloLetras(nombre);
    
        this.nombre = nombreValido;
    }

    // Se pide al usuario su apellido
    solicitarApellido(){
        let apellido = prompt(`Ingrese su apellido:`);
        let apellidoValido = verificarContieneSoloLetras(apellido);
    
        this.apellido = apellidoValido;
    }

    // Se pide al usuario su dirección de correo electrónico
    solicitarMail(){
        let mail = prompt(`Ingrese su correo electrónico:`);
        let mailValido = verificarEsMailValido(mail);
    
        this.mail = mailValido;
    }

    // Se pide al usuario una contraseña para crear su cuenta
    solicitarContrasenia(){
        this.contrasenia = prompt(`Ingrese su contraseña: `);
    }

    // Se pide al usuario su edad actual
    solicitarEdad(){
        let edad = parseInt(prompt(`Ingrese su edad: `));
        let edadValida = verificarNumeroValido(edad);
    
        this.edad = edadValida;
    }

    // Se pide al usuario su salario mensual
    solicitarSalario(){
        let salario = Number(prompt(`Ingrese su salario mensual: `));
        let salarioValido = verificarNumeroValido(salario);
    
        this.salario = salarioValido;
    }

    // Verifica que el usuario sea mayor de edad, solamente en ese caso devolverá true
    comprobarEsMayorDeEdad(){
        if (this.edad >= edadMinima){
            this.esMayorDeEdad = true;
        }
    }

    // Verifica que el usuario posea el salario mínimo requerido, solamente en ese caso devolverá true
    comprobarSalarioMinimo(){
        if (this.salario >= salarioMinimo){
            this.esSalarioMinimoAceptado = true;
        }
    }

    // Muestra por consola todos los datos ingresados hasta el momento
    toString() {
        return `Datos ingresados:
        Nombre: ${this.nombre}
        Apellido: ${this.apellido}
        Salario: $${this.salario}
        Edad: ${this.edad} años
        Mail: ${this.mail}
        Contraseña: ${this.contrasenia}`
    }
}