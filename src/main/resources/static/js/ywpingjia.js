;(function(win,doc,$){
		var pjMaskId = "ywpj_mask";
		var pjMainId = "ywpj_main";
		
		function ywpj(){
			this.createHtml();
			this.initEvent();
			this.starSelectActive = -1;
			this.customTag = "";
			this.sid = 0;
			this.tradeno = "";
			this.teacherId = 0;
			this.gameId = 0;
			this.sumbitSuccessCallback = null;
			//请求Tag

		}
		var _pj = ywpj.prototype;
		_pj.version = '1.0.0';
		_pj.createHtml = function(){
			var style = '<style>#ywpj_mask{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(51,51,51,80);}#ywpj_mask .ywpj-main p,#ywpj_mask .ywpj-main ul{margin:0;padding:0}#ywpj_mask .ywpj-main ul{list-style:none;margin-top:15px}#ywpj_mask .ywpj-main ul li{float:left;width:94px;height:28px;color:#666;font-size:14px;border:solid 1px #e5e5e5;border-radius:28px;text-align:center;line-height:28px;margin-right:20px;margin-bottom:16px;cursor:pointer}#ywpj_mask .ywpj-main ul li.ywpj-tag-select{background:#fff0e3;border:solid 1px #fff0e3;color:#fc831a}#ywpj_mask .ywpj-main .ywpj-tag-custom{color:#fb7330;font-size:14px;text-align:center;border-radius:28px;border:solid 1px #fb7330;width:94px;height:28px;line-height:28px;position:relative;cursor:pointer}#ywpj_mask .ywpj-main .ywpj-tag-custom em{font-style:normal}#ywpj_mask .ywpj-main .ywpj-tag-custom-have{padding-right:16px}#ywpj_mask .ywpj-main .ywpj-tag-custom span{position:absolute;margin-left:4px;font-size:20px;line-height:26px;vertical-align:top;cursor:pointer;right:7px;top:0}#ywpj_mask .ywpj-main{position:absolute;width:580px;height:480px;background:#fff;border-radius:3px;top:50%;left:50%;margin-top:-265px;margin-left:-321px;padding:24px 40px}#ywpj_mask p.ywpj-title{font-size:18px;text-align:center}#ywpj_mask p.ywpj-title-item{border-left:solid 4px #fc831a;height:16px;font-size:14px;line-height:16px;font-weight:bold;text-indent:10px;color:#333}#ywpj_mask p.ywpj-title-item-tags span{float:right;font-weight:normal;background:url(https://res.tuwan.com/templet/play/zhandui/images/changeicon.png?20170920) no-repeat right center;padding-right:20px;cursor:pointer}#ywpj_mask p.ywpj-starts{height:24px;margin-top:15px}#ywpj_mask p.ywpj-starts span{float:left;display:inline-block;width:30px;height:24px;background:url(http://res.tuwan.com/templet/play/index/images/starsbg.png?v=1) no-repeat;cursor:pointer}#ywpj_mask p.ywpj-starts span.star0{background-position:0 0}#ywpj_mask p.ywpj-starts span.star1{background-position:0 -26px}#ywpj_mask p.ywpj-starts span.star2{background-position:-31px -26px}#ywpj_mask p.ywpj-starts span.star3{background-position:-62px -26px}#ywpj_mask p.ywpj-starts span.star4{background-position:-93px -26px}#ywpj_mask p.ywpj-starts span.star5{background-position:-124px -26px}#ywpj_mask .ywpj-main textarea{width:100%;height:32px;border:solid 1px #e5e5e5;border-radius:3px;margin-top:16px;font-size:14px;color:#666}#ywpj_mask .ywpj-main .ywpj-submit{text-align:center;margin-top:30px}#ywpj_mask .ywpj-main .ywpj-submit button{width:142px;height:36px;line-height:36px;font-size:14px;color:#fff;background:#fc831a;border:none;border-radius:3px;cursor:pointer}#ywpj_mask .ywpj-main .ywpj-submit p{font-size:14px;color:#838c9a;margin-top:15px}#ywpj_mask .ywpj-main .ywpj-tag-custom-input{width:280px;position:relative;font-size:12px}#ywpj_mask .ywpj-main .ywpj-tag-custom-input input{border:none;outline:0;height:22px;width:186px;padding:4px 18px;background:#f3f3f3;border-radius:15px;color:#999;font-size:12px}#ywpj_mask .ywpj-main .ywpj-tag-submit-div{display:inline-block;height:30px;line-height:30px;top:0;position:absolute;right:0;background:#fc831a;border-bottom-right-radius:30px;border-top-right-radius:30px;color:#fff}#ywpj_mask .ywpj-main .ywpj-tag-submit-div span{margin:0 10px}#ywpj_mask .ywpj-main .ywpj-tag-submit-div span.ywpj-tag-submit-div-line{display:inline-block;height:14px;background:#fff;width:1px;vertical-align:middle;color:#fff;margin:0}#ywpj_mask .ywpj-custom-hidden{display:none}#ywpj_mask .ywpj-tips{position:absolute;top:50%;left:50%;width:200px;height:30px;line-height:30px;background:rgba(51,51,51,0.9);color:#fff;font-size:14px;text-align:center;border-radius:3px;margin-top:-15px;margin-left:-100px;display:none;opacity:0}#ywpj_mask .ywpj-close{position: absolute;top: 0;right: 0;width: 40px;height: 40px;line-height: 36px;font-size: 30px;color: #d3d3d3;text-align: center;cursor: pointer;}</style>';
			$("head").append(style);
			var html = '<div id="ywpj_mask" style="display:none;"><div class="ywpj-main"id="ywpj_main"><p class="ywpj-title">订单评价</p><p class="ywpj-title-item"style="margin-top: 20px;">选择对导师服务的评分</p><p class="ywpj-starts"><span index="0"class="star0"></span><span index="1"class="star0"></span><span index="2"class="star0"></span><span index="3"class="star0"></span><span index="4"class="star0"></span></p><p class="ywpj-title-item ywpj-title-item-tags"style="margin-top: 22px;">选择对TA的印象<span id="ywpj_change">换一批</span></p><ul></ul><div style="clear: both;"></div><div class="ywpj-tag-custom"><em>+自定义</em><span class="ywpj-custom-hidden">×</span></div><div class="ywpj-tag-custom-input"style="display: none;"><input id="ywpj_tag_input"type="text"maxlength="4"placeholder="输入标签（最多4个字）"/><div class="ywpj-tag-submit-div"><span id="ywpj_custom_btnok"style="cursor: pointer;">确定</span><span class="ywpj-tag-submit-div-line"></span><span id="ywpj_custom_btncancle"style="cursor: pointer;">取消</span></div></div><div style="clear: both;"></div><p class="ywpj-title-item"style="margin-top: 22px;">输入对导师评价</p><textarea id="ywpj_desc"></textarea><div class="ywpj-submit"><button id="ywpj_submit">提交</button><p><label><input name="yupj_niming" type="checkbox">匿名评价</label></p></div><span class="ywpj-close">×</span><div class="ywpj-tips"></div></div></div>';
			$("body").append(html);
		}
		_pj.showTips = function(text){
			if($(".ywpj-tips").css("display")!="none"){
				return;
			}
			$(".ywpj-tips").text(text);
			$(".ywpj-tips").css("display","block");
			$(".ywpj-tips").animate({
				opacity:1
			}, 200, function(){
				_hide();
			});
			function _hide(){
				setTimeout(function(){
					$(".ywpj-tips").animate({
						opacity:0
					}, 200, function(){
						$(".ywpj-tips").css("display","none");
					});
				},2000)
			}
		}
		_pj.initEvent = function(){
			var that = this;
			//星星
			$("#" + pjMainId).on("mouseout", "p.ywpj-starts", function(){
				_selectStars(that.starSelectActive);
			})
			$("#" + pjMainId).on("mouseover", "p.ywpj-starts span", function(e){
				var index = $(this).attr("index");
				_selectStars(index);				
			})
			$("#" + pjMainId).on("click", "p.ywpj-starts span", function(){
				var index = $(this).attr("index");
				that.starSelectActive = index;

			})
			//标签
			$("#" + pjMainId + " ul").on("click","li", function(){

				if($(this).hasClass("ywpj-tag-select")){
					$(this).removeClass("ywpj-tag-select");
				}
				else{
					var _size = $("#" + pjMainId + " ul li[class*='ywpj-tag-select']").size();
					if(_size >=2){
						that.showTips("最多选择2个标签");
						return;
					}
					$(this).addClass("ywpj-tag-select");

				}
			})
			//
			$(".ywpj-tag-custom").on("click",function(){
				if($(this).find("span").css("display")!="none")return;
				$(this).css("display","none");
				$(".ywpj-tag-custom-input").css("display","block");
			})
			$(".ywpj-tag-custom").on("click", "span", function(event){
				event.stopPropagation();
				$(".ywpj-tag-custom").removeClass("ywpj-tag-custom-have");
				$(this).addClass("ywpj-custom-hidden");
				$(".ywpj-tag-custom em").text("+自定义");
				that.customTag = "";
			})
			//
			$("#ywpj_custom_btnok").on("click", function(){
				var value = $.trim($("#ywpj_tag_input").val());
				if(value == ""){
					that.showTips("请输入标签");
					return;
				}
				if(value.length>4){
					that.showTips("最多输入4个字");
					return;
				}
				that.customTag = value;
				$(".ywpj-tag-custom em").text(value);
				$(".ywpj-tag-custom").addClass("ywpj-tag-custom-have");

				$(".ywpj-tag-custom-input").css("display","none");
				$(".ywpj-tag-custom").css("display","block");
				$(".ywpj-tag-custom span").removeClass("ywpj-custom-hidden");

			})
			$("#ywpj_custom_btncancle").on("click", function(){
				$(".ywpj-tag-custom-input").css("display","none");
				$(".ywpj-tag-custom").css("display","block")
			})
			$(".ywpj-close").on("click", function(){
				that.hide();
			})
			//
			$("#ywpj_submit").on("click", function(){
				var desc = $.trim($("#ywpj_desc").val());
				desc = desc.replace(/\n|\r\n/g,"<br />")
				var pingfen = that.starSelectActive*1+1;
				var tags = [];
				$("#" + pjMainId + " ul li[class*='ywpj-tag-select']").each(function(i){
					tags.push($(this).text());
				})
				if(that.starSelectActive == -1){
					that.showTips("请选择一个评分");
					return;
				}
				if(tags.length == 0){
					that.showTips("请至少选择一个标签");
					return;
				}
				if(desc == ""){					
					that.showTips("请对导师进行评价");
					return;
				}
				if(that.customTag != ""){
					tags.push(that.customTag);
				}
				var isChecked = $("#" + pjMainId + " input[name='yupj_niming']:checked").val();
				var comanonymous = 0;
				if(isChecked){
					comanonymous = 1;
				}

				///////////
				var url = "https://y.tuwan.com/m/Order/getAddCommentApi";
				$.ajax({
	                url: url,
	                type: "get",
	                data:"order="+that.tradeno+"&decs="+encodeURI(desc)+"&star="+pingfen+"&type="+comanonymous + "&tag=" + encodeURI(tags.join(",")),
	                dataType: "jsonp",
	                success: function (response){
	                	var error = response.code;
	                	if(error ==0){
	                		that.showTips("评论成功");
	                		setTimeout(function(){
	                			if(that.sumbitSuccessCallback){
	                				that.sumbitSuccessCallback(desc, that.teacherId, that.gameId);
	                			}
	                			that.hide();
	                		},2000)
	                		
	                	}
	                	else{
	                		// var msg = response.msg;
	                		// that.showTips(msg);
	                		that.showTips("评论失败，请稍候再试");
	                	}
	                }
	            })

			})
			//换一批
			$("#ywpj_change").on("click", function(){				
				var _selectTag = [];
				$("#" + pjMainId + " ul li[class='ywpj-tag-select']").each(function(){
					_selectTag.push($(this).text())
				})
				
				requestTag(that.sid, function(data){
					for(var m=0;m<_selectTag.length;m++){					
						for(var n=0;n<data.length;n++){
							if(_selectTag[m] == data[n]){
								data.splice(n, 1);
								break;
							}
						}
					}
					var count=0;

					$("#" + pjMainId + " ul li").each(function(i){
						if($(this).hasClass("ywpj-tag-select")){
							return true;
						}
						if(count<=data.length-1){
							$(this).text(data[count])
						}
						count++;						
					})
				})
			})
		}
		_pj.show = function(sid, orderCode,teacherid, gameid, callback){
			this.sid = sid;
			this.tradeno = orderCode;
			this.teacherId = teacherid;
			this.gameId = gameid;
			this.sumbitSuccessCallback = callback;
			$("#" + pjMaskId).css("display","block");
			requestTag(sid, function(data){
				var liArr = [];
				for(var i=0;i<data.length;i++){
					liArr.push('<li>'+ data[i] +'</li>');
				}
				$("#" + pjMainId + " ul").html(liArr.join(""))
			});
		}
		_pj.hide = function(){
			$("#" + pjMaskId).css("display","none");
			$("#ywpj_tag_input").val("");
			$("#ywpj_desc").val("");
			$(".ywpj-tag-custom").removeClass("ywpj-tag-custom-have");
			$(".ywpj-tag-custom span").addClass("ywpj-custom-hidden");
			this.starSelectActive = -1;
			this.customTag = "";
		}

		_pj.starActive = function(index){
			this.starSelectActive = index;
			_selectStars(index)
		}

		function requestTag(sid, callback){
			var url = "https://api.tuwan.com/mobileplay/?data=play_tag_list_comment&sid="+ sid +"&format=jsonp";
			$.ajax({
                url: url,
                type: "get",
                dataType: "jsonp",
                success: function (obj){
                	if(obj){
                		if(callback){
                			var data = obj.data;
                			if(data){
                				callback(obj.data)
                			}                			
                		}
                	}
                	
                }
            })
		}

		function _selectStars(index){
			$("#" + pjMainId + " p.ywpj-starts span").each(function(ind){
				if(ind<=index){
					if($(this).hasClass("star" + (ind*1 + 1))){
						return true;
					}
					$(this).addClass("star" + (ind*1 + 1))
				}
				else{
					$(this).removeClass("star" + (ind*1 + 1))
				}
			})
		}

		win.YWPJ = new ywpj();

	})(window,document,jQuery);