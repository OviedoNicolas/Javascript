let nombreUsuario = JSON.parse(localStorage.getItem("usuario"));
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
const mensajeContainer = document.querySelector ("#mensaje");
const botonSwitch = document.querySelector ("#switch");
const climaContainer = document.querySelector ("#clima-container")
const botonClima = document.querySelector ("#clima-boton");

class Venta {
    constructor (id, cliente, producto){
        this.id = id
        this.cliente = cliente;
        this.producto = producto;
    };
};

/*  Funciones    */

// crear nombre de usuario
function getUsuario () {
    (async () => {
        const { value: nombre } = await Swal.fire({
            title: 'Ingrese su nombre de Usuario',
            input: 'text',
            inputPlaceholder: 'Nombre',
            allowOutsideClick : false,
            allowEscapeKey : false,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === "") {
                    resolve('Tenes que ingresar un nombre')
                    } else {
                    resolve()
                    }
                })
            }
        });
        if(nombre){
            Swal.fire(`Hola ${nombre} te damos la bienvenida!!!`)
        }
        localStorage.setItem ("usuario", JSON.stringify(nombre));
        mensajeInicio(nombre)
    })();
};

// verificar si hay nombre de usuario
function iniciarPagina (){
    nombreUsuario ? mensajeInicio(nombreUsuario) : getUsuario ();
}

// mensaje de inicio de pagina
function mensajeInicio (usuario) {
    mensajeContainer.innerHTML = ""
    let mensaje = document.createElement ("p")
    if (productosAlmacenados.length == 0 && clientesAlmacenados.length == 0){
        mensaje.innerHTML = `
        <h2 class="mano">${usuario} todavía no tenes <span>productos</span> ni <span>clientes</span>  para empezar a armar tus ventas!!!</h2>`
    } else if (productosAlmacenados.length == 0 && clientesAlmacenados.length != 0){
        mensaje.innerHTML = `
        <h2 class="mano">${usuario} todavía no tenes <span>productos</span> para empezar a armar tus ventas!!!</h2>`
    } else if (productosAlmacenados.length != 0 && clientesAlmacenados.length == 0) {
        mensaje.innerHTML = `
        <h2 class="mano">${usuario} todavía no tenes <span>clientes</span> para empezar a armar tus ventas!!!</h2>`
    }  else {
        mensaje.innerHTML = `
        <h2 class="mano">${usuario} empezá a armar tus ventas!!!</h2>`
    }
    mensajeContainer.append (mensaje);
};

// tranforma ventas en las ventas que haya en el localstorage
function actualizarVentas (){
    ventasAlmacenadas ? ventas = ventasAlmacenadas : ventas = [];
};

function crearVenta (){
    let clienteRepetido = agregarClienteLista.options[agregarClienteLista.selectedIndex].value;
    if(ventas.some(venta => venta.cliente.nombreCompleto.includes(clienteRepetido))){
        let ventaActualizar = ventas.find(venta => venta.cliente.nombreCompleto.includes(clienteRepetido))
        let productosASumar = unificarProductoRepetido(productoVenta())
        let ventaActualizada = unificarProductoRepetido(ventaActualizar.producto.concat(productosASumar));
        ventaActualizar.producto = ventaActualizada
    } else{
        ventas.push(new Venta( Math.random(), clienteVenta() , unificarProductoRepetido(productoVenta())));
    };
};

// crear opciones de seleccion cliente
function crearListaClientes (){
    clientesAlmacenados.forEach(cliente => {
    let option = document.createElement ("option");
    option.innerHTML = `
    <option class="opcion-valor" value="${cliente.nombre}" id="${cliente.id}">${cliente.nombreCompleto}</option>
    `;
    agregarClienteLista.append (option);
});
};

// crear opciones de seleccion producto
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
    let cantidad = [];
    const agregarProductoContador = document.querySelectorAll (".contador-cantidad");
    agregarProductoContador.forEach(i =>{
        cantidad.push(Number(i.value));
    });
    let productosASumar = [] ;
    let agregarMasDeUnProductos = document.querySelectorAll (".mas-productos")
    agregarMasDeUnProductos.forEach( i =>{
        productosASumar.push({...productosAlmacenados.find(producto => producto.nombre == i.value)})
    });
    for( n = 0; n < productosASumar.length; n++){
        productosASumar[n].cantidad = cantidad[n];
    };
    return productosASumar;
};

function unificarProductoRepetido (array){
    let unificar = array.reduce((acumulador,productoActual) =>{
        let productoRepetido = acumulador.find( producto => producto.id == productoActual.id);
        if(productoRepetido){
            return acumulador.map((producto) => {
                if (producto.id === productoActual.id){
                    return{
                        ...producto,
                        cantidad: producto.cantidad + productoActual.cantidad
                    };
                };
                return producto;
            });
        }
        return [...acumulador, productoActual];
    }, []);
        return (unificar);
}

function crearBotonesEliminarVenta () {
    botonesEliminarVenta = document.querySelectorAll (".botonEliminar");
    botonesEliminarVenta.forEach(boton =>{
        boton.addEventListener("click", eliminarVenta);
    })
};

function eliminarVenta (e){
    const botonVentaEliminar = e.currentTarget.id;
    const ventaAEliminar = ventas.findIndex (venta => venta.id == botonVentaEliminar);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Venta eliminada correctamente',
        showConfirmButton: false,
        timer: 1200
    });
    setTimeout( ()=>{
        ventas.splice(ventaAEliminar, 1);
        cargarVenta ();
    }, 900);
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
            <p>${total.reduce((a, b) => a + b)}</p>
        </div>
        <img src="/images/x-circle.svg" class="boton-principal botonEliminar" id="${venta.id}" alt="boton eliminar">
        `;
        resumenContainer.append (impresion);
    })
    localStorage.setItem ("ventas", JSON.stringify(ventas));
    crearBotonesEliminarVenta();
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


botonSumarProducto.addEventListener ("click", (e) =>{
    e.preventDefault();
    agregarProducto.append(agregarProductoConjunto.cloneNode (true));
});

botonAceptar.addEventListener ("click", (e) => {
    e.preventDefault();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Venta creada correctamente',
        showConfirmButton: false,
        timer: 1300
    });
    setTimeout( () => {
        crearVenta();
        localStorage.setItem ("ventas", JSON.stringify(ventas));
        location.reload();
    }, 900);
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

botonClima.addEventListener("click", () =>{
    climaContainer.classList.toggle("active");
})

window.addEventListener('load', ()=> {
    document.body.classList.remove("preload")
    let lon
    let lat
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=f9566d601706b4839ebd119175cff709`;

            fetch(url)
            .then( response => {return response.json()})
            .then( data => {
                for(i = 0; i<5; i++){
                    document.getElementById("dia" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min).toFixed(1)+ "°";
                    document.getElementById("dia" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max).toFixed(2) + "°";
                    let temperaturaDescripcion = document.getElementById("dia" +(i+1) + "-descripcion");
                    let desc = data.list[i].weather[0].description;
                    temperaturaDescripcion.textContent = desc.charAt(0).toUpperCase()+desc.slice(1);
                    let iconoAnimado = document.getElementById("img" + (i+1));
                    switch (data.list[i].weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src='animated/thunder.svg'
                            break;
                        case 'Drizzle':
                            iconoAnimado.src='images/rainy-2.svg'
                            break;
                        case 'Rain':
                            iconoAnimado.src='images/rainy-7.svg'
                            break;
                        case 'Snow':
                            iconoAnimado.src='images/snowy-6.svg'
                            break;
                        case 'Clear':
                            iconoAnimado.src='images/day.svg'
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src='images/weather.svg'
                            break;
                        case 'Clouds':
                            iconoAnimado.src='images/cloudy-day-1.svg'
                            break;
                        default:
                            iconoAnimado.src='images/cloudy-day-1.svg'
                    }
                }
            })
            .catch(err => {
                climaContainer.classList.add("oculto");
                botonClima.classList.add("oculto")
            })
        })
    }
})

var nuevoDia = new Date();
var semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",];

function diaSemana(dia){
    if(dia + nuevoDia.getDay() > 6){
        return dia + nuevoDia.getDay() - 7;
    }
    else{
        return dia + nuevoDia.getDay();
    }
}

for(i = 0; i<5; i++){
    document.getElementById("dia" + (i+1)).innerHTML = semana[diaSemana(i)];
}

iniciarPagina();
crearListaClientes();
crearListaProductos();
actualizarVentas();
cargarVenta();
modo();


const typed = new Typed(".typed", {
    strings: ["<h2>Ajrej</h2>" , "<h2>Agregar Cliente</h2>"],

});