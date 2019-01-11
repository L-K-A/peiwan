/**
 * 主播详情js
 * 张万里
 * 2019-1-10
 */

/*获取URL中的参数 查询导师信息  获取到Url里面的参数*/
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

/*vue的导师头部*/
var app = new Vue({
    el: '#qweqwe',
    data: {
        result: [],
    }
});
var gitTeacherInfo = function (){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        /*async:true,*/
        url: "/teacherPage/getInfo",
        data: {
            "pid": 1,
            "gid": 1,
        },
        success: function (data) {
             console.log(data);
            app.result = data.pperson;
        }
    });
};
gitTeacherInfo();

/*vue的导师头像 基本资料遍历*/
var touxiang = new Vue({
    el: '#zhubotouxaing',
    data: {
        zbt: [],
    }
});
var gettouxiang = function (){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        /*async:true,*/
        url: "/teacherPage/getInfo",
        data: {
            "pid": 1,
            "gid": 1,
        },
        success: function (data) {
            console.log(data);
            touxiang.zbt = data.pperson;
        }
    });
};
gettouxiang();

/*分享的  以及弹出层*/
//编辑用户事件

var editEvent = function(id) {
    layer.open({
        type : 2,
        title : '分享该主播',
        fix : false,
        offet:['500px','200px'],
        maxmin : true,
        shadeClose : true,
        area : [ '150px', '300px' ],
        content : '/hello1',
        end : function() {
        }
    });
}