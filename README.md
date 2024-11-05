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