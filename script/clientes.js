/* Variables */
let clientes;
const clientesAlmacenados = JSON.parse(localStorage.getItem("listaClientes"));

/* Elementos traidos desde el html      ``  */ 
const clientesContainer = document.querySelector ("#clientes-container");
const getClienteNombre = document.querySelector ("#get-nombre");
const getClienteApellido = document.querySelector ("#get-apellido");
const getClienteDireccion = document.querySelector ("#get-direccion");
const getClienteTelefono = document.querySelector ("#get-telefono");
const getClienteAceptar = document.querySelector ("#cliente-aceptar");
let botonesEliminarCliente = document.querySelectorAll (".botonEliminar");

/* Funciones*/

class Cliente {
    constructor (nombre, apellido, direccion, telefono,id){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.id = id;
    }
}

function actualizarClientes (){
    if (clientesAlmacenados) {
        clientes = clientesAlmacenados;
    } else {
        clientes = [];
    }
}

function crearCliente(){
    clientes.push (new Cliente(getClienteNombre.value, getClienteApellido.value, getClienteDireccion.value, getClienteTelefono.value, Math.random()))
};

function crearBotonesEliminarCliente () {
    botonesEliminarCliente = document.querySelectorAll (".botonEliminar");
    botonesEliminarCliente.forEach(boton =>{
        boton.addEventListener("click", eliminarCliente);
    })
}

function cargarCliente (){
    clientesContainer.innerHTML = ""
    clientes.forEach(cliente => {
        let div = document.createElement ("div");
        div.innerHTML = `                
            <p>${cliente.nombre}</p>
            <p>${cliente.apellido}</p>
            <p>${cliente.direccion}</p>
            <p>${cliente.telefono}</p>
            <button class="botonEliminar" id="${cliente.id}">Eliminar</button>
        `;
        clientesContainer.append (div)
    })
    localStorage.setItem ("listaClientes", JSON.stringify(clientes));
    crearBotonesEliminarCliente ();
};

function eliminarCliente (e){
    const botonClienteEliminar = e.currentTarget.id;
    const clienteAEliminar = clientes.findIndex (cliente => cliente.id == botonClienteEliminar);
    clientes.splice(clienteAEliminar, 1);
    cargarCliente ();
}

/* Eventos */

getClienteAceptar.addEventListener ("click", () => {
    crearCliente ();
    cargarCliente ();
})

/* Flujo del programa*/

actualizarClientes();
cargarCliente();
