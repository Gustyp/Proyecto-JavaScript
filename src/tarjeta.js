const girarTarjeta = () => {
  const tarjeta = document.querySelector("#card");
  tarjeta.classList.toggle(`is-flipped`);
};

$(`#card`).on('click', girarTarjeta);