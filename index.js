const apiKey = "f62d2a5e9418108a091145d0055a8290";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("city_name");
const searchButton = document.getElementById("btn");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const humidityElement = document.getElementById("humidity");
const imageContainer = document.getElementById("image-container");
var year = document.getElementById("year");

var currentYear = new Date().getFullYear();

if (year) {
  year.textContent = '© ' + currentYear;
}

locationInput.addEventListener("keydown", (event) => {
  if (document.activeElement === locationInput && event.key === "Enter") {
    const location = locationInput.value;
    if (location) {
      fetchWeather(location);
    }
  }
});

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
      humidityElement.textContent = `Humidity ${data.main.humidity}`;
      var icon = data.weather[0].icon;
      var imgPath = `./asserts/static/${icon}.svg`;

      var image = document.createElement("img");
      image.src = imgPath;

      imageContainer.innerHTML = ""; // Clear any previous image
      imageContainer.appendChild(image);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
