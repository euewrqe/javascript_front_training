let a:boolean = true;
let str:string = 'abc';
let count:number = 20;

let arr:number[] = [1,2,3,4];
let arr02:string[] = ["wang", "zhang"];
let numsArr:Array<number> = [1,2,3];

let tup:[number, string];
tup = [20, 'abc'];

enum Season{Spring, Summer, autumn, winter};
enum Season2{Spring=2, Summer=3, autumn="5", winter="7d"};
let season = Season2[2]; // Season.Summer


function func01():void{
    console.log("func01");
}
func01();