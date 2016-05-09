"use strict";

//var operations = require("./operations_1");
var operations = require("./operations_2");

operations({
    some: "args"
}, function(err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log("successful result", result);
    }
});