document.addEventListener('DOMContentLoaded', () => {
    const weatherApiKey = 'e43527672965235c28ed7b8d1bc68511'; // Replace with your actual API key
    const city = 'PUNE'; // Replace with your actual city
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    // Fetch weather data from the OpenWeather API
    fetchWeatherData(weatherApiUrl)
        .then(data => {
            if (data) {
                displayWeatherData(data); // Display the fetched weather data
                suggestCrops(data); // Suggest crops based on weather conditions
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));

    // Function to fetch weather data
    async function fetchWeatherData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch weather data:', error);
        }
    }

    // Function to display weather data on the page
    function displayWeatherData(data) {
        const weatherDetails = document.getElementById('weather-details');
        const { main, weather } = data;

        weatherDetails.innerHTML = `
            <div class="weather-card">
                <h3>Current Weather</h3>
                <p>Temperature: <strong>${main.temp}°C</strong></p>
                <p>Humidity: <strong>${main.humidity}%</strong></p>
                <p>Condition: <strong>${weather[0].description}</strong></p>
            </div>
        `;
    }

    // Function to suggest crops based on weather conditions
    function suggestCrops(data) {
        const cropSuggestions = document.getElementById('crop-suggestions');
        const { main } = data;
        let crops = [];

        // Determine crops based on temperature
        if (main.temp > 25) {
            crops = getCropsForWarmWeather();
        } else if (main.temp > 15) {
            crops = getCropsForModerateWeather();
        } else {
            crops = getCropsForCoolWeather();
        }

        // Display crop suggestions on the page
        cropSuggestions.innerHTML = `
            <h3>Suggested Crops</h3>
            <ul class="crop-list">
                ${crops.map(crop => `<li><strong>${crop.name}:</strong> ${crop.description}</li>`).join('')}
            </ul>
        `;
    }

    // Function to get crops for warm climates (above 25°C)
    function getCropsForWarmWeather() {
        return [
            { name: 'Cotton', description: 'Used to make fabrics and textiles.' },
            { name: 'Tur', description: 'A type of lentil, used as a staple food.' },
            { name: 'Mung', description: 'A pulse crop used for its high protein content.' },
            { name: 'Soyabean', description: 'Widely grown for its edible oil and protein-rich food.' },
            { name: 'Okra', description: 'A popular vegetable in warm climates.' },
            { name: 'Brinjal', description: 'Also known as eggplant, grows well in warm weather.' },
            { name: 'Bananas', description: 'A popular tropical fruit.' },
            { name: 'Oranges', description: 'Citrus fruit that thrives in warm weather.' }
        ];
    }

    // Function to get crops for moderate climates (15°C to 25°C)
    function getCropsForModerateWeather() {
        return [
            { name: 'Custard Apples', description: 'A sweet fruit that grows in moderate climates.' },
            { name: 'Potatoes', description: 'A staple vegetable grown in cooler weather.' },
            { name: 'Okra', description: 'Grows well in moderately warm conditions.' },
            { name: 'Brinjal', description: 'Grows in slightly cooler climates as well.' },
            { name: 'Soyabean', description: 'A versatile crop for warmer and moderate climates.' }
        ];
    }

    // Function to get crops for cool climates (below 15°C)
    function getCropsForCoolWeather() {
        return [
            { name: 'Potatoes', description: 'Thrives in cooler climates.' }
        ];
    }
});
