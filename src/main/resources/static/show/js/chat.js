/*
* @Title: 私信聊天
* @Author: 王晓琨
* @Date: 2018-11-21 15:43:08
 * @Last Modified by: 王晓琨
 * @Last Modified time: 2018-12-26 11:20:41
*/
"use strict";
(function () {
    
    // 临时 图片信息
    // var upload_img_path_temp = [];
    // // 临时 文本信息
    // var send_text_temp = [];
    // 监听是否已经在底部，用于有新消息时 是显示提醒，还是滚动到底部
    // window._chat_scroll_status = false;
    // 缓存最新一条消息 时间，用于判断下次发送消息是否 创建 时间dom 结构
    // window._chat_temp_timestamp = 1451577600;//2016-01-01 00:00:00
    // 聊天数据
    // 假的模拟聊天数据
    // type 1:是时间,2:对方发的消息,3:自己发的消息
    // sending_state//发送状态只有自己的聊天信息有false就是发送成功true发送未成功会显示loading图标
    // read_state//已读未读状态是指本地接到新消息但是不在聊天面板就是true在本地存储中就是未读消息
    // to_uid:接收用户的uid
    // userid:发送人的uid


    var a = {
        my_user_info: {},//用户信息
        friend_user_info: [],//好友信息
        chats: [],// 聊天消息
        chat_pop_show:false,// 聊天弹窗是否显示
        wf_notice: {//消息列表
            list: []
        },
        // 系统消息
        wf_sys_notice: {},
        // 未读消息
        wf_unread_notice: {
            data: {
                prove: [],
                chat: []
            },
            is_ajax: true
        },
        unread_num:0,
        show_msg:{},//换装秀消息
        show_msg_current_page:1,// 消息列表当前页
        show_msg_last_page: 1,// 消息列表当前页
        show_msg_is_load:false,//换装秀消息是否加载过

        b_chat_user_info: [],//判断聊天窗口哪个显示
        //生成emojihtml片段时用
        emoji_array: ["[GG]", "[啊]", "[便便]", "[馋]", "[大哭]", "[大笑]", "[呆]", "[得意]", "[低头]", "[顶圈]", "[丢魂]", "[飞吻]", "[尴尬]", "[哈哈]", "[汗]", "[很开心]", "[禁言]", "[惊吓]", "[开心]", "[瞌睡]", "[可爱亲]", "[可爱伸舌头]", "[恐怖]", "[苦恼]", "[酷]", "[礼貌]", "[流泪]", "[迷恋]", "[勉笑]", "[恼火]", "[撇嘴]", "[期待]", "[亲亲]", "[伸舌头]", "[生气]", "[叹气]", "[痛苦]", "[喔]", "[无脸]", "[无奈]", "[无语]", "[笑哭]", "[一字眼]", "[晕]", "[可爱]", "[调皮]", "[心动]", "[心碎]", "[鼓掌]", "[干杯]", "[秀肌肉]", "[扎心]", "[相爱]", "[棒棒糖]", "[玫瑰花]"],
        // 解析图片表情时用
        emoji_json: { "[GG]": "emoji_1", "[啊]": "emoji_2", "[便便]": "emoji_3", "[馋]": "emoji_4", "[大哭]": "emoji_5", "[大笑]": "emoji_6", "[呆]": "emoji_7", "[得意]": "emoji_8", "[低头]": "emoji_9", "[顶圈]": "emoji_10", "[丢魂]": "emoji_11", "[飞吻]": "emoji_12", "[尴尬]": "emoji_13", "[哈哈]": "emoji_14", "[汗]": "emoji_15", "[很开心]": "emoji_16", "[禁言]": "emoji_17", "[惊吓]": "emoji_18", "[开心]": "emoji_19", "[瞌睡]": "emoji_20", "[可爱亲]": "emoji_21", "[可爱伸舌头]": "emoji_22", "[恐怖]": "emoji_23", "[苦恼]": "emoji_24", "[酷]": "emoji_25", "[礼貌]": "emoji_26", "[流泪]": "emoji_27", "[迷恋]": "emoji_28", "[勉笑]": "emoji_29", "[恼火]": "emoji_30", "[撇嘴]": "emoji_31", "[期待]": "emoji_32", "[亲亲]": "emoji_33", "[伸舌头]": "emoji_34", "[生气]": "emoji_35", "[叹气]": "emoji_36", "[痛苦]": "emoji_37", "[喔]": "emoji_38", "[无脸]": "emoji_39", "[无奈]": "emoji_40", "[无语]": "emoji_41", "[笑哭]": "emoji_42", "[一字眼]": "emoji_43", "[晕]": "emoji_44", "[可爱]": "emoji_45", "[调皮]": "emoji_46", "[心动]": "emoji_47", "[心碎]": "emoji_48", "[鼓掌]": "emoji_49", "[干杯]": "emoji_50", "[秀肌肉]": "emoji_51", "[扎心]": "emoji_52", "[相爱]": "emoji_53", "[棒棒糖]": "emoji_54", "[玫瑰花]": "emoji_55" },
       
        //页面加载完毕第一个调用的方法
        onload: function () {
            window.LS = {
                set: function (name, data) {
                    if (typeof data === "string") {
                        localStorage.setItem(name, data);
                    } else {
                        // alert("本地存贮必须为字符串形式");
                    };
                },
                get: function (name) {
                    return localStorage.getItem(name);
                },
                remove: function (name) {
                    return localStorage.removeItem(name);
                }
            };

            // 当前用户信息赋值
            a.my_user_info = JSON.parse(LS.get("browser_user_info"));
            window.browser_user_info = a.my_user_info;
            browser_user_info.identity = 2;
            browser_user_info.device_id = "12";
            // 聊天好友信息
            if (LS.get("b_s_wf_friend_notice_" + a.my_user_info.uid)){
                a.friend_user_info = JSON.parse(LS.get("b_s_wf_friend_notice_" + a.my_user_info.uid));
            };
            // console.log(a.friend_user_info);
            
            // 初始化用户信息
            a.initialize_user_info();
            a.show_msg = {
                uid: a.my_user_info.uid,
                nickname: "换装秀消息",
                num: 0,
                time: "",
                avatar: public_domain + "/static/show/img/index/chat/ico_9.png",
                list: [],//消息列表
            }
            window._de_bug = true;
            // 关闭窗口
            $(".chat_wrapper").find(".close_box .close_btn").on("click", function () {
                a.close_pop();
            });
            // $(document).keyup(function (event) {
            //     if (event.keyCode === 27) {
            //         a.close_esc_pop();
            //     };
            // });
            // 获取未读消息
            a.get_unread_notice();
            
        },
        /**
         *清空聊天弹窗页面数据
         *
         */
        clear_chat_pop:function() {
            _BROWSER_CHAT.chat_pop_show = false;
            $(".msg_chat_w").fadeOut();
            
            // $(".msg_chat_w").find(".chat_left .chat_l_w").html("");
            // $(".msg_chat_w").find(".chat_right .chat_r_w").html("");
            // $(".msg_chat_w").find(".top_title .title").html("");
        },
        
        /**
         *初始化处理用户信息
         *
         */
        initialize_user_info: function() {
            var str_location_href = location.href;
            if (str_location_href.indexOf('dj.com') !== -1) {
                browser_user_info.ws_ip = 'ws://192.168.1.81:9501';//接口获取
            };
            if (str_location_href.indexOf('test.daofengdj.com') !== -1) {
                browser_user_info.ws_ip = 'wss://test.daofengdj.com:889';//接口获取
            };
            if (str_location_href.indexOf('test_zs.daofengdj.com') !== -1) {
                browser_user_info.ws_ip = 'wss://websocket.daofengdj.com:888';//接口获取
            };
            if (str_location_href.indexOf('www.daofengdj.com') !== -1) {
                browser_user_info.ws_ip = 'wss://websocket.daofengdj.com:888';//接口获取
            };
        },
        /**
         *给主窗口发送信息
         *
         * @param {*} type
         * @param {*} data
         */
        to_trunk: function (type, data) {
            if (_de_bug) {
                //3000是发给服务器的
                if ((type === 2005) || (type === 3000)) {
                    _BROWSER_CHAT.de_bug_data_turnover("browser_de_bug_intrunk", type, data);
                } else {
                    _BROWSER_CHAT.de_bug_data_turnover("browser_de_bug_intrunk", type, data);
                };
            }
        },
        /**
         *聊天窗口切换
         *
         * @param {*} uid
         */
        change_check: function (uid, nickname) {
            // 头部昵称
            $(".top_title .title").text(nickname);
            $(".chat_l_id_" + uid).addClass("on").siblings().removeClass("on");
            $(".chat_r_id_" + uid).addClass("on").siblings().removeClass("on");
            // 更改滚动状态
            var ind = _BROWSER_CHAT.getobj_array_index(a.friend_user_info, "uid", uid);
            
            a.change_scroll_status(ind);
        },
        /**
         *获取换装秀消息
         *
         */
        get_show_msg_fn:function(page) {
            if (!a.show_msg_is_load) {
                a.show_msg_is_load = true;
            }
            if (page < 1) {
                a.show_msg_current_page = 1;
                layer.msg("已经到第一页了~", { time: 1000 });
                return false;
            }
            if (page > a.show_msg_last_page){
                layer.msg("已经到最后一页了~",{time:1000});
                return false;
            }
            $(".show_msg_list").html("");
            $("#show_msg_page_info").html("");
            var url = "/user/message/type_list";
            $(".chat_right .chat_r_id_999999 .show_msg_list").html("");
            var post_data = {
                page:page,
                type:"show",
                page_size:10,
            };
            _BROWSER_CHAT.ajax(url,post_data,function(res){
                if(res.code==1) {
                    var json = res.data;
                    if (json.total>0){
                        
                        a.show_msg_current_page = json.current_page;// 当前页
                        a.show_msg_last_page = json.last_page;//最后一页
                        
                        a.show_msg.list = json.data;
                        // console.log(a.show_msg.list);
                        $.each(a.show_msg.list, function (i, item) {
                            a.create_show_msg_right(item);
                            $(".chat_right .chat_r_id_999999 .show_msg_list").append(item.dom_right);
                        });
                        var str = '<div class="show_msg_pre_btn btn">上一页</div><div class="show_msg_next_btn btn">下一页</div>';
                        $("#show_msg_page_info").html(str);
                        if ((a.show_msg_last_page > a.show_msg_current_page) && a.show_msg_current_page === 1) {//第一页 有下一页
                            $("#show_msg_page_info").addClass("on");
                            $("#show_msg_page_info").find(".show_msg_pre_btn").attr("disabled", true).addClass("on");
                            $("#show_msg_page_info").find(".show_msg_next_btn").attr("disabled", false).removeClass("on");
                        } else if ((a.show_msg_last_page > a.show_msg_current_page) && a.show_msg_current_page != 1) {//中间页 有下一页
                             $("#show_msg_page_info").addClass("on");
                            $("#show_msg_page_info").find(".show_msg_pre_btn").attr("disabled", false).removeClass("on");
                            $("#show_msg_page_info").find(".show_msg_next_btn").attr("disabled", false).removeClass("on");
                        } else if (!(a.show_msg_last_page > a.show_msg_current_page) && a.show_msg_current_page != 1) {//最后一页
                             $("#show_msg_page_info").addClass("on");
                            $("#show_msg_page_info").find(".show_msg_pre_btn").attr("disabled", false).removeClass("on");
                            $("#show_msg_page_info").find(".show_msg_next_btn").attr("disabled", true).addClass("on");
                        } else if (!(a.show_msg_last_page > a.show_msg_current_page) && a.show_msg_current_page === 1) {//第一页 没有下一页 不显示分页
                             $("#show_msg_page_info").removeClass("on");
                        };
                        // console.log(a.show_msg_current_page);
                        // 上一页
                        $("#show_msg_page_info").find(".show_msg_pre_btn").click(function () {
                            a.get_show_msg_fn(a.show_msg_current_page - 1);
                        });
                        // 下一页
                        $("#show_msg_page_info").find(".show_msg_next_btn").click(function () {
                            a.get_show_msg_fn(a.show_msg_current_page + 1);
                        });
                        
                    }else {
                        $(".chat_right .chat_r_id_999999 .show_msg_empty").fadeIn();
                    }
                }
            });
        },
        /**
         *创建聊天窗口
         *
         * @param {*} item
         */
        insert_chat_dom: function (item, is_one_item) {
            // 头部昵称
            $(".top_title .title").text(item.nickname);
            // 左侧
            a.create_chat_left(item);
            $(".chat_left ").append(item.dom_left);
            
            // 右侧
            a.create_chat_right(item);
            $(".chat_right ").append(item.dom_right);
            // 滚动到页面底部
            setTimeout(function() {
                a.scroll_bottom_fn(item, false);
            },200);
           
            if (!is_one_item){
                item.dom_left.addClass("on").siblings().removeClass("on");
                item.dom_right.addClass("on").siblings().removeClass("on");
            }
        },
        /**
         *创建换装秀窗口
         *
         * @param {*} item
         */
        insert_show_msg_dom: function (item,is_one_item) {
            // console.log(item);
            
            // 头部昵称
            $(".top_title .title").text(item.nickname);
            // 左侧
            a.create_show_msg_left(item);
            $(".chat_left").append(item.dom_left);

            // 右侧
            a.create_show_msg_right(item);
            $(".chat_right").append(item.dom_right);
           
            if (!is_one_item) {
                item.dom_left.addClass("on").siblings().removeClass("on");
                item.dom_right.addClass("on").siblings().removeClass("on");
            }
        },
        /**
         *更改 滚动状态  设置当前窗口滚动状态为false，其它窗口为true ，用于新消息提醒
         *
         * @param {*} friend_user_info
         */
        change_scroll_status: function (ind) {
            $.each(a.friend_user_info, function (i, item) {
                if (i != ind) {
                    item._chat_scroll_status = true;
                } else {
                    a.scroll_bottom_fn(item,true);
                }
            });
        },
        /**
         *滚动到页面底部
            *
            */
        scroll_bottom_fn: function (item,is_see) {
            
            var scrollHeight = item.dom_right.find(".chat_list")[0].scrollHeight;// 聊天内容文档高度
            var clientHeight = item.dom_right.find(".chat_list")[0].clientHeight;// 可视区域高度
            var scrollTop = scrollHeight > clientHeight ? scrollHeight : clientHeight; // 取最高高度作为滚动高度
            item.dom_right.find(".chat_list")[0].scrollTop = scrollTop;
            if (is_see){
                item._chat_scroll_status = false;
                item.dom_right.find(".new_msg_wrapper").removeClass("on");
                item.dom_right.find(".new_msg_wrapper").find(".num").text("0");
                item.dom_num.removeClass("on");
                item.dom_num.text("0");

                // 更新改变未读状态为已读
                a.update_see_status(item);
            };
            
        },
        /**
         * 判断文档是否是滚动到底部
         *
         * @returns true 到底部，false 没有到底部
         */
        check_scroll_bottom: function (item) {
            var scrollHeight = item.dom_right.find(".chat_list")[0].scrollHeight;// 聊天内容文档高度
            var clientHeight = item.dom_right.find(".chat_list")[0].clientHeight;// 可视区域高度
            var scrollTop = item.dom_right.find(".chat_list")[0].scrollTop;//隐藏区域高度
            if (scrollHeight - scrollTop == clientHeight) {
                // 如果 聊天内容文档高度-藏区域高度=可视区域高度  则代表滚动到页面底部
                return true;
            } else {
                return false;
            };
        },

        /**
         *创建 消息
         *
         * @param {*} info 窗口对象
         * @param {*} type type 0：提示信息，1:是时间,2:对方发的消息,3:自己发的消息
         * @param {*} content 消息内容
         * @param {*} msg_type 消息类型（text文本，image图片，voice，语音,phone,通话）
         * @param {*} see_state 查看状态   true,false
         * @param {*} send_state 发送状态 0 发出，1 发送成功，2，发送失败
         * @param {*} to_uid 接收人id
         * @param {*} uid 发送人uid
         * @param {*} message_id 消息id
         * @param {*} avatar 发送消息人头像
         * @param {*} nickname  发送人昵称
         * @param {*} time 创建时间
         * @returns
         */
        create_msg: function (info, type, content, msg_type, see_state, send_state, to_uid, uid, message_id, avatar, nickname, time) {
            // console.log(info);
            var msg_info = {
                type: type, // 1:是时间,2:对方发的消息,3:自己发的消息
                content: content,// 消息内容
                msg_type: msg_type, // 消息类型（text文本，image图片，voice，语音）
                see_state: see_state, // 读取状态
                send_state: send_state, // 发送状态 0 发出，1 发送成功，2，发送失败
                to_uid: to_uid, // 接收人id
                uid: uid, // 发送人uid
                message_id: message_id,// 消息id
                create_time: time,//创建时间
                avatar: avatar,//发送消息人头像
                nickname: nickname,//发送人昵称
            };
            if (type == 2 || type == 3) {
                info.send_text_temp.push(msg_info);
                // 获取当前 消息缓存
                var s_cur_chat_msgs = JSON.parse(localStorage.getItem("browser_chat_room_" + a.my_user_info.uid + "_" + info.uid));

                s_cur_chat_msgs.push(msg_info);
                localStorage.setItem("browser_chat_room_" + a.my_user_info.uid + "_" + info.uid, JSON.stringify(s_cur_chat_msgs));
            }
            return msg_info;
        },

        /**
         *两次消息之间 发送间隔超过 5分钟，插入时间间隔
         *
         * @param {*} info 窗口对象
         * @param {*} message_id 消息id
         * @param {*} time 创建时间
         */
        insert_chat_time_dom: function (info, message_id, time) {
            // 五分钟未发送消息 插入时间
            if ((time - info._chat_temp_timestamp) > (5 * 60)) {
                var msg_info = a.create_msg(info, 1, message_id, "chat_time", true, 1, info.uid, a.my_user_info.uid, message_id, "", "", time);
                // 创建页面结构
                a.create_chat_item_dom(info, msg_info);
                // 加入页面
                info.dom_right.find(".chat_content").append(msg_info.dom);
                // 最新消息时间 赋值给 临时时间戳 用于下次判断 是否插入时间dom
                info._chat_temp_timestamp = time;
            };
        },

        /**
         *发送消息
            *
            * @param {*} arr
            */
        send_msg: function (info, content) {

            // 去除左右两端空格
            content = content.replace(/(^\s*)|(\s*$)/g, "");
            if (content == "") {
                layer.msg("消息不能为空");
                return false;
            };
            // 消息id 当前时间戳
            var message_id = (Math.floor(Math.random() * 100000) + 1) + "";
            var time = a.get_timestamp();
            // 两次消息之间 发送间隔超过 5分钟，插入时间间隔
            a.insert_chat_time_dom(info, message_id, time);
            
            
            var wsdata = {
                action: 'one_chat',
                token: browser_user_info.token,
                device_id: browser_user_info.device_id,
                termtyp: 'web',
                data: {
                    message_id: message_id,// 消息id
                    content: content,//内容
                    msg_type: 'text',// 消息类型（text文本，image图片，voice，语音）
                    to_uid: info.uid// 发给谁
                }
            };
            // console.log(wsdata);
            // 发送信息
            _BROWSER_MESSG.to_ws(3000, JSON.stringify(wsdata));
            // a.to_trunk(2004, JSON.stringify(wsdata));
            // 生成消息对象
            var msg_info = a.create_msg(info, 3, content, "text", true, 0, info.uid, a.my_user_info.uid, message_id, a.my_user_info.avatar, a.my_user_info.nickname, time);
            // 创建 聊天结构
            a.insert_chat_item_dom(info, msg_info);
        },
        /**
         *发送图片消息
            *
            * @param {*} img_path
            */
        send_img_msg: function (return_info) {
            var info = a.get_ele_arr(a.friend_user_info, "uid", return_info.uid);
            // 消息id 当前时间戳
            var message_id = (Math.floor(Math.random() * 100000) + 1) + "";
            var time = a.get_timestamp();
            var msg_info = {};
            
            msg_info = a.create_msg(info, 3, return_info.img_path, "image", true, 0, info.uid, a.my_user_info.uid, message_id, a.my_user_info.avatar, a.my_user_info.nickname, time);
            var wsdata = {
                action: 'one_chat',
                token: browser_user_info.token,
                device_id: browser_user_info.device_id,
                termtyp: 'web',
                data: {
                    message_id: message_id,// 消息id
                    content: return_info.img_path,//内容
                    msg_type: 'image',// 消息类型（text文本，image图片，voice，语音）
                    to_uid: info.uid// 发给谁
                }
            };
            // 发送消息
            _BROWSER_MESSG.to_ws(3000, JSON.stringify(wsdata));
            a.insert_chat_item_dom(info, msg_info);
            
            // 上传loading 隐藏
            info.dom_right.find(".up_img_status").removeClass("on");
        },
        /**
         * 聊天信息 插入 房间
         *
         * @param {*} msg_info 要插入的聊天信息
         */
        insert_chat_item_dom: function (info, msg_info) {
            // 创建 聊天结构
            a.create_chat_item_dom(info, msg_info);
            a.chats.push(msg_info);
            // 加入页面
            info.dom_right.find(".chat_content").append(msg_info.dom);
            // console.log(21212112211221);
            
            // 滚动到页面底部
            a.scroll_bottom_fn(info,false);

            // 标记 窗口打开状态（1：打开，2：打开之后第一次发送信息，undefined：关闭）

            setTimeout(function () {
                if (Number(LS.get("chat_room_status_" + a.my_user_info.uid + "_" + info.uid)) === 1) {
                    LS.set("chat_room_status_" + a.my_user_info.uid + "_" + info.uid, "2");
                    // info.message_id = msg_info.message_id;
                    var friend_notice = {
                        id: info.uid,
                        avatar: info.avatar,
                        nickname: info.nickname,
                        num: 0,
                        uid: info.uid,
                        login_status: info.login_status,
                        type: 2,
                        time: a.format_time(msg_info.create_time),
                        timestamp: msg_info.create_time,
                        dom: false
                    };
                    // 打开窗口第一次发送信息 给消息列表插入 用户信息
                    a.to_trunk(2006, JSON.stringify(friend_notice));
                }
            }, 500);
        },
        /**
         *关闭窗口
         *
         */
        close_pop: function () {
            // 清空 聊天窗口数组
            $(".msg_chat_w").fadeOut();
            // console.log(22222222222222);
            
            _BROWSER_CHAT.chat_pop_show = false;
            for (var i = 0; i < a.friend_user_info.length; i++) {
                if (a.friend_user_info[i].dom_left){
                    a.friend_user_info[i].dom_left.remove();
                    a.friend_user_info[i].dom_right.remove();
                }
            };
            //关闭ws进行重新连接
            _Brower_WS.no_reconnect = true;
            // console.log(_Browser_Websocket);
            if (window._Browser_Websocket){
                window._Browser_Websocket.close();
            };
            a.show_msg_is_load= false;
            _BROWSER_CHAT.friend_user_info = [];
            LS.set("browser_chat_user_info","[]");
            _BROWSER_CHAT.b_chat_user_info = [];
           
        },
        /**
         *ESC关闭聊天窗口
         *
         */
        // close_esc_pop: function () {
        //     var uid = $(".chat_left .chat_l_i.on").attr("uid");
        //     var friend_dom = a.get_ele_arr(a.friend_user_info, "uid", uid, true);
        //     a.close_one_pop(friend_dom);
        // },
        /**
         *关闭单个窗口
         *
         * @param {*} item
         */
        close_one_pop: function (item) {
            // console.log(item);
            var is_del = a.del_ele_arr(a.friend_user_info, "uid", item.uid, true);
            var l = a.friend_user_info.length;
            if (l == 0) {
                LS.set("browser_chat_user_info", "[]");
                a.close_pop();
            } else {
                if (is_del) {
                    // 清除单个聊天窗口数据
                    a.del_ele_arr(a.b_chat_user_info, "uid", item.uid, false);
                    var temp_chat_user_info = JSON.parse(LS.get("browser_chat_user_info"));
                    a.del_ele_arr(temp_chat_user_info, "uid", item.uid, false);
                    LS.set("browser_chat_user_info", JSON.stringify(temp_chat_user_info));
                    // 切换选中
                    a.change_check(a.friend_user_info[l - 1].uid, a.friend_user_info[l - 1].nickname);
                }
            }
        },
        /**
         * 
         * =============================================================================
         * 
         * ===============================聊天消息操作================================
         * 
         * =============================================================================
         * 
         */
        /**
         *未读消息 用于计算未读消息数量
         *
         */
        get_unread_notice: function () {
            // 缓存消息
            if (LS.get("b_s_wf_notice_" + _BROWSER_CHAT.my_user_info.uid) == undefined) {//查找是否已经缓存，没有缓存则缓存消息
                //消息列表
                var wf_notice = '{"list":[]}';
                LS.set("b_s_wf_notice_" + _BROWSER_CHAT.my_user_info.uid, wf_notice);
                var l_wf_notice_temp = LS.get("b_s_wf_notice_" + _BROWSER_CHAT.my_user_info.uid);
                _BROWSER_CHAT.wf_notice = JSON.parse(l_wf_notice_temp);
            }
            // alert(LS.get("b_s_wf_notice_"+_BROWSER_CHAT.my_user_info.uid));
            var urls = "/user/message/unread_num";
            var post_data = {};
            _BROWSER_CHAT.ajax(urls, post_data, function (res) {
                if (res.code === 1) {
                    // 通过固定参数 msg_type 分组 未读消息
                    var group_arr = a.group_array_fn("msg_type", res.chat_one);
                    // console.log(group_arr);
                    
                    var notice_show = res.new_show;
                    // 判断有没有未读消息
                    if (!$.isEmptyObject(group_arr)) {// 有未读消息
                        // console.log(group_arr);
                        
                        // 所有聊天消息数据 分三种类型（ text,image,voice ）插入 chat 列表
                        $.each(group_arr.text, function (index, item) {
                            _BROWSER_CHAT.wf_unread_notice.data.chat.push(item);
                        });
                        $.each(group_arr.image, function (index, item) {
                            _BROWSER_CHAT.wf_unread_notice.data.chat.push(item);
                        });
                        $.each(group_arr.voice, function (index, item) {
                            _BROWSER_CHAT.wf_unread_notice.data.chat.push(item);
                        });

                    };

                    /**
                     * ===================================chat_step_1============================
                     *
                     *    打开软件 登录之后 判断ws 中有没有 未读聊天信息
                     *
                     *    messg.js中onmessg方法 处理 ws发送的信息 one_chat：代表 收到聊天信息 此为：chat_step_2
                     *
                     * ==========================================================================
                     */
                    // 聊天消息
                    if (_BROWSER_CHAT.wf_unread_notice.data.chat.length > 0) {//存在聊天消息
                        //console.log("chat"+_BROWSER_CHAT.wf_unread_notice.data.chat.length);

                        // 把服务器返回 聊天数据，存储为自己要的格式
                        var msg_info_temp = [];
                        $.each(_BROWSER_CHAT.wf_unread_notice.data.chat, function (index, item) {
                            // 消息模板
                            var msg_info = {
                                type: 2, // 1:是时间,2:对方发的消息,3:自己发的消息
                                content: item.content,// 消息内容
                                msg_type: item.msg_type, // 消息类型（text文本，image图片，voice，语音）
                                see_state: false, // 读取状态
                                send_state: 1, // 发送状态 0 发出，1 发送成功，2，发送失败
                                to_uid: item.to_uid, // 接收人id
                                uid: item.uid, // 发送人uid
                                message_id: item.message_id,// 消息id
                                create_time: item.create_time,//创建时间
                                avatar: item.avatar,//发送消息人头像
                                nickname: item.nickname,//发送人昵称

                            };
                            msg_info_temp.push(msg_info);
                        });

                        // 新数据添加，去重，保留本地数据
                        $.each(msg_info_temp, function (index, item) {
                            // 获取当前房间 聊天信息缓存
                            var s_chat_room_msg = JSON.parse(LS.get("browser_chat_room_" + _BROWSER_CHAT.my_user_info.uid + "_" + item.uid));
                            if (!s_chat_room_msg) {// 不存在
                                s_chat_room_msg = [];
                                s_chat_room_msg.push(item);
                            } else {// 存在本地缓存
                                // 新数据添加，去重，保留本地数据
                                var is_in = false;
                                for (var ii = 0; ii < s_chat_room_msg.length; ii++) {
                                    if (item.message_id == s_chat_room_msg[ii].message_id) {
                                        is_in = true;
                                    }
                                }
                                if (!is_in) {
                                    s_chat_room_msg.push(item);
                                }
                            };

                            // // 未读消息数
                            var num = a.get_ele_num(s_chat_room_msg, "see_state", false);
                            // 更新缓存
                            // a.update_notice_friend(s_chat_room_msg[s_chat_room_msg.length - 1], num);
                            // 消息存储
                            LS.set("browser_chat_room_" + _BROWSER_CHAT.my_user_info.uid + "_" + item.uid, JSON.stringify(s_chat_room_msg));

                        });

                    } else {// 不存在聊天消息
                        //console.log(1010101010);
                    };

                    // 消息列表 存在 好友消息缓存 则加入 消息列表缓存
                    if (LS.get("b_s_wf_friend_notice_" + _BROWSER_CHAT.my_user_info.uid) && JSON.parse(LS.get("b_s_wf_friend_notice_" + _BROWSER_CHAT.my_user_info.uid)).length > 0) {
                        $.each(JSON.parse(LS.get("b_s_wf_friend_notice_" + _BROWSER_CHAT.my_user_info.uid)), function (i, item) {
                            a.set_LS_wf_notice(item);
                        });
                    }else {
                        LS.set("b_s_wf_friend_notice_" + _BROWSER_CHAT.my_user_info.uid,"[]")
                    };
                    var temp_s_wf_notice = JSON.parse(LS.get("b_s_wf_notice_" + _BROWSER_CHAT.my_user_info.uid));
                    temp_s_wf_notice.list.sort(a.compare("timestamp")).reverse();
                    LS.set("b_s_wf_notice_" + + _BROWSER_CHAT.my_user_info.uid, JSON.stringify(temp_s_wf_notice));
                    _BROWSER_CHAT.wf_notice = temp_s_wf_notice;

                    // _BROWSER_CHAT.get_notice_list();
                    // 获取 未读消息数量
                    a.get_unread_num(notice_show);
                } else {
                    layer.msg(res.msg);
                }

            });
        },
        /**
         *获取 未读消息数量
         *
         */
        get_unread_num: function (notice_show) {
            var temp_num = 0;
            var temp_friend_notice = JSON.parse(LS.get("b_s_wf_friend_notice_" + a.my_user_info.uid));
            $.each(temp_friend_notice, function (i, item) {
                var temp_notice_i = JSON.parse(LS.get("browser_chat_room_" + a.my_user_info.uid + "_" + item.uid));
                var num = a.get_ele_num(temp_notice_i, "see_state", false);
                temp_num = temp_num + num;
            });
            if(notice_show>0){
                a.unread_num = Number(temp_num) + Number(notice_show);
            }else {
                a.unread_num = Number(temp_num);
            }
            
            // 存在未读消息 
            if (a.unread_num > 0) {
                $(".sidebar-btn.a-move-in-left.message .side_new_msg").addClass("on");
            } else {
                $(".sidebar-btn.a-move-in-left.message .side_new_msg").removeClass("on");
            };
        },
        /** 
         * 消息列表内容 
         * 
        */
        get_notice_list: function () {
            // console.log(_BROWSER_CHAT.wf_notice);
            if (_BROWSER_CHAT.friend_user_info.length > 0) {
                $.each(_BROWSER_CHAT.friend_user_info, function (index, item) {
                    //判断消息类型，1：系统消息，2，好友消息
                    if (item.type === 1) {
                        // 创建系统消息dom结构
                        a.create_sys_notice_dom(item);
                    } else if (item.type === 2) {
                        a.insert_chat_dom(item);
                    }
                    
                    // // 如果dom 已生成 结构插入页面
                    // if (item.dom) {
                    //     DATA.wf_content_notice.append(item.dom);
                    //     // 好友列表 未读消息数量
                    //     $.each(DATA.wf_all_friend, function (i, iitem) {
                    //         if (item.uid == iitem.uid) {
                    //             if (item.num > 0) {
                    //                 iitem.dom_num.text(item.num);
                    //                 iitem.dom_num.addClass("on");
                    //             }
                    //         };
                    //     });
                    // }
                });
            }
        },
        /**
         *
         *
         * @param {*} item 
         */
        /**
         *弹出聊天框
         *
         * @param {*} item 好友数据
         * @param {*} is_one_item 是否是单独一个打开
         */
        show_chat_pop: function (item, is_one_item) {
            if (is_one_item){
                // ws链接被关闭
                if (_Brower_WS.ws_state === 2) {
                    //重新连接ws
                    _Brower_WS.no_reconnect = false;
                    _Brower_WS.open_ws();
                };
            }
            if (!a.show_msg_is_load){
                _BROWSER_CHAT.get_show_msg_fn(1);
            }
           
            /**
             * ===================================chat_step_1_1============================
             *
             *    聊天第一步 打开聊天窗口
             *
             *
             * ==========================================================================
             */
            var chat_data_fn = function (item) {
                // 标记 窗口打开状态（1：打开，2：打开之后第一次发送信息，undefined：关闭）
                LS.set("chat_room_status_" + a.my_user_info.uid + "_" + item.uid, "1");
                // 获取当前房间 聊天信息缓存
                var s_chat_room_msg = JSON.parse(LS.get("browser_chat_room_" + a.my_user_info.uid + "_" + item.uid));
                // 当前房间聊天信息数量
                if (!s_chat_room_msg || s_chat_room_msg.length < 1) {//不存在 则创建缓存
                    LS.set("browser_chat_room_" + a.my_user_info.uid + "_" + item.uid, "[]");
                } else {// 存在
                    if (s_chat_room_msg.length > 300) {// 本地只保留300条数据
                        // 超过的条数
                        var del_num = s_chat_room_msg.length - 300;
                        // 删除超过的数量
                        s_chat_room_msg.splice(0, del_num);
                    }
                    // 判断是否是单个点击
                    if (is_one_item){
                        // console.log(23234342342);
                        a.update_see_status(item);
                    };
                };
            };
            
            // 缓存用户信息
            var store_user_info = function (item) {
            
                _BROWSER_CHAT.b_chat_user_info.push(item);
                // 聊天id 存入缓存
                LS.set("browser_chat_user_info", JSON.stringify(_BROWSER_CHAT.b_chat_user_info));
            };
            
            // 告诉聊天窗口谁来了
            var tel_chat = function (item, is_exist, is_first) {
                // 给聊天窗口发送信息告诉谁来了
                var to_chat_msg = {
                    uid: item.uid,
                    chat_id: item.uid,// 聊天人员id
                    nickname: item.nickname,//昵称
                    is_exist: is_exist,//聊天窗口是否存在
                    is_first: is_first,//是否是首次打开聊天面板
                };
                $.each(JSON.parse(LS.get("browser_chat_user_info")), function (i, item) {
                    // 不在_BROWSER_CHAT.friend_user_info 中存在，才加进去
                    if (!_BROWSER_CHAT.get_ele_num(_BROWSER_CHAT.friend_user_info, "uid", item.uid)) {
                        _BROWSER_CHAT.friend_user_info.push(item);
                    }
                });
                if (to_chat_msg.is_exist&&item.dom_left) {
                    // 单独一个打开
                    if(is_one_item) {
                        _BROWSER_CHAT.change_check(to_chat_msg.uid, to_chat_msg.nickname);
                    }
                } else {
                    var temp_chat = _BROWSER_CHAT.get_ele_arr(_BROWSER_CHAT.friend_user_info, "uid", to_chat_msg.uid);
                    if (temp_chat) {
                        _BROWSER_CHAT.insert_chat_dom(temp_chat, is_one_item);
                    }
                }
            };

            // 聊天窗口是否存在
            var chat_is_exist = a.get_ele_num(JSON.parse(LS.get("browser_chat_user_info")), "uid", item.uid);
            if (!chat_is_exist) {
                // 不存在
                // 聊天用户信息存储
                store_user_info(item);
                // 用户 聊天消息操作
                chat_data_fn(item);
            }
            
            // 告诉聊天窗口谁来了
            tel_chat(item, chat_is_exist, 0);
            
            // 显示 弹窗
            $(".msg_chat_w").fadeIn();
            
            // 标记窗口打开
            _BROWSER_CHAT.chat_pop_show = true;
        },
        /**
         *更新改变未读状态为已读
         *
         * @param {*} item 当前聊天对象
         */
        update_see_status: function (item) {
            // 当前窗口 聊天信息缓存
            var s_chat_room_msg = JSON.parse(LS.get("browser_chat_room_" + a.my_user_info.uid + "_" + item.uid));
            if (s_chat_room_msg.length>0){
                // 所有数据 未读状态修改 为已读
                a.edit_ele_arr(s_chat_room_msg, "see_state", false, "see_state", true);
                // 设置缓存
                LS.set("browser_chat_room_" + a.my_user_info.uid + "_" + item.uid, JSON.stringify(s_chat_room_msg));
                item.num = 0;
                // 更新 好友 dom
                a.update_friend_notice(item);

                // 消息列表，聊天消息本地缓存
                // 消息列表内容
                var friend_notice = {
                    id: item.uid,
                    avatar: item.avatar,
                    nickname: item.nickname,
                    num: 0,
                    uid: item.uid,
                    login_status: item.login_status,
                    type: 2,
                    time: a.format_time(s_chat_room_msg[s_chat_room_msg.length - 1].create_time),
                    timestamp: s_chat_room_msg[s_chat_room_msg.length - 1].create_time,
                    dom: false
                };
                // 更新消息列表本地存储
                a.set_LS_friend_notice(friend_notice);
                // 获取未读消息数量
                a.get_unread_num(0);
            }
            
        },
        // 判断图片类型
        check_file: function (filePath, obj, this_file,uid) { //input $(this).val()，$(this),this
            var _this = a;
            var filePath = filePath;
            if ("" != filePath) {
                var fileType = this.getFileType(filePath);
                //判断上传的附件是否为图片  
                if ("jpg" != fileType && "jpeg" != fileType && "bmp" != fileType && "png" != fileType && "gif" != fileType) {
                    layer.msg("请上传JPG,JPEG,BMP,PNG,GIF格式的图片");
                    return false;
                } else {
                    //获取附件大小（单位：KB）  
                    var fileSize = this_file.files[0].size / 1024;
                    if (fileSize > 2408) {
                        layer.msg("图片大小不能超过2MB");
                        return false;
                    } else {
                        // 又拍云 第一步
                        _this.uploadStep1(this_file.files[0],uid);
                        return true;
                    }
                }
            }
        },
        // 获取文件类型
        getFileType: function (filePath) {
            var startIndex = filePath.lastIndexOf(".");
            if (startIndex != -1)
                return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
            else return "";
        },
        // 又拍云上传 step1
        uploadStep1: function (file,uid) {
            var _this = a;
            var ajax_url = "/user/upyunfile/upYunFormApiSign";
            var post_data = {
                uploadPath: 'files'
            };
            a.ajax(ajax_url, post_data, function (res) {
                if (res.code == 1) {
                    
                    var policy = res.data.policy;
                    var authorization = res.data.authorization;
                    // 又拍云 第二步
                    _this.uploadStep2("https://v0.api.upyun.com/dianjing", file, uid, policy, authorization);
                } else {

                };
            });

        },
        // 又拍云上传 step2
        uploadStep2: function (url, file, uid, policy, authorization) {
            var _this = a;
            var fd = new FormData();
            fd.append('file', file);//上传的文件： 键名，键值
            fd.append('policy', policy);//上传的文件： 键名，键值
            fd.append('authorization', authorization);//上传的文件： 键名，键值
            var XHR = null;
            if (window.XMLHttpRequest) {
                // 非IE内核
                XHR = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                // IE内核，这里早期IE版本不同，具体可以查下
                XHR = new ActiveXObject("Microsoft.XMLHTTP");
            } else {
                XHR = null;
            }
            if (XHR) {
                XHR.open("POST", url);
                XHR.onreadystatechange = function () {
                    if (XHR.readyState == 4 && XHR.status == 200) {
                        var resultValue = XHR.responseText;
                        //  返回数据
                        var data = JSON.parse(resultValue);

                        var file_path = data.url;
                        var file_size = data.file_size;
                        var mimetype = data.mimetype;
                        // 又拍云 第三步
                        _this.uploadStep3(file_path, file_size, mimetype,uid);

                        XHR = null;
                    }
                }
                XHR.send(fd);
            }
        },
        // 又拍云上传 step3 需要新图片上传接口
        uploadStep3: function (file_path, file_size, mimetype,uid) {
            var _this = a;
            var img_url = "https://img1.daofengdj.com"+file_path;
            var to_chat_info = {
                img_path: img_url,
                uid: uid
            };
            if (file_path){
                _BROWSER_CHAT.send_img_msg(to_chat_info);
            }else {
                layer.msg("图片上传失败");
            }
            
        },
        /**
         *设置消息列表 本地缓存
         *
         * @param {*} item 验证消息 或者 好友消息
         */
        set_LS_wf_notice: function (item) {
            // 消息列表缓存 数据
            var temp_notice = JSON.parse(LS.get("b_s_wf_notice_" + a.my_user_info.uid));
            // 判断数组中是否存在 验证消息数据
            var s_p_num = a.get_ele_num(temp_notice.list, "id", item.id);
            if (s_p_num > 0) {// 本地存在 验证消息 则删除 再追加
                //console.log(555555);
                if (a.del_ele_arr(temp_notice.list, "id", item.id, false)) {
                    temp_notice.list.push(item);
                };
                LS.set("b_s_wf_notice_" + a.my_user_info.uid, JSON.stringify(temp_notice));
            } else {
                //console.log(66666);
                temp_notice.list.push(item);
                LS.set("b_s_wf_notice_" + a.my_user_info.uid, JSON.stringify(temp_notice));
            }
        },
        /**
         * 插入消息列表 好友消息dom
         *
         * @param {*} item
         */
        insert_wf_friend_notice: function (friend_notice) {
            // console.log(232323);

            // console.log(friend_notice);
            // 存储 消息列表 聊天数据
            a.set_LS_friend_notice(friend_notice);
           
            // 判断数组中是否存在 好友消息数据
            // console.log(_BROWSER_CHAT.friend_user_info);
            
            var s_f_num = a.get_ele_num(_BROWSER_CHAT.friend_user_info, "id", friend_notice.id);
            if (s_f_num > 0) {// 本地存在 好友消息 则删除 再追加
                // var info = _BROWSER_CHAT.get_ele_arr(_BROWSER_CHAT.friend_user_info, "uid", friend_notice.uid);
                // if (info) {//存在聊天窗口
                //     var msg_info = _BROWSER_CHAT.create_msg(info, 2, data.content, data.msg_type, true, 1, data.to_uid, data.uid, data.message_id, data.avatar, data.nickname);
                //     // 创建 聊天结构
                //     _BROWSER_CHAT.create_chat_item_dom(info, msg_info);
                //     // 加入页面
                //     info.dom_right.find(".chat_content").append(msg_info.dom);
                //     // 更改聊天面板未读消息  数量
                //     _BROWSER_CHAT.change_left_num(info);
                // }
            } else {
                _BROWSER_CHAT.friend_user_info.unshift(friend_notice);
                // 如果弹窗打开了
                if(_BROWSER_CHAT.chat_pop_show){
                    // 生成dom 结构
                    a.insert_chat_dom(friend_notice,true);
                }
                
            }
        },
        /**
         * 聊天窗口不存在 则聊天信息 添加到本地缓存
         *
         * @param {*} json
         */
        set_LS_msg: function (json) {
            // console.log(json);
            
            // 获取当前房间 聊天信息缓存
            var s_chat_room_msg = JSON.parse(LS.get("browser_chat_room_" + a.my_user_info.uid + "_" + json.userid));
            if (!s_chat_room_msg) {//不存在 聊天缓存
                // 聊天消息对象
                var msg_info = [{
                    type: 2, // 1:是时间,2:对方发的消息,3:自己发的消息
                    content: json.content,// 消息内容
                    msg_type: json.msg_type, // 消息类型（text文本，image图片，voice，语音）
                    see_state: false, // 读取状态
                    send_state: true, // 发送状态
                    to_uid: json.to_uid, // 接收人id
                    uid: json.userid, // 发送人uid
                    message_id: json.message_id,// 消息id
                    create_time: json.timestamp,//创建时间
                    avatar: json.avatar,//发送消息人头像
                    nickname: json.nickname,//发送人昵称
                }];
                // 设置缓存
                LS.set("browser_chat_room_" + a.my_user_info.uid + "_" + json.userid, JSON.stringify(msg_info));
            } else {// 存在
                // 聊天消息对象
                var msg_info = {
                    type: 2, // 1:是时间,2:对方发的消息,3:自己发的消息
                    content: json.content,// 消息内容
                    msg_type: json.msg_type, // 消息类型（text文本，image图片，voice，语音）
                    see_state: false, // 读取状态
                    send_state: true, // 发送状态
                    to_uid: json.to_uid, // 接收人id
                    uid: json.userid, // 发送人uid
                    message_id: json.message_id,// 消息id
                    create_time: json.timestamp,//创建时间
                    avatar: json.avatar,//发送消息人头像
                    nickname: json.nickname,//发送人昵称
                };
                // 加入列表
                s_chat_room_msg.push(msg_info);
                // 设置缓存
                LS.set("browser_chat_room_" + a.my_user_info.uid + "_" + json.userid, JSON.stringify(s_chat_room_msg));
            }
            // 未读消息数
            var num = a.get_ele_num(JSON.parse(LS.get("browser_chat_room_" + a.my_user_info.uid + "_" + json.userid)), "see_state", false);
            // 更新消息列表数据
            // 消息列表内容
            var friend_notice = {
                id: json.userid,
                avatar: json.avatar,
                nickname: json.nickname,
                num: num,
                uid: json.userid,
                login_status: 1,
                type: 2,
                time: a.format_time(json.timestamp),
                timestamp: json.timestamp,
                dom: false
            };
            // 判断消息列表是否存在好友对象
            var temp_notice_dom = a.get_ele_arr(_BROWSER_CHAT.friend_user_info, "uid", json.userid);
            // console.log(temp_notice_dom);
            
            if (temp_notice_dom && temp_notice_dom.dom_left) {// 存在则直接更新
                // 更新 新消息数量
                var msg_info = _BROWSER_CHAT.create_msg(temp_notice_dom, 2, json.content, json.msg_type, true, 1, json.to_uid, json.uid, json.message_id, json.avatar, json.nickname);
                // 创建 聊天结构
                _BROWSER_CHAT.create_chat_item_dom(temp_notice_dom, msg_info);
                // 加入页面
                temp_notice_dom.dom_right.find(".chat_content").append(msg_info.dom);
                // 更改聊天面板未读消息  数量
                _BROWSER_CHAT.change_left_num(temp_notice_dom);
            } else {// 不存在 创建
                // 更新 消息列表 好友信息
                a.insert_wf_friend_notice(friend_notice);
            };
        },
        /**
         * 更新消息列表 好友信息
         *
         * @param {*} friend_notice 好友信息
         */
        update_friend_notice: function (friend_notice) {
            // 获取好友对象
            var f_n_obj = a.get_ele_arr(_BROWSER_CHAT.friend_user_info, "uid", friend_notice.uid);
            if (f_n_obj) {// 存在 聊天消息
                // 更新 新消息数量
                f_n_obj.dom_num.text(friend_notice.num);
                if (friend_notice.num > 0) {
                    f_n_obj.dom_num.addClass("on");
                } else {
                    f_n_obj.dom_num.removeClass("on");
                };
            };
        },
        /**
         *设置 消息列表 好友缓存
         *
         * @param {*} unread_prove_num  数量
         * @param {*} time  时间
         */
        set_LS_friend_notice: function (friend_notice) {
            //console.log(888888);
            //console.log(friend_notice);
            // 消息列表，聊天消息本地缓存
            var s_f_n = JSON.parse(LS.get("b_s_wf_friend_notice_" + a.my_user_info.uid));
            if (!s_f_n) {//不存在
                s_f_n = [];
                s_f_n.push(friend_notice);
                LS.set("b_s_wf_friend_notice_" + a.my_user_info.uid, JSON.stringify(s_f_n));
                // 消息列表缓存 数据
                a.set_LS_wf_notice(JSON.parse(LS.get("b_s_wf_friend_notice_" + a.my_user_info.uid))[0]);
            } else {//存在
                // 判断数组中是否存在 好友消息数据
                var s_f_num = a.get_ele_num(s_f_n, "id", friend_notice.id);
                if (s_f_num > 0) {// 本地存在 好友消息 则删除 再追加
                    //console.log(9);
                    if (a.del_ele_arr(s_f_n, "id", friend_notice.id, false)) {
                        s_f_n.push(friend_notice);
                    };
                    LS.set("b_s_wf_friend_notice_" + a.my_user_info.uid, JSON.stringify(s_f_n));
                } else {
                    //console.log(10);
                    s_f_n.push(friend_notice);
                    //console.log(s_f_n);
                    LS.set("b_s_wf_friend_notice_" + a.my_user_info.uid, JSON.stringify(s_f_n));
                }
                // 消息列表缓存 数据
                $.each(JSON.parse(LS.get("b_s_wf_friend_notice_" + a.my_user_info.uid)), function (index, item) {
                    a.set_LS_wf_notice(item);
                });

            };
        },
        /**
         * 更新 消息列表 好友消息
         *
         * @param {*} info
         * @param {*} num
         */
        update_notice_friend: function (info, num) {
            // alert(DATA.wf_notice.list);
            // 更新数量
            // 消息列表 好友缓存
            var s_w_f_n = JSON.parse(LS.get("s_wf_friend_notice_" + DATA.wf_user_info.uid));

            if (s_w_f_n && s_w_f_n.length > 0) {// 存在
                var temp_arr = a.get_ele_arr(s_w_f_n, "uid", info.uid);
                if (temp_arr) {
                    temp_arr.num = num;
                } else {
                    // 消息列表内容
                    var friend_notice = {
                        id: info.uid,
                        avatar: info.avatar,
                        nickname: info.nickname,
                        num: num,
                        uid: info.uid,
                        login_status: 1,
                        type: 2,
                        time: a.format_time(info.create_time),
                        timestamp: info.create_time,
                        dom: false
                    };
                    s_w_f_n.push(friend_notice);
                };

            } else {// 不存在
                s_w_f_n = [];
                // 更新 消息列表 好友数据
                // 消息列表内容
                var friend_notice = {
                    id: info.uid,
                    avatar: info.avatar,
                    nickname: info.nickname,
                    num: num,
                    uid: info.uid,
                    login_status: 1,
                    type: 2,
                    time: a.format_time(info.create_time),
                    timestamp: info.create_time,
                    dom: false
                };
                s_w_f_n.push(friend_notice);
            };

            // 更新 消息列表 本地存储
            $.each(s_w_f_n, function (index, item) {
                a.set_LS_friend_notice(item);
            });

        },
        /**
         * 
         * =============================================================================
         * 
         * ===============================dom创建================================
         * 
         * =============================================================================
         * 
         */
        /**
         *聊天窗口左侧
         *
         * @param {*} item
         */
        create_show_msg_left: function (item) {
            // console.log(item);

            var obj = $("<div></div>");
            obj.attr("class", "chat_l_i");
            obj.addClass("chat_l_id_" + item.uid);
            obj.attr("nickname", item.nickname);
            obj.attr("uid", item.uid);
            if (item.is_on) {
                obj.attr("class", "on");
            }
            var str = "";
            str += '<div class="avatar_w">';
            str += '	<div class="wai">';
            str += '		<div class="nei">';
            str += '			<img src="' + item.avatar + '" alt="" class="avatar">';
            str += '		</div>';
            str += '	</div>';
            str += '</div>';
            str += '<div class="info_w">';
            str += '	<div class="nickname">' + item.nickname + '</div>';
            str += '	<div class="msg">UID:' + item.uid + '</div>';
            str += '</div>';
            str += '<div class="time_wrapper">';
            if (item.time) {
                str += '	<div class="time on">' + item.time + '</div>';
            } else {
                str += '	<div class="time"></div>';
            };
            if (item.num) {
                str += '	<div class="no_num on">' + item.num + '</div>';
            } else {
                str += '	<div class="no_num">0</div>';
            };
            str += '	<i class="icon_close"></i>';
            str += '</div>';
            obj.html(str);
            item.dom_left = obj;
            item.dom_num = obj.find(".no_num");
            // 头部切换
            obj.on("click", function () {
                _BROWSER_CHAT.change_check(item.uid, item.nickname);
            });
        },
        /**
         *聊天窗口主体
         *
         * @param {*} item
         */
        create_show_msg_right: function (item) {
            var info_data = item;
            var obj = $("<div></div>");
            obj.attr("class", "show_msg_item");
            if (item.show_type==1) {//赠送
                var str1 = "";
                str1 += '<a href="/show/user/show_order.html?type=1" target="_blank">';
                str1 += '    <div class="l">';
                str1 += '        <div class="wai">';
                str1 += '            <div class="nei">';
                str1 += '                <img src="' + item.order.goods_image+'" alt="">';
                str1 += '            </div>';
                str1 += '        </div>';
                str1 += '    </div>';
                str1 += '    <div class="m">';
                str1 += '        <div class="name_w">';
                str1 += '            <span class="name">' + item.order.goods_list[0].goods_name+'</span>';
                str1 += '            <span class="time">' + a.timestamp(item.dateline)+'</span>';
                str1 += '        </div>';
                str1 += '        <div class="price">价格：￥' + item.order.price.toFixed(2)+'</div>';
                str1 += '        <div class="user_info">赠送人：' + item.order.uid_name+'</div>';
                str1 += '        <div class="mark">留言：' + item.order.remark+'</div>';
                str1 += '    </div>';
                str1 += '    <div class="r">';
                str1 += '        <div class="r_c">';
                str1 += '        </div>';
                str1 += '    </div>';
                str1 += '</a>';
                obj.html(str1);
            } else if (item.show_type == 3) {//索要
                var str3 = "";
                
                str3 += '    <div class="l">';
                str3 += '        <div class="wai">';
                str3 += '            <div class="nei">';
                str3 += '                <img src="' + item.order.goods_image + '" alt="">';
                str3 += '            </div>';
                str3 += '        </div>';
                str3 += '    </div>';
                str3 += '    <div class="m">';
                str3 += '        <div class="name_w">';
                str3 += '            <span class="name">' + item.order.goods_list[0].goods_name + '</span>';
                str3 += '            <span class="time">' + a.timestamp(item.dateline) + '</span>';
                str3 += '        </div>';
                str3 += '        <div class="price">价格：￥' + item.order.price.toFixed(2) + '</div>';
                str3 += '        <div class="user_info">索要人：' + item.order.pw_uid_name +'('+item.order.pw_uid+')'+ '</div>';
                str3 += '        <div class="mark">留言：' + item.order.remark + '</div>';
                str3 += '    </div>';
                str3 += '    <div class="r">';
                str3 += '        <div class="r_c">';
                if (item.order.is_agree==0){
                    str3 += '            <div class="btn agree_btn">接受</div>';
                    str3 += '            <div class="btn deny_btn">拒绝</div>';
                }
                if (item.order.is_agree == 1) {
                    str3 += '            <div class="note">已接受</div>';
                }
                if (item.order.is_agree == 2) {
                    str3 += '            <div class="note">已狠心拒绝</div>';
                }
                str3 += '        </div>';
                str3 += '    </div>';
                obj.html(str3);
            } else if (item.show_type == 4) {//查看照片
                var str4 = "";
                
                str4 += '    <div class="l">';
                str4 += '        <div class="wai">';
                str4 += '            <div class="nei">';
                str4 += '                <img src="' + item.order.goods_image + '" alt="">';
                str4 += '            </div>';
                str4 += '        </div>';
                str4 += '    </div>';
                str4 += '    <div class="m">';
                str4 += '        <div class="name_w">';
                str4 += '            <span class="name">' + item.order.goods_list[0].goods_name + '</span>';
                str4 += '            <span class="time">' + a.timestamp(item.dateline) + '</span>';
                str4 += '        </div>';
                str4 += '        <div class="price">价格：￥' + item.order.price.toFixed(2) + '</div>';
                str4 += '        <div class="user_info">赠送给：' + item.order.pw_uid_name + '(' + item.order.pw_uid + ')' + '</div>';
                str4 += '        <div class="mark">留言：' + item.order.remark + '</div>';
                str4 += '    </div>';
                str4 += '    <div class="r">';
                str4 += '        <div class="r_c">';
                str4 += '            <a href ="/show/index/pw_photo_detail/pw_uid/'+item.order.pw_uid+'.html" target="_blank" class="btn on">查看照片</a>';
                str4 += '        </div>';
                str4 += '    </div>';
                obj.html(str4);
            } else if (item.show_type == 5) {//回购
                var str2 = "";
                obj.addClass("invite");
                str2 += '    <div class="l">';
                str2 += '       <div class="invite_time">' + a.timestamp(item.dateline) + '</div>';
                str2 += '       <div class="invite_note">' + item.note + '</div>';
                str2 += '    </div>';
                str2 += '    <div class="r">';
                str2 += '        <div class="r_c">';
                str2 += '            <a href ="/show/user/show_order.html?type=2" target="_blank" class="btn on">回购订单</a>';
                str2 += '        </div>';
                str2 += '    </div>';

                obj.html(str2);
            } else if (item.show_type == 6) {//换装邀请
                var str5 = "";
                obj.addClass("invite");
                str5 += '    <div class="l">';
                str5 += '       <div class="invite_time">' + a.timestamp(item.dateline)+'</div>';
                str5 += '       <div class="invite_note">'+item.note+'</div>';
                str5 += '    </div>';
                
                str5 += '    <div class="r">';
                str5 += '        <div class="r_c">';
                str5 += '            <a href ="/show/user/service.html" target="_blank" class="btn on">立即开通</a>';
                str5 += '        </div>';
                str5 += '    </div>';
                obj.html(str5);
            }else if (item.show_type == 7) {//重新上传照片
                var str6 = "";
                obj.addClass("invite");
                str6 += '    <div class="l">';
                str6 += '       <div class="invite_time">' + a.timestamp(item.dateline) + '</div>';
                str6 += '       <div class="invite_note">' + item.note + '</div>';
                str6 += '    </div>';
                str6 += '    <div class="r">';
                str6 += '        <div class="r_c">';
                str6 += '            <a href ="/show/user/service.html?type=2" target="_blank" class="btn on">重新上传</a>';
                str6 += '        </div>';
                str6 += '    </div>';
                obj.html(str5);
            } else {//换装邀请 同意（31）或拒绝（30）
                var str5 = "";
                obj.addClass("invite");
                str5 += '    <div class="l">';
                str5 += '       <div class="invite_time">' + a.timestamp(item.dateline) + '</div>';
                str5 += '       <div class="invite_note">' + item.note + '</div>';
                str5 += '    </div>';

                str5 += '    <div class="r">';
                str5 += '        <div class="r_c">';
                str5 += '        </div>';
                str5 += '    </div>';
                obj.html(str5);
            } 
            item.dom_right = obj;
            if(item.show_type == 3){
                var url = "/show/order/demandHandle";
                var post_data = {
                    id: item.relatedid,
                    type:1,
                };

                // 同意
                obj.find(".agree_btn").on("click",function() {
                    post_data.type= 1;
                    a.ajax(url,post_data,function(res){
                        if(res.code==1){
                            layer.msg("您已同意赠送，待支付",{time:800},function(){
                                var str = "";
                                str = '            <div class="note">已接受</div>';
                                obj.find(".r_c").html(str);
                                location ="/show/user/show_order.html";
                            });
                            
                        }else {
                            layer.msg(res.msg);
                        }
                    });
                })
                // 拒绝
                obj.find(".deny_btn").on("click", function () {
                    post_data.type = 2;
                    a.ajax(url, post_data, function (res) {
                        if (res.code == 1) {
                            layer.msg(res.msg);
                            var str = "";
                            str = '            <div class="note">已狠心拒绝</div>';
                            obj.find(".r_c").html(str);
                        } else {
                            layer.msg(res.msg);
                        }
                    });
                })
            }
            
        },
        /**
         *聊天窗口左侧
         *
         * @param {*} item
         */
        create_chat_left: function (item) {
            // console.log(item);
            
            var obj = $("<div></div>");
            obj.attr("class", "chat_l_i");
            obj.addClass("chat_l_id_" + item.uid);
            obj.attr("nickname", item.nickname);
            obj.attr("uid", item.uid);
            if (item.is_on) {
                obj.attr("class", "on");
            }
            var str = "";
            str += '<div class="avatar_w">';
            str += '	<div class="wai">';
            str += '		<div class="nei">';
            str += '			<img src="' + item.avatar + '" alt="" class="avatar">';
            str += '		</div>';
            str += '	</div>';
            str += '</div>';
            str += '<div class="info_w">';
            str += '	<div class="nickname">' + item.nickname + '</div>';
            str += '	<div class="msg">UID:' + item.uid + '</div>';
            str += '</div>';
            str += '<div class="time_wrapper">';
            if (item.time){
                str += '	<div class="time on">' + item.time + '</div>';
            }else {
                str += '	<div class="time"></div>';
            };
            if (item.num) {
                str += '	<div class="no_num on">' + item.num + '</div>';
            }else {
                str += '	<div class="no_num">0</div>';
            };
            str += '	<i class="icon_close"></i>';
            str += '</div>';
            obj.html(str);
            item.dom_left = obj;
            // 关闭
            item.dom_close_btn = obj.find(".icon_close");
            item.dom_num = obj.find(".no_num");
            // 头部切换
            obj.on("click", function () {
                _BROWSER_CHAT.change_check(item.uid,item.nickname);
            });
            // 关闭聊天窗口
            item.dom_close_btn.on("click", function () {
                a.close_one_pop(item);
            });

        },

        /**
         *聊天窗口主体
         *
         * @param {*} item
         */
        create_chat_right: function (item) {
            var info_data = item;
            var obj = $("<div></div>");
            obj.attr("class", "chat_right_i");
            obj.addClass("chat_r_id_" + item.uid);
            if (item.is_on) {
                obj.attr("class", "on");
            }
            var str = "";
            str += '<div class="chat_list">';
            str += '	<div class="chat_content"></div>';
            str += '	';
            str += '	<!-- 新消息提醒 -->';
            str += '	<div class="new_msg_wrapper">';
            str += '		<i class="icon"></i>';
            str += '		<span class="text"><span class="num">0</span>条新消息</span>';
            str += '		<i class="new_close"></i>';
            str += '	</div>';
            str += '	<!-- 图片上传 -->';
            str += '	<div class="up_img_status" msg="奋力上传图片">';
            str += '		<p>';
            str += '			正在奋力上传...';
            str += '			<img src="' + public_domain + '/static/show/img/index/chat/loading.gif" alt="" class="icon">';
            str += '		</p>';
            str += '	</div>';
            str += '	<!-- 图片放大弹窗 -->';
            str += '	<div class="img_pop">';
            str += '		<span class="img_close"><span class="close"></span></span>';
            str += '		<div class="wai">';
            str += '			<div class="nei">';
            str += '				<img src="' + public_domain + '/static/show/img/index/chat/loading.gif" alt="" class="icon">';
            str += '			</div>';
            str += '		</div>';
            str += '	</div>';
            str += '</div>';
            str += '<div class="chat_input_wrapper">';
            str += '	<div class="top_btn">';
            str += '		<div class="emoji_btn btn"><i class="icon"></i></div>';
            str += '		<div class="upload_img_btn btn"><i class="icon"></i></div>';
            str += '	</div>';
            str += '	<textarea class="chat_inpt" name="chat_inpt" id="chat_inpt' + item.uid + '"></textarea>';
            str += '	<div class="btn_wrapper">';
            str += '		<div class="cancel_btn btn">关闭</div>';
            str += '		<div class="send_btn btn">发送</div>';
            str += '		<input type="file" style="display: none" class="img_inpt" id="send_img_file_'+item.uid+'"></input>';
            str += '	</div>';
            str += '	<!-- 颜表情 -->';
            str += '	<ul class="emoji_box" onmousedown="return false;" unselectable="on" >';
            for (var i = 1, len = _BROWSER_CHAT.emoji_array.length; i <= len; i++) {
                var path = public_domain + "/static/show/img/index/chat/face_30/" + "emoji_" + i + ".png";
                var tit = _BROWSER_CHAT.emoji_array[i - 1];
                str += '<li class="emoji_item" title="' + tit + '"><img class="s_ico" src="' + path + '"></li>';
            };
            str += '	</ul>';
            str += '</div>';

            obj.html(str);
            item.dom_right = obj;
            // 缓存最新一条消息 时间，用于判断下次发送消息是否 创建 时间dom 结构
            item._chat_temp_timestamp = 1451577600;
            item.send_text_temp = [];//临时文本信息
            // 滚动状态
            item._chat_scroll_status = true;

            obj.find(".emoji_item").on("click", function () {
                // 隐藏颜表情 盒子
                obj.find(".emoji_box").removeClass("on");
                // 数据框数据
                var chat_inpt = obj.find(".chat_inpt").val();
                chat_inpt += $(this).attr("title");
                // 数据框赋值
                obj.find(".chat_inpt").val(chat_inpt);
                return false;
            });
            obj.find(".img_inpt").change(function (event) { //公会头像
                a.check_file($(this).val(), $(this), this,item.uid)
            });
            /**
             * ===================================chat_step_1_2============================
             * 
             *    聊天第二步 加载历史聊天数据
             * 
             *    
             * ==========================================================================
             */
            var s_chat_room_msg = JSON.parse(localStorage.getItem("browser_chat_room_" + a.my_user_info.uid + "_" + item.uid));
            if (s_chat_room_msg.length > 0) {
                // 删除发布失败数据
                a.del_ele_arr(s_chat_room_msg, "send_state", 0, false)
                localStorage.setItem("browser_chat_room_" + a.my_user_info.uid + "_" + item.uid, JSON.stringify(s_chat_room_msg));
            }
            a.chats = s_chat_room_msg;
            // 聊天数据加载
            $.each(a.chats, function (index, chat_item) {
                // 两次消息之间 发送间隔超过 5分钟，插入时间间隔
                a.insert_chat_time_dom(item, chat_item.message_id, chat_item.create_time);
                // 创建消息dom  结构
                a.create_chat_item_dom(item, chat_item);
                // 插入页面
                if (chat_item.dom) {
                    obj.find(".chat_content").append(chat_item.dom);
                };
            });

            // 关闭 放大弹窗
            obj.find(".img_close").on("click", function () {
                $(this).parent().removeClass("on");
            });
            // 颜表情显示按钮
            obj.find(".emoji_btn").on("click", function () {
                if (obj.find(".emoji_box").hasClass("on")) {
                    // 隐藏颜表情
                    obj.find(".emoji_box").removeClass("on");
                } else {
                    // 显示颜表情
                    obj.find(".emoji_box").addClass("on");
                };
                return false;
            });
            // 点击菜单其它地方 则清空右键菜单
            $(window).on("click", function () {
                // 隐藏颜表情 盒子
                obj.find(".emoji_box").removeClass("on");
            });
            // 发送消息
            obj.find(".send_btn").on("click", function () {
                a.send_msg(item, obj.find(".chat_inpt").val());
                obj.find(".chat_inpt").val("");
            });
            /*监听输入框的回车操作*/
            obj.find(".chat_inpt").bind('keypress', function (event) {
                if (event.keyCode == "13") {
                    a.send_msg(item, obj.find(".chat_inpt").val());
                    obj.find(".chat_inpt").val("");
                    return false;
                }
            });
            // 关闭窗口
            obj.find(".cancel_btn").on("click", function () {
                a.close_one_pop(item);
            });
            // 复制文本
            function textInit(e) {
                e.preventDefault();
                var text;
                var clp = (e.originalEvent || e).clipboardData;
                if (clp === undefined || clp === null) {
                    text = window.clipboardData.getData("text") || "";
                    if (text !== "") {
                        if (window.getSelection) {
                            var newNode = document.createElement("span");
                            newNode.innerHTML = text;
                            window.getSelection().getRangeAt(0).insertNode(newNode);
                        } else {
                            document.selection.createRange().pasteHTML(text);
                        }
                    }
                } else {
                    text = clp.getData('text/plain') || "";
                    if (text !== "") {
                        document.execCommand('insertText', false, text);
                    }
                }
            }
            // // 新的输入框的粘贴事件
            // obj.find(".chat_inpt").on("paste", function (e) {
            //     textInit(e);
            //     // return false; 

            //     //用c++的你方法处理 获取粘贴路径
            //     // var fileurl = clipboard_get_image();
            //     // 如果粘贴的不是图片，则fileurl 为空，不上传
            //     // if (!fileurl) { return false; };
            //     // 临时存储 上传图片 用于上传失败展示
            //     // upload_img_path_temp = fileurl;
            //     var upload_info = {
            //         uid: item.uid,
            //         // fileurl: fileurl
            //     };
            //     // 聊天 调用主窗口 图片上传方法
            //     _BROWSER_CHAT.chat_upload_img(upload_info);
            //     // a.to_trunk(2003, JSON.stringify(upload_info));
            //     // 显示正在上传
            //     obj.find(".up_img_status").addClass("on");
            // });
            // 反馈内容限制字数 300
            obj.find(".chat_inpt").on("input propertychange", function () {
                var $this = $(this),
                    _val = $this.val(),
                    count = "";
                if (_val.length > 500) {
                    $this.val(_val.substring(0, 500));
                }
            });

            //监听聊天内容滚动
            obj.find(".chat_list").scroll(function () {
                if (a.check_scroll_bottom(item)) {//判断页面是否滚动到页面底部
                    
                    var ind = _BROWSER_CHAT.getobj_array_index(a.friend_user_info, "uid", item.uid);
                    a.change_scroll_status(ind);
                    
                } else {
                    item._chat_scroll_status = true;
                };
            });

            //点击新消息提醒 返回底部
            obj.find(".new_msg_wrapper").on("click", function () {
                a.scroll_bottom_fn(item,true);
            });
            // 选择图片上传
            obj.find(".upload_img_btn").on("click", function () {
                obj.find(".img_inpt").click();
                // var upload_info = {
                //     uid: item.uid,
                //     // fileurl: fileurl
                // };
                // // 聊天 调用主窗口 图片上传方法
                // _BROWSER_CHAT.chat_upload_img(upload_info);
                // if (_de_bug) { return false; };
                // //选择图片
                // var fileurl = client_select_file("jpg|gif|png|jpeg", false, false);
                // if (!fileurl) { return false; };

                // var upload_info = {
                //     uid: item.uid,
                //     fileurl: fileurl
                // };
                // a.to_trunk(2003, JSON.stringify(upload_info));
                // // 显示正在上传
                // obj.find(".up_img_status").addClass("on");
            });
        },
        
        /**
         *聊天消息
        * 
        * @param {*} item
        */
        create_chat_item_dom: function (info, item) {
            var obj = $("<div></div>");
            obj.attr("class", "chat_item");
            // type 0: 消息提醒 1:是时间,2:对方发的消息,3:自己发的消息
            var str = "";
            if (item.type === 0) {
                obj.addClass("time");
                str += '<span class="text">' + item.content + '</span>';
            } else if (item.type === 1) {
                obj.addClass("time");
                str += '<span class="text">' + a.timestamp(item.create_time) + '</span>';
            } else if (item.type === 3) {
                obj.addClass("my");
            };

            if (item.msg_type === "text") {

                str += '<div class="avatar_wrapper">';
                str += '    <div class="wai">';
                str += '        <div class="nei">';
                if (item.type == 2) {
                    str += '        <img class="avatar" src="' + info.avatar + '" />';
                } else if (item.type === 3) {
                    str += '        <img class="avatar" src="' + a.my_user_info.avatar + '" />';
                }
                str += '        </div>';
                str += '    </div>';
                str += '</div>';
                str += '<div class="chat_text_wrapper">';
                str += '    <i class="arrow"></i>';
                str += '    <div class="chat_text">' + _BROWSER_CHAT.analysis_emoji(item.content, public_domain + '/static/show/img/index/chat/face_30/') + '</div>';
                str += '    <span class="send_fail send_text_fail"></span>';
                str += '</div>';
            } else if (item.msg_type === "image") {
                obj.addClass("chat_img");

                str += '<div class="avatar_wrapper">';
                str += '    <div class="wai">';
                str += '        <div class="nei">';
                if (item.type == 2) {
                    str += '        <img class="avatar" src="' + info.avatar + '" />';
                } else if (item.type === 3) {
                    str += '        <img class="avatar" src="' + a.my_user_info.avatar + '" />';
                }
                str += '        </div>';
                str += '    </div>';
                str += '</div>';
                str += '<div class="chat_text_wrapper">';
                str += '    <div class="chat_text">';
                str += '        <img class="icon" src="' + item.content + '" />';
                str += '        <i class="icon_scale_btn"></i>';
                str += '    </div>';
                str += '    <span class="send_fail send_img_fail"></span>';
                str += '</div> ';
            } else if (item.msg_type === "voice") {
                obj.addClass("time");
                str += '<span class="text">您有一条语音消息，请在手机APP中查看</span>';
            } else if (item.msg_type === "phone") {
                obj.addClass("chat_phone");
                str += '<div class="avatar_wrapper">';
                str += '    <div class="wai">';
                str += '        <div class="nei">';
                if (item.type == 2) {
                    str += '        <img class="avatar" src="' + info.avatar + '" />';
                } else if (item.type === 3) {
                    str += '        <img class="avatar" src="' + a.my_user_info.avatar + '" />';
                }
                str += '        </div>';
                str += '    </div>';
                str += '</div>';
                str += '<div class="chat_text_wrapper">';
                str += '    <i class="arrow"></i>';
                str += '    <div class="chat_text"><i class="icon_phone"></i>' + item.content + '</div>';
                str += '</div>';
            };


            obj.html(str);
            item.dom = obj;
            item.dom_send_status_icon = obj.find(".send_fail");

            if (item.msg_type === "image") {//图片消息
                // 图片放大按钮
                item.dom_scale_btn = obj.find(".icon_scale_btn");

                item.dom_scale_btn.on("click", function () {
                    $(".img_pop").find(".icon").attr("src", item.content);
                    $(".img_pop").addClass("on");
                    return false;
                });
                // 双击图片放大
                item.dom_scale_db_btn = obj.find(".chat_text_wrapper");
                item.dom_scale_db_btn.on("dblclick", function () {
                    $(".img_pop").find(".icon").attr("src", item.content);
                    $(".img_pop").addClass("on");
                });
                // 发送失败
                item.dom_send_fail_btn = obj.find(".send_img_fail");
                // item.dom_send_fail_btn.on("click",function() {
                //     a.upload_img_fn(upload_img_path_temp);
                // });
            } else if (item.msg_type === "text") {//文本消息
                // 发送失败
                item.dom_send_fail_btn = obj.find(".send_text_fail");
                // item.dom_send_fail_btn.on("click",function() {
                //     a.send_msg(info,info.send_text_temp);
                // });
            };

            if (item.send_state === 0) {// 显示loading
                item.dom_send_status_icon.addClass("loading").addClass("on");
            } else if (item.send_state === 1) { // 发送成功
                item.dom_send_status_icon.removeClass("on").removeClass("loading");
            } else if (item.send_state === 2) { // 发送失败
                item.dom_send_status_icon.removeClass("loading").addClass("on");
            };

        },
        /**
         *更改聊天面板左侧 未读数量
         *
         * @param {*} item
         */
        change_left_num: function (item) {
            // 接收到信息，判断是否在底部
            if (item._chat_scroll_status) {//不在底部
                item.dom_right.find(".new_msg_wrapper").addClass("on");
                var num = Number(item.dom_right.find(".new_msg_wrapper").find(".num").text()) + 1;
                item.dom_right.find(".new_msg_wrapper").find(".num").text(num);
                item.dom_left.find(".no_num").addClass("on");

                item.dom_left.find(".no_num").text(num);
            } else {
                // console.log(22222222222);
                
                _BROWSER_CHAT.scroll_bottom_fn(item,true);
            };
        },
        /**
         * 
         * =============================================================================
         * 
         * ===============================公共操作================================
         * 
         * =============================================================================
         * 
         */
        /**
         *对数组对象进行分组
         *
         * @param {string} type 根据type  进行分组
         * @param {[{}]} arr 数组对象
         * @returns 返回分组之后的 数据
         */
        group_array_fn: function (type, arr) {
            var map = {}, dest = {};
            for (var i = 0; i < arr.length; i++) {
                var ai = arr[i];
                if (!dest[ai[type]]) {
                    dest[ai[type]] = [];
                    dest[ai[type]].push(ai);
                } else {
                    dest[ai[type]].push(ai);
                }
            }
            return dest;
        },
        /**
         *获取指定参数对应的数量
            *
            * @param {*} arr 数据源
            * @param {*} type 参数
            * @param {*} val 参数 对应数值
            * @returns 返回指定参数对应数值的数量
            */
        get_ele_num: function (arr, type, val) {
            var num = 0;
            $.each(arr, function (i, item) {
                if (item[type] == val) {
                    num++;
                }
            });
            return num;
        },
        /**
        *删除指定参数 指定值的数据
        *
        * @param {数组} arr 数据源
        * @param {string} type 参数
        * @param {*} val 参数 对应数值
        * @param {bloor} boor true:删除dom false:不删除dom
        */
        del_ele_arr: function (arr, type, val, boor) {
            var isok = false;
            for (var i = 0; i < arr.length; i++) {
                // console.log(arr.length);
                if (arr[i][type] === val) {
                    if (boor) {
                        arr[i].dom_left.remove();
                        arr[i].dom_right.remove();
                    };
                    arr.splice(i, 1); //删除下标为i的元素
                    i--;
                    isok = true;
                }
            };
            return isok;
        },
        /**
         *修改指定参数 指定值的数据
            *
            * @param {*} arr 数据源
            * @param {*} type 要修改数据 对应参数
            * @param {*} val type 对应数值
            * @param {*} edit_type 要修改的参数
            * @param {*} edit_val 要修改的参数 数值
            */
        edit_ele_arr: function (arr, type, val, edit_type, edit_val) {

            for (var i = 0; i < arr.length; i++) {
                if (arr[i][type] == val) {
                    arr[i][edit_type] = edit_val;
                }
            };
        },
        /**
         *获取指定参数 的 数据
            *
            * @param {*} arr 数据源
            * @param {*} type 获取数据 对应参数
            * @param {*} val type 对应数值
            */
        get_ele_arr: function (arr, type, val) {
            var is_exist = false;
            var arr_i = "";
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i][type] == val) {
                    is_exist = true;
                    arr_i = arr[i];
                    break;
                }
            };
            if (is_exist) {
                return arr_i;
            } else {
                return false;
            };
        },
        /**
         * 获取当前时间戳（10位）
         *
         */
        get_timestamp: function () {
            return Math.round(new Date().getTime() / 1000).toString();
        },
        /**
         * 比较两个时间戳是否是同一天
         *
         * @param {timestamp} date1 
         * @param {timestamp} date2
         * @returns
         */
        is_same_day: function (date1, date2) {
            if (new Date(date1).toDateString() === new Date(date2).toDateString()) {
                return true;
            } else {
                return false;
            }
        },
        /**
         *返回一个日期格式传递一个时间戳如1920-02-12 10:25:10
         *
         * @param {*} format
         * @returns
         */
        timestamp: function (format) {
            var format = new Date(format * 1000);
            var year = format.getFullYear();
            var month = format.getMonth() + 1;
            var date = format.getDate();
            var hour = format.getHours();
            var minute = format.getMinutes();
            var miao = format.getSeconds();
            var returnstr = function (val) {
                return val < 10 ? '0' + val : val;
            };
            return returnstr(year) + "-" + returnstr(month) + "-" + returnstr(date) + ' ' + returnstr(hour) + ":" + returnstr(minute) + ":" + returnstr(miao);
        },
        /**
         * 时间格式化，用于 标识最新消息时间
         *
         * @param {*} format 时间戳
         * @returns 返回一个日期格式传递一个时间戳如02-12 或者10:25
         */
        format_time: function (format) {
            var format = new Date(format * 1000);
            var year = format.getFullYear();
            var month = format.getMonth() + 1;
            var date = format.getDate();
            var hour = format.getHours();
            var minute = format.getMinutes();
            var miao = format.getSeconds();
            var returnstr = function (val) {
                return val < 10 ? '0' + val : val;
            };
            var str = format;
            // 判断是否是当天
            if (new Date(str).toDateString() === new Date().toDateString()) {
                //今天
                return returnstr(hour) + ":" + returnstr(minute);
            } else if (new Date(str) < new Date()) {
                return month + "-" + returnstr(date);
            }
        },
        //解析emoji文字表情为图片路径参数是一个字符串和一个图片相对emoji文件夹的路径
        analysis_emoji: function (str, path) {
            // console.log(str);
            
            if (!path) { 
                // alert("analysis_emoji方法请传一个表情文件夹的路径"); 
                return };
            var regExp = /\[.+?\]/g;
            var arr = [];
            var str1 = 0;
            var arr1 = [];
            var arr2 = [];
            var str2 = "";
            var path1 = "<img src='" + path;
            var path2 = ".png' class='emoji'/>";
            var status = true;
            while ((arr = regExp.exec(str)) !== null) {
                status = false;
                arr1.push(str.substring(str1, arr.index));
                arr2.push(arr[0]);
                str1 = arr.index + arr[0].length;
                str2 = str.substring(str1);
            }
            if (status) {
                return str;
            }
            var str3 = "";
            for (var i = 0, len = arr1.length; i < len; i++) {
                str3 += arr1[i];
                if (_BROWSER_CHAT.emoji_json[arr2[i]]) {
                    str3 += (path1 + _BROWSER_CHAT.emoji_json[arr2[i]] + path2);
                }
            }
            str3 += str2;
            return str3;
        },
        //通过一个参数和值得到从数组中得到一个对象的索引值
        getobj_array_index: function (array, key, val) {
            var index = false;
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i][key] === val) {
                    index = i;
                    break;
                };
            };
            return index;
        },
        //统一定义一个分隔符
        de_bug_data_turnover: function (name, type, data) {
            if (name && data && type) {
                if ((typeof name === "string") && (typeof data === "string") && (typeof type === "number")) {
                    //把本地存储的取出来
                    var text_name, code_name, text_data, code_data;
                    text_name = name + "_text";
                    code_name = name + "_code";
                    text_data = localStorage.getItem(text_name) || '';
                    code_data = localStorage.getItem(code_name) || '';
                    text_data += "may_you_be_happy_and_prosperousi" + data;
                    code_data += "may_you_be_happy_and_prosperousi" + type;
                    localStorage.setItem(text_name, text_data);
                    localStorage.setItem(code_name, code_data);
                } else {
                    layer.msg("de_bug_data_turnover方法缺少参数数据类型错误");
                };
            } else {
                layer.msg("de_bug_data_turnover方法缺少参数");
            };
        },
        //浏览器中获取窗口之间数据的方式
        de_bug_data_turnover_get: function (name) {
            // console.log(name);
            
            if (name && (typeof name === "string")) {
                //参数没有或者数据格式错误
                var text_name, code_name, text_data, code_data, arr1, arr2;
                text_name = name + "_text";
                code_name = name + "_code";
                text_data = localStorage.getItem(text_name) || '';
                code_data = localStorage.getItem(code_name) || '';
                if (text_data) {
                    //取出来后就设为空
                    localStorage.setItem(text_name, "");
                    localStorage.setItem(code_name, "");
                    arr1 = text_data.split("may_you_be_happy_and_prosperousi");
                    arr2 = code_data.split("may_you_be_happy_and_prosperousi");
                    return [arr1, arr2];
                } else {
                    return false;
                };
            } else {
                // alert("参数没有或者数据格式错误");
            };
        },
        //公共ajax
        ajax: function (url, todata, fn, fn2) {
            todata = todata || {};
            todata.termtyp = 'web';
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: todata,
                success: function (res) {
                    fn(res);
                },
                error: function () {
                    // alert("当前网络连接错误请稍后再试");
                    if (fn2) { fn2() };
                }
            });
        },
        /**
         *根据固定参数进行比对，用于sort 排序
         *
         * @param {*} property 参数
         * @returns
         */
        compare: function (property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        /**
         *laypage 
         *
         * @param {*} page_info |laypage外层id
         * @param {*} btn_color |样式
         * @param {*} _fn |回调函数
         * @param {*} pages |总页数
         * @param {*} curr |当前页码
         * @param {*} f_is |首页
         * @param {*} l_is |尾页
         */
        mypage: function (page_info, btn_color, _fn, pages, curr, f_is, l_is) {
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
    };
    window._BROWSER_CHAT = a;
}());