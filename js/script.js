//temperature
const temperatureSlider = document.getElementById("temperature-slider");
const temperatureValue = document.getElementById("temperature-value");

//wind
const windSlider = document.getElementById("wind-slider");
const windValue = document.getElementById("wind-value");

function setTemperature(current) {
  temperatureSlider.value = current.temperature;
  temperatureValue.innerHTML = current.temperature;
}

function setWind(current) {
  windSlider.value = current.wind_speed;
  windValue.innerHTML = current.wind_speed;
}

async function fetchData() {
  try {
    const response = await fetch(
      "http://localhost:5500/assets/test_data/data.json"
    );
    const json = await response.json();
    setTemperature(json.current);
    setWind(json.current);
  } catch (error) {
    console.error(error);
  }
}

setInterval(fetchData, 1000);
