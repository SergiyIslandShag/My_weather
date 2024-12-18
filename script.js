const apiKey = "2ab26a9f94f6cc5ec712a4b2e3fc1ed7";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast";
const units = "metric";

function initPage() {
    document.querySelector('.container').style.display = 'block';
    document.getElementById('forecast-content').style.display = 'none';
}

window.onload = initPage;

function showTodayForecast() {
    document.querySelector('.container').style.display = 'block';
    document.getElementById('forecast-content').style.display = 'none';
}

function showForecast() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('forecast-content').style.display = 'block';
}

document.getElementById('weather-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.querySelector('input').value.trim();
    if (city) {
        fetchCurrentWeather(city);
        fetchForecast(city);
        showForecast();
    } else {
        alert("Please enter a valid city name.");
    }
});

async function fetchCurrentWeather(city) {
    try {
        const response = await fetch(`${weatherApiUrl}?q=${city}&units=${units}&appid=${apiKey}`);
        const data = await response.json();
        
        if (response.ok) {
            updateCurrentWeather(data);
        } else {
            console.error("API Error: ", data);
            alert("Error fetching weather data: " + data.message);
        }
    } catch (error) {
        console.error("Network Error: ", error);
        alert("Error fetching weather data.");
    }
}


function updateCurrentWeather(data) {
    document.querySelector('.current-weather-info .temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.current-weather-info .text-center p').textContent = data.weather[0].main;
    document.querySelector('.current-weather-info .text-right p:nth-child(2)').innerHTML = `Sunrise: <strong>${formatTime(data.sys.sunrise)}</strong>`;
    document.querySelector('.current-weather-info .text-right p:nth-child(3)').innerHTML = `Sunset: <strong>${formatTime(data.sys.sunset)}</strong>`;
}

async function fetchForecast(city) {
    try {
        const response = await fetch(`${forecastApiUrl}?q=${city}&units=${units}&appid=${apiKey}`);
        const data = await response.json();
        updateForecast(data);
    } catch (error) {
        alert("Error fetching forecast data.");
    }
}

function updateForecast(data) {
    const forecastBlocks = document.querySelectorAll('.forecast-day-block');
    for (let i = 0; i < forecastBlocks.length; i++) {
        const dayForecast = data.list[i * 8];
        forecastBlocks[i].querySelector('p:nth-child(3)').textContent = `${Math.round(dayForecast.main.temp)}°C`;
        forecastBlocks[i].querySelector('p:nth-child(4)').textContent = dayForecast.weather[0].main;
    }

    const hourlyForecast = data.list.slice(0, 6);
    const hourlyItems = document.querySelectorAll('.weather-item');
    for (let i = 0; i < hourlyItems.length; i++) {
        const hour = hourlyForecast[i];
        hourlyItems[i].querySelector('p:nth-child(1)').textContent = `${new Date(hour.dt * 1000).getHours()}:00`;
        hourlyItems[i].querySelector('img').src = `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;
        hourlyItems[i].querySelector('p:nth-child(3)').textContent = `Forecast: ${hour.weather[0].main}`;
        hourlyItems[i].querySelector('p:nth-child(4)').textContent = `Temp: ${Math.round(hour.main.temp)}°C`;
        hourlyItems[i].querySelector('p:nth-child(5)').textContent = `Feels Like: ${Math.round(hour.main.feels_like)}°C`;
        hourlyItems[i].querySelector('p:nth-child(6)').textContent = `Wind: ${hour.wind.speed} km/h`;
    }
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
