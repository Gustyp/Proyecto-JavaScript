const volverPaginaAnterior = () => history.back;

const volverAtras = document.querySelector(`#volverAtras`);

volverAtras.addEventListener(`click`, volverPaginaAnterior);

