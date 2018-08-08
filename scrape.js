const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rp = require('request-promise');
const cheerio = require('cheerio');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const options = {
  uri: 'http://min.medicin.dk/Medicin/Praeparater/430',
  transform: function(body)  {
    return cheerio.load(body);
  }
};
var priceVal;
function GetPrice() {
  rp(options).then(($) => {
    //Succeed
    var table = $('#PakningerTableMH');
    //console.log(table.html());
    var tr = table.find($('tbody')).find($('tr'));
    var td = tr.find($('.alignRight'));
    console.log(td.html());
    priceVal = td.html();
  }).catch(function (err) {
    //Fail
    console.log(err);
  });
}


app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {price: null});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.post('/minipe', function(req, res) {
  res.render('index', {price: priceVal});
});
