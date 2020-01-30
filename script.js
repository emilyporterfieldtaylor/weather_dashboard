var cityList = [];
const apiKey = "ef8cf9f7ace571698b37ad03714d34f7";

function GetWeather(city) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
         var dateTime = (" " + moment(response.dt, "X").format("MM/DD/YYYY"));
        $("#cityMain").text(response.name + " " + dateTime);
        $("#temperature").text(Math.floor((response.main.temp - 273.15) * 1.80) + 32);
        //$("#temperature").text(response.main.temp + " " + response.weather[0].icon);
        $("#humidity").text(response.main.humidity);
        $("#windSpeed").text(response.wind.speed);
    });

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var dateTime = (" " + moment(response.list[0].dt, "X").format("MM/DD/YYYY"));
        var dateArr = (response.list[0]);

        $(dateArr).each(function(index, element){
            getForecast(dateTime, response);
        });
        
    });
}

function getForecast(dateTime, response){
    $("#dateFive").text(dateTime);
    $("#tempFive").text(response.list[1].main.temp);
    $("#iconFive").append("<img src=\"http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png\">");
    $("#humidityFive").text(response.list[1].main.humidity);
}

function addButton(city) {
    $(".searchHistory").prepend("<div class='row'><div class='col'><button type=\"button\" class=\"btn btn-outline-info city-btn\">" + city + "</button></div></div>");
}

function searchCity(city) {
    if (city === null || city === '') {
        return;
    }
    $(".hide").removeClass("hide");
    GetWeather(city);
}

$(document).ready(function () {
    cityList = JSON.parse(localStorage.getItem("cityList"));;
    
    if (cityList === null) {
        cityList = [];
    }

    $(cityList).each(function(index, element){
        addButton(element);
    });

    $(".city-btn").click(function () {
        var cityName = $(this).text();
        searchCity(cityName);
    });

    $("#citySearch").click(function () {
        var city = $("input").val();
        searchCity(city);
        if ($.inArray(city, cityList) > -1){
            return;
        }
        addButton(city);
        cityList.push(city);
        localStorage.setItem("cityList", JSON.stringify(cityList));
    });
});
