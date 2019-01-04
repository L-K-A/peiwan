var TUWAN_VISTA_UTIL = function() {
    this.setcookie = function(name, value, times) {
        var second = 3600;
        if (times) {
            second = 0;
            var arrtime = times.split("-");
            if (parseInt(arrtime[0]) > 0) {
                second += parseInt(arrtime[0]) * 86400;
            }
            if (parseInt(arrtime[1]) > 0) {
                second += parseInt(arrtime[1]) * 3600;
            }
            if (parseInt(arrtime[2]) > 0) {
                second += parseInt(arrtime[2]) * 60;
            }
            if (parseInt(arrtime[3]) > 0) {
                second += parseInt(arrtime[3]);
            }
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + second * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
    this.getcookie = function(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    }
    this.addEventHandler = function(oTarget, sEventType, fnHandler) {
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        } else {
            oTarget["on" + sEventType] = fnHandler;
        }
    }
    this.removeEventHandler = function(oTarget, sEventType, fnHandler) {
        if (oTarget.removeEventListener) {
            oTarget.removeEventListener(sEventType, fnHandler, false);
        } else if (oTarget.detachEvent) {
            oTarget.detachEvent("on" + sEventType, fnHandler);
        } else {
            oTarget["on" + sEventType] = null;
        }
    }
    this.createscript = function(callback, callfn, callobj, src, charset) {
        var charset = charset || "utf-8";
        window[callback] = function(data) {
            if (callobj) {
                callfn.call(callobj, data);
            } else {
                callfn(data);
            }
            try {
                head.removeChild(script);
                window[callback] = null;
            } catch (ex) { }
        }
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.charset = charset;
        script.src = src;
        head.appendChild(script);
    }
    this.ieversion = function(version) {
        var sUserAgent = navigator.userAgent;
        var isOpera = sUserAgent.indexOf("Opera") > -1;
        var isIE = sUserAgent.indexOf("compatible") > -1 && sUserAgent.indexOf("MSIE") > -1 && !isOpera;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(sUserAgent);
            var fiEVersion = parseFloat(RegExp["$1"]);
            return fiEVersion == version;
        }
        return false;
    }
}
var TUWAN_VISTA_CONFIG = function() {
    this.host = 'https://vista.tuwan.com/',
    this.idata = 'https://vista.tuwan.com/data.ashx',
    this.iadress = 'https://vista.tuwan.com/ip.ashx',
    this.ihit = 'https://vista.tuwan.com/hit.ashx',
    this.ishow = 'https://vista.tuwan.com/show.ashx',
    this.imaterial = 'https://attachment.tuwan.com',
    this.iattach = 'https://vista.tuwan.com/images',
    this.action = 'https://vista.tuwan.com/api/action.ashx',
    this.status = 'ready',
    this.cookie = 'Tuwan_Ininfo',
    this.arraypids = "153",
    this.positionid = 'TUWAN_VISTA_CONTAINER_',
    this.cdn = true;
}
var TUWAN_VISTA_ENTITY = function(pid) {
    this.own = this,
    this.id = parseInt(Math.random() * 1000000),
    this.pid = pid,
    this.domid = "",
    this.cm = null,
    this.timeout = 0,
    this.async = true,
    this.data = null,
    this.callback = null,
    this.materialhtml = null,
    this.materialdom = null,
    this.advertisement = null,
    this.iskey = false,
    this.mtype = 0,
    this.returnvalue = null;
}
var TUWAN_VISTA_CUSTOMEVENT = function() {
    this.onload = null,
    this.onclose = null,
    this.onmouseover = null,
    this.onmouseout = null,
    this.onerror = null,
    this.load = null,
    this.beforerender = null,
    this.render = null;
}
var TUWAN_VISTA_FRAMEWORK = function() {
    this.util = new TUWAN_VISTA_UTIL();
    this.getObject = function(data) {
        if (data.length) {
            return data[0];
        } else if (typeof (data) == "object") {
            return data;
        } else {
            return null;
        }
    }
    this.addEvent = function() {
        var sEventType;
        var dom;
        if (arguments.length > 0) {
            if (arguments.length > 0) {
                sEventType = arguments[0];
            }
            if (arguments.length > 1) {
                dom = arguments[1];
            }
        }
        if (this.config != null) {
            if (this.config.listeners != null) {
                switch (sEventType) {
                    case "load":
                        if (this.config.listeners.load != null) {
                            this.returnvalue = this.config.listeners.load(this);
                        }
                        break;
                    case "beforerender":
                        if (this.config.listeners.beforerender != null) {
                            this.returnvalue = this.config.listeners.beforerender(this);
                        }
                        break;
                    case "render":
                        if (this.config.listeners.render != null) {
                            this.config.listeners.render(this);
                        }
                        break;
                }
            } else {
                this.config.customfun(this.config.container, document.getElementById(this.domid));
            }
        }
    }
    this.showiframe = function(dom) {
        var X = document.createElement("iframe");
        X.width = this.data.Width;
        X.height = this.data.Height;
        X.vspace = 0;
        X.hspace = 0;
        X.allowTransparency = "true";
        X.scrolling = "no";
        X.marginWidth = 0;
        X.marginHeight = 0;
        X.frameBorder = 0;
        X.style.border = 0;
        dom.insertBefore(X, dom.firstChild);
        var V = X.contentWindow.document ? X.contentWindow.document : X.document;
        V.write(this.materialhtml);
        window.setTimeout(function() {
            V.close();
        },
        7000);
    }
    this.showtext = function(dom) {
        dom.innerHTML = this.materialhtml;
    }
    this.showspan = function(dom) {
        var oSpan = document.createElement("span");
        oSpan.style.width = this.data.Width + "px";
        oSpan.style.height = this.data.Height + "px";
        oSpan.innerHTML = this.materialhtml;
        dom.insertBefore(oSpan, dom.firstChild);
    }
    this.showdiv = function(dom) {
        var oDiv = document.createElement("div");
        oDiv.style.width = this.data.Width + "px";
        oDiv.style.height = this.data.Height + "px";
        oDiv.innerHTML = this.materialhtml;
        oDiv.style.position = "relative";
        dom.insertBefore(oDiv, dom.firstChild);
    }
    this.showhtml = function(dom) {
        this.addEvent.call(this, "beforerender");
        if (this.returnvalue == false) {
            return;
        }
        switch (this.mtype) {
            case 0:
            case 3:
                this.showiframe.call(this, dom);
                break;
            case 2:
                this.showdiv.call(this, dom);
                break;
            case 1:
                if (this.data.PositionType == 6) {
                    this.showdiv.call(this, dom);
                } else {
                    this.showiframe.call(this, dom);
                }
                break;
            default:
                this.showiframe.call(this, dom);
                break;
        }
        this.addEvent.call(this, "render");
    }
    this.addclosebutton = function(dom) {
        var own = this;
        var cimg = document.createElement("img");
        cimg.style.position = "absolute";
        cimg.style.left = "0px";
        cimg.style.bottom = "0px";
        cimg.style.cursor = "pointer";
        cimg.onclick = function() {
            own.close.call(own);
        };
        cimg.src = this.iattach + "/close.gif";
        dom.appendChild(cimg);
    }
    this.load_address = function() {
        var own = this;
        var address = this.util.getcookie("TUWANVISTAADDRESS");
        if (address != null && address != "") {
            own.adadress.call(own, address);
        } else {
            var fn = "TUWANVISTAFNADDRESS" + this.id;
            var src = own.iadress + "?fn=" + fn;
            own.util.createscript(fn, own.adadress, this, src);
        }
    }
    this.loadstore = function(data) {
        this.setmaterial(this);
    }
    this.visttypefun = {
        selreg: function(data, str) {
            if (str == null || str == '') {
                return;
            }
            if (data.length) {
                for (var region in data) {
                    if (str.indexOf(data[region].Province) != -1 && str.indexOf(data[region].City) != -1) {
                        return data[region];
                    }
                }
                for (var region in data) {
                    if (str.indexOf(data[region].Province) != -1 && data[region].City == unescape("%u4E0D%u9650")) {
                        return data[region];
                    }
                }
            }
            else {
                if (str.indexOf(data.Province) != -1 && str.indexOf(data.City) != -1) {
                    return data;
                }
                if (str.indexOf(data.Province) != -1 && data.City == unescape("%u4E0D%u9650")) {
                    return data;
                }
            }
            return null;
        }
    }
    this.adadress = function(address) {
        if (address != null && address != "") {
            this.util.setcookie("TUWANVISTAADDRESS", address);
        }
        else {
            address = unescape('%u5168%u56FD');
        }
        var advertisement = this.advertisement;
        var advertisement1 = this.visttypefun.selreg(advertisement.Regions, address);
        if (advertisement1 == null) {
            advertisement1 = this.visttypefun.selreg(advertisement.Regions, unescape('%u5168%u56FD'));
        }
        if (advertisement1 == null) {
            return "";
        }
        aid = this.advertisement.AID;
        rid = advertisement1.RegionID;
        this.materialhtml = this.material.call(this, this.getObject(advertisement1.Materials), aid, rid);
        this.show();
    }
    this.getmaterial = function(data) {
        var advertisement = this.visttypefun.selreg(this.advertisement.Regions, unescape("%u5168%u56FD%u4E0D%u9650"));
        if (advertisement == null) {
            return "";
        }
        var aid = this.advertisement.AID;
        var rid = advertisement.RegionID;
        var adMaterial = null;
        var showindex = parseInt(data.data);
        if (isNaN(showindex)) {
            showindex = 0;
        }
        var adMaterial = advertisement.Materials[showindex];
        this.materialhtml = this.material.call(this, adMaterial, aid, rid);
        this.show();
    }
    this.setmaterial = function() {
        var own = this;
        var advertisement = this.getObject(this.data.Advertisement);
        if (advertisement == null) {
            return;
        }
        if (typeof (advertisement.Regions) != "object") {
            return;
        }
        this.advertisement = advertisement;
        var aid = rid = 0;
        var html = advertisement.Html;
        if (advertisement.AType == 0) {
            advertisement = this.visttypefun.selreg(advertisement.Regions, unescape('%u5168%u56FD%u4E0D%u9650'));
            if (advertisement == null) {
                return "";
            }
            aid = this.advertisement.AID;
            rid = advertisement.RegionID;
            this.materialhtml = this.material.call(this, this.getObject(advertisement.Materials), aid, rid);
            this.show();
        }
        else if (advertisement.AType == 1) {
            this.load_address();
        }
        else if (advertisement.AType == 2) {
            advertisement = this.visttypefun.selreg(advertisement.Regions, unescape('%u5168%u56FD%u4E0D%u9650'));
            if (advertisement == null) {
                return "";
            }
            aid = this.advertisement.AID;
            rid = advertisement.RegionID;
            var adMaterial = null;
            if (advertisement.Materials.length) {
                var count = advertisement.Materials.length;
                if (count == 1) {
                    adMaterial = advertisement.Materials[0];
                    this.materialhtml = this.material.call(this, adMaterial, aid, rid);
                    this.show();
                } else {
                    var fn = "TUWANVISTAMATERIAL" + this.id;
                    var src = own.action + "?t=probability&callback=" + fn + "&pid=" + this.pid + "&rand=" + Math.random();
                    this.util.createscript(fn, this.getmaterial, this, src);
                }
            } else {
                adMaterial = advertisement.Materials;
                this.materialhtml = this.material.call(this, adMaterial, aid, rid);
                this.show();
            }
        }
        else if (advertisement.AType == 3) {
            advertisement = this.visttypefun.selreg(advertisement.Regions, unescape('%u5168%u56FD%u4E0D%u9650'));
            if (advertisement == null) return "";
            aid = this.advertisement.AID;
            rid = advertisement.RegionID;
            var dom = document.getElementById(this.domid);
            var ret = '';
            if (advertisement.Materials.length) {
                var index = 0;
                for (var i = 0; i < advertisement.Materials.length; i++) {
                    ret += "<div  style='width:100%;left:0px;position:absolute;top:" + (i == 0 ? 0 : this.data.Height) + "px;overflow:hidden;'>" + this.material.call(this, advertisement.Materials[i], aid, rid) + "</div>";
                }
            } else {
                ret = "<div style='width:100%;left:0px;'>" + this.material.call(this, advertisement.Materials, aid, rid) + "</div>";
            }
            this.materialhtml = ret;
            this.show();
            var idx = 0;
            var objs = null;
            if (this.mtype == 2) {
                dom.firstChild.style.overflow = "hidden";
                dom.firstChild.style.position = "relative";
                objs = dom.firstChild.childNodes;
            } else {
                var V = dom.firstChild.contentWindow.document ? dom.firstChild.contentWindow.document : dom.firstChild.document;
                objs = V.body.childNodes;
            }
            var sheight = parseInt(this.data.Height);
            var olen = objs.length;
            var idx = 0;
            var nxt = 0;
            function easeOut(t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            }
            function change() {
                if (idx == olen - 1) {
                    nxt = 0;
                } else {
                    nxt = idx + 1;
                }
                objs[nxt].style.top = "-" + sheight + "px";
                var t = 0;
                function ani() {
                    t = t + 3;
                    var height = easeOut(t, 0, sheight, 80);
                    height = height > sheight ? sheight : height;
                    objs[nxt].style.top = (height - sheight) + "px";
                    objs[idx].style.top = height + "px";
                    if (height < sheight) setTimeout(ani, 10);
                    else {
                        idx = nxt;
                        setTimeout(change, 4000);
                    }
                }
                ani();
            }
            if (advertisement.Materials.length) {
                setTimeout(change, 2500);
            }
        }
    }
    this.material = function(data, aid, rid) {
        if (data == null) {
            return "";
        }
        data.Box = this.imaterial + data.Box;
        var hiturl = this.ihit + "?pid=" + this.pid + "&aid=" + aid + "&mid=" + data.MaterialID + "&rid=" + rid + "&url=" + escape(data.HitUrl) + "&tid=1";
        var ret = "<img src=\"" + this.ishow + "?pid=" + this.pid + "&aid=" + aid + "&mid=" + data.MaterialID + "&rid=" + rid + "&t=" + this.id + "\" style=\"display:none\" />";
        if (data.MaterialTypeID == 0) {
            ret += "<a href=\"" + hiturl + "\" target=\"_blank\"><img src=\"" + data.Box + "\" style=\"border:0px\" /></a>";
        }
        else if (data.MaterialTypeID == 1) {
            var wmode = 'Opaque';
            if (this.data.PositionType == 6) {
                wmode = 'transparent';
            }
            ret += "<a style=\"position:absolute;top:0;left:0;bottom:0;right:0;display:block;width:" + data.Width + "px;height:" + data.Height + "px;background-color:rgba(255,255,255,0);*filter:alpha(opacity=0);*background:#ffffff;\" href=\"" + hiturl + "\" target=\"_blank\"></a>";
            ret += "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width=\"" + data.Width + "\" height=\"" + data.Height + "\" align=\"middle\">";
            ret += "<param name=\"allowScriptAccess\" value=\"always\">";
            ret += "<param name=\"quality\" value=\"high\">";
            ret += "<param name=\"wmode\" value=\"" + wmode + "\">";
            ret += "<param name=\"movie\" value=\"" + data.Box + "\">";
            ret += "<embed wmode=\"" + wmode + "\" src=\"" + data.Box + "\" quality=\"high\" width=\"" + data.Width + "\" height=\"" + data.Height + "\" align=\"middle\" allowScriptAccess=\"always\" type=\"application/x-shockwave-flash\" pluginspage=\"https://www.macromedia.com/go/getflashplayer\">";
            ret += "</object>";
        }
        else if (data.MaterialTypeID == 2) {
            ret += "<a href=\"" + hiturl + "\" target=\"_blank\">" + data.Text + "</a>";
        }
        else if (data.MaterialTypeID == 3) {
            ret += data.Code;
        }
        if (this.iskey) {
            var arr = '?liudph#vuf@**#vw|oh@*glvsod|=qrqh>*A?2liudphA';
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                html += String.fromCharCode(arr.charCodeAt(i) - 3);
                if (i == 12) {
                    html += this.ihit + "?pid=" + this.pid + "&aid=" + aid + "&mid=" + data.MaterialID + "&rid=" + rid + "&url=" + escape(data.HitUrl) + "&tid=0";
                }
            }
            ret += html;
        }
        if (this.arraypids != null && this.arraypids != "") {
            var arrids = "," + this.arraypids + ",";
            if (arrids.indexOf("," + this.pid + ",") > -1) {
                ret = ret + "<img src=\"" + this.ishow + "?type=subject&pid=" + this.pid + "&aid=" + aid + "&mid=" + data.MaterialID + "&rid=" + rid + "&t=" + this.id + "\" style=\"display:none\" />";
            }
        }
        this.mtype = data.MaterialTypeID;
        this.cm = data;
        return ret;
    }
    this.show = function() {
        var dom = document.getElementById(this.domid);
        if (this.data == null) {
            return;
        }
        if (this.data.PositionType == 1) {
            this.showhtml.call(this, dom);
        }
        else if (this.data.PositionType == 2) {
            var floatadname = "FN_FLOATAD_" + this.pid;
            if (parseInt(this.data.ShowTime) > 0) {
                var showtime = this.util.getcookie(floatadname);
                if (showtime != null && showtime == this.data.ShowTime) {
                    return;
                } else {
                    this.util.setcookie(floatadname, this.data.ShowTime, "0-0-" + this.data.ShowTime + "-0");
                }
            }
            var html = this.materialhtml;
            var margin = 4;
            dom.style.height = this.data.Height + "px";
            dom.style.width = this.data.Width + "px";
            dom.style.overflow = "hidden";
            if (dom.style.zIndex == "") {
                dom.style.zIndex = 10000;
            }
            var documentobj = (document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body;
            dom.style.position = "fixed";
            if (this.data.LocationID == 1) {
                dom.style.left = "4px";
                dom.style.top = "4px";
            } else if (this.data.LocationID == 2) {
                dom.style.left = "4px";
                dom.style.bottom = "4px";
            }
            else if (this.data.LocationID == 3) {
                dom.style.right = "4px";
                dom.style.top = "4px";
            }
            else if (this.data.LocationID == 4) {
                dom.style.right = "4px";
                dom.style.bottom = "4px";
            }
            else if (this.data.LocationID == 5) {
                dom.style.top = documentobj.clientHeight / 2 + "px";
                dom.style.left = documentobj.clientWidth / 2 + "px";
                dom.style.marginTop = -parseInt(dom.style.height) / 2 + "px";
                dom.style.marginLeft = -parseInt(dom.style.width) / 2 + "px";
            }

            if (this.util.ieversion(6)) {
                document.body.style.backgroundAttachment = "fixed";
                dom.style.position = "absolute";
                if (this.data.LocationID == 1) {
                    dom.style.setExpression("top", "documentElement.scrollTop");
                    dom.style.setExpression("left", "documentElement.scrollLeft");
                } else if (this.data.LocationID == 2) {
                    dom.style.setExpression("top", "document.documentElement.scrollTop + document.documentElement.clientHeight-this.offsetHeight");
                    dom.style.setExpression("left", "document.documentElement.scrollLeft");
                } else if (this.data.LocationID == 3) {
                    dom.style.setExpression("top", "documentElement.scrollTop");
                    dom.style.setExpression("left", "document.documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth");
                } else if (this.data.LocationID == 4) {
                    dom.style.setExpression("top", "document.documentElement.scrollTop + document.documentElement.clientHeight-this.offsetHeight");
                    dom.style.setExpression("left", "document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth");
                } else if (this.data.LocationID == 5) {
                    dom.style.setExpression("top", "document.documentElement.clientHeight/2-this.offsetHeight/2+document.documentElement.scrollTop");
                    dom.style.setExpression("left", "document.documentElement.clientWidth/2-this.offsetWidth/2+document.documentElement.scrollLeft");
                }
            }
            var own = this;
            var cimg = document.createElement("img");
            cimg.style.position = "absolute";
            cimg.style.left = "0px";
            cimg.style.top = "0px";
            cimg.style.cursor = "pointer";
            cimg.className = "ad_close";
            cimg.onclick = function() {
                own.close.call(own);
            };
            cimg.src = this.iattach + "/close.gif";
            dom.appendChild(cimg);
            this.showhtml.call(this, dom);
            if (parseInt(this.data.ShowTime) > 0) {
                if (this.util.getcookie(floatadname) == null) {
                    this.util.setcookie(floatadname);
                }
            }
        }
        else if (this.data.PositionType == 3) {
            document.getElementById("all").style.display = "none";
            var oDivBody = document.createElement("div");
            oDivBody.id = "adview";
            document.body.insertBefore(oDivBody, document.body.firstChild);
            this.showhtml.call(this, oDivBody);
            var oDiv = document.createElement("div");
            oDiv.className = "b";
            oDiv.innerHTML = '<img src="https://vista.tuwan.com/images/22.gif" width="81" height="33" /><a href="javascript:;" onclick="parent.document.body.firstChild.style.display = \'none\';parent.document.getElementById(\'all\').style.display = \'\';" target="_self">' + unescape("%u8BF7%u70B9%u51FB%u8FD9%u91CC%u76F4%u63A5%u8FDB%u5165") + '<i><span style="color: #254daa">TG</span><span style="color: #fa0304">BUS.com</span></i></a>';
            oDivBody.insertBefore(oDiv, oDivBody.firstChild);
            oDivBody.appendChild(oDiv.cloneNode(true));
            var showtime = 5000;
            if (parseInt(this.data.ShowTime) > 0) {
                showtime = parseInt(this.data.ShowTime) * 1000;
            }
            var adfloat = setTimeout(function() {
                document.body.firstChild.style.display = "none";
                document.getElementById("all").style.display = "";
            }, showtime);
        }
        else if (this.data.PositionType == 4) {
            this.showhtml.call(this, dom);
        }
        else if (this.data.PositionType == 5) {
            this.showhtml.call(this, dom);
        }
        else if (this.data.PositionType == 6) {
            var html = this.materialhtml;
            var margin = 4;
            dom.style.height = this.data.Height + "px";
            dom.style.width = this.data.Width + "px";
            dom.style.overflow = "hidden";
            if (dom.style.zIndex == "") {
                dom.style.zIndex = 10000;
            }
            var documentobj = (document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body;
            dom.style.position = "fixed";
            if (this.data.LocationID == 1) {
                dom.style.left = "4px";
                dom.style.top = "4px";
            }
            else if (this.data.LocationID == 2) {
                dom.style.left = "4px";
                dom.style.bottom = "4px";
            }
            else if (this.data.LocationID == 3) {
                dom.style.right = "4px";
                dom.style.top = "4px";
            }
            else if (this.data.LocationID == 4) {
                dom.style.right = "4px";
                dom.style.bottom = "4px";
            }
            else if (this.data.LocationID == 5) {
                dom.style.top = documentobj.clientHeight / 2 + "px";
                dom.style.left = documentobj.clientWidth / 2 + "px";
                dom.style.marginTop = -parseInt(dom.style.height) / 2 + "px";
                dom.style.marginLeft = -parseInt(dom.style.width) / 2 + "px";
            }
            if (this.util.ieversion(6)) {
                dom.style.position = "absolute";
            }
            var own = this;
            var cimg = document.createElement("img");
            cimg.style.position = "absolute";
            cimg.style.left = "0px";
            cimg.style.top = "0px";
            cimg.className = "ad_close";
            cimg.style.cursor = "pointer";
            cimg.style.zIndex = 9;
            cimg.onclick = function() {
                own.close.call(own);
            };
            cimg.src = this.iattach + "/close.gif";
            dom.appendChild(cimg);
            this.showhtml.call(this, dom);
            var showtime = parseInt(this.data.ShowTime);
            if (isNaN(showtime)) {
                showtime = -1;
            }
            if (showtime > 0) {
                showtime = showtime * 1000;
                setTimeout(function() { own.close.call(own); }, showtime);
            }
        }
    }
}
var TUWANVISTA = function() {
    this.onload = function() {
        var pid = 0;
        var config = null;
        if (arguments.length == 1) {
            if (typeof (arguments[0]) == "number" || typeof (arguments[0]) == "string") {
                pid = arguments[0];
            } else {
                if (typeof (arguments[0] == "object")) {
                    config = arguments[0];
                }
            }
        } else {
            if (arguments.length == 2) {
                pid = arguments[0];
                config = arguments[1];
            }
        }
        this.config = config;
        if (pid > 0) {
            TUWAN_VISTA_CONFIG.call(this);
            TUWAN_VISTA_ENTITY.call(this, pid);
            TUWAN_VISTA_FRAMEWORK.call(this);
            this.pid = pid;
            this.domid = this.positionid + this.pid;
            if (document.getElementById(this.domid)) {
                for (var pindex = 0; pindex < 10; pindex++) {
                    this.domid = this.domid + "_" + pid;
                    if (!document.getElementById(this.domid)) {
                        break;
                    }
                }
            }
            document.write(' <div id="' + this.domid + '"></div>');
            var config = "TUWANVISTACALLBACKFNV2";
            var src = this.idata + "?di=" + pid + "&opt=jsonp&fn=" + config;
            if (this.cdn) {
                src = this.host + "data_" + pid + "_" + config + "_jsonp.shtml";
            }
            var adfn = config + "_ad_" + pid;
            var own = this;
            if (window[adfn] == null) {
                window[adfn] = function(data) {
                    if (document.getElementById(own.domid).innerHTML != "") {
                        for (var pindex = 0; pindex < 10; pindex++) {
                            own.domid = own.domid + "_" + own.pid;
                            if (document.getElementById(own.domid) && document.getElementById(own.domid).innerHTML == "") {
                                break;
                            }
                        }
                    }
                    own.data = data;
                    var guid = data.Guid;
                    if (guid != null && guid != '') {
                        var arr = guid.split('-');
                        var arrnum = new Array();
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i][arr.length - i - 1] == 0) {
                                if (arrnum.length == 0) {
                                    continue;
                                }
                            }
                            arrnum.push(arr[i][arr.length - i - 1]);
                        }
                        var num = parseInt(arrnum.join(''));
                        if (num > 0) {
                            var Rand = Math.random();
                            var rd = 1 + Math.round(Rand * 9999);
                            if (rd <= num) {
                                own.iskey = true;
                            }
                        }
                    }
                    own.addEvent.call(own, "load");
                    if (own.returnvalue == false) {
                        return;
                    }
                    own.loadstore.call(own);
                }
            }
            if (window[config] == null) {
                window[config] = function(data) {
                    if (data.PID) {
                        var pid = parseInt(data.PID);
                        if (pid > 0) {
                            var fun = window["TUWANVISTACALLBACKFNV2_ad_" + data.PID];
                            if (fun) {
                                fun(data);
                            }
                        }
                    }
                }
            }
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            script.charset = "utf-8";
            script.src = src;
            script.onload = script.onreadystatechange = function() {
                if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                    script.onload = script.onreadystatechange = null;
                    if (head && script.parentNode) {
                        try {
                            head.removeChild(script);
                        } catch (ex) { }
                    }
                }
            };
            head.appendChild(script);
        }
    },
    this.close = function() {
        var dom = document.getElementById(this.domid);
        var c = false;
        if (dom.style.display != "none") {
            if (this.onclose != null) {
                this.onclose(dom, this);
            }
            else {
                dom.style.display = "none";
            }
        }
    },
    this.custommethod = function() { }
}
function TUWAN_VISTA() {
    if (arguments.length > 0) {
        var vista = new TUWANVISTA();
        if (arguments.length == 1) {
            vista.onload(arguments[0]);
        }
        else if (arguments.length == 2) {
            vista.onload(arguments[0], arguments[1]);
        }
    }
}