window.addEventListener("DOMContentLoaded", () => {
    const navIcons = document.getElementById("navIcons");
    const sesionIniciada = localStorage.getItem("sesionIniciada");

    if (sesionIniciada === "true" && navIcons) {
        // Eliminar solo el ícono de Login
        const loginIcon = navIcons.querySelector('a[href="Login.html"]');
        if (loginIcon) {
            navIcons.removeChild(loginIcon);
        }

        // Crear botón de perfil
        const perfilLink = document.createElement("a");
        perfilLink.href = "perfil.html";
        perfilLink.textContent = "Perfil";
        perfilLink.className = "btn btn-outline-light me-2";

        // Crear botón de cerrar sesión
        const cerrarBtn = document.createElement("button");
        cerrarBtn.textContent = "Cerrar Sesión";
        cerrarBtn.className = "btn btn-danger";
        cerrarBtn.addEventListener("click", cerrarSesion);

        // Agregar al contenedor
        navIcons.prepend(cerrarBtn);
        navIcons.prepend(perfilLink);
    }
});

function cerrarSesion() {
    localStorage.removeItem("sesionIniciada");
    window.location.href = "index.html";
}
