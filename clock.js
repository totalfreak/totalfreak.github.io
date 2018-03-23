(function() {
  'use strict';
  function getDate() {
    var date = new Date();
    var weekday = date.getDay();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hour < 10) hour = "0" + hour;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthColors = ["#1E90FF", "#FF69B4", "#00FFFF", "#7CFC00", "#00CED1", "#FF1493", "#00008B", "#FF7F50", "#C71585", "#FF4500", "#FFD700", "#800000"];
    var ampm = "";
    if (hour < 12) ampm = "";
    var showDate = weekdayNames[weekday] + ", " + monthNames[month] + " " + day + ", " + year;           var showTime = hour + ":" + minutes + ampm;
    var color = monthColors[month];
    document.getElementById('date').innerHTML = showDate;
    document.getElementById('time').innerHTML = showTime;
    document.bgColor = color;
    requestAnimationFrame(getDate);
  }
  getDate();
}());

$(window).on('load', function() {
  $grid = $("#gridCont");

  $grid.isotope({
    itemSelector: '.gridItem',
    percentPosition: true,

    layoutMode: 'masonry'
  });
  setTimeout(function() {
    $grid.isotope('layout');
    console.log("Chicken nuggets");
  }, 350);
});

$(document).ready(function() {


  $(".clock").animate({opacity: 1},{duration: 2200, queue: false});
  $("#gridCont").animate({opacity: 1},{duration: 2200, queue: false});
  $("#background").animate({opacity: 1},{duration: 4200, queue: true});
  var e = $.Event("keydown", { keyCode: 9});

  var $items = $(".icon");
  console.log($items);
  var timeout;

  $items.on( 'mouseenter', function(event) {
    var $item = $(this);
    clearTimeout(timeout);

    timeout = setTimeout(function() {
      if($item.hasClass('active')) {
        return false;
      }

      $items.not($item).removeClass('active').addClass('blur');

      $item.removeClass('blur').addClass('active');

    }, 75);
  });

  $items.on('mouseleave', function(event) {
    clearTimeout(timeout);
    $items.removeClass('active blur');
  });


  //Search function
  $("#searchInput").keydown(function( event ) {
  if ( event.which == 13 ) {
   event.preventDefault();
   val = $(this).val();
   console.log(val);
   //Duckduckgo search
   if(-1 < val.indexOf("dg:")) {
     window.location.assign("https://duckduckgo.com/?q=" + val.replace(/dg: |dg:/g, ''));
   }
   //Google search
   else if(-1 < val.indexOf("g:")) {
     window.location.assign("https://www.google.dk/search?site=&source=hp&q=" + val.replace(/g: |g:/g, ''));
   }
   //Google image search
   else if(-1 < val.indexOf("i:")) {
     window.location.assign("https://encrypted.google.com/search?&tbm=isch&q=" + val.replace(/i: |i:/g, ''));
   }
   //kat.cr search
   else if(-1 < val.indexOf("k:")) {
     window.location.assign("https://kat.cr/usearch/" + val.replace(/k: |k:/g, '') + '/?field=seeders&sorder=desc');
   }
   //facebook search
   else if(-1 < val.indexOf("f:")) {
     window.location.assign("https://www.facebook.com/search/top/?q=" + val.replace(/f: |f:/g, ''));
   }
   //wikipedia search
   else if(-1 < val.indexOf("w:")) {
     window.location.assign("https://en.wikipedia.org/w/index.php?search=" + val.replace(/w: |w:/g, ''));
   }
   //youtube search
   else if(-1 < val.indexOf("y:")) {
     window.location.assign("https://www.youtube.com/results?search_query=" + val.replace(/y: |y:/g, ''));
   }
   //123 movies search
   else if(-1 < val.indexOf("go:")) {
     window.location.assign("http://123movies.to/movie/search/" + val.replace(/go: |go:/g, '').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+'));
   }
   //Pricerunner compare
   else if(-1 < val.indexOf("price:")) {
     window.location.assign("http://www.pricerunner.dk/search?q=" + val.replace(/price: |price:/g, ''));
   }
   //Do duckduckgo search if nothing else is presented
   else {
     window.location.assign("https://duckduckgo.com/?q=" + val);
   }
   }
 });
 });
