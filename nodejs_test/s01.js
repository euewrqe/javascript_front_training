var url = require("url");
url.parse("http://www.baidu.com")  // url.parse(url, parseQueryString=false) 
                                    //parseQueryString让query变为duixiang 

url_data={
    protocol: "http:",
    host: 'www.baidu.com',
    hostname: "www.baidu.com"
}
url_str = url.format(url_data);   // protocol://hostname:port/pathname?query#hash
console.log(url_str);

// reserve("http://www.baidu.com", "/a/b/c") -> http://www.baidu.com/a/b/c