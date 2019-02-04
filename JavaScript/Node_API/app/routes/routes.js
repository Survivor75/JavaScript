module.exports = function(app, db) {

    let Schema = require('../models/schema')
    
    app.get('/', (req, res) => {

        Schema.find({}, function(err, data){
            if(err)
              console.log(err);
            else
                res.json(data);
        })

    });
    
};
