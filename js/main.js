const simuladorHomeBanking = () => {
    let eleccion;
    let usuario;
    let prestamo;
    let transferencia;
    let deposito;
    let usuarioActivo = false;
    let usuarioCreado = false;
    let volverAlInicio = true;
    let arrayOperaciones = [];

    mostrarMensajeBienvenida();
    while (volverAlInicio){
        do{
            mostrarMenuInicio();
            eleccion = solicitarEleccion();
            switch(eleccion){
                case (1):
                    usuario = crearUsuario();
                    usuarioCreado = true;
                    break;
                case (2):
                    if (usuarioCreado == true){
                        usuarioActivo = iniciarSesion(usuario);
                    }
                    else{
                        mostrarMensajePrimeraVisita();
                        usuario = crearUsuario(usuarioCreado);
                        usuarioCreado = true;
                    }
                    break;
                case (3):
                    mostrarMensajeDespedida();
                    volverAlInicio = false;
                    break;
                default:
                    mostrarMensajeEleccionErronea();
                    break;
            }
        } while (eleccion != 3 && usuarioActivo == false);
        if (usuarioActivo == true){
            mostrarMensajeInicioSesion();
            do{
                mostrarMenuCuenta();
                eleccion = solicitarEleccion();
                switch(eleccion){
                    case (1):
                        mostrarSaldoDisponible(usuario);
                        break;
                    case (2):
                        deposito = realizarDeposito();
                        usuario.saldoDisponible+= deposito.monto;
                        arrayOperaciones.push(deposito);
                        break;
                    case (3):
                        transferencia = realizarTransferencia(usuario);
                        usuario.saldoDisponible-= transferencia.monto;
                        arrayOperaciones.push(transferencia);
                        break;
                    case (4):
                        prestamo = solicitarPrestamo(usuario);
                        arrayOperaciones.push(prestamo);
                        break;
                    case (5):
                        mostrarMensajeCerrarSesion();
                        usuarioActivo = false;
                        break;
                    default:
                        mostrarMensajeEleccionErronea();
                        break;
                }
            } while (eleccion != 5);
        }
    }
    console.log(`Array de operaciones realizadas durante la sesión activa:`);
    console.log(arrayOperaciones);
}

simuladorHomeBanking();