// Simula el depósito de dinero en la cuenta del usuario
const realizarDeposito = () => {
    console.log(`A continuación se le pedirá el monto que desea depositar en su cuenta:`);
    const deposito1 = new Deposito();
    deposito1.solicitarMontoADepositar();
    console.log(deposito1.toString());
    return deposito1;
}

// Simula la transferencia de dinero siempre y cuando sea menor al que posea disponible en el momento el usuario
const realizarTransferencia = usuario => {
    const transferencia1 = new Transferencia();
    if (usuario.saldoDisponible > 0){
        console.log(`A continuación se le pedirán los datos necesarios para realizar la transferencia.`);
        transferencia1.solicitarMontoAEnviar();
        if (usuario.saldoDisponible >= transferencia1.monto){
            transferencia1.solicitarMail();
            transferencia1.solicitarCvu();
            console.log(transferencia1.toString());
        }
        else{
            console.log(`Lo siento, pero no tiene saldo suficiente para realizar esta operación.`);
            transferencia1.monto = 0;
        }
    }
    else{
        console.log(`Lo siento, pero no tiene saldo suficiente para realizar esta operación.`);
    }
    return transferencia1;
}

// Simula la solicitud de un préstamo en caso de que cumpla con las condiciones necesarias
const solicitarPrestamo = usuario => {
    const prestamo1 = new Prestamo();
    if (usuario.esMayorDeEdad && usuario.esSalarioMinimoAceptado){
        console.log(`A continuación se te pedirán los datos para solicitar el préstamo deseado.`);
        prestamo1.solicitarMonto();
        prestamo1.ofrecerCuotas();
        prestamo1.solicitarCantidadCuotas();
        prestamo1.establecerPorcentajeInteres();
        prestamo1.establecerMontoFinal();
        console.log(prestamo1.toString());

    }
    else{
        console.log(`Lo sentimos, debes ser mayor de edad para solicitar un préstamo y un salario mínimo de $${salarioMinimo}.`);
    }
    return prestamo1;
}

// Se encarga de crear un usuario solicitando todos los datos requeridos para la cuenta
const crearUsuario = () => {
    console.log(`Procederemos a crear un usuario nuevo, por favor recuerde que debe ser mayor de 18 años.`);
    const usuario1 = new Usuario();

    usuario1.solicitarNombre();
    usuario1.solicitarApellido();
    usuario1.solicitarEdad();
    usuario1.solicitarSalario();
    usuario1.solicitarMail();
    usuario1.solicitarContrasenia();
    usuario1.comprobarEsMayorDeEdad();
    usuario1.comprobarSalarioMinimo();
    console.log(usuario1.toString());

    return usuario1;
}

// Inicia la sesión solicitando un usuario y contraseña que hayan sido creados previamente
const iniciarSesion = usuario => {
    console.log('Ahora puedes iniciar sesión.\nIngresa tu mail y contraseña:');
    let mailIngresado = prompt(`Aquí ingresa tu mail: `);
    let mailAComparar = verificarEsMailValido(mailIngresado);
    let contraseniaAComparar = prompt(`Aquí ingresa tu contraseña: `);
    if (mailAComparar == usuario.mail && contraseniaAComparar == usuario.contrasenia){
        console.log(`¡Bienvenido! ¡Has ingresado a tu cuenta!`);
        return true;
    }
    else{
        console.log(`Mail o contraseña incorrecta.`);
        return false;
    }
}

// Se le solicita al usuario que ingrese una elección para interactuar con el menu mostrado por consola
const solicitarEleccion = () => {
    eleccion = Number(prompt(`Ingrese la opción correspondiente: `));
    console.log(`Opción elegida: ${eleccion}`);
    return eleccion;
}