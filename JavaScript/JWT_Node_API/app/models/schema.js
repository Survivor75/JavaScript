var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var User = mongoose.model('User', new Schema({ 
    name: {type: String, require: true}, 
    password: {type: String, require: true}, 
    admin: {type: Number, require: false} 
}));

var Dish = mongoose.model('Dish', new Schema({ 
    name: {type: String, require: true},
    restaurantName: {type: String, require: true}
}));


module.exports = {
    User: User,
    Dish: Dish
};