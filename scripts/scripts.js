let peliculas = ["Que bello es vivir", "Vacaciones de Navidad", "Historias de Navidad", "Navidades Blancas", "Solo en casa", "Pesadilla antes de Navidad", "Cuento de Navidad","Los tres reyes malos","The Snowman","Un principe de Navidad","Navidades Magicas","Fiesta de empresa","Happy Christmas","Vacaciones","Love Actually","Eduardo Manostijeras","La jungla de cristal","Gremlins","Negra Navidad","La gran familia"];
let tituloPeli;
let numero;

//Para añadir los huecos de la pelicula al contenedor
let cajaTitulo;
let cajaHuecos;

//Para añadir las letras usadas
let cajaLetrasUsadas;
let UltimaLetra

//Huecos a acertar
let hueco;
let huecos;
let espacio;

//Para añadir las letras usadas
let letraUsada=[];
let fallos=[];


//teclas para pulsar
let teclas;

//contadores y bonificadores
let errores = 0;
let puntos = 0;
let bonificador =1000;
let numAciertos = 0;

//Evalua si has ganado o no
let ganador = false;


window.onload = function() {
    var teclado = document.getElementById("teclado");
    teclado.style.zIndex="1";
    for(let teclaActual = 65; teclaActual <= 90;teclaActual++) {
        tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);
    }
    empezar();
}


//Funcion que empieza el juego
function empezar() {
    //Creo la caja y selecciono la pelicula
    let caja=document.getElementById("letrasUsadas");
    cajaLetrasUsadas=document.createElement("div");
    caja.appendChild(cajaLetrasUsadas);
    ocultaCuerpo();
    numero = Math.floor(Math.random() * (peliculas.length));
    tituloPeli = peliculas[numero];
    console.log(tituloPeli);
    //Relleno los huecos con divs y añado Eventos
    rellenar(tituloPeli);
    teclas = document.getElementsByClassName("tecla");
    //Selecciono la caja de la ultimaletra para usarla mas tarde
    UltimaLetra = document.getElementById("letra");
    

    for (let i = 0; i < teclas.length; i++) {
        teclas[i].addEventListener("click", entradaBoton);
        addEventListener("keypress",checkTeclado);
    }
}

//Rellena de huecos el contenedor
function rellenar(pelicula) {
    cajaTitulo = document.getElementById("titulo");
    cajaHuecos = document.createElement("div");
    cajaHuecos.style.marginTop = "50px";
    cajaTitulo.appendChild(cajaHuecos);

    for (let i = 0; i < pelicula.length; i++) {
        hueco = document.createElement("div");
        espacio = document.createElement("div");
        espacio.style.display = "inline";
        espacio.style.marginLeft = "20px";

        if (pelicula.charAt(i) == " ") {
            cajaHuecos.appendChild(espacio);
        } else {
            hueco.classList.add("oculto");
            hueco.innerText = pelicula.charAt(i);
            cajaHuecos.appendChild(hueco);
        }
    }
    huecos = document.getElementsByClassName("oculto");

}

//Funcion que oculta el cuerpo
function ocultaCuerpo() {
    let extremidad = document.getElementsByClassName("extremidad");

    for (let i = 0; i < extremidad.length; i++) {
        extremidad[i].style.visibility = "hidden";
    }
}

//Las tres funciones siguientes son para poder pasarle el mismo parametro a intento
function entradaBoton(){
    keyPress=this.innerText;
    intento(keyPress);
}

function checkTeclado(element){
    keyPress = element.key;  
    if(isLetter(keyPress)){
        console.log("true");
        intento((keyPress));
    }
}
function isLetter(str) {
    
    return str.length === 1 && str.match(/[a-z]/i);
}

//Evalua la tecla introducida o pulsada
function intento(teclaPulsada){

    //Si ya se ha pulsado la misma tecla cambia el background y no contara como acierto
    let entra=true;
    if(letraUsada.includes(teclaPulsada.toUpperCase())){
        cambiaBackground(teclaPulsada);
        entra=false;
    }
    let acierto = false;


    //Añade las letras pulsadas y evalua si has acertado
    for (let i = 0; i < huecos.length; i++) {
        if (teclaPulsada.toUpperCase() == huecos[i].innerText.toUpperCase()&& entra) {
            console.log("acierto");
            huecos[i].style.color = "black";
            acierto = true;
            numAciertos++;
            letraUsada.push(teclaPulsada.toUpperCase());
            fallos.push(teclaPulsada.toUpperCase());
        }else{
            letraUsada.push(teclaPulsada.toUpperCase());
            
        }
    }
    //Ganas la partida
    if(numAciertos==(huecos.length)){
        ganador=true;
        setTimeout(() => { finJuego(ganador)}, 1500);
    }
    
    resultado(acierto, numAciertos,teclaPulsada);
    sumaLetra(teclaPulsada,checkLetraUsada(teclaPulsada));
}

//Suma puntos o añade una parte del cuerpo
function resultado(boolean, numAciertos,teclaPulsada) {
    let cajaScore = document.getElementById("actualscore");
    if (boolean) {
        puntos += (bonificador * numAciertos);
        cajaScore.innerText = puntos;
    } else if (!fallos.includes(teclaPulsada.toUpperCase())){
        errores++;
        sumaExtremidad();
        fallos.push(teclaPulsada.toUpperCase());
    }
}
//Suma letras a las cajas de letras usadas
function sumaLetra(letra,boolean){  
    let letraUsada=document.createElement("div");
    letraUsada.classList.add("letraUsada");
    letraUsada.innerText=letra;
    UltimaLetra.innerText = letra;


    if(boolean){
        cajaLetrasUsadas.appendChild(letraUsada);
    }
}
//Devuelve un booleano dependiendo de si la letra esta en la caja de letras usadas
function checkLetraUsada(letra){
    let usada=document.getElementsByClassName("letraUsada");
    let salida=true;

    for (let i =0;i<usada.length;i++){
        
        if(letra.toUpperCase()==usada[i].innerText.toUpperCase()){
            salida=false;
        }
    }
    return salida;
}


//Hace visibles las partes del cuerpo y modifica el bonificador
function sumaExtremidad() {
    let extremidad;

    switch (errores) {

        case 1:
            extremidad = document.getElementById("cabeza").style.visibility = "visible";
            bonificador=900;
            break;
        case 2:
            extremidad = document.getElementById("cuerpo").style.visibility = "visible";
            bonificador=800;

            break;
        case 3:
            extremidad = document.getElementById("brazoIzq").style.visibility = "visible";
            bonificador=700;

            break;
        case 4:
            extremidad = document.getElementById("brazoDer").style.visibility = "visible";
            bonificador=600;

            break;
        case 5:
            extremidad = document.getElementById("manoizq").style.visibility = "visible";
            bonificador=500;

            break;
        case 6:
            extremidad = document.getElementById("manoDer").style.visibility = "visible";
            bonificador=400;

            break;
        case 7:
            extremidad = document.getElementById("piernaIzq").style.visibility = "visible";
            bonificador=300;

            break;
        case 8:
            extremidad = document.getElementById("piernaDer").style.visibility = "visible";
            bonificador=200;

            break;
        case 9:
            extremidad = document.getElementById("pieizq").style.visibility = "visible";
            bonificador=100;

            break;
        case 10:
            extremidad = document.getElementById("pieDer").style.visibility = "visible";
            setTimeout(() => {finJuego(ganador)}, 2000);            
        default :
    }
}

//Acaba la partida
function finJuego(ganador){
    let contenedor = document.getElementById("contenedor");
    deleteChild(teclado);
    deleteChild(contenedor);
    let cartel = document.createElement("div");
    let mensaje = document.createElement("h1");
    mensaje.id="mensajeFinal";
    let boton = document.createElement("button");
    boton.innerText="Volver a Jugar";
    boton.id = "otraVez";
    boton.style.border="solid";
    cartel.style.height="100vh"
    contenedor.appendChild(cartel);
    cartel.appendChild(mensaje);
    cartel.appendChild(boton);

    if (ganador){
        let aprieta=document.getElementById("otraVez");

        cartel.style.background="green";
        mensaje.innerText="Enhorabuena,has ganado. Has conseguido "+puntos+" puntos";
        aprieta.addEventListener("click",recargar);
    }else{
        let aprieta=document.getElementById("otraVez");

        cartel.style.background="red";
        mensaje.style.color="white";
        mensaje.innerText="LOSER";
        aprieta.addEventListener("click",recargar);
    }
}

function recargar(){
    console.log("entra en el listener");
    location.reload();
}

//Elimina todos los hijos
function deleteChild(element) {
    let first = element.firstElementChild;
    while (first) {
        first.remove();
        first = element.firstElementChild;
    }
}
//Cambia el background temporalmente
function cambiaBackground(teclaPulsada){
    let element;

    for (let i = 0; i<teclas.length; i++){
        if(teclas[i].innerText.toUpperCase()==teclaPulsada.toUpperCase()){
            element=teclas[i];
        }
    }
    element.style.background="red";
    setTimeout(() => { element.style.background="whitesmoke"}, 1000); 
}