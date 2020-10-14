$(document).ready(function () {
  console.log("This is loading!");
  // JS VARIABLES
  var APIKey = "a06ddccb5d8eb173daab6e42a55bbeec";
  var myStorage = window.localStorage;
  var currentdate = new Date();
  var datetime =  (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear();
  // FUNCTION DEFINITIONS
  function kToF(temp) {
    return (temp - 273.15) * 1.8 + 32;
  }

  function generateDate(modifier){
    var currentdate = new Date();
    return (currentdate.getMonth() + 1) + "/" + (currentdate.getDate() + modifier) + "/" + currentdate.getFullYear();
  }

  function saveCity(city){
    if (!(myStorage.getItem("current") === null) ) {
      currentCity = myStorage.getItem("current").toLowerCase()
      myStorage.setItem(currentCity, currentCity);
    }
    myStorage.setItem("current", city.toLowerCase());
    myStorage.setItem(city.toLowerCase(), city.toLowerCase());
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
      $("#UVIndex").text(response.value);
      $("#UVIndex").removeClass();
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
  
  function renderCurrentWeather(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" +
    APIKey;
    // myStorage.setItem("current", city);
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // console.log(queryURL);
      // console.log(response);
      var iconUrl =
        "https://api.openweathermap.org/img/w/" +
        response.weather[0].icon +
        ".png";
      var tempF = kToF(response.main.temp);
      var heatIndex = kToF(response.main.feels_like);
      // Update the UI with the current weather data.
      $("#city").text( response.name + " " + datetime );
      $("#iconImg").attr("src", iconUrl);
      $("#tempF").text(tempF.toFixed(2) + " °F");
      $("#humidity").text(response.main.humidity + "%");
      $("#wind").text(response.wind.speed + " MPH");
      $("#heatIndex").text(heatIndex.toFixed(2) + " °F");
      getUVIndex(response.coord.lon, response.coord.lat);
      // console.log("Wind Speed: " + response.wind.speed);
      // console.log(iconUrl);
      // console.log("Humidity: " + response.main.humidity);
      // console.log("longitude: " + response.coord.lon);
      // console.log("latitude: " + response.coord.lat);
      // console.log("Temperature (F): " + tempF);
      // console.log("Heat Index: " + response.main.feels_like);
    });
  }

  function renderFiveDay(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=" +
    APIKey;
    $( "#days-container" ).empty();
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      for (i=1; i<=5; i++){
        currentInfo = response.list[i-1]
        var iconUrl = "https://api.openweathermap.org/img/w/" +
        currentInfo.weather[0].icon +
        ".png";
        var tempF = kToF(currentInfo.main.temp);
        var humidity = currentInfo.main.humidity + "%"
        var content = '<div class="card"><div class="card-body">'
        content += '<h5 class="card-title">' + (generateDate(i)) + '</h5>';
        content += '<img src="'+ iconUrl +'" /><br>';
        content += '<span>Temperature: ' + tempF.toFixed(2) + ' &deg;F</span><br>';
        content += '<span>Humidity: ' + humidity + '</span>';
        content += '</div></div>';
        $('#days-container').append(content);
      }
    });
  }

  function renderhistory(dict){
    $( "#history" ).empty();
    i = dict.length;
    Object.keys(dict).forEach(function(key) {
      if(key != "current"){
        var content = '<button class="btn btn-outline-dark btn-md btn-block" type="button">'
        content += dict[key].charAt(0).toUpperCase() + dict[key].slice(1);
        content += '</button>';
        $('#history').append(content);
      }
    });
  }

  function allStorage() {
    var values = {};
    keys = Object.keys(myStorage),
    i = keys.length;
    while ( i-- ) {
        values[keys[i]] =  myStorage.getItem(keys[i]) ;
    }
    return values;
}

  // FUNCTION CALLS
  pastData = allStorage()
  renderCurrentWeather(myStorage.getItem("current"))
  renderFiveDay(myStorage.getItem("current"))
  renderhistory(pastData)
  // EVENT LISTENERS
  $("#history").on('click',"button", function (event) {
    event.preventDefault();
    city = event.target.innerText;
    console.log(event.target.innerText)
    saveCity(city)
    renderCurrentWeather(city)
    renderFiveDay(city)
    pastData = allStorage()
    renderhistory(pastData)
  });

  $("#userInput").on("submit", function (event) {
    event.preventDefault();
    var city = $("#city-input").val();
    saveCity(city)
    renderCurrentWeather(city)
    renderFiveDay(city)
    pastData = allStorage()
    renderhistory(pastData)
    $("#city-input").val("");
  });

  $( "#clear-history" ).click(function() {
    pastData = allStorage()
    Object.keys(pastData).forEach(function(key) {
      if(key != "current"){
        myStorage.removeItem(key)
      }
    });
    location.reload();
  });



});
