async function traerDatos(nombreCity, id) {
    try {
        const peticion = await fetch("https://weather-api-progra-3.vercel.app/weather/" + nombreCity);
        const data = await peticion.json();
        const clima = new Clima(data.city, data.temperature, data.wind, data.description, data.forecast);
        const climaDiv = document.getElementById(id);
        climaDiv.innerHTML = "";
        climaDiv.appendChild(clima.createHtmlElement());
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    traerDatos("avellaneda", "clima");
    
    const inputButton = document.getElementById("buscar");
    const inputCity = document.getElementById("traer-ciudad");
    inputButton.addEventListener("click", () => {
        if (inputCity.value) {
            traerDatos(inputCity.value, "busqueda");
        }
    });
    inputCity.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && inputCity.value) {
            traerDatos(inputCity.value, "busqueda");
        }
    });
});