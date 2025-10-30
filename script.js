const contenedor = document.getElementById("contenedor-productos");
const btnAgregarProducto = document.getElementById("btnAgregarProducto");
const formulario = document.getElementById("formulario");
const btnGuardarProducto = document.getElementById("btnGuardarProducto");
const btnCancelar = document.getElementById("btnCancelar");

let productos = []; 


fetch("products.json")
  .then(response => response.json())
  .then(data => {
    productos = data; 
    cargarProductos(); 
  })
  .catch(error => console.log("Error al cargar el JSON:", error));


function cargarProductos() {
    contenedor.innerHTML = ""; 
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="btnEliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}


function eliminarProducto(id) {
    productos = productos.filter(producto => producto.id !== id);
    cargarProductos(); 
}

btnAgregarProducto.addEventListener("click", () => {
    formulario.style.display = "block"; 
});


btnCancelar.addEventListener("click", () => {
    formulario.style.display = "none"; 
});


btnGuardarProducto.addEventListener("click", () => {
    const nombre = document.getElementById("nombreProducto").value;
    const precio = parseFloat(document.getElementById("precioProducto").value);
    const imagen = document.getElementById("imagenProducto").value;

    if (nombre && precio && imagen) {
        const nuevoProducto = {
            id: productos.length + 1, 
            nombre: nombre,
            precio: precio,
            imagen: imagen
        };
        productos.push(nuevoProducto); 
        cargarProductos(); 
        formulario.style.display = "none"; 
    } else {
        alert("Por favor, completa todos los campos.");
    }
});
