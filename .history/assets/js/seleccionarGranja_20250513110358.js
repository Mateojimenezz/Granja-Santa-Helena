// ✅ Mostrar vista previa de imagen antes de guardarla
document.getElementById("imagen")?.addEventListener("change", function(event) {
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

// ✅ Guardar nueva granja y redirigir a `seleccionarGranja.html`
document.getElementById("form-granja")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreGranja = document.getElementById("nombre").value;
    const urlImagen = document.getElementById("preview").src;

    if (nombreGranja && urlImagen) {
        let granjas = JSON.parse(localStorage.getItem("granjas")) || [];
        granjas.push({ nombre: nombreGranja, imagen: urlImagen });
        localStorage.setItem("granjas", JSON.stringify(granjas));

        alert("Granja agregada correctamente!");

        window.location.href = "seleccionarGranja.html"; // Redirigir
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const listaGranjas = document.getElementById("granjas-list");

    let granjas = JSON.parse(localStorage.getItem("granjas")) || [];

    listaGranjas.innerHTML = ""; // Limpiar antes de agregar nuevas granjas

    granjas.forEach(granja => {
        const nuevaGranja = document.createElement("div");
        nuevaGranja.classList.add("col-md-3", "granja-card"); // Agregar clase para el estilo

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
    window.location.href = "dashboard.html"; // Redirigir a la vista de la granja
}

// ✅ Guardar la granja seleccionada y redirigir a `inicio.html`
function seleccionarGranja(nombre) {
    localStorage.setItem("granjaSeleccionada", nombre);
    window.location.href = "paginaDeInicio.html"; // Redirigir a la página principal
}