
function sreg(b, c, d, e, f) {
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

