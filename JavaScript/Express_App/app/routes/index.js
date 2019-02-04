// routes/index.js

const storyRoutes = require('./story_routes');

module.exports = function(app, db) {
  storyRoutes(app, db);
  // Other route groups could go here, in the future
};