class Person{
    name: string;
    public age: number;
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    getName():string{
        return this.name;
    }

    toString(){
        return this.name + "+" + this.age;
    }
}


class Student extends Person{
    private score:number;
    constructor(name, age, score){
        super(name, age);
        this.score = score;
    }
}

let p01:Person = new Student("小明", 20, 100);

console.log(p01);

