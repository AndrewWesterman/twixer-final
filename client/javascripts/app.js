function main(){
    "use strict";

    var votes;

    var loadVotes = function(){
        $(".vote-queue").empty();
        $(".voted").empty();
        $(".tweets").empty();

        $.post("votes", function(res){
            var toVote = res.toVote,
                voted = res.voted;
            toVote.forEach(function(tweet){
                $(".vote-queue").append(createTweetHTML(tweet.text));
            });

            voted.forEach(function(tweet){
                $(".voted").append($("<p>").text(tweet));
            });
        });
        $.post("tally",function(res){
            var tweets = res.tally;
            tweets.forEach(function(tweet){
                $(".tweets").append($("<p>").text("'"+tweet.text+"' Yes: "+tweet.yes+" No: "+tweet.no));
                doneVoting(tweet);
            });
        });
    };

    $.post("user", function(res){
        $("#username").text(res);
    });
    loadVotes();

    $("#submit").on("click", function(){
        var tweetText = $("#tweet").val();
        if(tweetText.length > 140){
            alert("Tweet must be no 140 characters or less");
        } else if (tweetText === ""){
            alert("Tweets cannot be empty");
        } else {
            $.post("submit",{tweet: tweetText});
            loadVotes();
        }
        
    });

    //Event handler for yes votes
    var upvoteClick = function(){
        var $tweet = $(this).parent(),
            text = $tweet.find("span").text();
        var username = $("#username").text();
        $.post("yes",{ user: username, tweet: text });
        loadVotes();
    };

    var downvoteClick = function(){
        var $tweet = $(this).parent(),
            text = $tweet.find("span").text();
        var username = $("#username").text();
        $.post("no",{ user: username, tweet: text });
        loadVotes();
    };

    function doneVoting(tweet){        
        if(tweet.status === "post"){
            console.log("posting to twitter");
            $.post("post",{tweet: tweet.text});
        }
    }

    // //Prepares and return a tweet html object
    function createTweetHTML(text){
        var $tweet = $("<div>").addClass("tweet-obj"),
            $text = $("<span><table><tr><td>").text(text),
            $upvote = $("</td><td><button>Yes</button></td>"),        
            $downvote = $("<td><button>No</button></td></tr></table>");

        //initialize buttons
        $upvote.click(upvoteClick);
        $downvote.click(downvoteClick);

        //build tweet object
        $tweet.append($text);
        $tweet.append($upvote);
        $tweet.append($downvote);

        return $tweet; 
    }
}

$(document).ready(main);