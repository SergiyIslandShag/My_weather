const apiKey = "2ab26a9f94f6cc5ec712a4b2e3fc1ed7";
const units = "metric";

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`);
        if (!response.ok) throw new Error("City not found");
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        showAlert(error.message);
    }
}

document.getElementById("btn-search").addEventListener("click", () => {
    const city = document.getElementById("city-search").value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        showAlert("Please enter a city to search.");
    }
});

function showAlert(message) {
    alert(`
    ───────────────────────────
    ❗🔴🚨 Attention! 🚨🔴❗
    ${message}
    ───────────────────────────
    `);
}

function displayWeather(dataPr) {
    const container = document.getElementById("forecast-content");
    const nowDate = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let html = `
        <h5 class="title-left">5-DAY FORECAST</h5>
        <div class="row text-center mb-4">`;

    for (let i = 0; i < 5; i++) {
        const forecast = dataPr.list[i * 8];
        const date = new Date(forecast.dt_txt);
        const dayName = dayNames[date.getDay()];
        const temp = Math.round(forecast.main.temp);
        const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const description = forecast.weather[0].main;

        html += `
            <div class="col forecast-day-block p-2 border rounded">
                <p style="font-weight: bold;">${i === 0 ? "Today" : dayName}</p>
                <p>${date.getDate()}/${date.getMonth() + 1}</p>
                <img src="${icon}" class="weather-icon" alt="${description}">
                <p>${temp}°C</p>
                <p style="font-weight: bold;">${description}</p>
            </div>`;
    }
    html += `</div>`;

    html += `
        <div class="block" id="container">
            <h5 class="title-left">HOURLY</h5>
            <div class="row text-center">`;

    for (let i = 0; i < 6; i++) {
        const hourly = dataPr.list[i];
        const time = new Date(hourly.dt_txt).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
        const temp = Math.round(hourly.main.temp);
        const feelsLike = Math.round(hourly.main.feels_like);
        const wind = Math.round(hourly.wind.speed);
        const icon = `https://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
        const description = hourly.weather[0].main;

        html += `
                <div class="col weather-item">
                    <p style="font-weight: bold">${time}</p>
                    <img src="${icon}" class="weather-icon" alt="${description}">
                    <p>Forecast: <strong>${description}</strong></p>
                    <p>Temp: <strong>${temp}°C</strong></p>
                    <p>Feels Like: <strong>${feelsLike}°C</strong></p>
                    <p>Wind: <strong>${wind} m/s</strong></p>
                </div>`;
    }

    html += `</div></div>`;
    container.innerHTML = html;
}
