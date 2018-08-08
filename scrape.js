const express = require('express').listen(PORT, () => console.log(`Listening on ${ PORT }`));
const app = express();
const bodyParser = require('body-parser');
const rp = require('request-promise');
const cheerio = require('cheerio');

const PORT = process.env.PORT || 5000

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const options = {
  uri: 'http://min.medicin.dk/Medicin/Praeparater/430',
  transform: function(body)  {
    return cheerio.load(body);
  }
};
var priceVal;

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


app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('pages/index', {price: null});
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${ PORT }!`)
});

app.post('/', function(req, res) {
  res.render('index', {price: priceVal});
});
