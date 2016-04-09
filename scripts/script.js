$(document).ready(function(){

  var circle = new ProgressBar.Circle('#progress', {
      color: '#FCB03C',
      duration: 3000,
      strokeWidth: 10,
      easing: 'easeInOut',
      text: {
        value: 10
      }
  });

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
    $("body").css({overflowY: "hidden"});
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
  //Going to leaderboardPage
  $("#leaderboard").click(function() {
    $("#navbar").addClass("leaderboard");
    $("#superWrap").addClass("leaderboard");
    $("body").css({overflowY: "auto"});
  })
  //Going to feature page
  $("#feature").click(function() {
    $("#navbar").addClass("feature");
    $("#superWrap").addClass("feature");
    $("body").css({overflowY: "auto"});
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
//Making a link to the firebase database, and linking to databases
var ref = new Firebase("https://it-eksamen.firebaseio.com/");
msgRef = ref.child('messages');
suggestRef = ref.child('suggestions');
usersRef = ref.child('users');
authData = ref.getAuth();
ref.onAuth(authDataCallback);
//Sending reset password email
$("#resetButton").click(function() {
  ref.resetPassword({
    email: email
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
    } else {
      var colArray = ["#e74c3c", "#c0392b", "#d35400", "#e67e22", "#16a085", "#2ecc71", "#3498db", "#2980b9", "#1abc9c", "#8e44ad", "#9b59b6", "#f39c12", "#f1c40f"];
      var color = colArray[Math.floor(Math.random() * colArray.length)];
      $("#errorText").text("Account created");
      $("#errorText").css({opacity: "1"});
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
            goal: 400,
            level: 1,
            color: color,
            bgLink: "#210002",
            gain: 100
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
        location.reload(true);
      }
    });
  }
});

loadLeader();
function loadLeader() {
//leaderboard stuff, had to be put outside of Database fetch, no reason why, just works now
  usersRef.orderByChild("level").limitToLast(50).on("child_added", function(snapshot) {
    var userName = snapshot.val().name;
    var userPoint = snapshot.val().points;
    var userLoss = snapshot.val().loses;
    var userWin = snapshot.val().wins;
    var userLevel = snapshot.val().level;
    var userId = snapshot.val().uid;
    $("tbody").prepend("<tr><td>" + userName + "</td><td>" + userLevel + "</td><td>" + userPoint + "</td><td>" + userWin + "</td><td>" + userLoss + "</td></tr>");
  });
}
//Fetching data from database
if(authData) {

  //usersRef.child(authData.uid).on("value", function(snapshot) {
usersRef.child(authData.uid).on("value", function(snapshot) {
  snap = snapshot.val();
      userPoints = snap.points;
      userWins = snap.wins;
      userLoses = snap.loses;
      userLvl = snap.level;
      userExp = snap.exp;
      userColor = snap.color;
      userGoal = snap.goal;
      userGain = snap.gain;
      if(snap.bgLink == "") {
       snap.bgLink = "#210002";
      }
      bgLink = snap.bgLink;
      if(userGain == undefined) {
        usersRef.child(authData.uid).update({
          gain: 100
        });
      } else {
        userGain = snap.gain;
      }
  $("option").each(function() {
    $(this).css({backgroundColor: $(this).val()});
  });
  if(bgLink != "#210002") {
    $("#profilePic").attr('src', bgLink);
  } else {
    $("#profilePic").attr('src', authData.password.profileImageURL);
  }
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
    userGain += 25;
    $("#lvlUp").text("Level up! You're now level " + userLvl);
    $("#lvlUp").animate({top: "50px"}, 600);
    setTimeout(function(){$("#lvlUp").animate({
      top: "-40px"
    }, 600);}, 3000);
    usersRef.child(authData.uid).update({
      goal: userGoal,
      level: userLvl,
      exp: userExp,
      gain: userGain
    });
  }
  //Updating expBar on each screen
  $(".expBar").each(function() {
    $(this).progressbar({max: userGoal, value: userExp});

  scaledValue = userExp/userGoal;
  circle.text = userLvl;
  circle.set(scaledValue);
  $(".progressbar-text").text(userLvl);
  });
  //Setting the colors to the users custom color choice
  $(".navlink").each(function() {
    $(this).animate({queue: false, color: userColor}, 1000);
  });
  $("body").animate({queue: false, backgroundColor: userColor}, 1000);
  $("div.progressbar-text").animate({queue: false, color: userColor}, 1000);
  circle.path.setAttribute('stroke', userColor);
  $(".domButton").animate({queue: false, color: userColor}, 1000);
  $("#miniEmail").animate({queue: false, color: userColor}, 1000);
  $("#authPoints").animate({queue: false, color: userColor}, 1000);
}, function(errorObject) {
  console.log("The read failed ", errorObject.code);
});
$("select").click(function() {
  $("#colList").css({backgroundColor: $("#colList :selected").val()});
  usersRef.child(authData.uid).update({
    color: $("#colList :selected").val()
  });
});
//Doing some gambling and checking if points are adequate
$("#gambaButton").click(function() {
  wager = parseInt($("#wagerText").val(), 10);
  if(userPoints >= wager && wager > 0) {
    odds = Math.floor((Math.random() * 100) + 1);
    if(odds < 50) {
      userPoints -= wager;
      userLoses += 1;
    } else {
      userPoints += wager;
      userExp += wager;
      userWins += 1;
    }
    //Updating user's database with points, wins and loses
    usersRef.child(authData.uid).update({
      points: userPoints,
      loses: userLoses,
      wins: userWins,
      exp: userExp
    });
  } else if(userPoints < wager) {
    $("#lvlUp").text("You need more points!");
    $("#lvlUp").animate({top: "50px"}, 600);
    setTimeout(function(){$("#lvlUp").animate({
      top: "-40px"
    }, 600);}, 1500);
  }
});
//Giving a user points every other minute
function givePoints() {
  userPoints += userGain;
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
  var dt = new Date();
  var dbTime = dt.getTime();
  var time = dt.toDateString() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  msgRef.push({
    name: authData.password.email,
    time: time,
    dbTime: dbTime,
    message: message,
    color: userColor,
    uid: uid,
    bgLink: bgLink
  });
  //Admin stuff
  if(authData.uid == "8bbdccb5-6b56-477a-8f0c-37d5a7e11b2d") {
    //Giving points to UID
    if(message.search("!give") != -1) {
      var userUid = message.substr(6, 36);
      var amount = message.substr(43);
      amount = parseInt(amount);
      var userPoints2;
      usersRef.child(userUid).on("value", function(snapshot2) {
        data2 = snapshot2.val();
        userPoints2 = data2.points;
        userPoints2 += amount;
      });
      usersRef.child(userUid).update({
        points: userPoints2
      });
    }
  }
  $("#messageText").val('');
}
});
msgRef.orderByChild("dbTime").limitToLast(50).on("child_added", function(snapshot) {
  var message = snapshot.val().message;
  var time = snapshot.val().time;
  var name = snapshot.val().name;
  var color = snapshot.val().color;
  var uid = snapshot.val().uid;
  var userBgLink = snapshot.val().bgLink;
  //Finding links in the text, and making it a hyperlink
  function urlify(message) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return message.replace(urlRegex, function(url) {
      return '<a href="' + url + '">' + url + '</a>';
    });
  }
  var message = urlify(message);
  $("#messageCont").append("<p class='message' style='color: "+color+"; background:url(" + userBgLink + ") center no-repeat; background-size: 500px'>" + time + '<br><a class="accLink" style=color:' + color + ' href="#' + uid + '">' + name + "</a>" + ":" + " " + message +"</p>");
  $("#messageCont").scrollTo('max', {axis: 'y'});
  if(!msgOut) {
    newMsgCount += 1;
    $("#newMsg").text(newMsgCount);
    $("#newMsg").css({zIndex: "1", opacity: 1});
  }
});

//Browsing other accounts and shit
$("#messageCont").click(function() {
  setTimeout(function(){
  accView = location.hash.slice(1);
usersRef.on("value", function(snapshot) {
  data = snapshot.val();
  for(i in data) {
    if(i == accView) {
        otherPoints = data[i].points;
        otherWins = data[i].wins;
        otherLoses = data[i].loses;
        otherLvl = data[i].level;
        otherExp = data[i].exp;
        otherGoal = data[i].goal;
        otherbgLink = data[i].bgLink;
        $(".authPoints2").text("Points: " + otherPoints);
        $("#otherWins").text("Wins: " + otherWins);
        $("#otherLoses").text("Loses: " + otherLoses);
        $("#authLvl2").text("Level: " + otherLvl);
        $("#authExp2").text("Experience: " + otherExp);
        $("#authExpNeed2").text("Experience needed: " + (otherGoal-otherExp));
        $("#profilePic2").attr('src', otherbgLink);
    }
  }
});
//Removing all classes from navbar
  $("#navbar").removeClass();
  $("#superWrap").removeClass();
//Going to account page
  $("#navbar").addClass("account2");
  $("#superWrap").addClass("account2");
}, 200);
});

//Setting custom bg for messages
$("#bgSubmit").click(function() {
  bgLink = $("#bgLink").val();
  bgLink = String(bgLink);
  if($("#bgLink").val() != ""){
  if(bgLink.indexOf(".png" != -1) || bgLink.indexOf(".jpg") != -1 || bgLink.indexOf(".gif") != -1) {
    usersRef.child(authData.uid).update({
      bgLink: bgLink
    });
  }
}
});

//Adding suggestions to the box
$("#submitSuggest").click(function() {
  if($("#suggestBox").val() != 0) {
  suggestion = $("#suggestBox").val();
  $("#suggestBox").val('');
  var dt = new Date();
  var dbTime = dt.getTime();
  suggestRef.push({
    suggestion: suggestion,
    name: authData.password.email,
    dbTime: dbTime
  });
}
});
//Getting suggestions from Database
    suggestRef.orderByChild("dbTime").limitToLast(50).on("child_added", function(snapshot) {
      var name = snapshot.val().name;
      var suggestion = snapshot.val().suggestion;
      //Finding links in the text, and making it a hyperlink
      function urlify2(suggestion) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return suggestion.replace(urlRegex, function(url) {
          return '<a target="_blank" href="' + url + '">' + url + '</a>';
        });
      }
      var suggestion = urlify2(suggestion);
      $("#featureCont").append("<div class='suggestion'>" + name + "<br><br>" + suggestion + "<br></div>");
    });
}
//Logging out user
$("#logOutButton").click(function() {
    ref.unauth();
    location.reload(true);
});
});
