const nf_data = require('./nf_data');

module.exports = function(app, db) {
  nf_data(app, db);
  // Other route groups could go here, in the future
};