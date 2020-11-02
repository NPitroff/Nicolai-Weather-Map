var apiKey = "6d0e27a1bde81971c768423d4c6f86f7";
var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
var cityName = $("#cityName").val();

$("#weatherBtn").on("click", function weather() {
  cityName = $("#cityName").val().toLowerCase();
  console.log(weatherURL + cityName + "&appid=" + apiKey);
  $.ajax({
    type: "GET",
    url: weatherURL + cityName + "&appid=" + apiKey,
    success: function (result) {
      console.log("The Request was successfull", result);
      var lattitude = result.city.coord.lat;
      var longitude = result.city.coord.lon;
      getUVIndex(lattitude, longitude);

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
      //   IF ELSE CONDITION BASED ON THE UV RESULT.VALUE ie "If (uvReult.value < 3) {background color:green}"
    },
  });
}


