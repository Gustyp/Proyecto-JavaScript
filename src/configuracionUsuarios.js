/**
 * Clase para crear a los distintos usuarios
 */
class Usuario{
    /**
     * 
     * @param {String} usuario Nombre de usuario
     * @param {String} email Correo electrónico del usuario
     * @param {String} password Contraseña del usuario
     * @param {String} cvu Clave virtual uniforme que se le otorga al usuario al crear una cuenta con éxito
     */
    constructor(usuario, email, password, cvu){
        this.usuario = usuario;
        this.mail = email;
        this.password = password;
        this.saldo = Number(Math.round(Math.random()*99999));
        this.prestamoSolicitado = false;
        this.cvu = cvu;
        this.movimientos = [];
    }
}

// Clase para la gestión de las cuentas de usuario
class GestionUsuarios{
    /** 
     * Array de usuarios 
     * @type {Array}
    */
    static usuarios = [];
    
    /**
     * Variable que contiene el usuario actual 
     * @type {object}
     */
    static usuarioActual;

    /**
     * Se encarga de cargar la data del localStorage
     */
    static iniciar = () => {
        const datosAlmacenados = localStorage.getItem('Usuarios');
        const datosUsuarioActual = localStorage.getItem('Usuario-Actual');
        if(datosAlmacenados){
            GestionUsuarios.usuarios = JSON.parse(datosAlmacenados);
        }
        if(datosUsuarioActual){
            GestionUsuarios.usuarioActual = datosUsuarioActual;
        }
    }

    /**
     * Se encarga de encontrar al usuario actual que tiene la sesión iniciada
     * @returns Devuelve el usuario de la sesión actual
     */
    static detectarUsuarioActual = () => GestionUsuarios.usuarios.find(usuario => GestionUsuarios.usuarioActual == usuario.usuario);
    
    /**
     * Guarda usuario en el localStorage y lo mantiene actualizado
     * @param {Array} usuarios Array de los usuarios almacenados en el localStorage
     */
    static guardarUsuario = usuarios => localStorage.setItem('Usuarios', JSON.stringify(usuarios));

    /**
     * Crea un cvu único para el usuario
     * @returns Devuelve el cvu creado
     */
    static crearCvu = () => {
        const primeraParteCVU = Math.round(Math.random()*99999999999);
        const segundaParteCVU = Math.round(Math.random()*99999999999);
        const cvuCompleto = primeraParteCVU.toString() + segundaParteCVU.toString();
        return cvuCompleto;
    }

    /**
     * 
     * @param {String} nuevoUsuario Nombre de usuario a ser creado
     * @param {String} email Mail del usuario a ser creado
     * @param {String} password Contraseña del usuario a ser creado
     * @param {String} rePassword Confirmación de la contraseña del usuario a ser creado
     * @param {Boolean} checkbox Valor del checkbox del formulario
     */
    static crearNuevoUsuario = (nuevoUsuario, email, password, rePassword, checkbox) => {
        const minCaracteresUsuario = 3;
        const maxCaracteresUsuario = 15;
        const minCaracteresContrasenia = 8;
        const maxCaracteresContrasenia = 25;
        const arrayValidaciones = [];
        const primerValidacion = ValidacionUsuario.verificarLongitud(nuevoUsuario, minCaracteresUsuario, maxCaracteresUsuario, password, minCaracteresContrasenia, maxCaracteresContrasenia);
        const segundaValidacion = ValidacionUsuario.verificarEmail(email);
        const terceraValidacion = ValidacionUsuario.verificarContraseniasCoinciden(password, rePassword);
        const cuartaValidacion = ValidacionUsuario.esEmailUnico(email);
        const quintaValidacion = ValidacionUsuario.esUsuarioUnico(nuevoUsuario);
        const sextaValidacion = ValidacionUsuario.aceptaBasesYCondiciones(checkbox);
        arrayValidaciones.push(primerValidacion, segundaValidacion, terceraValidacion, cuartaValidacion, quintaValidacion, sextaValidacion);
        const RegistroExitoso = arrayValidaciones.every(e => e);
        // console.log(arrayValidaciones);
        // console.log(RegistroExitoso);
        if (RegistroExitoso){
            const cvu = GestionUsuarios.crearCvu(); 
            const usuario = new Usuario(nuevoUsuario, email, password, cvu);
            GestionUsuarios.usuarios.push(usuario);
            GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
            Swal.fire({
                title: '¡Felicitaciones!',
                text: `Bienvenido/a ${nuevoUsuario}, esperamos poder brindarle la mejor experiencia.`,
                imageUrl: '../assets/images/shaking-hands.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Two people shaking hands',
                heightAuto: false,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location ="login.html"; 
                }
            })
        }
    }
}