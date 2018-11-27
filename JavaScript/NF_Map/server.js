const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');

let db               = require('./config/db');

const app            = express();

const port = 7000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    
    db = database.db("floatdb")
    
    require('./app/routes')(app, db);
    
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  })