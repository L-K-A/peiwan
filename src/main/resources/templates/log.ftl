<!DOCTYPE HTML>
<html>
<head>
    <!--分页，模糊查询使用到的插件-->
    <link rel="stylesheet" href="/Hui/css/bootstrap.min.css">
    <link rel="stylesheet" href="/Hui/css/laypage.css">
    <script type="text/javascript" src="/Hui/js/vue/vue.min.js"></script>
    <script type="text/javascript" src="/Hui/js/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/Hui/js/layer/layer.js"></script>
    <script type="text/javascript" src="/Hui/js/laypage/laypage.js"></script>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <!--[if lt IE 9]>
    <script type="text/javascript" src="/Hui/lib/html5shiv.js"></script>
    <script type="text/javascript" src="/Hui/lib/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="/Hui/static/h-ui/css/H-ui.min.css" />
    <link rel="stylesheet" type="text/css" href="/Hui/static/h-ui.admin/css/H-ui.admin.css" />
    <link rel="stylesheet" type="text/css" href="/Hui/lib/Hui-iconfont/1.0.8/iconfont.css" />
    <link rel="stylesheet" type="text/css" href="/Hui/static/h-ui.admin/skin/default/skin.css" id="skin" />
    <link rel="stylesheet" type="text/css" href="/Hui/static/h-ui.admin/css/style.css" />
    <!--[if IE 6]>
    <script type="text/javascript" src="/Hui/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
    <script>DD_belatedPNG.fix('*');</script>
    <![endif]-->
    <title>系统日志</title>
</head>
<body>
<div id="app" class="container">
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页
    <span class="c-gray en">&gt;</span>
    系统管理
    <span class="c-gray en">&gt;</span>
    系统日志
    <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a>
</nav>
<div class="page-container">
    <div class="text-c"> 注册日期范围：
        <input type="text" onfocus="WdatePicker({ maxDate:'#F{$dp.$D(\'logmax\')||\'%y-%M-%d\'}' })" id="logmin" class="input-text Wdate" style="width:120px;">
        -
        <input type="text" onfocus="WdatePicker({ minDate:'#F{$dp.$D(\'logmin\')}',maxDate:'%y-%M-%d' })" id="logmax" class="input-text Wdate" style="width:120px;">
        <input type="text" name="" id="username" placeholder="用户名" style="width:250px" class="input-text">
        <button name="" id="findPerson" class="btn btn-success" type="submit"><i class="Hui-iconfont">&#xe665;</i> 搜日志</button>
    </div>
    <div class="cl pd-5 bg-1 bk-gray mt-20">
		<span class="l">
		<a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
		</span>
        <span class="r">共有数据：<strong id="zongtiaoshu">0</strong> 条</span>
    </div>
    <table class="table table-border table-bordered table-bg table-hover table-sort">
        <thead>
        <tr class="text-c">
            <th width="25"><input type="checkbox" name="" value=""></th>
            <th width="80">用户ID</th>
            <th width="17%">用户名</th>
            <th width="17%">用户昵称</th>
            <th width="120">用户成为主播时间</th>
            <th width="120">注册时间</th>
            <th width="120">最后一次登陆时间</th>
            <th width="70">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-c" v-for="(item,index) in result">
            <td><input type="checkbox" :value="item.pid" name="tag"></td>
            <td>{{item.pid}}</td>
            <td>{{item.personName}}</td>
            <td>{{item.personNickname}}</td>
            <td>{{item.personBecometime}}</td>
            <td>{{item.personCreatetime}}</td>
            <td>{{item.personLogintime}}</td>
            <td>
                <a href="#" @click="searchEvent(item.pid)" title="查看详情"><img src="/img/6.jpg" style="width: 20px;height: 20px"/></a>&nbsp;&nbsp;
                <a href="#" @click="deleteEvent(item.pid)" title="删除"><img src="/img/1.jpg" style="width: 20px;height: 20px"/></a>
            </td>
        </tr>
        </tbody>
    </table>
    <div id="pagenav"></div>
</div>
</div>
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="/Hui/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="/Hui/static/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="/Hui/static/h-ui.admin/js/H-ui.admin.js"></script> <!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="/Hui/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript">
    var app = new Vue({
        el:'#app',
        data:{
            result:[]
        }
    });
    //查询学生数据
    var getStudentPageList = function(curr){
        $.ajax({
            type:'POST',
            dataType:'json',
            url:'/loglist',
            data:{
                pageCurrent:curr || 1,
                pageSize: 3,
                minTime:$("#logmin").val(),
                maxTime:$("#logmax").val(),
                personName:$("#username").val(),
            },
            success:function (msg) {
               console.log(msg.zongtiaoshu);
               $("#zongtiaoshu").html(msg.zongtiaoshu);
                app.result = msg.page;
                    laypage({
                        cont: 'pagenav',//容器  值支持id名、原生dom对象，jquery对象,
                        pages: msg.totalPage,//总页数
                        first: '首页',
                        last: '尾页',
                        skin: '#00A0E9',
                        curr: curr || 1,//当前页
                        jump: function (obj, first) {//触发分页后的回调
                            if (!first) {//点击跳页触发函数自身，并传递当前页：obj.curr
                                getStudentPageList(obj.curr);
                            }
                        }

                    });
            }

        });
    }
    getStudentPageList();
    //查询学生事件
    $("#findPerson").click(function () {
        getStudentPageList();
    });
    //删除事件
    var deleteEvent=function (id) {
        //确认对话框
        layer.confirm('你忍心删除吗',{
            btn:['删了吧','朕再想想']
        },function () {
            $.ajax({
                type:'GET',
                dataType:'json',
                url:'/delete',
                data:{
                    pid:id
                },
                success:function () {
                    getStudentPageList();
                    layer.msg("删除成功",{icon:6});
                }
            });
        });
    }
    //查询详情事件
    var searchEvent=function (id) {
        layer.open({
            type:2,//layer中5种类型传入的值有：0(信息框，默认是0），1（页面层），2（iframe层)，3（加载层），4（tips层）
            title:'学生详情',
            fix:false,//是否固定  默认为true
            maxmin:true,
            shadeClose:true,
            area:['1000px','600px'],
            content:"/searchPage?pid="+id,
            end:function () {
                getStudentPageList();
            }
        });
    }
   /* 批量删除*/
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
                    url:'/deleteTags',
                    data:{
                        ids:res.toArray().join(",")
                    },
                    success:function (msg) {
                        if(msg.zhuangtai){
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