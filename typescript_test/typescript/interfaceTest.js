// 实现
var p01 = { name: "zhangsan", age: 20 };
// 传参
function getPerson(per) {
    console.log(per.name);
}
getPerson(p01);
function getPerson2(per) {
    return per;
}
