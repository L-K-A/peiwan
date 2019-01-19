<<<<<<< HEAD
﻿function slogin(b, c, d, e, f) {
    var a = {};
    a.username = b;
    a.password = c;
    a.code = d;
    a.platform = e;
    b = packSendData_general(a);
    $.ajax({
        type: "get",
        url: location.protocol + "/login?data\x3d" + encodeURIComponent(b),
        dataType: "jsonp",
        jsonp: "callback",
        success: function (a) {
            0 != a.code && (publicKey = a.data);
            f(a)
        }
    })
};
=======
﻿function slogin(b,c,d,e,f){var a={};a.username=b;a.password=c;a.code=d;a.platform=e;b=packSendData_general(a);$.ajax({type:"get",url:location.protocol+"//user.tuwan.com/api/method/login?data\x3d"+encodeURIComponent(b),dataType:"jsonp",jsonp:"callback",success:function(a){0!=a.code&&(publicKey=a.data);f(a)}})};
>>>>>>> 62f535f901c014b9188b44f6c4b3b6f12f87f396
