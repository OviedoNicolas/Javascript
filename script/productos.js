/* Variables */
let productos;
const productosAlmacenados = JSON.parse(localStorage.getItem("listaProductos"));

/* Elementos traidos desde el html      ``  */ 
const agregarProductoForm = document.querySelector ("#agregar-producto");
const productosContainer = document.querySelector ("#productos-container");
const getProductoNombre = document.querySelector ("#get-producto");
const getProductoPrecio = document.querySelector ("#get-precio");
const getProductoAceptar = document.querySelector ("#producto-aceptar");
let botonesEliminarCliente = document.querySelectorAll (".botonEliminar");


/* Funciones*/

class Producto {
    constructor (nombre, precio, id){
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
}

function actualizarProductos (){
    productosAlmacenados ? productos = productosAlmacenados : productos = [];
}

function crearProducto(){
    productos.push (new Producto(getProductoNombre.value, Number(getProductoPrecio.value), Math.random()))
};

function crearBotonesEliminarProducto () {
    botonesEliminarProducto = document.querySelectorAll (".botonEliminar");
    botonesEliminarProducto.forEach(boton =>{
        boton.addEventListener("click", eliminarProducto);
    })
}

function cargarProducto (){
    productosContainer.innerHTML = "";
    productos.forEach(producto => {
        let div = document.createElement ("div");
        div.classList.add ("post")
        div.innerHTML = `                
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <div class="pin">
                <div class="shadow"></div>
                <div class="metal"></div>
                <div class="bottom-circle"></div>
            </div>
            <button class="botonEliminar" id="${producto.id}">Eliminar</button>
        `;
        productosContainer.append (div);
    })
    localStorage.setItem ("listaProductos", JSON.stringify(productos));
    crearBotonesEliminarProducto ();
};

function validarFormularioProductos () {
    if (getProductoNombre.value == "" || getProductoPrecio.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Daaaaale...',
            text: 'No ves q tenes q poner los datos???...bobo!',
        });
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1200
        });
        setTimeout( ()=>{
            crearProducto ();            
            cargarProducto ();
            agregarProductoForm.reset()
        }, 900);
    };
};

function eliminarProducto (e){
    const botonProductoEliminar = e.currentTarget.id;
    const productoAEliminar = productos.findIndex (producto => producto.id == botonProductoEliminar);
    productos.splice(productoAEliminar, 1);
    cargarProducto ();
}

/* Eventos */

getProductoAceptar.addEventListener ("click", (e) => {
    e.preventDefault();
    validarFormularioProductos ();
});

actualizarProductos ();
cargarProducto ();