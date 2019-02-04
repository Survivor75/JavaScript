const Routes = require('./routes');

module.exports = function(app, db) {
    Routes(app, db);
  // Other route groups could go here, in the future
};