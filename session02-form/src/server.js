const http = require('http');
const url = require('url');

const port = 8080;
// tải thư viện http có sẳn trong nodejs

//var domanin =""
//var q =url.parse(domanin,true);
//console.log("qqq",q);
// lấy tên
//var userName=q.query.userName;
//console.log("userName",userName);
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
    var domain =  `http://localhost:8080${req.url}`
    var q = url.parse(domain, true)
    var name = q.pathname
    var result = name.split('/')

    res.write(`<h1>Đây là trang: ${result[1]}</h1>`)

    res.end(); //Kết thúc việc gọi server
}).listen(port, function (params) {
    console.log(`Đang gọi vào server: http://localhost:${port}`);
})