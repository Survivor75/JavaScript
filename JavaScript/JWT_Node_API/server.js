var express     = require('express');
var app         = express();

var bodyParser  = require('body-parser');

var morgan      = require('morgan');

var mongoose    = require('mongoose');

var config = require('./config');
var User   = require('./app/models/schema');

var port = process.env.PORT || 8080;

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

mongoose.connect(config.database, (err, database) => {

    if (err) 
      return console.log(err)
    
    var apiRoutes = express.Router(); 
  
    require('./app/routes')(apiRoutes, database);
  
    app.use('/api', apiRoutes)
    
    app.listen(port, () => {
        console.log('Magic happens at http://localhost:' + port);
    });
  
    app.get('/', (req, res) => {
      res.send('Hello! The API is at http://localhost:' + port + '/api');
    })
  
})