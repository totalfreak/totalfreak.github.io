$(document).ready(function(){
  var user = null;
//Navbar showing and hiding
  $("#arrow").css({transform: "rotate(180deg)"});
  $("#arrow").toggle(function() {
      $("#arrow").animate({
        top: "0",
        opacity: "0.6",
        transform: "rotate(360deg)"
      }, 600, 'easeInOutBack');
      $("#navbar").animate({
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
        $("#navbar").animate({
          top: '-6px',
          opacity: '1'
        }, 600, 'easeInOutBack');
        $("#loginPop").animate({
          top: '44px'
        }, 600, 'easeInOutBack');
      });

  //Removing all classes from navbar
  $(".navlink").click(function() {
    $("#navbar").removeClass();
    $("#superWrap").removeClass();
  });
  //Going to account page
  $("#accountButton").click(function() {
    $("#navbar").addClass("account");
    $("#superWrap").addClass("account");
  });
function loggedIn() {
  $("#loginScreen").animate({opacity: "0"});
  $("#loginScreen").css({zIndex: "-10"});
}
//Firebase stuff
//Function that checks if user has already been Authenticated
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $("#authDatas").text("Email: " + authData.password.email);
    $("#profilePic").attr('src', authData.password.profileImageURL);
    $("#miniPic").attr('src', authData.password.profileImageURL);
    $("#miniEmail").text(authData.password.email);
    email = authData.password.email;
    loggedIn();
  } else {
    console.log("User is logged out");
  }
}

var ref = new Firebase("https://it-eksamen.firebaseio.com/");
ref.onAuth(authDataCallback);
var usersRef = ref.child("users");
authData = ref.getAuth();
//Sending reset password email
$("#resetButton").click(function() {
  ref.resetPassword({
    email: email
  }, function(error) {
    if(error === null) {
      console.log("Password reset email sent successfully");
    } else {
      console.log("Error sending password reset email: ", error);
    }
  });
});

//Firebase create account
$("#createButton").click(function() {
  if($("#userLogin").val() != "" && $("#passLogin").val() != "") {
  var username = $("#username").val();
  var password = $("#password").val();
  usersRef.createUser({
    email: username,
    password: password
  }, function(error, userData) {
    if(error) {
      $("#errorText").text(error);
      $("#errorText").css({opacity: "1"});
      $("#errorText").css({color: "#c0392b"});
      console.log("Error creating user: ", error);
    } else {
      $("#errorText").text("Account created");
      $("#errorText").css({opacity: "1"});
      $("#errorText").css({color: "#2ecc71"});
      console.log("Successfully created account with uid: ", userData.uid);

      //Creating database for new user using their uid and containing
      //name and points
      ref.onAuth(function(authData) {
        if(authData) {
          usersRef.child(authData.uid).set({
            name: authData.password.email,
            points: 50
          });
        }
      });
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
      } else {
        $("#errorText").text("Account logged in");
        $("#errorText").css({opacity: "1"});
        $("#errorText").css({color: "#2ecc71"});
        $("#authDatas").text("Email: " + authData.password.email);
        $("#profilePic").attr('src', authData.password.profileImageURL);
        $("#miniPic").attr('src', authData.password.profileImageURL);
        $("#miniEmail").text(authData.password.email);
        console.log("Authenticated Successfully: ", authData);
        loggedIn();
      }
    });
  }
});
});
