document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city === '') {
            alert('Please enter a city or country.');
            return;
        }
        fetchWeather(city);
    });

    function fetchWeather(city) {
        const apiKey = '644831af8d3153783d59fb15aad36a07'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                return response.json();
            })
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function updateWeather(data) {
        const locationElement = document.querySelector('.location');
        const temperatureElement = document.querySelector('.temperature');
        const descriptionElement = document.querySelector('.description');
        const iconElement = document.querySelector('.icon img');

        locationElement.textContent = `${data.name}, ${data.sys.country}`;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
        iconElement.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    }
});
