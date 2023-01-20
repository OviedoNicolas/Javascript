/* Variables */
let clientes;
const clientesAlmacenados = JSON.parse(localStorage.getItem("listaClientes"));

/* Elementos traidos desde el html      ``  */ 
const agregarClienteForm = document.querySelector ("#agregar-cliente");
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
        this.nombreCompleto = nombre + " " + apellido;
    }
}

function actualizarClientes (){
    clientesAlmacenados ? clientes = clientesAlmacenados : clientes = [];
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
    clientesContainer.innerHTML = "";
    clientes.forEach(cliente => {
        let div = document.createElement ("div");
        div.classList.add ("post")
        div.innerHTML = `                
            <p>${cliente.nombreCompleto}</p>
            <p>${cliente.direccion}</p>
            <p>${cliente.telefono}</p>
            <div class="pin">
                <div class="shadow"></div>
                <div class="metal"></div>
                <div class="bottom-circle"></div>
            </div>
            <button class="botonEliminar" id="${cliente.id}"><img src="/images/x-circle.svg" alt="boton eliminar"></button>
        `;
        clientesContainer.append (div);
    })
    localStorage.setItem ("listaClientes", JSON.stringify(clientes));
    crearBotonesEliminarCliente ();
};

function validarFormularioClientes () {
    if (getClienteNombre.value == "" || getClienteDireccion.value == ""||getClienteTelefono.value == "" ){
        Swal.fire({
            icon: 'error',
            title: 'Por favor',
            text: 'Completá todos los campos que tengan (*)',
        });
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Cliente creado correctamente',
            showConfirmButton: false,
            timer: 1200
        });
        setTimeout( () => {
            crearCliente ();
            cargarCliente ();
            agregarClienteForm.reset()
        }, 900);
    };
};

function eliminarCliente (e){
    const botonClienteEliminar = e.currentTarget.id;
    const clienteAEliminar = clientes.findIndex (cliente => cliente.id == botonClienteEliminar);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Cliente eliminado correctamente',
        showConfirmButton: false,
        timer: 1200
    });
    setTimeout( ()=>{
        clientes.splice(clienteAEliminar, 1);
        cargarCliente ();
    }, 900);
}

/* Eventos */

getClienteAceptar.addEventListener ("click", (e) => {
    e.preventDefault();
    validarFormularioClientes ();
});

/* Flujo del programa*/

actualizarClientes();
cargarCliente();