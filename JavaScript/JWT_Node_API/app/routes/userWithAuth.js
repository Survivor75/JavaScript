var jwt = require('jsonwebtoken');

module.exports = function(app, db) {

    let Restaurant = require('../models/schema').Restaurant
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
        try
        {
            var dish = new Dish({ 
                name: req.body.name,
                price: req.body.price,
                size: req.body.size,
                isAvailable: req.body.isAvailable, 
                restaurant: req.body.restaurant
            });
    
            dish.save(function(err, data) {
          
                if (err) 
                    throw err;
                  
                res.json({ success: true, data: data});
            })
        }
        catch(error)
        {
            res.json({ success: false, data: error});
        }   
    });
    
    app.get('/getDish', function(req, res) {
        try
        {
            let query = {
                "$and": [{name: req.query.name}, {restaurant: req.query.restaurant}]
            }
            
            Dish.findOne(query, function(err, data) {
                if(err)
                    throw err;
                
                res.json({success: true, data: data});
            })
        }
        catch(error)
        {
            res.json({success: false, data: error});
        }
    });

    app.post('/updateDish', function(req, res) {
        try
        {
            let findQuery = {
                "$and": [{name: req.body.name}, {restaurant: req.body.restaurant}]
            }
    
            let updateQuery = {
                price: req.body.price,
                size: req.body.size,
                isAvailable: req.body.isAvailable
            }
    
            Dish.findOneAndUpdate(findQuery, updateQuery, function(err, data){
                if(err)
                    throw err;
                
                res.json({success: true, data: data})
            })
        }
        catch(error)
        {
            res.json({success: false, data: error})
        } 
    });

    app.post('/deleteDish', function(req, res) {
        try
        {                    
            let query = {
                "$and": [{name: req.body.name}, {restaurant: req.body.restaurant}]
            }

            Dish.findOneAndRemove(query, function(err, data){
                if(err)
                    throw err;
                
                res.json({success: true, data: data})
            })
        }
        catch(error)
        {
            res.json({success: false, data: error})
        }
    });

};
