/* Arrays traidos desde el LocalStorage*/
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
















































// function imprimirCantidad () {
//     let agregarProductoPrueba = document.querySelectorAll (".prueba");
//     let test = document.querySelector (".test")
//     agregarProductoPrueba.forEach ( item => {
//         let impresion = document.createElement ("p");
//         return impresion.innerHTML = `
//         <p>${item.value}</p>`
//     })
// }

// console.log (imprimirCantidad())

// function imprimirResumen (){
//     let impresionResumen = document.createElement ("div");
//     impresionResumen.classList.add ("venta-resumen");
//     impresionResumen.innerHTML = ` `
//     resumenContainer.append (impresionResumen)
// };

// function imprimirCliente () {
//     let resumen = document.querySelector ("venta-resumen");
//     // esta linea obtiene el valor del select
//     let clienteSeleccionado = agregarClienteLista.options[agregarClienteLista.selectedIndex].value;
//     // esta linea busca coincidencia en el array
//     let clienteAImprimir = clientesAlmacenados.find(cliente => cliente.nombreCompleto.includes(clienteSeleccionado));
//     let impresionCliente = document.createElement ("div");
//     impresionCliente.classList.add ("ventas-resumen-cliente");
//     impresionCliente.innerHTML = `
//             <div>
//                 <h3>Cliente</h3>
//                 <p>${clienteAImprimir.nombreCompleto}</p>
//             </div>
//             <div>
//                 <h3>Dirección</h3>
//                 <p>${clienteAImprimir.direccion}</p>
//             </div>
//             <div>
//                 <h3>Teléfono</h3>
//                 <p>${clienteAImprimir.telefono}</p>
//             </div>
// `;
//         resumen.append (impresionCliente);
// }

// function imprimirProducto () {
//     let resumen = document.querySelector ("venta-resumen");
//     let productoSeleccionado = agregarProductoLista.options[agregarProductoLista.selectedIndex].value;
//     let productoAImprimir = productosAlmacenados.find(producto => producto.nombre == productoSeleccionado);
//     console.log (productoAImprimir);
//     let impresionProducto = document.createElement ("div");
//     impresionProducto.classList.add ("ventas-resumen-productos");
//     impresionProducto.innerHTML = `
//         <div>
//             <h3>Producto</h3>
//             <p>${productoAImprimir.nombre}</p>
//         </div>
// `;
//         resumen.append (impresionProducto);
// };








    // function imprimirResumen () {
    //     let clienteSeleccionado = agregarClienteLista.options[agregarClienteLista.selectedIndex].value;
    //     let clienteAImprimir = clientesAlmacenados.find(cliente => cliente.nombreCompleto.includes(clienteSeleccionado));
    //     console.log (clienteAImprimir);
    //     let productoSeleccionado = agregarProductoLista.options[agregarProductoLista.selectedIndex].value;
    //     let productoAImprimir = productosAlmacenados.find(producto => producto.nombre == productoSeleccionado);
    //     console.log (productoAImprimir);
    //     let impresion = document.createElement ("div");
    //     impresion.classList.add ("ventas-resumen");
    //     impresion.innerHTML = `
    //             <div>
    //                 <h3>Cliente</h3>
    //                 <p>${clienteAImprimir.nombre}</p>
    //             </div>
    //             <div>
    //                 <h3>Dirección</h3>
    //                 <p>${clienteAImprimir.direccion}</p>
    //             </div>
    //             <div>
    //                 <h3>Teléfono</h3>
    //                 <p>${clienteAImprimir.telefono}</p>
    //             </div>
    //             <div>
    //             <h3>Producto</h3>
    //             <p>${productoAImprimir.nombre}</p>
    //         </div>
    //         <div>
    //             <h3>Cantidad</h3>
    //             <p>3</p>
    //             <p>1</p>
    //         </div>
    //         <div>
    //             <h3>Subtotal</h3>
    //             <p>$${productoAImprimir.precio * 3}</p>
    //         </div>
    //         <div>
    //             <h3>Total</h3>
    //             <p>$${productoAImprimir.precio * 10}</p>
    //         </div>
    // `;
    //         resumenContainer.append (impresion);
    // }