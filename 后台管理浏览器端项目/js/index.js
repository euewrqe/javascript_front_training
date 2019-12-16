/**
 * Created by nextgo on 2017/4/16.
 */

//菜单栏伸缩
function menu_show() {
    var menus_title=document.getElementsByClassName("nav-title");
    for(var i = 0;i<menus_title.length;i++){
        menus_title[i].onclick=function () {
            //删除选中标签的hidden类
            var this_menu_content=this.parentElement.lastElementChild;
            this_menu_content.classList.remove("hidden");
            //给所有其他标签添加hidden类
            var menu_titles=this.parentElement.parentElement.children;
            for(var j=0;j<menu_titles.length;j++){
                if(menu_titles[j] != this.parentElement){
                    menu_titles[j].lastElementChild.classList.add("hidden");
                }
            }
        }
    }
}
(function () {
    var head_btn=document.getElementsByClassName("js-head-btn")[0];
    head_btn.onclick=function () {

    }
})();

// 取消登录
// 获取取消按钮，绑定事件
function cancel_login() {
    var cancel_btns=document.getElementsByClassName("js-ubc")[0];

    cancel_btns.onclick=function () {
        var menu_tag=document.getElementById(cancel_btns.getAttribute("uh-menu"));
        menu_tag.classList.add("hidden");
        var user_tag=menu_tag.parentElement;
        for(var i = 0;i<user_tag.children.length;i++){
            if(user_tag.children[i]!=menu_tag){
                user_tag.children[i].classList.remove("hidden");
            }
        }

    };
}

//模态对话框
function model_show() {
    var show_handles=document.getElementsByClassName("js-showmodel");
    for(var i=0;i<show_handles.length;i++){
        show_handles[i].onclick=function () {
            var mw=document.getElementById("model-widget");
            var mw_fiilter=document.getElementById("model-filter");
            mw.classList.remove("hidden");
            mw_fiilter.classList.remove("hidden");
        }
    }
}

function model_hidden() {
    var hidden_handle=document.getElementsByClassName("js-md-close");
    for(var i=0;i<hidden_handle.length;i++){
        hidden_handle[i].onclick=function () {
            var mw=document.getElementById("model-widget");
            var mw_fiilter=document.getElementById("model-filter");
            mw.classList.add("hidden");
            mw_fiilter.classList.add("hidden");
        }
    }
}

//对话框移动
function move_model(dialog,dialog_title) {
    var mw=document.getElementById(dialog);
    var mw_head=document.getElementsByClassName(dialog_title)[0];

    var move_flag=false;
    var move_size={width:null, height:null};
    var mw_pos={left:null, bottom:null};
    var window_size={height:null,width:null};
    function change_pos(model,pos) {

        model.style.left=pos.left.toString()+"px";
        model.style.bottom=pos.bottom.toString()+"px";
    }

    mw_head.onmousedown=function (event) {
        console.log(event.clientX);
        console.log(event.clientY);
        //对象的位置
        mw_pos={left:parseInt(mw.style.left.replace(/(.*)px/,"$1")),
            bottom:parseInt(mw.style.bottom.replace(/(.*)px/,"$1"))
        };

        //窗口的宽高
        window_size={
            height:document.body.scrollHeight,
            width:document.body.scrollWidth
        };

        //对象到窗口的位置和鼠标到窗口的位置的差
        move_size.width=event.clientX-mw_pos.left;
        // mw_pos.bottom=mw_pos.bottom-event.clientY
        tmp_clientY=window_size.height-event.clientY;
        move_size.height=tmp_clientY-mw_pos.bottom;
        move_flag=true;
    };
    //必须按下才能移动
    document.onmousemove=function (event) {
        if(move_flag){
            /* 鼠标的位置-距离=对象的位置，x最小不能小于200,y最大不能超过window的高-48
         * 原点在左下角*/
            mw_pos.left=event.clientX-move_size.width;
            var tmp_clientY=window_size.height-event.clientY;
            mw_pos.bottom=tmp_clientY-move_size.height;
            if(mw_pos.left<200){
                mw_pos.left=200;
            }
            console.log(window_size.height-48);
            if(mw_pos.bottom>window_size.height-48){
                mw_pos.bottom=window_size.height-48-move_size.height;
            }

            change_pos(mw,mw_pos);
        }


    };
    //更改位置
    document.onmouseup=function () {
        move_flag=false;
    }
}

//选择
function check_change() {
    var all_check=document.getElementsByClassName("js-all-check")[0];
    var check_items=document.getElementsByClassName("js-check-item");

    all_check.children[0].onclick=function () {
        //判断
        var check_count=0;
        var check_flag=false;
        for(var i=0;i<check_items.length;i++){

            if(check_items[i].children[0].checked){
                check_count+=1;
            }
        }
        if(check_items.length==check_count){
            check_flag=true;
        }



        for(var i=0;i<check_items.length;i++){
            if(check_flag&& (!all_check.children[0].checked)){
                check_items[i].children[0].checked=false;
            }else if((!check_flag) && (all_check.children[0].checked)){
                check_items[i].children[0].checked=true;
            }


        }
    };

    for(var i = 0;i<check_items.length;i++){
        check_items[i].children[0].onclick=function () {
            if(!this.checked){
                if(all_check.children[0].checked){
                    all_check.children[0].checked=false;
                }
            }
        }
    }

    var rever_btn=document.getElementById("all-revers-btn");
    rever_btn.onclick=function () {
        for(var i = 0;i<check_items.length;i++){
            if(check_items[i].children[0].checked){
                check_items[i].children[0].checked=false;
            }else{
                check_items[i].children[0].checked=true;
            }
        }
    };
}

function add_aline() {
    var check_items=document.getElementsByClassName("js-check-item");
    var tbody=check_items[check_items.length-1].parentElement.parentElement;
    var add_btn=document.getElementById("add-line-btn");
    add_btn.onclick=function () {
        var new_child=document.createElement("tr");
        tbody.appendChild(new_child);

        new_child.innerHTML='<td class="js-check-item"><input type="checkbox" /></td>\
                            <td>'+Math.round(Math.random()*10)+'</td>\
                            <td>丛雨</td>\
                            <td>管理员</td>'
    };


}

function remove_aline() {
    var remove_btn=document.getElementById("remove-line-btn");

    remove_btn.onclick=function () {
        var check_items=document.getElementsByClassName("js-check-item");
        try{
            var trs=check_items[check_items.length-1].parentElement;
            var tbody=check_items[check_items.length-1].parentElement.parentElement;
            tbody.removeChild(trs);

        }catch (e){
            var msg_bar=document.getElementById("cancel-message");
            msg_bar.innerText=e;
            setTimeout(function () {
                msg_bar.innerText="";
            },1000);

        }
    }
}