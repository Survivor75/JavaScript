const nf_data = require('./nf_data');

module.exports = function(app, database) {
  //Route Groups
  nf_data(app, database);
};