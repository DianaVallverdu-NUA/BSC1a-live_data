const apiUrl = "/assets/data/test.json";
// const apiUrl = "https://api.weatherstack.com/current?";
// const urlParams = {
//   query: "Norwich",
//   access_key: "31c2be1ceacb391cc162ad3af2b216c9",
// };

//sliders
const humiditySlider = document.getElementById("humidity-slider");
const windSlider = document.getElementById("wind-slider");
const temperatureSlider = document.getElementById("temperature-slider");

//values
const temperatureValue = document.getElementById("temperature-value");
const humidityValue = document.getElementById("humidity-value");
const windValue = document.getElementById("wind-value");

//animations
const leafAnimations = document.getElementsByClassName("leaf");

//filter
const humidityFilter = document.getElementById("humidity-filter");

/**
 *
 */
async function fetchData() {
  try {
    //get response from api
    const response = await fetch(apiUrl);
    // const response = await fetch(apiUrl + new URLSearchParams(urlParams));

    //check response is ok
    if (!response.ok) {
      throw new Error("Response Status: ", response.status);
    }

    //obtain json
    const json = await response.json();

    //update functions
    udpateHumidity(json.current.humidity);
    updateWind(json.current.wind_speed);
    updateTemperature(json.current.temperature);
  } catch (error) {
    console.error(error);
  }
}

function udpateHumidity(humidity) {
  
  humiditySlider.value = humidity;
  humidityValue.innerHTML = humidity;

  humidityFilter.style.opacity = (0.5 * Number(humidity)) / 100;
}

function updateWind(windSpeed) {
  windSlider.value = windSpeed;
  windValue.innerHTML = windSpeed;

  const newDuration = ((32 - Number(windSpeed)) * 11) / 32 + 1;

  for (const leaf of leafAnimations) {
    leaf.style.animationDuration = newDuration + "s";
  }
}

function updateTemperature(temperature) {
  temperatureSlider.value = temperature;
  temperatureValue.innerHTML = temperature;
}

// fetchData();
//fetch data every half second
setInterval(fetchData, 500);
