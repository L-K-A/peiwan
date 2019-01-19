<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="/Hui/css/bootstrap.min.css">
    <link rel="stylesheet" href="/Hui/css/laypage.css">
    <script type="text/javascript" src="/Hui/js/vue/vue.min.js"></script>
    <script type="text/javascript" src="/Hui/js/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/Hui/js/layer/layer.js"></script>
    <script type="text/javascript" src="/Hui/js/laypage/laypage.js"></script>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/Hui/css/bootstrap.min.css">
    <script src="/Hui/js/jquery/jquery.min.js"></script>
    <script src="/Hui/js/jquery.validation/1.14.0/jquery.validate.min.js"></script>
    <script src="/Hui/js/jquery.validation/1.14.0/messages_zh.min.js"></script>
    <style>
        input.error {
            border: 1px solid red;
        }
    </style>
</head>
<body>
<div class="container">

    <form id="addGameForm">
        <br/>
        <div class="form-group">
            <label for="gameId">板块id：</label>
            <input type="text" class="form-control" value="${id}" id="gameId" name="gameId" placeholder="此数据不能修改">
        </div>
        <div class="form-group">
            <label for="gameName">板块名：</label>
            <input type="text" class="form-control" id="gameName" name="gameName" placeholder="输入板块名">
            <span id="game"></span>
        </div>
        <div class="form-group">
            <button type="button" id="saveBtn" class="btn btn-success">提交</button>
            <button type="button" id="cancelBtn" class="btn btn-default">取消</button>
        </div>
    </form>
</div>
<script type="text/javascript">
    /** 添加新的板块名*/
    var addGame = function () {
        if (!check().form()) {
            return;
        }
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/addGame',
            data: {
                gName: $("#gameName").val(),
            },
            success: function () {
                $("#cancelBtn").click();
            }
        });
    }


    $("#saveBtn").click(function () {
        var gameName=$("#gameName").val();
        $.ajax({
            url:"/selectGameName",
            data:{"gName":gameName},
            success:function(msg){
                if(msg.result){
                    $("#game").html("此板块名已存在");
                }
                else{
                    $("#game").html("");
                    addGame();
                    $("#cancelBtn").click();
                    /**alert("添加成功");*/
                }
            },
            dataType:"json"
        })
    })

    $("#cancelBtn").click(function () {
        var index = parent.layer.getFrameIndex(window.name);
        parent.getGsortPageList();
        parent.layer.close(index);
    });

    /**校验字段是否正确*/
    function check() {
        /**返回一个validate对象，这个对象有一个form方法，返回的是是否通过验证*/
        return $("#addGameForm").validate({
            rules: {
                gameName: {
                    required: true
                }
            },
            messages: {
                gameName: {
                    required: ""
                }
            }
        });
    }


</script>
</body>
</html>