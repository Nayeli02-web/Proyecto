// Registrar usuario
function registrar() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    const cumple = document.getElementById("cumple").value;
    const error = document.getElementById("error");
  
    if (!nombre || !apellidos || !email || !password || !confirmar) {
      error.textContent = "Todos los campos obligatorios deben estar completos.";
      return;
    }
  
    if (password !== confirmar) {
      error.textContent = "Las contraseñas no coinciden.";
      return;
    }
  
    // Guardar en localStorage
    const user = {
      nombre,
      apellidos,
      email,
      password,
      cumple
    };
  
    localStorage.setItem("usuario", JSON.stringify(user));
    alert("¡Cuenta creada con éxito!");
    window.location.href = "Login.html";
  }
  
  // Iniciar sesión
  function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");
  
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
  
    if (!storedUser) {
      error.textContent = "No hay cuenta registrada. Crea una cuenta primero.";
      return;
    }
  
    if (storedUser.email === email && storedUser.password === password) {
      alert("¡Inicio de sesión exitoso!");
      localStorage.setItem("sesionIniciada", "true");
      window.location.href = "Perfil.html";
    } else {
      error.textContent = "Email o contraseña incorrectos.";
    }
  }
  
