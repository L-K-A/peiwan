<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="/Hui/css/bootstrap.min.css">
    <link rel="stylesheet" href="/Hui/css/laypage.css">
    <script type="text/javascript" src="/Hui/js/vue/vue.min.js"></script>
    <script type="text/javascript" src="/Hui/js/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/Hui/js/layer/layer.js"></script>
    <script type="text/javascript" src="/Hui/js/laypage/laypage.js"></script>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <!--[if lt IE 9]>
    <script type="text/javascript" src="/Hui/lib/html5shiv.js"></script>
    <script type="text/javascript" src="/Hui/lib/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="/Hui/static/h-ui/css/H-ui.min.css"/>
    <link rel="stylesheet" type="text/css" href="/Hui/static/h-ui.admin/css/H-ui.admin.css"/>
    <link rel="stylesheet" type="text/css" href="/Hui/lib/Hui-iconfont/1.0.8/iconfont.css"/>
    <link rel="stylesheet" type="text/css" href="/Hui/static/h-ui.admin/skin/default/skin.css" id="skin"/>
    <link rel="stylesheet" type="text/css" href="/Hui/static/h-ui.admin/css/style.css"/>
    <!--[if IE 6]>
    <script type="text/javascript" src="/Hui/lib/DD_belatedPNG_0.0.8a-min.js"></script>
    <script>DD_belatedPNG.fix('*');</script>
    <![endif]-->
    <title>评论列表</title>
</head>
<body class="pos-r">
<div id="app" class="container">
    <nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 评论管理 <span
                class="c-gray en">&gt;</span> 评论列表 <a class="btn btn-success radius r"
                                                      style="line-height:1.6em;margin-top:3px"
                                                      href="javascript:location.replace(location.href);" title="刷新"><i
                    class="Hui-iconfont">&#xe68f;</i></a></nav>
    <div class="page-container">
        <div class="text-c"> 日期范围：
            <input type="text" onfocus="WdatePicker({ maxDate:'#F{$dp.$D(\'logmax\')||\'%y-%M-%d\'}' })" id="logmin"
                   class="input-text Wdate" style="width:120px;">
            -
            <input type="text" onfocus="WdatePicker({ minDate:'#F{$dp.$D(\'logmin\')}',maxDate:'%y-%M-%d' })"
                   id="logmax" class="input-text Wdate" style="width:120px;">
            <input type="text" name="" id="commentRank" placeholder="评分" style="width:250px" class="input-text radius">
            <button name="" id="findComment" class="btn btn-success radius" type="submit"><i class="Hui-iconfont">&#xe665;</i>
                查询评论
            </button>
        </div>
        <div class="mt-20">
            <table class="table table-border table-bordered table-bg table-hover table-sort">
                <thead>
                <tr class="text-c">
                    <th width="40">序号</th>
                    <th width="40">评论id</th>
                    <th width="120">评论内容</th>
                    <th width="60">评论时间</th>
                    <th width="60">评分</th>
                    <th width="60">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-c va-m" v-for="(item,index) in result">
                    <td>{{index+1}}</td>
                    <td>{{item.cid}}</td>
                    <td>{{item.ccontext}}</td>
                    <td>{{item.ccreatetime}}</td>
                    <td>{{item.crank}}</td>
                    <td><a href="#" @click="deleteEvent(item.crank)"><img src="/img/ab.jpg" style="width: 20px;height: 20px"/></a></td>
                </tr>
                </tbody>
            </table>
            <div id="pagenav"></div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/Hui/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            result: []
        }
    });
    /**查询评论数据*/
    var getPcommentPageList = function (curr) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/getCommentPage',
            data: {
                pageCurrent: curr || 1,
                pageSize: 3,
                minTime: $("#logmin").val(),
                maxTime: $("#logmax").val(),
                cRank: $("#commentRank").val(),
            },
            success: function (msg) {
                app.result = msg.page;
                laypage({
                    cont: 'pagenav', /**容器  值支持id名、原生dom对象，jquery对象*/
                    pages: msg.totalPage, /**总页数*/
                    first: '首页',
                    last: '尾页',
                    skin: '#00A0E9',
                    curr: curr || 1, /**当前页*/
                    jump: function (obj, first) {/**触发分页后的回调*/
                        if (!first) {
                            /**点击跳页触发函数自身，并传递当前页：obj.curr*/
                            getPcommentPageList(obj.curr);
                        }
                    }
                });
            }
        });
    }
    getPcommentPageList();
    /**查询评论*/
    $("#findComment").click(function () {
        getPcommentPageList();
    });

    /**根据评分删除评论信息*/
    var deleteEvent = function (cRank) {
        //确认对话框
        layer.confirm('你忍心删除吗', {
            btn: ['删了吧', '朕再想想']
        }, function () {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: '/deleteComment',
                data: {
                    cRank: cRank
                },
                success: function () {
                    getPcommentPageList();
                    layer.msg("成功删除" + cRank, {icon: 6});
                }
            });
        });
    }

</script>
</body>
</html>