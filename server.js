#!/usr/bin/env node

var express = require("express"),
    http = require("http"),
    currUsr,
    twixer = require("./voting.js"),
    bodyParser = require("body-parser"),
    Twitter = require("twitter"),
    twitAuth = require("./twitterauth.json"),
    accountList =  require("./accounts.json").accounts,
    tweetList = require("./tweets.json").tweets,
    app = express();

http.createServer(app).listen(3000);

app.use(express.static(__dirname + "/client"));
app.use(bodyParser());
twixer.loadAccounts(accountList);
twixer.loadTweets(tweetList);

var twitter = new Twitter(twitAuth);


app.post("/user/:acct",function(req,res){
    currUsr = req.params.acct;
    console.log("Current user is: "+currUsr);
    res.send("user.html");
});

app.post("/user", function(req,res){
    res.send(currUsr);
});

app.post("/submit", function(req,res){
    var submit = req.body.tweet;
    twixer.createTweet(submit);
});

app.post("/votes", function(req,res){
    var votes = twixer.getTweetsForAcct(currUsr);
    console.log(votes);
    res.json(votes);
});

app.post("/yes",function(req,res){
    var usrVote = { user: currUsr, vote: 1, tweet: req.body.tweet };
    twixer.processVote(usrVote);
});

app.post("/no",function(req,res){
    var usrVote = { user: currUsr, vote: 0, tweet: req.body.tweet };
    twixer.processVote(usrVote);
});

app.post("/tally", function(req,res){
    res.json(twixer.getTally());
});

app.post("/post", function(req,res){
    twitter.post('statuses/update', {status: req.body.tweet},  function(error, tweet, response){
        if(error) throw error;
    });
});

console.log("Server listening on http://localhost:3000");