<<<<<<< HEAD
﻿function sreg(b, c, d, e, f) {
    var a = {};
    a.n = b;
    a.p = c;
    a.t = d;
    a.c = e;
    b = packSendData_general(a);
    $.ajax({
        type: "get",
        url: location.protocol + "//register?data\x3d" + encodeURIComponent(b),
        dataType: "jsonp",
        jsonp: "callback",
        success: function (a) {
            0 != a.code && (publicKey = a.data);
            f(a)
        }
    })
};
=======
﻿function sreg(b,c,d,e,f){var a={};a.n=b;a.p=c;a.t=d;a.c=e;b=packSendData_general(a);$.ajax({type:"get",url:location.protocol+"//user.tuwan.com/api/method/register?data\x3d"+encodeURIComponent(b),dataType:"jsonp",jsonp:"callback",success:function(a){0!=a.code&&(publicKey=a.data);f(a)}})};
>>>>>>> 62f535f901c014b9188b44f6c4b3b6f12f87f396
