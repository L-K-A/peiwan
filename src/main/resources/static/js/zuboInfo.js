/**
 * 主播详情js
 * 张万里
 * 2019-1-10
 */
/*获取URL中的参数 查询导师信息*/
/*获取到Url里面的参数*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}
// 调用方法  传入参数名可获得
//alert(GetQueryString("name"));
//alert(GetQueryString("id"));
//避免无参数是出现异常
var myurl = GetQueryString("url");
/*if (myurl != null && myurl.toString().length > 1) {
    alert("请求参数为空")
}*/

/*vue的导师信息遍历*/
var app = new Vue({
    el: '#qweqwe',
    data: {
        result: [],
    }
})
var gitTeacherInfo = function loadCharm() {
    $.ajax({
        url: "/getInfo",
        type: "post",
        dataType: "json",
        data: {
            /* 正常情况"pid": GetQueryString("pid"),
            "gid":GetQueryString("gid")*/
            /*测试情况*/
            "pid": 1,
            "gid": 1,
        },
        success: function (msg) {
            console.log(msg);
            alert("zouyibo")
            app.result = msg.pperson;
        }
    })
}

gitTeacherInfo




