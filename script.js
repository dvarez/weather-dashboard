
// when a search for a city, presented with current and future condiitons for that city, and city is added to the search history.
// when current weather conditions for a city are presented, city name, the date, an icon representation, the temperature, the humidity, the wind speed, the UV index.
// when the UV index is presented, a color is indicative whether the condiions are favorable, moderate, or severe.
// when future weather conditions for a city, a five day forcast dispays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
// when clicked on a city in the search history, again presented with current and future conditions for that city.


console.log("hello world")
var weatherBtn = document.getElementById("searchBtn")
var requestBtn = document.getElementById("search")
var cityArray = []
var APIKey = "ad7e308f01fc88ecad0f71475a7096e2"


function getApi(city) {
    console.log(city);
    cityArray.push(city)
    localStorage.setItem('city', JSON.stringify(cityArray) );

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // for (var i = 0; i < data.length; i++) {
            //     var listItem = document.createElement('li');
            //     listItem.textContent = data[i].html_url;
            //     repoList.appendChild(listItem);
            // }
            console.log(data)
            document.getElementById("cityName").textContent = "city: " + city
            document.getElementById("temperature").textContent = "temperature: " + data.main.temp
            document.getElementById("humidity").textContent = "humidity: " + data.main.humidity
            document.getElementById("windspeed").textContent = "windspeed: " + data.wind.speed

            var dailyUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=hourly&appid=" + APIKey

            fetch(dailyUrl)
                .then(function(res) {
                  return res.json();      

                })
                .then(function (dailyData) {
                    console.log(dailyData)
                    document.getElementById("UvIndex").textContent = "UVIndex: " + dailyData.current.uvi


                 })   
        });
}

weatherBtn.addEventListener("click", function (e) {
    e.preventDefault();
    getApi(requestBtn.value);
})









