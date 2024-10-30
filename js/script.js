const temperatureSlider = document.getElementById("temperature-slider");
const temperatureValue = document.getElementById("temperature-value");

function setTemperature(current) {
  temperatureSlider.value = current.temperature;
  temperatureValue.innerHTML = current.temperature;
}

async function fetchData() {
  try {
    const response = await fetch(
      "http://localhost:5500/assets/test_data/data.json"
    );
    const json = await response.json();
    setTemperature(json.current);
  } catch (error) {
    console.error(error);
  }
}

setInterval(fetchData, 1000);
