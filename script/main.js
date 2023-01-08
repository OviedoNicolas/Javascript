/* Arrays traidos desde el LocalStorage*/

const productosAlmacenados = JSON.parse(localStorage.getItem("listaProductos"));
const clientesAlmacenados = JSON.parse(localStorage.getItem("listaClientes"));


const agregarClientehome = document.querySelector ("#agregar-cliente")


clientesAlmacenados.forEach(cliente => {
    let option = document.createElement ("option");
    option.innerHTML = `
    <option value="${cliente.nombre}">${cliente.nombre} ${cliente.apellido}</option>
    `
    agregarClientehome.append (option)
});