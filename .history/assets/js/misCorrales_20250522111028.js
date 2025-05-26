document.addEventListener("DOMContentLoaded", function() {
    const listaGranjas = document.getElementById("granjas-list");
    const botonAgregar = document.getElementById("boton-container");

    let semanas = JSON.parse(localStorage.getItem("semanas")) || [];

    semanas.forEach(data => {
        const nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.classList.add("col-md-3", "granja-container");

        nuevaTarjeta.innerHTML = `
            <div class="card granja-card">
                <h5 class="text-center m-2">Semana ${data.semana}</h5>
                <img src="./assets/img/granja1.jpg" class="card-img-top px-4" alt="Semana ${data.semana}">
                <div class="card-body text-center">
                    <p>
                        <span class="num-negro">${data.total}</span> |
                        <span class="num-rojo">${data.enfermos}</span> |
                        <span class="num-verde">${data.nuevos}</span>
                    </p>
                    <p class="lotes-activos -mt-1">Lotes Activos: ${data.lotes}</p>
                    <button class="btn btn-form" onclick="seleccionar('Santa Helena')">Seleccionar</button>
                </div>
            </div>
        `;

        listaGranjas.appendChild(nuevaTarjeta);
    });

    // 🌟 Mover dinámicamente el botón al final de la última tarjeta
    listaGranjas.appendChild(botonAgregar);
});


