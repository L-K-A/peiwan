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
    <title>板块管理</title>
</head>
<body class="pos-r">
<div id="app" class="container">
    <nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 板块管理 <span
                class="c-gray en">&gt;</span>板块管理 <a class="btn btn-success radius r"
                                                     style="line-height:1.6em;margin-top:3px"
                                                     href="javascript:location.replace(location.href);" title="刷新"><i
                    class="Hui-iconfont">&#xe68f;</i></a></nav>
    <div class="page-container">
        <div class="text-c"> 查询条件：
            <input type="text" name="" id="gameId" placeholder="板块id" style="width:250px" class="input-text radius">
            <input type="text" name="" id="gameName" placeholder="板块名" style="width:250px" class="input-text radius">
            <button name="" id="findGame" class="btn btn-success radius" type="submit"><i
                        class="Hui-iconfont">&#xe665;</i> 查询板块
            </button>
            <button name="" id="addGameBtn" class="btn btn-primary radius" type="submit"><i
                        class="Hui-iconfont">&#xe600;</i> 增加板块
            </button>
        </div>
        <div class="cl pd-5 bg-1 bk-gray mt-20"> <span class="l"><a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a></span> <span class="r">共有数据：<strong id="totalNumber">0</strong> 条</span> </div>
        <div class="mt-20">
            <table class="table table-border table-bordered table-bg table-hover table-sort">
                <thead>
                <tr class="text-c">
                    <th width="40"><input name="" type="checkbox" value=""></th>
                    <th width="40">板块id</th>
                    <th width="120">板块名</th>
                    <th width="100">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-c va-m" v-for="(item,index) in result">
                    <td><input name="tag" type="checkbox" :value="item.gid"></td>
                    <td>{{item.gid}}</td>
                    <td>{{item.gname}}</td>
                    <td><a href="#" @click="deleteEvent(item.gid)"><img src="/img/ab.jpg" style="width: 20px;height: 20px"/></a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div id="pagenav"></div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/Hui/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="/Hui/static/h-ui/js/H-ui.min.js"></script>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            result: []
        }
    });
    /**查询板块数据*/
    var getGsortPageList = function (curr) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/getGamePage',
            data: {
                pageCurrent: curr || 1,
                pageSize: 3,
                gid: $("#gameId").val(),
                gName: $("#gameName").val(),
            },
            success: function (msg) {
                $("#totalNumber").html(msg.totalNumber);
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
                            getGsortPageList(obj.curr);
                        }
                    }
                });
            }
        });
    }
    getGsortPageList();

    /**查询板块数据*/
    $("#findGame").click(function () {
        getGsortPageList();
    });

    /**增加新板块*/
    $("#addGameBtn").click(function () {
        layer.open({
            type: 2, /**layer中5种类型传入的值有：0(信息框，默认是0），1（页面层），2（iframe层)，3（加载层），4（tips层）*/
            title: '增加板块',
            fix: false, /**是否固定  默认为true*/
            maxmin: true,
            shadeClose: true,
            area: ['1000px', '600px'],
            content: '/selectGameId',
            end: function () {
                getGsortPageList();
            }
        });
    })
    /**根据板块id删除板块信息*/
    var deleteEvent = function (gid) {
        /**确认对话框*/
        layer.confirm('你忍心删除吗', {
            btn: ['删了吧', '朕再想想']
        }, function () {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: '/deleteGame',
                data: {
                    gid: gid
                },
                success: function () {
                    getGsortPageList();
                    layer.msg("成功删除" + gid, {icon: 6});
                }
            });
        });
    }
    /**根据板块id批量删除*/
    function datadel(){
        var checkedbox = $("input[name='tag']:checked");
        if(checkedbox.length == 0){
            alert("请选择要删除的标签");
        }else{
            if(confirm("确定要删除吗？")){
                var res = checkedbox.map(function(){
                    return this.value;
                });
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:'/deleteGames',
                    data:{
                        ids:res.toArray().join(",")
                    },
                    success:function (msg) {
                        if(msg){
                            layer.msg("删除成功",{icon:6});
                        }else{
                            layer.msg('删除失败',{icon:6});
                        }
                        window.location.reload();
                    }
                });

            }
        }
    }


</script>

</body>
</html>