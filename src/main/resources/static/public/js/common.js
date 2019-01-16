/**
 * 公共方法
 * Created by 刘万顺 on 2017/11/7.
 */
"use strict";
define([
	'vue',
	'store',
	'layer',
	'laypage',
	public_domain+'/static/public/js/login_registration.js',
	public_domain + '/static/show/js/index/websocket.js',
	public_domain + '/static/show/js/index/message.js',
	public_domain + '/static/show/js/index/chat.js'
], function (Vue, store, layer, laypage, login_registration){
		
		var avatar_timer1 = null;//用来监听是否自动关闭图像上传窗口的事件
		// 登录状态
		if (loginstatus) {//登录
			// 聊天
			setTimeout(_BROWSER_CHAT.onload, 500);
			setTimeout(_BROWSER_MESSG.onload, 500);
		};
		
		/**
		 * 打开语音大厅的全局方法
		 */
		window._open_voice_hall = function(){
			var time1 = Math.floor(localStorage.getItem("entertainment_hall_time_stamp"));
			var time2 = Date.now();
			if(time2 - time1>4000){
				//当前浏览器没有打开语音大厅
				window.open("/client/html/v1/room_browser.html");
			}else{
				alert("您好，语音大厅在当前浏览器中已经打开");
			};
			return false;
		};
		window._P_H = function(str, size){
		        if (!str||!size) {
		            str = '/public/img/avatar_middle.png';
		        } else {
		            //这里还可以加不同的尺寸
					if (str.indexOf('daofengdj/sq/270') >= 0) {
						str = str.replace('sq/270', 'sq/' + size);
					} else if (str.indexOf('img1.daofengdj.com') >= 0) {
						str = str + '!daofengdj/sq/' + size;
					} else if (str.indexOf('dianjing.b0.upaiyun.com') >= 0) {
						str = str + '!daofengdj/sq/' + size;
					}
		       }
		       return (str);
		};
		/**
		 * 侧边栏实例
		 */
		(function(){
			
			var sidebar_global = {};
			sidebar_global.sidebar_vm = new Vue({
				el:"#sidebar-vm",
				data:{
				},
				mounted:function(){
					this.$nextTick(function(){
						
						if(loginstatus){
							// this.get_msg_num();
						};
			 		});
				},
				methods:{
					//意见反馈
					feedback:function(){
						sidebar_global.feedback_vm.feedbackShow = true;
					},
					get_msg_num:function() {
						var _this = this;
						var url ="/user/message/unread_num";
						_this.$http.post(url,function(res) {
							res = res.body;
							if(res.code ==1){
								window.unread_show_notice = res.new_show;
							}
						});
					},
					// 打开聊天窗
					open_msg_chat: function () {

						if (_Brower_WS.ws_state === 2) {
							//重新连接ws
							_Brower_WS.no_reconnect = false;
							_Brower_WS.open_ws();
							// 设置窗口不自动关闭
							LS.set("browser_chat_pop_status", "0");
						};
						
						// 重新获取聊天好友信息
						_BROWSER_CHAT.friend_user_info = JSON.parse(LS.get("b_s_wf_friend_notice_" + _BROWSER_CHAT.my_user_info.uid));
						// 插入页面
						if (_BROWSER_CHAT.friend_user_info.length>0){
							$.each(_BROWSER_CHAT.friend_user_info, function (i, item) {
								_BROWSER_CHAT.show_chat_pop(item, false);
							});
						}else {
							
							_BROWSER_CHAT.get_show_msg_fn(1);
							$(".chat_l_id_999999").click();
							// 显示 弹窗
							$(".msg_chat_w").fadeIn();
							// 标记窗口打开
							_BROWSER_CHAT.chat_pop_show = true;

						}
						
					}
				}
			})
			sidebar_global.feedback_vm = new Vue({
				el:"#yijianfankui",
				data:{
					feedbackShow:false,//反馈弹窗显示
					content:"",//反馈内容
					contact:"",//联系方式
				},
				mounted:function(){
					var _this = this;
					this.$nextTick(function(){
						
					});
				},
				methods:{
					feedback_submit:function() {
						var _this = this;
						var postdata = {
							content:_this.content
						};
						if(_this.content == ""){
			                layer.msg("反馈意见必须填");
			                return;
			            };
						this.$http.post("/index/index/feedback",postdata).then(function(res){
							res = res.data;
							if(res.code==1){
								layer.msg(res.msg,function(){
									location = location;	
								});
							};
						});
					}
				}
			});
			// 换装秀会员板块 时装
			sidebar_global.show_clothes_vm = new Vue({
				el: ".show_user_side_bar_w",
				data: {
				},
				mounted: function () {
					var _this = this;
					this.$nextTick(function () {

					});
				},
				methods: {
					// 跳转换装衣橱页
					go_to_clothes: function () {
						// this.pw_uid
						window.open("/show/user/clothes_photo.html");
					},
					clothes_big_path_fn:function(type) {
						var img_url = public_domain+"/static/show/clothes/girl/big/";
						return img_url + type + ".png";
					}
				}
			});
			
		}());
		var modal = {
			//ajaxurl域名路径
	        web_domain:function(){
	            //var config = store.get('config');
	            //return config.api_url;
	            // return 'http://api.daofengdj.com'
	          //return "http://api.kh.com";
	        },
	        //图片路径
	        img_domain:function (){
	            //var config = store.get('config');
	            //return config.img_url;
	            // return "http://api.daofengdj.com";
	            //return "http://kh.com";
	        },
	        //获取url参数返回参数值 中文编码使用下面的CodeChinese方法
			GetQueryString:function(name){
				var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)
			     {
			     	return decodeURIComponent(r[2]);
			     }else
			     { 
			     	return false;
			     };
			},
			//加载头部模板 参数是一个boor值和，当前导航的索引值
			home_render_nav:function(boor,index){
				new Vue({
					el:".public_nav_new",
					data:{
						input:boor,
						val:"",
						navIndex:index,
						zuanshi:0,
						user_level:0,
						juewei_level:0,
						difference:0,
						vip_uid:0,
						is_max_level:false,//是否是最高级
						msg_info_show:false,//历史搜索是否显示
						msg_info_list:[],//历史搜索的数组
						msg_info_index:-1,//控制选中哪一个
						msg_info_len:0,//历史记录有几条数据
					},
					created:function(){
						
					},
					mounted:function(){
						var _this = this;
		                this.$nextTick(function(){
		                    var obj = document.querySelector('.user-status');
		                    if(obj)
		                    {
		                    	var user_status = obj.getAttribute('user-status');
		                    	var obj1 = document.querySelector('#user-status-div');
		                    	if(user_status == 1)
								{
									obj1.setAttribute('class','off');
									obj1.innerHTML = "开始接单";
								}else if(user_status == 2)
								{
									obj1.setAttribute('class','on');
									obj1.innerHTML = "结束接单";
								}else if(user_status == 3)
								{
									obj1.setAttribute('class','hand');
									obj1.innerHTML = "接单中";
								};
		                    };
		                    if(loginstatus === 1){
								this.get_user_data();
							};
							//监听文档点击事件
		                    document.addEventListener("click",function(){
		                    	_this.msg_info_show = false;
		                    });
		                });
		            },
					methods:{
						//蚂蚁代练
						mayi_dailian:function(){
							window.open("http://www.mayidailian.com/Take/index.html");  
						},
						//客户端下载鼠标经过
						clent_overShow:function(){
							document.querySelector('.clent_div_left').style.background="#fff";
							document.querySelector('.clent_div_left_img').style.background="url('"+public_domain+"/static/public/img/nav_v2/download_4.png') no-repeat";
							document.querySelector('.clent_div_left_span').style.color="#ff6477";
							document.querySelector('.clent_div_right').style.background="#f7f7f7";
							document.querySelector('.clent_div_right_img').style.background = "url('" + public_domain +"/static/public/img/nav_v2/download_5.png') no-repeat";
							document.querySelector('.clent_div_right_span').style.color="#777";
						},
						outHide:function(){
						},
						clent_overShow2:function(){
							document.querySelector('.clent_div_left').style.background="#f7f7f7";
							document.querySelector('.clent_div_left_img').style.background = "url('" + public_domain +"/static/public/img/nav_v2/download_2.png') no-repeat";
							document.querySelector('.clent_div_left_span').style.color="#777";
							document.querySelector('.clent_div_right').style.background="#fff";
							document.querySelector('.clent_div_right_img').style.background = "url('" + public_domain +"/static/public/img/nav_v2/download_6.png') no-repeat";
							document.querySelector('.clent_div_right_span').style.color="#ff6477";
						},
						outHide2:function(){
						},

						//客户端下载
						clent_div_left_click:function(){
							location.href = '/index/activitynew/app_download.html?dw=1'
						},
						clent_div_right_click:function(){
							location.href = '/index/activitynew/app_download.html?dw=2'
						},
						//获取用户的等级信息
						get_user_data:function(){
							this.$http.post("/index/index/userlevel").then(function(res){
								res = res.data;
								if(res.code === 1){
									var json = res.data;
									this.zuanshi = json.diamond;
									this.juewei_level = json.noble_id;//爵位等级
									this.user_level = json.level;
									this.difference = Math.floor(json.score/json.score_next*100);
									this.vip_uid = json.vip_uid;//靓号uid >0 显示靓号
									this.is_max_level = json.is_max_level;//是否是最高级
									// 缓存用户信息，用于聊天使用
									localStorage.setItem("browser_user_info",JSON.stringify(json));
								}
							});
						},
						jewelImgFun: function(noble) {//爵位图片
			                if(noble!=undefined){
			                    
			                    return modal.jewelImgFun(noble);
			                };
			            },
			            nextLevelFun: function(level) {//下一等级
			                var ind =level;
			                var nextind="";
			                if(!this.is_max_level){
			                    nextind = ind;
			                    return "LV"+nextind;
			                    
			                }else {
			                    nextind= ind-1;
			                    return "MAX";
			                }

			            },
			            //输入框输入时间
						inputShow:function(){
							if(this.val == "")
							{
								return;
							};
							window.open('/peiwan/search.html','_bank');
							localStorage.setItem('searchKey', this.val);
							//历史记录把已经存在的数组取出
							var arr = store.get("historical_search") || [];
							var isseach = false;
							for(var i=0,len=arr.length;i<len;i++){
								if(this.val === arr[i].name){
									isseach = true;
									break;
								};
							};
							if(!isseach){
								var jsn = {
									id:(new Date()).getTime(),//获取当前的时间戳 作为id
									name:this.val
								};
								arr.push(jsn);
								var len = arr.length;
								// 历史搜索缓存6条
								if(len>6){
									arr = arr.slice(len-6);
								};
								store.set("historical_search",arr);
							};
							return;
						},
						//搜索输入框获取焦点事件
						input_focus:function(){
							//获取焦点时显示
							this.msg_info_show = true;//历史搜索是否显示
							var arr = store.get("historical_search") || [];
							arr.reverse();
							this.msg_info_len = arr.length;
							for(var i=0,len=this.msg_info_len;i<len;i++){
								arr[i].index = i;
							};
							this.msg_info_list = arr;
						},
						//搜索输入框失去焦点事件
						input_blur:function(){
							this.msg_info_show = false;
							this.msg_info_index = -1;
						},
						//搜索输入框向上键被keyup
						input_key_38:function(){
							var index = this.msg_info_index;
							index -- ;
							if(index<-1){
								index = this.msg_info_len - 1;
							};
							this.msg_info_index = index;
							if(index === -1){
								this.val = "";
							}else{
								this.val = this.msg_info_list[index].name;
							};
						},
						//搜索输入框向下键被keyup
						input_key_40:function(){
							var index = this.msg_info_index;
							index ++ ;
							if(index>=this.msg_info_len){
								index = 0;
							};
							this.msg_info_index = index;
							this.val = this.msg_info_list[index].name;
						},
						//鼠标移到历史记录的列表的时候
						msg_li_mouseover:function(item){
							this.msg_info_index = item.index;
						},
						msg_li_click:function(item){
							this.val = item.name;
							this.inputShow();
						},
						//当前用户状态点击事件
						fn_status:function(){
							var user_status = document.querySelector('.user-status').getAttribute('user-status');
							if(user_status == 1)
							{
								Vue.http.post('/user/info/set_status',{value:2}).then(function(res){
									if(res.body.code == 1){
										location = location;
									}else if(res.body.code == -2){
										layer.msg("您的账号已被冻结，请联系客服！",{time:6000});
									}else{
										layer.msg("修改失败，可能当前的状态没有及时更新导致，请刷新页面重试！",{time:6000});
									};
								});
							}else if(user_status == 2)
							{
								Vue.http.post('/user/info/set_status',{value:1}).then(function(res){
									if(res.body.code == 1){
										location = location;
									}else
									{
										layer.msg("修改失败，可能当前的状态没有及时更新导致，请刷新页面重试！",{time:6000});
									};
								});
							}else if(user_status == 3){
								layer.msg("接单中不能修改状态");
								return;
							};
						},
						//充值
						recharge:function(){
							if(loginstatus===0){//未登录
								tel_login_v1.bindPopShowFun(1);//登录模块公共模板测试
							}else if(loginstatus===1){//登录
								location = "/index/recharge/vocher.html";
							};
							
						},
						//提现
						withdrawals_fn:function(){
							if(loginstatus===0){//未登录
								tel_login_v1.bindPopShowFun(1);//登录模块公共模板测试
							}else if(loginstatus===1){//登录
								location = "/user/account/cash.html";
							};
							
						},
						//联系我们
						contact_us_fn:function(){
							kefuWindow();
						},
						//消息
						message_fn:function(){
							if(loginstatus===0){//未登录
								tel_login_v1.bindPopShowFun(1);//登录模块公共模板
							}else if(loginstatus===1){//登录
								location = '/user/message.html';
							};
						},
						//登录
						login_fn:function(){
						    tel_login_v1.bindPopShowFun(1);//登录模块公共模板
						},
						// 登录模块弹窗
						popShowFun:function(ind){
							tel_login_v1.bindPopShowFun(ind);//登录模块公共模板
						}
					}
				});
				// 注册一个全局自定义指令 `v-focus`
				Vue.directive('focus', {
				  // 当被绑定的元素插入到 DOM 中时……
				  inserted: function (el) {
				    // 聚焦元素
				    el.focus()
				  }
				});
			},
			//头像
			avatar:function(e) {
				clearInterval(avatar_timer1);
                var layerIndex = layer.open({
                    type: 2,
                    title: '上传头像',
                    shadeClose: false,
                    shade: 0.6,
                    area: ['450px', '530px'],
                    content: '/user/info/avatar', //iframe的url
                    end: function(){ //此处用于演示
                    	clearInterval(avatar_timer1);
                    	var imgurl = store.get('setImgUrl');
                    		store.remove('setImgUrl_ok');
                    	if(imgurl){
                    		location = location;
                    	};
                    }
                });
                avatar_timer1 = setInterval(function(){
                	var boor = store.get('setImgUrl_ok');
                	if(boor){
                		store.remove('setImgUrl_ok');
                		layer.close(layerIndex);
                		clearInterval(avatar_timer1);
                	};
                },500);
            },
			//所有的数据验证方法
			post_Verification:function(data){
				if (data.body.code == 0) {
					return false;
				};
                return true;
			},
			//错误请求处理
			error:function(data){
				console.log(data);
			},
			//返回一个日期格式传递一个时间戳
			timestamp :function(format){
           		var format = new Date(format*1000);
                var year = format.getFullYear();
                var month = format.getMonth()+1;
                var date = format.getDate();
                var hour = format.getHours();
                var minute = format.getMinutes();
                var miao = format.getSeconds();
                var returnstr = function(val){
                	return val<10?'0'+val:val;
                };
                return returnstr(year)+"-"+returnstr(month)+"-"+returnstr(date)+' '+returnstr(hour)+":"+returnstr(minute)+":"+returnstr(miao);
        	},
        	//处理折扣的方法首页列表页用到
 			discounted_data_fn:function(data_list){
 				if(!data_list){return [];};
 				//增加展示出来的折后信息在数据中新加一个字段this_discount（10为没有折扣不显示）
				for(var i=0,len=data_list.length;i<len;i++){
					var str1 = data_list[i].discount;
					if(str1){
						// var arr1 = str1.split(',');
						// var k=10,m=10;
						// for(var j=0;j<arr1.length;j++){
						// 	k--;
						// 	if(arr1[j]>0){
						// 		m = k;
						// 	};
						// };
						// data_list[i].this_discount = m;
						data_list[i].this_discount = str1;
					}else{
						data_list[i].this_discount = 10;
					};
				};
 			},
			//表单验证通用{type:"mobile",el:"#mobile",parset:"#test1",L:100,T:100,value:15890611985,time:1000}
			form_Verification:function(options){
				/**
				 * 参数说明[可有可无的属性]
				 * type 类型
				 * el 输入框
				 * [parset] 父元素有此属性会插入此元素中没有会插入body中
				 * [L][T] 创建的创建提示信息的left高度和top高度没有参数会创建相对于el元素的left和top值
				 * value 值
				 * [time]显示多久隐藏 默认3s
				 * 会在页面中创建<div class="Prompt_msg_style" style="left:xx;top:xx">xxx</div>这样一个元素样式
				 * 样式在home_nav_footer.css有差异可以覆盖此属性
				 * 方法会返回一个boor值
				 */
				var obj = document.querySelector(options.el);
				var _left = obj.offsetLeft;
				var _top = obj.offsetTop;
				var _width = obj.offsetWidth;
				if(options.x){
					_left = options.left;
				};
				if(options.y){
					_top = options.y;
				};
				var Odiv = document.createElement('div');
				if(options.parset){
					var parsetObj = document.querySelector(options.parset);
				}else{
					var parsetObj = document.body;
				};
				var _time = 3000;
				if(options.time){
					_time = options.time;
				};
				var msg = "";
				Odiv.className = "Prompt_msg_style";
				Odiv.style.top = (_top-25)+"px";
				Odiv.style.left = (_left)+"px";
				var _fn = function(obj){
					obj.innerHTML = msg;
					parsetObj.appendChild(obj);
					setTimeout(function(){
						parsetObj.removeChild(obj);
					},_time);
				};
				var value = options.value;
				var oldvalue = options.oldvalue;
				if(options.type === "mobile"){
					//登录手机号
					if(value == ''){
						msg = "请输入手机号";
						_fn(Odiv);
						return false;
					}
					if(!(/(^9\d{8}$)|(^1\d{10})$/.test(value))){
						msg = "手机号格式不正确";
						_fn(Odiv);
						return false;
					};
				}else if(options.type === "password"){
					//密码
					if(value == ''){
						msg = "请输入密码";
						_fn(Odiv);
						return false;
					}
					if(value.length<6 || value.length>20){
						msg = "密码长度为6-20位";
						_fn(Odiv);
						return false;
					};
					var pattern = /[\u4e00-\u9fa5]/;
					if(pattern.test(value)){
						msg = "密码中不能包含中文";
						_fn(Odiv);
						return false;
					};
				}else if(options.type === "repassword"){
					//检测确认密码；
					if(oldvalue!==value && value!=''){
						msg = '两次输入的密码不一致！';
						_fn(Odiv);
						return false;
					}else{
						return true;
					}
				}else if(options.type === "message_code"){
					//检测短信验证码
					if(value == ''){
						msg = '请输入短信验证码';
						_fn(Odiv);
						return false;
					}else{
						return true;
					}
				}else if(options.type === "captcha_code"){
					if(value == ''){
						msg = '请输入验证码';
						_fn(Odiv);
						return false;
					}else{
						return true;
					}
				}else if(options.type === "seach"){
					if(value == ''){
						msg = '内容不能为空';
						_fn(Odiv);
						return false;
					};
				}else if(options.type === "login_number"){
					if(value == ''){
						msg = '内容不能为空';
						_fn(Odiv);
						return false;
					};
					if(!(/^[0-9]*$/.test(value))){
						msg = "请输入数字";
						_fn(Odiv);
						return false;
					};
				};
				return true;
			},
			//把分的人民币单位转换为元10.00
			money_conversion:function(value){
				value = parseInt(value);
				return (value/100).toFixed(2);
			},
			//返回格式化事件单位秒如01:01:12
 			return_formattime:function(time_num){
 				function str2(num)
 				{
 					return num<10?'0'+num:num;
 				};
 				var shi = parseInt(time_num/3600);
 				var fen = parseInt((time_num%3600)/60);
 				var miao = parseInt(time_num%60);
 				return str2(shi)+":"+str2(fen)+":"+str2(miao);
 			},
 			//页码
        	page:function(_fn,pages,curr){
        		laypage({
		            cont: "pageInfo", 
		            //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
		            pages: pages, //通过后台拿到的总页数
		            skin: '#fdc790',
		            curr: curr,//当前页
		            jump: function (obj, first) { //触发分页后的回调
		                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
		                    _fn(obj.curr);
		                };
		            }
		        });
        	},
        	//对数组的特殊化处理
        	arrey_change1:function(arr,num){
        		/**
        		 * 例如
        		 * 参数 [0,1,2,3,4,5,6]和2
        		 * 返回 [[0,1],[2,3],[4,5],[6]]
        		 */
        		var num1 = arr.length;
				var num2 = parseInt(num1/num);
				if(num1%num){
					num2++;
				};
				var k=0;
				var arr1 = [];
				for(var i=0;i<num2;i++){
					var arr2 = [];
					for(var j=0;j<num;j++){
						if(arr[k]){
							arr2.push(arr[k]);
						};
						k++;
					};
					arr1.push(arr2);
				};
				return arr1;
            },
        	//重置支付密码弹窗
        	reset_pay_pass:function(_phone){
        		var vm = new Vue({
		            el:"#reset_pay_pass",
		            data:{
		                isshow:false,
		                phone:_phone,
		                code:"",
		                newPass:"",
		                msg:"获取验证码",
		                status:false
		            },
		            filters:{

		            },
		            mounted:function(){

		            },
		            methods:{
		                fn_cancel:function(){
		                	var _this = this;
		                    if(!this.code){
		                        layer.msg("请填写验证码");
		                        return;
		                    };
		                    if(!this.newPass){
		                        layer.msg("请填写新密码");
		                        return;
		                    };
		                    if(!(/^[1-9][0-9]{5}$/).test(this.newPass)){
								layer.msg("密码应为6位纯数字，首位不能为0");
		                		return;
		                	};
		                	var arr = this.newPass.split(" ");
		                    if(arr.length>1){
		                        layer.msg("支付密码中不能有空格");
		                        return;
		                    };
		                    var todata = {mobile:this.phone,code:this.code,new_pay_password:this.newPass};
		                    Vue.http.post('/user/info/reset_pay_psd',todata).then(function(res){
		                        if(res.body.status){
		                            layer.msg(res.body.msg,{shift: -1},function(){
		                            	_this.isshow = false;
		                            });
		                        }else{
		                            layer.msg(res.body.msg);
		                        };
		                    });
		                },
		                fn_code:function(){
		                    var _this = this;
		                    if(this.status){return;};
		                    this.status = true;
		                    this.msg = "发送中...";
		                    var todata = {mobile:this.phone};
		                    Vue.http.post('/user/info/send_code',todata).then(function(res){
		                        if(res.body.status){
		                            var x = 60;
		                            _this.msg = x+"s";
		                            var timer1 = setInterval(function(){
		                                x--;
		                                _this.msg = x+"s";
		                            },1000);
		                            setTimeout(function(){
		                                clearInterval(timer1);
		                                _this.status = false;
		                                _this.msg = "获取验证码";
		                            },59*1000);
		                        }else{
		                            layer.msg(res.body.msg);
		                            _this.status = false;
		                            _this.msg = "获取验证码";
		                        };
		                    });

		                },
			        	
		            },
		        });
				return vm;
        	},
        	// 等级图片
        	levelImgFun: function(level) {//等级图片
                var imgUrl= public_domain + "/static/public/img/level/";
                var imgind = 0;
                if(level){
                    imgind=level-1;
                }else {
                    imgind = 0;
                };
                return imgUrl+imgind+".jpg";
            },
            // 透明等级图片
        	levelImgFun2: function(level) {//等级图片
                var imgUrl= public_domain + "/static/public/img/level/";
                var imgind = 0;
                if(level){
                    imgind=level-1;
                }else {
                    imgind = 0;
                };
                return imgUrl+imgind+".png";
            },
            //爵位图片
            jewelImgFun: function(noble) {
                var imgUrl= public_domain + "/static/public/img/rank/";
                var imgind = 0;
                if(noble){
                    imgind=noble-1;
                }else {
                    imgind = 0;
                };
                if(imgind===0){
                    return 0;
                }else {
                    return imgUrl+imgind+".png";
                }
                
            },
            // 导航添加 hover 效果
            addNavHover: function() {
            	$(".nav_wrapper").each(function (i, v) {
			        var $as = $(v).find("a[href='" + window.location.pathname + window.location.search + "']");
			        if ($as.length > 0) {
			            $as.first().addClass("active");
			        } else {
			            $(v).find("a").first("a").addClass("active");
			        }
			    });
            },
            // 新分页 
            // page_info|laypage外层id，btn_color|样式，_fn|回调函数，pages|总页数，curr|当前页码，f_is|首页，l_is|尾页
            mypage: function(page_info,btn_color,_fn,pages,curr,f_is,l_is){
		        laypage({
		            cont: page_info,
		            //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
		            pages: pages, //通过后台拿到的总页数
		            skin: btn_color,
		            curr: curr,//当前页
		            first: f_is,//首页
		            last: l_is,//尾页
		            jump: function (obj, first) { //触发分页后的回调
		                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
		                    _fn(obj.curr);
		                };
		            }
		        });
		    },
		    // 手机号 中间四位为星星
		    change_phone: function(phone) {
                var i = phone.substring(3,7);
                var re_phone = phone.replace(i,"****");
                return re_phone;
            },
			// 限制输入大小
			/**
			 *
			 *
			 * @param {*} obj jquery input 对象
			 * @param {*} num 限制字数大小
			 * @return {num} 返回当前数量
			 */
			limit_inpt_num: function(obj,num) {
				obj.on("input propertychange", function () {
					var _val = $(this).val(),
					count = "";
					if (_val.length > num) {
						$(this).val(_val.substring(0, num));
					}
					count = $(this).val().length;
					return count;
				});
			},
			/**
		 	*返回衣服小图
			*
			* @param {*} type
			* @returns
			*/
			clothes_small_path_fn: function (type) {
				var img_url = public_domain+"/static/show/clothes/girl/small/";
				return img_url + type + ".png";
			},
			/**
			*返回衣服大图
			*
			* @param {*} type
			* @returns
			*/
			clothes_big_path_fn: function (type) {
				var img_url = public_domain +"/static/show/clothes/girl/big/";
				return img_url + type + ".png";
			},

		};
		// 返回给登录公共木块公共方法
		login_registration.get_common(modal);
		return modal;
	}
)