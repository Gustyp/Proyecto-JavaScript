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
    static iniciar(){
        const datosAlmacenados = localStorage.getItem('Usuarios');
        const datosUsuarioActual = localStorage.getItem('Usuario-Actual');
        if(datosAlmacenados){
            GestionUsuarios.usuarios = JSON.parse(datosAlmacenados);
            console.log(`El array es: ${GestionUsuarios.usuarios}`);
            // Probando que se almacenaron los usuarios en el array correctamente
            GestionUsuarios.usuarios.forEach((Usuario) =>{
            console.log(Usuario)
            })
        }
        if(datosUsuarioActual){
            GestionUsuarios.usuarioActual = datosUsuarioActual;
            console.log(`El usuario actual es ${datosUsuarioActual}`);
        }
    }
    
    /**
     * Guarda usuario en el localStorage y lo mantiene actualizado
     * @param {Array} usuarios Array de los usuarios almacenados en el localStorage
     */
    static guardarUsuario(usuarios){
        localStorage.setItem('Usuarios', JSON.stringify(usuarios));
    };

    /**
     * Crea un cvu único para el usuario
     * @returns Devuelve el cvu creado
     */
    static crearCvu(){
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
     */
    static crearNuevoUsuario(nuevoUsuario, email, password, rePassword) {
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
        arrayValidaciones.push(primerValidacion, segundaValidacion, terceraValidacion, cuartaValidacion, quintaValidacion);
        const RegistroExitoso = arrayValidaciones.every(e => e);
        // console.log(arrayValidaciones);
        // console.log(RegistroExitoso);
        if (RegistroExitoso){
            const cvu = GestionUsuarios.crearCvu(); 
            const usuario = new Usuario(nuevoUsuario, email, password, cvu);
            GestionUsuarios.usuarios.push(usuario);
            GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);
            document.querySelector('.modal-usuario-creado').innerHTML = `Bienvenido/a ${nuevoUsuario}, esperamos poder brindarle la mejor experiencia.`;
            document.querySelector('.registro-modal').click();
            document.querySelector('.redireccion-index').addEventListener('click', () => {
            window.location ="login.html"; 
            });
        }
    }
}