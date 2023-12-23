const cronometro = document.getElementById("cronometro");
const botonInicioPausa = document.getElementById("boton-inicio-pausa");
const botonReiniciar = document.getElementById("boton-reiniciar");

let [horas, minutos, segundos] = [0, 0, 0];

let intervaloDeTiempo;
let estadoCronometro = "pausado";

function actualizarCronometro() {
    //porque minimo ha transcurrido un segundo
    segundos++;
    if (segundos / 60 === 1) {
        segundos = 0;
        minutos++;
        if (minutos / 60 === 1) {
            minutos = 0; 
            horas++;
        }
    }

    //que agregue un 0 si es un digito y que agregue si son dos

    const segundosConFormato = asignarFormato(segundos);
    const minutosConFormato = asignarFormato(minutos);
    const horasConFormato = asignarFormato(horas);

    //actualizar contenido del cronometro
    cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`; //para reemplazar variables directamente
}

function asignarFormato(unidadDeTiempo) {
    return unidadDeTiempo < 10 ? "0" + unidadDeTiempo : unidadDeTiempo;//<--entonces, sino// 
}

botonInicioPausa.addEventListener("click", function () {
    if (estadoCronometro === "pausado") {
        intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000); //milisegundos
        botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
        botonInicioPausa.classList.remove("iniciar");
        botonInicioPausa.classList.add("pausar");
        estadoCronometro = "andando";
    } else {
        window.clearInterval(intervaloDeTiempo);
        botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
        botonInicioPausa.classList.remove("pausar");
        botonInicioPausa.classList.add("iniciar");
        estadoCronometro = "pausado";
    }
})

botonReiniciar.addEventListener("click", function () {
    window.clearInterval(intervaloDeTiempo);
    segundos = 0;
    minutos = 0;
    horas = 0;
    //reiniciar
    cronometro.innerText = "00:00:00";
    //actualizar botones
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove("pausar");
    botonInicioPausa.classList.add("iniciar");
    //estado
    estadoCronometro = "pausado";
})