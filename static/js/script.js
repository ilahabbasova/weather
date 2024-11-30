const apiKey = 'bcf025ec10f9b9d3a672df14f0898f4f'; // API açarı
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const body = document.getElementById('body');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');

// Hava məlumatlarını API-dən almaq
function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Hava məlumatlarını ekrana yazdır
                cityName.textContent = data.name;
                weatherDescription.textContent = data.weather[0].description;
                temperature.textContent = `Temperature: ${data.main.temp}°C`;
                humidity.textContent = `Humidity: ${data.main.humidity}%`;

                // GIF təyini
                setBackgroundGif(data.weather[0].description);
                weatherInfo.style.display = 'block';
                errorMessage.style.display = 'none';
            } else {
                errorMessage.textContent = 'City not found, please try again.';
                errorMessage.style.display = 'block';
                weatherInfo.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorMessage.textContent = 'Error fetching weather data!';
            errorMessage.style.display = 'block';
            weatherInfo.style.display = 'none';
        });
}

// GIF background təyini
function setBackgroundGif(description) {
    const hour = new Date().getHours();
    let gif = '';

    // Gündüz (morning) və gecə (night) təyini
    if (hour >= 6 && hour < 18) { // Səhər saatları
        if (description.includes('rain')) {
            gif = 'morning-rain.gif';
        } else if (description.includes('cloud')) {
            gif = 'morning-clouds.gif';
        } else if (description.includes('clear')) {
            gif = 'morning-clear.gif';
        } else if (description.includes('sun')) {
            gif = 'morning-sunny.gif';
        } else if (description.includes('fog') || description.includes('Mist')){
            gif = 'morning-fog.gif';
        } else if (description.includes('snow')) {
            gif = 'morning-snow.gif';
        } else {
            gif = 'morning-default.gif'; // Default GIF
        }
    } else { // Gecə saatları
        if (description.includes('rain')) {
            gif = 'night-rain.gif';
        } else if (description.includes('cloud')) {
            gif = 'night-clouds.gif';
        } else if (description.includes('clear')) {
            gif = 'night-clear.gif';
        } else if (description.includes('sun')) {
            gif = 'night-sunny.gif';
        } else if (description.includes('fog')) {
            gif = 'night-fog.gif';
        } else if (description.includes('snow')) {
            gif = 'morning-snow.gif';
        } else {
            gif = 'night-default.gif'; // Default GIF
        }
    }

    // Bədənə GIF-i təyin etmək
    body.style.backgroundImage = `url('/static/images/${gif}')`;

}

// Form təqdim etməsi
weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    getWeather(city);
});

// Sayfa açıldığında avtomatik New York şəhərini göstərmək
window.onload = () => {
    getWeather('New York'); // New York şəhərinin məlumatlarını göstər
};
