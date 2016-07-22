$(function() {
  var width = $(window).width();
  if(width >= 700) {
    $("#seen-canvas").remove();
  }
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


});
