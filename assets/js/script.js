var city = "";
var nCity = [];
var searchCityEl = $("#search-city");
var searchButton = $("#search-button");
var currentCityEl = $("#current-city");
var currentTemperatureEl = $("#temperature");
var currentHumidityEl = $("#humidity");
var currentSpeedEl = $("#wind-speed");

//Set up the API key
var APIKey = "0c0fef2bed24cf16dda67df2902d8e04";

function displayWeather(event) {
  event.preventDefault();

  city = searchCityEl.val();
  currentWeather(city);
}
// AJAX call
function currentWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var weathericon = response.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/wn/" + weathericon + ".png";

    var date = new Date(response.dt * 1000).toLocaleDateString();

    $(currentCityEl).html(
      response.name + "(" + date + ")" + "<img src=" + iconurl + ">"
    );

    // Convert the temp to fahrenheit

    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(currentTemperatureEl).html(tempF.toFixed(0) + " F");

    $(currentHumidityEl).html(response.main.humidity + "%");

    // convert wind to MPH
    var ws = response.wind.speed;
    var windsmph = (ws * 2.237).toFixed(0);
    $(currentSpeedEl).html(windsmph + " MPH");

    // set local storage
    forecast(response.id);
    if (response.id !== "null") {
      nCity = JSON.parse(localStorage.getItem("cityname"));
      console.log(nCity);
      if (nCity == null) {
        nCity = [];
        nCity.push(city);
        localStorage.setItem("cityname", JSON.stringify(nCity));
        addToList(city);
      } else {
        if (find(city) > 0) {
          nCity.push(city);
          localStorage.setItem("cityname", JSON.stringify(nCity));
          addToList(city);
        }
      }
    }
  });
}

// 5 days forecast for the current city.

function forecast(cityid) {
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityid +
    "&appid=" +
    APIKey;
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    for (i = 0; i < 5; i++) {
      var date = new Date(
        response.list[(i + 1) * 7].dt * 1000
      ).toLocaleDateString();
      var iconcode = response.list[(i + 1) * 7].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
      var tempA = response.list[(i + 1) * 7].main.temp;
      var tempF = ((tempA - 273.5) * 1.8 + 32).toFixed(0);
      var humidity = response.list[(i + 1) * 7].main.humidity;

      $("#wDate" + i).html(date);
      $("#wImg" + i).html("<img src=" + iconurl + ">");
      $("#wTemp" + i).html(tempF + " F");
      $("#wHumidity" + i).html(humidity + "%");
    }
  });
}

function addToList(place) {
  var listEl = $("<li>" + place + "</li>");
  $(listEl).attr("class", "list-group-item");
  $(listEl).attr("data-value", place);
  $(".list-group").append(listEl);
}

// local storage
function loadlastCity() {
  $("ul").empty();
  var nCity = JSON.parse(localStorage.getItem("cityname"));
  if (nCity !== null) {
    nCity = JSON.parse(localStorage.getItem("cityname"));
    for (i = 0; i < nCity.length; i++) {
      addToList(nCity[i]);
    }
    city = nCity[(i -= 1)];

    currentWeather(city);
  }
}

//Click Handlers
$("#search-button").on("click", displayWeather);

$(window).on("load", loadlastCity);
