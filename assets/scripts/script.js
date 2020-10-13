$(document).ready(function () {
console.log("This is loading!");
  // DOM VARIABLES

  // JS VARIABLES
  var APIKey = "a06ddccb5d8eb173daab6e42a55bbeec";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Dunwoody,Georgia&appid=" + APIKey;
  
  // FUNCTION DEFINITIONS
  function kToF(temp){
    return ((temp - 273.15) * 1.80 + 32)
  }
  // FUNCTION CALLS
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);
      
      $("#city").html("<h1>" + response.name + "</h1>");
      
      
      $("#wind").text("Wind Speed: " + response.wind.speed);
      $("#humidity").text("Humidity: " + response.main.humidity);
      
      var iconurl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      var tempF = kToF(response.main.temp);
      var heatIndex = kToF(response.main.feels_like);
      
      $("#tempF").text("Temperature (F) " + tempF.toFixed(2));
      $("#heatIndex").text("Heat Index: " + heatIndex.toFixed(2));
      $("#iconImg").attr("src", iconurl);

        console.log("Wind Speed: " + response.wind.speed);
        console.log(iconurl);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
        console.log("Heat Index: " + response.main.feels_like);
    })
  // EVENT LISTENERS
});
