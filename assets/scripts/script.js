$(document).ready(function () {
console.log("This is loading!");
  // DOM VARIABLES

  // JS VARIABLES
  var APIKey = "a06ddccb5d8eb173daab6e42a55bbeec";
  // FUNCTION DEFINITIONS
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Dunwoody,Georgia&appid=" + APIKey;
  // FUNCTION CALLS
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);
      
      $(".city").html("<h1>" + response.name + " Weather Details  </h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
        
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;

      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
    
    })
  // EVENT LISTENERS
});
