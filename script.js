var apiKey = "6d0e27a1bde81971c768423d4c6f86f7";
var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
var cityName = $("#cityName").val();

// RETRIEVING THE ARRAY OF INFORMATION FROM THE WEATHER API
$("#weatherBtn").on("click", function weather() {
  cityName = $("#cityName").val().toLowerCase();
  console.log(weatherURL + cityName + "&units=imperial" + "&appid=" + apiKey);
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
      dayTwoWeatherData(result);
      dayThreeWeatherData(result);
      dayFourWeatherData(result);
      dayFiveWeatherData(result);

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
    li.attr('id','#weatherBtn')
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
// FUNCTION TO LOAD UP THE NEXT DAYS WEATHER
function dayOneWeatherData(response){
  
  var dateOne = response.list[8].dt_txt;
  var weatherIconOne = response.list[8].weather[0].icon;
  var tempOne = response.list[8].main.temp;
  var humidOne = response.list[8].main.humidity;
  var iconURL = "http://openweathermap.org/img/w/" + weatherIconOne + ".png";

  $("#dateOne").html("On "+dateOne);
  $("#iconOne").attr('src',iconURL);
  $("#tempOne").html(tempOne+" Degrees Fahrenheit");
  $("#humidOne").html(humidOne+"%");
}
// FUNCTION TO LOAD DAY TWO DATA
function dayTwoWeatherData(response){
  var dateTwo = response.list[16].dt_txt;
  var weatherIconTwo = response.list[16].weather[0].icon;
  var tempTwo = response.list[16].main.temp;
  var humidTwo = response.list[16].main.humidity;
  var iconURL = "http://openweathermap.org/img/w/" + weatherIconTwo + ".png";

  $("#dateTwo").html("On "+dateTwo);
  $("#iconTwo").attr('src',iconURL);
  $("#tempTwo").html(tempTwo+" Degrees Fahrenheit");
  $("#humidTwo").html(humidTwo+"%");

}
//FUNCTION TO LOAD DAY THREE DATA
function dayThreeWeatherData(response){
  var dateThree = response.list[24].dt_txt;
  var weatherIconThree = response.list[24].weather[0].icon;
  var tempThree = response.list[24].main.temp;
  var humidThree = response.list[24].main.humidity;
  var iconURL = "http://openweathermap.org/img/w/" + weatherIconThree + ".png";

  $("#dateThree").html("On "+dateThree);
  $("#iconThree").attr('src',iconURL);
  $("#tempThree").html(tempThree+" Degrees Fahrenheit");
  $("#humidThree").html(humidThree+"%");

}
//FUNCTION TO LOAD DAY FOUR DATA
function dayFourWeatherData(response){
  var dateFour = response.list[32].dt_txt;
  var weatherIconFour = response.list[32].weather[0].icon;
  var tempFour = response.list[32].main.temp;
  var humidFour = response.list[32].main.humidity;
  var iconURL = "http://openweathermap.org/img/w/" + weatherIconFour + ".png";

  $("#dateFour").html("On "+dateFour);
  $("#iconFour").attr('src',iconURL);
  $("#tempFour").html(tempFour+" Degrees Fahrenheit");
  $("#humidFour").html(humidFour+"%");
}
//FUNCTION TO LOAD DAY FIVE DATA
function dayFiveWeatherData(response){
  var dateFive = response.list[39].dt_txt;
  var weatherIconFive = response.list[39].weather[0].icon;
  var tempFive = response.list[39].main.temp;
  var humidFive = response.list[39].main.humidity;
  var iconURL = "http://openweathermap.org/img/w/" + weatherIconFive + ".png";

  $("#dateFive").html("On "+dateFive);
  $("#iconFive").attr('src',iconURL);
  $("#tempFive").html(tempFive+" Degrees Fahrenheit");
  $("#humidFive").html(humidFive+"%");
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
      //IF STATEMENT TO CHANGE THE BACKGROUND COLOR OF THE UV DIV
       if (uvValue <= 2.9){
        document.getElementById("uv").style.backgroundColor= '#009900';
      }else if(uvValue <= 7.9){
        document.getElementById("uv").style.backgroundColor = '#ffff00';
      }else{
        document.getElementById("uv").style.backgroundColor = '#ff9900';
      }
    },
  });
}




