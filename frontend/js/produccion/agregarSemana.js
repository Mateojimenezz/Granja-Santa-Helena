document.addEventListener("DOMContentLoaded", function () {
    const formSemana = document.getElementById("form-semana");

    formSemana.addEventListener("submit", function (event) {
        event.preventDefault();

        const nuevaSemana = {
            semana: document.getElementById("semana").value,
            total: document.getElementById("total").value,
            enfermos: document.getElementById("enfermos").value,
            nuevos: document.getElementById("nuevos").value,
            lotes: document.getElementById("lotes").value
        };

        let semanas = JSON.parse(localStorage.getItem("semanas")) || [];
        semanas.push(nuevaSemana);
        localStorage.setItem("semanas", JSON.stringify(semanas));

        alert("Semana guardada correctamente!");
        window.location.href = "misCorrales.html"; // Redirigir a Mis Corrales
    });
});
