!function () {
    "use strict";

    function e(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
    }

    function t(e, t, n, i, o) {
        o && (o = new Date(+new Date + o));
        var r = e + "=" + escape(t) + (o ? "; expires=" + o.toGMTString() : "") + (i ? "; path=" + i : "") + (n ? "; domain=" + n : "");
        return r.length < 4096 && (s.cookie = r), this
    }

    function n(e) {
        var t = s.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
        return null != t ? unescape(t[2]) : null
    }

    function i(e) {
        function i() {
            return Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1e10
        }

        function o() {
            var e = d.active, t = d.url, i = e ? c(t, "visitorId") : n(u);
            return !e && s && (i ? f.set(u, i) : i = f.get(u)), i
        }

        function r() {
            var e = i();
            return s ? f.set(u, e) : t(name, e, null, "/", 31536e6), e
        }

        var a, u = "tencentSig", s = "undefined" == typeof f.type || "memory" === f.type ? !0 : !1,
            d = {active: !1, url: ""};
        return $.extend(d, e), a = o(), a || (a = r()), a
    }

    function o() {
        function e() {
            n = !1, c ? document.dispatchEvent(i) : document.documentElement.visibilitychange = 1
        }

        function t() {
            n = !0, c ? document.dispatchEvent(i) : document.documentElement.visibilitychange = 0
        }

        var n = void 0, i = null, o = function (e) {
            var t = document.createElement("b");
            return t.innerHTML = "<!--[if IE " + e + "]><i></i><![endif]-->", 1 === t.getElementsByTagName("i").length
        }, r = o(), c = o(9), a = c ? "" : null, u = function (e, t) {
            return "" !== e ? e + t.slice(0, 1).toUpperCase() + t.slice(1) : t
        }, s = function () {
            var e = !1;
            return "number" == typeof window.screenX && ["webkit", "moz", "ms", "o", ""].forEach(function (t) {
                0 == e && void 0 != document[u(t, "hidden")] && (a = t, e = !0)
            }), e
        }();
        r && !s && (document.addEventListener ? (window.addEventListener("focus", e, !0), window.addEventListener("blur", t, !0)) : (document.attachEvent("onfocusin", e), document.attachEvent("onfocusout", t)), "undefined" == typeof document.createEvent || i ? document.documentElement.visibilitychange = 0 : (i = document.createEvent("HTMLEvents"), i.initEvent("visibilitychange", !0, !0)));
        var d = function () {
            return s ? document[u(a, "hidden")] : "undefined" != typeof n ? n : void 0
        }, f = function () {
            return s ? document[u(a, "visibilityState")] : "undefined" != typeof n ? n ? "hidden" : "visible" : void 0
        };
        return {
            hidden: d(),
            isHidden: d,
            isPageVisibilitySupport: s,
            visibilityState: f(),
            visibilitychange: function (e, t) {
                if (t = !1, "function" == typeof e) {
                    if (s || c) return document.addEventListener(a + "visibilitychange", function (t) {
                        e.call(this, t, d(), f())
                    }, t);
                    document.documentElement.attachEvent("onpropertychange", function (t) {
                        "visibilitychange" == event.propertyName && e.call(this, t, d(), f())
                    })
                }
            }
        }
    }

    function r() {
        this.create = function (e, t) {
            return this.ioLink = io.connect(e, t), this
        }, this.close = function () {
            this.ioLink.disconnect()
        }, this.emitMsg = function (e, t, n, i) {
            return this.ioLink && this.ioLink.compress(!1).emit(e, t), n && n.call(i), this
        }, this.receiveMsg = function (e, t, n, i, o) {
            var n = n || this;
            return o ? this.ioLink.once(e, function (e) {
                i && $.extend(e, i), t && t.call(n, e)
            }) : this.ioLink.on(e, function (e) {
                i && $.extend(e, i), t && t.call(n, e)
            }), this
        }
    }

    var c = function (e, t) {
        var n, i, e = e ? e : window.location.href;
        if (t) {
            n = new RegExp("[?&]" + t + "=([^&#]*)", "i");
            try {
                i = n.exec(e)[1]
            } catch (o) {
                i = null
            }
        } else i = e.substring(e.indexOf("?") + 1);
        return i
    }, a = function (e) {
        var t = /uc_msg|oppo_night|weibo|msfapi|axure/i, n = Object.prototype.toString;
        return !e || "[object String]" !== n.call(e) || t.test(e) ? !1 : e
    }, u = function () {
        function t(t, n) {
            e(t, "message", function (e) {
                var t = a(e.data);
                if (t) {
                    -1 == t.indexOf(o) && BJ_REPORT && BJ_REPORT.report("PM NO Flag " + t);
                    try {
                        i = JSON.parse(t)
                    } catch (e) {
                        throw new Error("PostMsg Parse Error " + t)
                    }
                    "function" == typeof n ? n(i) : ""
                }
            }, !1)
        }

        function n(e, t) {
            var n = i ? $.extend(i, e) : e, c = t || r;
            n.hasOwnProperty(o) && n[o] == c || (n[o] = c), n = "string" != typeof n ? JSON.stringify(n) : n, window.parent.postMessage(n, "*")
        }

        var i, o = "QD_PM", r = "CHAT";
        return {receive: t, send: n}
    }(), s = document, d = function () {
        function e(e) {
            return e in o ? o[e] : !1
        }

        function t(e, t) {
            return o[e] = t, !0
        }

        function n(e) {
            var t = e in o;
            return t ? delete o[e] : !1
        }

        function i() {
            return o = {}, !0
        }

        var o = {};
        return {type: "memory", getItem: e, setItem: t, removeItem: n, clear: i}
    }, f = function (e) {
        function t(e) {
            return r.getItem(e)
        }

        function n(e, t) {
            try {
                return r.setItem(e, t), !0
            } catch (n) {
                return !1
            }
        }

        function i(e) {
            return r.removeItem(e)
        }

        function o() {
            return r.clear()
        }

        var r = d();
        try {
            "localStorage" in e && e.localStorage && (e.localStorage.setItem("test", "test"), e.localStorage.removeItem("test"), r = e.localStorage)
        } catch (c) {
            BJ_REPORT && BJ_REPORT.report(JSON.stringify(c))
        }
        return {type: r.type, get: t, set: n, remove: i, clear: o}
    }(window);
    !function (e) {
        var t = /iPhone/i, n = /iPod/i, i = /iPad/i, o = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, r = /Android/i,
            c = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
            a = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
            u = /Windows Phone/i, s = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, d = /BlackBerry/i, f = /BB10/i,
            l = /Opera Mini/i, v = /(CriOS|Chrome)(?=.*\bMobile\b)/i, h = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
            m = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"), p = function (e, t) {
                return e.test(t)
            }, b = function (e) {
                var b = e || navigator.userAgent, g = b.split("[FBAN");
                return "undefined" != typeof g[1] && (b = g[0]), g = b.split("Twitter"), "undefined" != typeof g[1] && (b = g[0]), this.apple = {
                    phone: p(t, b),
                    ipod: p(n, b),
                    tablet: !p(t, b) && p(i, b),
                    device: p(t, b) || p(n, b) || p(i, b)
                }, this.amazon = {
                    phone: p(c, b),
                    tablet: !p(c, b) && p(a, b),
                    device: p(c, b) || p(a, b)
                }, this.android = {
                    phone: p(c, b) || p(o, b),
                    tablet: !p(c, b) && !p(o, b) && (p(a, b) || p(r, b)),
                    device: p(c, b) || p(a, b) || p(o, b) || p(r, b)
                }, this.windows = {
                    phone: p(u, b),
                    tablet: p(s, b),
                    device: p(u, b) || p(s, b)
                }, this.other = {
                    blackberry: p(d, b),
                    blackberry10: p(f, b),
                    opera: p(l, b),
                    firefox: p(h, b),
                    chrome: p(v, b),
                    device: p(d, b) || p(f, b) || p(l, b) || p(h, b) || p(v, b)
                }, this.seven_inch = p(m, b), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window ? this : void 0
            }, g = function () {
                var e = new b;
                return e.Class = b, e
            };
        e.isMobile = g()
    }(window);
    var l = __domain || {chat: "chat"}, v = {
        link: "https://" + l.chat + ".qidian.qq.com",
        opts: {
            path: "/status",
            reconnectionDelay: 2e3,
            reconnectionDelayMax: 3e3,
            reconnectionAttempts: 2,
            timeout: 2e4,
            transports: ["websocket"]
        }
    }, h = {
        statusNotice: {emit: "active_notice"},
        b2cMsgNum: {receive: "b2c_msg_num", emit: "b2c_msg_num ack"},
        invitation: {receive: "session_invitation", emit: "user_operate"},
        inviteAutoConf: {emit: "invite_auto_conf", receive: "invite_auto_conf"}
    }, m = function (e) {
        function t(e) {
            e && u.send(e, "ONLINE_STATUS")
        }

        function n(e) {
            var t = e.act;
            switch (t) {
                case"SM_INIT":
                    if (k && k.kfuin == e.kfuin) return;
                    k = e, k.linkType = e.linkType ? 1 : 0, E.push(k), s(k);
                    break;
                case"SM_REFUSE":
                    b();
                    break;
                case"SMS_SM_FORCE_CONNECT":
                    y();
                    break;
                case"SM_INVITE_RET":
                    p()
            }
        }

        function a() {
            var n = e.location.href, i = c(n, "kfuin");
            t({act: "SM_INIT", visitorId: _, kfuin: i, linkType: 1, isMobile: Number(isMobile)})
        }

        function s(e) {
            T.emitMsg(h.statusNotice.emit, e, function (t) {
                0 == t.errcode && !S && f(e)
            })
        }

        function d() {
            for (var e = 0, t = E.length; t > e; e++) s(E[e])
        }

        function f(e) {
            T.emitMsg(h.inviteAutoConf.emit, e), T.receiveMsg(h.inviteAutoConf.receive, function (e) {
                t({act: "SM_INVITE_CONF", kfuin: e.body.invitationConf.kfuin, inviteRule: e.body.invitationConf})
            })
        }

        function l() {
            T.receiveMsg(h.b2cMsgNum.receive, function (e) {
                var n = e.body, i = "kfuin" + n.kfuin;
                T.emitMsg(h.b2cMsgNum.emit), n.number = n.msgNum, delete n.seq, delete n.msgNum, "undefined" != typeof n.receptionName ? M[i] = n.receptionName : n.receptionName = M.hasOwnProperty(i) ? M[i] : null, t({
                    act: "SM_UNREAD",
                    kfuin: n.kfuin,
                    data: n
                })
            })
        }

        function m() {
            T.receiveMsg(h.invitation.receive, function (e) {
                var n = e.body.kfuin;
                delete e.body.kfuin, t({act: "SM_MANUAL_INVITE", kfuin: n, data: e.body})
            })
        }

        function p(e) {
            T.emitMsg(h.invitation.emit, {operate: e})
        }

        function b() {
            T.emitMsg(h.invitation.emit, {action: "refuse"})
        }

        function g(e) {
            _ && $.extend(v.opts, {query: "queryId=" + _}), T.create(v.link, v.opts), T.ioLink.once("connect", function () {
                l(), m(), "reconnect" == e ? d() : (w = 0, t({act: "SM_READY"}), S ? a() : "")
            }), T.ioLink.once("reconnect_attempt", function () {
                T.ioLink.io.opts.transports = ["polling", "websocket"]
            }), T.ioLink.once("reconnect", function () {
                d()
            }), T.ioLink.once("disconnect", function (e) {
                "transport close" === e && t({act: "DISCONNECT"})
            })
        }

        function y() {
            T.ioLink && T.ioLink.disconnected && g("reconnect")
        }

        var w = 0, k = {}, E = [], M = {}, _ = i(), S = function () {
            var t = e.location.href, n = c(t, "linkType"), i = c(t, "visitorId"), o = e.parent == e ? !1 : !0;
            return i && i.length > 0 ? n = 1 : "", n && ("" + n).length > 0 && !o ? !0 : !1
        }(), N = o();
        N.isPageVisibilitySupport && N.visibilitychange(function (e, t, n) {
            setTimeout(function () {
                0 == t && "visible" == n && y()
            }, 500)
        });
        var T = new r;
        return T.emitMsg = function (e, t, n, i) {
            return this.ioLink.emit(e, t, function () {
                n && n.apply(i, arguments)
            }), this
        }, {
            start: function () {
                g(), u.receive(e, n)
            }, forceConnect: y
        }
    }(window);
    window.__STATUS_MANAGER = m, m.start()
}();