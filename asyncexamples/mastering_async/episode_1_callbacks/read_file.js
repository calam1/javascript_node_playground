var fs = require("fs");

fs.readFile(__filename, {encoding: "utf8"}, gotFileContent);

function gotFileContent(err, content) {
  if (err) {
    console.err(err, content);
  } else {
    console.log("this file's content: \n\n%s", content);
  }
}