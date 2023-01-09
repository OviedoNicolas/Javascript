/* Arrays traidos desde el LocalStorage*/
const productosAlmacenados = JSON.parse(localStorage.getItem("listaProductos"));
const clientesAlmacenados = JSON.parse(localStorage.getItem("listaClientes"));

/* Elementos traidos desde el html      ``  */ 
const agregarClienteLista = document.querySelector ("#agregar-cliente-lista");
const agregarProducto = document.querySelector ("#agregar-producto")
const agregarProductoLista = document.querySelector (".agregar-producto-lista");
const sumarProducto = document.querySelector ("#sumar-producto")

function crearListaClientes (){
    clientesAlmacenados.forEach(cliente => {
    let option = document.createElement ("option");
    option.innerHTML = `
    <option value="${cliente.nombre}">${cliente.nombre} ${cliente.apellido}</option>
    `;
    agregarClienteLista.append (option);
});
};

function crearListaProductos (){
    productosAlmacenados.forEach(producto => {
        let option = document.createElement ("option");
        option.innerHTML = `
        <option value="${producto.nombre}">${producto.nombre}</option>
        `
        agregarProductoLista.append (option)
    });
};

sumarProducto.addEventListener ("click", (e) =>{
    e.preventDefault ()
    agregarProducto.append(agregarProductoLista.cloneNode (true))
})

crearListaClientes();
crearListaProductos();