

1，配置Vue
2，vue指令
3，vue路由
4，vue渲染
5，vue动画


## vue框架


#### 配置Vue

1, 本地配置
在html中导入vue.js包就能用了，导入完后配置如下
```
var vm = new Vue({
    el: "",  /* 管理的标签，当指定某个标签给el时，就表示旗下的所有标签都收Vue实例的管制, 
    配置和css一样[#]表示id，[.]表示类 */
    data: {},  // 要显示的数据
    methods: {},  // 方法
})
```
2, 作为项目进行配置
作为项目配置，则需要在webpack中被管理，js的调用是相互导包，包括css，scss等的调用都是导包
导入vue包时需要注意的是，不能直接`import Vue from 'vue'`，爆出的异常是`runtime-only`
默认webpack的import是指向node_modules下，例如vue，找到vue包, 有个package.json文件，
导入Vue的是`main`属性的值，默认是`dist/vue.runtime.common.js`,正确的导包如下
方法1，import直接指向包中的vue.js：
```
import Vue from 'node_modules/vue/dust/vue.js'
```
方法2，在webpack.config.js中module.exports.resolve
```
resolve: {
    alias: {
        "vue$": "vue/dist/vue.js"  //表示我vue导入的包是vue/dist/vue.js
    }
}
```

#### 2，vue指令

```
<style>
    [v-cloak]{
        display: none;   // 在vue加载完之前改标签不显示
    }
</style>

<p v-cloak>{{ msg }}</p>
```
vue的指令都是以v-开头
v-cloak指定该标签从html加载到vue执行之前不显示大括号等源代码信息

v-text和v-html，把内容写到属性中，页面一开始也不会显示内容，直到vue加载

v-text和v-html的区别是，v-html可以传html标签

##### v-bind
我要传一个变量给属性应该在属性前面加v-bind，

```
<button v-bind:title="mytitle">btn</button>
<script>
var vm = new Vue({
    data: {
        msg: "123",
        msg2: "<h1>1234444</h1>",
        mytitle: "this is a btn"
    }
}
</script>
```

##### [v-on:事件]或[@:事件]
给事件绑定vue的methods方法

```
<button v-on:click="show">btn</button>
<script>
var vm = new Vue({
    methods: {
        show(){
            alert(this.msg);
        }
    }
}
</script>
```

v-on的参数:


##### v-for循环
`v-for="(item) in list"`或`v-for="(item, i) in list"`
表示按照list进行循环改标签
item表示值， i表示索引

v-if和v-show，传一个data中的值，或表达式，判断，false就不显示
v-if当为false时，标签消失，v-show为false时标签的display是none
```
<li v-for="(item, i) in list" :key="item">第一个值：{{item}}---第二个索引：{{i}}</li>
<div v-if="i==10"></div>
<div v-show=""></div>
<script>
var vm = new Vue({
    el: "#app",
    data: {
        list: [1,2,3,4,5]
    }
})
</script>
```
`:key`指定每个元素中的那个值作为唯一值，把li内部的内容绑定到一起


##### v-model双向数据绑定
data中的数据传给前端表单，当表单中修改这个值时，data中的该数据也被更改，页面上引用该数据的所有内容也就被更改了

##### 自定义指令
Vue.directive(name, object) 添加自定义指令,如：
Vue.directive("bind", {})

#### vue渲染




vue动画，vue路由