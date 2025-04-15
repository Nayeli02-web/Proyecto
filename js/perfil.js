document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (!user || localStorage.getItem("sesionIniciada") !== "true") {
    alert("Acceso no autorizado. Inicie sesión primero.");
    window.location.href = "Login.html";
    return;
  }

  document.getElementById("correo").value = user.email;
  document.getElementById("nombre").value = user.nombre;
  document.getElementById("apellidos").value = user.apellidos;

  document.getElementById("envioCorreo").value = user.email;
  document.getElementById("envioNombre").value = user.nombre;
  document.getElementById("envioApellidos").value = user.apellidos;
});

const provinciaSelect = document.getElementById("provincia");
const cantonSelect = document.getElementById("canton");
const distritoSelect = document.getElementById("distrito");

let ubicaciones = {};

function cargarProvincias() {
  for (const provincia in ubicaciones) {
    const option = document.createElement("option");
    option.value = provincia;
    option.textContent = provincia;
    provinciaSelect.appendChild(option);
  }

  provinciaSelect.addEventListener("change", () => {
    cargarCantones(provinciaSelect.value);
    distritoSelect.innerHTML = `<option value="">Seleccione distrito</option>`;
  });
}

function cargarCantones(provincia) {
  cantonSelect.innerHTML = `<option value="">Seleccione cantón</option>`;
  const cantones = ubicaciones[provincia];
  for (const canton in cantones) {
    const option = document.createElement("option");
    option.value = canton;
    option.textContent = canton;
    cantonSelect.appendChild(option);
  }

  cantonSelect.addEventListener("change", () => {
    cargarDistritos(provinciaSelect.value, cantonSelect.value);
  });
}

function cargarDistritos(provincia, canton) {
  distritoSelect.innerHTML = `<option value="">Seleccione distrito</option>`;
  const distritos = ubicaciones[provincia][canton];
  for (const distrito of distritos) {
    const option = document.createElement("option");
    option.value = distrito;
    option.textContent = distrito;
    distritoSelect.appendChild(option);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("btnGuardarPerfil");
  const datosGuardados = JSON.parse(localStorage.getItem("perfilUsuario"));

  fetch("json/lugares.json")
    .then(response => response.json())
    .then(data => {
      ubicaciones = data;
      cargarProvincias();

      if (datosGuardados) {
        document.getElementById("telefono").value = datosGuardados.telefono || "";
        document.getElementById("direccion").value = datosGuardados.direccion || "";
        document.getElementById("codigoPostal").value = datosGuardados.codigoPostal || "";

        provinciaSelect.value = datosGuardados.provincia;
        cargarCantones(datosGuardados.provincia);

          setTimeout(() => {
          cantonSelect.value = datosGuardados.canton;
          cargarDistritos(datosGuardados.provincia, datosGuardados.canton);

          setTimeout(() => {
            distritoSelect.value = datosGuardados.distrito;
          }, 100);
        }, 100);
      }
    });

  btnGuardar.addEventListener("click", () => {
    const datosPerfil = {
      telefono: document.getElementById("telefono").value,
      direccion: document.getElementById("direccion").value,
      provincia: provinciaSelect.value,
      canton: cantonSelect.selectedIndex > 0 ? cantonSelect.value : "",
      distrito: distritoSelect.selectedIndex > 0 ? distritoSelect.value : "",
      codigoPostal: document.getElementById("codigoPostal").value,
    };

    localStorage.setItem("perfilUsuario", JSON.stringify(datosPerfil));
    alert("Información guardada correctamente.");
  });
});