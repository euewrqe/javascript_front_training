var fs = require("fs");


fs.open("file.txt", "a", (err, fd)=>{  // a表示从最后一个的位置为0写入
    let buf = Buffer.from("\n写入一条记录");

    fs.write(fd, buf, 0, buf.length, 0, (err,
        bytesWritten, buffer)=>{
            console.log(bytesWritten);
            console.log(buffer.toString());
    })

});