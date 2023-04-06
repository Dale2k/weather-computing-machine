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

    conditions(response);
    day5();
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

function day5() {
  var date = new Date();

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET",
  }).then(function (response) {
    $("#forecast").empty();

    // variable for response.list
    let results = response.list;

    for (i = 0; i < 5; i++) {
      var forTemp = (results[i].main.temp - 273.15) * 1.8 + 32;
      var forTemp = Math.floor(forTemp);
      const d = new Date();
      let text = d.toDateString();
      console.log(text);

      let textMo = text.substring(4, 7);
      console.log(textMo);

      let textDay = text.substring(8, 11);
      console.log(textDay);

      let textNum = +textDay;
      console.log(textNum);
      let dateAdv = textNum + i;
      console.log(`${textMo}-${dateAdv}`);

      var card = $("<div>").addClass("col-md-2 ml-4 bg-primary text-white");
      var cardBody = $("<div>").addClass("card-body p-3 forecastBody");
      var cardDate = $("<p>")
        .addClass("card-title")
        .text(`${textMo}-${dateAdv}`);

      var temperature = $("<p>")
        .addClass("card-text forecastTemp")
        .text(`Temperature: ${forTemp} °F`);
      var humidity = $("<p>")
        .addClass("card-text forecastHumidity")
        .text(`Humidity: ${results[i].main.humidity}%`);

      var image = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          results[i].weather[0].icon +
          ".png"
      );

      cardBody.append(cardDate, image, temperature, humidity);
      card.append(cardBody);
      $("#forecast").append(card);
    }
  });
}
