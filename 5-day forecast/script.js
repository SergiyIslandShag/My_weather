document.addEventListener("DOMContentLoaded", function () {
    const dayForecastContainer = document.getElementById("day-forecast");
    const hourlyForecastContainer = document.getElementById("hourly-forecast-container");

    const forecastData = [
        {
            day: "Monday",
            date: "01.07",
            icon: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
            temp: "30°C",
            description: "Sunny",
            hourly: [
                { time: "6 AM", icon: "☀️", temp: "25°C", feels: "26°C", wind: "5 km/h N" },
                { time: "9 AM", icon: "☀️", temp: "28°C", feels: "29°C", wind: "7 km/h NE" },
                { time: "12 PM", icon: "🌤️", temp: "30°C", feels: "31°C", wind: "10 km/h NE" },
            ],
        },
        {
            day: "Tuesday",
            date: "02.07",
            icon: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
            temp: "28°C",
            description: "Clear",
            hourly: [
                { time: "6 AM", icon: "🌙", temp: "24°C", feels: "25°C", wind: "4 km/h NW" },
                { time: "9 AM", icon: "☀️", temp: "27°C", feels: "28°C", wind: "6 km/h NW" },
                { time: "12 PM", icon: "🌤️", temp: "28°C", feels: "29°C", wind: "8 km/h N" },
            ],
        },
        // Додайте ще 3 дні
    ];

    // Функція для генерації короткого прогнозу
    function renderShortForecast() {
        dayForecastContainer.innerHTML = ""; // Очищення контейнера
        forecastData.forEach((day, index) => {
            const dayCard = document.createElement("div");
            dayCard.classList.add("col-md-2", "day-card");
            if (index === 0) dayCard.classList.add("active"); // За замовчуванням перший день активний
            dayCard.dataset.index = index; // Зберігаємо індекс

            dayCard.innerHTML = `
                <p><strong>${day.day}</strong></p>
                <p>${day.date}</p>
                <img src="${day.icon}" class="weather-icon" alt="${day.description}">
                <p>${day.temp}</p>
                <p>${day.description}</p>
            `;

            dayCard.addEventListener("click", () => {
                document.querySelectorAll(".day-card").forEach(card => card.classList.remove("active"));
                dayCard.classList.add("active");
                renderHourlyForecast(day.hourly);
            });

            dayForecastContainer.appendChild(dayCard);
        });

        renderHourlyForecast(forecastData[0].hourly); // Показуємо прогноз першого дня
    }

    // Функція для генерації погодинного прогнозу
    function renderHourlyForecast(hourlyData) {
        hourlyForecastContainer.innerHTML = ""; // Очищення контейнера
        hourlyData.forEach(hour => {
            const hourlyCard = document.createElement("div");
            hourlyCard.classList.add("col-md-3", "text-center", "mb-3");

            hourlyCard.innerHTML = `
                <p><strong>${hour.time}</strong></p>
                <p>${hour.icon}</p>
                <p>Temp: ${hour.temp}</p>
                <p>Feels like: ${hour.feels}</p>
                <p>Wind: ${hour.wind}</p>
            `;

            hourlyForecastContainer.appendChild(hourlyCard);
        });
    }

    // Ініціалізація
    renderShortForecast();
});
