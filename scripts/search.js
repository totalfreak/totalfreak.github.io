window.addEventListener("load", initSearch, true);

const url = "https://suggestqueries.google.com/complete/search?client=firefox&gl=dk&q=";

const headers = {
    'Content-Type': 'application/json'
  };

let result = '';


$('#searchInput').on('keypress', function (event) {
    var press = jQuery.Event(event.type);
    console.log(press);
    getSearchAutoComplete($('searchInput'));
});

function initSearch() {
    document.getElementById('searchInput').addEventListener("keypress", function (e) { getSearchAutoComplete('help');});
}

function getSearchAutoComplete(input) {
    $.ajax({
        url: url
    }).then(function(data) {
        console.log(data);
    });
}