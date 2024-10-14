const apiKey = "44164f8543c78b525f4cf05c9c83a2cc"; 

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
      document.querySelector(".feels-like").innerHTML =
        Math.round(data.main.feels_like) + "°C";
      document.querySelector(".visibility").innerHTML =
        data.visibility / 1000 + " km/h"; 

      
      const weatherCondition = data.weather[0].main;
      if (weatherCondition === "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (weatherCondition === "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (weatherCondition === "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (weatherCondition === "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (weatherCondition === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (weatherCondition === "Snow") {
        weatherIcon.src = "images/snow.png";
      }

      
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    
    console.error("Error fetching weather data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();

  if (city) {
    checkWeather(city);
    searchBox.value = "";
  } else {
    alert("Please enter a city name.");
  }
});

searchBox.addEventListener("keydown", (event) => {
  const city = searchBox.value.trim();

  if (event.key === "Enter") {
    if (city) {
      checkWeather(city);
      searchBox.value = "";
    } else {
      alert("Please enter a city name.");
    }
  }
});
