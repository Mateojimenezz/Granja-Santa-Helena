
________________________________________________________________________
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("corrales-container");

    let semanas = JSON.parse(localStorage.getItem("semanas")) || [];

    // 🔥 Generar tarjetas dinámicamente
    semanas.forEach(data => {
        const card = document.createElement("div");
        card.classList.add("col-md-3", "card");

        card.innerHTML = `
            <h5>Semana ${data.semana}</h5>
            <p>
                <span class="num-negro">${data.total}</span> |
                <span class="num-rojo">${data.enfermos}</span> |
                <span class="num-verde">${data.nuevos}</span>
            </p>
            <p class="lotes-activos">Lotes Activos: ${data.lotes}</p>
        `;

        container.appendChild(card);
    });
});

