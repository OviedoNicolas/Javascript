/* La idea del proyecto es armar un organizador automático de horarios para una empresa, el cual al colocar el nombre del empleado y su tipo de contrato arme una planilla con las horas en las que tiene que trabajar*/

let cliente = prompt ("Bienvenido a nuestro servicio, cual es su nombre?");

let horarioApertura = parseInt ( prompt ("Cual es el horario de apertura de su local?\nUtilice formato de 24 horas, por ejemplo 09:00"));

let horarioCierre = parseInt (prompt ("Cual es el horario de cierre de su local?\nUtilice formato de 24 horas, por ejemplo 21:00"));

let empleado = prompt ("Ingrese el nombre del empleado");

const partTime = 4;
const fullTime = partTime * 2;

function contra (){
    do{
        contrat = prompt( "Seleccione con el número correspondiente el tipo de contrato\n1- Full Time\n 2- Part Time");
        } while (contrat != 1 && contrat != 2);
        if (contrat == 1 ){
        return contrat = fullTime
    } else{
        return contrat = partTime
    }
} 

let contrato = contra ()

if (horarioCierre <= horarioApertura){
    horarioCierre = horarioCierre + 24
}  /* con esta linea soluciono el problema que se presenta si el local cierra despues de las 00:00*/

let horario = horarioCierre - horarioApertura;

console.log (contrato)
console.log (fullTime)
console.log (horario)






alert ("Gracias " + cliente + " por elegirnos" );


