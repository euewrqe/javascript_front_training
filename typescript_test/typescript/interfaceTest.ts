interface Person{
    name : string;
    age : number;
}

// 实现
let p01 = {name: "zhangsan", age: 20};

// 传参
function getPerson(per:Person){
    console.log(per.name);
}
getPerson(p01);

function getPerson2(per:Person):{name:string, age:number}{

    return per;
}