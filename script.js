//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const API_KEY = '';
let currentData = {};

function showTodayForecast() {
    document.getElementById('today-content').style.display = 'block';
    document.getElementById('forecast-content').style.display = 'none';
}

function showForecast() {
    document.getElementById('forecast-content').style.display = 'block';
    document.getElementById('today-content').style.display = 'none';
}

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('#search-input').value;
    fetchWeatherData(searchInput);
}


showTodayForecast();
