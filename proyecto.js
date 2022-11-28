/* La idea del proyecto es armar un sitio donde se puedan comprar o alquilar peliculas, donde te tire una recomendacion y el monto a pagar en caso de q se compre o alquile y por cuantos dias se quiere alquilar variando asi el monto*/

let accionClasico = "True Lies";
let accionModerno = "Bullet Train";
let animacionClasico = "The Road to El Dorado";
let animacionModerno = "The Bad Guys";
let comediaClasico = "Monty Python and the Holy Grail";
let comediaModerno = "Game Night";
let fantasiaClasico = "The Mummy";
let fantasiaModerno = "Dune";
let terrorClasico = "Peeping Tom"; 
let terrorModerno = "Black Phone";
let precioCompra = 1390;
let precioAlquiler = 68;
let cliente = getCliente();
let genero = getGenero();
let epoca = getEpoca();
let pelicula = getPelicula();
let transaccion = getTransaccion();


function getCliente (){
    let nombre;
    do{
        nombre = prompt("Bienvenido a nuestro servicio, cual es su nombre?");
        } while (nombre == null || nombre == "");
        return nombre;
}

function getGenero (){
    let generoOpcion;
    do{
        generoOpcion = parseInt (prompt ("Hola " + cliente + " ¿que género de película te gustaría ver?\n\nIngrese el Número de la opción\n\n1- Acción\n2- Animación\n3- Comedia\n4- Fantasía\n5- Terror"));
    }while (generoOpcion !=1 && generoOpcion !=2 && generoOpcion !=3 && generoOpcion !=4 && generoOpcion !=5);
    switch (generoOpcion){
        case 1 : 
            return "accion";
        case 2 : 
            return "animacion";
        case 3 : 
            return "comedia";
        case 4 : 
            return "fantasia";
        case 5 : 
            return "terror";
    }
}

function getEpoca (){
    let epocaOpcion;
    do{
        epocaOpcion = prompt ("¿De que época prefieres tu película?\n\nIngrese el Número de la opción\n\n1- Clásico\n2- Moderno");
    } while (epocaOpcion != 1 && epocaOpcion !=2);
    if (epocaOpcion == 1){
        return "clasico";
    } else{
        return "moderno";
    }
}

function getTransaccion(){
    do{
        transaccionOpcion = prompt ("Te recomendamos entonces:\n\n"+ getPelicula()+ "\n\n¿Prefieres comprar o alquilar tu película?\n\nIngrese el Número de la opción\n\n1- Comprar\n2- Alquilar");
    } while (transaccionOpcion != 1 && transaccionOpcion !=2);
    if (transaccionOpcion == 1){
        return "compra";
    } else{
        return "alquiler";
    }
}

function getPelicula(gen,epo){
    gen = genero;
    epo = epoca;
    if( gen == "accion" && epo == "clasico"){
        return accionClasico;
    } else if ( gen == "accion" && epo == "moderno"){
        return accionModerno;
    } else if ( gen == "animacion" && epo == "clasico"){
        return animacionClasico;
    } else if ( gen == "animacion" && epo == "moderno"){
        return animacionModerno;
    } else if ( gen == "comedia" && epo == "clasico"){
        return comediaClasico;
    } else if ( gen == "comedia" && epo == "moderno"){
        return comediaModerno;
    } else if ( gen == "fantasia" && epo == "clasico"){
        return fantasiaClasico;
    } else if ( gen == "fantasia" && epo == "moderno"){
        return fantasiaModerno;
    } else if ( gen == "terror" && epo == "clasico"){
        return terrorClasico;
    }else{
        return terrorModerno;
    }
}

resultado()

function resultado(){
    if (transaccion == "alquiler"){
        let resultadoAlquiler = prompt ("El precio del alquiler es de $" + precioAlquiler + " por dia\n\n¿Cuantos dias queres alquilarla?");
        resultadoAlquiler = resultadoAlquiler * precioAlquiler;
        alert ("El precio final de tu alquiler es de $"+ resultadoAlquiler);
    }else{
        alert ("El precio de tu compra es de $" + precioCompra);
    }
}

alert ("Muchas gracias " + cliente + " por usar elegirnos");