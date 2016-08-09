$(function() {
  //Starting off with the timer
  function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (3600000)) % 24);
  var days = Math.floor(t / (3600000 * 24) % 31);
  var months = Math.floor(t / (3600000 * 24 * 31));
  return {
    'total': t,
    'months': months,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var monthsSpan = clock.querySelector('.months');
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);
    monthsSpan.innerHTML =('0' + t.months).slice(-2);
    daysSpan.innerHTML = ('0' + t.days).slice(-2);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
var deadline = new Date("2016/11/16 23:59:59");
initializeClock('clockdiv', deadline);
$(window).scrollTop();
var x = false;
//Scrolling down to show more info about the event
$(window).scroll(function (event) {
  if(!x) {
 $("#arrowDown").animate({opacity: 0}, {queue:true, duration: 200});
 $("#arrowDown").css({zIndex: -2});
 x = true;
 }
});

//First I initialize the ScrollTrigger library
  ScrollTrigger.init();



//3D wavy background down here
var width = $(document).width();
var height = $(document).height();
$("#seen-canvas").attr('width', width);
$("#seen-canvas").attr('height', height);
console.log("Height: " + height);
console.log("width: " + width);
//Getting new size values, if window is resized
document.onresize = function(event) {
  var width = $(document).width();
  var height = $(document).height();
};
if(width < 990) {
  triangleScale = 180;
  $("h1").css({fontSize: "6em"});
  $("#testText").css({fontSize: "3em", marginTop: "10%"});
  $("#testText2").css({paddingTop: 30, paddingBottom: 30, width: 500, fontSize: "3em", borderRadius: 75});
  $(".p").css({marginTop: 300});
} else if(width == 1366) {
  $("h1").css({fontSize: "3em"});
  $("#clockdiv").css({fontSize: "3em"});
  $("#clockdiv div span").css({minWidth: 35, minHeight: 35});
  $("#testText").css({fontSize: "2em", marginTop: "10%"});
  $("#testText2").css({paddingTop: 30, paddingBottom: 30, width: 500, fontSize: "3em", borderRadius: 75});
  $(".p").css({marginTop: 150, marginBottom: 150});
} else {
  triangleScale = 120;
}
  var context, equilateralAltitude, height, noiser, patch_height, patch_width, scene, shape, t, triangleScale, width;
  width = width+100;
  height = height+400;
  equilateralAltitude = Math.sqrt(3.14) / 2.0;
  patch_width = width * 1.5;
  patch_height = height * 1.5;
  shape = seen.Shapes.patch(patch_width / triangleScale / equilateralAltitude, patch_height / triangleScale).scale(triangleScale).translate(-patch_width / 2, -patch_height / 2 + 60).rotx(-0.3);
  seen.Colors.randomSurfaces2(shape);
  scene = new seen.Scene({
    model: seen.Models["default"]().add(shape),
    viewport: seen.Viewports.center(width, height)
  });
context = seen.Context('seen-canvas', scene).render();
t = 0;
noiser = new seen.Simplex3D(shape);
context.animate().onBefore(function(t) {
var i, j, len, len1, p, ref, ref1, results, surf;
ref = shape.surfaces;
results = [];
for (i = 0, len = ref.length; i < len; i++) {
  surf = ref[i];
  ref1 = surf.points;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    p = ref1[j];
    p.z = 2 * noiser.noise(p.x / 8, p.y / 8, t * 1e-4);
  }
  results.push(surf.dirty = true);
}
return results;
}).start();

});
