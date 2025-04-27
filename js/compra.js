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


const vistaCVV = document.getElementById('vistaCVV');
const svgNumero = document.getElementById('svgNumero');
const svgNombre = document.getElementById('svgNombre');
const svgFecha = document.getElementById('svgFecha');
const logoMarca = document.getElementById('logoMarca');

document.getElementById('numeroTarjeta').addEventListener('input', e => {
    const valorFormateado = e.target.value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();

    e.target.value = valorFormateado;
    svgNumero.textContent = valorFormateado || '#### #### #### ####';

    const numeroLimpio = valorFormateado.replace(/\s/g, '');

    if (numeroLimpio.startsWith('4')) {
        logoMarca.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg';
        logoMarca.style.display = 'block';
    } else if (/^5[1-5]/.test(numeroLimpio)) {
        logoMarca.src = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png';
        logoMarca.style.display = 'block';
    } else if (/^3[47]/.test(numeroLimpio)) {
        logoMarca.src = 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg';
        logoMarca.style.display = 'block';
    } else if (/^6(?:011|5)/.test(numeroLimpio)) {
        logoMarca.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Discover_Card_logo.svg';
        logoMarca.style.display = 'block';
    } else {
        logoMarca.src = '';
        logoMarca.style.display = 'none';
    }
});


document.getElementById('nombreTarjeta').addEventListener('input', e => {
    svgNombre.textContent = e.target.value.toUpperCase() || 'NOMBRE COMPLETO';
});

document.getElementById('fechaVencimiento').addEventListener('input', e => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 2) valor = valor.slice(0, 2) + '/' + valor.slice(2);
    e.target.value = valor;
    svgFecha.textContent = valor || 'MM/AA';
});


document.getElementById('cvv').addEventListener('focus', () => {
    tarjeta.classList.add('show-back');
});

document.getElementById('cvv').addEventListener('blur', () => {
    tarjeta.classList.remove('show-back');
});

document.getElementById('cvv').addEventListener('input', e => {
    const valor = e.target.value.replace(/\D/g, '').slice(0, 3);
    e.target.value = valor;
    vistaCVV.textContent = valor || 'CVV';
});

function validarLuhn(numero) {
    const arr = numero.replace(/\s/g, '').split('').reverse().map(n => parseInt(n));
    let suma = 0;
    for (let i = 0; i < arr.length; i++) {
        let n = arr[i];
        if (i % 2 !== 0) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        suma += n;
    }
    return suma % 10 === 0;
}

document.getElementById('btnFinalizar').addEventListener('click', () => {
    const numero = document.getElementById('numeroTarjeta').value;
    const nombre = document.getElementById('nombreTarjeta').value;
    const fecha = document.getElementById('fechaVencimiento').value;
    const cvv = document.getElementById('cvv').value;

    if (!validarLuhn(numero)) {
        alert('Número de tarjeta inválido.');
        return;
    }

});
const modalTarjeta = document.getElementById('modalTarjeta');
const modalExito = document.getElementById('modalExito');
const btnContinuar = document.getElementById('btnContinuar');
const btnFinalizar = document.getElementById('btnFinalizar');
const cerrarModal = document.getElementById('cerrarModal');

btnContinuar.addEventListener('click', () => {
    modalTarjeta.style.display = 'block';
});

cerrarModal.addEventListener('click', () => {
    modalTarjeta.style.display = 'none';
});

btnFinalizar.addEventListener('click', () => {
    const numero = document.getElementById('numeroTarjeta').value;
    const nombre = document.getElementById('nombreTarjeta').value;
    const fecha = document.getElementById('fechaVencimiento').value;
    const cvv = document.getElementById('cvv').value;

    if (!validarLuhn(numero)) {
        alert('Número de tarjeta inválido.');
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const perfil = JSON.parse(localStorage.getItem("perfilUsuario"));
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    fetch('http://localhost:3000/enviar-factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: `${usuario.nombre} ${usuario.apellidos}`,
            email: usuario.email,
            telefono: perfil.telefono,
            direccion: `${perfil.direccion}, ${perfil.distrito}, ${perfil.canton}, ${perfil.provincia}, CP: ${perfil.codigoPostal}`,
            carrito,
            total
        })
    })


        .then(data => {
            console.log(data.message);

            localStorage.removeItem('carrito');
            document.getElementById('listaProductos').innerHTML = '';
            modalTarjeta.style.display = 'none';
            modalExito.style.display = 'block';

            setTimeout(() => {
                modalExito.style.display = 'none';
                modalFormularioMensaje.show();
            }, 1500);
        })

        .catch(error => {
            console.error('Error al enviar correo:', error);
            alert('Ocurrió un error al enviar la factura por correo.');
        });
})

document.addEventListener('DOMContentLoaded', () => {
    const sesionIniciada = localStorage.getItem("sesionIniciada");

    document.getElementById("btnContinuar").addEventListener("click", () => {
        if (sesionIniciada !== "true") {
            alert("Debes iniciar sesión para continuar con la compra.");
            window.location.href = "Login.html";
        } else {
            document.querySelector(".card-container").style.display = "block";
        }
    });
});

