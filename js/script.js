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

function udpateHumidity(newValue) {
  
  humiditySlider.value = newValue;
  humidityValue.innerHTML = newValue;

  humidityFilter.style.opacity = (0.5 * Number(newValue)) / 100;
}

function updateWind(newValue) {
  windSlider.value = newValue;
  windValue.innerHTML = newValue;

  let newDuration = ((408 - Number(newValue)) * 11) / 408 + 1;
  if(newDuration < 0.1) newDuration = 0.1;

  for (const leaf of leafAnimations) {
    leaf.style.animationDuration = newDuration + "s";
  }
}

function updateTemperature(newValue) {
  temperatureSlider.value = newValue;
  temperatureValue.innerHTML = newValue;
}

// fetchData();
//fetch data every half second
setInterval(fetchData, 500);
