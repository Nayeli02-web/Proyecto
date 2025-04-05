document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get("id"));

    fetch("json/producto.json")
        .then(response => response.json())
        .then(productos => {
            const producto = productos.find(p => p.id === idProducto);
            if (producto) {
                mostrarDetalle(producto);
            } else {
                document.getElementById("detalle-producto").innerHTML = "<p>Producto no encontrado.</p>";
            }
        })
        .catch(error => console.error("Error al cargar detalles:", error));
});

function mostrarDetalle(producto) {
    const contenedor = document.getElementById("detalle-producto");
    contenedor.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-5 text-center">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail mb-3" style="max-width: 300px;">
            </div>
            <div class="col-md-6">
                <h2>${producto.nombre}</h2>
                <p><strong>Precio:</strong> ₡${producto.precio.toLocaleString()}</p>
                <p><strong>Descripción:</strong> ${producto.detalles}</p>
                <p><strong>Envoltura:</strong> ${producto.envoltura}</p>
                <p><strong>Tamaño:</strong> ${producto.tamaño}</p>
                <p> ${producto.disponibilidad}</p>
                <a href="Productos.html" class="btnVolver">Volver</a>
            </div>
        </div>
    `;
}

