$(document).ready(function(){
timeout();
//Navbar showing and hiding
  $("#arrow").css({transform: "rotate(180deg)"});
  $("#arrow").toggle(function() {
      $("#arrow").animate({
        top: "0",
        opacity: "0.6",
        transform: "rotate(360deg)"
      }, 600, 'easeInOutBack');
      $(".navbar").animate({
        top: '-46px',
        opacity: '0.6'
      }, 600, 'easeInOutBack');
      $("#loginPop").animate({
        top: '2px'
      }, 600, 'easeInOutBack');
    }, function() {
        $("#arrow").animate({
          top: "42px",
          opacity: "1",
          transform: "rotate(180deg)"
        }, 600, 'easeInOutBack');
        $(".navbar").animate({
          top: '-6px',
          opacity: '1'
        }, 600, 'easeInOutBack');
        $("#loginPop").animate({
          top: '44px'
        }, 600, 'easeInOutBack');
      });

      setTimeout(function() {
        $('body').addClass('loaded');
        $('h1').css('color','#222222');
    }, 1000);

  //Loading text changer
    function timeout() {
    setTimeout(function () {
      setTimeout(function() {
        var text = $("h1");
          $("h1").text("Loading.  ");
      }, 500);
      setTimeout(function() {
        $("h1").text("Loading . ");
      }, 1000);
        timeout();
    }, 1000);
}
//Functions for toggling loginPop
function loginOut() {
  $("#loginPop").animate({
    right: "5px",
    opacity: "1"
  }, 600, 'easeOutBack');
  $("body").addClass("out");
}
function loginIn() {
  $("#loginPop").animate({
    right: "-310px",
    opacity: "0"
  }, 600, 'easeInOutBack');
  $("body").removeClass("out");
}
//Account hiding and stuff
  $("#login").toggle(function() {
    loginOut();
  }, function() {
    loginIn();
  });

  //Changing between login and create screen
  $("#createUser").click(function() {
    //Switching out login with create screen
    $("#loginBox").animate({
      left: "310px",
      opacity: "0"
    }, 300, "easeInOutBack");
    $("#createBox").animate({
      left: "0",
      opacity: "1"
    }, 300, "easeInOutBack");
    $("#createUser").animate({backgroundColor: "#F5BB00"},300);
    $("#loginUser").animate({backgroundColor: "#fff"},300);
    $("#errorText").text("");
    $("#errorText").css({opacity: "0"});
  });
  $("#loginUser").click(function() {
    //Switching out create with login screen
    $("#loginBox").animate({
      left: "0",
      opacity: "1"
    }, 300, "easeInOutBack");
    $("#createBox").animate({
      left: "-310px",
      opacity: "0"
    }, 300, "easeInOutBack");
    $("#loginUser").animate({backgroundColor: "#F5BB00"},300);
    $("#createUser").animate({backgroundColor: "#fff"},300);
    $("#errorText").text("");
    $("#errorText").css({opacity: "0"});
  });

//Firebase stuff
var ref = new Firebase("https://it-eksamen.firebaseio.com/");
var usersRef = ref.child("users");
//Firebase create account
$("#createButton").click(function() {
  if($("#userLogin").val() != "" && $("#passLogin").val() != "") {
  var username = $("#userLogin").val();
  var password = $("#passLogin").val();
  usersRef.createUser({
    email: username,
    password: password
  }, function(error, userData) {
    if(error) {
      $("#errorText").text(error);
      $("#errorText").css({opacity: "1"});
      $("#errorText").css({color: "#c0392b"});
      console.log("Error creating user: ", error);
      $("#loginPop").effect("shake", {distance:10});
    } else {
      $("#errorText").text("Account created");
      $("#errorText").css({opacity: "1"});
      $("#errorText").css({color: "#2ecc71"});
      $("#password").focus();
      console.log("Successfully created account with uid: ", userData.uid);
      $("#loginUser").animate({backgroundColor: "#F5BB00"},300);
      $("#createUser").animate({backgroundColor: "#fff"},300);
      $("#username").val(username);
      $("#password").val(password);
      $("#userLogin").val("");
      $("#passLogin").val("");
      $("#loginBox").animate({
        left: "0",
        opacity: "1"
      }, 300, "easeInOutBack");
      $("#createBox").animate({
        left: "-310px",
        opacity: "0"
      }, 300, "easeInOutBack");
    }
  });

}
});
//Firebase login account
$("#loginButton").click(function() {
  if($("#username").val() != "" && $("#password").val() != "") {
    usersRef.authWithPassword({
      email: $("#username").val(),
      password: $("#password").val()
    }, function(error, authData) {
      if(error) {
        $("#errorText").text(error);
        $("#errorText").css({color: "#c0392b"});
        $("#errorText").css({opacity: "1"});
        console.log("Login Failed!", error);
        $("#loginPop").effect("shake", {distance:10});
      } else {
        $("#errorText").text("Account logged in");
        $("#errorText").css({opacity: "1"});
        $("#errorText").css({color: "#2ecc71"});
        $("#authDatas").text(authData.password.email);
        $("#profilePic").attr('src', authData.password.profileImageURL);
        console.log("Authenticated Successfully: ", authData);
      }
    });
  }
});
if(authData != "") {
  $("#authDatas").text(authData.password.email);
  $("#profilePic").attr('src', authData.password.profileImageURL);
}
});
