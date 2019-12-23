const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const HotModuleReplacementPlugin = require("webpack").HotModuleReplacementPlugin   // 热更新插件

const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: "index.html",
});

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "./dist/"),
        filename: "bundle.js"
    },
    plugins: [
        htmlPlugin,new VueLoaderPlugin()
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
            // {test:/\.js$/, use: ["babel-loader"], exclude: /node-modules/},
            {test: /\.vue$/, use: "vue-loader"}
        ]
    }
}

/**
 * babel 高级语法转成低级语法
 * babelde
 * npm i babel-core babel-loader babel-plugin-transform-runtime -D
 * 语法的对应关系
 * npm i babel-preset-env babel-preset-stage-0 -D
 * {test:/\.js$/, use: ["babel-loader"], exclude: /node-modules/}
 * 在.babelrc中配置
 * {
 *      "presets": [],
 *      "plugins": []
 * }
 * babel-plugin相关的包需要导入到.babelrc中的plugins中
 * babel-presets相关的包需要导入到.babelrc中的presets中
 */