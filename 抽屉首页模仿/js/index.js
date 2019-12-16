/**
 * Created by nextgo on 2017/4/9.
 */
function show_module(){
    var module_frame=document.getElementById("module-login-mask");
    var module_filter_frame=document.getElementById("module-filter");
    module_frame.classList.remove("hidden");
    module_filter_frame.classList.remove("hidden");
}
function hide_module(){
    var module_frame=document.getElementById("module-login-mask");
    var module_filter_frame=document.getElementById("module-filter");
    module_frame.classList.add("hidden");
    module_filter_frame.classList.add("hidden");
}

function change_login_demo(item){
    //更改登录方式
    var demo_id=item.getAttribute("demo");
    var demo_01=document.getElementById("box-mobile-login");
    var demo_02=document.getElementById("box-user-login");
    var demos=[demo_01,demo_02];
    if(demo_id==demos[0].getAttribute("id")){
        demos[0].classList.add("hidden");
        demos[1].classList.remove("hidden");
    }else{
        demos[0].classList.remove("hidden");
        demos[1].classList.add("hidden");
    }
}
