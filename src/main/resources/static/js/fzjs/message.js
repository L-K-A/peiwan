/**
 * ws收发消息的中转站
 * ws的消息都会传送到这里进行处理
 * 特殊不需要经过这里的就不到这里
 * 发送消息也通过这个对象的方法发送
 */
"use strict";
window._BROWSER_MESSG = {
	temporary_data: false,//在de_bug状态下临时
	to_ws: function (type, data) {
		if (typeof (data) !== 'string') {
			// alert("data参数必须是字符串");
			return;
		};
		_Brower_WS.onmessg(type, data);
	},
	//发送到单聊窗口
	to_chat: function (id, type, data) {
		//3000 - 4000;
		if (typeof (data) !== 'string') {
			// alert("data参数必须是字符串");
			return;
		};
		if (_de_bug) {
			if (type === 3003) {
				_BROWSER_CHAT.de_bug_data_turnover("browser_de_bug_inchat", type, data);
			} else {
				_BROWSER_CHAT.de_bug_data_turnover("browser_de_bug_inchat", type, data);
			};
		}
	},
	onmessg: function (type, data) {
		/*=================================*/
		if (type === 2002) {

			/**
			 * 假如以后ws长连接页面要放在一个单独的c++的层中的话这里拿到的数据要通过
			 * _COMMON.get_data(data);//得到
			 * 现在ws是一个js文件因为保证了主体结构是一个页面所以不用移出去减少了c++窗口之间的通信频率
			 */
			data = JSON.parse(data);
			// console.log(data);
			/**
			 * 动作处理分为两个if判断
			 * 避免js冲突
			 */
			if (data.action === "ok") {

				//ws连接成功
				_Brower_WS.re_count = _Brower_WS.default_re_count;//链接成功后把重连次数设置为10为下次断线进行10次重连
				_Brower_WS.ws_state = 1;//连接中

			} else if (data.action === "login_elsewhere") {
				// _BROWSER_CHAT.work_win_closed(1);
				_Brower_WS.no_reconnect = true;//不进行websocket重连
				_Browser_Websocket.close();
				//账号在在别处登录您已被迫下线
				console.log("账号在别处登录，您已离线");
				// 关闭窗口
				_BROWSER_CHAT.close_pop();
				// layer.alert("已在其他地方打开聊天窗口");
				return;

			} else if (data.action === "login_succeed") {
				//登录成功
				// 设置窗口不自动关闭
				LS.set("browser_chat_pop_status", "0");

			}  else if (data.action === "login_fail") {

				//登录失败ws一关闭
				console.log("登录失败 ws关闭");
				

			} else if (data.action === "blacklist") {
				_Brower_WS.no_reconnect = true;//不进行websocket重连
				_Browser_Websocket.close();
				//该用户被拉黑
				layer.msg("你已经被管理员拉黑，24小时内无法聊天",function(){

				});
			} else if (data.action === "user_defined") {
				//自定义动作区域
				if (data.data.child_action === '[自定义]') {
					//
				};
			};
			/*======================================================*/
			if (data.action === "login_succeed") {
				//ws登录成功
				console.log("ws登录成功");

			} else if (data.action === "return_receipt_status") {//发送消息给服务器回执
				// data = JSON.parse(data);
				data = data.data;
				var message_id = data.message_id;// 消息id
				// 获取当前房间 聊天信息缓存
				// console.log(message_id);

				// 获取 发送的数据对象
				var ele_arr = _BROWSER_CHAT.get_ele_arr(_BROWSER_CHAT.chats, "message_id", message_id);

				if (ele_arr) {
					ele_arr.dom_send_status_icon.removeClass("on").removeClass("loading");
				};

				var s_chat_room_msg = JSON.parse(LS.get("browser_chat_room_" + _BROWSER_CHAT.my_user_info.uid + "_" + ele_arr.to_uid));

				// 更改本地存储状态 为已读
				_BROWSER_CHAT.edit_ele_arr(s_chat_room_msg, "message_id", message_id, "send_state", 1);
				// 更新聊天信息本地存储
				LS.set("browser_chat_room_" + _BROWSER_CHAT.my_user_info.uid + "_" + ele_arr.to_uid, JSON.stringify(s_chat_room_msg));
				// _BROWSER_CHAT.to_trunk(3005, JSON.stringify(data.data));
			} else if (data.action === "one_chat") {

				/**
				 * ===================================chat_step_2_1==========================
				 * 
				 *    one_chat：代表 收到聊天信息 此为：chat_step_2
				 *    
				 * ==========================================================================
				 */
				var json = data.data;
				//单聊消息
				if (_de_bug) {

					if (_BROWSER_CHAT.chat_pop_show) {
						//和这个好友的聊天窗口已经存在 发送数据到聊天窗口
						_BROWSER_CHAT.to_trunk(3006, JSON.stringify(json));
					} else {// 窗口不存在 则聊天信息 添加到本地缓存
						$(".sidebar-btn.a-move-in-left.message .side_new_msg").addClass("on");
						_BROWSER_CHAT.set_LS_msg(json);
					}
				}

				// websocket 给服务器发送 代表消息已收到
				var wsdata = {
					action: 'terminal_receipt_status',
					token: browser_user_info.token,
					device_id: browser_user_info.device_id,
					termtyp: 'web',
					data: {
						chat_id: json.chat_id,// 消息id
					}
				};

				_BROWSER_MESSG.to_ws(3000, JSON.stringify(wsdata));
			} else if (data.action === "chat_blacklist") {
				// 被对方拉黑
				layer.msg("发送失败，您已被好友拉黑！");
			} else if (data.action === "please_civilized_language") {
				// 文明用语
				_BROWSER_CHAT.to_trunk(3008, data.data);
			} else if (data.action === "send_orders_message") {
				var order_info = data.data.orders_info;
				var time = _BROWSER_CHAT.format_time(order_info.create_time);
				var num = Number(_TRUNK_DATA.wf_sys_notice.order_notice.dom_num.text()) + 1;
				var msg = order_info.remark;
				_TRUNK_DATA.wf_sys_notice.order_notice.dom_num.addClass("on");
				_TRUNK_DATA.wf_sys_notice.order_notice.dom_time.addClass("on");
				_TRUNK_DATA.wf_sys_notice.order_notice.dom_nickname.addClass("on");
				_TRUNK_DATA.wf_sys_notice.order_notice.dom_num.text(num);
				_TRUNK_DATA.wf_sys_notice.order_notice.dom_time.text(time);
				_TRUNK_DATA.wf_sys_notice.order_notice.dom_msg.text(msg);
				if (!_de_bug) {
					// 显示消息弹窗
					_BROWSER_CHAT.show_new_msg_pop(185, 108, 1, false, 0, "");
				};
			} else if (data.action === "defined_info") {// 自定义websocket

			};

		};

		/*=================================*/
	},
	onload: function () {
		// console.log('messg文档加载完毕');
		//_de_bug的状态下接收参数
		if (_de_bug) {
			setInterval(function () {
				
				_BROWSER_MESSG.temporary_data = _BROWSER_CHAT.de_bug_data_turnover_get("browser_de_bug_intrunk");
				// console.log(_BROWSER_MESSG.temporary_data);
				
				if (_BROWSER_MESSG.temporary_data) {
					for (var i = 0, len = _BROWSER_MESSG.temporary_data[0].length; i < len; i++) {
						if (_BROWSER_MESSG.temporary_data[0][i]) {
							on_browser_layer_recv_data(Math.floor(_BROWSER_MESSG.temporary_data[1][i]), _BROWSER_MESSG.temporary_data[0][i]);
						};
					};
				};
			}, 300);
		};
	},
};

window.on_browser_layer_recv_data = function (type, data, wid, laid) {
	console.log(type);
	//4000~5000是房间页面发过来的
	if (type === 2002) {
		//服务器发送给客户端的//现在不走这里
		_BROWSER_MESSG.onmessg(type, data);
	} else if (type === 3000) {
		//客户端发送给服务器的
		//数据取出来
		_BROWSER_MESSG.to_ws(type, data);//数据将直接发送给ws
	}else if (type === 2005) {
		//从其他窗口发送过来的数据量比较大的
		// data = _COMMON.get_data(data);
	} else if (type === 2003) {
		// 聊天 调用主窗口 图片上传方法
		_BROWSER_CHAT.chat_upload_img(JSON.parse(data), wid);
	} else if (type === 2004) {
		// 聊天 调用主窗口 _BROWSER_MESSG.to_ws 发送聊天信息
		// data = _COMMON.get_data(data);
		// _BROWSER_MESSG.to_ws(3000, data);
	} else if (type === 2014) {
		// 聊天 调用主窗口 _BROWSER_MESSG.to_ws 发送聊天信息
		// _BROWSER_MESSG.to_ws(3000, data);
	} else if (type === 2006) {
		// 打开窗口第一次发送信息 给消息列表插入 用户信息
		var friend_user_info = JSON.parse(data);
		_BROWSER_CHAT.insert_wf_friend_notice(friend_user_info);
	}  else if (type === 2009) {
		// 聊天窗口关闭 给主窗口发送信息
		// 清空聊天窗口id
		// _BROWSER_CHAT.b_chat_user_info = [];
		// LS.set("browser_chat_user_info", "[]");
		// LS.set("chat_is_one", "1");
	} else if (type === 2010) {
		
	} else if (type === 2015) {
		// 聊天面板不存在聊天窗口 则聊天信息 添加到本地缓存
		data = JSON.parse(data);
		// 更新消息列表
		_BROWSER_CHAT.upadte_voice_msg(data, 0);
		if (!_de_bug) {
			// 显示语音消息弹窗
			_BROWSER_CHAT.show_new_msg_pop(185, 108, 2, true, 45000, json.userid);
		};
	} else if (type === 2022) {
		// 派单消息 打开窗口
		_TRUNK_DATA.wf_sys_notice.order_notice.dom_db_fn();
	} else if (type === 2023) {
	} else if (type === 3003) {
		// data = _COMMON.get_data(data);
		// alert(data);
	} else if (type === 3004) {
		data = JSON.parse(data);
		// 图片上传成功 回传URL地址
		_BROWSER_CHAT.send_img_msg(data);
	} else if (type === 3005) {// 发送聊天信息 之后回执 判断是否发送成功
		// data = _COMMON.get_data(data);

		data = JSON.parse(data);
		var message_id = data.message_id;// 消息id
		// 获取当前房间 聊天信息缓存
		console.log(message_id);
		
		// 获取 发送的数据对象
		var ele_arr = _BROWSER_CHAT.get_ele_arr(_BROWSER_CHAT.chats, "message_id", message_id);
		console.log(ele_arr);
		
		if (ele_arr) {
			ele_arr.dom_send_status_icon.removeClass("on").removeClass("loading");
		};

		var s_chat_room_msg = JSON.parse(LS.get("browser_chat_room_" + _BROWSER_CHAT.my_user_info.uid + "_" + ele_arr.to_uid));

		// 更改本地存储状态 为已读
		_BROWSER_CHAT.edit_ele_arr(s_chat_room_msg, "message_id", message_id, "send_state", 1);
		// 更新聊天信息本地存储
		LS.set("browser_chat_room_" + _BROWSER_CHAT.my_user_info.uid + "_" + ele_arr.to_uid, JSON.stringify(s_chat_room_msg));
	} else if (type === 3006) {
        /**
         * ===================================chat_step_2_2============================
         * 
         *    聊天窗口存在 则执行这里
         *    
         * ==========================================================================
         */
		// console.log(data);
		
		data = JSON.parse(data);
		// 从哪里来
		var p_uid = data.userid;
		// 到哪里去
		var info = _BROWSER_CHAT.get_ele_arr(_BROWSER_CHAT.friend_user_info, "uid", p_uid);
		if (info) {//存在聊天窗口
			var msg_info = _BROWSER_CHAT.create_msg(info, 2, data.content, data.msg_type, true, 1, data.to_uid, data.uid, data.message_id, data.avatar, data.nickname);
			// 创建 聊天结构
			_BROWSER_CHAT.create_chat_item_dom(info, msg_info);
			// 加入页面
			info.dom_right.find(".chat_content").append(msg_info.dom);
			// 更改聊天面板未读消息  数量
			_BROWSER_CHAT.change_left_num(info);
		} else {// 不存在聊天窗口
			// 加入缓存
			_BROWSER_CHAT.set_LS_msg(data);
		}

	} else if (type === 3007) {
		// 暂时不用
		// alert(2);
		// 传入uid(uid) 判断哪个 聊天窗口被选中
		data = JSON.parse(data);
		// console.log(data);

		// layer.msg(""+data.uid);
		// if (!Number(data.is_one)) {// 有多个聊天窗口
			// 显示左侧
			// $(".chat_wrapper").addClass("on");
			console.log(JSON.parse(LS.get("browser_chat_user_info")));
			$.each(JSON.parse(LS.get("browser_chat_user_info")), function (i, item) {
				console.log(JSON.parse(LS.get("browser_chat_user_info")));
				
				// 不在_BROWSER_CHAT.friend_user_info 中存在，才加进去
				if (!_BROWSER_CHAT.get_ele_num(_BROWSER_CHAT.friend_user_info, "uid", item.uid)) {
					console.log(item);
					_BROWSER_CHAT.friend_user_info.push(item);
				}
			});
		// }
		console.log(data.is_exist);
		
		// 判断聊天窗口是否存在
		if (data.is_exist) {
			_BROWSER_CHAT.change_check(data.uid, data.nickname);
		} else {
			// if(!data.is_first){
			// 不是第一次加载聊天面板
			// var ind = _COMMON.getobj_array_index(_BROWSER_CHAT.friend_user_info,"uid",data.uid);
			var temp_chat = _BROWSER_CHAT.get_ele_arr(_BROWSER_CHAT.friend_user_info, "uid", data.uid);
			if (temp_chat) {
				_BROWSER_CHAT.insert_chat_dom(temp_chat);
			}
			// console.log(data);
			// // 更新聊天窗口语音状态
			// if(data.one_chat_voice_state){


			//     // 接收人语音聊天dom
			//     var voice_dom = _BROWSER_CHAT.get_ele_arr(_BROWSER_CHAT.friend_user_info,"uid",_BROWSER_CHAT.voice_uid);
			//     if(voice_dom){
			//         // 语音聊天窗口插入页面
			//         _BROWSER_CHAT.insert_chat_voice(voice_dom,1);
			//         voice_dom.dom_left.find(".time_wrapper").addClass("on");
			//     }
			// };
			// }

		}
	} else if (type === 3008) {
		layer.msg("发送失败：" + data);
	} 

};