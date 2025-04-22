document.addEventListener("DOMContentLoaded", function () {
    fetch("json/producto.json")
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error("Error al cargar los productos:", error));
});

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos-container");

    productos.forEach(producto => {
        let productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p><strong>Precio:</strong> ₡${producto.precio}</p>
                <div class="botones-producto">
                    <button class="btn-comprar" onclick="verProducto(${producto.id})">Ver Producto</button>
                    <button class="btn-carrito" onclick='agregarAlCarrito(${JSON.stringify(producto)})'>Agregar al Carrito</button>
                </div>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

function verProducto(id) {
    window.location.href = `Detalles.html?id=${id}`;
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(p => p.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    if (document.getElementById("carrito-items")) {
        actualizarCarritoHTML();
        mostrarCarrito();
    }
}


