var path = require("path");
var res = path.join("/a/b/c/d", "a.txt");
console.log(res);
console.log("dirname:" + path.dirname("/a/b/a.txt"));
console.log(`basename: ${path.basename("/a/b/c/a.txt")}`);
console.log("extname:" + path.extname("a.txt"));
console.log("normalize: " + path.normalize("c:\\aa\\bb/c\\dd/ee"));  // 统一路径类型

console.log(path.parse("c://a//b//c//d.txt"));