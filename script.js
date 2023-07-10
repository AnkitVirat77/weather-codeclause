window.addEventListener("DOMContentLoaded", function() {
    const apiKey = "83110d99ab1a645c3c559054097e0fa1";
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const cityInput = document.getElementById("city-input");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const weatherData = document.getElementById("weather-data");
  
    getWeatherBtn.addEventListener("click", function() {
      const city = cityInput.value;
      if (city !== "") {
        fetchWeatherData(apiKey, city)
          .then(function(weather) {
            if (weather) {
              cityName.textContent = `City: ${weather.city}`;
              temperature.textContent = `Temperature: ${weather.temperature}°C`;
              description.textContent = `Description: ${weather.description}`;
              humidity.textContent = `Humidity: ${weather.humidity}%`;
              weatherData.style.display = "block";
            } else {
              cityName.textContent = "";
              temperature.textContent = "";
              description.textContent = "";
              humidity.textContent = "";
              weatherData.style.display = "none";
              alert("Weather data not available.");
            }
          })
          .catch(function(error) {
            console.log("Error fetching weather data:", error);
          });
        }
         
    });
  
    function fetchWeatherData(apiKey, city) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      return fetch(url)
        .then(function(response) {
          if (!response.ok) {
            throw new Error("Weather data not available.");
          }
          return response.json();
        })
        .then(function(data) {
          const weather = {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
          };
          return weather;
        });
    }
   
  });
  