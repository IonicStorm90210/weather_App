const arrayLocation = [];

function addListenerToSubmitButton() {
    const submitGeo = document.querySelector('.inputSubmit')
    return weatherSubmissionFunction(submitGeo);
}

const weatherSubmissionFunction = element => {
    element.addEventListener('click', async () => {

        arrayLocation.length = 0;
        const cityName = document.querySelector('#inputForCityName').value;
        await fetchApiWeatherRequest(cityName)
        await createHTMLDiv();

    })

}


async function fetchApiWeatherRequest(subElement) {

    try {
        const retrieved = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=----&q=${subElement}&days=3`, {
            mode: 'cors'});
        const weatherData = await retrieved.json();
        //console.log(weatherData);


        const locationName = weatherData.location.name;
        const temperature = weatherData.current.temp_f;
        const feelsLikeTemp = weatherData.current.feelslike_f;
        const weatherCondition = weatherData.current.condition.text;

        const temperatureFuture1 = weatherData.forecast.forecastday[1].day.avgtemp_f;
        const weatherConditionFuture1 = weatherData.forecast.forecastday[1].day.condition.text;
        const temperatureFuture2 = weatherData.forecast.forecastday[2].day.avgtemp_f;
        const weatherConditionFuture2 = weatherData.forecast.forecastday[2].day.condition.text;

        if (arrayLocation.length == 0) {
            arrayLocation.push(locationName, temperature, feelsLikeTemp, weatherCondition, temperatureFuture1, weatherConditionFuture1, temperatureFuture2, weatherConditionFuture2);

            return arrayLocation;
        };
    } catch (error) {
        console.error(error);
    };
}

async function createHTMLDiv() {

    console.log(arrayLocation)
    const nameDiv = await document.querySelector('#cityContainer')
    const nameDivData = await arrayLocation[0];
    const tempData = await arrayLocation[1];
    const feelsLikeData = await arrayLocation[2];
    const weatherCondData = await arrayLocation[3];
    const tempFuture1 = await arrayLocation[4];
    const weathCond1 = await arrayLocation[5];
    const tempFuture2 = await arrayLocation[6];
    const weathCond2 = await arrayLocation[7];


    nameDiv.innerHTML = `<div id="mainForecast" class="mainForecast">
                                <h2>${nameDivData}</h2>
                                <div id="tempNumber">${tempData} &#8457;</div>
                                <div class="forecastImage">
                                    <img src="#", alt="${weatherCondData} (image)">
                                </div>   
                                <h4>${weatherCondData}</h4><h4>Feels Like: ${feelsLikeData} &#8457;</h4>
                            </div> 

                            <div id="threeDayForecast"> 
                                <h5>Three Day Forecast</h5>
                                <div id="listForecast" class="listForecast">

                                    <div class="list One">Today: ${tempData} ${weatherCondData}</div>
                                    <div class="list Two">Tomorrow: ${tempFuture1} ${weathCond1}</div>
                                    <div class="list Three">After: ${tempFuture2} ${weathCond2}</div>

                                </div>
                            </div>`;
    weatherGif(weatherCondData)    
    
    return
    
}

async function weatherGif(feelsLike) {
    const img = document.querySelector('img');
    if (feelsLike.toLowerCase().includes("clear")) {
        const response = await fetch('https://api.giphy.com/v1/gifs/B7fDRkwbPkMBq?api_key=----', {mode: 'cors'})
        const weatherData = await response.json();
        console.log(weatherData.data.images.original.url)  
        img.src = weatherData.data.images.original.url;
    }
    else if (feelsLike.toLowerCase().includes("cloudy")) {
        const response = await fetch('https://api.giphy.com/v1/gifs/5RRpW2M5bg5KZJqCsV?api_key=----', {mode: 'cors'})
        const weatherData = await response.json();  
        img.src = weatherData.data.images.original.url;
    }
    else if (feelsLike.toLowerCase().includes("rainy")) {
        const response = await fetch('https://api.giphy.com/v1/gifs/6ZhkSxi5KvORq?api_key=----', {mode: 'cors'})
        const weatherData = await response.json();  
        img.src = weatherData.data.images.original.url;
    }
    else if (feelsLike.toLowerCase().includes("over")) {
        const response = await fetch('https://api.giphy.com/v1/gifs/3o7rc6sa2RvKo8K5EI?api_key=----', {mode: 'cors'})
        const weatherData = await response.json();  
        img.src = weatherData.data.images.original.url;
    }
    

};

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.querySelector('.inputSubmit').click();
    }
})

addListenerToSubmitButton();



//{weatherData.find( (locationName) => { locationName.name === name})}