var test = require('tape');
var userModel = require('./User');

test('it creates a user with id', function(t) {
  var user = {
    id: 1
  };
  
// var fakeDb = require('./db');
  var fakeDb = {
    query: function(data, cb) {
      return cb(null, user);
    }
  }

 userModel({
   db: fakeDb
 }).create(function(err, user) {
   console.log('in test.create');
   t.equal(user.id, 1, 'User id should match');
   t.end();
 })
});
