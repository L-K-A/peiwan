/**
 * ws的管理js对象
 * 基于原来的在debug状态和在客户端状态要写两份
 * 试着写成一份在浏览器中就在当前页面调用如果是在客户端的长连接页面使用
 */
"use strict";
window._Brower_WS = {
	time1:null,//心跳定时器
	time2:null,//心跳定时器
	default_re_count:10,//每次断线的重连次数
	re_count:10,//重连次数递减的
	no_reconnect:false,//true不重连
	creat_ws_data:false,//创建连接时发送的数据
	ws_state: 2,//WebSocket 状态 
	open_ws:function(){//打开ws
		var _this = this;
		this.no_reconnect = false;
		//在浏览器测试当中开启WebSocket调试
        //建立链接
        window._Browser_Websocket = new WebSocket(browser_user_info.ws_ip);
        //初始化发送数据
        window._Browser_Websocket.onopen = function (event) {
			// console.log(browser_user_info);
			
        	var wsdata = {
				action:'login',
				ws_url:browser_user_info.ws_ip,
				token: browser_user_info.token,
				device_id:"12",
				termtyp:'web',
				data:{
					// nickname: browser_user_info.nickname,
					// identity: browser_user_info.identity,
					// uid: browser_user_info.uid,
					// avatar: browser_user_info.avatar,//用户图像
					// noble_id: browser_user_info.noble_id,
					// vip_uid: browser_user_info.vip_uid,
					// level: browser_user_info.level,
					// font_color: browser_user_info.font_color,//是否可以选择字体颜色
					// mounts_alias: browser_user_info.mounts_alias,//我的出场坐骑
					// medal: browser_user_info.medal,//我的勋章

					nickname:browser_user_info.nickname,
					identity: browser_user_info.identity,
					uid:browser_user_info.uid,
					avatar:browser_user_info.avatar,//用户图像
				}
			};
            _Browser_Websocket.send(JSON.stringify(wsdata));
            //进入房间之后发送通知信息
        };
        //websocket关闭事件监听
        window._Browser_Websocket.onclose = function (evt) {
        	console.log("ws关闭");

        	//由于新的客户端没有了游客身份关闭了就不再重连
        	//只有在异常的情况下会重连
        	_Brower_WS.ws_state = 2;//ws关闭
        	/*============*/
        	_this.time1 && clearTimeout(_this.time1);
        	_this.time2 && clearInterval(_this.time2);
        	if(!_this.no_reconnect){
        		_Brower_WS.ws_state = 3;//重连中
        		//更换用户重新连接
				_this.reconnect();//重连
        	};
            
        };
        //ws出现异常
        window._Browser_Websocket.onerror = function (evt, e) {
        	if(!_this.no_reconnect){
        		_Brower_WS.ws_state = 3;//重连中
        		//更换用户重新连接
				_this.reconnect();//重连
        	};
        };
        //接收消息
        window._Browser_Websocket.onmessage = function (evt) {
            _this.time2 && clearInterval(_this.time2);
        	_this.to_trunk(2002, evt.data);
        };
        this.heartbeat();//发送心跳
	},
	heartbeat:function(){//发送心跳
		this.time1 && clearInterval(this.time1);
		//发送心跳
        this.time1 = setInterval(function () {
            var row = {};
			row.token = browser_user_info.token;//koken
			row.device_id = browser_user_info.device_id;//设备id
            row.action = 'heartbeat';
			row.termtyp = 'web';
            row.data = '';
            window._Browser_Websocket.send(JSON.stringify(row));
        }, 59000);
	},
	reconnect:function(){//ws重连
		var _this = this;
        this.time1 && clearTimeout(this.time1);
        this.time2 && clearInterval(this.time2);
        if(this.no_reconnect){return;};
        _Brower_WS.ws_state = 3;//ws重连中
        if(this.re_count > 0) {
        	/**
        	 * 开始进行重连
        	 * 桥接过去进行页面显示
        	 */
            this.time2 = setTimeout(function () {
                _this.re_count--;
                _this.open_ws();
            }, 4000);
        } else {
        	//异常后只进行10次重连
            //this.re_count = 10;
        	_Brower_WS.ws_state = 2;//ws关闭中
        };
	},
	//参数必须是字符串
	to_trunk: function (type, data) {
		//发送
		if (typeof (data) !== 'string') {
			layer.msg("data参数必须是字符串");
			return;
		};
		//调用messg的方法传递给trunk
		_BROWSER_MESSG.onmessg(type, data);
		//如果房间窗口存在就发送过去
		// if (_de_bug) {
			//浏览器
			//不判断存不存在直接存
			// if (!_BROWSER_CHAT.chat_pop_show) {
				// _BROWSER_CHAT.de_bug_data_turnover("de_bug_inroom", 1800, data);
			// };
		// }
	},
	//从其他地方拿到的消息type是个数字，data必须是字符串
	onmessg:function(type,data){
		//暂时不用这个方法
		if(type === 3000){

			_Browser_Websocket.send(data);
			
		}else if( type === 1400){
			//打开ws连接命令不走这里了直接调用了
			this.open_ws();
		}else if( type === 1500){
			//关闭ws切换用户
			this.no_reconnect = true;
			window._Browser_Websocket.close();
			this.no_reconnect = false;
		};
	},
	onload:function(){
		// console.log("ws文档已经加载完毕");
		var that = this;
	},
};
