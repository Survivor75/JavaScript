var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, database) {

    var state_city_mapping = require('../../data/state_city_mapping.json')

    app.get('/unpaid_fp_data', (req, res) => {
        const floatdb       = database.db("floatdb");
        
        const payment_state = 0;
        const state         = req.param("state")
        const cities        = state_city_mapping[state]
        
        const query = { "PaymentState": payment_state, "City": {"$in": cities} };
        
        floatdb.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });

    app.get('/paid_fp_data', (req, res) => {
        const floatdb       = database.db("floatdb");
    
        const payment_state = 0;
        const state         = req.param("state")
        const cities        = state_city_mapping[state]
        
        const query = { "PaymentState": payment_state, "City": {"$in": cities} };
        
        floatdb.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });
    
    app.get('/fos_data', (req, res) => {
        const ndsdb         = database.db("ndsdb");
    
        const state         = req.param("state")
        const cities        = state_city_mapping[state]
        
        const query = { "City": {"$in": cities} };
        
        ndsdb.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });
    
    app.get('/cf_data', (req, res) => {
        const floatdb       = database.db("floatdb");

        const state         = req.param("state")
        const cities        = state_city_mapping[state]
        
        const query = { "City": {"$in": cities} };
                
        floatdb.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });

    app.get('/renewal_data', (req, res) => {
        const floatdb       = database.db("floatdb");

        const state         = req.param("state")
        const cities        = state_city_mapping[state]
        
        const query = { "City": {"$in": cities} };
        

        floatdb.collection('floatingPointInternal').find(query).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred - '+ err});
            } else {
                console.log(item.length)

                res.json(item.length);
            }
        })
    });

};