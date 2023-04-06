// endpoint: api.openweathermap.org
// API Call example: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0c0fef2bed24cf16dda67df2902d8e04

// api key
var apiKey = "&appid=0c0fef2bed24cf16dda67df2902d8e04";

$("#searchBtn").on("click", function () {
  $("#weekly").addClass("show"); //

  // user input
  city = $("#setCity").val();

  //API string
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  var date = new Date();

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    // convert given temp from Calvin to Celsius to Fahrenheit
    var cTemp = (response.main.temp - 273.15) * 1.8 + 32;

    // response fnc
    // day5 fnc
    // makeList fnc
  });
});

function makeList() {
  var listItem = $("<li>").addClass("list-group").text(city);
  $(".list").append(listItem);
}
