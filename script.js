$( document ).ready(function() {
    console.log( "ready!" );
});

var city = JSON.parse(localStorage.getItem("city"));

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
    $(".searchHistory").prepend("<button>" + city[0] + "</button>");
   });