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
      $("#accountInfo").animate({
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
        $("#accountInfo").animate({
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
  //Going to gamba page
  $("#gamba").click(function() {
    $("#navbar").addClass("gamba");
    $("#superWrap").addClass("gamba")
  });

  //accountInfo in/out toggle
    $("#miniPic").toggle(function() {
      $("#accountInfo").animate({right: "5px", opacity: "1"}, 600, "easeInOutBack");
    }, function() {
      $("#accountInfo").animate({right: "-305px", opacity: "0"}, 600, "easeInOutBack");
    });
function loggedIn() {

  $("#loginScreen").animate({opacity: "0", top: "100%"}, 1200, "easeInQuint");
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
    uid = authData.uid;
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
      console.log("Error creating user: ", error);
    } else {
      $("#errorText").text("Account created");
      $("#errorText").css({opacity: "1"});
      console.log("Successfully created account with uid: ", userData.uid);
      //Creating database for new user using their uid and containing
      //name and points
      ref.onAuth(function(authData) {
        if(authData) {
          usersRef.child(authData.uid).set({
            name: authData.password.email,
            points: 50,
            wins: 0,
            loses: 0
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
        $("#errorText").css({opacity: "1"});
        console.log("Login Failed!", error);
      } else {
        uid = authData.uid;
        $("#errorText").text("Account logged in");
        $("#errorText").css({opacity: "1"});
        $("#errorText").css({color: "#2ecc71"});
        $("#authDatas").text("Email: " + authData.password.email);
        $("#profilePic").attr('src', authData.password.profileImageURL);
        $("#miniPic").attr('src', authData.password.profileImageURL);
        $("#miniEmail").text(authData.password.email);
        console.log("Authenticated Successfully: ", authData);
        location.reload(true);
      }
    });
  }
});
//Fetching data from database
if(authData) {
usersRef.on("value", function(snapshot) {
  snap = snapshot.val();
  for(i in snap) {
    if(i == uid) {
      userPoints = snap[i].points;
      userWins = snap[i].wins;
      userLoses = snap[i].loses;
      console.log("Ran through this crap nigger");
    }
  }
  console.log(userPoints);
  $("#authPoints").text("Points: " + userPoints);
  $("#accountPoints").text("Points: " + userPoints);
  $("#userWins").text("Wins: " + userWins);
  $("#userLoses").text("Loses: " + userLoses);
}, function(errorObject) {
  console.log("The read failed ", errorObject.code);
});
//Doing some gambling and checking if points are adequate
$("#gambaButton").click(function() {
  if(userPoints > 0) {
    odds = Math.floor((Math.random() * 100) + 1);
    if(odds < 50) {
      userPoints-=1;
      userLoses+=1;
      console.log("Ya lost");
    } else {
      userPoints+=1;
      userWins+=1;
      console.log("Ya won");
    }
    usersRef.child(authData.uid).update({
      points: userPoints,
      loses: userLoses,
      wins: userWins
    });
  }
});
$("#messageText").keypress(function(event) {
  message = $("#messageText").val();
  
});
}
//Logging out user
$("#logOutButton").click(function() {
    ref.unauth();
    location.reload(true);
});
});
