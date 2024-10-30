//temperature
const temperatureSlider = document.getElementById("temperature-slider");
const temperatureValue = document.getElementById("temperature-value");

//wind
const windSlider = document.getElementById("wind-slider");
const windValue = document.getElementById("wind-value");

//leaves
const leaves = document.getElementsByClassName("animated");

const windScale = [
  {
    maxWindValue: 0.5,
    durationValue: 12,
  },

  {
    maxWindValue: 2,
    durationValue: 10,
  },
  {
    maxWindValue: 3,
    durationValue: 9,
  },
  {
    maxWindValue: 8,
    durationValue: 7,
  },
  {
    maxWindValue: 13,
    durationValue: 6,
  },
  {
    maxWindValue: 19,
    durationValue: 5.5,
  },
  {
    maxWindValue: 25,
    durationValue: 5,
  },
  {
    maxWindValue: 32,
    durationValue: 4.5,
  },
  {
    maxWindValue: 39,
    durationValue: 4,
  },
  {
    maxWindValue: 47,
    durationValue: 3.5,
  },
  {
    maxWindValue: 55,
    durationValue: 3,
  },
  {
    maxWindValue: 64,
    durationValue: 2.5,
  },
  {
    maxWindValue: 73,
    durationValue: 2,
  },
];

function setTemperature(current) {
  temperatureSlider.value = current.temperature;
  temperatureValue.innerHTML = current.temperature;
}

function setWind(current) {
  windSlider.value = current.wind_speed;
  windValue.innerHTML = current.wind_speed;

  let durationValue = 0;
  for (const level of windScale) {
    console.log("checking level", level);
    console.log(current.wind_speed, level.maxWindValue);
    if (current.wind_speed < level.maxWindValue) break;
    durationValue = level.durationValue;
  }

  for (const leave of leaves) {
    console.log("setting duration value to", durationValue);
    leave.style.animationDuration = durationValue + "s";
  }
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
