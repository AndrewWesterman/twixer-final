var main = function(){
    "use strict";

    $("#login").on("click", function(){
        var username = $("#inputEmail").val(),
            pass = $("#inputPassword").val();
        if(username !== "" && pass !== ""){
            $.post("login", {user: username, pass: pass}, function(res){
                console.log(res);
                if(!res.valid){
                    alert("Invalid login");
                }else{
                    window.location = window.location+"user.html";
                }
            }); 
        } else {
            alert("Please enter a username and password");
        }               
    });
    

    $("#register_link").on("click", function(event){
        event.preventDefault();
        window.location = window.location+"register.html";
                           
    });

    $("#register").on("click", function(event){
        event.preventDefault();
        var name = $("#name").val(),
            email = $("#email").val(),
            password= $("#password").val(),
            bio =$("#bio").val();
            $.post("register", {user: email,pass:password}, function(res){
                console.log(res);
            }); 
                           
    });

};

$(document).ready(main);