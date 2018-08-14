var topics = ['cats', 'dogs', 'fish', 'mouse'];
var gifCounter = 0;

$(document).on("click",".topic", function() {
    event.preventDefault();
    var topic = ($(this).attr("data-name")) ;
    var apiKey = "vh7aVQK5fbGTKZONe6lqziwXU70heo63";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=${'random'}" + topic + "&api_key=" + apiKey + "&limit=10";
    $.ajax({

        url: queryURL,
        method: "GET"
      
      }).then(function(response) {
        console.log(response);
        for (var i = 0; i < topics.length; i++) {
        $("#gifs-go-here").append("<div id='gifs'>");
        // $("#gifs-go-here").append("<div id='gifCount-" + gifCounter + "'>")
        // $("#gifCount").append("<div id='gifs'>");
        var results = response.data;
        var topicImage = $("<img>");
        topicImage.attr("src", results[i].images.fixed_height_still.url)
        topicImage.attr("data-animate", results[i].images.fixed_height.url)
        topicImage.attr("data-still", results[i].images.fixed_height_still.url)
        topicImage.attr("data-state", "still");
        topicImage.addClass("gif");
        $("#gifs").append(topicImage);
        $("#gifs").append("<p> Rating: " + results[0].rating + "</p>");
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src",$(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
        }
      });
    gifCounter++;
})


function renderButton() {
    $("#buttonList").empty();
    for (var i = 0; i < topics.length; i++) {
        var topicButton = $("<button>");
        topicButton.addClass("topic");
        topicButton.addClass("btn");
        topicButton.addClass("btn-dark")
        topicButton.attr("data-name", topics[i]);
        topicButton.text(topics[i])
        $("#buttonList").append(topicButton);
        console.log("hello")
    }
}


$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    renderButton();
})

$("input[type='submit']").on("click", function(event) {
    event.preventDefault();
    // Setting the input value to a variable and then clearing the input
    $("input[type='text']").val("");
})
renderButton();
