var main = function(){
    "use strict";

    $("#login").on("click", function(){
        var username = $("#inputEmail").val(),
            pass = $("#inputPassword").val();
        $.post("login", {user: username, pass: pass}, function(res){
            if(res !== null){
                alert(res);
            }
        });        
    });

    // $("button").on("click", function(){
    //     var acctName = $(this).attr("id");
    //     console.log(acctName+" attempting to login");
    //     $.post("user/"+acctName, function(res){
    //         window.open(document.URL + res);
    //     });
    // });
};

$(document).ready(main);