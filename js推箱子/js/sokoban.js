/**
 * Created by euewrqe on 2016/10/29.
 */
var socebanIds=[];     //获取所有方块的id
var NodeObjs=[];    //获取所有方块的节点
var cuteLeft=0;
var cuteTop=0;
var personOBJ={obj:null,left:null,top:null,box:null};   //一个人
var boxGroup=[];           //箱子组合
var direction=null;
var wallGroup=[];       //墙壁组合
var seatGroup=[];       //座位组合
var gameDiv={height:0,width:0};
var line=0;
var step=0;
var box=0;
var vectoryFlag=false;
var match=0;
var levelCount=0;
var sokebanCode=null;
var History=[];
var autoFlag=null;


function clear() {
    socebanIds=[];     //获取所有方块的id
    NodeObjs=[];    //获取所有方块的节点
    cuteLeft=-50;
    cuteTop=0;
    personOBJ={obj:null,left:null,top:null};
    boxGroup=[];
    wallGroup=[];
    seatGroup=[];
    $("#game #game_message").siblings().remove();
    $("#game #game_message").addClass("display");
    step=0;
    box=0;
    gameDiv={height:0,width:0};
    $("body").scrollTop(0);
    $("body").scrollLeft(0);
    match=0;
    direction=null;
    sokebanCode=null;
    History=[];
}
//重新建立
function Build(flag){
    clear();
    $("#game #game_message").removeClass("display");
    if(levelCount==levelGroup.length){
        return;
    }
    readCode(flag);
    if(flag=="auto"){
        levelCount+=1;
    }else{
        levelCount-=1;
    }
    resolu();
}
//创建节点
function createDiv(className,obj) {
    if(className=="换行"){
        cuteTop+=50;
        cuteLeft=-50;
    }else{
        cuteLeft+=50;
        var Cute=document.createElement("div");
        switch(className){
            case "blank":
                Cute.classList.add("blank");
                break;
            default:
                Cute.classList.add("floor");
                break;
        }
        $(Cute).offset({left:cuteLeft,top:cuteTop});
        $("#game").append(Cute);
        //第二层
        switch(className){
            case "wall":
                var Cute=document.createElement("div");
                Cute.classList.add(className);
                $(Cute).offset({left:cuteLeft,top:cuteTop});
                $("#game").append(Cute);
                NodeObjs.push(Cute);
                wallGroup.push($(Cute));
                break;
            case "person":
                var Cute=document.createElement("div");
                Cute.classList.add(className);
                $(Cute).offset({left:cuteLeft,top:cuteTop});
                $("#game").append(Cute);
                NodeObjs.push(Cute);

                personOBJ.left=$(Cute).offset().left;
                personOBJ.top=$(Cute).offset().top;
                personOBJ.obj=$(Cute);
                break;
            case "box":
                var Cute=document.createElement("div");
                Cute.classList.add("box");
                $(Cute).offset({left:cuteLeft,top:cuteTop});
                $("#game_message").after(Cute);
                NodeObjs.push(Cute);
                boxGroup.push({obj:$(Cute),left:$(Cute).offset().left,top:$(Cute).offset().top,seat:null});
                break;
            case "boxOnSeat":
                var Cute=document.createElement("div");
                Cute.classList.add("box");
                Cute.classList.add("boxOnSeat");
                $(Cute).offset({left:cuteLeft,top:cuteTop});
                $("#game_message").after(Cute);
                NodeObjs.push(Cute);
                match+=1;
                boxGroup.push({obj:$(Cute),left:$(Cute).offset().left,top:$(Cute).offset().top,seat:null});
                break;

        }
        //第三层
        switch(className){
            case "seat":case "boxOnSeat":
                var Cute=document.createElement("div");
                Cute.classList.add("seat");
                $(Cute).offset({left:cuteLeft,top:cuteTop});
                $("#game_message").after(Cute);
                NodeObjs.push(Cute);
                seatGroup.push({obj:$(Cute),left:$(Cute).offset().left,top:$(Cute).offset().top});
                break;
        }
    }
    if(className=="boxOnSeat"){
        boxGroup[boxGroup.length-1].seat=$(Cute);
    }

    $("#boxes").text(boxGroup.length);
    /*
    $("#game").height(gameDiv.height);
    $("#game").width(gameDiv.width/(line+1));
    */

}
var LevelMsg=null;
function levelanim(){
    var startLevel=document.createElement("div");
    startLevel.classList.add("startLevel");
    startLevel.style.height=$("#game").height()+"px";
    startLevel.style.width=$("#game").width()+"px";
    startLevel.style.lineHeight=$("#game").height()+"px";
    startLevel.innerText="第"+levelCount+"关";
    $("#game").append(startLevel);
    setTimeout(function () {
       return;
    },1000);
    $(".startLevel").fadeOut(2000,function () {
        $(".startLevel").remove();
    });


}
//解析字符串
function resolu() {
    //sokebanCode=$("#code").val().trim();
    $("#game #game_message").removeClass("display");
    for(var i =0;i<sokebanCode.length;i++)
    {
        switch (sokebanCode.charAt(i)){
            case "#":
                createDiv("wall",false);
                break;
            case "_":
                createDiv("blank",false);
                break;
            case "-":
                createDiv("floor",false);
                break;
            case "$":      //箱子
                createDiv("box",true);
                break;
            case ".":     //空座位
                createDiv("seat",true);
                break;
            case "*":     //有箱子的座位
                createDiv("boxOnSeat",true);
                break;
            case "@":     //小人
                createDiv("person",true);
                break;

            case "\n":
                createDiv("换行",false);
        }
    }
    $("#boxes").text(boxGroup.length);
    levelanim();
}

function readCode(flag) {
    if(flag=="auto"){
        sokebanCode=levelGroup[levelCount];
        $("#code").val(sokebanCode);
    }else if(flag=="noauto"){
        sokebanCode=$("#code").val().trim();
    }
    $("#game").width(sokebanCode.split("\n")[0].length*50);
    $("#game").height(sokebanCode.split("\n").length*50);
    autoFlag=flag;

}


//碰撞事件
function crashToBox() {
    for(var i in boxGroup){
        personOBJ.box=null;
        switch (direction){
            case "left":
                if(personOBJ.left==boxGroup[i].left&&personOBJ.top==boxGroup[i].top){
                    boxGroup[i].left-=50;
                    crashToWall(boxGroup[i]);
                    BoxCrashToBox(boxGroup[i]);
                    BoxOnSeat(boxGroup[i]);
                    personOBJ.box=boxGroup[i];
                    personOBJ.left=boxGroup[i].left+50;
                    History[History.length-1].box=boxGroup[i];
                }
                break;
            case "up":
                if(personOBJ.left==boxGroup[i].left&&personOBJ.top==boxGroup[i].top){
                    boxGroup[i].top-=50;
                    crashToWall(boxGroup[i]);
                    BoxCrashToBox(boxGroup[i]);
                    BoxOnSeat(boxGroup[i]);
                    personOBJ.box=boxGroup[i];
                    personOBJ.top=boxGroup[i].top+50;

                    History[History.length-1].box=boxGroup[i];
                }
                break;
            case "right":
                if(personOBJ.left==boxGroup[i].left&&personOBJ.top==boxGroup[i].top){
                    boxGroup[i].left+=50;
                    crashToWall(boxGroup[i]);
                    BoxCrashToBox(boxGroup[i]);
                    BoxOnSeat(boxGroup[i]);
                    personOBJ.box=boxGroup[i];
                    personOBJ.left=boxGroup[i].left-50;
                    History[History.length-1].box=boxGroup[i];
                }
                break;
            case "down":
                if(personOBJ.left==boxGroup[i].left&&personOBJ.top==boxGroup[i].top){
                    boxGroup[i].top+=50;
                    crashToWall(boxGroup[i]);
                    BoxCrashToBox(boxGroup[i]);
                    BoxOnSeat(boxGroup[i]);
                    personOBJ.box=boxGroup[i];
                    personOBJ.top=boxGroup[i].top-50;
                    History[History.length-1].box=boxGroup[i];
                }
                break;
        }

        boxGroup[i].obj.offset({left:boxGroup[i].left,top:boxGroup[i].top})
    }

}

function crashToWall(someThing) {
    for(var i in wallGroup){
        switch(direction){
            case "left":
                if(someThing.left==wallGroup[i].offset().left&&someThing.top==wallGroup[i].offset().top){
                    someThing.left+=50;
                    History.pop();
                    step-=1;
                }
                break;
            case "up":
                if(someThing.left==wallGroup[i].offset().left&&someThing.top==wallGroup[i].offset().top){
                    someThing.top+=50;
                    History.pop();
                    step-=1;
                }
                break;
            case "right":
                if(someThing.left==wallGroup[i].offset().left&&someThing.top==wallGroup[i].offset().top){
                    someThing.left-=50;
                    History.pop();
                    step-=1;
                }
                break;
            case "down":
                if(someThing.left==wallGroup[i].offset().left&&someThing.top==wallGroup[i].offset().top){
                    someThing.top-=50;
                    History.pop();
                    step-=1;
                }

                break;
        }
        //
    }
    someThing.obj.offset({left:someThing.left,top:someThing.top});
}
function BoxCrashToBox(boxSth) {
    for(var i in boxGroup){
        if(boxGroup[i]!=boxSth){
            switch(direction){
                case"left":
                    if(boxSth.left==boxGroup[i].left&&boxSth.top==boxGroup[i].top){
                        boxSth.left+=50;
                        History.pop();
                        step-=1;
                    }
                    break;
                case"up":
                    if(boxSth.left==boxGroup[i].left&&boxSth.top==boxGroup[i].top){
                        boxSth.top+=50;
                        History.pop();
                        step-=1;
                    }
                    break;
                case"right":
                    if(boxSth.left==boxGroup[i].left&&boxSth.top==boxGroup[i].top){
                        boxSth.left-=50;
                        History.pop();
                        step-=1;
                    }
                    break;
                case"down":
                    if(boxSth.left==boxGroup[i].left&&boxSth.top==boxGroup[i].top){
                        boxSth.top-=50;
                        History.pop();
                        step-=1;
                    }
                    break;
            }
        }

        //step-=1;
    }

}
//箱子进入座位
function BoxOnSeat(someThing){
    for(var i =0;i<seatGroup.length;i++){
        if(someThing.seat!=seatGroup[i]) {
            if (someThing.left == seatGroup[i].left && someThing.top == seatGroup[i].top) {
                //console.log(match + " " + seatGroup.length);
                match += 1;
                someThing.obj.addClass("boxOnSeat");
                someThing.seat=seatGroup[i];
                break;
            }else{
                someThing.obj.removeClass("boxOnSeat");
                someThing.seat=null;
            }
        }
    }

}

function moveWindow() {
    if($("#game").height()>window.innerHeight||$("#game").width()>window.innerWidth){
        if(personOBJ.top>window.innerHeight/2){
            $("body").scrollTop(personOBJ.top+window.innerHeight/2);
        }
        else if(personOBJ.left>window.innerWidth/2){
            $("body").scrollLeft(personOBJ.left+window.innerWidth/2);
        }
        else if(personOBJ.top<=window.innerHeight/2){
            $("body").scrollTop(0);
        }
        else if(personOBJ.left>window.innerWidth/2){
            $("body").scrollLeft(0);
        }
    }
}

function move(pos) {
    switch(pos){
        case "left":
            personOBJ.left-=50;
            break;
        case "right":
            personOBJ.left+=50;
            break;
        case "up":
            personOBJ.top-=50;
            break;
        case "down":
            personOBJ.top+=50;
            break;
        default:
            return;
    }

    History.push({direction:pos,box:null});
    step+=1;
    crashToBox();
    crashToWall(personOBJ);
    $("#step").text(step);
    //personOBJ.obj.offset({left:personOBJ.left,top:personOBJ.top});
    personOBJ.obj.offset({left:personOBJ.left,top:personOBJ.top});

}

window.onkeydown=function (e) {
    e=e.keyCode;
    switch(e){
        case 37:
            direction="left";
            break;
        case 38:
            direction="up";
            break;
        case 39:
            direction="right";
            break;
        case 40:
            direction="down";
            break;
        case 90:   //Z撤销
            direction=null;
            break;
        default:
            return;
    }
    move(direction);
    moveWindow();
    vectory();
    if(e==90){
        recode();
    }
};

function recode() {
    if(History.length==0){
        return;
    }
    var recoData=History.pop();
    switch(recoData.direction){
        case "left":
            personOBJ.left+=50;
            if(recoData.box){
                personOBJ.box=recoData.box;
                personOBJ.box.left+=50;
                BoxOnSeat(personOBJ.box);
            }else{
                personOBJ.box=null;
            }
            break;
        case "up":
            personOBJ.top+=50;
            if(recoData.box){
                personOBJ.box=recoData.box;
                personOBJ.box.top+=50;
                BoxOnSeat(personOBJ.box);
            }else{
                personOBJ.box=null;
            }
            break;
        case "right":
            personOBJ.left-=50;
            if(recoData.box){
                personOBJ.box=recoData.box;
                personOBJ.box.left-=50;
                BoxOnSeat(personOBJ.box);
            }else{
                personOBJ.box=null;
            }
            break;
        case "down":
            personOBJ.top-=50;
            if(recoData.box){
                personOBJ.box=recoData.box;
                personOBJ.box.top-=50;
                BoxOnSeat(personOBJ.box);
            }else{
                personOBJ.box=null;
            }
            break;
    }
    personOBJ.obj.offset({left:personOBJ.left,top:personOBJ.top});
    if(personOBJ.box){
        personOBJ.box.obj.offset({left:personOBJ.box.left,top:personOBJ.box.top});
    }
    step-=1;
    $("#step").text(step);
}

function vectory() {
    match=0;
    for(var i in boxGroup){
        for(var j in seatGroup){
            if(boxGroup[i].seat==seatGroup[j]){
                match+=1;
            }
        }
    }
    if(match==seatGroup.length){
        autoFlag="auto";
        vectoryFlag=true;

        alert("通关");
        clear();
        step=0;
        $("#step").text(step);
        readCode(autoFlag);
        levelCount+=1;
        resolu();
    }
    else{
        vectoryFlag=false;
    }
}
