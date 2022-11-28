/* La idea del proyecto es armar un sitio donde se puedan comprar o alquilar peliculas, donde te tire una recomendacion y el monto a pagar en caso de q se compre o alquile y por cuantos dias se quiere alquilar variando asi el monto*/

let accionClasico = "True Lies"
let accionModerno = "Bullet Train"
let animacionClasico = "The Road to El Dorado"
let animacionModerno = "The Bad Guys"
let comediaClasico = "Monty Python and the Holy Grail"
let comediaModerno = "Game Night"
let fantasiaClasico = "The Mummy"
let fantasiaModerno = "Dune"
let terrorClasico = "Peeping Tom" 
let terrorModerno = "Black Phone" 

function getCliente (){
    do{
        nombre = prompt("Bienvenido a nuestro servicio, cual es su nombre?");
        } while (nombre == null || nombre == "");
        return nombre
}

let cliente = getCliente ()

function getGenero (){
    do{
        generoOpcion = prompt("Hola " + cliente + " ¿que género de película te gustaría ver?\n\nIngrese el Número de la opción\n\n1- Acción\n2- Animación\n3- Comedia\n4- Fantasía\n5- Terror");
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

let genero = getGenero()

function getEpoca (){
    do{
        epocaOpcion = prompt ("¿De que época prefieres tu película?\n\nIngrese el Número de la opción\n\n1- Clásico\n2- Moderno");
    } while (epocaOpcion != 1 && epocaOpcion !=2);
    if (epocaOpcion == 1){
        return "clasico";
    } else{
        return "moderno";
    } 
}

let epoca = getEpoca()