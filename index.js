var express = require("express");
var download = require('download');
var fs = require("fs");

var app = express();

// constants
var csvUrl = "http://portal.amfiindia.com/spages/NAV0.txt";
var csvFolder = __dirname + "/files";
var csvFile = csvFolder + "/data.txt";
var response = "";

app.get("/", function(req, res, next) {
    // response = "Welcome to index";
    // response += "<br /><br />File download should start";

    // file download
    // todo: check headers and don't redownload if file is not modified
    // download(csvUrl).pipe(fs.createWriteStream(csvFile));

    // parse downloaded file
    fs.readFile(csvFile, "utf8", function(err, data) {
       if (err) throw err;

       // convert data to array
       // for every line starting with a digit
       var content = data.split("\r\n");
       
       var schemes = [];
       var funds = [];
       var folios = [];

       for ($i=0; $i<content.length; $i++) {
            if (/scheme/i.test(content[$i])) {
                schemes.push(content[$i].split(","));
            } else if (/fund/i.test(content[$i])) {
                schemes.push(content[$i].split(","));
            } else if (/^[0-9]/.test(content[$i])) {
                folios.push(content[$i].split(","));
            }
       }

       response += JSON.stringify(schemes) + "<br>";

    });

    res.send(response);
});


app.listen(3000);

