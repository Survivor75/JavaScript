var jwt = require('jsonwebtoken');

module.exports = function(app, db) {

    let User = require('../models/schema').User
    
    app.post('/authenticate', function(req, res) {
        
        User.findOne({
          name: req.body.name
        }, function(err, user) {
      
          if (err) 
            throw err;
      
          if (!user) 
          {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
          } 
          else if (user) 
          {
      
            if (user.password != req.body.password) 
            {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } 
            else 
            {
      
              const payload = 
              {
                admin: user.admin     
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
    });
    
    app.post('/createUser', function(req, res) {
      
      var user = new User({ 
        name: req.body.name, 
        password: req.body.password,
      });
    
      user.save(function(err) {
      
      if (err) 
          throw err;
  
      console.log('User Created Successfully');

      res.json({ success: true });
      });

    });

    app.get('/setup', function(req, res) {

      var user = new User({ 
        name: 'Rick', 
        password: 'Sanchez',
        admin: true 
      });
  
      user.save(function(err) {
      
      if (err) 
          throw err;
  
      console.log('Super User Created Successfully');

      res.json({ success: true });
      });

    });
    
};
