function userModel(options) {
  var db;
  console.log('options value', options);
  
  if(!options.db) {
    throw new Error('Options.db is required');
  }

  db = options.db;

  return {
    create: function(cb) {
      console.log('In Users');
      db.query('INSERT ...', cb);
    }
    
  }
}

module.exports = userModel;
