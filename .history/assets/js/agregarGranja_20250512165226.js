document.getElementById("imagen").addEventListener("change", function(event) {
    const file = event.target.files[0]; 
    const reader = new FileReader();

    reader.onload = function() {
        document.getElementById("preview").src = reader.result;
        document.getElementById("preview").style.display = "block";
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById("form-granja")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreGranja = document.getElementById("nombre").value;
    const urlImagen = document.getElementById("preview").src; 

    if (nombreGranja && urlImagen) {
        let granjas = JSON.parse(localStorage.getItem("granjas")) || [];
        granjas.push({ nombre: nombreGranja, imagen: urlImagen });
        localStorage.setItem("granjas", JSON.stringify(granjas));

        alert("Granja agregada correctamente!");
        window.location.href = "seleccionarGranja.html"; // Redirigir a la selección de granjas
    }
});

// Mostrar las granjas guardadas en `seleccionarGranja.html`
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
    window.location.href = "dashboard.html";
}
