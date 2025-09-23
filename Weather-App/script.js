document.addEventListener("DOMContentLoaded", function() 
{
    document.getElementById("searchBtn").addEventListener("click", function() 
    {
        const city = document.getElementById("cityInput").value;
        console.log("Search button clicked, city input: " + city);
        getWeather(city);
    });
});

function getWeather(city)
{
    console.log("Getting weather..: " + city);
    fetch('pages/weather.json')  
    .then(response => response.json())
    .then(data =>
    {
        const cityWeather = data.find(item => item.cityName.toLowerCase() === city.toLowerCase());

        if (cityWeather)
        {
            showWeather(cityWeather);
            updateBackgroundColor(cityWeather.temperatureCelsius); 
        }
        else
        {
            alert('City not found!');
        }
    })
    .catch(error =>
    {
        console.error('Error fetching weather data:', error);
    });
}


function showWeather(cityWeather)
{
    if (document.getElementById('temperature'))
    {
        document.getElementById('temperature').innerText = `${cityWeather.temperatureCelsius}°C`;
    }
    if (document.getElementById('humidity'))
    {
        document.getElementById('humidity').innerText = `${(cityWeather.humidity * 100).toFixed(1)}%`;
    }
    if (document.getElementById('uvIndex'))
    {
        document.getElementById('uvIndex').innerText = cityWeather.uvIndex;
    }
    if (document.getElementById('windSpeed'))
    {
        document.getElementById('windSpeed').innerText = cityWeather.windSpeed;
    }
    
    localStorage.setItem("weatherData", JSON.stringify(cityWeather));
    updateIconColor(cityWeather); 
}

function toggleTemperature() 
{
    const tempElement = document.getElementById("temperature");
    let tempText = tempElement.innerText;
    let tempValue = parseFloat(tempText.match(/[-+]?[0-9]*\.?[0-9]+/)[0]);

    if (tempText.includes("°C")) 
    {
        tempElement.innerText = `${(tempValue * 9/5 + 32).toFixed(1)}°F`;
    } 
    else 
    {
        tempElement.innerText = `${((tempValue - 32) * 5/9).toFixed(1)}°C`;
    }
}

function updateBackgroundColor(temperature)
{
    if (temperature > 20)
    {
        document.body.style.backgroundColor = "aqua"; 
    }
    else if (temperature > 10)
    {
        document.body.style.backgroundColor = "yellow"; 
    }
    else
    {
        document.body.style.backgroundColor = "gray"; 
    }
}

function updateIconColor(weatherData) 
{
    if (!weatherData) return;

    let icon = document.querySelector(".icon");

    if (document.getElementById("temperature")) 
    {
        icon.style.color = weatherData.temperatureCelsius > 20 ? "red" : "blue";
    }

    if (document.getElementById("humidity")) 
    {
        icon.style.color = weatherData.humidity > 0.6 ? "blue" : "gray";
    }

    if (document.getElementById("uvIndex")) 
    {
        icon.style.color = weatherData.uvIndex > 5 ? "orange" : "green";
    }

    if (document.getElementById("windSpeed")) 
    {
        icon.style.color = parseInt(weatherData.windSpeed) > 15 ? "purple" : "black";
    }
}









