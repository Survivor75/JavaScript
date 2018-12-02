var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.get('/unpaid_fp_data', (req, res) => {
        const territory = req.param('territory');
        const payment_state = 0;

        const query = { "PaymentState": 0, "City": territory };
        
        db.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });

    app.get('/paid_fp_data', (req, res) => {
        const territory = req.param('territory');
        const payment_state = 0;

        const query = { "PaymentState": 1, "City": territory };
        
        db.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });
    
    app.get('/fos_data', (req, res) => {
        const territory = req.param('territory');
        const payment_state = 0;

        const query = {  };
        
        db.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });
    
    app.get('/cf_data', (req, res) => {
        const territory = req.param('territory');
        const payment_state = 0;

        const query = {  };
        
        db.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });

    app.get('/renewal_data', (req, res) => {
        const territory = req.param('territory');
        const payment_state = 0;

        const query = {  };
        
        db.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });

};