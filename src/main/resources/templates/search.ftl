<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/Hui/css/bootstrap.min.css">
    <script src="/Hui/js/jquery/jquery.min.js"></script>
    <script src="/Hui/js/jquery.validation/1.14.0/jquery.validate.min.js"></script>
    <script src="/Hui/js/jquery.validation/1.14.0/messages_zh.min.js"></script>
</head>
<body>
<div class="container">

    <form id="updateStudentForm">
        <br/>
        <div class="form-group">
            <label for="username">用户id：</label>
            <input type="text" class="form-control" id="username" name="username" value="${data.pid}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="userage">用户昵称：</label>
            <input type="text" class="form-control" id="userage" name="userage" value="${data.personNickname}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="username">用户性别：</label>
            <input type="text" class="form-control" id="username" name="username" value="${data.personSex}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="username">出生日期：</label>
            <input type="text" class="form-control" id="username" name="username" value="${data.personBirthday}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="userage">用户电话：</label>
            <input type="text" class="form-control" id="userage" name="userage" value="${data.personTel}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="username">用户名：</label>
            <input type="text" class="form-control" id="username" name="username" value="${data.personName}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="userage">用户住址：</label>
            <input type="text" class="form-control" id="userage" name="userage" value="${data.personAdress}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="userage">成为主播时间：</label>
            <input type="text" class="form-control" id="userage" name="userage" value="${data.personBecometime}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="userage">用户注册账号时间：</label>
            <input type="text" class="form-control" id="userage" name="userage" value="${data.personCreatetime}" placeholder="此数据不允许修改">
        </div>
        <div class="form-group">
            <label for="userage">用户最后一次登陆时间：</label>
            <input type="text" class="form-control" id="userage" name="userage" value="${data.personLogintime}" placeholder="此数据不允许修改">
        </div>
    </form>
</div>
</body>
</html>