"use strict";

//mimic insert into a database
var insertElement = function(data, callback) {
    //use timeout to mimic non deterministic nature of how quickly a db inserts
    var timeout = Math.ceil(Math.random() * 3000);

    setTimeout(function() {
        callback(null, data);
    }, timeout);
};

//this is incorrect, this will call the callback then insert, we don't want that
// var insertAll = function(coll, callback) {
//     //this will not insert in order, mimics real behavior, since time for each insert time is random
//     coll.forEach(function(elem) {
//         insertElement(elem, function(err) {
//             console.log("Item %s inserted.", elem);
//         });
//     });
//     callback();
// };

//notice that for each creates a closure so that elem is different for every iteration
var insertAll = function(coll, callback) {
    var recordsLeft = coll.length;
    //this will not insert in order, mimics real behavior, since time for each insert time is random
    coll.forEach(function(elem) {
        insertElement(elem, function(err) {
            console.log("Item %s inserted.", elem);
            if (--recordsLeft === 0) {
                callback();
            }
        });
    });
};

//classic for loop only has one var so only the last state will be used, in this case 10
var insertAllWrong = function(coll, callback) {
    var recordsLeft = coll.length,
        elem;
    for (var i = 0; i < coll.length; i++) {
        elem = coll[i];
        insertElement(elem, function(err) {
            console.log("Item %s inserted.", elem);
            if (--recordsLeft === 0) {
                callback();
            }
        });
    };
}

//classic for loop only has one var so only the last state will be used, in this case 10
//if we create a function within the loop it will work as designed - this works because
//it is immediately called
var insertAllWrongCorrected = function(coll, callback) {
    var recordsLeft = coll.length,
        elem;
    for (var i = 0; i < coll.length; i++) {
        elem = coll[i];

        (function(elem) {
            insertElement(elem, function(err) {
                console.log("Item %s inserted.", elem);
                if (--recordsLeft === 0) {
                    callback();
                }
            });
        })(elem);
    };
}

var coll = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//insertAllWrong(coll, function() {
//insertAll(coll, function() {
insertAllWrongCorrected(coll, function() {
    console.log("inserting all into database finished");
});