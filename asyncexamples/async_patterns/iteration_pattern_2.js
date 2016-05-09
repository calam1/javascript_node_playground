//mimic insert into a database
var insertElement = function(data, callback) {
  //use timeout to mimic non deterministic nature of how quickly a db inserts
  var timeout = Math.ceil(Math.random() * 3000);

  setTimeout(function() {
    callback(null, data);
  }, timeout);
};

console.log("calling insertElement");

var coll = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];

//this will not insert in order, mimics real behavior, since time for each insert time is random
coll.forEach(function(elem) {
  insertElement(elem, function(err) {
    console.log("Item %s inserted.", elem);
  });
});
