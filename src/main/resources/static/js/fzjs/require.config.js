// window.public_domain = "http://dj.com";
// window.public_domain = "https://test.daofengdj.com";
//window.public_domain = "https://yundown.daofengdj.com";
window.public_domain = "/fzjs/require.config.js";
window.pay_switch = 3;//0|隐藏微信支付宝，1|显示微信，2|显示支付宝，3|全部显示
requirejs.config({
    paths:{
        jquery:public_domain + '/static/jquery-2.2.3.min',
        zepto:public_domain + '/static/zepto.min',
        mint:public_domain + '/static/mint',
        vue:public_domain + "/static/vue.min",
        resource:public_domain + "/static/vue-resource",//vue ajax
        text:public_domain + '/static/requirejs-text',
        common:public_domain + '/static/common',//公共JS文件
        mobile_common:public_domain + '/static/mobile_common',//公共JS文件
        union_common:public_domain + '/static/union_common',//公会公共JS文件
        external_common:public_domain + '/static/external_common',//公会公共JS文件
        store:public_domain + '/static/store.legacy.min', //本地存储LocalStorage
        layer:public_domain + '/static/layer/layer',//弹窗
        laypage:public_domain + '/static/laypage/laypage',//分页插件
        swiper:public_domain + "/static/swiper/swiper.min",//swiper插件
        qrcode: public_domain + '/static/jquery.qrcode.min',//jq 生成二维码
        cropbox:public_domain + '/static/cropbox',//轻量级自定义图片上传，剪裁工具
        webuploader:public_domain + '/static/webuploader/webuploader.min',//百度上传
        easyform:public_domain + '/static/easyform',//jquery表单验证
        datetimepicker:public_domain + '/static/jquery.datetimepicker',//jquery时间插件[不好用]
        layDate:public_domain + '/static/laydate',//jquery时间插件[好用]
        lcalendar:public_domain + '/static/lCalendar.min',//移动端日期插件
        scroller:public_domain + '/static/vue-scroller.min',//VUE下拉刷新
        dropload:public_domain + '/static/dropload',
        iscroll:public_domain + '/static/iscroll',//移动端模拟滚动条滚动插件
        photoswipe:public_domain + '/static/photoswipe.min',//移动端相册
        photoswipe_ui:public_domain + '/static/photoswipe-ui-default.min',//移动端相册
        selectFilter:public_domain + '/static/selectFilter',//jquery select美化
        nativeShare:public_domain + "/static/NativeShare",//浏览器分享
        wow:public_domain + "/static/wow.min",//动画滚动到位置加载
        address: public_domain + "/static/address",//地址插件
        rotate:public_domain + "/static/jquery.rotate"
    },
    urlArgs: "bust=" +window.website_version,//清楚缓存用
    shim: {
        //基于jquery的插件，要在此声明一下是在jq加载完成以后在加载，依赖与jq;
        'qrcode':{
            deps:['jquery'],
            exports:'qrcode'
        },
        'rotate':{
            deps:['jquery'],
            exports:'rotate'
        },
        'cropbox':{
            deps:[],
            exports:'cropbox'
        },
        'photoswipe':{
            deps:['photoswipe_ui'],
            exports:'PhotoSwipe'
        },
        'resource':{
            deps:['vue'],
            exports:'plugin'
        },
        'easyform':{
            deps:['jquery'],
            exports:'easyform'
        },
        'datetimepicker':{
            deps:['jquery'],
            exports:'datetimepicker'
        },
        'selectFilter':{
            deps:['jquery'],
            exports:'selectFilter'
        }

    }
});
