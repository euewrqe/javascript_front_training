import React from 'react';  // 创建组件，生命周期
import ReactDOM from 'react-dom';   // 虚拟dom操作

/**
 * 创建虚拟DOM组件
 * 参数1：标签名
 * 参数2：子节点, 属性，
 * 
 */
const h1_dom = React.createElement('h1', {id: "h1_hhh", title: "this is a h1"}, '内容');
const div_dom = React.createElement("div", null, 'div元素', h1_dom);
/**
 * 参数1：要渲染的虚拟DOM
 * 参数2：指定页面上的容器，容器必须是一个DOM元素
 */
ReactDOM.render(div_dom, document.getElementById("root"));