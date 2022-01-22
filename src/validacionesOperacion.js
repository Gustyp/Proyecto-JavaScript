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
            console.log(`Ha ingresado un monto inválido.`);
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
            console.log(`Ha ingresado un número de cuotas inválido.`);
            return false;
        }
        return true;
    }

    /**
     * Se encarga de verificar que la solicitud de depósito sea válida
     * @param {Number} dineroDeposito Monto del depósito a realizarse
     * @returns {Boolean} Devuelve true solamente en caso de que el depósito sea válido
     */
    static esDepositoValido = dineroDeposito => ValidacionOperacion.esMontoValido(dineroDeposito);

    /**
     * Se encarga de verificar que el destinatario exista
     * @param {String} destinatario Identificatorio del usuario al que se le enviará el dinero 
     * @returns Devuelve el usuario encontrado en caso de que se encuentre similitud a una cuenta creada, de lo contrario devolverá false
     */
    static existeUsuario = destinatario => {
        arrayUsuarioExistente = [];
        const existeUsuarioNombre = GestionUsuarios.usuarios.find(usuario => usuario.usuario == destinatario);
        const existeUsuarioMail = GestionUsuarios.usuarios.find(usuario => usuario.mail == destinatario)
        const existeUsuarioCvu = GestionUsuarios.usuarios.find(usuario => usuario.cvu == destinatario)
        arrayUsuarioExistente.push(existeUsuarioNombre, existeUsuarioMail, existeUsuarioCvu);
        console.log(arrayUsuarioExistente);
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
        console.log(`El usuario encontrado es: `);
        console.log(usuarioEncontrado.usuario);
        return usuarioEncontrado;
    }

    /**
     * Se encarga de verificar si el usuario al que se envia la transferencia existe y si el monto a enviar es válido
     * @param {String} destinatario Identificatorio del usuario al que se le enviará el dinero 
     * @param {Number} dineroTransferencia Monto de la transferencia a realizarse
     * @returns {Boolean} Devuelve true en caso de que el usuario exista y el monto sea válido, en caso contrario devolverá false
     */
    static esUsuarioValido = (destinatario, dineroTransferencia) => {
        const usuarioEnUso = GestionUsuarios.detectarUsuarioActual();
        const usuarioExistente = ValidacionOperacion.existeUsuario(destinatario);
        const montoAceptado = ValidacionOperacion.esMontoValido(dineroTransferencia);
        if (usuarioExistente && montoAceptado){
            if (GestionUsuarios.usuarioActual == usuarioExistente){
                console.log(`Soy yo mismo`);
                Swal.fire({
                    title: '¿Estás bien?',
                    text: "¡Es imposible enviarte una transferencia a ti mismo!",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                });
                return false;
            }
            console.log(`Arriba lee.`);
            const transferenciaRecibida = crearTransferenciaRecibida(dineroTransferencia, usuarioEnUso.usuario);
            console.log(`La transferencia que recibirá ${usuarioExistente.usuario} es de $${dineroTransferencia}`);
            console.log(dineroTransferencia);
            usuarioExistente.movimientos.unshift(transferenciaRecibida);
            GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
            return true;
        }
        return false;
    }
}