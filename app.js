const APIKEY = "8e1d7a05ffe745d2a5564418250608";

const searchInput = document.querySelector("#Searchbox");
const temp = document.querySelector("#temp");
const locationel = document.querySelector("#location");
const today = document.querySelector("#today");
const weatherDetails = document.querySelector(".weather-details");
const weatherIcon = document.querySelector(".weather-icon img");
const weathermode = document.querySelector("#weathertype");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const mintemp = document.querySelector("#mintemp");
const maxtemp = document.querySelector("#maxtemp");
const Air = document.querySelector("#Air");
const uv = document.querySelector("#uv");
const pressure = document.querySelector("#Pressure");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const forecastElement = document.querySelector(".forecast-containers");

async function getWeather(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=7&aqi=yes`
    );
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // if (data.error) {
    //   showError(data.error.message);
    //   return;
    // }
    updateWeather(data);
    updateForecast(data);
    renderForecastGraph(data);
  } catch (error) {
    alert("City not found. Please try again!");
  }
}

function updateWeather(data) {
  temp.innerText = `${data.current.temp_c}°C`;
  locationel.textContent = `${data.location.name}, ${data.location.country}`;
  let datebox = new Date();
  let Alldays = { weekday: "long" };
  today.textContent = datebox.toLocaleDateString("en-US", Alldays);
  imageGenerator(data.current.condition.text);
  weathermode.innerHTML = `<i class="ri-cloudy-line" ></i> ${data.current.condition.text}`;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_kph} km/h`;
  // weatherIcon.src = data.current.condition.icon;
  mintemp.innerHTML = ` <i class="ri-temp-cold-line"></i> Min Temperature : ${data.forecast.forecastday[0].day.mintemp_c}°C`;
  maxtemp.innerHTML = `<i class="ri-temp-hot-fill"></i> Max Temperature : ${data.forecast.forecastday[0].day.maxtemp_c}°C`;
  uv.textContent = data.forecast.forecastday[0].day.uv;
  Air.textContent = data.current.air_quality.o3;
  pressure.textContent = data.current.pressure_in;
  sunrise.textContent = data.forecast.forecastday[0].astro.sunrise;
  sunset.textContent = data.forecast.forecastday[0].astro.sunset;
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    if (city) getWeather(city);
  }
});

// getWeather("Lahore");
function imageGenerator(weather) {
  switch (weather) {
    case "Cloudy":
    case "Partly cloudy":
      weatherIcon.src = "assests/Cloudy.png";
      break;

    case "Mist":
      weatherIcon.src = "assests/cloudyair.png";
      break;

    case "Light rain":
    case "Light rain shower":
      weatherIcon.src = "assests/lightrainday.png";
      break;

    case "Patchy rain nearby":
      weatherIcon.src = "assests/lightrainday.png";
      break;

    case "Sunny":
    case "Clear":
      weatherIcon.src = "assests/suuny.png";
      break;

    case "Overcast":
      weatherIcon.src = "assests/Thunderstorm.png";
      break;

    case "Torrential rain shower":
      weatherIcon.src = "assests/bijili.png";
      break;

    case "Light drizzle":
    case "Patchy light drizzle":
      weatherIcon.src = "assests/smallrain.png";
      break;

    case "Moderate rain at times":
      weatherIcon.src = "assests/bijili.png";
      break;

    default:
      weatherIcon.src = "assests/suuny.png";
      break;
  }
}

// function imageGenerator(weather) {
//   if (weather === "Cloudy") {
//     weatherIcon.src = "assests/Cloudy.png";
//   } else if (weather === "Partly cloudy") {
//     weatherIcon.src = "assests/Cloudy.png";
//   } else if (weather === "Mist") {
//     weatherIcon.src = "assests/cloudyair.png";
//   } else if (weather === "Light rain" || "Light rain shower") {
//     weatherIcon.src = "assests/lightrainday.png";
//   } else if (weather === "Patchy rain nearby") {
//     weatherIcon.src = "assests/lightrainnight.png";
//   } else if (weather === "Sunny") {
//     weatherIcon.src = "assests/suuny.png";
//   } else if (weather === "Clear") {
//     weatherIcon.src = "assests/suuny.png";
//   } else if (weather === "Overcast") {
//     weatherIcon.src = "assests/Thunderstorm.png";
//   } else if (weather === "Torrential rain shower") {
//     weatherIcon.src = "assests/bijili.png";
//   } else if (weather === "Light drizzle") {
//     weatherIcon.src = "assests/smallrain.png";
//   } else if (weather === "Patchy light drizzle") {
//     weatherIcon.src = "assests/smallrain.png";
//   } else if (weather === "Moderate rain at times") {
//     weatherIcon.src = "assests/bijili.png";
//   } else {
//     weatherIcon.src = "assests/suuny.png";
//   }
// }
// function updateForecast(data) {
//   forecastElement.innerHTML = "";

//   const forecastDays = data.forecast.forecastday;

//   forecastDays.forEach((day) => {
//     const date = new Date(day.date);
//     const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

//     const condition = day.day.condition.text;
//     const temp = `${day.day.avgtemp_c}°C`;

//     let iconSrc = "";
//     switch (condition) {
//       case "Cloudy":
//         iconSrc = "assests/Cloudy.png";
//         break;
//       case "Partly cloudy":
//         iconSrc = "assests/Light Rain (Night).png";
//         break;
//       case "Light rain shower":
//         iconSrc = "assests/Light Rain (Night).png";
//         break;
//       case "Light rain":
//         iconSrc = "assests/Light Rain (Night).png";
//         break;

//       case "Sunny":
//         iconSrc = "assests/Clear (Day).png";
//         break;
//       case "Mist":
//         iconSrc = "assests/hawa.png";
//         break;
//       case "Overcast":
//       case "Torrential rain shower":
//         iconSrc = "assests/Heavy Rain.png";
//         break;
//       case "Overcast":
//         iconSrc = "assests/Heavy Rain.png";
//         break;

//       case "Moderate or heavy rain with thunder":
//         iconSrc = "assests/Thunderstorm.png";
//         break;
//       default:
//         iconSrc = "assests/windy (Day).png";
//     }

//     const forecastCard = document.createElement("div");
//     forecastCard.className = "card";

//     forecastCard.innerHTML = `
//       <h4>${dayName}</h4>
//       <img src="${iconSrc}" alt="${condition}" />
//       <p>${temp}</p>
//     `;

//     forecastElement.appendChild(forecastCard);
//   });
// }

function updateForecast(data) {
  forecastElement.innerHTML = "";

  data.forecast.forecastday.forEach((day) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = `${day.day.avgtemp_c}°C`;

    let iconSrc = "assests/windyday.png";
    const conditionText = day.day.condition.text.toLowerCase();

    switch (true) {
      case conditionText.includes("cloudy"):
        iconSrc = "assests/Cloudy.png";
        break;

      case conditionText.includes("rain"):
        iconSrc = "assests/lightrainday.png";
        break;

      case conditionText.includes("sunny"):
      case conditionText.includes("clear"):
        iconSrc = "assests/suuny.png";
        break;

      case conditionText.includes("mist"):
        iconSrc = "assests/hawa.png";
        break;

      case conditionText.includes("torrential rain shower"):
        iconSrc = "assests/bijili.png";
        break;

      case conditionText.includes("overcast"):
        iconSrc = "assests/HeavyRain.png";
        break;

      default:
        iconSrc = "assests/windyday.png";
    }

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h4>${dayName}</h4>
      <img src="${iconSrc}" alt="${day.day.condition.text}" />
      <p>${temp}</p>
    `;

    forecastElement.appendChild(card);
  });
}

// graph section
let forecastChart; // Global reference

function renderForecastGraph(data) {
  const forecastDays = data.forecast.forecastday;

  const labels = forecastDays.map((day) => {
    const date = new Date(day.date);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  });

  const temps = forecastDays.map((day) => day.day.avgtemp_c);

  const ctx = document.getElementById("forecastChart").getContext("2d");

  // Destroy previous chart instance if it exists
  if (forecastChart) {
    forecastChart.destroy();
  }

  forecastChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Avg Temp (°C)",
          data: temps,
          // backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "#6A6969",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#4bc0c0",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Temperature (°C)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Day",
          },
        },
      },
    },
  });
}
