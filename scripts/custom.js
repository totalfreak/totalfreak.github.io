const userName = "Daniel";
const feats = 0;
const themeDir = "styles/themes/";
const themeLight = "gruvbox-light";
const themeDark = "gruvbox-dark";
const linksGroups = [[
	{
		"header": "",
		"links": [
			{
				"name": "Simpsonwave",
				"url": "/simpsonwave",
				"color": "800080"
			},
		]
	}
],
[
	{
		"header": "Fun",
		"links": [
			{
				"name": "Youtube",
				"url": "https://youtube.com/",
				"color": "E52D27",
				"shortKey": "y" // manually bound keys
			},
			{
				"name": "Reddit",
				"url": "https://reddit.com/",
				"color": "FF5700",
				"shortKey": "r"
			},{
				"name": "Disney+",
				"url": "https://www.disneyplus.com/home",
				"color": "0483ee",
				"shortKey": "d"
			},
			{
				"name": "Twitch",
				"url": "https://twitch.tv/",
				"color": "6441A5",
				"shortKey": "t" // bindings are case sensitive (Shift + t)
			},
			{
				"name": "Twitter",
				"url": "https://tweetdeck.twitter.com/",
				"color": "1DA1F2",
				"shortKey": "T" // 
			},
			{
				"name": "Facebook",
				"url": "https://facebook.com/",
				"color": "3B5998",
				"shortKey": "" // empty shortKey values are not auto bound
			}
		]
	},
	{
		"header": "Shopping",
		"links": [
			{
				"name": "Proshop",
				"url": "https://proshop.dk",
				"color": "D21616",
				"shortKey": ""
			},
			{
				"name": "Komplett",
				"url": "https://komplett.dk",
				"color": "F7B912",
				"shortKey": ""
			},
			{
				"name": "Elgiganten",
				"url": "https://elgiganten.dk",
				"color": "78BE20",
				"shortKey": ""
			},
			{
				"name": "Pricerunner",
				"url": "https://pricerunner.dk",
				"color": "46474A",
				"shortKey": ""
			},
			{
				"name": "Nemlig",
				"url": "https://nemlig.com",
				"color": "EF7A33",
				"shortKey": ""
			}
		]
	},
	{
		"header": "Mail",
		"links": [
			{
				"name": "Hotmail",
				"url": "https://outlook.live.com/mail/0/inbox",
				"color": "17A0DB",
				"shortKey": "["
			},
			{
				"name": "Gmail",
				"url": "https://mail.google.com/",
				"color": "DC473A",
				"shortKey": "]"
			}
		]
	},
	{
		"header": "Apps",
		"links": [
			{
				"name": "GDrive",
				"url": "https://drive.google.com/",
				"color": "1DA362",
				"shortKey": "g"
			}
		]
	},
	{
		"header": "Julekalendre",
		"links": [
			{
				"name": "Komplett",
				"url": "https://www.komplett.dk/kampagne/25574/julekalender",
				"color": "F7B912",
				"shortKey": ""
			},
			{
				"name": "Elgiganten",
				"url": "https://www.elgiganten.dk/cms/julekalender/deltag-i-elgigantens-julekalender/?itm_source=front&itm_medium=hotspot-banner&itm_medium=hotspot-banner&itm_campaign=julekalender",
				"color": "78BE20",
				"shortKey": ""
			},
			{
				"name": "Nemlig",
				"url": "https://julekalender.nemlig.com/Start",
				"color": "EF7A33",
				"shortKey": ""
			}
		]
	}
]];
const localeStrings = [
	"Good morning", // Greeting strings
	"Good afternoon",
	"Good evening",
	"Good night",
	", ", // Greeting and name separator
	"DuckDuckGo...", // Search box placeholder
	"Home", // Page title
];
const autoBindKeys = "1234567890qwertyuiop[]asdfghjkl;\'zxcvbnm,.QWERTYUIOOPASDFGHJKL:\"ZXCVBNM<>?"; // Specify keys for auto key binding