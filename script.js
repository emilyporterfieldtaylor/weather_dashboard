var cityList = [];
const apiKey = "ef8cf9f7ace571698b37ad03714d34f7";

function GetWeather(city) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&APPID=" + apiKey;
    var lat = 0;
    var lon = 0;
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var dateTime = moment(response.dt, "X").format("MM/DD/YYYY");
        $("#cityMain").html(response.name + " " + dateTime + "<img src=\"http://openweathermap.org/img/w/" + response.weather[0].icon + ".png\">");
        $("#temperature").text(response.main.temp);
        $("#humidity").text(response.main.humidity);
        $("#windSpeed").text(response.wind.speed);
        
        lat = response.coord.lat;
        lon = response.coord.lon;
        var uviURL = "https://api.openweathermap.org/data/2.5/uvi?&APPID=" + apiKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#uvIndex").text(response.value);
            uvIndexLevel(response.value);
        });
    });

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var dateArr = (response.list);

        var counter = 1;
        $(dateArr).each(function (index, element) {
            if (element.dt_txt.endsWith("15:00:00")) {
                getForecast(element, counter++);
            }
        });

    });
}

function getForecast(element, dayNumber) {
    var dateTime = moment(element.dt, "X").format("MM/DD/YYYY");
    $("#date" + dayNumber).text(dateTime);
    $("#temp" + dayNumber).text(element.main.temp);
    $("#icon" + dayNumber).html("<img src=\"http://openweathermap.org/img/w/" + element.weather[0].icon + ".png\">");
    $("#humidity" + dayNumber).text(element.main.humidity);
}

function addButton(city) {
    $(".searchHistory").prepend("<div class='row'><div class='col'><button type=\"button\" class=\"btn btn-outline-info city-btn\" id=\"citySearch\">" + city + "</button></div></div>");
}

function searchCity(city) {
    console.log("City: " + city)
    if (city === null || city === '') {
        return;
    }
    $(".hide").removeClass("hide");
    GetWeather(city);
}

function uvIndexLevel(uvIndex){
    if (uvIndex < 4) {
        $("#uvIndex").addClass("badge badge-pill badge-success");
    } else if (uvIndex >= 4 && uvIndex < 7) {
        $("#uvIndex").addClass("badge badge-pill badge-warning");
    } else if (uvIndex >= 7) {
        $("#uvIndex").addClass("badge badge-pill badge-danger");
    }
}

$(document).ready(function () {
    cityList = JSON.parse(localStorage.getItem("cityList"));;

    if (cityList === null) {
        cityList = [];
    }

    $(cityList).each(function (index, element) {
        addButton(element);
    });

    $(".city-btn").click(function () {
        var cityName = $(this).text();
        searchCity(cityName);
    });

    $("#citySearch").click(function () {
        var city = $("input").val();
        searchCity(city);
        if (city === null || city === '') {
            return;
        }
        if ($.inArray(city, cityList) > -1) {
            return;
        }
        addButton(city);
        cityList.push(city);
        localStorage.setItem("cityList", JSON.stringify(cityList));
    });
});
