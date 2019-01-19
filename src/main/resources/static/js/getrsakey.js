<<<<<<< HEAD
var publicKey = "";
getRSAkey();

function getRSAkey() {
    $.ajax({
        type: "get",
        url: "",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (a) {
            publicKey = 1037 == a.code ? a.data : ""
        }
    })
};
=======
﻿var publicKey="";getRSAkey();function getRSAkey(){$.ajax({type:"get",url:location.protocol+"//user.tuwan.com/api/method/getpkey",dataType:"jsonp",jsonp:"callback",success:function(a){publicKey=1037==a.code?a.data:""}})};
>>>>>>> aed70938110d52e04385a0594d15a0923e3784ef
