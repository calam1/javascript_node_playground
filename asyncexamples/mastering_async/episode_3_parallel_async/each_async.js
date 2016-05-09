"use strict";
//parallel async iteration

module.exports = eachAsync;

function eachAsync(collection, iterate, cb) {
    var pending = collection.length;
    var calledback = false;

    collection.forEach(function(elem) {
        iterate(elem, terminated);
    });

    //basically this callback only really kicks off once all the processed
    //are finished
    function terminated(err) {
        pending--;

        if (err) {
            callback(err);
        } else if (!pending) {
            callback();
        }
    }

    function callback(err) {
        if (!calledback) {
            calledback = true;
            cb(err);
        }
    }
}