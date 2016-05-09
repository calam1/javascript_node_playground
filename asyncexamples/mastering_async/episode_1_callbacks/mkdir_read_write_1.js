var fs = require("fs");
var path = require("path");

var dir = path.join(__dirname, "temp");
var source = __filename;
var target = path.join(dir, "target");

fs.mkdir(dir, function(err) {
    if (err) {
        handleError(err);
    } else {
        fs.readFile(source, function(err, content) {
            if (err) {
                handleError(err);
            } else {
                fs.writeFile(target, content, function(err) {
                    if (err) {
                        handleError(err);
                    } else {
                        console.log("all done");
                    }
                });
            }
        })
    }
});

function handleError(err) {
    console.error(err);
}