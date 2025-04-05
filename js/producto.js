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
                <button class="btn-comprar" onclick="verProducto(${producto.id})">Ver Producto</button>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

function verProducto(id) {
    window.location.href = `Detalles.html?id=${id}`;
}

