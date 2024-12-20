const apiKey = "2ab26a9f94f6cc5ec712a4b2e3fc1ed7";
const units = "metric";

async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
    const currentData = await response.json();

    const lat = currentData.coord.lat;
    const lon = currentData.coord.lon;
    const hourlyResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${apiKey}&units=${units}`);
    const hourlyData = await hourlyResponse.json();

    console.log(currentData);
    console.log(hourlyData);
    
    displayWeather(currentData, hourlyData);
}

document.getElementById("btn-search").addEventListener("click", () => {
    const city = document.getElementById("city-search").value;
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

function calculateDaylightDuration(sunrise, sunset) {
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);
    const duration = sunsetTime - sunriseTime;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} hr`;
}


function printCurrent(data) {
    const container = document.getElementById("container");
    container.innerHTML = `
        <h5 class="title-left">CURRENT WEATHER</h5>
        <div class="current-weather-info">
            <div class="text-center">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" class="weather-icon">
                <p style="font-weight: bold; color: black; margin: 0;">${data.weather[0].description}</p>
            </div>
            <div class="current-weather-center text-center">
                <p class="temperature" style="font-size: 2rem;">${Math.round(data.main.temp)}°C</p>
                <p>Real Feel: ${Math.round(data.main.feels_like)}°C</p>
            </div>
            <div class="text-right">
                <p style="font-weight: bold; color: blue; margin-bottom: 10px;">${new Date().toLocaleDateString()}</p>
                <p>Sunrise: <strong>${new Date(data.sys.sunrise * 1000).toLocaleTimeString().slice(0, -3)}</strong></p>
                <p>Sunset: <strong>${new Date(data.sys.sunset * 1000).toLocaleTimeString().slice(0, -3)}</strong></p>
                <p>Duration: <strong>${calculateDaylightDuration(data.sys.sunrise, data.sys.sunset)}</strong></p>
            </div>
        </div>`;
}

function displayWeather(currentData) {
    printCurrent(currentData);
}