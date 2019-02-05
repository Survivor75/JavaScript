var jwt = require('jsonwebtoken');

module.exports = function(app, db) {

    let User = require('../models/schema').User
    let Dish = require('../models/schema').Dish
    
    // AUTHENTICATION MIDDLEWARE -------------------
    
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

    // CRUD APIS -------------------
    
    app.post('/createDish', function(req, res) {
                    
        var dish = new Dish({ 
            name: req.body.name, 
            restaurantName: req.body.restaurantName
        });

        dish.save(function(err) {
      
            if (err) 
                throw err;
        
            console.log('Dish Created Successfully');
      
            res.json({ success: true });
        });
           
    });
    
    app.get('/getDish', function(req, res) {
        
        Dish.findOne({
            name: req.query.name, 
            restaurantName: req.query.restaurantName
        }, function(err, dish) {
            res.json(dish);
        });
    });

    app.post('/updateDish', function(req, res) {
        
        Dish.findOneAndUpdate({
            name: req.body.name, 
            restaurantName: req.body.restaurantName
        }, 
        {
            name: req.body.name + "100"
        }, function(err, data){
            if(err)
                throw err;
            
            res.json({success: true, data: data})
        })    
    });

    app.post('/deleteDish', function(req, res) {
        
        Dish.findOneAndRemove({
            name: req.body.name, 
            restaurantName: req.body.restaurantName
        }, function(err, data){
            if(err)
                throw err;
            
            res.json({success: true, data: data})
        })
    });
    
};
