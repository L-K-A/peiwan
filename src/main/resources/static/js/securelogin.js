function slogin(b, c, d, e, f) {
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
