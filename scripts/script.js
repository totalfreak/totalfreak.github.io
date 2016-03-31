$(document).ready(function(){

  newMsgCount = 0;
  msgOut = false;
  accView = null;
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
        top: '0px'
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
          top: '40px'
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
    $("#superWrap").addClass("gamba");
  });
  //Going to lesson page
  $("#lesson").click(function() {
    $("#navbar").addClass("lesson");
    $("#superWrap").addClass("lesson");
  });

  //messageBox in/out toggle
    $("#miniPic").toggle(function() {
      msgOut = true;
      newMsgCount = 0;
      $("#newMsg").text(newMsgCount);
      $("#newMsg").css({zIndex: "-1", opacity: 0});
      $("#miniPic").attr('src', "Styling/Pictures/chat2.png");
      $("#accountInfo").animate({right: "0"}, 600, "easeInOutExpo");
      $("#messageText").focus();
    }, function() {
      msgOut = false;
      $("#miniPic").attr('src', "Styling/Pictures/chat1.png");
      $("#accountInfo").animate({right: "-500px"}, 600, "easeInOutExpo");
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
    //$("#miniPic").attr('src', authData.password.profileImageURL);
    $("#miniEmail").text(authData.password.email);
    uid = authData.uid;
    email = authData.password.email;
    loggedIn();
  } else {
    console.log("User is logged out");
  }
}
//Making a link to the firebase database, and linking to message database
var ref = new Firebase("https://it-eksamen.firebaseio.com/");
msgRef = ref.child('messages');
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
      var colArray = ["#e74c3c", "#c0392b", "#d35400", "#e67e22", "#16a085", "#2ecc71", "#3498db", "#2980b9", "#1abc9c", "#8e44ad", "#9b59b6", "#f39c12", "#f1c40f"];
      var color = colArray[Math.floor(Math.random() * colArray.length)];
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
            loses: 0,
            exp: 0,
            level: 1,
            color: color,
            bgLink: "#210002"
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
      userLvl = snap[i].level;
      userExp = snap[i].exp;
      userColor = snap[i].color;
      userGoal = snap[i].goal;
      bgLink = snap[i].bgLink;
    }
  }
  $("option").each(function() {
    $(this).css({backgroundColor: $(this).val()});
  });
  $("select").click(function() {
    $("#colList").css({backgroundColor: $("#colList :selected").val()});
    usersRef.child(authData.uid).update({
      color: $("#colList :selected").val()
    });
  });
  console.log(userPoints);
  $(".authPoints").text("Points: " + userPoints);
  $("#accountPoints").text("Points: " + userPoints);
  $("#userWins").text("Wins: " + userWins);
  $("#userLoses").text("Loses: " + userLoses);
  $("#authLvl").text("Level: " + userLvl);
  $("#authExp").text("Experience: " + userExp);
  $("#authExpNeed").text("Experience needed: " + (userGoal-userExp));
  if(userExp > userGoal) {
    userExp = userGoal;
  }
  if(userExp == userGoal) {
    userLvl += 1;
    userExp = 0;
    userGoal += userGoal;
    usersRef.child(authData.uid).update({
      goal: userGoal,
      level: userLvl,
      exp: userExp
    });
  }
  $("#expBar").progressbar({max: userGoal, value: userExp});
}, function(errorObject) {
  console.log("The read failed ", errorObject.code);
});
//Doing some gambling and checking if points are adequate
$("#gambaButton").click(function() {
  wager = parseInt($("#wagerText").val(), 10);
  if(userPoints >= wager && wager > 0) {
    odds = Math.floor((Math.random() * 100) + 1);
    if(odds < 50) {
      userPoints -= wager;
      userLoses += 1;
      console.log("Ya lost");
    } else {
      userPoints += wager;
      userExp += wager;
      userWins += 1;
      console.log("Ya won");
    }
    //Updating user's database with points, wins and loses
    usersRef.child(authData.uid).update({
      points: userPoints,
      loses: userLoses,
      wins: userWins,
      exp: userExp
    });
  }
});

function givePoints() {
  userPoints += 10;
  usersRef.child(authData.uid).update({
    points: userPoints
  });
}
var timerVar = setInterval(givePoints, 120000);
$("#wagerText").keypress(function(event) {
  if(event.keyCode == 17) {
    console.log(event.keyCode);
    $("#wagerText").val(userPoints);
  }
});
$("#messageText").keypress(function(event) {
  if(event.keyCode == 13 && $("#messageText").val() != "") {
  var message = $("#messageText").val();
  $("#messageText").val('');
  var dt = new Date();
  var dbTime = dt.getTime();
  var time = dt.toDateString() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  console.log(dbTime);
  msgRef.push({
    name: authData.password.email,
    time: time,
    dbTime: dbTime,
    message: message,
    color: userColor,
    uid: uid
  });
}
});

msgRef.orderByChild("dbTime").limitToLast(50).on("child_added", function(snapshot) {
  var message = snapshot.val().message;
  var time = snapshot.val().time;
  var name = snapshot.val().name;
  var color = snapshot.val().color;
  var uid = snapshot.val().uid;
  $("#messageCont").append("<p class='message' style='color: "+color+"'>" + time + '<br><a class="accLink" style=color:' + color + ' href="#' + uid + '">' + name + "</a>" + ":" + " " + message +"</p>");
  $("#messageCont").scrollTo('max', {axis: 'y'});
  if(!msgOut) {
    newMsgCount += 1;
    $("#newMsg").text(newMsgCount);
    $("#newMsg").css({zIndex: "1", opacity: 1});
  }
});

//Browsing other accounts and shit
$("#messageCont").click(function() {
  accView = location.hash.slice(1);
  console.log(accView);
usersRef.on("value", function(snapshot) {
  data = snapshot.val();
  for(i in data) {
    if(i == accView) {
      //Removing all classes from navbar
        $("#navbar").removeClass();
        $("#superWrap").removeClass();
      //Going to account page
        $("#navbar").addClass("account2");
        $("#superWrap").addClass("account2");
        console.log(data[i]);
        otherPoints = data[i].points;
        otherWins = data[i].wins;
        otherLoses = data[i].loses;
        otherLvl = data[i].level;
        otherExp = data[i].exp;
        otherGoal = data[i].goal;
        $(".authPoints2").text("Points: " + otherPoints);
        $("#otherWins").text("Wins: " + otherWins);
        $("#otherLoses").text("Loses: " + otherLoses);
        $("#authLvl2").text("Level: " + otherLvl);
        $("#authExp2").text("Experience: " + otherExp);
        $("#authExpNeed2").text("Experience needed: " + (otherGoal-otherExp));
        $("#profilePic").attr('src', data[i].password.profileImageURL);
    }
  }
});
});

//Setting custom bg for messages


/*
//Customizing your account here
var form = document.getElementById('file-form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');
form.onsubmit = function(event) {
  event.preventDefault();

  // Update button text.
  uploadButton.innerHTML = 'Uploading...';

  // The rest of the code will go here...
  // Get the selected files from the input.
var files = fileSelect.files;
// Create a new FormData object.
var formData = new FormData();
// Loop through each of the selected files.
for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // Check the file type.
  if (!file.type.match('image.*')) {
    continue;
  }

  // Add the file to the request.
  formData.append('photos[]', file, file.name);
  // Set up the request.
var xhr = new XMLHttpRequest();
// Open the connection.
xhr.open('POST', 'handler.php', true);
// Set up a handler for when the request finishes.
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
    uploadButton.innerHTML = 'Upload';
  } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send(formData);
}

}
*/
//Quiz shit here


}
//Logging out user
$("#logOutButton").click(function() {
    ref.unauth();
    location.reload(true);
});
});
