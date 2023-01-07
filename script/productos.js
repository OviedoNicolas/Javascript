const productos = [];

class Producto {
    constructor (nombre, precio, stock,){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}
/* Elementos traidos desde el html      ``  */ 
const productosContainer = document.querySelector ("#productos-container");
const getProductoNombre = document.querySelector ("#get-producto");
const getProductoPrecio = document.querySelector ("#get-precio");
const getProductoStock = document.querySelector ("#get-stock");
const getProductoAceptar = document.querySelector ("#producto-aceptar");


/* Funciones*/

function crearProducto(){
    productos.push (new Producto(getProductoNombre.value, getProductoPrecio.value, getProductoPrecio.value))
};

function cargarProducto (){
    productosContainer.innerHTML = ""
    productos.forEach(producto => {
        div = document.createElement ("div");
        div.innerHTML = `                
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <p>${producto.stock}</p>
            <button>Editar</button>
            <button>Eliminar</button>
        `;
        productosContainer.append (div)
    })
    localStorage.setItem ("listaProductos", JSON.stringify(productos))
};


/* Eventos */

getProductoAceptar.addEventListener ("click", () => {
    crearProducto ();
    cargarProducto ();
})

console.log (productos)