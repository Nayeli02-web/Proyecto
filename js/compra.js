document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const perfil = JSON.parse(localStorage.getItem("perfilUsuario"));
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!usuario || !perfil) {
        alert("Falta información del usuario. Redirigiendo al perfil...");
        window.location.href = "Perfil.html";
        return;
    }

    const infoUsuario = document.getElementById("infoUsuario");
    infoUsuario.innerHTML = `
        <h2>Datos del Usuario</h2>
        <p><strong>Nombre:</strong> ${usuario.nombre} ${usuario.apellidos}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Teléfono:</strong> ${perfil.telefono}</p>
        <p><strong>Dirección:</strong> ${perfil.direccion}, ${perfil.distrito}, ${perfil.canton}, ${perfil.provincia}</p>
        <p><strong>Código Postal:</strong> ${perfil.codigoPostal}</p>
        <hr/>
    `;

    const lista = document.getElementById("listaProductos");
    let total = 0;

    lista.innerHTML = `<h2>Productos en tu carrito</h2>`;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        lista.innerHTML += `
            <div>
                <strong>${producto.nombre}</strong> - ₡${producto.precio} x ${producto.cantidad} = ₡${producto.precio * producto.cantidad}
            </div>
        `;
    });

    lista.innerHTML += `<hr/><h3>Total: ₡${total}</h3>`;
});


document.getElementById("btnContinuar").addEventListener("click", () => {
    document.getElementById("modalTarjeta").style.display = "flex";
});

document.getElementById("btnFinalizar").addEventListener("click", () => {
    const nombreTarjeta = document.getElementById("nombreTarjeta").value;
    const numeroTarjeta = document.getElementById("numeroTarjeta").value;
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const cvv = document.getElementById("cvv").value;

    if (!nombreTarjeta || !numeroTarjeta || !fechaVencimiento || !cvv) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    enviarFactura(usuario.email, carrito, total);

    alert("¡Compra finalizada con éxito! Se ha enviado una factura a tu correo.");
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", function () {
    const btnContinuar = document.getElementById("btnContinuar");
    const modalTarjeta = document.getElementById("modalTarjeta");
    const btnFinalizar = document.getElementById("btnFinalizar");

    btnContinuar.addEventListener("click", function () {
        modalTarjeta.style.display = "block";
    });

    btnFinalizar.addEventListener("click", function () {
        const nombre = document.getElementById("nombreTarjeta").value;
        const numero = document.getElementById("numeroTarjeta").value;
        const fecha = document.getElementById("fechaVencimiento").value;
        const cvv = document.getElementById("cvv").value;

        if (!nombre || !numero || !fecha || !cvv) {
            alert("Por favor complete todos los campos de la tarjeta.");
            return;
        }

        alert("✅ ¡Pago realizado con éxito! La factura será enviada a su correo electrónico.");

        enviarFacturaPorCorreo();

        modalTarjeta.style.display = "none";
    });

    function enviarFacturaPorCorreo() {
        console.log("Factura enviada al correo del cliente (simulado)");
    }
});
