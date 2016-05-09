//mimic insert into a database
var async = function(data, callback) {
  //use timeout to mimic non deterministic nature of how quickly a db inserts
  var timeout = Math.ceil(Math.random * 3000);

  setTimeout(function() {
    callback(null, data);
  }, timeout);
};

console.log("calling async");

async(1, function(err, data) {
  if (err) {
    console.err(err);
  } else {
    console.log("async returned with data: %s", data);
  };
});