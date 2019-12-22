const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// //创建一个实例对象
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),  //源文件
    filename: "index.html",  //在内存中的html文件
});
//向外暴露一个打包对象
module.exports = {
    mode: 'development',   // production
    plugins: [
        htmlPlugin
    ]
}