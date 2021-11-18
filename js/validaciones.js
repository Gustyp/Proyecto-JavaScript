// Verifica si el numero ingresado por parámetro es un número, en caso contrario vuelve a pedir otro número hasta que el mismo sea válido
const verificarNumeroValido = (num) => {
    while (isNaN(num) || num <= 0){
        console.log(`Ingrese sólo números positivos por favor. Intente de nuevo.`);
        num = parseInt(prompt("Vuelva a ingresar, por favor:"));
    }
    return num;
}

// Verifica que la palabra ingresada no contenga carácteres numéricos, en casos contrario vuelve a pedir al usuario que vuelva a ingresar la palabra hasta que sea válida
const verificarContieneSoloLetras = (palabra) => {

    while (!soloLetras.test(palabra)){
        console.log(`Ingrese un nombre y/o apellido válido por favor, sin números. Intente de nuevo.`);
        palabra = prompt(`Vuelva a ingresar, por favor:`); 
    }
    return palabra;
}

// Verifica que el mail ingresado por el usuario sea válido, en caso contrario vuelve a solicitarlo hasta que el mismo lo sea
const verificarEsMailValido = (mail) => {

    while (!mailValido.test(mail)){
        console.log(`Ingrese un correo electrónico válido por favor. Intente de nuevo.`);
        mail = prompt(`Ingrese su correo electrónico:`); 
    }
    return mail;
}

// Verifica que la cantidad de cuotas ingresadas se encuentre disponible y sea válida
const verificarCuotasvalidas = (cuotasValidas) => {

    while (cuotasValidas != 1 && cuotasValidas != 3 && cuotasValidas != 6 && cuotasValidas != 9 && cuotasValidas != 12){
        cuotas = parseInt(prompt(`Por favor, ingrese un número de cuotas disponible:`));
        cuotasValidas = verificarNumeroValido(cuotas);
    }
    return cuotasValidas;
}