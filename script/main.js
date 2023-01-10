// La idea de este proyecto es armar una aplicacion para los vendedores autonomos que hacen la entrega ellos mismos, para ello tiene un seccion cliente donde se pueden crear los clientes y una de productos con el mismo fin, teniendo un seccion principal donde se puedan armar los pedidos relacionando ambas informaciones

const productosAlmacenados = JSON.parse(localStorage.getItem("listaProductos"));
const clientesAlmacenados = JSON.parse(localStorage.getItem("listaClientes"));

/* Elementos traidos desde el html      ``  */ 
const agregarClienteLista = document.querySelector ("#agregar-cliente-lista");
const agregarProducto = document.querySelector ("#agregar-producto");
const agregarProductoLista = document.querySelector (".agregar-producto-lista");
const botonAceptar = document.querySelector ("#boton-aceptar");
const resumenContainer = document.querySelector ("#ventas-impresion");
const resumenProducto = document.querySelector (".ventas-resumen-productos");
const resumenCliente = document.querySelector (".ventas-resumen-cliente");


/*  Funciones    */

function crearListaClientes (){
    clientesAlmacenados.forEach(cliente => {
    let option = document.createElement ("option");
    option.innerHTML = `
    <option class="opcion-valor" value="${cliente.nombre}" id="${cliente.id}">${cliente.nombreCompleto}</option>
    `;
    agregarClienteLista.append (option);
});
};

function crearListaProductos (){
    productosAlmacenados.forEach(producto => {
        let option = document.createElement ("option");
        option.innerHTML = `
        <option  value="${producto.nombre}" id="${producto.id}">${producto.nombre}</option>
        `;
        agregarProductoLista.append (option);
    });
};

function imprimirResumen () {

    const agregarProductoContador = document.querySelector (".contador-cantidad");
    let clienteSeleccionado = agregarClienteLista.options[agregarClienteLista.selectedIndex].value;
    let clienteAImprimir = clientesAlmacenados.find(cliente => cliente.nombreCompleto.includes(clienteSeleccionado));
    let productoSeleccionado = agregarProductoLista.options[agregarProductoLista.selectedIndex].value;
    let productoAImprimir = productosAlmacenados.find(producto => producto.nombre == productoSeleccionado);

    let impresion = document.createElement ("div");
    impresion.classList.add ("ventas-resumen");
    impresion.innerHTML = `
            <div>
                <h3>Cliente</h3>
                <p>${clienteAImprimir.nombreCompleto}</p>
            </div>
            <div>
                <h3>Dirección</h3>
                <p>${clienteAImprimir.direccion}</p>
            </div>
            <div>
                <h3>Teléfono</h3>
                <p>${clienteAImprimir.telefono}</p>
            </div>
            <div>
                <h3>Producto</h3>
                ${productoAImprimir.nombre}
            </div>
            <div>
                <h3>Cantidad</h3>
                ${agregarProductoContador.value}
            </div>
            <div>
                <h3>Total</h3>
                ${productoAImprimir.precio * agregarProductoContador.value}
            </div>
    `;
            resumenContainer.append (impresion);
            console.log(agregarProductoContador)
    }

botonAceptar.addEventListener ("click", (e) => {
    e.preventDefault()
    imprimirResumen()
});

crearListaClientes();
crearListaProductos();
