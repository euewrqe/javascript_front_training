var http = require("http");

function get_a_json(){
    http.get("http://nodejs.org/dist/index.json", (res)=>{
        // 获取头部
        // console.log(res.headers);  // rawHeaders
        console.log("爬虫")
        let rawData = '';
        res.on('data', (chunk)=>{
            console.log("data: " + chunk);
            rawData += chunk
        });
        
        res.on('end', () => {  // 必须用end取，nodejs异步
            try {
              const parsedData = JSON.parse(rawData);
              //console.log(parsedData);
            } catch (e) {
              console.error(e.message);
            }
          });
        
    })
}

function request_test(){

    const options = {
        hostname: "www.google.com",
        port: 80,
        path: '/upload',
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 100
        }

    };
    const req = http.request(options, 
        (res)=>{
            console.log(res.statusCode);
            console.log(res.headers);
            res.setEncoding('utf-8');
            res.on('data', (chunk)=>{

            })
            res.on('end', ()=>{
                
            })
    })

    req.on('error', (e)=>{
        console.log(e.message);
    })
}