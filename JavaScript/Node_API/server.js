// server.js

var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

const db       = require('./config/db');

var app        = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 8080;

mongoose.connect(db.url, (err, database) => {

  if (err) 
    return console.log(err)
  
  var _router = express.Router()

  require('./app/routes')(_router, database);

  app.use('/route_prefix', _router)
  
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  app.get('/', (req, res) => {
    res.send('<h3>Hello World</h3>');
  })

})