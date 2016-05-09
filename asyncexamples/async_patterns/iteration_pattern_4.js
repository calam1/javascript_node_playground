"use strict";

//mimic insert into a database
var insertElement = function(data, callback) {
    //use timeout to mimic non deterministic nature of how quickly a db inserts
    var timeout = Math.ceil(Math.random() * 3000);

    setTimeout(function() {
        callback(null, data);
    }, timeout);
};

var insertAllSerially = function(coll, callback) {
    //copies array into new array named queue
    var queue = coll.slice(0),
        elem;

    //execute immediately
    (function iterate() {
        //base case
        if (queue.length === 0) {
            callback();
            return;
        }
        //splice in this case pops off one record at a time, get the first record, and
        //that returns an array of one object and give me the first object
        elem = queue.splice(0, 1)[0];
        insertElement(elem, function(err, elem) {
            if (err) {
                throw err;
            }
            console.log("insert record %s", elem);
            //recursion without blowing the stack - nodejs only
            process.nextTick(iterate);
            //recursion that can blow the stack
            //iterate();
        });
    })();
};

var coll = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

insertAllSerially(coll, function() {
    console.log("inserting all into database finished serially");
});