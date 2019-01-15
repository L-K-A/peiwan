/**
 * 主播详情js
 * 张万里
 * 2019-1-10
 */
//游戏tab

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
var gitTeacherInfo = function () {
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
            /*console.log(data);*/
            app.result = data.pperson;
        }
    });
};
gitTeacherInfo();
var gid=0;

var touxiang = new Vue({
    el: '#zhubotouxaing',
    data: {
        zbt: [],
        services: [],
        serviceInfo:[],
        contentList:[],
    },
    methods:{
        zhubofuwu:function($event,index,gid,pid){
           /* pinglun();*/
        }
    }
});
/*vue的导师头像 基本资料分布*/
var gettouxiang = function () {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        async:true,
        url: "/teacherPage/getInfo",
        data: {
            "pid": 1,
            "gid": 1
        },
        success: function (data) {
            /*console.log(data);*/
            touxiang.zbt = data.pperson;
        }
    });
};
gettouxiang();

/*请求服务类型遍历*/
var zhuservices = function () {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/teacherPage/selectZhuboService",
        data: {
            "zid": 1,
        },
        success: function (msgs) {
            /*console.log(msgs);*/
            touxiang.services=msgs.strin;
        }
    });
};
zhuservices();

/*获取订单 服务 自诉 等内容 右下角*/
var zhuboOrder =function(pid,gid){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/teacherPage/selectZhudp",
        data: {
            "zid": 1,
        },
        success: function (pingord) {
            console.log(1111+pingord);
            touxiang.serviceInfo=pingord;
        }
    });
};
zhuboOrder();

/*请求类型遍历*/
var pinglun = function (pid,gid,curr) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/teacherPage/findComment",
        async:true,
        data: {
            pageNum:curr || 1,
            "zid": 1,
            "gid":1,
        },
        success: function (pings) {
            console.log(pings);
            touxiang.contentList=pings.content.records;
            laypage({
                cont:'pagenav',
                pages:pings.content.pages,
                first:'首页',
                last:'尾页',
                curr:curr || 1,
                jump:function (obj,first) {
                    if (!first){
                        pinglun(pid,gid,obj.curr);
                    }
                }
            });
        }
    });
};
pinglun();
/*分享的  以及弹出层*/
var editEvent = function (id) {
    layer.open({
        type: 2,
        title: '分享该主播',
        fix: false,
        maxmin: true,
        shadeClose: true,
        area: ['300px', '300px'],
        content: '/hello1',
        moveType: 1,
        time: 5000,
        end: function () {
        }
    });
}

/*关注的实现*/
var getLike = function () {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/teacherPage/insertAttention",
        data: {
            "pid": 1,
            "zid": 5,
        },
        success: function (data) {
            /*console.log(data);*/
        }
    });
};
//游戏tab切换
function tab(tabDot,tabCont,cla){
    var tabDotItem=$(tabDot);
    var tabDotList=tabDotItem.children();
    var tabContItem=$(tabCont);
    var tabContList=tabContItem.children();

    tabDotList.eq(0).addClass(cla);
    tabContList.eq(0).show().siblings().hide();

    tabDotItem.on('click','div',function(){
      var index=$(this).index();
      console.log(index)
      tabContList.eq(index).show().siblings().hide();
      $(this).addClass(cla).siblings().removeClass(cla);
    })
}
tab('.zubo-cont .right-tab .rightTab-nav','.zubo-cont .right-tab .rightTab-cont-box','playActive')
//左侧礼物tab
tab('.zubo-cont .giftTab .tabDot','.zubo-cont .giftTab .tabCont','giftActive')

//图片tab
function picTab(){
  var tabDotItem=$('.zuboTab .tabDot');
  var tabDotList=tabDotItem.children();
  var tabContItem=$('.zuboTab .tabCont');

  tabDotItem.on('click','div',function(){
    var src=$(this).children('img').attr("src")
    tabContItem.children('img').attr('src',src)
  })
}
picTab();

function titleAnimate(){
  var contBoxitem=$('.zubo-title  .zubo-gift');
  var contBoxlist=contBoxitem.children();
  var time=setInterval(function(){
    // contBoxitem.marginTop="5px"
  contBoxitem.animate({
      // opacity:'0',
      marginTop:"-=30px"
    },1000)
  },1000)
}
