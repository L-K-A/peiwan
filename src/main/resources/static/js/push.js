!function () {
    var e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi, r = window.location.href, t = document.referrer;
    if (!e.test(r)) {
        var o = "";
        t ? (o += "?r=" + encodeURIComponent(document.referrer), r && (o += "&l=" + r)) : r && (o += "?l=" + r);
        var i = new Image;
        i.src = o
    }
}(window);