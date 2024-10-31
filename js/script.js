// const apiUrl = "http://localhost:5500/assets/data/test.json";s
const apiUrl = "https://api.weatherstack.com/current?";
const urlParams = {
  query: "Norwich",
  access_key: "31c2be1ceacb391cc162ad3af2b216c9",
};

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
    const response = await fetch(apiUrl + new URLSearchParams(urlParams));

    //check response is ok
    if (!response.ok) {
      throw new Error("Response Status: ", response.status);
    }

    //obtain json
    const json = await response.json();

    //update functions
    updateValue(temperatureSlider, temperatureValue, json.current.temperature);
    updateValue(windSlider, windValue, json.current.wind_speed);
    updateValue(humiditySlider, humidityValue, json.current.humidity);

    ///
    updateWind(json.current.wind_speed);
    udpateHumidity(json.current.humidity);
  } catch (error) {
    console.error(error);
  }
}

function udpateHumidity(humidity) {
  humidityFilter.style.opacity = (0.5 * Number(humidity)) / 100;
}

function updateWind(windSpeed) {
  const newDuration = ((32 - Number(windSpeed)) * 11) / 32 + 1;

  for (const leaf of leafAnimations) {
    leaf.style.animationDuration = newDuration + "s";
  }
}

function updateValue(sliderElement, valueElement, value) {
  sliderElement.value = value;
  valueElement.innerHTML = value;
}

fetchData();
//fetch data every half second
// setInterval(fetchData, 500);
