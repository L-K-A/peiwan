<<<<<<< HEAD
(function (win, doc, $) {
    function message() {
    }

    var _message = message.prototype;
    _message.init = function () {
        this.createStyle();
        setInterval(requestMessage, 5000);
    }
    _message.createStyle = function () {
        var msgStyle = '<style>.message-main{position:fixed;width:340px;height:210px;right:5px;bottom:5px;border:solid 1px #ff9d3e;background:#fff;border-radius:5px}.message-main .message-title{padding:0;margin:0;height:30px;line-height:30px;text-indent:10px;font-size:14px;background:#fdab23;text-align:center;font-weight:bold}.message-main .message-title a.message-close{height:30px;width:30px;line-height:30px;float:right}.message-main .message-title a.message-close img{margin-top:10px; margin-right:10px;}.message-main .message-title a.message-mymsg{color:#333;text-decoration:none}.message-main .message-biaoti{padding:0;margin:0;text-align:center;font-size:14px;padding-top:16px}.message-main .message-hongbao-thumb{width:160px;height:160px;float:left;margin-left:10px;border-radius:5px;overflow:hidden}.message-main .message-hongbao-content{float:left;width:170px;height:160px;position:relative}.message-main .message-hongbao-thumb img{width:100%;height:100%}.message-main .message-content{padding:0 5px;font-size:14px;line-height:24px;margin:0;word-wrap:break-word;word-break:break-all;}.message-main .message-content a{text-decoration:none;color:#e71935;font-size:14px}.message-main .message-detail{font-size:14px;text-align:center;position:absolute;bottom:0;width:100%;padding:0;margin:0}.message-main .message-detail a{display:inline-block;color:#fff;background:#fdab23;width:120px;height:32px;line-height:32px;text-decoration:none;font-size:14px;border-radius:3px}.message-main .message-sendtime{font-size:12px;line-height:0;color:#999;font-weight:lighter}.message-main a.message-goteacher-detail{text-decoration:none;color:red;font-size:14px}</style>';
        var hongbaoStyle = '<style>.message-hongbao{position:fixed;width:340px;height:210px;right:5px;bottom:5px;border:solid 1px #ff9d3e;background:#fff;border-radius:5px}.message-hongbao .message-title{padding:0;margin:0;height:30px;line-height:30px;text-indent:10px;font-size:14px;background:#fdab23;text-align:center;font-weight:bold}.message-hongbao .message-title a.message-close{height:30px;width:30px;line-height:30px;float:right}.message-hongbao .message-title a.message-close img{margin-top:10px; margin-right:10px;}.message-hongbao .message-title a.message-mymsg{color:#333;text-decoration:none}.message-hongbao .message-biaoti{padding:0;margin:0;text-align:center;font-size:14px;padding-top:16px}.message-hongbao .message-hongbao-thumb{width:160px;height:160px;float:left;margin-left:10px;border-radius:5px;overflow:hidden}.message-hongbao .message-hongbao-content{float:left;width:170px;height:160px;position:relative}.message-hongbao .message-hongbao-thumb img{width:100%;height:100%}.message-hongbao .message-content{padding:0 5px;font-size:14px;line-height:24px;margin:0}.message-hongbao .message-content a{text-decoration:none;color:#e71935;font-size:14px}.message-hongbao .message-detail{font-size:14px;text-align:center;position:absolute;bottom:0;width:100%;padding:0;margin:0}.message-hongbao .message-detail a{display:inline-block;color:#fff;background:#fdab23;width:120px;height:32px;line-height:32px;text-decoration:none;font-size:14px;border-radius:3px}.message-hongbao .message-sendtime{font-size:12px;line-height:0;color:#999;font-weight:lighter}</style>';
        $("head").append(msgStyle);
        $("head").append(hongbaoStyle);
        $("body").append('<div id="message_tips" style="display:none;position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 5px 20px; background: rgba(51,51,51,0.96);color: #fff;font-size: 16px; border-radius: 4px;"></div>');
    }

    function createMessageHtml() {
        var html = '<div class="message-main"><p class="message-title"><span style="color: red;"id="message_main_teachearname">xxx</span>的新消息<a class="message-close"href="javascript:;"><img src="https://res.tuwan.com/templet/play/images/yanwo-close.png"width="10"height="10"></a></p><div style="margin-top: 10px;"><div class="message-hongbao-thumb"><a class="message-goteacher-detail" href="" target="_blank"><img src=""></a></div><div class="message-hongbao-content"><p class="message-content"style="text-indent: 26px;"></p><p class="message-detail"><a href="https://y.tuwan.com/home/msg/"id="message_hongbao_kai" target="_blank">查看消息</a></p></div></div></div>';
        $("body").append(html);
    }

    function createHongbaoHtml() {
        var html = '<div class="message-hongbao"><p class="message-title">有新红包了<a class="message-close"href="javascript:;"><img src="https://res.tuwan.com/templet/play/images/yanwo-close.png"width="10"height="10"></a></p><div style="margin-top: 10px;"><div class="message-hongbao-thumb"><a class="message-goteacher-detail" href="" target="_blank"><img src=""></a></div><div class="message-hongbao-content"><p class="message-content"style="text-indent: 6px;"><span id="message_hongbao_senduser"></span>的红包</p><p class="message-content" style="text-indent: 6px;" id="message_hongbao_content">恭喜发财，大吉大利！</p><p class="message-content">【<a href="javascript:;"id="message_hongbao_jie">点击领取</a>】(未领取的红包，将于48小时后发起退款)</p><p class="message-detail"><a href="javascript:;"id="message_hongbao_kai">拆开红包</a></p></div></div></div>';
        $("body").append(html);
    }

    function requestMessage() {
        $.ajax({
            url: "",
            type: "get",
            dataType: "jsonp",
            success: function (response) {
                if (response) {
                    var result = response.result,
                        message = result.Message,
                        total = result.Total;
                    if (result == "失败") return;

                    if (total > 0) {
                        if (message.length > 0) {
                            var msg = message[0],
                                MessageID = msg["MessageID"],
                                SendID = msg["SendID"],
                                TypeID = msg["TypeID"],
                                Status = msg["Status"];
                            if (Status == 1) return;
                            if (TypeID != 9 && TypeID != 2) return;

                            requestMessageDetail(2, TypeID, MessageID)
                        }
                    }
                }
            }
        })
    }

    function requestMessageDetail(classid, typeid, messageid) {
        var url = "?classid=2&typeid=" + typeid + "&messageid=" + messageid;
        $.ajax({
            url: url,
            type: "get",
            dataType: "jsonp",
            success: function (response) {
                var result = response.result,
                    message = result.Message,
                    total = result.Total;

                if (total > 0) {
                    if (message.length > 0) {
                        var msg = message[0],
                            MessageID = msg["MessageID"],
                            SendID = msg["SendID"],
                            TypeID = msg["TypeID"],
                            Sender = msg["Sender"],
                            Title = msg["Title"],
                            Content = msg["Content"],
                            Status = msg["Status"],
                            Time = new Date(msg["Time"] * 1000);
                        if (Status == 1) return;


                        var year = Time.getFullYear(),
                            month = Time.getMonth() + 1,
                            day = Time.getDate(),
                            hour = Time.getHours(),
                            min = Time.getMinutes(),
                            sec = Time.getSeconds();
                        var _time = (year > 9 ? year : "0" + year) + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) + " " + (hour > 9 ? hour : "0" + hour) + ":" + (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);

                        if ($(".message-main").size() > 0) {
                            $(".message-main").remove();
                        }

                        if ($(".message-hongbao").size() > 0) {
                            $(".message-hongbao").remove();
                        }

                        if (TypeID == 9) {

                            var __content = JSON.parse(response.result.Message[0].Content);
                            var code = __content.code,
                                token = __content.token,
                                price = __content.price,
                                teacherId = __content.SendID;
                            teacherName = __content.name;
                            hbmessage = __content.message;


                            createHongbaoHtml();
                            // $(".message-hongbao .message-biaoti-text").text(Title);
                            $(".message-hongbao #message_hongbao_senduser").html('<a class="message-goteacher-detail" href="https://y.tuwan.com/play/' + teacherId + '/" target="_blank">' + teacherName + '</a>');
                            // $(".message-hongbao .message-sendtime").text(_time);
                            $(".message-hongbao #message_hongbao_content").text(hbmessage.substr(0, 10));

                            //得到头像地址
                            var thumbUrl = getHeadThumb(teacherId);

                            $(".message-hongbao .message-hongbao-thumb img").attr("src", thumbUrl);
                            $(".message-hongbao .message-hongbao-thumb a").attr("href", "/" + teacherId + "/");
                            $(".message-hongbao .message-close").off("click");
                            $(".message-hongbao .message-close").on("click", function () {
                                $(".message-hongbao").hide();
                            })

                            $("#message_hongbao_jie,#message_hongbao_kai").off("click");
                            $("#message_hongbao_jie,#message_hongbao_kai").on("click", function () {

                            });

                            chaiHongbao(token, code, price);

                        } else {

                            var _content = Content.substr(0, 50);
                            if (Content.length > 50) {
                                _content += "..."
                            }


                            createMessageHtml();
                            $(".message-main #message_main_teachearname").html('<a class="message-goteacher-detail" href="https://y.tuwan.com/play/' + SendID + '/" target="_blank">' + Sender + '</a>');
                            $(".message-main .message-content").text(_content);
                            // $(".message-main .message-sendtime").text(_time);

                            var thumbUrl = getHeadThumb(SendID);
                            $(".message-main .message-hongbao-thumb img").attr("src", thumbUrl);
                            $(".message-main .message-hongbao-thumb a").attr("href", "https://y.tuwan.com/play/" + SendID + "/");


                            $(".message-main .message-close").off("click");
                            $(".message-main .message-close").on("click", function () {
                                $(".message-main").hide();
                            })

                        }

                        new Image().src = "https://app.tuwan.com/Message/ChangeMessage.ashx?messageid=" + messageid + "&action=read"

                    }

                }
            }
        })
    }

    function getHeadThumb(teacherId) {
        var _tid = teacherId + "", ids = [];

        if (_tid.length < 9) {
            var __zeroLen = 9 - _tid.length, __za = [];
            for (var _i = 0; _i < __zeroLen; _i++) {
                __za.push("0")
            }
            __za.push(_tid);
            _tid = __za.join("");
        }

        var _z1 = _tid.substr(0, 3),
            _z2 = _tid.substr(3, 2),
            _z3 = _tid.substr(5, 2),
            _z4 = _tid.substr(7, 2);

        ids.push(_z1)
        ids.push(_z2)
        ids.push(_z3)
        ids.push(_z4)
        var thumbUrl = "/avatar/" + ids.join("/") + "_avatar_large.jpg?random=" + new Date().getTime();
        return thumbUrl;
    }

    function chaiHongbao(token, code, price) {
        $("#message_hongbao_jie, #message_hongbao_kai").off("click");
        $("#message_hongbao_jie, #message_hongbao_kai").on("click", function () {
            $.ajax({
                url: '/?data=duihuan&token=' + token + '&code=' + code + '&format=jsonp',
                dataType: 'jsonp',
                success: function (obj) {
                    if (obj.code == 0) {
                        alert('您已成功领取' + price + "元，已存入您的余额。");
                        hideMessage();
                        // location.href = location.href;
                    } else {
                        alert('领取失败 ' + obj.msg);
                    }
                }
            })
        })
    }

    function hideMessage() {
        $(".message-main").hide();
        $(".message-hongbao").hide();
    }

    function showTips(text) {
        $("#message_tips").text(text);
        $("#message_tips").show();
        setTimeout(function () {
            $("#message_tips").hide();
        }, 2000)
    }

    new message().init();

=======
(function(win,doc,$){
	function message(){}
	var _message = message.prototype;
	_message.init = function(){
		this.createStyle();
		setInterval(requestMessage, 5000);
	}
	_message.createStyle = function(){
		var msgStyle = '<style>.message-main{position:fixed;width:340px;height:210px;right:5px;bottom:5px;border:solid 1px #ff9d3e;background:#fff;border-radius:5px}.message-main .message-title{padding:0;margin:0;height:30px;line-height:30px;text-indent:10px;font-size:14px;background:#fdab23;text-align:center;font-weight:bold}.message-main .message-title a.message-close{height:30px;width:30px;line-height:30px;float:right}.message-main .message-title a.message-close img{margin-top:10px; margin-right:10px;}.message-main .message-title a.message-mymsg{color:#333;text-decoration:none}.message-main .message-biaoti{padding:0;margin:0;text-align:center;font-size:14px;padding-top:16px}.message-main .message-hongbao-thumb{width:160px;height:160px;float:left;margin-left:10px;border-radius:5px;overflow:hidden}.message-main .message-hongbao-content{float:left;width:170px;height:160px;position:relative}.message-main .message-hongbao-thumb img{width:100%;height:100%}.message-main .message-content{padding:0 5px;font-size:14px;line-height:24px;margin:0;word-wrap:break-word;word-break:break-all;}.message-main .message-content a{text-decoration:none;color:#e71935;font-size:14px}.message-main .message-detail{font-size:14px;text-align:center;position:absolute;bottom:0;width:100%;padding:0;margin:0}.message-main .message-detail a{display:inline-block;color:#fff;background:#fdab23;width:120px;height:32px;line-height:32px;text-decoration:none;font-size:14px;border-radius:3px}.message-main .message-sendtime{font-size:12px;line-height:0;color:#999;font-weight:lighter}.message-main a.message-goteacher-detail{text-decoration:none;color:red;font-size:14px}</style>';
		var hongbaoStyle = '<style>.message-hongbao{position:fixed;width:340px;height:210px;right:5px;bottom:5px;border:solid 1px #ff9d3e;background:#fff;border-radius:5px}.message-hongbao .message-title{padding:0;margin:0;height:30px;line-height:30px;text-indent:10px;font-size:14px;background:#fdab23;text-align:center;font-weight:bold}.message-hongbao .message-title a.message-close{height:30px;width:30px;line-height:30px;float:right}.message-hongbao .message-title a.message-close img{margin-top:10px; margin-right:10px;}.message-hongbao .message-title a.message-mymsg{color:#333;text-decoration:none}.message-hongbao .message-biaoti{padding:0;margin:0;text-align:center;font-size:14px;padding-top:16px}.message-hongbao .message-hongbao-thumb{width:160px;height:160px;float:left;margin-left:10px;border-radius:5px;overflow:hidden}.message-hongbao .message-hongbao-content{float:left;width:170px;height:160px;position:relative}.message-hongbao .message-hongbao-thumb img{width:100%;height:100%}.message-hongbao .message-content{padding:0 5px;font-size:14px;line-height:24px;margin:0}.message-hongbao .message-content a{text-decoration:none;color:#e71935;font-size:14px}.message-hongbao .message-detail{font-size:14px;text-align:center;position:absolute;bottom:0;width:100%;padding:0;margin:0}.message-hongbao .message-detail a{display:inline-block;color:#fff;background:#fdab23;width:120px;height:32px;line-height:32px;text-decoration:none;font-size:14px;border-radius:3px}.message-hongbao .message-sendtime{font-size:12px;line-height:0;color:#999;font-weight:lighter}</style>';
		$("head").append(msgStyle);
		$("head").append(hongbaoStyle);
		$("body").append('<div id="message_tips" style="display:none;position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 5px 20px; background: rgba(51,51,51,0.96);color: #fff;font-size: 16px; border-radius: 4px;"></div>');
	}

	function createMessageHtml(){
		var html = '<div class="message-main"><p class="message-title"><span style="color: red;"id="message_main_teachearname">xxx</span>的新消息<a class="message-close"href="javascript:;"><img src="https://res.tuwan.com/templet/play/images/yanwo-close.png"width="10"height="10"></a></p><div style="margin-top: 10px;"><div class="message-hongbao-thumb"><a class="message-goteacher-detail" href="" target="_blank"><img src=""></a></div><div class="message-hongbao-content"><p class="message-content"style="text-indent: 26px;"></p><p class="message-detail"><a href="https://y.tuwan.com/home/msg/"id="message_hongbao_kai" target="_blank">查看消息</a></p></div></div></div>';
		$("body").append(html);
	}
	function createHongbaoHtml(){
		var html = '<div class="message-hongbao"><p class="message-title">有新红包了<a class="message-close"href="javascript:;"><img src="https://res.tuwan.com/templet/play/images/yanwo-close.png"width="10"height="10"></a></p><div style="margin-top: 10px;"><div class="message-hongbao-thumb"><a class="message-goteacher-detail" href="" target="_blank"><img src=""></a></div><div class="message-hongbao-content"><p class="message-content"style="text-indent: 6px;"><span id="message_hongbao_senduser"></span>的红包</p><p class="message-content" style="text-indent: 6px;" id="message_hongbao_content">恭喜发财，大吉大利！</p><p class="message-content">【<a href="javascript:;"id="message_hongbao_jie">点击领取</a>】(未领取的红包，将于48小时后发起退款)</p><p class="message-detail"><a href="javascript:;"id="message_hongbao_kai">拆开红包</a></p></div></div></div>';
		$("body").append(html);
	}

	function requestMessage(){
		$.ajax({
			url:"https://app.tuwan.com/Message/GetMessage.ashx?classid=2&index=0&size=1&status=0",
			type:"get",
			dataType: "jsonp",
			success:function(response){
				if(response){							
					var result = response.result,
						message = result.Message,
						total = result.Total;						
					if(result == "失败") return;

					if(total > 0){
						if(message.length>0){
							var msg = message[0],
								MessageID = msg["MessageID"],
								SendID = msg["SendID"],
								TypeID = msg["TypeID"],
								Status = msg["Status"];
								if(Status == 1) return;
								if(TypeID!=9 && TypeID!=2) return;

							requestMessageDetail(2, TypeID, MessageID)
						}								
					}
				}
			}
		})
	}

	function requestMessageDetail(classid, typeid, messageid){
		var url = "https://app.tuwan.com/Message/GetMessage.ashx?classid=2&typeid="+ typeid +"&messageid=" + messageid;
		$.ajax({
			url:url,
			type:"get",
			dataType:"jsonp",
			success:function(response){
				var result = response.result,
						message = result.Message,
						total = result.Total;

				if(total > 0){
					if(message.length>0){
						var msg = message[0],
							MessageID = msg["MessageID"],
							SendID = msg["SendID"],
							TypeID = msg["TypeID"],
							Sender = msg["Sender"],
							Title = msg["Title"],
							Content = msg["Content"],
							Status = msg["Status"],
							Time = new Date(msg["Time"]*1000);
						if(Status == 1) return;
														

						var year = Time.getFullYear(),
							month = Time.getMonth()+1,
							day = Time.getDate(),
							hour = Time.getHours(),
							min = Time.getMinutes(),
							sec = Time.getSeconds();
						var _time = (year>9?year:"0" + year) + "-" + (month>9?month:"0" + month) + "-" + (day>9?day:"0" + day) + " " + (hour>9?hour:"0" + hour) + ":" + (min>9?min:"0" + min) + ":" + (sec>9?sec:"0" + sec);

						if($(".message-main").size()>0){
							$(".message-main").remove();
						}

						if($(".message-hongbao").size()>0){
							$(".message-hongbao").remove();
						}								

						if(TypeID == 9){

							var __content = JSON.parse(response.result.Message[0].Content);
							var code = __content.code,
								token = __content.token,
								price = __content.price,
								teacherId = __content.SendID;
								teacherName = __content.name;
								hbmessage = __content.message;


							createHongbaoHtml();
							// $(".message-hongbao .message-biaoti-text").text(Title);
							$(".message-hongbao #message_hongbao_senduser").html('<a class="message-goteacher-detail" href="https://y.tuwan.com/play/'+ teacherId +'/" target="_blank">'+ teacherName +'</a>');
							// $(".message-hongbao .message-sendtime").text(_time);
							$(".message-hongbao #message_hongbao_content").text(hbmessage.substr(0, 10));

							//得到头像地址
							var thumbUrl = getHeadThumb(teacherId);

							$(".message-hongbao .message-hongbao-thumb img").attr("src", thumbUrl);
							$(".message-hongbao .message-hongbao-thumb a").attr("href", "https://y.tuwan.com/play/"+ teacherId +"/");
							$(".message-hongbao .message-close").off("click");
							$(".message-hongbao .message-close").on("click", function(){
								$(".message-hongbao").hide();
							})

							$("#message_hongbao_jie,#message_hongbao_kai").off("click");
							$("#message_hongbao_jie,#message_hongbao_kai").on("click", function(){

							});

							chaiHongbao(token, code, price);

						}
						else{
							var _content = Content.substr(0, 50);
							if(Content.length>50){
								_content += "..."
							}	

							createMessageHtml();
							$(".message-main #message_main_teachearname").html('<a class="message-goteacher-detail" href="https://y.tuwan.com/play/'+ SendID +'/" target="_blank">'+ Sender +'</a>');
							$(".message-main .message-content").text(_content);
							// $(".message-main .message-sendtime").text(_time);

							var thumbUrl = getHeadThumb(SendID);
							$(".message-main .message-hongbao-thumb img").attr("src", thumbUrl);
							$(".message-main .message-hongbao-thumb a").attr("href", "https://y.tuwan.com/play/"+ SendID +"/");

							$(".message-main .message-close").off("click");
							$(".message-main .message-close").on("click", function(){
								$(".message-main").hide();
							})
						}
						new Image().src="https://app.tuwan.com/Message/ChangeMessage.ashx?messageid="+ messageid +"&action=read"

					}
				}
			}
		})
	}

	function getHeadThumb(teacherId){
		var _tid = teacherId + "",ids=[];
		if(_tid.length<9){
			var __zeroLen = 9-_tid.length, __za=[];
			for(var _i=0;_i<__zeroLen;_i++){
				__za.push("0")
			}
			__za.push(_tid);
			_tid = __za.join("");
		}

		var _z1 = _tid.substr(0, 3),
			_z2 = _tid.substr(3,2),
			_z3 = _tid.substr(5,2),
			_z4 = _tid.substr(7,2);

		ids.push(_z1)
		ids.push(_z2)
		ids.push(_z3)
		ids.push(_z4)
		var thumbUrl = "https://ucavatar.tuwan.com/data/avatar/"+ ids.join("/") +"_avatar_large.jpg?random=" + new Date().getTime();
		return thumbUrl;
	}
	function chaiHongbao(token, code, price){
		$("#message_hongbao_jie, #message_hongbao_kai").off("click");
		$("#message_hongbao_jie, #message_hongbao_kai").on("click", function(){
			$.ajax({
		        url:'https://api.tuwan.com/mobileplay/?data=duihuan&token='+token+'&code='+code+'&format=jsonp',
		        dataType:'jsonp',
		        success:function (obj){
		            if(obj.code==0){
		                alert('您已成功领取' + price + "元，已存入您的余额。");
		                hideMessage();
		                // location.href = location.href;
		            }else{
		                alert('领取失败 '+obj.msg);
		            }
		        }
		    })
		})
	}

	function hideMessage(){
		$(".message-main").hide();
		$(".message-hongbao").hide();
	}
	function showTips(text){
		$("#message_tips").text(text);
		$("#message_tips").show();
		setTimeout(function(){
			$("#message_tips").hide();
		}, 2000)
	}
	new message().init();
>>>>>>> 62f535f901c014b9188b44f6c4b3b6f12f87f396
})(window, document, jQuery);