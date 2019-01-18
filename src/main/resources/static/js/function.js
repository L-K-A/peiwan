function showMessage(b, a, c, e, f) {
    null == a && (a = "\u03f5\u0373\u0361\u02be");
    var d = $("#window").fadeIn("fast"), g = Math.random();
    $("#window .in .title span").html(a);
    $("#window .in .body").html(b);
    b = ($(window).width() - d.width()) / 2;
    a = ($(window).height() - d.height()) / 2;
    !window.XMLHttpRequest && window.ActiveXObject && (a += document.documentElement.scrollTop);
    d.css({top: a, left: b});
    d.attr("rnd", g);
    d.attr("url", "");
    null != c && "" != c && d.attr("url", c.split("#")[0]);
    null != e && d.attr("handle", e.toString());
    (f || null == f) && setTimeout(function () {
        d.attr("rnd") == g && (closeMessage("slow"), null != c && "" != c && (location = c))
    }, 3E3)
}

function closeMessage(b) {
    var a = $("#window");
    null != a.attr("url") && "" != a.attr("url") ? location = a.attr("url") : (null == b && (b = "fast"), a.attr("rnd", ""), a.attr("url", ""), eval("var fn \x3d " + a.attr("handle")), null != fn ? a.fadeOut(b, fn) : a.fadeOut(b))
}

function setTab(b, a, c) {
    for (i = 1; i <= c; i++) {
        var e = document.getElementById(b + i), f = document.getElementById("con_" + b + "_" + i);
        e.className = i == a ? "hover" : "";
        f.style.display = i == a ? "block" : "none"
    }
}

function loadcode(b, a, c) {
    document.getElementById(b).src = location.protocol + "//user.tuwan.com/api/action.ashx?t\x3dverification\x26w\x3d" + a + "\x26h\x3d" + c + "\x26rand\x3d" + Math.random()
}

function pwdPower(b) {
    function a(a) {
        return 65 <= a && 90 >= a ? 2 : 97 <= a && 122 >= a ? 4 : 48 <= a && 57 >= a ? 1 : 8
    }

    var c = 0, e = b.length;
    if (6 > e) return 1;
    for (i = 0; e > i; i++) c |= a(b.charCodeAt(i));
    c = function (a) {
        var b = 0;
        for (i = 0; 4 > i; i++) 1 & a && b++, a >>>= 1;
        return b
    }(c);
    return 10 <= b.length && c++, s(b) || (c = 1), c = Math.min(Math.max(c, 1), 3)
};