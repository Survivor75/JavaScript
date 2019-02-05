var jwt = require('jsonwebtoken');

module.exports = function(app, db) {

    let Restaurant = require('../models/schema').Restaurant
    
    // AUTHENTICATION API -------------------

    app.post('/authenticate', function(req, res) {
        try
        {
          Restaurant.findOne({
            name: req.body.name
          }, function(err, restaurant) {
        
            if (err) 
              throw err;
        
            if (!restaurant) 
            {
              res.json({ success: false, message: 'Authentication failed. Restaurant not found.' });
            } 
            else if (restaurant) 
            {
        
              if (restaurant.password != req.body.password) 
              {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
              } 
              else 
              {
        
                const payload = 
                {
                  admin: restaurant.admin     
                };
    
                var token = jwt.sign(payload, 'lubadubadubdub', {
                  expiresIn: 1440 // expires in 24 hours
                });
    
                res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
                });
              } 
            }
        
          });
        }
        catch(error)
        {                
          res.json({
              success: false,
              message: error
          })
        }
    });
    
    // CREATE RESTAURANT API -------------------

    app.post('/createRestaurant', function(req, res) {
      try
      {
        var restaurant = new Restaurant({ 
          name: req.body.name, 
          password: req.body.password,
          admin: req.body.admin
        });
      
        restaurant.save(function(err, data) {
        
          if (err) 
              throw err;
      
          console.log('Restaurant Created Successfully');
  
          res.json({ success: true, data: data});
          
        });
      }
      catch(error)
      {
        res.json({ success: false, data: error});
      }
    });

};
