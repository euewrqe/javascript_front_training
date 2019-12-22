import React from 'react';
import ReactDOM from 'react-dom';
let a = 10;
// style写法
let div_style = {
    color: "#00ff00"
}

// 列表
let arr = ["经", "狗", "帮"]
let h_arr = []
arr.forEach((item)=>{
h_arr.push(<h5>{item}</h5>);
})
// console.log(h_arr);
arr.map((item)=>{
    return item + "~~";
})

setInterval(
    ()=>{
        a--;

        ReactDOM.render(<div style={div_style}>
            {a}
            <hr />
            {h_arr /*直接放如数组 */}
        </div>, document.getElementById("root"));
    }, 1000
)
 