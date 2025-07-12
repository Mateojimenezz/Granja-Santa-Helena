// Seleccionar Granja - frontend/js/usuarios/seleccionarGranja.js

// ✅ Cargar granjas desde la base de datos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const listaGranjas = document.getElementById("granjas-list");
    const botonContainer = document.getElementById("boton-container");

    fetch("http://localhost:3000/api/usuarios/granjas", {
        credentials: "include" // ✅ importante si usas sesiones
    })
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
