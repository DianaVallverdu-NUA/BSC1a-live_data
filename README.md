# Live Data

In this workshop we created a weather app using the [weatherstack API](weatherstack.com). This guide does not include HTML & CSS step by steps, you can use the [miro board](https://miro.com/app/board/uXjVLLxj1G8=/?moveToWidget=3458764605167357573&cot=14) as a guide for that.

## Step By Step

### Obtaining an API key

For the app that we are creating today, it is necessary to obtain an API key. For this you will have to:

1. Access the website [weatherstack.com](weatherstack.com).
2. Create a new user using your student account.
3. Copy the API key from your user dashboard.

### Obtaining Test Data With postman

1. If you don't have it, install [Postmant](https://www.postman.com/).
2. Open Postman and either log in or choose to use the simple version with no login required.
3. Create a GET request with following properties:

- url: <https://api.weatherstack.com/current>
- Query Params:
  - key: query , value: Norwich
  - key: access_key , value: \<your access key>

4. Press Send
5. Copy the text obtained in the reponse
6. Create a new `test.json` file in your `assets/data` folder
7. Paste the test data in there.

### Setting up the fetch function

Create a `script.js` file, and:

1. add following variable declaration at the top:

```JS
const apiUrl = "/assets/data/test.json";
```

2. Create following function:

```JavaScript
async function fetchData() {
  try {
    //get response from api
    const response = await fetch(apiUrl);

    //check response is ok
    if (!response.ok) {
      throw new Error("Response Status: ", response.status);
    }

    //obtain json
    const json = await response.json();

    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

```

This function will be used to load and update the data from the API. Currently, we are faking the fetch with our downloaded data. This is due to a limit to the API: it only allows for 100 calls per month. Until the website is ready to be published, let's keep this test data as the used one.

3. Now, we need to execute this function. As opposed to the first data task, this function must be executed every second, as the data fetched is live and changing constantly (even if we have a static file atm, it will still be helpful to set it up like this for testing purposes). To do so, add the following line at the bottom of the screen:

```JS
setInterval(fetchData, 500);
```

This line executes the function fetchData every half second. To test it is working, open a website displaying the application, and open the console in the inspector panel. You should see the fetched data being logged as a JavaScript Object.

### Sliders & Values Update

All three sliders can be updated in the same way. For each slider:

1. In the HTML, set the minimmum and maximmum per input with the `min` and `max` attributes. These are:
    - temperature: -10 to 60s
    - wind: 0 to 408 (408 km/h is the maximum non-tornadic wind)
    - humidity: 0 to 100

(you can change these values)
2. In the HTML, create three `p` elements in the `index.html`, below each of the sliders, which contain a `span` to represent the value of said property and a `span` to display the unit of said property. For example:

```HTML
<p><span id="temperature-value"></span><span>ºC</span></p>
```

You can check all units in the [`weatherstack` documentation](https://weatherstack.com/documentation), in the  `Current Weather` section.

3. In the JS, create three variables that point to each of the sliders adapted in step 1, name them `humiditySlider`, `windSlider` and `temperatureSlider` that point to each of these sliders respectively.

4. In the JS, create three variables that point to each of the spans created in step 2, name them  `humidityValue`, `windValue`, and `temperatureValue`.

5. Create three new functions `udpateHumidity`, `updateWind`, `updateTemperature`. Each of these should have a parameter named `newValue`. For example:

```JS
function updateHumidity(newValue) {

}
```

6. Inside each of the functions, update the respective `value` property of each slider to the variable `newValue`. For example:

```JS
function updateHumidity(value) {
    // update slider
    humiditySlider.value = newValue;
}
```

7. Inside each of the functions, update the respective `innerHTML` of each value variable to `newValue`. For example:

```JS
function updateHumidity(value) {
    // update slider
    humiditySlider.value = newValue;
    
    // update displayed value
    humidityValue.innerHTML = humidity;
}
```

8. Execute these functions in succession inside the `fetchData` function, passing the corresponding value to each of them:

```JS
async function fetchData() {
  try {
    //get response from api
    const response = await fetch(apiUrl);

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

```

**Note:** The way to know which specific property of `json.current.propertyName` is to look at the file `test.json`. You'll see how the file is organized as follows:

```JSON
{
  "request": { ... },
  "location": { ... },
  "current": {
      "observation_time": "12:21 PM",
      "temperature": 16,
      "weather_code": 113,
      "weather_icons": [
          "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
      ],
      "weather_descriptions": [
          "Sunny"
      ],
      "wind_speed": 32,
      "wind_degree": 223,
      "wind_dir": "SW",
      "pressure": 1027,
      "precip": 0,
      "humidity": 0,
      "cloudcover": 0,
      "feelslike": 16,
      "uv_index": 1,
      "visibility": 10,
      "is_day": "yes"
  }
}
```

Where all our properties (`wind_speed`, `humidity` and `temperature`) are inside the `current` sub property.

### Update Humidity Filter

To create a humidity filter that displays on top of the weather app:

1. In the HTML, create a new `div` at the top and give it an id, such as `humidity-filter`

2. In your CSS, style it so that it has position absolute, height and width 100vh and 100vw respectively, and z-index set to 2 (this last one will ensure it shows in front of everything else). Also give it a background of color blue (or similar) and opacity 0.5 to begin.

    This should create a blue filter in front of everything else.

3. In your JS, create a new variable that points at the humidity filter div.

4. To style the opacity, we must transform the `humidity` value given by the API, which is a number between 0 and 100, to a number between 0 and 0.5 (giving a maximum of 0.5 opacity, so it does not cover too much). The mathematical transformation would be:

`opacityValue = humidity / 100 * 0.5`

Which, in our JS, would correspond to the following line executed inside the `updateHumidity` function.

```JS
humidityFilter.style.opacity = (0.5 * Number(newValue)) / 100;
```

**Note:** The necessity of `Number(newValue)` is due to the fact that `JSON` values come as a string, thus we need to transform the value before we can mathematically operate with it.

With this, you should now be seeing the filter respond to changes in the `json file`.

### Update Wind Speed

If you haven't done so,

1. add one or multiple leafs to the index.html.
2. Give them a shared class name - for ex. `leaf`.
3. Position them with `position: absolute`, and setting the `top` and `left` initial positions.
4. Create a keyframe to describe their movement, for ex.

    ```CSS

    @keyframes leafmovement {
    0% {
        transform: translate(-100px, 0) rotate(0);
    }
    20% {
        transform: translate(15vw, 10vh) rotate(85deg);
    }
    65% {
        transform: translate(55vw, 12vh) rotate(550deg);
    }
    80% {
        transform: translate(70vw, 17vh) rotate(740deg);
    }
    100% {
        transform: translate(100vw, 25vh) rotate(920deg);
    }
    }
    ```

5. Use the following line to animate them:

```CSS
animation: leafmovement 12s linear infinite;
```

Now, for the actual change from JS:

1. In your JS file, create a `const` array that points to all leafs by using the `document.getElementsByClassName` function.
2. We need to recalculate the `duration` of the animations depending on the `speed` of the wind. Non tornadic high winds are around `408 km/h`. We need to calculate again with the following formula: `durationOfAnimation = ((408 - windSpeed) * 11) / 408 + 1`. This transform values between 0 and 408 to values between 0 and 12.
    - when `windSpeed=0`, `durationOfAnimation=12`
    - when `windSpeed=408`, `durationOfAnimation=1`
3. The code for this calculation can be implemented inside the `updateWind` function with the following line:

    ```JS
    let newDuration = ((408 - Number(newValue)) * 11) / 408 + 1;
    ```

    **Note:** You can always change the maximum duration by changing the `11`. The maximum duration will always be `+1` of that number.

4. You can optionally add a conditional to ensure the `durationOfAnimation` never goes below `1`, by adding:

    ```JS
    if(newDuration < 0.1) newDuration = 0.1;
    ```

    So that tornadic winds stay at maximum strenght, but do not try to represent a duration below zero.
5. Finally, update the duration of the new leaves:

```JS
for (const leaf of leafAnimations) {
    leaf.style.animationDuration = newDuration + "s";
  }
```

With this, your leaf should change speed as you change the value of `wind_speed` in the `json` file.

### Fetch Live Data

Finally, let's fetch actually live data.

1. At the top, replace the `apiUrl` assignement for these two lines:

    ```JS
    const apiUrl = "https://api.weatherstack.com/current?";
    const urlParams = {
    query: "Norwich",
    access_key: "<your access key>",
    };
    ```

2. Replace the `fetch` line in the `fetchData` function by this:

    ```JS
    const response = await fetch(apiUrl + new URLSearchParams(urlParams));
    ```

3. Optionally, replace the `setInterval` line for a single execution of `fetchData()`

    This will  prevent the `api` from being requested too many times!