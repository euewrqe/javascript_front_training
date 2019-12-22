const http = require("http");
http.createServer(function(req, res){
    // res.writeHead(200, {
    //     "Content-Type": "text/html;encoding=utf-8"
    // });
    res.writeHead(200, {
        "Content-Type": "text/html;charset=gbk"
    })
    res.end("<p style='color:red'>你好</p>");
    
}).listen(1337, "127.0.0.1");
console.log("start 127.0.0.1:1337");