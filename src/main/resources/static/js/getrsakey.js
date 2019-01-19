<<<<<<< HEAD
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
=======
var publicKey="";getRSAkey();function getRSAkey(){$.ajax({type:"get",url:location.protocol+"//user.tuwan.com/api/method/getpkey",dataType:"jsonp",jsonp:"callback",success:function(a){publicKey=1037==a.code?a.data:""}})};
=======
﻿var publicKey="";getRSAkey();function getRSAkey(){$.ajax({type:"get",url:location.protocol+"//user.tuwan.com/api/method/getpkey",dataType:"jsonp",jsonp:"callback",success:function(a){publicKey=1037==a.code?a.data:""}})};
>>>>>>> 62f535f901c014b9188b44f6c4b3b6f12f87f396
>>>>>>> zwl
