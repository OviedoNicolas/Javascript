const clientes = [];

class Cliente {
    constructor (nombre, apellido, direccion, telefono){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}
/* Elementos traidos desde el html      ``  */ 
const clientesContainer = document.querySelector ("#clientes-container");
const getClienteNombre = document.querySelector ("#get-nombre");
const getClienteApellido = document.querySelector ("#get-apellido");
const getClienteDireccion = document.querySelector ("#get-direccion");
const getClienteTelefono = document.querySelector ("#get-telefono");
const getClienteAceptar = document.querySelector ("#cliente-aceptar");


/* Funciones*/

function crearCliente(){
    clientes.push (new Cliente(getClienteNombre.value, getClienteApellido.value, getClienteDireccion.value, getClienteTelefono.value))
};

function cargarCliente (){
    clientesContainer.innerHTML = ""
    clientes.forEach(cliente => {
        div = document.createElement ("div");
        div.innerHTML = `                
            <p>${cliente.nombre}</p>
            <p>${cliente.apellido}</p>
            <p>${cliente.direccion}</p>
            <p>${cliente.telefono}</p>
            <button>Editar</button>
            <button>Eliminar</button>
        `;
        clientesContainer.append (div)
    })
};


/* Eventos */

getClienteAceptar.addEventListener ("click", () => {
    crearCliente ();
    cargarCliente ();
})
