$(document).ready(function () {
  console.log("This is loading!");
  // DOM VARIABLES

  // JS VARIABLES
  var APIKey = "a06ddccb5d8eb173daab6e42a55bbeec";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=Dunwoody,Georgia&appid=" +
    APIKey;
  var currentdate = new Date();
  var datetime =  (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear();
  // FUNCTION DEFINITIONS
  function kToF(temp) {
    return (temp - 273.15) * 1.8 + 32;
  }

  function getUVIndex(lon, lat) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log("UV Index: " + response.value);
      $("#UVIndex").text(response.value);
      if(response.value<=2){
        $("#UVIndex").addClass("lowUV");
      } 
      if(response.value > 2 ){
        $("#UVIndex").addClass("mediumUV");
      } 
      if(response.value > 5){
        $("#UVIndex").addClass("highUV");
      } 
    });
  }
  
  function renderCurrentWeather(){
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      var iconUrl =
        "https://api.openweathermap.org/img/w/" +
        response.weather[0].icon +
        ".png";
      var tempF = kToF(response.main.temp);
      var heatIndex = kToF(response.main.feels_like);
      // Update the UI with the current weather data.
      $("#city").text( response.name + " " + datetime );
      $("#iconImg").attr("src", iconUrl);
      $("#tempF").text(tempF.toFixed(2) + " F");
      $("#humidity").text(response.main.humidity + "%");
      $("#wind").text(response.wind.speed + " MPH");
      $("#heatIndex").text(heatIndex.toFixed(2) + " F");
      getUVIndex(response.coord.lon, response.coord.lat);
      console.log("Wind Speed: " + response.wind.speed);
      console.log(iconUrl);
      console.log("Humidity: " + response.main.humidity);
      console.log("longitude: " + response.coord.lon);
      console.log("latitude: " + response.coord.lat);
      console.log("Temperature (F): " + tempF);
      console.log("Heat Index: " + response.main.feels_like);
    });
  }

  // FUNCTION CALLS
  renderCurrentWeather()
  // EVENT LISTENERS
});
