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
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> ₡${producto.precio}</p>
                <button onclick="verDetalle(${producto.id})" class="btn-detalle">Ver Detalle</button>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

function verDetalle(id) {
    window.location.href = `Detalles.html?id=${id}`; 
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get("id");

    fetch("json/producto.json")
        .then(response => response.json())
        .then(productos => {
            const producto = productos.find(p => p.id == productoId);
            if (producto) {
                mostrarDetalle(producto);
            } else {
                document.getElementById("detalle-container").innerHTML = "<p>Producto no encontrado.</p>";
            }
        })
        .catch(error => console.error("Error al cargar los detalles:", error));
});

function mostrarDetalle(producto) {
    const contenedor = document.getElementById("detalle-container");
    contenedor.innerHTML = `
        <div class="detalle-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <p><strong>Detalles:</strong> ${producto.detalles}</p>
            <p><strong>Precio:</strong> ₡${producto.precio}</p>
            <button onclick="window.history.back()" class="btn-volver">Volver</button>
        </div>
    `;
}

