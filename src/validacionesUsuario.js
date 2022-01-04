/**
 * Clase para validar los diferentes datos para crear un usuario válido
 */
class ValidacionUsuario{
    /**
     * Se encarga de mostrar el error al cambiar la visibilidad de la clase
     * @param {String} input 
     * @param {String} mensaje Mensaje que informa acerca del error ocurrido
     * @returns 
     */
    static mostrarError(input, mensaje){
        const formControl = input.parentElement;
        formControl.className = "input-group mb-3 error";
        const small = formControl.querySelector('small');
        small.innerText = mensaje;
        return false;
    }

    /**
     * Se encarga de mostrar el error al cambiar la visibilidad de la clase
     * @param {String} input 
     */
    static ocultarError(input){
        const formControl = input.parentElement;
        formControl.className = "input-group mb-3";
        const small = formControl.querySelector('small');
        small.innerText = "";
    }

    /**
     * Se encarga de buscar en el localStorage si el mail ya se encuentra almacenado
     * @param {String} mail Mail del usuario que está por ser creado
     * @returns {Boolean} Se encarga de devolver false si encuentra coincidencia, o true si es un mail sin registrar
     */
    static esEmailUnico(mail){
        const rechazoRegistro = document.querySelector('#modalRegistroRechazado');
        const rechazoModal = document.querySelector('.modal-rechazo');
        if (GestionUsuarios.usuarios.find(usuario => mail == usuario.mail)){
            rechazoRegistro.innerHTML = 'El mail ya existe.';
            rechazoModal.click();
            return false; 
        }
        return true;
    }

    /**
     * Se encarga de buscar en el localStorage si el usuario ya se encuentra almacenado
     * @param {String} nuevoUsuario Nombre de usuario del usuario que está por ser creado
     * @returns Devuelve false si encuentra coincidencia, o true si es un nombre de usuario sin registrar
     */
    static esUsuarioUnico(nuevoUsuario){
        const rechazoRegistro = document.querySelector('#modalRegistroRechazado');
        const rechazoModal = document.querySelector('.modal-rechazo');
        if(GestionUsuarios.usuarios.find(usuario => nuevoUsuario == usuario.usuario)){
            rechazoRegistro.innerHTML = `El usuario ya existe.`;
            rechazoModal.click();
            return false;
        }
        return true;
    }

    /**
     * Se encarga de verificar la longitud de los datos ingresados por el usuario
     * @param {String} nuevoUsuario Nombre de usuario del usuario que está por ser creado
     * @param {Number} minUsuario Cantidad mínima de carácteres permitidos al momento de crear el nombre de usuario
     * @param {Number} maxUsuario Cantidad máxima de carácteres permitidos al momento de crear el nombre de usuario
     * @param {String} password Contraseña elegida por el usuario para su nueva cuenta
     * @param {Number} minContrasenia Cantidad mínima de carácteres permitidos al momento de crear la contraseña
     * @param {Number} maxContrasenia Cantidad mádxima de carácteres permitidos al momento de crear la contraseña
     * @returns Devuelve false en caso de que alguno de los datos ingresados no cumpla con el márgen de carácteres permitidos, en caso de que esté todo ok devolverá true
     */
    static verificarLongitud(nuevoUsuario, minUsuario, maxUsuario, password, minContrasenia, maxContrasenia){
        const formulario = document.querySelector("#registerForm");
        const formControlUsuario = formulario.registerUser;
        const formControlPassword = formulario.registerPassword;
        if (nuevoUsuario.length < minUsuario) {
            ValidacionUsuario.mostrarError(formControlUsuario, `Debe tener almenos ${minUsuario} carácteres`);
            return false;
        }
        else if (nuevoUsuario.length > maxUsuario) {
            ValidacionUsuario.mostrarError(formControlUsuario, `Deber tener un máximo de ${maxUsuario} carácteres`);
            return false;
        }
        else{
            ValidacionUsuario.ocultarError(formControlUsuario);
        }
        if (password.length < minContrasenia) {
            ValidacionUsuario.mostrarError(formControlPassword, `Debe tener almenos ${minContrasenia} carácteres`);
            return false;
        } 
        else if (password.length > maxContrasenia) {
            ValidacionUsuario.mostrarError(formControlPassword, `Deber tener un máximo de ${maxContrasenia} carácteres`);
            return false;
        }
        else{
            ValidacionUsuario.ocultarError(formControlPassword);
        }
        return true;
    }

    /**
     * Se encarga de verificar si las contraseñas al momento del registro coinciden
     * @param {String} password Contraseña ingresada por el usuario   
     * @param {String} rePassword Contraseña ingresada por el usuario para verificar
     * @returns Sólo devolverá true en caso de que las contraseñas coincidan, de lo contrario será false
     */
    static verificarContraseniasCoinciden(password, rePassword){
        const mensajeErrorContraseniasNoCoinciden = "Las contraseñas no coinciden";
        const formulario = document.querySelector("#registerForm");
        const formControl = formulario.sameRegisterPassword;
        if (password !== rePassword) {
            // const formulario = document.querySelector("#registerForm");
            // const formControl = formulario.sameRegisterPassword;
            ValidacionUsuario.mostrarError(formControl, mensajeErrorContraseniasNoCoinciden);
            return false;
        }
        ValidacionUsuario.ocultarError(formControl);
        return true;
    }

    /**
     * Se encarga de verificar que el mail ingresado sea válido
     * @param {String} email Email ingresado por el usuario al momento de crear la cuenta
     * @returns Devuelve false en caso de que el mail ingresado no posea un formato válido, en caso de que esté todo okay devolverá true
     */
    static verificarEmail(email){
        const mensajeErrorEmailInvalido = "No es un Email válido";
        const emailValido = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const formulario = document.querySelector("#registerForm");
        const formControl = formulario.mail;
        if (!emailValido.test(email.trim())) {
            ValidacionUsuario.mostrarError(formControl, mensajeErrorEmailInvalido);
            return false;
        }
        ValidacionUsuario.ocultarError(formControl);
        return true;
    }
}