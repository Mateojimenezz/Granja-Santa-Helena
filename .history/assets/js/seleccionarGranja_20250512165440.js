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

document.addEventListener("DOMContentLoaded", function() {
    const listaGranjas = document.getElementById("granjas-list");

    // 🌟 Verificamos si hay granjas guardadas
    let granjas = JSON.parse(localStorage.getItem("granjas")) || [];

    if (granjas.length === 0) {
        console.warn("No hay granjas en el localStorage.");
    }

    granjas.forEach(granja => {
        const nuevaGranja = document.createElement("div");
        nuevaGranja.classList.add("col-md-4");

        nuevaGranja.innerHTML = `
            <div class="card shadow-sm">
                <img src="${granja.imagen}" class="card-img-top" alt="Imagen de ${granja.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${granja.nombre}</h5>
                    <button class="btn btn-success" onclick="seleccionarGranja('${granja.nombre}')">Seleccionar</button>
                </div>
            </div>
        `;

        listaGranjas.appendChild(nuevaGranja);
    });
});
