$(function() {
  /*countdown.setLabels(
	' | |:|:|:|:|:| | | | ',
	' | |:|:|:|:|:| | | | ',
	'',
	'',
	'');
  function timer() {
  var timerId = countdown(new Date(), new Date("2016,11,16 00:00"), countdown.MONTHS|countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);
  timerId.toHTML();
  console.log(timerId);
  $("#timer").text(timerId);
  }
  setInterval(timer, 1000);*/
  $('#timer').countdown('2016/11/16', function(event) {
    $(this).html(event.strftime(''
      + '<span class="tal1">%m</span> <br><span class="tal2">måneder</span> '
      + '<span class="tal1">%d</span> <br><span class="tal2">dage</span> '
      + '<span class="tal1">%H</span> <br><span class="tal2">timer</span> '
      + '<span class="tal1">%M</span> <br><span class="tal2">minutter</span> '
      + '<span class="tal1">%S</span> <br><span class="tal2">sekunder</span>'));
  });
});
