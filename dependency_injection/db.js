module.exports.query = function(data, cb) {
  console.log('in db', data);
   var user = {
    id: 1
  };
  return cb(null, user);
};