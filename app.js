let btn = document
  .getElementById("search-btn")
  .addEventListener("click", fetchWeather);

function fetchWeather() {
  const cityName = document.getElementById("city-input").value;
  const API = "5ddf709696587fc2fd10ef236e914abe";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric&lang=ru`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ответ от сервера не ok" + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(data.name);
      //   console.log(data.main.temp);
      //   console.log(data.main.feels_like);
      //   console.log(data.wind.speed);
      //   console.log(data.weather[0].description);
      displayShow(data);
    })
    .catch((error) => {
      console.log("Произошла ошибка:" + error);

      if (cityName == "") {
        document.getElementById("weather-info").innerHTML =
          "<p class='Error'>Шаардын атын жаз</p>";    
      } else {
        document.getElementById("weather-info").innerHTML =
          "<div class='pyramid-loader'><div class='wrapper'> <span class='side side1'></span> <span class='side side2'></span> <span class='side side3'></span> <span class='side side4'></span> <span class='shadow'></span></div></div>";
      }
    });
}

const displayShow = (data) => {
  const weatherInfo = document.getElementById("weather-info");

  let cloudy = "./cloudy.png";
  let sun = "./sun.png";
  let rain = "./rainy.webp";
  let description1 = "";

  switch (data.weather[0].description) {
    case "небольшая облачность":
      description1 = cloudy;
      break;
    case "ясно":
      description1 = sun;
      break;
    case "дождь":
      description1 = rain;
      break;
    default:
      break;
  }

  weatherInfo.innerHTML = `
    <div class="card" style="width: 18rem;">
  <img src="${description1}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">${data.weather[0].description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Температура:${data.main.temp}°С</li>
    <li class="list-group-item">Сезилуу темературасы:${data.main.feels_like}°С</li>
    <li class="list-group-item">Шамаалдын ылдамыгы:${data.wind.speed}м/с</li>
  </ul>
  <div class="card-body">
    <a href="https://www.gismeteo.ru/weather-karakol-5209/10-days/" class="card-link">Толугураак малымаат</a>
  </div>
</div>
    `;
};

document.body.addEventListener("keyup", (event) => {
  if (event.code === "Enter") fetchWeather();
});
