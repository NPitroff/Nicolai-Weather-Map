var apiKey = "6d0e27a1bde81971c768423d4c6f86f7";
var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
var cityName = $("#cityName").val();

// RETRIEVING THE ARRAY OF INFORMATION FROM THE WEATHER API
$("#weatherBtn").on("click", function weather() {
  cityName = $("#cityName").val().toLowerCase();
  console.log(weatherURL + cityName + "&appid=" + apiKey);
  $.ajax({
    type: "GET",
    url: weatherURL + cityName + "&units=imperial" + "&appid=" + apiKey,
    success: function (result) {
      console.log("The Request was successfull", result);
      var lattitude = result.city.coord.lat;
      var longitude = result.city.coord.lon;
       getUVIndex(lattitude, longitude);
      //APPENDING A DIV TO THE WEBSITE THAT CONTAINS THE WEATHER
      currentWeatherData(result);
      dayOneWeatherData(result);

      //   RETRIEVING THE LAST SEARCHED CITIES, IF NULL, ASSIGN A BLANK ARRAY
      var historyList = JSON.parse(localStorage.getItem("cityList")) || [];
      console.log(historyList);
      if (historyList.indexOf(cityName) === -1) {
        //   APPENDING THE NEW SEARCHED CITY TO THE EXISTING LIST
        historyList.push(cityName);
        // SETTING LOCAL STORAGE ITEM WITH A COMBINED LIST
        localStorage.setItem("cityList", JSON.stringify(historyList));
      }
    //   ADDING VALUES TO THE HISTORY LIST
    var li =$("<li>").text(cityName.toUpperCase())
    $("#searched-cities").append(li);
    },
    error: function (result) {
      console.log("Failed Request");
    },
  });
});

//FUNCTION TO APPEND THE CURRENT DAYS WEATHER DATA
function currentWeatherData(response){
  console.log(response)
  
  var searchName = response.city.name;
  var todaysDate = response.list[0].dt_txt;
  //OPEN WEATHER ICON LOCATION
  var weatherIcon = response.list[0].weather[0].icon; 
  var todaysTemp = response.list[0].main.temp;
  var todaysHumidity = response.list[0].main.humidity;
  var todaysWindSpeed = response.list[0].wind.speed;  
  //OPEN WEATHER ICON URL
  var iconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
  //  COMMANDS TO APPEND TO THE CURRENT DAYS WEATHER
   $("#city").html(searchName);
   $("#date").html(todaysDate);
   $("#icon").attr('src', iconURL);
   $("#temp").html("Current Tempurature: "+ todaysTemp+ " Degrees Fahrenheit");
   $("#humid").html("Current Humidity is "+todaysHumidity+"%");
   $("#speed").html("With a wind speed of "+todaysWindSpeed+"mph");
   
}

function dayOneWeatherData(response){
  console.log(response);
  var dateOne = response.list[1].dt_txt;
  var weatherIconOne = response.list[1].weather[0].icon;
  var tempOne = response.list[1].main.temp;
  var humidOne = response.list[1].main.humidity;
  var iconURL = "http://openweathermap.org/img/w/" + weatherIconOne + ".png";

  $("#dateOne").html("On "+dateOne);
  $("#iconOne").attr('src',iconURL);
  $("#tempOne").html(tempOne+" Degrees Fahrenheit");
  $("#humidOne").html(humidOne+"%");
}

function getUVIndex(lat, lon) {
  $.ajax({
    type: "GET",
    url:
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey,
    success: function (uvResult) {
      console.log("UV Result", uvResult);
      var uvValue = uvResult.value;
      $("#uv").html("UV index is: "+uvValue);
      //   IF ELSE CONDITION BASED ON THE UV RESULT.VALUE ie "If (uvReult.value < 3) {background color:green}"
    },
  });
}




