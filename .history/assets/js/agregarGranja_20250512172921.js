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

// ✅ Cargar las granjas guardadas en `seleccionarGranja.html`
document.addEventListener("DOMContentLoaded", function() {
    const listaGranjas = document.getElementById("granjas-list");

    if (!listaGranjas) {
        console.error("No se encontró el contenedor de granjas.");
        return;
    }

    let granjas = JSON.parse(localStorage.getItem("granjas")) || [];

    listaGranjas.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas granjas

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

// ✅ Guardar la granja seleccionada y redirigir a `inicio.html`
function seleccionarGranja(nombre) {
    localStorage.setItem("granjaSeleccionada", nombre);
    window.location.href = "seleccionarGranja.html"; // Redirigir a la página principal
}


