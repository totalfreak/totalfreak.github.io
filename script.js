	function weed() {
		var color = Math.floor((Math.random()*100));
		if(color >= 75 && color <= 100) {
			$("body").animate({backgroundColor: "red"}, 75);
			$("a").animate({color: "red"}, 125);
			$("div").animate({color: "red"}, 175);
		} else if(color >= 50 && color <= 75) {
			$("body").animate({backgroundColor: "green"}, 75);
			$("a").animate({color: "green"}, 125);
			$("div").animate({color: "green"}, 175);
		} else if(color >= 25 && color <= 50) {
			$("body").animate({backgroundColor: "yellow"}, 75);
			$("a").animate({color: "yellow"}, 125);
			$("div").animate({color: "yellow"}, 175);
		} else if(color >= 0 && color <= 25) {
			$("body").animate({backgroundColor: "orange"}, 75);
			$("a").animate({color: "orange"}, 125);
			$("div").animate({color: "orange"}, 175);
		}
	}
	var tid = setInterval(weed, 1);