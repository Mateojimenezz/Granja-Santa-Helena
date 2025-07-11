// ✅ Mostrar vista previa de imagen antes de guardarla
document.getElementById("imagen")?.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        document.getElementById("preview").src = reader.result;
        document.getElementById("preview").style.display = "block";
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// ✅ Guardar nueva granja en el servidor y redirigir
document.getElementById("form-granja")?.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch("http://localhost:3000/api/usuarios/granjas", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Granja agregada correctamente.");
            window.location.href = "seleccionarGranja.html";
        } else {
            alert("❌ Error al guardar la granja.");
            console.error(result);
        }
    } catch (error) {
        alert("❌ Error de conexión con el servidor.");
        console.error(error);
    }
});

// ✅ Cargar granjas desde la base de datos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const listaGranjas = document.getElementById("granjas-list");
    const botonContainer = document.getElementById("boton-container");

    fetch("http://localhost:3000/api/usuarios/granjas")
        .then(response => response.json())
        .then(granjas => {
            if (granjas.length === 0) {
                console.warn("No hay granjas registradas.");
                return;
            }

            granjas.forEach(granja => {
                const nuevaGranja = document.createElement("div");
                nuevaGranja.classList.add("col-md-3");

                nuevaGranja.innerHTML = `
                    <div class="card granja-card">
                        <img src="${granja.imagen}" class="card-img-top" alt="Imagen de ${granja.nombre}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${granja.nombre}</h5>
                            <button class="btn btn-form" onclick="seleccionarGranja('${granja.nombre}')">Seleccionar</button>
                        </div>
                    </div>
                `;

                listaGranjas.appendChild(nuevaGranja);
            });

            // Mover el botón `+` al final
            if (botonContainer) {
                listaGranjas.appendChild(botonContainer);
            }
        })
        .catch(error => {
            console.error("❌ Error al obtener las granjas desde el servidor:", error);
        });
});

// ✅ Seleccionar una granja y redirigir
function seleccionarGranja(nombre) {
    localStorage.setItem("granjaSeleccionada", nombre);
    window.location.href = "paginaDeInicio.html";
}
