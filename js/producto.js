document.addEventListener("DOMContentLoaded", function () {
    fetch("json/producto.json") 
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error("Error al cargar los productos:", error));

       const botonCarrito = document.getElementById("abrir-carrito");
        if (botonCarrito) {
            botonCarrito.addEventListener("click", (e) => {
                e.preventDefault(); 
                actualizarCarritoHTML(); 
                mostrarCarrito();
            });
        }

        const btnProcederCompra = document.getElementById("btnProcederCompra");
        if (btnProcederCompra) {
            btnProcederCompra.addEventListener("click", () => {
                window.location.href = "DatosCompra.html";
            });
        }
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

    actualizarCarritoHTML();
    mostrarCarrito(); 
}

function actualizarCarritoHTML() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-items");
    const total = document.getElementById("carrito-total");

    contenedor.innerHTML = "";
    let totalGeneral = 0;

    carrito.forEach(producto => {
        totalGeneral += producto.precio * producto.cantidad;

        contenedor.innerHTML += `
        <div class="carrito-item mb-3 p-2 border rounded d-flex gap-3 align-items-start">
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
        <div>
            <h5>${producto.nombre}</h5>
            <p>₡${producto.precio}</p>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-secondary" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                <span>${producto.cantidad}</span>
                <button class="btn btn-sm btn-secondary" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
            </div>
            <button class="btn btn-danger btn-sm mt-2" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </div>
    </div>
`;

    });

    total.textContent = `₡${totalGeneral}`;
}

function mostrarCarrito() {
    document.getElementById("carrito-container").style.display = "block";
}

function cerrarCarrito() {
    document.getElementById("carrito-container").style.display = "none";
}

function cambiarCantidad(id, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.id === id);

    if (index !== -1) {
        carrito[index].cantidad += cantidad;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarritoHTML();
    }
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoHTML();
}


