"use strict";

//in operations_1. js we nested callbacks, but as you noticed that the inner functions did not
//rely on the outer function's result, thus we can parellelize the calls
module.exports = function composedCall(args, cb) {

    var pendingCalls = 0;
    var orderedResults = [];
    var calledBack = false;

    call1(args, handleResult());
    call2(args, handleResult());
    call3(args, handleResult());


    function handleResult() {
        //need to get index and save off for later use, i.e. to set the results back in order
        var order = pendingCalls;
        //bump up counter - increment when we start an operation
        pendingCalls++;

        //process function concurrently, no nested callbacks anymore like in operations_2.js
        return function(err, result) {
            //since this function is per call, and when we handle the result we need to decrement
            //decrement when we are finishing an operation
            pendingCalls--;

            if (err) {
                callback(err);
            } else {
                //this is a list of the results called in order, i.e. - call1, call2, call3
                orderedResults[order] = result;

                //if count is 0 then call the callback, because we don't want to call the callback more than once.
                if (!pendingCalls) {
                    callback(null, orderedResults);
                }
            }
        };
    }

    //manages the cb - callback of composedCall, that was passed in the args
    function callback(err, value) {
        if (!calledBack) {
            calledBack = true;
            cb(err, value);
        }
    }
};

//calls
//setTimeout makes the functions asynchronous

function call1(args, cb) {
    setTimeout(cb, randomTimeout(), null, 1);
}

function call2(args, cb) {
    //setTimeout(cb, randomTimeout(), new Error("error"), randomValue()); // if you want to show an error happening, and it will stip all precoessing
    setTimeout(cb, randomTimeout(), null, 2);
}

function call3(args, cb) {
    setTimeout(cb, randomTimeout(), null, 3);
}

//utils

function randomTimeout() {
    return Math.floor(Math.random() * 1e3); //one second
}

function randomValue() {
    return Math.floor(Math.random() * 1e10); //one second
}