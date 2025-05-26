document.getElementById("agregar-granja").addEventListener("click", function() {
    const nombreGranja = prompt("Ingrese el nombre de la nueva granja:");
    const urlImagen = prompt("Ingrese la URL de la imagen de la granja:");

    if (nombreGranja && urlImagen) {
        const listaGranjas = document.getElementById("granjas-list");

        const nuevaGranja = document.createElement("div");
        nuevaGranja.classList.add("granja-card");

        nuevaGranja.innerHTML = `
            <img src="${urlImagen}" alt="Imagen de ${nombreGranja}">
            <h3>${nombreGranja}</h3>
            <button onclick="seleccionarGranja('${nombreGranja}')">Seleccionar</button>
        `;

        listaGranjas.appendChild(nuevaGranja);
    }
});

function seleccionarGranja(nombre) {
    alert(`Has seleccionado la granja: ${nombre}`);
    localStorage.setItem("granjaSeleccionada", nombre);
    window.location.href = "dashboard.html"; // Redirige a la vista de la granja
}

