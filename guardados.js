function traerDatosGuardados() {
    let datosGuardados = localStorage.getItem('climas');
    console.log(datosGuardados);
    if (datosGuardados != null) {
        datosGuardados = JSON.parse(datosGuardados);
        const guardadosDiv = document.getElementById("climas-guardados");
        guardadosDiv.innerHTML = "";
        datosGuardados.forEach(dato => {
            const clima = new Clima(dato.city, dato.temperature, dato.wind, dato.description, dato.forecast);
            guardadosDiv.appendChild(clima.createHtmlElement());
        });
    } else {
        return [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ordenarCiudad").addEventListener("click", () => {
        let datosGuardados = localStorage.getItem('climas');
        if (datosGuardados != null) {
            datosGuardados = JSON.parse(datosGuardados);
            const sortedByCity = datosGuardados.sort((a, b) =>
                a.city.localeCompare(b.city)
            );
            localStorage.setItem('climas', JSON.stringify(sortedByCity));
            traerDatosGuardados();
        }
    });
    document.getElementById("ordenarClima").addEventListener("click", () => {
        let datosGuardados = localStorage.getItem('climas');
        if (datosGuardados != null) {
            datosGuardados = JSON.parse(datosGuardados);
            const sortedByCity = datosGuardados.sort((a, b) =>
                a.description.localeCompare(b.description)
            );
            localStorage.setItem('climas', JSON.stringify(sortedByCity));
            traerDatosGuardados();
        }
    });
});