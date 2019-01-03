

$(document).ready(function () {

    $("#commit").click(function () {


        datacommit();

    });

});


function datacommit() {



    var sendData = new Object();

    sendData.gameID =  $("#gameID").val();

    sendData.areaID = $("#area_id").val();
    sendData.rank = $("#area_grading").val();

    sendData.pos_top = $("#pos_top")[0].checked;

    sendData.pos_mid = $("#pos_mid")[0].checked;

    sendData.pos_gank = $("#pos_gank")[0].checked;

    sendData.pos_adc = $("#pos_adc")[0].checked;

    sendData.pos_support = $("#pos_support")[0].checked;

    sendData.goodHero = $("#goodHero").val();

    var content = JSON.stringify(sendData);

    console.info(content);

    $.ajax({
        type: "post",
        url: "http://192.168.1.240/api/method/teachdata",
        dataType: "jsonp",
        jsonp: "callback",
        data: { data: content },
        success: function (data) {

            console.info(data);


        }
    });

}