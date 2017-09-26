$(document).ready(function() {

 var sport = [
    "karate", "baseball", "football", "lacrosse", "hockey", "basketball", "football", "soccer", "vollyball", "track"
  ];

 // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

   for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

 }

// Search for GIFs, make AJAX call, display data in pictures div

 $(document).on("click", ".sport-button", function() {
    $("#sports").empty();
    $(".sport-button").removeClass("active");
    $(this).addClass("active");

   var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

   $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

     for (var i = 0; i < results.length; i++) {
        var sportDiv = $("<div class=\"sport-item\">");

       var rating = results[i].rating;

       var p = $("<p>").text("Rating: " + rating);

       var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

       var sportImage = $("<img>");
        sportImage.attr("src", still);
        sportImage.attr("data-still", still);
        sportImage.attr("data-animate", animated);
        sportImage.attr("data-state", "still");
        sportImage.addClass("sport-image");

       sportDiv.append(p);
        sportDiv.append(sportImage);

       $("#sports").append(sportDiv);
      }
    });
  });
  // Turn GIF "ON"

 $(document).on("click", ".sport-image", function() {
  
     var state = $(this).attr("data-state");
  
     if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
   $("#add-sport").on("click", function(event) {
      event.preventDefault();
      var newSport = $("input").eq(0).val();
  
     if (newSport.length > 2) {
        sport.push(newSport);
      }
  
     populateButtons(sport, "sport-button", "#sport-buttons");
  
   });
  
   populateButtons(sport, "sport-button", "#sport-buttons");
  });