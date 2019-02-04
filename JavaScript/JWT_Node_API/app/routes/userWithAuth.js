var jwt = require('jsonwebtoken');

module.exports = function(app, db) {

    let User = require('../models/schema').User
    let Dish = require('../models/schema').Dish

    app.use(function(req, res, next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];
      
        if (token) 
        {
          jwt.verify(token, 'lubadubadubdub', function(err, decoded) {       
            if (err) 
            {
                return res.json({ success: false, message: 'Failed to authenticate token.' + err });       
            } 
            else 
            {
                req.decoded = decoded;
                next();
            }
          });
      
        } 
        else 
        {
      
          return res.status(403).send({ 
              success: false, 
              message: 'No token provided.' 
          });
      
        }
    });      

    app.get('/', function(req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    app.post('/createDish', function(req, res) {
        res.json('Dish Created Successfully')
    });
    
    app.get('/getDish', function(req, res) {
        
        Dish.find({}, function(err, dish) {
            res.json(dish);
        });
    });

    app.get('/updateDish', function(req, res) {
        res.json('Dish Updated Successfully')
    });

    app.get('/deleteDish', function(req, res) {
        res.json('Dish Deleted Successfully')
    });

    app.get('/users', function(req, res) {

        User.find({}, function(err, users) {
            res.json(users);
        });
    });

    app.get('/getDishes', function(req, res) {

        Dish.find({}, function(err, dishes) {
            res.json(dishes);
        });
    });

};
