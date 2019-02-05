var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var Restaurant = mongoose.model('Restaurant', new Schema({ 
    name: {type: String, require: true}, 
    password: {type: String, require: true},
    admin: {type: Boolean} 
}));

var Dish = mongoose.model('Dish', new Schema({ 
    name: {type: String, require: true},
    price: {type: Number, required: true},
    size: {type: String, default: "REGULAR"},
    isAvailable: {type: Boolean, default: false},
    restaurant: {type: String, require: true}    
}));


module.exports = {
    Restaurant: Restaurant,
    Dish: Dish
};