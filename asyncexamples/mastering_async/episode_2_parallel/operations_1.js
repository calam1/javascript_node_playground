"use strict";

module.exports = function composedCall(args, cb) {
    call1(args, handlingError(function(result1) {
        call2(args, handlingError(function(result2) {
            call3(args, handlingError(function(result3) {
                cb(null, [result1, result2, result3]);
            }));
        }));
    }));

    function handlingError(fn) {
        return function(err, result) {
            if (err) {
                cb(err);
            } else {
                fn(result);
            }
        };
    }
};

//calls
//setTimeout makes the functions asynchronous

function call1(args, cb) {
    //first arg is the callback function, second is the timeout, third is the error, fourht is the data/value
    setTimeout(cb, randomTimeout(), null, randomValue());
}

function call2(args, cb) {
    setTimeout(cb, randomTimeout(), null, randomValue());
}

function call3(args, cb) {
    setTimeout(cb, randomTimeout(), null, randomValue());
}

//utils

function randomTimeout() {
    return Math.floor(Math.random() * 1e3); //one second
}

function randomValue() {
    return Math.floor(Math.random() * 1e10); //one second
}