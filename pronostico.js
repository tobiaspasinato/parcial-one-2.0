class Pronostico {
    day;
    temperature;
    wind;

    constructor(day, temperature, wind) {
        this.day = day;
        this.temperature = temperature;
        this.wind = wind;
    }

    createHtmlElement(){
        let dayText;
        switch (this.day) {
            case "1":
                dayText = "Mañana";
                break;
            case "2":
                dayText = "Pasado";
                break;
            case "3":
                dayText = "Pasado Mañana";
                break;
        }
        const div = document.createElement('div');
        div.classList.add('pronostico');
        div.innerHTML = `
            <h2>${dayText}</h2>
            <p>Temperatura: ${this.temperature}</p>
            <p>Estado del clima: ${this.wind}</p>
        `;
        return div;
    }
}