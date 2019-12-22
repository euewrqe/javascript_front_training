 const queryString = require("querystring");
 querystring.stringify({name: "qianfeng", "age": 22, course: ["v", "f"]})
 // 'name=qianfeng&age=22&course=v&course=f'
//stringify(query, 分隔符, 等式符号)
// parse('name:qianfeng,age:22,course:v,course:f', ",", ":")