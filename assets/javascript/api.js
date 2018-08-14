var topics = [];


$(document).on("click",".topic", function() {
    event.preventDefault();
    var topic = ($(this).attr("data-name")) ;
    var apiKey = "vh7aVQK5fbGTKZONe6lqziwXU70heo63";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=1";
    $.ajax({

        url: queryURL,
        method: "GET"
      
      }).then(function(response) {
        $("#gifs-go-here").append("<div id='gifs'>");
        var results = response.data;
        var topicImage = $("<img>");
        topicImage.attr("src", results[0].images.fixed_height_still.url)
        topicImage.attr("data-animate", results[0].images.fixed_height.url)
        topicImage.attr("data-still", results[0].images.fixed_height_still.url)
        topicImage.attr("data-state", "still");
        topicImage.addClass("gif");
        $("#gifs").append(topicImage);
        $(".gif").on("click", function() {
            console.log("hello")
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                console.log("hellooo");
            }
            else {
                $(this).attr("src",$(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
      });
    
})


function renderButton() {
    $("#buttonList").empty();
    for (var i = 0; i < topics.length; i++) {
        var topicButton = $("<button>");
        topicButton.addClass("topic");
        topicButton.addClass("btn");
        topicButton.addClass("btn-dark")
        topicButton.attr("data-name", topics[i]);
        topicButton.text(topics[i]);
        $("#buttonList").append(topicButton);
        console.log("hello")
    }
}


$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    console.log("yo")
    renderButton();
})
