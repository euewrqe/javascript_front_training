# webpack

webpack可以将前端的文件打包，压缩，混淆等操作，增加前端的安全性，可以自动转换coffee, type, scss等语法到普通的页面语法， 同时开启服务

## webpack配置步骤

1, npm init 初始化
2, webpack和webpack-dev-server安装
3, 配置webpack.config.js
4, 针对html进行包管理`html-webpack-plugin`
5, css, less,scss, coffee等的loader包安装:
6, 静态文件的loader包安装
7, babel等一些用于js语法转换的的包的安装
8, 配置.babelrc


#### npm init 初始化
npm init 初始化， 引出package.json包管理文件,在包管理文件中
scripts属性下的每个属性都可以被npm run调用

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "install": "npm install webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader -D",
    "dev": "webpack-dev-server --open firefox --port 3000 --contentBase src --host 127.0.0.1 --compress --progress"
  }
```
根据上述配置，npm run install加载scripts的install内容进行批量包安装


#### webpack和webpack-dev-server安装
npm安装完webpack就能对所在目录的js文件进行打包，默认入口文件是src的index.js文件，可以看到package.json中有`"main": "index.js"`

webpack-dev-server安装完后就能开启服务，开启服务可实时打包，并可以联网访问
```
webpack-dev-server --open firefox --port 3000 --contentBase src --host 127.0.0.1 --compress --progress
```

webpack相关配置在根目录的webpack.config.js中
```
module.exports = {
    mode: "development",
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "./dist/"),
        filename: "bundle.js"
    },
    plugins: [
        htmlPlugin,
        // HotModuleReplacementPlugin
    ],
    // devServer:{
    //     open:"xxx",
    //     port:"xxx",
        // hot:true  //热更新
    // },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"  //修改vue导入包的路径
        }
    },
    module: {    // 第三方模块的处理
        rules: [
            {test:/\.css$/, use: ["style-loader", "css-loader"]},
        ]
    }
}

// entry定义入口文件，output定义打包后的文件
```

#### css, less,scss, coffee等的loader包安装
同时在webpack配置文件中module中的rule列表中针对每个文件和loader的映射关系进行配置

```
/**
* webpack默认无法解析除了js以外的文件，如果要解析css要导入style-loader和css-loader
*/
{test:/\.css$/, use: ["style-loader", "css-loader"]},
// less打包  install less-loader less
{test:/\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
// scss打包 install sass-loader sass node-sass
{test:/\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
// coffee打包 install coffee-loader
{test:/\.coffee$/, use: ["coffee-loader"]},
// 如何处理url转换成base64, install url-loader file-loader
/**选择想要压缩的图片，比如大小限制 url-loader?limit=[字节数]& */
/**指定名字url-loader?name=[name].[ext].[hash:8]，hash最大32 */
{test:/\.(jpg|png|gif|bmp|jpeg)$/, use: ["url-loader"]},
/**处理字体 */
{test:/\.(ttf|eot|svg|woff|woff2)$/, use: ["url-loader"]},
{test:/\.js$/, use: ["babel-loader"], exclude: /node-modules/}

```


#### babel等一些用于js语法转换的的包的安装

babel用于把程序员写的高版本的js文件转成浏览器能识别的js文件

1， 两套包的安装
```
# 第一套包是语法转换器
npm i babel-core babel-loader babel-plugin-transform-runtime -D
# 第二套是语法对应关系
npm i babel-preset-env babel-preset-stage-0 -D
```
2，在webpack.config.js中配置rules
```
{test:/\.js$/, use: ["babel-loader"], exclude: /node-modules/}
```
3，.babelrc配置
.babelrc放在根目录下
配置的内容:
```
{
    "presets": [],
    "plugins": []
}
```
babel-plugin相关的包需要导入到.babelrc中的plugins中
babel-presets相关的包需要导入到.babelrc中的presets中