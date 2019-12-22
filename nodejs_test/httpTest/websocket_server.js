const http = require('http');
function start_server(){
    const srv = http.createServer((req, res)=>{
        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        res.end('okay');
    })
    
    srv.on('upgrade', (req, socket, head)=>{
        socket.write('HTTP/1.1 101 Web Socket协议挥手\r\n' +
        'Upgrade: WebSocket/r/n' + 'Connection: Upgrade\r\n');
        socket.pipe(socket);
    })

    srv.listen(8000, '0.0.0.0', ()=>{
        console.log("123");
        const options = {
            port:8000,
            host: '127.0.0.1',
            headers: {
                'Connection': 'Upgrade',
                'Upgrade': 'webSocket'
            }
        };

        const req = http.request(options);
        req.on('upgrade', (res, socket, upgradeHead)=>{
            console.log('got upgraded!');
            socket.end();
            process.exit(0);
        });
    });
}


start_server();

