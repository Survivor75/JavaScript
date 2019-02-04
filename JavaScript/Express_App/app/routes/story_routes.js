// story_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/story/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('story').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  app.post('/story', (req, res) => {
    const story = { story: req.body.body, title: req.body.title };
    db.collection('story').insert(story, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/story/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('story').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('story ' + id + ' deleted!');
      } 
    });
  });
  
  app.put('/story/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const story = { text: req.body.body, title: req.body.title };
    db.collection('story').update(details, story, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(story);
      } 
    });
  });

};