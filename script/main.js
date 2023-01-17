let ventas;
const ventasAlmacenadas = JSON.parse(localStorage.getItem("ventas"));
/* Arrays traidos desde el LocalStorage*/
const productosAlmacenados = JSON.parse(localStorage.getItem("listaProductos"));
const clientesAlmacenados = JSON.parse(localStorage.getItem("listaClientes"));

/* Elementos traidos desde el html      ``  */ 
const agregarClienteLista = document.querySelector ("#agregar-cliente-lista");
const agregarProducto = document.querySelector ("#agregar-producto");
const agregarProductoConjunto = document.querySelector (".agregar-producto-conjunto");
const agregarProductoLista = document.querySelector (".agregar-producto-lista");
const botonSumarProducto = document.querySelector ("#sumar-producto");
const botonAceptar = document.querySelector ("#boton-aceptar");
const resumenContainer = document.querySelector ("#ventas-impresion");
const resumenProducto = document.querySelector (".ventas-resumen-productos");
const resumenCliente = document.querySelector (".ventas-resumen-cliente");

class Venta {
    constructor (id, cliente, producto){
        this.id = id
        this.cliente = cliente;
        this.producto = producto;
    };
};

/*  Funciones    */

function actualizarVentas (){
    ventasAlmacenadas ? ventas = ventasAlmacenadas : ventas = [];
};

function crearVenta (){
    ventas.push(new Venta( Math.random(), clienteVenta (),productoVenta ()));
};

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

function clienteVenta (){
    let clienteSeleccionado = agregarClienteLista.options[agregarClienteLista.selectedIndex].value;
    let clienteASumar = clientesAlmacenados.find(cliente => cliente.nombreCompleto.includes(clienteSeleccionado));
    return clienteASumar;
};

function productoVenta (){
    let productosASumar = [] ;
    let agregarMasDeUnProductos = document.querySelectorAll (".mas-productos")
    agregarMasDeUnProductos.forEach(i =>{
        productosASumar.push(productosAlmacenados.find(producto => producto.nombre == i.value))
    });
    let cantidad = [];
    const agregarProductoContador = document.querySelectorAll (".contador-cantidad");
    agregarProductoContador.forEach(i =>{
        cantidad.push(i.value);
    });
    for( n = 0; n < productosASumar.length; n++){
        productosASumar[n].cantidad = cantidad[n];
    };
    return productosASumar;
};

function crearBotonesEliminarVenta () {
    botonesEliminarVenta = document.querySelectorAll (".botonEliminar");
    botonesEliminarVenta.forEach(boton =>{
        boton.addEventListener("click", eliminarVenta);
    })
};

function eliminarVenta (e){
    const botonVentaEliminar = e.currentTarget.id;
    const ventaAEliminar = ventas.findIndex (venta => venta.id == botonVentaEliminar);
    ventas.splice(ventaAEliminar, 1);
    cargarVenta ();
}

function cargarVenta (){
    resumenContainer.innerHTML = "";
    ventas.forEach (venta => {
        let productosAImprimir = [];
        for (i=0; i < venta.producto.length; i++ ){
            productosAImprimir.push(`<p>${venta.producto[i].nombre}</p>`);
        };
        let cantidadAImprimir = [];
        for (i=0; i < venta.producto.length; i++ ){
            cantidadAImprimir.push(`<p>${venta.producto[i].cantidad}</p>`);
        };
        let total = [0]
        let subtotalAImprimir = [];
        for (i=0; i < venta.producto.length; i++ ){
            total.push(Number(venta.producto[i].cantidad)*(venta.producto[i].precio))
            subtotalAImprimir.push(`<p>${(venta.producto[i].cantidad)*(venta.producto[i].precio)}</p>`);
        };

        let impresion = document.createElement ("div");
        impresion.classList.add ("ventas-resumen");
        impresion.innerHTML = `
        <div>
            <h3>Cliente</h3>
            <p>${venta.cliente.nombreCompleto}</p>
        </div>
        <div>
            <h3>Dirección</h3>
            <p>${venta.cliente.direccion}</p>
        </div>
        <div>
            <h3>Teléfono</h3>
            <p>${venta.cliente.telefono}</p>
        </div>
        <div>
            <h3>Producto</h3>
            ${productosAImprimir.join("")}
        </div>
        <div>
            <h3>Cantidad</h3>
            ${cantidadAImprimir.join("")}
        </div>
        <div>
            <h3>Subtotal</h3>
            ${subtotalAImprimir.join("")}
        </div>
        <div>
            <h3>Total</h3>
            ${total.reduce((a, b) => a + b)}
        </div>
        <button class="botonEliminar" id="${venta.id}">Eliminar</button>
        `;
        resumenContainer.append (impresion);
    })
    localStorage.setItem ("ventas", JSON.stringify(ventas));
    crearBotonesEliminarVenta();
};


botonSumarProducto.addEventListener ("click", (e) =>{
    e.preventDefault()
    agregarProducto.append(agregarProductoConjunto.cloneNode (true));
});

botonAceptar.addEventListener ("click", (e) => {
    e.preventDefault();
    crearVenta();
    localStorage.setItem ("ventas", JSON.stringify(ventas));
    location.reload();
});

crearListaClientes();
crearListaProductos();
actualizarVentas();
cargarVenta()






// function imprimirResumen () {



    

//     let agregarMasDeUnProductos = document.querySelectorAll (".mas-productos")
//     agregarMasDeUnProductos.forEach(i =>{
//         masDeUnProducto.push(`<p>${i.value} </p>`)
//     })
//     let masDeUnProductoImprimir = masDeUnProducto.join("")


//     const agregarProductoContador = document.querySelectorAll (".contador-cantidad");
//     agregarProductoContador.forEach(i =>{
//         masCantidad.push(`<p>${i.value}</p>`)
//         console.log(i.value)
//     })

//     let masCantidadImprimir = masCantidad.join("")
    

//     let subtotalImprimir = document.querySelectorAll (".mas-productos")
//     subtotalImprimir.forEach(i =>{
//         a =(productosAlmacenados.find(producto => producto.nombre.includes(i.value)))
//         console.log(a)
//     })

//     agregarProductoContador.forEach(i =>{
//         subtotal.push(`<p>$${i.value * productoAImprimir.precio}</p>`)
//     })

//     let total = subtotal.reduce((a, b) => a + b);

//     let impresion = document.createElement ("div");
//     impresion.classList.add ("ventas-resumen");
//     impresion.innerHTML = `
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
//             <div>
//                 <h3>Producto</h3>
//                 ${masDeUnProductoImprimir}
//             </div>
//             <div>
//                 <h3>Cantidad</h3>
//                 ${masCantidadImprimir}
//             </div>
//             <div>
//                 <h3>Precio</h3>
//                 <p>${productoAImprimir.precio}</p>
//             </div>
//             <div>
//                 <h3>Subtotal</h3>
//                 ${""}
//             </div>
//             <div>
//                 <h3>Total</h3>
//                 ${""}
//             </div>
//     `;
//             resumenContainer.append (impresion);
//     }





