//  Muestra por consola el saldo disponible del usuario
const mostrarSaldoDisponible = usuario =>  console.log(`Usted tiene un saldo disponible de $${usuario.saldoDisponible}.`);

// Muestra por consola el menu de inicio
const mostrarMenuInicio = () => console.log(menuInicio);

// Muestra por consola el menu de la cuenta una vez iniciada la sesión
const mostrarMenuCuenta = () => console.log(menuCuenta);

// Muestra por consola un mensaje de bienvenida
const mostrarMensajeBienvenida = () => console.log(`Bienvenido al simulador de Home Banking.`);

// Muestra por consola un mensaje de despedida
const mostrarMensajeDespedida = () => console.log(`¡Adiós!`);

// Muestra por consola un mensaje al cerrar la sesión
const mostrarMensajeCerrarSesion = () => console.log(`¡Has cerrado sesión con éxito!`);

// Muestra por consola un mensaje al haber escogido una elección erronea
const mostrarMensajeEleccionErronea = () => console.log("Lo sentimos, esa opción no se encuentra disponible.");

// Muestra por consola un mensaje al visitar por primera vez e intentar iniciar sesión sin haber ninguna cuenta creada
const mostrarMensajePrimeraVisita = () => console.log(`Parece que es la primera vez que nos visitas y no has creado una cuenta aún. ¡Creala ahora!`);

// Muestra por consola un mensaje de iniciar la sesión
const mostrarMensajeInicioSesion = () => console.log(`¡Ahora estás dentro de tu cuenta!`);