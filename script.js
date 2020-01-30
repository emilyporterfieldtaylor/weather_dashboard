$( document ).ready(function() {
    console.log( "ready!" );
});

var city = "Austin";
// var city = JSON.parse(localStorage.getItem("city"));
var apiKey = "ef8cf9f7ace571698b37ad03714d34f7";
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})

if (city != null){
    $("input").each(function (index, element){
        var currentCitySavedValue = city[index];
        $(element).val(currentCitySavedValue); 
    });
}

$("button").click(function(){
    $(".hide").removeClass("hide");
    city = $("input").map(function(){
        return $(this).val();
    });
    localStorage.setItem("city", JSON.stringify(city));
    $(".searchHistory").prepend("<button type=\"button\" class=\"btn btn-outline-info\">" + city[0] + "</button>");
   });

