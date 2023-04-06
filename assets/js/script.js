// endpoint: api.openweathermap.org
// API Call example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0c0fef2bed24cf16dda67df2902d8e04

// api key
var apiKey = "&appid=0c0fef2bed24cf16dda67df2902d8e04";

$("#searchBtn").on("click", function () {
  $("#weekly").addClass("show"); //

  // user input
  city = $("#setCity").val();

  //API string
  // var queryUrl =
  //   "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}" +
  //   apiKey;
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  var date = new Date();

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    // convert given temp from Calvin to Celsius to Fahrenheit
    var cTemp = (response.main.temp - 273.15) * 1.8 + 32;

    // $.get(URL, callback)
    // console.log(response);

    conditions(response);
    //   5 day
    makeList();
  });
});

function makeList() {
  var listItem = $("<li>").addClass("list-group").text(city);
  $(".list").append(listItem);
}

function conditions(response) {
  var date = new Date();
  // convert given temp from Calvin to Celsius to Fahrenheit
  var cTemp = (response.main.temp - 273.15) * 1.8 + 32;
  cTemp = Math.floor(cTemp);

  $("#currentCity").empty();

  // current day card
  var card = $("<div>").addClass("card");
  var cardBody = $("<div>").addClass("card-body");
  var place = $("<h4>").addClass("card-title").text(response.name);
  var cityDate = $("<h4>")
    .addClass("card-title")
    // format card current date
    .text(date.toLocaleDateString("en-US"));
  var temperature = $("<h5>")
    .addClass("card-text current-temp")
    .text(`Temperature: ${cTemp}°F`);
  var humidity = $("<h5>")
    .addClass("card-text current-humidity")
    .text(`Humidity: ${response.main.humidity}%`);
  var wind = $("<h5>")
    .addClass("card-text current-wind")
    .text(`Wind Speed: ${response.wind.speed.toFixed(0)} MPH`);
  var image = $("<img>").attr(
    "src",
    "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
  );

  // append tree to page
  place.append(cityDate, image);
  cardBody.append(place, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}
