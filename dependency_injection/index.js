var db = require('./db');

db.init();

var userModel = require('User') ({
  db: db
});

userModel.create(function(err, user){

});