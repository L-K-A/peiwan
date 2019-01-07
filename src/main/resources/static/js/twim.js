;
if (!Function.prototype.bind) {
    Function.prototype.bind = function() {
        var fn = this,
            args = Array.prototype.slice.call(arguments),
            object = args.shift();
        return function() {
            return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
        }
    }
};
(function(win) {
    var APPKEY = "712eb79f6472f09e9d8f19aecba1cf43";
    // var APPKEY="45c6af3c98409b18a84451215d0bdd6e";
    var DEBUGMODEL = false;
    //公共方法
    var Util = {
        setCookie: function(name, value) {
            var days = 1;
            var exp = new Date();
            exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000 * 30);
            document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
        },
        readCookie: function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        },
        delCookie: function(name) {
            var cval = readCookie(name);
            if (cval != null) {
                document.cookie = name + "=;path=/;expires=" + (new Date(0)).toGMTString();
            }
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    };
    //MD5加密
    var MD5 = function(string) {

        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x, y, z) { return (x & y) | ((~x) & z); }

        function G(x, y, z) { return (x & z) | (y & (~z)); }

        function H(x, y, z) { return (x ^ y ^ z); }

        function I(x, y, z) { return (y ^ (x | (~z))); }

        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        function WordToHex(lValue) {
            var WordToHexValue = "",
                WordToHexValue_temp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        };

        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22;
        var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20;
        var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23;
        var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }

        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

        return temp.toLowerCase();
    };
    //IM操作
    function twIM(eventCallbackObject) {
        this.accid = "";
        this.netcall = null;
        this.beCalledInfo = null;
        this.channelId = "";
        this.netcall = null;
        this.eventCB = eventCallbackObject;
        //是否被叫中
        this.beCalling = false;
        // 是否正忙
        this.busy = false;
        this.netcallAccount = "";



        /*
        	onTuwanNoLogin
        	onconnect 连接成功
        	onDisconnect 连接失败
        	onError 连接错误
        	callAccepted:callAccepted,// 被叫接受的通知
        	callRejected:callRejected,// 被叫拒绝的通知
        	beCalling:beCalling,// 被叫回应主叫自己已经收到了通话请求
        	hangup:hangup,// 挂断
        	callerAckSync:callerAckSync,//其他端已经做了处理
        	onwillreconnect 重连
        	calleeOffline 呼叫时离线
        	callSuccess 呼叫成功等待接电话
        	callingSuccess 对方接成功电话
        	onRejectSuccess 拒绝接电话
        	calleeBusy 通过兔玩接口判断导师繁忙
        	IMcalleeBusy 通过云信判断导师通话中
        	controlSuccess:通知成功
        	callBill 话单
            oncustomdiamondchange//金额有变动时

        	onCancelBeforeAccepted 接通之前取消
        	resetWhenHangup  挂断后清理工作，传入的参数 如果为NULL则为被叫，数字为被叫ID
        	onWillReconnect 断网后尝试重连
        	onTextMessage  消息类型回调

        */
    }

    var fn = twIM.fn = twIM.prototype;
    fn.loginYX = function(accid, token) {
        this.initIM(accid, token);
    }
    fn.login = function() {
        var that = this;
        var twcookie = Util.readCookie("Tuwan_Passport");
        if (twcookie) {
            jQuery.ajax({
                type: "get",
                url: "/login?format=jsonp",
                dataType: "jsonp",
                jsonp: "callback",
                success: function(data) {
                    if (data.error == 0) {
                        var accid = data.accid;
                        var token = data.token;
                        Util.setCookie("uid", accid);
                        Util.setCookie("sdktoken", token);
                        this.accid = accid;
                        that.initIM(accid, token);

                    }
                }
            });
        } else {
            if (this.eventCB.onTuwanNoLogin)
                this.eventCB.onTuwanNoLogin();
        }
    }

    fn.initIM = function(accid, token) {
        console.log("accidaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", accid)
        console.log("token11111111111111111111111111111", token)
        var that = this;

        function _onConnect() {
            console.log("connenct success")
            if (that.eventCB.onConnect) {
                that.eventCB.onConnect(accid);
            }


            // console.info(that.initNIM);
            that.initNIM();
        }

        function _onDisconnect(obj) {
            console.info("onDisconnect------------------");
            if (that.eventCB.onDisconnect)
                that.eventCB.onDisconnect(obj);

        }

        function _onError() {
            if (that.eventCB.onError)
                that.eventCB.onError(obj);

        };

        function _onWillReconnect() {
            console.info("onWillReconnect------------------");
            if (that.eventCB.onWillReconnect)
                that.eventCB.onWillReconnect(obj);

        };

        function _onupdatesession(session) {
            console.info("------ygb----onupdatesession---");
            if (that.eventCB.onupdatesession)
                that.eventCB.onupdatesession(session);
        }

        function _onsessions(sessions) {
            if (that.eventCB.onSessions)
                that.eventCB.onSessions(sessions);
        }

        function _onmsg(msg) {
            console.info("------wfz----msg---");
            console.info(msg);
            // 自定义通知
            if (/notification/i.test(msg.type)) {
                // 取出消息体
                const content = msg.attach
                // 判断消息体类型
                if (/netcallbill/i.test(content.type)) {
                    if (that.eventCB.callBill) {
                        that.eventCB.callBill(msg)
                    }
                }
                if (/cancelNetcallBeforeAccept/i.test(content.type)) {
                    if (that.eventCB.onCancelBeforeAccepted) {
                        that.eventCB.onCancelBeforeAccepted(msg)
                    }
                }
            } else if (/custom/i.test(msg.type)) {
                var content = JSON.parse(msg.content);
                var ctype = content.type;
                if (ctype == 6) { //其它地方9消费后金额变动
                    // content.to = msg.to;
                    if (that.eventCB.oncustomdiamondchange)
                        that.eventCB.oncustomdiamondchange(content);
                }
            } else if (/text/i.test(msg.type)) {
                if (that.eventCB.onTextMessage) {
					that.eventCB.onTextMessage(msg)
                }
            }


        }


        window.nim = new SDK.NIM({
            //控制台日志，上线时应该关掉
            debug: DEBUGMODEL, // || { api: 'info', style: 'font-size:14px;color:blue;background-color:rgba(0,0,0,0.1)' },
            appKey: APPKEY,
            account: accid,
            token: token,
            syncSessionUnread: true,
            //连接
            onconnect: _onConnect,
            ondisconnect: _onDisconnect,
            onerror: _onError,
            onwillreconnect: _onWillReconnect,
            onmsg: _onmsg,
			onsessions: _onsessions,
			onupdatesession: _onupdatesession,
            //系统通知
            onsysmsg: function() { console.info("onsysmsg"); },
            onofflinesysmsgs: function() { console.info("onofflinesysmsgs"); },
            onroamingsysmsgs: function() { console.info("onroamingsysmsgs"); },
            onupdatesysmsg: function() { console.info("onupdatesysmsg"); },
            oncustomsysmsg: function() { console.info("oncustomsysmsg"); },
            onofflinecustomsysmsgs: function() { console.info("onofflinecustomsysmsgs"); }

            // // 多端登录变化
            // onloginportschange: onLoginPortsChange.bind(this),
            // //个人信息
            // onmyinfo: onMyInfo.bind(this),
            // onupdatemyinfo: onMyInfo.bind(this),
        });

    }

    fn.initNIM = function() {
        console.info("initIM-------0---");
        var NIM = window.SDK.NIM;
        var Netcall = window.WebRTC;

        NIM.use(Netcall);
        // NIM.use(window.WhiteBoard);

        this.netcall = WebRTC.getInstance({
            nim: window.nim,
            // container:document.getElementById("canvas"),
            // remoteContainer: $("#rtcDiv")[0],
            debug: DEBUGMODEL
        });


        this.initWebRTCEvent();
    }

    fn.initWebRTCEvent = function() {
        var that = this;

        var netcall = this.netcall;

        this.netcall.on("callAccepted", function(obj) { // 被叫接受的通知
            console.info("callAccepted");
            this.onCallAccepted(obj);
        }.bind(this));
        this.netcall.on("callRejected", function(obj) { // 被叫拒绝的通知
            that.setBecalling(false);
            console.info("callRejected")
            if (that.eventCB.callRejected)
                that.eventCB.callRejected(obj);
        });
        // this.netcall.on('signalClosed', function () {
        // 	console.info("signalClosed");	 

        // });
        this.netcall.on('rtcConnectFailed', function() {
            console.info("rtcConnectFailed");
            this.beCalling = false;
        }.bind(this));
        this.netcall.on("devices", function(obj) {
            console.info("devices");
            // console.info(obj);
        });
        this.netcall.on("deviceStatus", function(obj) {
            console.info("deviceStatus");
        });
        this.netcall.on("beCalling", function(obj) {


            // 被叫回应主叫自己已经收到了通话请求

            that.netcall.control({
                channelId: that.channelId,
                command: Netcall.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
            })


            //
            if (obj.channelId === that.channelId) return;
            if (that.netcall.calling || that.beCalling) {
                var tmp = { command: Netcall.NETCALL_CONTROL_COMMAND_BUSY };
                tmp.channelId = obj.channelId;

                that.log("通知呼叫方我方不空");
                that.netcall.control(tmp);

                that.netcall.response({
                    accepted: false,
                    beCalledInfo: obj
                }).then(function() {

                    that.beCalling = false;
                    console.log('拒绝：通知呼叫方我方不空成功')
                }, function() {
                    console.log('拒绝：通知呼叫方我方不空失败')
                })

                return;
            }
            that.beCalling = true;
            that.beCalledInfo = obj;
            that.channelId = obj.channelId;
            if (that.eventCB.beCalling)
                that.eventCB.beCalling(obj);

            that.netcallAccount = obj.account;

            // 
            // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则通知对方忙并拒绝通话
            // 	if (!that.netcall.calling && !that.beCalling) {

            // 	  that.beCalling = true
            // 	  that.beCalledInfo = obj
            // that.channelId = obj.channelId;
            // if(that.eventCB.beCalling)
            // 	that.eventCB.beCalling(obj); 	

            // 	} else {

            // 	  if (that.netcall.calling) {
            // 	    that.busy = netcall.notCurrentChannelId(obj)
            // 	  } else if (that.beCalling) {
            // 	    that.busy = that.beCalledInfo.channelId !== that.channelId
            // 	  }
            // 	  if (that.busy) {
            // 	    that.netcall.control({
            // 	      channelId:that.channelId,
            // 	      command: Netcall.NETCALL_CONTROL_COMMAND_BUSY
            // 	    })
            // 	    that.beCalling=false;
            // 	    // 拒绝通话
            // 	    //  拨打方来做 避免收到拒绝消息
            // 	    // netcall.response({
            // 	    //   accepted: false,
            // 	    //   beCalledInfo: obj
            // 	    // })
            // 	  }
            // 	}    	
        });
        this.netcall.on("control", function(obj) {

            console.info("netcall-control", obj);

            switch (obj.type) {

                // 对方正忙
                case Netcall.NETCALL_CONTROL_COMMAND_BUSY:
                    if (that.eventCB.IMcalleeBusy) {
                        that.eventCB.IMcalleeBusy(obj);
                    }
                    break;
                    //被叫表示自己已经收到请求的回调（用于通知发送方开始播放提示音）
                case Netcall.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED:
                    if (that.eventCB.controlSuccess) {
                        that.eventCB.controlSuccess(obj);
                    }
                    break;

                default:
                    console.log(obj);

            }


            console.info("control");
        });
        this.netcall.on("hangup", function(obj) { //// 挂断
            console.info("对方挂断hangup");
            console.info(obj);



            if (that.eventCB.hangup)
                that.eventCB.hangup(obj);
            this.setDeviceVideoIn(false);
            this.setDeviceAudioIn(false);
            this.setDeviceAudioOut(false);
            that.beCalling = false;

        }.bind(this));
        this.netcall.on("heartBeatError", function(obj) {
            console.info("heartBeatError");
        });
        this.netcall.on("callerAckSync", function(obj) { //其他端已经做了处理 
            that.beCalling = false;
            if (that.eventCB.callerAckSync)
                that.eventCB.callerAckSync(obj);
            console.info("callerAckSync");
        });
        this.netcall.on("netStatus", function(obj) {
            console.info("netStatus");
            // console.log("on net status:", obj);
        });
        this.netcall.on("statistics", function(obj) {
            console.info("statistics");
        });
        this.netcall.on("audioVolume", function(obj) {
            console.info("audioVolume");
        });
    }

    fn.setBecalling = function(val) {
        this.beCalling = val;
    }

    fn.call = function(account) {


        // 检测音频功能

        // var checkRtcSupport=rtcSupport.supportWebAudio && rtcSupport.supportGetUserMedia && rtcSupport.supportRTCPeerConnection;

        // if (!checkRtcSupport) {
        //    alert('您使用的浏览器不支持通话，请使用最新版 Chrome、360极速浏览器和QQ浏览器进行通话')
        //     return;
        // }	

        var that = this;

        this.netcallAccount = account;

        that.netcall.call({
            type: WebRTC.NETCALL_TYPE_AUDIO,
            account: account,
            pushConfig: {
                enable: true,
                needBadge: true,
                needPushNick: true,
                pushContent: '',
                custom: '',
                pushPayload: '',
                sound: '',
            },
            sessionConfig: {
                videoBitrate: 0,
                recordVideo: false,
                recordAudio: false,
                highAudio: true
            },
            webrtcEnable: true
        }).then(function() {
            console.info("truecall");
            // this.channelId = this.netcall.channelId;
            // 成功发起呼叫 
            if (that.eventCB.callSuccess)
                that.eventCB.callSuccess();
            //应该设置超时定时器

        }).catch(function(err) {
            // 被叫不在线
            if (err.code === 11001) {
                if (that.eventCB.calleeOffline)
                    that.eventCB.calleeOffline(err, account);
            }
        })



    }

    fn.hangUp = function(channelId) {
        console.info(this.channelId);
        // if(this.channelId)
        // 	this.netcall.hangup(this.channelId);
        // else
        // 	this.netcall.hangup();
        // 	
        // 	

        // 挂断之前拿到被叫ID
        var callee = this.netcall.callee;
        // if(this.netcall.channelId)
        // 	this.netcall.hangup(this.netcall.channelId+"");
        // else
        this.netcall.hangup();
        // if(channelId){
        // 	this.netcall.hangup();
        // }
        // else{
        // 	this.netcall.hangup();
        // }

        this.setBecalling(false);




        var that = this;
        // 清理工作
        if (that.eventCB.resetWhenHangup) {

            console.log(callee);
            that.eventCB.resetWhenHangup(callee);
        }

        // 做清理工作
        //this.netcall.resetWhenHangup()
    }

    fn.calling = function() {
        var that = this;
        this.beCalling = false;
        this.netcall.response({
            accepted: true,
            beCalledInfo: this.beCalledInfo,
            sessionConfig: {
                videoQuality: WebRTC.CHAT_VIDEO_QUALITY_480P,
                videoFrameRate: WebRTC.CHAT_VIDEO_FRAME_RATE_NORMAL,
                videoBitrate: 0,
                recordVideo: false,
                recordAudio: false,
                highAudio: true
            }
        }).then(function() {
            console.log("同意对方音视频请求成功");
            that.beCalling = false;
            if (that.eventCB.callingSuccess)
                that.eventCB.callingSuccess();
            // 加个定时器 处理点击接听了 实际上对面杀进程了，没有callAccepted回调


        }).catch(function(err) {
            if (that.eventCB.callingFailure)
                that.eventCB.callingFailure(err);
            // that.hangup();

        });
    }

    // 对方接受通话 或者 我方接受通话，都会触发
    fn.onCallAccepted = function(obj) {
        var that = this;

        //把正在被呼叫状态改成false
        this.beCalling = false;

        var promise;
        if (obj.type === WebRTC.NETCALL_TYPE_VIDEO) {
            promise = this.setDeviceVideoIn(true);
        } else {
            promise = this.setDeviceVideoIn(false);
        }
        promise.then(function() {
            return this.setDeviceAudioIn(true);
        }.bind(this)).then(function() {
            // this.startLocalStream();
            // this.updateVideoShowSize(true, false);
            this.netcall.setCaptureVolume(255);
        }.bind(this)).then(function() {
            this.log("开始webrtc连接")
            return this.netcall.startRtc();
        }.bind(this)).then(function() {
            this.log("webrtc连接成功")

            if (that.eventCB.callAcceptedAndSuccess)
                that.eventCB.callAcceptedAndSuccess(obj);

            // changeState();
            return this.setDeviceAudioOut(true);
        }.bind(this)).catch(function(e) {
            console.error(e);
            this.log("连接出错");

            if (/webrtc兼容开关/i.test(e)) {
                // minAlert.alert({
                //     type: 'error',
                //     msg: '无法接通!请让呼叫方打开"WebRTC兼容开关"，方可正常通话', //消息主体
                //     confirmBtnMsg: '知道了，挂断',
                //     cbConfirm: this.hangup.bind(this)
                // })
            }
        }.bind(this))


        // 通话时长显示
        // this.startDurationTimer();
        // 关闭被呼叫倒计时
        // this.beCallTimer = null;
    };

    // 取消呼叫
    fn.cancelCalling = function(isClick) {

        this.resetWhenHangup();
    };

    fn.setDeviceVideoIn = function(state) {
        var that = this;
        if (state) {

        } else {
            console.log("关闭摄像头");
            return that.netcall.stopDevice(WebRTC.DEVICE_TYPE_VIDEO).then(function() {
                // 通知对方自己关闭了摄像头
                console.log("关闭摄像头成功，通知对方我方关闭了摄像头");
                window.webrtc.control({
                    command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF
                });

            }.bind(this)).catch(function(e) {
                console.log("关闭摄像头失败");
            }.bind(this));

        }

    }

    fn.setDeviceAudioIn = function(state) {

        if (state) {
            console.log("开启麦克风");
            return this.netcall.startDevice({
                // 开启麦克风输入
                type: WebRTC.DEVICE_TYPE_AUDIO_IN
            }).then(function() {
                console.log("开启麦克风成功，通知对方我方开启了麦克风");
                // 通知对方自己开启了麦克风
                this.netcall.control({
                    command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
                })
                this.netcall.setCaptureVolume(255);
            }.bind(this)).catch(function() {
                console.log("开启麦克风失败");
                alert("开启麦克风失败，请检查浏览器设置或设备");
                // this.log("开启麦克风失败");
                // this.onDeviceNoUsable(Netcall.DEVICE_TYPE_AUDIO_IN);
            }.bind(this));
        } else {
            console.log("关闭麦克风");
            return this.netcall.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_IN) // 关闭麦克风输入
                .then(function() {
                    console.log("关闭麦克风成功，通知对方我方关闭了麦克风");
                    // 通知对方自己关闭了麦克风
                    this.netcall.control({
                        command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF
                    });
                }.bind(this)).catch(function() {
                    console.log("关闭麦克风失败");
                }.bind(this));
        }
    }

    fn.setDeviceAudioOut = function(state) {

        return this.netcall.startDevice({
            type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
        }).then(function() {
            console.log("开启扬声器成功");
        }.bind(this)).catch(function() {
            console.log("开启扬声器失败");
            // this.onDeviceNoUsable(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT);
        }.bind(this));
    }

    //拒绝接听
    fn.reject = function() {
        this.log("拒绝对方音视频通话请求");
        var beCalledInfo = this.beCalledInfo;
        this.netcall.response({
            accepted: false,
            beCalledInfo: beCalledInfo
        }).then(function() {
            this.log("拒绝对方音视频通话请求成功");

            //把正在被呼叫状态改成false
            this.beCalling = false;

            if (this.eventCB.onRejectSuccess)
                this.eventCB.onRejectSuccess();
            this.beCalledInfo = null;
        }.bind(this)).catch(function(err) {
            // 自己断网了
            this.log("拒绝对方音视频通话请求失败");
            console.log("error info:", err);
            this.beCalledInfo = null;
        }.bind(this));
    }

    //事件订阅
    fn.subscribeEvent = function(accid) {
        var subEvent = {
            type: 1,
            accounts: [accid],
            subscribeTime: 2592000,
            sync: true,
            done: subscribeEventDone
        }
        window.nim.subscribeEvent(subEvent);

        function subscribeEventDone(error, obj) {
            console.log('订阅事件' + (!error ? '成功' : '失败'), error, obj);
        }
    }

    fn.log = function() {
        message = [].join.call(arguments, " ");
        console.log("%c" + message, "color: green;font-size:16px;");
    };


    //暴露对外接口
    win.TWAudio = {};
    win.TWAudio.Util = Util;
    win.TWAudio.md5 = MD5;
    win.TWAudio.twIM = twIM;
})(window);

(function($, win) {
    function toast(info, time) {
        time = time || 2000;
        var _toast = $("body").append('<div id="divToast" style="position:fixed;top:0;left:0;padding:20px 100px; background:rgba(3,3,3,0.8);color:#fff;border-radius:5px; font-size:16px;left:50%;top:50%;transform:translate(-50%, -50%);">' + info + '</div>');

        setTimeout(function() {
            $("#divToast").remove();
        }, time);

    }
    win.Toast = toast;
})(jQuery, window);
(function($, win) {
    /*
    *	text:提示信息
    	cancleText 左边按键显示的文字
    	suretext 右边按钮显示的文字
    	sureCallback 点击右边的按钮的回调
    	cancleCallback 点击左边的按钮的回调
    */
    function goDiamond(params) { //(text,cancleText,suretext,sureUrl,sureCallback,cancleCallback){
        var text = params.text || '这里是您的提示信息',
            cancleText = params.cancleText || "取消",
            suretext = params.suretext || "确定",
            sureUrl = params.sureUrl || '',
            sureCallback = params.sureCallback || null,
            cancleCallback = params.cancleCallback || null;

        var asureStr = "";
        if (sureUrl) {
            asureStr = 'target="_blank" href="' + sureUrl + '"';
        } else {
            asureStr = 'href="javascript:;"'
        }

        if ($("#divMask").size() > 0) {
            $("#divMask").remove();
        }

        var html = `<div id="divMask" style="display:none;position: fixed;z-index:99999;left: 0;top: 0;width: 100%;height: 100%;background: rgba(3,3,3,0.8);">
				<div style="background: #fff; font-size: 16px; padding:20px 100px; position: absolute;left: 50%; top: 50%;transform: translate(-50%, -50%); border-radius: 5px" >
					<p style="margin-bottom: 20px; text-align: center; font-size: 18px; " id="divmask-pinfo">` + text + `</p>
					<div style="text-align: center;">
						<span style="cursor:pointer; background: #999; color: #fff;padding:5px 20px; border-radius: 3px; " id="mask-cancle">` + cancleText + `</span>
						<a ` + asureStr + ` style="cursor:pointer;background: #fa6543; color: #fff;padding:5px 20px; border-radius: 3px;margin-left:5px; " id="mask-sure">` + suretext + `</a>
					</div>
				</div>
			</div>`;
        $("body").append(html);

        $("#divMask").show();


        $("#mask-cancle").on("click", function() {
            $("#divMask").hide();
            $("#divMask").remove();
            if (cancleCallback)
                cancleCallback()
        })
        $("#mask-sure").on("click", function() {
            $("#divMask").hide();
            if (sureCallback)
                sureCallback();
        })

    }

    goDiamond.show = function() {
        $("#divMask").remove();
    }
    goDiamond.hide = function() {
        $("#divMask").remove();
    }

    win.TWMask = goDiamond;

})(jQuery, window);
(function(win) {
    function checkRtcBrowser() {
        var pua = navigator.userAgent;
        var test = pua.match(/(chrome)\/(\d+)/i)
        if (!test || /Edge\/([\d.]+)/.test(pua)) return false
        var name = test[1],
            version = test[2];
        return (/chrome/i.test(name) && version > 49 || /firefox/i.test(name) && version > 52)
    }
    var versionSupport = checkRtcBrowser();

    var checkRtcSupport = versionSupport; //&& rtcSupport.supportWebAudio && rtcSupport.supportGetUserMedia && rtcSupport.supportRTCPeerConnection;
    win.isSupport = checkRtcSupport;
})(window)