虚拟DOM，diff算法
DOM是在浏览器端的东西
减少dom操作，提高页面性能
虚拟DOM的本质就是用js模拟dom中的元素
```
p = {
    tagName: "p"
    class: "xxx",
    id："xxx",
    chilrens:[
        "aaaa",
        {
            tagName: "xxx"
            class: "xxx",
            id："xxx",
        }
    ]

}
```

diff算法
tree diff
新旧dom数的逐层对比
component diff
`tree diff`中每一层中组件的对比教`component diff`
element diff 组件中的每个元素的对比


package.json中配置:
scripts中的每个key都能进行`run npm [key]`
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server"   // run npm dev自动找到webpack-dev-server并运行
  }
```

webpack用来打包加密js文件

搭建webpack:
运行`npm init -y`
创建src源代码目录，和dist产品目录
安装webpack
`npm install webpack -g`
`npm install webpack-cli -g`

入口文件时src目录下的index.js
输出文件时dist目录下的main.js

mode选项是 webpack4.0的新增选项，值有development,production

实时打包:
webpack-dev-server

webpack-dev-server默认地址http://localhost:8080，打包好的main.js方法被托管到根目录下

webpack-dev-server配置`webpack-dev-server --open --port xxx --host xxx --compress --progress`
--open 指定浏览器打开

把html页面放到内存中，使得根路径为入口
html-webpack-plugin

```
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: "index.html",
});
```

```
module.exports.plugins[0] = htmlPlugin
```


安装react:
react, react-dom

导入react包
```
import React from 'react';
import ReactDOM from 'react-dom';
```

JSX语法使用
babel插件
```
npm i babel-core babel-loader babel-plugin-transform-runtime -D
npm i babel-preset-env babel-preset-stage-0 -D
```
安装能识别jsx的包
```
npm i babel-preset-react -D
```

module.exports = {

    module: {
        rules: [
            {test: /\.js|jsx$/, use: "babel-loader", exclude: "/node_modules/"}
        ]
    }
}  // 第三方模块, exclude排除项

编写.babelrc
```
{
    "presets": ["env", "stage-0", "react"],
    "plugins": ["transform-runtime"]
}
```

jsx基于xml，`<br />`不能为`<br>`