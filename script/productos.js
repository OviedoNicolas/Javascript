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
const botonSwitch = document.querySelector ("#switch");


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
    if(productosAlmacenados.some(producto => producto.nombre == getProductoNombre.value)){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'Ese producto ya existe',
            showConfirmButton: false,
            timer :1500
        });
    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Producto creado correctamente',
            showConfirmButton: false,
            timer: 1200
        });
        productos.push (new Producto(getProductoNombre.value, Number(getProductoPrecio.value), Math.random()))
    }
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
            <p class ="mano" >${producto.nombre}</p>
            <p class ="mano" >$${producto.precio}</p>
            <div class="pin">
                <div class="shadow"></div>
                <div class="metal"></div>
                <div class="bottom-circle"></div>
            </div>
            <img src="../images/x-circle.svg" class="boton botonEliminar" id="${producto.id}" alt="boton eliminar">
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
            title: 'Por favor',
            text: 'completá todos los campos que tengan (*)'
        });
    } else {
        crearProducto ();            
        setTimeout( ()=>{
            cargarProducto ();
            agregarProductoForm.reset()
        }, 900);
    };
};

function eliminarProducto (e){
    const botonProductoEliminar = e.currentTarget.id;
    const productoAEliminar = productos.findIndex (producto => producto.id == botonProductoEliminar);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Producto eliminado correctamente',
        showConfirmButton: false,
        timer: 1200
    });
    setTimeout( ()=>{
        productos.splice(productoAEliminar, 1);
        cargarProducto ();
    }, 900);
};

function modo (){
    if(JSON.parse(localStorage.getItem("modo-oscuro")) === true){
        document.body.classList.add ("body-dark");
        botonSwitch.classList.add ("switch-dark");
    }else{
        document.body.classList.remove ("body-dark");
        botonSwitch.classList.remove ("switch-dark");
    };
};

/* Eventos */

getProductoAceptar.addEventListener ("click", (e) => {
    e.preventDefault();
    validarFormularioProductos ();
});

botonSwitch.addEventListener("click", () =>{
    document.body.classList.toggle ("body-dark");
    botonSwitch.classList.toggle ("switch-dark");
    if(document.body.classList.contains("body-dark")){
        localStorage.setItem("modo-oscuro", JSON.stringify(true))
    }else{
        localStorage.setItem("modo-oscuro", JSON.stringify(false))
    }
});

window.addEventListener('load', ()=> {
    document.body.classList.remove("preload")
});

actualizarProductos ();
cargarProducto ();
modo();
