const animarTituloLogo = () => {
    $(`#tituloLogo`).animate({
        "font-size": "1.6rem"
    }).fadeOut(5000).delay(100).fadeIn(5000);
}

$(() =>{
    animarTituloLogo();
})
