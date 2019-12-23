
import Vue from "vue";  //webpack中import导入vue，这个包不完整，只提供了runtime-only，
/**
 * import Vue from "vue" 会默认找node_modules下的vue，vue下的main属性
 * vue的main属性默认值是dist/vue.runtime.common.js，所以只提供了runtime的功能
 * 导入方法：
 * 1，找到node_modules下的vue/dist/vue.js，直接导入
 * 2，在webpack.config.js中
 * module.exports = {
 *  resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"  //修改vue导入包的路径
        }
    }
 * }
 */
import './css/index.css';
import './css/index.less';
// import './css/index.scss';
import {square} from "./js/other.coffee";

    new Vue({
        el: "#app",
        data: {
            msg: square(4)
        }
    });

// 打包处理css

var vm2 = new Vue({
    el: "#list_test",
    data: {
        list: [1,2,3,4,5],
        obj: {name: "吕布", age: 22}
    },methods:{
        add(){
            this.list.unshift(this.list.slice(-1) + 1)
        }
    }
})

// vue组件
var login = {
    template: "<h1>登录</h1>"
}
var vm3 = new Vue({
    el: "#render_component",
    components: {
        login
    }
})

// vue渲染

var vm4= new Vue({
    el: "#render_test",
    render: function(createElements){
        return createElements(login);
    }
})

// module_component渲染

import template from "./login.vue";
//配置第三方loader： vue-loader vue-template-compiler
//在配置文件中: {test: /\.vue$/, use: "vue-loader"}

console.log(template);
var vm5= new Vue({
    el: "#render_template",
    render: function(createElements){  // render可以实现把一个组件放到页面上去
        return createElements(template);
    }
})