/**
 * Clase para validar los diferentes datos para realizar las diferentes operaciones
 */
class ValidacionOperacion{
    /**
     * Se encarga de verificar que el monto ingresado sea válido
     * @param {Number} monto Monto de la operación a realizarse
     * @returns {Boolean} Devuelve true en caso de que el valor ingresado sea mayor a 0 y no se encuentre vacío, en caso contrario devolverá false
     */
    static esMontoValido = monto => {
        if (monto <= 0 || monto == ``){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Has ingresado un monto inválido.',
            })
            return false;
        }
        return true;
    }

    static esEdadValida = edad => {
        if (edad <= 0 || edad == ``){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Has ingresado una edad inválida.',
            })
            return false;
        }
        return true;
    }

    static esMayorDeEdad = edad => {
        if (edad < 18){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No eres mayor de 18 años, no puede solicitar nuestra tarjeta.',
            })
            return false;
        }
        return true;
    };

    static esNombreCompleto = (nombre, apellido) => {
        if (nombre == undefined || apellido == undefined){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debes ingresar tu nombre completo.',
            })
            return false;
        }
        return true;
    }

    /**
     * Se encarga de verificar que la cantidad de cuotas ingresadas sea válida
     * @param {Number} cuotas Cantidad de cuotas en las que se solicita el préstamo
     * @returns Devuelve true en caso de que el valor ingresado sea mayor a 0, en caso contrario devolverá false
     */
    static sonCuotasValidas = cuotas => {
        if (cuotas <= 0){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Has ingresado un número de cuotas inválido.',
            })
            return false;
        }
        return true;
    }

    /**
     * Se encarga de verificar que la solicut de préstamo sea válida
     * @param {Number} montoPrestamo Monto del préstamo a solicitar
     * @param {Number} cantidadCuotas Cantidad de cuotas del préstamo a solicitar
     * @returns 
     */
    static verificarPrestamoValido = (montoPrestamo, cantidadCuotas) => this.esMontoValido(montoPrestamo) && this.sonCuotasValidas(cantidadCuotas);

    /**
     * Se encarga de verificar que la solicitud de depósito sea válida
     * @param {Number} dineroDeposito Monto del depósito a realizarse
     * @returns {Boolean} Devuelve true solamente en caso de que el depósito sea válido
     */
    static esDepositoValido = dineroDeposito => this.esMontoValido(dineroDeposito);

    /**
     * Se encarga de verificar que el destinatario exista
     * @param {String} destinatario Identificatorio del usuario al que se le enviará el dinero 
     * @returns Devuelve el usuario encontrado en caso de que se encuentre similitud a una cuenta creada, de lo contrario devolverá false
     */
    static existeUsuario = destinatario => {
        const arrayUsuarioExistente = [];
        const existeUsuarioNombre = GestionUsuarios.usuarios.find(usuario => usuario.usuario == destinatario);
        const existeUsuarioMail = GestionUsuarios.usuarios.find(usuario => usuario.mail == destinatario)
        const existeUsuarioCvu = GestionUsuarios.usuarios.find(usuario => usuario.cvu == destinatario)
        arrayUsuarioExistente.push(existeUsuarioNombre, existeUsuarioMail, existeUsuarioCvu);
        const noExisteUsuario = arrayUsuarioExistente.every(e => e == undefined);
        if (noExisteUsuario){
            Swal.fire(
                '¡Error!',
                'Usuario inexistente.',
                'question'
            )
            return false;
        }
        const filterUsuarioEncontrado = arrayUsuarioExistente.filter(e => e);
        const usuarioEncontrado = filterUsuarioEncontrado[0];
        return usuarioEncontrado;
    }

    static sonDatosValidos = (nombre, apellido, edad, sueldo) => {
        if (!this.esNombreCompleto(nombre, apellido)){   
            return false;
        }
        if (!this.esEdadValida(edad) || !this.esMontoValido(sueldo)){
            return false;
        }
        return true;
    }

    /**
     * Se encarga de verificar si el usuario al que se envia la transferencia existe y si el monto a enviar es válido
     * @param {String} destinatario Identificatorio del usuario al que se le enviará el dinero 
     * @param {Number} dineroTransferencia Monto de la transferencia a realizarse
     * @returns {Boolean} Devuelve true en caso de que el usuario exista y el monto sea válido, en caso contrario devolverá false
     */
    static esUsuarioValido = (destinatario, dineroTransferencia) => {
        const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
        const usuarioExistente = this.existeUsuario(destinatario);
        const montoAceptado = this.esMontoValido(dineroTransferencia);
        if (usuarioExistente && montoAceptado){
            if (GestionUsuarios.usuarioActual == usuarioExistente){
                Swal.fire({
                    title: '¿Estás bien?',
                    text: "¡Es imposible enviarte una transferencia a ti mismo!",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                });
                return false;
            }
            const transferenciaRecibida = crearTransferenciaRecibida(dineroTransferencia, usuarioEnUso.usuario);
            usuarioExistente.movimientos.unshift(transferenciaRecibida);
            GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
            return true;
        }
        return false;
    }
}