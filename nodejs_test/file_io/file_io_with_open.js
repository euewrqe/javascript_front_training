var fs = require("fs");
var path = require("path");
var os = require("os");

// file.open读
function file_open_read(){
    /**
     * fs.open(file, mode, callback)
     * mode: r, w, a
     * callback:(err, fd)=>{}, fd: 获得文件描述符
     */
    fs.open('./file.txt', 'r', (err, fd)=>{
        if(err) throw err;
        var buf = Buffer.alloc(1024);
        fs.read(fd,buf,0, buf.length, 3, (err, 
            bytesRead, buffer)=>{
                console.log(err);
                console.log(bytesRead); // 文件的字符串长度
                console.log(buffer.toString());
                console.log("========");
        } )
        //fs.read(fd, buf, buf.0, buf.length, file_position, callback)
        /**
         * fd: 文件描述符, buf：开辟一块字符串缓冲区，
         * buf.0，buf.length：一次读取的长度
         * file_position：从文件的那里开始读
         * callback: (err, bytesRead, buffer)=>{}
         * bytesRead读取的字节数， buffer内容
         */
        
    })
}

function file_open_write(){
    var fs = require("fs");

    fs.open("file.txt", "a", (err, fd)=>{  // a表示从最后一个的位置为0写入
        let buf = Buffer.from("\n写入一条记录");

        fs.write(fd, buf, 0, buf.length, 0, (err,
            bytesWritten, buffer)=>{
                console.log(bytesWritten);
                console.log(buffer.toString());
        })

    });
}

function file_read_sync(){
    let res = fs.readFileSync("./file.txt");
    // fs.readFileSync(new URL("file:///"))
    console.log(res.toString());
}

function fs_other_test(){
    // fs.stat("./file.txt", (err, stats)=>{
    //     console.log(stats);
    // }); 
    // fs.statSync

    // fs.mkdir(".\\a\\b\\c", {recursive:true}, 
    // (err)=>{
    //     if(err) throw err;
    // }); 
    // fs.mkdirSync
    
    // 文件权限
    // fs.chmod("file.txt", 0o775, (err)=>{
    //     if(err) throw err;
    //     console.log("文件权限更改");
    // })
    // file.chown

    // 文件是否存在
    // fs.access(file, fs.constants.R_OK, 
    //     (err)=>{
    //         console.log(err);
            
    //     })
    //fs.link(existingPath, newPath, callback)
    // fs.symlink
    //重命名
    // fs.rename("./file.txt.tmp", "./file.txt.org", 
    // (err)=>{
    //     console.log("重命名完毕");
    // })


}


function fs_read_file(){
    fs.readFile("./file.txt", (err, data)=>{
        if(err) throw err;
        console.log(data.toString());
    })
    //fs.readFile("./file.txt", "utf8", callback);
    
    
}

function fs_write_file(){
    fs.writeFile("./file.txt", "");
}

function fs_append_file(){
    fs.appendFile('file.txt', '添加尾部', 
    (err)=>{
        if(err) throw err;
        console.log("追加文件内容");
    });
}

function file_copy_test(){
    fs.copyFile("file.txt", "file.txt.tmp", 
    (err)=>{
        if(err) throw err;
        console.log("文件已经拷贝");
    })
}

function file_read_dir_test(){
    //获取目录下的 所有文件
    fs.readdir("./", encoding="utf-8", (err, files)=>{
        if(err) throw err;
        for(file of files){
            console.log(file);
        }
    })
}
