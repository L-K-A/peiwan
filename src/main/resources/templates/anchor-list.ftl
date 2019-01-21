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
<link rel="Bookmark" href="/favicon.ico" >
<link rel="Shortcut Icon" href="/favicon.ico" />
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
<title>主播申请列表</title>
</head>
<body>
<div id="app" class="container">
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 主播申请管理 <span class="c-gray en">&gt;</span> 主播申请列表 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
	<div class="text-c"> 用户名：
		<input type="text" class="input-text" style="width:250px" placeholder="输入用户名" id="username" name="">
		<button type="submit" class="btn btn-success" id="findPerson" name=""><i class="Hui-iconfont">&#xe665;</i> 搜用户</button>
	</div>
	<span class="r">共有数据：<strong id="zongtiaoshu">0</strong> 条</span> </div>
	<table class="table table-border table-bordered table-bg">
		<thead>
			<tr>
				<th scope="col" colspan="9">申请列表</th>
			</tr>
			<tr class="text-c">
				<th width="40">用户ID</th>
				<th width="40">用户名</th>
				<th width="40">用户昵称</th>
				<th width="40">是否已申请</th>
				<th width="80">操作</th>
			</tr>
		</thead>

		<tbody>
			<tr class="text-c" v-for="(item,index) in result">
				<td>{{item.pid}}</td>
				<td>{{item.personName}}</td>
				<td>{{item.personNickname}}</td>
				<td class="td-status"><span class="label label-success radius">已申请</span></td>
				<td class="td-manage">
					<a href="#" @click="agreeEvent(item.pid)">同意</a>
					<a href="#" @click="repulseEvent(item.pid)">拒绝</a>
				</td>
			</tr>
		</tbody>
	</table>
	<div id="pagenav"></div>
</div>
</div>
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="/Hui/static/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="/Hui/static/h-ui.admin/js/H-ui.admin.js"></script> <!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
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
            url:'/anchor',
            data:{
                pageCurrent:curr || 1,
                pageSize: 3,
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
	//同意操作
    var agreeEvent=function (id) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/agreeEvent',
            data: {
                pid: id
            },
            success: function (){
                getStudentPageList();
                layer.msg("已同意该用户申请", {icon: 6});
            }
        })
    };
    //反对事件
    var repulseEvent=function (id) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/repulseEvent',
            data: {
                pid: id
            },
            success: function () {
                getStudentPageList();
                layer.msg("已拒绝该用户申请", {icon: 6});
            }
        })
    };
</script>
</body>
</html>