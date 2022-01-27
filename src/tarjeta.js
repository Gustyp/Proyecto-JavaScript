const girarTarjeta = () => {
  const tarjeta = document.querySelector("#card");
  tarjeta.classList.toggle(`is-flipped`);
};

const cargarDatosDeUsuario = () => {
  
}

/**
 * Función que se encarga de cargar los datos almacenados en localStorage
 */
 const iniciar = () => {
  GestionUsuarios.iniciar();
  // Evento que se encarga de otener los datos del formulario de solicitud de préstamo
  // $('#creditForm').on('submit', obtenerDatosFormulario); 
  $('#cargarDatos').on('click', cargarDatosDeUsuario);
  $(`#card`).on('click', girarTarjeta);
  $(`#misDatos`).on(`click`, cargarDatosPersonales);
}

// Este evento carga la información desde el localStorage
$(() => iniciar());