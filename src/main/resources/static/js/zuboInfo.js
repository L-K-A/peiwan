/**
 * 主播详情js
 * 张万里
 * 2019-1-10
 */
var zid = 0;
var gid = 0;
var pid;
var price = 0;
var teacherName = '';
var dtid = 0;
var gameTitle = '';
var foid = null;
var turl = null;
var balance = null;
/*(pid == null) ? pid=1 : pid=pid;*/

/*
* 设定时间
* */
function getTime(num) {
    var date = new Date();
    if (num == 1) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    } else if (num == 2) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var e = 5;
        var c = Number(d) + Number(e);
        return y + '-' + m + '-' + c;
    }

}

/*获取URL中的参数 查询导师信息  获取到Url里面的参数*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 调用方法
zid = GetQueryString("zid");
gid = GetQueryString("gid");
var myurl = GetQueryString("url");
if (myurl != null && myurl.toString().length > 1) {
    alert(GetQueryString("url"));
}

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
        async: false,
        url: "/getInfo",
        data: {
            "pid": zid,
        },
        success: function (data) {
            app.result = data;
        }
    });
};
gitTeacherInfo();
var gid = 0;

var touxiang = new Vue({
    el: '#zhubotouxaing',
    data: {
        zbt: [],
        services: [],
        serviceInfo: [],
        contentList: [],
        num: 0
    },
    methods: {
        zhubofuwu(index) {
            this.num = index
        },
        Recharge(teachergid, teacherprice, teacherGameName) {
            if (pid != null) {
                price = teacherprice;
                dtid = teachergid;
                gameTitle = teacherGameName;
                $("#imgPayEWM").html('');
                $('.border-qq').css('border', '0px');
                $('.border-qq').parent().show();
                $('.border-qq').attr("flag", '1');
                packageid = 0;
                $(".order_test_lol").html('<img src="/picture/xinyongTu/' + teachergid + '.png">');
                $(".service_name").html(teacherGameName);
                $("#shijian").html('');
                $('.form_datetime').val(startDate);
                get_play_list(changeDateFromat(startDate))
                $("#hour_").html(1);
                $('.about_box1').show();
                $('.pop_up_bigbox').show();

                /* $('.about_box1 .order_name_box .order_test_lol img').attr("src", gameIcon);*/
                /* $('.about_box1 .order_name_box .service_name').html(gameTitle);*/
                /*$('.about_box1 #currmoney').html('账户余额:' +  + '<a href="/toHome" target="_blank" title=""><span>去充值</span></a>');*/
                text_();

                function changeDateFromat(date) {
                    var dates = date.split('-')
                    var day = ""
                    var mouth = ""
                    var finalDate = ""
                    if (dates[2] < 10) {
                        day = dates[2][1]
                    } else {
                        day = dates[2]
                    }
                    if (dates[1] < 10) {
                        mouth = dates[1][1]
                    } else {
                        mouth = dates[1]
                    }
                    finalDate = dates[0] + "-" + mouth + "-" + day
                    return finalDate
                }
            } else {
                alert("登陆");
            }

        }
    }
});
/*vue的导师头像 基本资料分布*/
var gettouxiang = function () {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        async: true,
        url: "/getInfo",
        data: {
            "pid": zid,
        },
        success: function (data) {
            /*console.log(data);*/
            touxiang.zbt = data;
        }
    });
};
gettouxiang();

/*请求服务类型遍历*/
var zhuservices = function () {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/selectZhuboService",
        data: {
            "zid": zid,
        },
        success: function (msgs) {
            /*console.log(msgs);*/
            touxiang.services = msgs.strin;
        }
    });
};
zhuservices();

/*获取订单 服务 自述 评论 等内容 右下角*/
var zhuboOrder = function (pid, curr) {

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/selectZhudp",
        data: {
            "zid": zid,
            pageNum: curr || 1,
        },
        success: function (pingord) {
            touxiang.serviceInfo = pingord.zuiduodenei;
            console.log(pingord.zuiduodenei)
        }
    });
};
zhuboOrder();

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
};

/*查询是否已经关注*/
var selectAtt = function () {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/selectAttention",
        data: {
            "pid": pid,
            "zid": zid,
        },
        success: function (msg) {
            if (msg > 0) {
                $(".guanzhubian").html("已关注")
            } else {
                $(".guanzhubian").html("关注")
            }
        }
    });
};
selectAtt();
/*关注的实现*/

var getLike = function () {
    if (pid != null) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "/insertAttention",
            data: {
                "pid": pid,
                "zid": zid,
            },
            success: function (msg) {
                if (msg > 0) {
                    $(".guanzhubian").html("已关注")
                } else {
                    $(".guanzhubian").html("关注")
                }

            }
        });
    } else {
        alert("当前未登陆,去登陆!")
    }
};


//游戏tab切换
function tab(tabDot, tabCont, cla) {
    var tabDotItem = $(tabDot);
    var tabDotList = tabDotItem.children();
    var tabContItem = $(tabCont);
    var tabContList = tabContItem.children();

    tabDotList.eq(0).addClass(cla);
    tabContList.eq(0).show().siblings().hide();

    tabDotItem.on('click', 'div', function () {
        var index = $(this).index();
        tabContList.eq(index).show().siblings().hide();
        $(this).addClass(cla).siblings().removeClass(cla);
    })
}

//左侧礼物tab
tab('.zubo-cont .giftTab .tabDot', '.zubo-cont .giftTab .tabCont', 'giftActive')

//图片tab
function picTab() {
    var tabDotItem = $('.zuboTab .tabDot');
    var tabDotList = tabDotItem.children();
    var tabContItem = $('.zuboTab .tabCont');

    tabDotItem.on('click', 'div', function () {
        var src = $(this).children('img').attr("src")
        tabContItem.children('img').attr('src', src)
    })
}

picTab();

function titleAnimate() {
    var contBoxitem = $('.zubo-title  .zubo-gift');
    var contBoxlist = contBoxitem.children();
    var time = setInterval(function () {
        // contBoxitem.marginTop="5px"
        contBoxitem.animate({
            // opacity:'0',
            marginTop: "-=30px"
        }, 1000)
    }, 1000)
}

/*刘振亚*/
var isAlertBiaoBai = false;
//定义全局变量

$(".coupon_show_tab_content input").tag = 0;

//板块ID
//var dtid = 31540;
var paramJson = {
    "5346": {
        "gameIcon": "http:\/\/res.tuwan.com\/templet\/play\/teacher\/images\/lol.png",
        "gameTitle": "\u7ebf\u4e0aLOL",
        "sile": "1",
        "price": "6000",
        "timeStart": "00:00",
        "timeStart2": "00.00",
        "timeEnd": "24:00",
        "timestatus": 0,
        "timeEnds": "24.00",
        "typeflag": 1,
        "typeunit": "\u5c0f\u65f6"
    }
};
//主播ID
var teacherid = 1126422;
//主播名
//var teacherName = '张万里'; //导师名

//用户ID
var uid = pid;

var gameid = 0;
//服务名
//var gameTitle = '';
var gameIcon = '';
var tinfoid = 5346;
var vip = 0;
var disjson = {"5346": {"7": {"num": 0, "status": 0}, "8": {"num": 0, "status": 0}, "9": {"num": 23, "status": 1}}};
var currentPage = 1;
var tagmark = "";

var sile = 1;
//var price = 0;
var money = 0;
var startDate = getTime(1);
var endDate = getTime(2);
var NewDateStart = getTime(1);
var NewDateEnd = getTime(2);
var timestatus = '';
var starttime = '';
var starttime2 = '';
var datetimes = '';
var datetimes1 = '';
var getDate = 0;
var typeflag = 0;
var position = 0;
var alipay = '';
var wechat = '';
var packageid = 0;
var successUrl = location.href;
var qqFlag = 0;
var flag = false;
var giftType = 0;
var prices = '';
var indList = '';
var fromType = 1;
var worth = 0;
var isPay99 = false;


//余额支付
//钻石支付
//礼物回调处理

function get_play_ajax(todaytime) {
    $("#shijian").html('');
    if (timestatus == 1) {
        $.ajax({
            url: "https://y.tuwan.com/m/Playteach1/GetDates?format=jsonp&id=" + tinfoid,
            type: "get",
            dataType: "jsonp",
            success: function (obj) {
                if (todaytime == obj.dateStart) {
                    getDate = 1;
                    starttime3 = obj.timeStart.replace(/\:/g, '.') * 1;
                    datetimes3 = '24.00';
                } else if (todaytime == obj.dateEnd) {
                    getDate = 1;
                    starttime3 = '00.00';
                    datetimes3 = obj.timeEnd.replace(/\:/g, '.') * 1;
                } else if (todaytime == NewDateEnd) {
                    getDate = 1;
                    starttime3 = '00.00';
                    datetimes3 = obj.timeEnd.replace(/\:/g, '.') * 1;
                } else {
                    getDate = 0;
                }
                get_play_list(todaytime);
            }
        })
    } else {
        get_play_list(todaytime);
    }
}


function get_play_list(todaytime) {
    $.ajax({
        url: "https://y.tuwan.com/m/Playteach/getOrderRecordToday?format=jsonp&id=" + teacherid + "&today=" + todaytime,
        type: "get",
        dataType: "jsonp",
        success: function (obj) {
            //var myobj=eval(obj);
            var todayArr = new Array();
            $('.table_time table td').each(function () {
                $(this).removeClass();
                $(this).removeClass();
                $(this).unbind("click"); //移除click
            })
            var oDate = new Date();
            var year = oDate.getFullYear();
            var month = oDate.getMonth() + 1;
            var day = oDate.getDate();
            var getHours = oDate.getHours();
            var getMinutes = oDate.getMinutes();
            var nianyueri = year + '-' + month + '-' + day;
            if (getMinutes < 10) {
                getMinutes = '0' + getMinutes;
            }
            var shifen = getHours + '.' + getMinutes;
            var shifen = (shifen.split(".")[0]) < 10 ? '0' + shifen + '' : shifen;
            if (obj !== null) {
                myobj = obj.list;
                if (obj.nextlist !== null || obj.nextlist !== '') {
                    if (obj.nextlist['dateEnd'] > todaytime) {
                        indList = obj.nextlist['startTime'].replace(/\:/g, '.') * 1;
                    }
                }
            }

            if (myobj == false || myobj == null) {
                $('.table_time table td').each(function () {
                    var timenum = $(this).html().replace(/\:/g, '.') * 1;

                    if ($('.form_datetime').val() == NewDateStart) {
                        if (starttime2 > datetimes1) { //如果开始时间大于结束时间
                            if (timenum >= datetimes1 && timenum < starttime2) {
                                $(this).addClass("no_td_add");
                            }
                        } else {
                            if (timenum < starttime2) {
                                $(this).addClass("no_td_add");
                            }
                        }
                    }
                    if ($('.form_datetime').val() == NewDateEnd) {
                        if (timenum >= datetimes1) {
                            $(this).addClass("no_td_add");
                        }
                        if (timenum == '23.3') $(this).addClass("nos_td_add");
                    }

                    if (timestatus == 1 && getDate == 0) {
                        if (timenum < starttime2 && timenum >= datetimes1) {
                            $(this).addClass("no_td_add");
                        }
                        if (endday < statrday && todaytime == myobj[j].dateEnd) {
                            statrday = '00.00';
                        } else if (endday < statrday) {
                            endday = '24.00';
                        }
                    } else if (timestatus == 1 && getDate == 1) {
                        if (timenum < starttime3 || timenum >= datetimes3) {
                            $(this).addClass("no_td_add");
                        }
                    } else {
                        if (timenum < starttime2 || timenum >= datetimes1) {
                            $(this).addClass("no_td_add");
                        }
                    }
                    if (starttime == '00:00' && datetimes == '24:00') {
                        if (endday < statrday && todaytime == myobj[j].dateEnd) {
                            statrday = '00.00';
                        } else if (endday < statrday) {
                            endday = '24.00';
                        }
                    }
                    if (timenum <= shifen && nianyueri == todaytime) {
                        $(this).addClass("no_td_add");
                    }
                })
                for (var i = 0; i < 49; i++) {
                    if (i > 0) {
                        var OverNode = $('.table_time table td').eq(i - 1).attr("class");
                        var NowNode = $('.table_time table td').eq(i).attr("class");
                        if (OverNode != NowNode && NowNode == 'no_td_add') {
                            $('.table_time table td').eq(i - 1).addClass("nos_td_add");
                        }
                    }
                }
                if ($('.form_datetime').val() > NewDateEnd) {
                    $('.table_time table td').addClass('no_td_add');
                }
                if (starttime == '00:00' && datetimes == '24:00' && $('.form_datetime').val() !== NewDateEnd) {
                    $('.table_time table td').eq(47).attr("class", '');
                }
                //下一天0点被预约
                if (indList === 0) {
                    $('.table_time table td').eq(47).addClass("nos_td_add");
                }
                $('.table_time table td').each(function () {
                    if ($(this).attr("class") !== 'no_td_add' && $(this).attr("class") !== 'nos_td_add' && $(this).attr("class") !== 'no_td_add nos_td_add') {
                        $(this).click(function () {
                            setDateData($(this));
                        });
                    }
                })
            } else {
                for (var j = 0; j < myobj.length; j++) {
                    var statrday = myobj[j].startTime.replace(/\:/g, '.') * 1;
                    var endday = myobj[j].endTime.replace(/\:/g, '.') * 1;
                    if (myobj[j].CommentTime !== '' && myobj[j].CommentTime !== null && myobj[j].CommentTime !== undefined) myobj[j].dateEnd = getLocalTime(myobj[j].CommentTime, '');
                    if (myobj[j].endTime == '00:00' && todaytime >= myobj[j].dateEnd) {
                        myobj[j].dateEnd = getLocalTime(myobj[j].CommentTime - 806400, '');
                    }
                    if (endday == 0) {
                        endday = '24.00';
                    }

                    $('.table_time table td').each(function () {
                        var timenum = $(this).html().replace(/\:/g, '.') * 1;

                        if ($('.form_datetime').val() == NewDateStart) {
                            if (starttime2 > datetimes1) { //如果开始时间大于结束时间
                                if (timenum >= datetimes1 && timenum < starttime2) {
                                    $(this).addClass("no_td_add");
                                }
                            } else {
                                if (timenum < starttime2) {
                                    $(this).addClass("no_td_add");
                                }
                            }
                        }
                        if ($('.form_datetime').val() == NewDateEnd) {
                            if (timenum >= datetimes1) {
                                $(this).addClass("no_td_add");
                            }
                            if (timenum == '23.3') $(this).addClass("nos_td_add");
                        }
                        if (timestatus == 1 && getDate == 0) {
                            if (timenum < starttime2 && timenum >= datetimes1) {
                                $(this).addClass("no_td_add");
                            }
                            if (endday < statrday && todaytime == myobj[j].dateEnd) {
                                statrday = '00.00';
                            } else if (endday < statrday) {
                                endday = '24.00';
                            }
                        } else if (timestatus == 1 && getDate == 1) {
                            if (timenum < starttime3 || timenum >= datetimes3) {
                                $(this).addClass("no_td_add");
                            }
                            if (endday < statrday) {
                                if (timenum >= statrday && timenum < '24:00') {
                                    $(this).addClass("no_td_add");
                                }
                            }
                        } else {
                            if (timenum < starttime2 || timenum >= datetimes1) {
                                $(this).addClass("no_td_add");
                            }
                        }
                        if (starttime == '00:00' && datetimes == '24:00') {
                            if (endday < statrday && todaytime == myobj[j].dateEnd) {
                                statrday = '00.00';
                            } else if (endday < statrday) {
                                endday = '24.00';
                            }
                        }
                        if (timenum >= statrday && timenum < endday && todaytime <= myobj[j].dateEnd) {
                            $(this).addClass("no_td_add");
                        }
                        if (timenum <= shifen && nianyueri == todaytime) {
                            $(this).addClass("no_td_add");
                        }
                    })
                }

                //下一天0点被预约
                if (indList === 0) {
                    $('.table_time table td').eq(47).addClass("nos_td_add");
                }

                if (starttime == '00:00' && datetimes == '24:00') {
                    var m = 48;
                } else {
                    var m = 49;
                }
                for (var i = 0; i < m; i++) {
                    if (i > 0) {
                        var OverNode = $('.table_time table td').eq(i - 1).attr("class");
                        var NowNode = $('.table_time table td').eq(i).attr("class");
                        if (OverNode != NowNode && NowNode == 'no_td_add') {
                            $('.table_time table td').eq(i - 1).addClass("nos_td_add");
                        }
                    }
                }
                $('.table_time table td').each(function () {
                    if ($(this).attr("class") !== 'no_td_add' && $(this).attr("class") !== 'nos_td_add' && $(this).attr("class") !== 'no_td_add nos_td_add') {
                        $(this).click(function () {
                            setDateData($(this));
                        });
                    }
                })
            }
            $('.table_time table td').each(function () {
                if ($(this).hasClass("no_td_add")) {

                } else {
                    console.log($(this).html())
                    setDateData($(this));
                    return false
                }
            })
            // console.log($('.table_time table td.no_td_add').length)
            // console.log($('.table_time table td').eq($('.table_time table td.no_td_add').length))
            // setDateData($('.table_time table td').eq($('.table_time table td.no_td_add').length))
        }
    })
}

function ClickHour(index) {
    var max = '';
    var positionStatus = 0;
    for (var i = index; i < 48; i++) {
        var OverNode = $('.table_time table td').eq(i).attr("class");
        if (OverNode == 'nos_td_add') {
            positionStatus = 1;
            break;
        } else {
            positionStatus = 0;
        }
    }
    if (timestatus == 1) {
        var nowVal = $('.table_time table td').eq(index).html();
        var nowVal = nowVal.replace(/\:/g, '.') * 1;
        if (nowVal >= '00.00' && nowVal < datetimes1) {
            for (var i = index; i < 48; i++) {
                var OverNode = $('.table_time table td').eq(i).attr("class");
                if (OverNode == 'nos_td_add') {
                    position = Math.floor((1 + (i - index) * 1) / 2);
                    break;
                }
            }
        } else if (nowVal >= starttime2 && nowVal < '24.00') {
            if (positionStatus == 1) {
                for (var i = index; i < 48; i++) {
                    var OverNode = $('.table_time table td').eq(i).attr("class");
                    if (OverNode == 'nos_td_add') {
                        position = Math.floor((1 + (i - index) * 1) / 2);
                        break;
                    }
                }
            } else {
                var a = 48 - parseInt(index);
                if (indList) {
                    indList = '' + indList;
                    if (indList.indexOf('3') > 0) {
                        max = Math.floor((indList * 2) + 30 / 30);
                    } else {
                        max = Math.floor((indList * 2));
                    }
                } else {
                    max = parseInt(datetimes1) * 2;
                }
                position = Math.floor((a + max) / 2);
            }
        }
    } else if (starttime == '00:00' && datetimes == '24:00' && $('.form_datetime').val() !== NewDateEnd) {
        if (positionStatus == 1) {
            for (var i = index; i < 48; i++) {
                var OverNode = $('.table_time table td').eq(i).attr("class");
                if (OverNode == 'nos_td_add') {
                    position = Math.floor((1 + (i - index) * 1) / 2);
                    break;
                }
            }
        } else {
            var a = 48 - parseInt(index);
            if (indList) {
                indList = '' + indList;
                if (indList.indexOf('3') > 0) {
                    max = Math.floor((indList * 2) + 30 / 30);
                } else {
                    max = Math.floor((indList * 2));
                }
            } else {
                max = parseInt(datetimes1) * 2;
            }
            position = Math.floor((a + max) / 2);
        }
        if (position > 23) position = 23;
    } else {
        for (var i = index; i < 49; i++) {
            var OverNode = $('.table_time table td').eq(i).attr("class");
            if (OverNode == 'nos_td_add') {
                position = Math.floor((1 + (i - index) * 1) / 2);
                break;
            }
        }
    }
};

//减法
function Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

var zongjia = 0;

//价格显示
function text_() {
    var hour = parseInt($("#hour_").html());
    var html = '';
    // console.log(disjson[tinfoid])

    zongjia = accMul(price, hour);

    html += '<div class="order_cost" style="clear:both;"><img src="picture/order_cost.png"><span>总价</span>：' + zongjia + '元（单价：' + parseInt(price) + '*' + hour + '）</div>';
    html += '<div class="order_count">实付：<span id="listen_price">' + zongjia + '元</span></div>';

    $('.about_box1 .order_grade_box').html(html);


};


function setParam() {
    $(".form_datetime").val('');
    $("#shijian").html('');
    $("#hour_").html(1);

    text_();

    //gameIcon = paramJson[tinfoid].gameIcon;
    // gameTitle = paramJson[tinfoid].gameTitle;
    sile = paramJson[tinfoid].sile;
    //price = paramJson[tinfoid].price;
    timestatus = paramJson[tinfoid].timestatus;
    starttime = paramJson[tinfoid].timeStart;
    starttime2 = paramJson[tinfoid].timeStart2;
    datetimes = paramJson[tinfoid].timeEnd;
    datetimes1 = paramJson[tinfoid].timeEnds;
    typeflag = paramJson[tinfoid].typeflag;
}

function setDateData(that) {
    $('#index').val($('.table_time table td').index(that));
    ClickHour($('.table_time table td').index(that));
    var timenow = that.html().split(":");
    var timejs = (parseInt(timenow[0]) + 1) + ':' + timenow[1];
    if (timejs == '24:30') {
        timejs = '0:30';
    }
    $('#shijian1').val(that.html());
    $('#shijian2').val(that.html() + '-' + timejs);
    if (typeflag == 1) $('#shijian').html(that.html() + '-' + timejs);
    else $('#shijian').html(that.html() + '开始');
    $('#hour_').html(1);
    $('.bootstrap-touchspin-up').attr('disabled', false);
    that.parents().find(".table_time td").removeClass("td_add")
    that.addClass("td_add").siblings().removeClass("td_add")
    $('.table_time').hide();
    text_();
}

function setHours() {
    //获得文本框对象
    var t = $("#hour_");
    //初始化数量为1,并失效减
    if (parseInt(t.html()) == 1) {
        $('.bootstrap-touchspin-down').attr('disabled', true);
    }
    //数量增加操作
    var maxVal = 24;
    $(document).on('click', '.bootstrap-touchspin-up', function () {
        if ($('.form_datetime').val() == '' || $('#shijian').html() == '') {
            return false;
        }
        var timeout = $('#shijian').html();
        var tableArr = [];
        $('.table_time td').each(function () {
            if ($(this).html() > timeout && $(this).attr('class') !== 'no_td_add') {
                tableArr.push($(this).html());
            }
        })

        var maxVal = position;
        // if(timestatus == 0){
        if (maxVal <= 1) {
            $('.bootstrap-touchspin-up').attr('disabled', true);
            return false;
        }
        // }

        maxVal = maxVal == 0 ? 24 : maxVal;
        if (parseInt(t.html()) >= maxVal) {
            $('.bootstrap-touchspin-up').attr('disabled', true);
            return;
        }

        t.html(parseInt(t.html()) + 1)
        if (parseInt(t.html()) != 3) {
            $('.bootstrap-touchspin-down').attr('disabled', false);
        }

        var nowstime = $('#shijian').html().split("-");
        var nowsjes = nowstime[0].split(':');
        var endtimesmax = parseInt(nowsjes) + parseInt(t.html());
        if (endtimesmax >= 24) {
            endtimesmax = endtimesmax - 24;
        }
        if (typeflag == 1) $('#shijian').html(nowstime[0] + '-' + endtimesmax + ':' + nowsjes[1])
        else $('#shijian').html(nowstime[0])
        text_();
    })
    //数量减少操作
    $(document).on('click', '.bootstrap-touchspin-down', function () {
        if (parseInt(t.html()) == 1) {
            $('.bootstrap-touchspin-down').attr('disabled', true);
            return false;
        }
        t.html(parseInt(t.html()) - 1);
        if (parseInt(t.html()) == 1) {
            $('.bootstrap-touchspin-down').attr('disabled', true);
        }
        if (parseInt(t.html()) != maxVal) {
            $('.bootstrap-touchspin-up').attr('disabled', false);
        }
        if (typeflag == 1) var nowstime = $('#shijian').html().split("-");
        else var nowstime = $('#shijian2').val().split("-");

        var nowsjes = nowstime[1].split(':');
        var endtimesmax = parseInt(nowsjes) - 1;
        if (endtimesmax < 0) {
            endtimesmax = 23;
        }
        if (typeflag == 1) $('#shijian').html(nowstime[0] + '-' + endtimesmax + ':' + nowsjes[1])
        else $('#shijian').html(nowstime[0] + '开始')
        text_();
    })
}

function current(flag) {
    var d = new Date(), str = '';
    if (flag == 1) {
        str += d.getFullYear() + '-'; //获取当前年份
        str += d.getMonth() + 1 + '-'; //获取当前月份（0——11）
        str += d.getDate();
    } else {
        str += d.getFullYear() + '年'; //获取当前年份
        str += d.getMonth() + 1 + '月'; //获取当前月份（0——11）
        str += d.getDate() + '日 ';
        str += d.getHours() + ':';
        if (d.getMinutes() < 10) str += '0' + d.getMinutes();
        else str += d.getMinutes();

        // str +=d.getSeconds();
    }
    return str;
}

var setIntervals = '';

function timer(intDiff) {
    intDiff = parseInt(intDiff);
    clearInterval(setIntervals);
    setIntervals = window.setInterval(function () {

        var day = 0,

            hour = 0,

            minute = 0,

            second = 0;//时间默认值

        if (intDiff > 0) {

            day = Math.floor(intDiff / (60 * 60 * 24));

            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);

            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);

            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

        }

        if (minute <= 9) minute = '0' + minute;

        if (second <= 9) second = '0' + second;

        $('#minute_show').html(minute + '分');

        $('#second_show').html(second + '秒');
        if (minute == 0 & second == 0) {
            $.ajax({
                url: '/orderUpdate',
                dataType: 'json',
                data: {
                    flate: 3,
                    oid: foid,
                },
            })
            initDisplay();
            /*clearInterval(listenWXInterval)
                $(".pop_up_box").hide();
                $(".pop_up_bg").html('');
                $("#qrCode1").html('');*/
            clearInterval(setIntervals);
        }

        intDiff--;

    }, 1000);

}

function payComfirm() {
    $('.paytitle').html('支付提示');
    $('.paycontent').html('请您在新打开的第三方支付页面上完成支付');

    var html = '<div class="fl pay_for_fail">支付失败</div>';
    var tempStr = successUrl + '';
    if (tempStr.indexOf("https:") >= 0) {
        html += '<a href="' + successUrl + '" target="_blank"><div class="fl pay_for_success">支付完成</div></a>';
    } else {
        html += '<div class="fl pay_for_success">支付完成</div>';
    }

    html += '<div class="clearfix"></div>';
    $('.paysuccess').html(html);

    $('.pay_for_success').click(function () {
        initDisplay();
        if (successUrl == 0) {

        } else if (successUrl == 1) {

        } else if (successUrl == 2) {
            giftCallback();
        } else if (successUrl == 3) {
            loadTeacherWx();
        } else {
            //location.href = successUrl;
        }

    });
    $('.pay_for_fail').click(function () {
        initDisplay();
    });

}

function AddRecord(IdName) {
    var id = tinfoid;
    var yesmoney = 0;

    if (IdName == 'tuwanpay') {
        oFlate = 0;
    } else {
        oFlate = 3;
    }
    if (packageid <= 0) {//表示没有走套餐大礼包
        if (money == 0) {
            $('.money1').css({"margin-top": "2px"});
        }
        var DateTime = $('.form_datetime').val();
        if (DateTime == '') {
            $('.form_datetime').css('border', '1px solid red')
            return false;
        }
        $('.form_datetime').css('border', '1px solid #ccc')
        if ($('.border-qq').attr("flag") == 1) {
            var borderQq = $('.border-qq1').val();
            if (borderQq == '') {
                $('.border-qq1').css('border', '1px solid red')
                return false;
            }
            var qqyanzheng = '^\d{6,10}$';
            if (!borderQq.match('^[0-9]{6,10}$')) {
                $('.border-qq1').css('border', '1px solid red')
                alert('QQ格式不正确！');
                return false;
            }
            $('.border-qq1').css('border', '1px solid #ccc')
            turl = borderQq;
        } else {
            turl = '&flag=0';
        }
        var shijian = $.trim($('#shijian').html());
        if (shijian == '') {
            $('#shijian').css('border', '1px solid red')
            return false;
        }
        $('#shijian').css('border', '1px solid #ccc')
    } else {
        if ($('.border-qq').attr("flag") == 1) {
            var borderQq = $('.border-qq2').val();
            if (borderQq == '') {
                $('.border-qq2').css('border', '1px solid red')
                return false;
            }
            var qqyanzheng = '^\d{6,10}$';
            if (!borderQq.match('^[0-9]{6,10}$')) {
                $('.border-qq2').css('border', '1px solid red')
                alert('QQ格式不正确！');
                return false;
            }
            $('.border-qq2').css('border', '1px solid #ccc')
            turl = '&qq=' + borderQq + '&flag=1';
        } else {
            turl = '&flag=0';
        }
        DateTime = current(1);
    }

    var HoursTime = $('#hour_').html();
    var content = $('.order_textarea').val();
    var shijian2 = $('#shijian2').val();
    var shijian = $('#shijian1').val();
    //console.log("https://api.tuwan.com/playteach/?type=play&data=addrecord&format=jsonp&id=" + id + "&ucid=" + ucid + "&DateTime=" + DateTime + "&shijian=" + shijian + "&HoursTime=" + HoursTime + "&content=" + content + "&money=" + yesmoney + turl + '&packageid=' + packageid)

    $.ajax({
        url: "/oisert",
        type: "POST",
        dataType: "json",
        data: {
            personName: teacherName,
            pid: pid,
            oService: gameTitle,
            oXiadanshijian: HoursTime,
            oMoney: zongjia,
            oDatetime: DateTime,
            oFlate: oFlate,
            oStarttime: shijian,
            oContent: content,
            gid: dtid,
            aid: zid,
            oQq: turl
        },
        success: function (obj) {
            // if(obj.code=1){
            //     location.href = "https://y.tuwan.com/home/ocenter/"
            // }
            // alert(111);
            foid = obj.foid;

            if (obj.code == 1 && obj.status == 1) {
                var arrtime = DateTime.split("-");
                var endtimeas = parseInt((shijian.split(":")[0])) + parseInt(HoursTime);
                if (endtimeas >= 24) {
                    if (shijian.indexOf("30") > 0) {
                        endstatus = ':30';
                    } else {
                        endstatus = ':00';
                    }
                    endtimeas = endtimeas1 = parseInt(endtimeas) - 24;
                    endtimeas = Date.parse(new Date(DateTime));
                    endtimeas = '次日';
                    endtimeas = endtimeas + ' ' + endtimeas1;
                } else {
                    endtimeas = endtimeas;
                    if (shijian.indexOf("30") > 0) {
                        endstatus = ':30';
                    } else {
                        endstatus = ':00';
                    }
                }

                $('.paytitle').html('购买提示');
                if (packageid == 1001) {
                    $('.paycontent').html('<span style="font-size:  18px;font-weight:  bold; display: inline-block; padding-bottom: 10px; color: #ff593e;">购买成功</span><br />您已购买' + gameTitle + '---dudu约玩<br />（约玩时间：' + arrtime[0] + '年' + arrtime[1] + '月' + arrtime[2] + '日  ' + shijian + '开始）');
                } else {
                    $('.paycontent').html('<span style="font-size:  18px;font-weight:  bold; display: inline-block; padding-bottom: 10px; color: #ff593e;">购买成功</span><br />您已购买' + gameTitle + '---dudu约玩<br />（约玩时间：' + arrtime[0] + '年' + arrtime[1] + '月' + arrtime[2] + '日  ' + shijian + '-' + endtimeas + endstatus + '）');
                }
                $('.paysuccess').html('<a href="/indexw" target="_blank"><span class="btn-cell btn-red">进入订单中心</span></a>');

                $('#orderPayUrl').attr("href", alipay);
                $('.table_time table td').each(function () {
                    $(this).removeClass();
                    $(this).removeClass();
                    $(this).unbind("click"); //移除click
                })
                qqFlag = 0;

                $(".pop_up_bigbox").show();
                $(".pay_fail").show();
                $(".about_box1").hide();
                $(".about_box2").hide();
            } else if (obj.code == 0) {
                var trade_no = zongjia;

                //显示二维码
                showPayEWM(trade_no);
                $(".about_box1").hide();
                $(".about_box2").hide();
                $(".alipay_time").html(price + "元 *" + HoursTime + "小时");
                $(".order_payfor").show();
                timer(599);
                $('#minute_show').html('09分');
                $('#second_show').html('59秒');

            } else if (obj.code == -1002) {
                alert('所选时间已被预约');
            } else if (obj.code == -500) {
                alert('超出导师服务时间');
            } else if (obj.code == -6) {
                alert('对不起，您不能给自己下单');
            } else if (obj.code == -300) {
                alert('请选择正确的时间');
            } else if (obj.code == 1 && obj.status == 0) {
                $('.paytitle').html('购买提示');
                $('.paycontent').html('您的余额不足，请先充值');
                $('.paysuccess').html('<a href="/toHome" target="_blank"><span class="btn-cell btn-red" >进入充值页面</span></a>');
                $('.table_time table td').each(function () {
                    $(this).removeClass();
                    $(this).removeClass();
                    $(this).unbind("click"); //移除click
                })
                $(".pop_up_bigbox").show();
                $(".pay_fail").show();
                $(".about_box1").hide();
                $(".about_box2").hide();
            } else if (obj.code == -1009) {
                alert('数据有误');
            } else if (obj.code == -2001) {
                alert('您未完成订单次数已超过5次，今日无法再次下单。');
            } else if (obj.code == -1) {
                alert('下单失败');
            } else if (obj.code == -10009) {
                alert('请先登陆');
                $('#index_pup_box').show();
            } else if (obj.code == -20006) {
                alert('导师已经离线');
            }
        }
    })
}

//生成二维码
function showPayEWM(ordercode) {
    $.ajax({
        url: '/getQRCodeImg',
        dataType: 'json',
        data: {
            expoName: "dudu约玩",
            money: "0.01",
        },
        success: function (msg) {

            if (msg.qrCodeStr != null) {
                $("#imgPayEWM").qrcode({
                    render: "table", //table方式
                    width: 240, //宽度
                    height: 240, //高度
                    text: msg.qrCodeStr //任意内容*/
                });
            } else {
                alert("请重新点击支付按钮");
            }
            listenPay(msg.tradeNo);


        }
    })
}

//监听支付结果
var listenWXInterval = 0;

function listenPay(orderid) {
    //监听支付结果
    listenWXInterval = setInterval(function () {
        $.ajax({
            url: '/queryTradePayStatus',
            dataType: 'json',
            data: {tradeNo: orderid},
            success: function (res) {
                if (res == 1) {
                    $.ajax({
                        url: '/orderUpdate',
                        dataType: 'json',
                        data: {
                            flate: 1,
                            oid: foid,
                        },
                        success: function (data) {
                            if (data == 1) {
                                $.ajax({
                                    url: '/ZorderInsert',
                                    dataType: 'json',
                                    data: {
                                        oid: foid,
                                        oQq: turl,
                                    },
                                    success: function (data) {
                                        if (data == 1) {
                                            alert("支付成功");
                                            initDisplay();
                                            $("#qrCode1").html('');
                                            clearInterval(listenWXInterval);
                                            location.href = "/indexw";
                                        }

                                    }
                                })
                            }
                        }
                    })
                }
                /*if(data&&data.error ==0){
                    var state = data.state;
                    if(state == 2){
                        clearInterval(listenWXInterval);
                        location.href="https://y.tuwan.com/home/ocenter/"
                    }
                }
                else{


                }*/
            }
        })
    }, 2000)
}


function initDisplay() {
    $(".pop_up_box").hide();
    $(".pop_up_bigbox").hide();
    $(".pop_for_box").hide();
    $(".no_money_box").hide();
    $(".pay_select_box").hide();
    $(".payment_box").hide();
    $(".express_popup_box").hide();
    $(".express_popup_box").hide();
    $(".order_payfor").hide();
    $(".pay_fail").hide();
    $(".about_box").hide();
}

function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    var argtotal = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    argtotal = '' + argtotal;
    if (argtotal.indexOf('.') > 0) {
        argtotal = argtotal.substring(0, argtotal.indexOf(".") + 3);
    }
    return argtotal;
}

//时间格式
function getLocalTime(nS, getstatus) {
    if (getstatus == '') {
        return formatDateTime(new Date(parseInt(nS) * 1000), getstatus);
    } else {
        return formatDateTime(new Date(parseInt(nS)), 1);
    }
}

var formatDateTime = function (date, getflag) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    if (getflag == '') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    } else {
        return y + '-' + m + '-' + d;
    }
};

//获取导师微信

//检查附加属性


function cancelConfession() {
    $.ajax({
        url: "https://y.tuwan.com/m/Teacher/cancelConfession/teacherid/" + teacherid + "?id=" + giftuserid,
        type: "get",
        dataType: "jsonp",
        success: function (obj) {
            if (obj.error == -1) {

            } else if (obj.error == 0) {
                $(".pop_up_box").hide();
                $(".express_popup_box1").hide();
            }
        }
    });
}


function cancelNaming() {
    $.ajax({
        url: "https://y.tuwan.com/m/Teacher/cancelNaming/teacherid/" + teacherid + "?id=" + giftuserid2,
        type: "get",
        dataType: "jsonp",
        success: function (obj) {
            if (obj.error == -1) {

            } else if (obj.error == 0) {
                $(".pop_up_box").hide();
                $(".express_popup_box2").hide();
            }
        }
    });
}


var attention = 0;

function checkAttention() {
    $.ajax({
        url: "https://y.tuwan.com/m/Attention/check?teacherid=" + teacherid,
        type: "get",
        dataType: "jsonp",
        success: function (obj) {
            if (obj.error == 0) {
                $(".top_follow_ed").show();
                $(".top_follow").hide();
                $(".top_follow_no").hide();
            } else {
                $(".top_follow").show();
                $(".top_follow_ed").hide();
                $(".top_follow_no").hide();
            }
        }
    });
}

function setAttention() {
    $.ajax({
        url: "https://y.tuwan.com/m/Attention/add?teacherid=" + teacherid,
        type: "get",
        dataType: "jsonp",
        success: function (obj) {
            if (obj.error == -1) {

            } else if (obj.error == 0) {
                $(".top_follow_ed").show();
                $(".top_follow").hide();
                $(".top_follow_no").hide();
                aCancel = 0;
            }
        }
    });
}

var aCancel = 0;

function cancelAttention() {
    $.ajax({
        url: "https://y.tuwan.com/m/Attention/cencel?teacherid=" + teacherid,
        type: "get",
        dataType: "jsonp",
        success: function (obj) {
            if (obj.error == -1) {

            } else if (obj.error == 0) {
                aCancel = 1;
                $(".top_follow_ed").hide();
                $(".top_follow").show();
                $(".top_follow_no").hide();
            }
        }
    });
}

$(function () {


    $(".close_btn").on("click", function () {
        initDisplay();
        clearInterval(listenWXInterval)
    })
    // 支付选择方式
    $(".alipay_box").on("click", function () {
        var type = $(this).attr("type");
        if (type == 1) {
            $("#orderPayUrl").attr('href', alipay);
        } else {
            $("#orderPayUrl").attr('href', wechat);
        }

        $(".alipay_hover").hide();
        $(this).find(".alipay_hover").show();
        $(".alipay").show();
        $(this).find(".alipay").hide();
    })
    $(".content_input_time").on("click", function () {
        $(".table_time").show();
    });

    //加载问答


    //点赠送直接余额支付


    //赠送点击


    //9.9体验下单

    $(".form_datetime").datetimepicker({
        language: 'zh-CN',
        startView: 2,
        minView: 2,
        autoclose: true,
        startDate: startDate,
        format: "yyyy-mm-dd"
    });
    // $('#datetimepicker').datetimepicker('setStartDate', startDate);
    $('#datetimepicker').val(startDate);

    $("#shijian").on('click', function (event) {
        if ($('.form_datetime').val() != '') {
            $('.table_time').show();
            $('.table_time table td').each(function () {
                if ($(this).attr("class") !== 'no_td_add' && $(this).attr("class") !== 'nos_td_add') {
                    $(this).click(function () {
                        setDateData($(this));
                    });
                }
            })
        } else {
            $('.table_time').hide();
            return false;
        }
    })

    //现金支付
    $('.sure_leftbtn_count').on('click', function (event) {
        AddRecord('order-up-btn');
    })
    //余额支付
    $('.sure_rightbtn_count').on('click', function (event) {
        AddRecord('tuwanpay');
    })

    $('.sure_pay').click(function () {
        $(".order_payfor").hide();
        $(".pay_fail").show();
    });

    // 购买弹窗

    $('.see_more_btn').click(function () {
        var that = $(this);
        var page = that.attr('page') * 1;
        // currentPage++;
        totalPage = that.attr('totalpage') * 1;
        that.attr('disabled', true);
        if (page > totalPage) {
            return;
        }
        loadTagComment(page, tagmark, function (html, count) {
            that.parent().parent().find('.divCommentList').append(html);
            that.attr('disabled', false);
            that.attr('page', page + 1);
            // that.attr('totalpage', count);
            if (totalPage <= page) {
                that.hide();
            } else {
                that.show();
            }
        })
    })

    //微信查看购买

    $(".recharge_left_btn").click(function () {
        initDisplay();
    })
    $(".express_popup_box1 .no_express").click(function () {
        cancelConfession();
    })
    $(".express_popup_box1 .sure_express").click(function () {
        setConfession();
    })
    $(".express_popup_box2 .no_express").click(function () {
        cancelNaming();
    })
    $(".express_popup_box2 .sure_express").click(function () {
        setNaming();
    })
    $(".top_follow").click(function () {
        if (uid == 0) { //未登录
            $('#index_pup_box').show();
            return;
        }
        setAttention();
    })
    $(".top_follow_ed").on("mouseover", function () {
        if (aCancel) {
            return;
        }
        $(".top_follow").hide();
        $(".top_follow_ed").hide();
        $(".top_follow_no").show();
    })
    $(".top_follow_no").click(function () {
        cancelAttention();
    })
    $(".top_follow_no").on("mouseout", function () {
        if (aCancel) {
            return;
        }
        $(".top_follow").hide();
        $(".top_follow_ed").show();
        $(".top_follow_no").hide();
    })

    //分享

    // 左边隐藏礼物增加切换

    $(".content_left_magnifier_img").click(function () {
        // console.log($(this).parent().parent())
        $(this).parent().parent().find(".fancybox").trigger("click");//模拟执行id=a的事件
    });

    $(".pay_select_box .recharge_new_left_btn").click(function () {
        payMoney($(this).attr('url'), fromType);
    });
    $(".pay_select_box .recharge_new_right_btn").click(function () {
        payDiamond($(this).attr('url'), fromType);
    });

    //loadQuestionAnswer();
    setParam();
    setHours();
    loadCharm();
    loadGiftScroll();
    setHaveGift();
    // setOrderGift();
    loadUserGift();
    loadTeacherWx();
    checkConfession();
    checkNaming();
    checkAttention();

    $('.fancybox').fancybox();
    $("input[name='anonymous']").prop("checked", false);
})
$(document).bind('click', function (e) {
    var e = e || window.event; //浏览器兼容性
    var elem = e.target || e.srcElement;
    while (elem) { //循环判断至跟节点，防止点击的是div子元素
        if ((elem.id && elem.id == 'table_time') || (elem.id && elem.id == 'shijian') || (elem.className && elem.className == 'no_td_add')) {
            return;
        }
        elem = elem.parentNode;
    }
    $('.table_time').css('display', 'none'); //点击的不是div或其子元素
});
//数据这块
$.ajax({
    url: "https://y.tuwan.com/m/Playteach/TeachGiftRecommend?format=jsonp",
    type: "get",
    dataType: "jsonp",
    success: function (obj) {
        var uids = obj["uids"];
        if ($.inArray(teacherid + "", uids) > -1) {
            $(".plutocrat_rick_01").show();
        } else {
            $(".plutocrat_rick_01").hide();
        }
    }
})


//加法
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
