document.getElementById("form-granja")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreGranja = document.getElementById("nombre").value;
    const urlImagen = document.getElementById("imagen").value;

    if (nombreGranja && urlImagen) {
        // Guardar en localStorage para persistencia
        let granjas = JSON.parse(localStorage.getItem("granjas")) || [];
        granjas.push({ nombre: nombreGranja, imagen: urlImagen });
        localStorage.setItem("granjas", JSON.stringify(granjas));

        alert("Granja agregada correctamente!");
        window.location.href = "index.html"; // Redirigir a selección de granjas
    }
});

// Mostrar granjas guardadas en `index.html`
document.addEventListener("DOMContentLoaded", function() {
    const listaGranjas = document.getElementById("granjas-list");
    let granjas = JSON.parse(localStorage.getItem("granjas")) || [];

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

function seleccionarGranja(nombre) {
    alert(`Has seleccionado la granja: ${nombre}`);
    localStorage.setItem("granjaSeleccionada", nombre);
    window.location.href = "dashboard.html"; // Redirigir a la vista de la granja seleccionada
}
