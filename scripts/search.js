window.addEventListener("load", initSearch, true);

const url = "http://suggestqueries.google.com/complete/search?client=firefox&q=";

let result = '';


$('#searchInput').on('keypress', function (event) {
    var press = jQuery.Event(event.type);
    console.log(press);
    getSearchAutoComplete($('searchInput'));
});

function initSearch() {
    document.getElementById('searchInput').addEventListener("keypress", function (e) { getSearchAutoComplete(help);});
}

function getSearchAutoComplete(input) {
    axios.post(url + input, result)
        .then(response => {
            const data = response.data;
            console.log('data', data);
        })
        .catch(error => console.error('error', error));
}