//console.log("hello world");
//alert("hello Trang");
var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){
    let file = fs.readFileSync("test.html", function(err,data){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello worlddaaaáewdf');
}).listen(8080);

