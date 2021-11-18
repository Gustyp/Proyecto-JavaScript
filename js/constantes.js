// Representa las opciones disponibles para elegir en el menú de inicio
const menuInicio = `Opciones:
    1. Nuevo usuario
    2. Ya tengo usuario
    3. Salir
`
// Representa las opciones disponibles para elegir en el menú de la cuenta una vez iniciada sesión
const menuCuenta = `Opciones:
    1. Ver saldo disponible
    2. Depositar dinero
    3. Transferir dinero
    4. Solicitar préstamo
    5. Salir de la cuenta
`

// Representa el valor del interés de las cuotas que se va a mostrar por consola al usuario
const interesPorCuotas = `Interés por cuota:
    1 cuota: 7% de interés
    3 cuotas: 15% de interés
    6 cuotas: 22% de interés
    9 cuotas: 35% de interés
    12 cuotas: 46% de interés
`;

// Expresión regular para validar sólo letras
const soloLetras = /^[a-zA-Z]+$/;

// Expresion regular para validar sólo números
const soloNumeros = /^[0-9]+$/;

// Expresión regular para confirmar un mail válido
const mailValido = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

// Representa la edad mínima para pedir el préstamo, ser mayor de edad
const edadMinima = 18;

// Representa el salario mínimo pretendido para solicitar el préstamo
const salarioMinimo = 20000;