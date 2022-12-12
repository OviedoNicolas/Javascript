/* La idea del proyecto es armar un sitio donde se puedan organizar los horarios de los empleados de manera aleatoria al ingreasar que tipo de contrato tienen.
Mas abajo dejo algunas aclaraciones de partes que no puedo ejcutar de manera eficiente porque los datos se ingresan por prompt*/

function getCliente (){
    let nombre;
    do{
        nombre = prompt("Bienvenido a nuestro servicio, cual es su nombre?");
    } while (nombre == null || nombre == "");
    return nombre;
}

function getEmpleadoNombre (){
    let nombre;
    do{
        nombre = prompt("Cual es el nombre de su empleado?");
    } while (nombre == null || nombre == "");
    return nombre;
    }
    
function getEmpleadoApellido (){
    let apellido;
    do{
        apellido = prompt("Cual es el apellido de su empleado?");
    } while (apellido == null || apellido == "");
    return apellido;
}

function getContrato (){
    do{
        contrat = prompt( "Seleccione con el número correspondiente el tipo de contrato\n1- Full Time\n 2- Part Time");
    } while (contrat != 1 && contrat != 2);
    if (contrat == 1 ){
        return contrat = fullTime
        } else{
            return contrat = partTime
        }
    } 
    
function getEmpleado (){
    empleados.push(new Empleado (getEmpleadoNombre(), getEmpleadoApellido(), getContrato()));
    getAgregar ()
}

function getAgregar (){
    let agregar;
    do{
        agregar = prompt ("¿Desea agregar otro empleado\nIngrese el Número de la opción\n1- Si\n2- No");
    } while (agregar != 1 && agregar !=2);
    if (agregar == 1){
        getEmpleado ();
    }
}
/* En esta parte al tener que ingresar la hora por prompt se me limita poder convertirlo en horas, la idea es ingresar ese dato por un input tipo time en el html, por lo que se generan cierto problemas como la posibilidad de escribir un string y el resultado de la cuenta sea NaN*/
function getHorario () {
    let horarioApertura = parseInt ( prompt ("Cual es el horario de apertura de su local?\nUtilice formato de 24 horas, por ejemplo 09:00"));
    let horarioCierre = parseInt (prompt ("Cual es el horario de cierre de su local?\nUtilice formato de 24 horas, por ejemplo 21:00"));
    let horario = horarioCierre - horarioApertura;

    if (horarioCierre <= horarioApertura){
        horarioCierre = horarioCierre + 24
    }  /* con esta linea soluciono el problema que se presenta si el local cierra despues de las 00:00*/
    return horario
}
/* Esta es la funcion para asignar el turno de trabajo de manera aleatoria, tengo el mismo inconveniete de mas arriba que al trabajar con prompts y alerts existe la posibilidad que falte un turno por asignar, la idea es cuando pueda aplicar DOM generar una tabla con los turnos dependiendo las horas de apertura y cierre, y antes de que se duplique un turno corroborar que todas las casillas tengan al menos un empleado asignado*/
function asignarTurno () {
    for (const empleado of empleados){
        if (empleado.contrato == fullTime){
        empleado.turno1 = Math.ceil(Math.random()* turnos )
        empleado.turno2 = Math.ceil(Math.random()* turnos )
        while (empleado.turno2 == empleado.turno1)
        empleado.turno2 = Math.ceil(Math.random()* turnos )
    } else {
        empleado.turno1 = Math.ceil(Math.random()* turnos )
        delete empleado.turno2
        }
    }
}

let cliente = getCliente();
const empleados = []
const partTime = 4;
const fullTime = partTime * 2;
let horario = getHorario ()
let turnos = Math.ceil(horario / 4);

class Empleado {
    constructor (nombre, apellido, contrato, turno1, turno2){
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrato = contrato;
        this.turno1 = turno1;
        this.turno2 = turno2;
    }
}

getEmpleado ()
asignarTurno()

for (const empleado of empleados){
    if (empleado.contrato == fullTime){
        alert (empleado.apellido + " trabajara en el turno " + empleado.turno1 + " y en el turno " + empleado.turno2)
    } else {
        alert (empleado.apellido + " trabajara en el turno " + empleado.turno1)
        }
}

console.log(empleados)

alert ("Gracias " + cliente + " por elegirnos" );