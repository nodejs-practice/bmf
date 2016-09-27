var express = require("express");
var download = require('download');
var fs = require("fs");

var app = express();

// constants
var csvUrl = "http://portal.amfiindia.com/spages/NAV0.txt";
var csvFolder = __dirname + "/files";
var response = "";

app.get("/", function(req, res, next) {
    response = "Welcome to index";
    response += "<br /><br />File download should start";

    download(csvUrl).pipe(fs.createWriteStream(csvFolder + '/data.txt'));

    res.send(response);
});


app.listen(3000);