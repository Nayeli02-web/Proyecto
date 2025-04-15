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

fetch("json/lugares.json")
  .then(response => response.json())
  .then(data => {
    ubicaciones = data;
    cargarProvincias();
  });

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
