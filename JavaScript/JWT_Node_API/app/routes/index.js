const UserWithAuth = require('./userWithAuth');
const UserNoAuth = require('./userNoAuth');

module.exports = function(app, db) {

    UserNoAuth(app, db);
    UserWithAuth(app, db);

};