//为函数定义类型
function sum(x:number, y:number):number{
    return x+y;
}

let mySum:(x:number, y:number)=>number = function(x:number, y:number):number{
    return x+y;
}

console.log(mySum(2,4));