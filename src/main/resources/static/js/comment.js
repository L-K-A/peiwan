/**
 * 评分
 * 秦世昌
 * 2019-01-22
 */
/*评分的下拉框*/
var pf;
$("#pingfen").on('change',function () {
    pf = $("#pingfen").val();
    console.log(pf);
    if (pf==''){
        alert("请选择正确的分数！");
    }
});



var content;
$("#commentdesc").on('change',function () {
    content = $("#commentdesc").val();
    console.log(content);
    if (content==''){
        alert("请填写评价！");
    }
});

$("#comment").on('click',function () {
    console.log(content);
    console.log(gameid);
    console.log(zid);
    getComment();
    pf=null;
    content=null;
});


var getComment = function () {
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/getcomment',
        data:{
            pid:pid,
            zid:zid,
            gid:gameid,
            oid:id,
            pf:pf,
            content:content
        },
        success:function (data) {
            if (data==1){
                alert("提交成功!");
            }else if (data==3) {
                alert("此订单已经进行过评价，请勿重复评价！");
            }else {
                alert("提交评价失败，请重新提交！");
            }
        }
    });
};
