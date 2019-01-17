/**
 * 登录注册
 */
"use strict";
define([
    'vue',
    'resource',
    'layer',
    'store',
], function(Vue, resource, layer, store) {
    Vue.use(resource); //Vue注册http请求模板
    var common;
    var loginNum;
    var registerNum;
    window.tel_login_v1 = new Vue({
        el: "#tel_login_v1",
        data: {
        
            isshow: false,
            checked: true, //是否记住密码
            agreementChecked: true,//阅读并同意协议选中
            loginTabShow: 0, //登录显示：0|用户名和密码登录，1|短信验证码登录

            imgCode: img_code, //图行验证码路径
            popShow: 1, //弹窗        
            contentShow: false, //登录内容显示
            setpassword: '', //设置密码
            code_readonly:false,//图形验证码输入框，默认允许输入
            set_pwd:'',//单独设置密码

            // 账号登录
            user_mobile:'',//手机号
            user_pwd:'',//注册密码
            user_captcha_code:'',//图形验证码
            user_message_code:'',//短信验证码
            user_message_code_btn:'获取验证码',//获取短信验证码按钮值
            userIsdisabled:false,//input禁用
            
            // 短信登录
            regist_msg_code:86,//注册地区  +86 中国大陆  +886 中国台湾
            msg_mobile:'',//手机号
            msg_pwd:'',//注册密码
            msg_captcha_code:'',//图形验证码
            msg_message_code:'',//短信验证码
            msg_message_code_btn:'获取验证码',//获取短信验证码按钮值
            msgIsdisabled:false,//input禁用
            msgNoPwdShow: false, //是否需要填写密码

            // 注册
            regist_phone_code:86,//注册地区  +86 中国大陆  +886 中国台湾
            regist_mobile:'',//注册手机号
            regist_pwd:'',//注册密码
            regist_captcha_code:'',//注册图形验证码
            regist_message_code:'',//注册短信验证码
            regist_message_code_btn:'获取验证码',//获取短信验证码按钮值
            registIsdisabled:false,//input禁用

            // 忘记密码
            regist_reset_code:86,//注册地区  +86 中国大陆  +886 中国台湾
            reset_mobile:'',//手机号
            reset_pwd:'',//密码
            reset_re_pwd:'',//重复密码
            reset_captcha_code:'',//图形验证码
            reset_message_code:'',//短信验证码
            reset_message_code_btn:'获取验证码',//获取短信验证码按钮值
            resetIsdisabled:false,//input禁用
            
            // 普通绑定
            bind_mobile:'',//手机号
            regist_bind_code:86,//注册地区  +86 中国大陆  +886 中国台湾
            bind_pwd:'',//密码
            bind_captcha_code:'',//图形验证码
            bind_message_code:'',//短信验证码
            bind_message_code_btn:'获取验证码',//获取短信验证码按钮值
            bindIsdisabled:false,//input禁用
            noPwdShow: false, //是否需要填写密码

            // 绑定其它手机号
            bind_other_mobile:'',//手机号
            regist_bind_other_code:86,//注册地区  +86 中国大陆  +886 中国台湾
            bind_other_pwd:'',//密码
            bind_other_captcha_code:'',//图形验证码
            bind_other_message_code:'',//短信验证码
            bind_other_message_code_btn:'获取验证码',//获取短信验证码按钮值
            bindOtherIsdisabled:false,//input禁用
            otherNoPwdShow: false, //是否需要填写密码
            
        },
        created: function() {

        },
        mounted: function() {
            this.$nextTick(function() {
                // this.isshow = true;
            });
        },
        computed: {

        },
        filter: {

        },
        methods: {
            // 类型判断显示弹窗：
            //1|登录注册弹窗， 2|忘记密码，3|绑定手机号
            //4|绑定其它手机号，5|绑定成功，6|没有绑定手机号绑定
            //7|数据库存在继续绑定，8|绑定账号有未完成订单弹窗
            bindPopShowFun: function(ind) {
                this.isshow = true;
                this.popShow = ind;
                this.refreshImgCode();
                this.lockScrollBody();
            },
            //允许滑动
            scrollBody:function() { 
                document.getElementsByTagName("body")[0].style.overflow = "auto";
            },
            //禁止滑动
            lockScrollBody:function() { 
                document.getElementsByTagName("body")[0].style.overflow = "hidden";
            },
            // 选项卡切换
            showTab:function(ind) {
                this.loginTabShow = ind;
                this.refreshImgCode();
            },
            // 关闭弹窗
            close: function() {
                this.isshow = false;
                this.popShow = 1;
                 this.scrollBody();
            },
            //账号登录
            userLoginFun: function(login_type) {
                var _this = this;
                var urls = '/user/Login/doLogin';
                // 普通密码登录
                    if (!common.form_Verification({
                            type: "login_number",
                            el: ".user_mobile",
                            parset:".login-inp",
                            value: this.user_mobile
                        })) {
                        //手机号未通过
                        return false;
                    };
                    if (!common.form_Verification({
                            type: "password",
                            el: ".user_pwd",
                            parset:".login-inp",
                            value: this.user_pwd
                        })) {
                        //密码未通过
                        return false;
                    };
                    var data = {
                        'usercode': this.user_mobile,
                        'password': this.user_pwd,
                        'is_remember': this.checked,
                        'login_type': 1, //登录方式
                    };

                this.$http.post(urls, data).then(function(res) {
                    var start = common.post_Verification(res);
                    if (start) {
                        var json = res.body.data;
                        if (json.is_password === 1) {
                            layer.msg('登录成功', {
                                time: 2000
                            }, function() {
                                loginNum = res.body.is_first;
                                oldUser.oldUser_show();
                                //window.location.href = window.location.href;
                            });
                        } else if (Number(json.is_password) === 0) {
                            layer.msg('您尚未设置登录密码,请设置', {
                                time: 2000
                            }, function() {
                                _this.msgNoPwdShow = true;
                            });
                        };
                    } else {
                        layer.msg(res.data.msg)
                    }
                });
            },
            //短信登录
            msgLoginFun: function() {
                var _this = this;
                var urls = '/user/Login/doLogin';
                    // 短信登录
                    if (!common.form_Verification({
                            type: "phone_code",
                            el: ".regist_phone_code",
                            parset:".msg-inp",
                            value: this.regist_msg_code
                        })) {
                        //地区
                        return false;
                    };
                    if (!common.form_Verification({
                            type: "mobile",
                            el: ".msg_mobile",
                            parset:".msg-inp",
                            value: this.msg_mobile
                        })) {
                        //手机号未通过
                        return false;
                    };
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".msg_captcha_code",
                            parset:".msg-inp",
                            value: this.msg_captcha_code
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "message_code",
                            el: ".msg_message_code",
                            parset:".msg-inp",
                            value: this.msg_message_code
                        })) {
                        //密码未通过
                        return false;
                    };

                    if(this.regist_msg_code  == 86){
                        if(this.msg_mobile.length != 11){
                            layer.msg("手机号码格式不正确");
                            return;
                        }
                    }else if(this.regist_msg_code  == 886){
                        if(this.msg_mobile.length != 9){
                            layer.msg("手机号码格式不正确");
                            return;
                        }
                    };

                    var data = {
                        'usercode': this.msg_mobile,
                        'phone_code': this.regist_msg_code,
                        'is_remember': "",
                        'login_type': 2, //登录方式
                        'mcode': this.msg_message_code,
                    };



                this.$http.post(urls, data).then(function(res) {
                    var start = common.post_Verification(res);
                    if (start) {
                        var json = res.body.data;
                        if (json.is_password === 1) {
                            layer.msg('登录成功', {
                                time: 2000
                            }, function() { 
                                window.location.href = window.location.href;
                            });
                        } else if (Number(json.is_password) === 0) {
                            layer.msg('您尚未设置登录密码,请设置', {
                                time: 2000
                            }, function() {
                                _this.msgNoPwdShow = true;
                            });
                        };
                    } else {
                        layer.msg(res.data.msg)
                    }
                });
            },
            setPassword: function(ind) { //设置密码
                var pwd="";
                if(ind===1){
                    pwd=this.msg_pwd;
                    if (!common.form_Verification({
                            type: "password",
                            el: ".msg_pwd",
                            parset:".msg-inp",
                            value: this.msg_pwd
                        })) {
                        return false;
                    }
                }else if(ind===2){
                    pwd=this.bind_pwd;
                    if (!common.form_Verification({
                            type: "password",
                            el: ".bind_pwd",
                            parset:".msg-inp",
                            value: this.bind_pwd
                        })) {
                        return false;
                    }
                }else if(ind===3){
                    pwd=this.bind_other_pwd;
                    if (!common.form_Verification({
                            type: "password",
                            el: ".bind_other_pwd",
                            parset:".msg-inp",
                            value: this.bind_other_pwd
                        })) {
                        return false;
                    }
                }else if(ind===4){
                    pwd=this.set_pwd;
                    if (!common.form_Verification({
                            type: "password",
                            el: ".set_pwd",
                            parset:".set-pwd-inp",
                            value: this.set_pwd
                        })) {
                        return false;
                    }
                };
                var url = '/user/usercenter/doSetpassword';
                var data = {
                    'password': pwd,
                };
                this.$http.post(url, data).then(function(res) {
                    var start = common.post_Verification(res);
                    if (start) {
                        if(ind == 4){
                            layer.msg('设置成功', {
                                time: 2000
                            }, function() {
                                
                                location.href = location.href;
                            });
                        }else {
                            layer.msg('登录成功', {
                                time: 2000
                            }, function() {
                                
                                location.href = location.href;
                            });
                        };
                    } else {
                        layer.msg(res.data.msg, {
                            time: 2000
                        }, function() {
                            
                        });
                    }
                });
            },
            //获取手机验证码 参数type：1|短信登录，2|注册,3|绑定手机号,4|绑定其它手机号，5|找回密码
            sendmessageFun: function(type) {
                var url = '/user/sms/do_send';
                var data ={};
                var _this = this;
                if(type === 1){//1|短信登录
                    if (!common.form_Verification({
                        type: "mobile",
                        el: ".msg_mobile",
                        parset:".msg-inp",
                        value: _this.msg_mobile
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".msg_captcha_code",
                            parset:".msg-inp",
                            value: _this.msg_captcha_code
                        })) {
                        return false;
                    }
                    _this.msgIsdisabled = true; //手机号不能更改、发短信按钮禁用
                    _this.code_readonly = true;
                    data = {
                        'mobile': _this.msg_mobile,
                        'captcha': _this.msg_captcha_code

                    };
                    _this.$http.post(url, data).then(function(res) {
                        var start = common.post_Verification(res);
                        if (start) {
                            layer.msg("发送成功");
                            var second = 60;
                            var timer = setInterval(function() {
                                second -= 1;
                                _this.msg_message_code_btn = second + 's';
                                if (second < 0) {
                                    _this.msgIsdisabled = false; //手机号能更改、发短信按钮解禁
                                    _this.msg_message_code_btn = '获取验证码';
                                    clearInterval(timer);
                                }
                            }, 2000);
                        } else {
                            layer.msg(res.data.msg)
                            _this.refreshImgCode();
                            _this.msgIsdisabled = false;
                        }
                    });
                }else if(type === 2){//2|注册
                    if (!common.form_Verification({
                        type: "mobile",
                        el: ".regist_mobile",
                        parset:".regist-inp",
                        value: _this.regist_mobile
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".regist_captcha_code",
                            parset:".regist-inp",
                            value: _this.regist_captcha_code
                        })) {
                        return false;
                    }
                    _this.registIsdisabled = true; //手机号不能更改、发短信按钮禁用
                    _this.code_readonly = true;
                    data = {
                        'mobile': _this.regist_mobile,
                        'captcha': _this.regist_captcha_code

                    };
                    _this.$http.post(url, data).then(function(res) {
                        var start = common.post_Verification(res);
                        if (start) {
                            layer.msg("发送成功");
                            var second = 60;
                            var timer = setInterval(function() {
                                second -= 1;
                                _this.regist_message_code_btn = second + 's';
                                if (second < 0) {
                                    _this.registIsdisabled = false; //手机号能更改、发短信按钮解禁
                                    _this.regist_message_code_btn = '获取验证码';
                                    clearInterval(timer);
                                }
                            }, 2000);
                        } else {
                            layer.msg(res.data.msg)
                            _this.refreshImgCode();
                            _this.registIsdisabled = false;
                        }
                    });
                }else if(type === 3){//3|绑定手机号
                    if (!common.form_Verification({
                        type: "mobile",
                        el: ".bind_mobile",
                        parset:".bind-inp",
                        value: _this.bind_mobile
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".bind_captcha_code",
                            parset:".bind-inp",
                            value: _this.bind_captcha_code
                        })) {
                        return false;
                    }
                    _this.bindIsdisabled = true; //手机号不能更改、发短信按钮禁用
                    _this.code_readonly = true;
                    data = {
                        'mobile': _this.bind_mobile,
                        'captcha': _this.bind_captcha_code

                    };
                    _this.$http.post(url, data).then(function(res) {
                        var start = common.post_Verification(res);
                        if (start) {
                            layer.msg("发送成功");
                            var second = 60;
                            var timer = setInterval(function() {
                                second -= 1;
                                _this.bind_message_code_btn = second + 's';
                                if (second < 0) {
                                    _this.bindIsdisabled = false; //手机号能更改、发短信按钮解禁
                                    _this.bind_message_code_btn = '获取验证码';
                                    clearInterval(timer);
                                }
                            }, 2000);
                        } else {
                            layer.msg(res.data.msg)
                            _this.refreshImgCode();
                            _this.bindIsdisabled = false;
                        }
                    });
                }else if(type === 4){//4|绑定其它手机号
                    if (!common.form_Verification({
                        type: "mobile",
                        el: ".bind_other_mobile",
                        parset:".bind-other-inp",
                        value: _this.bind_other_mobile
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".bind_other_captcha_code",
                            parset:".bind-other-inp",
                            value: _this.bind_other_captcha_code
                        })) {
                        return false;
                    }
                    _this.bindOtherIsdisabled = true; //手机号不能更改、发短信按钮禁用
                    _this.code_readonly = true;
                    data = {
                        'mobile': _this.bind_other_mobile,
                        'captcha': _this.bind_other_captcha_code

                    };
                    _this.$http.post(url, data).then(function(res) {
                        var start = common.post_Verification(res);
                        if (start) {
                            layer.msg("发送成功");
                            var second = 60;
                            var timer = setInterval(function() {
                                second -= 1;
                                _this.bind_other_message_code_btn = second + 's';
                                if (second < 0) {
                                    _this.bindOtherIsdisabled = false; //手机号能更改、发短信按钮解禁
                                    _this.bind_other_message_code_btn = '获取验证码';
                                    clearInterval(timer);
                                }
                            }, 2000);
                        } else {
                            layer.msg(res.data.msg)
                            _this.refreshImgCode();
                            _this.bindOtherIsdisabled = false;
                        }
                    });
                }else if(type === 5){//5|找回密码
                    if (!common.form_Verification({
                        type: "mobile",
                        el: ".reset_mobile",
                        parset:".reset-inp",
                        value: _this.reset_mobile
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                        type: "mobile",
                        el: ".reset_mobile",
                        parset:".reset-inp",
                        value: _this.reset_mobile
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".reset_captcha_code",
                            parset:".reset-inp",
                            value: _this.reset_captcha_code
                        })) {
                        return false;
                    }
                    _this.resetIsdisabled = true; //手机号不能更改、发短信按钮禁用
                    _this.code_readonly = true;
                    data = {
                        'mobile': _this.reset_mobile,
                        'captcha': _this.reset_captcha_code
                    };
                    _this.$http.post(url, data).then(function(res) {

                        var start = common.post_Verification(res);
                        if (start) {
                            layer.msg("发送成功");
                            var second = 60;
                            var timer = setInterval(function() {
                                second -= 1;
                                _this.reset_message_code_btn = second + 's';
                                if (second < 0) {
                                    _this.resetIsdisabled = false; //手机号能更改、发短信按钮解禁
                                    _this.reset_message_code_btn = '获取验证码';
                                    clearInterval(timer);
                                }
                            }, 2000);
                        } else {
                            layer.msg(res.data.msg)
                            _this.refreshImgCode();
                            _this.resetIsdisabled = false;
                        }
                    });

                };
            },
            regist_ul_show:function(type){
                var obj = document.querySelector('.regist_phone_ul'+type);
                obj.style.display='block';
            },
            regist_li_data:function(data,type){
                var obj = document.querySelector('.regist_phone_ul'+type);
                obj.style.display='none';
                if(type == 1){
                    this.regist_msg_code = data;
                }else if(type == 2){
                    this.regist_phone_code = data;
                }else if(type == 3){
                    this.regist_reset_code =data;
                }else if(type == 4){
                    this.regist_bind_code = data;
                }else if(type == 5){
                    this.regist_bind_other_code = data;
                };
            },
            //注册
            register: function() {
                if (!common.form_Verification({
                        type: "phone_code",
                        el: ".regist_phone_code",
                        parset:".regist-inp",
                        value: this.regist_phone_code
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "mobile",
                        el: ".regist_mobile",
                        parset:".regist-inp",
                        value: this.regist_mobile
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "captcha_code",
                        el: ".regist_captcha_code",
                        parset:".regist-inp",
                        value: this.regist_captcha_code
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "message_code",
                        el: ".regist_message_code",
                        parset:".regist-inp",
                        value: this.regist_message_code
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "password",
                        el: ".regist_pwd",
                        parset:".regist-inp",
                        value: this.regist_pwd
                    })) {
                    return false;
                }
                if(!this.agreementChecked){
                    layer.msg("未选择服务协议");
                    return false;
                };


                if(this.regist_phone_code  == 86){
                    if(this.regist_mobile.length != 11){
                        layer.msg("手机号码格式不正确");
                        return;
                    }
                }else if(this.regist_phone_code  == 886){
                    if(this.regist_mobile.length != 9){
                        layer.msg("手机号码格式不正确");
                        return;
                    }
                };

                var url = '/user/Register/doRegister';
                var data = {
                    'usercode': this.regist_mobile,
                    'password': this.regist_pwd,
                    'phone_code': this.regist_phone_code,
                    'register_type': 1,
                    'mcode': this.regist_message_code
                };

                var _this = this;
                this.$http.post(url, data).then(function(res) {
                    var start = common.post_Verification(res);
                    if (start) {                        
                        layer.msg("注册成功", {
                            time: 2000 
                        }, function() {
                            // var this_referrer = document.referrer;
                            // if (this_referrer) {
                            //     if (this_referrer.indexOf('setting') != -1) {
                            //         window.location.href = '/';
                            //     } else {
                            //         window.location.href = this_referrer;
                            //     };
                            // } else {
                            //     window.location.href = '/';
                            // };
                            //window.location.href = window.location.href;
                            registerNum = res.body.is_first;
                            receive.receive_show();
                        });
                    } else {
                        layer.msg(res.data.msg, {
                            time: 2000
                        }, function() {
                            
                        });
                    }
                });

            },
            //找回密码
            password_find: function() {
                if (!common.form_Verification({
                        type: "phone_code",
                        el: ".regist_phone_code",
                        parset:".reset-inp",
                        value: this.regist_reset_code
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "mobile",
                        el: ".reset_mobile",
                        parset:".reset-inp",
                        value: this.reset_mobile
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "captcha_code",
                        el: ".reset_captcha_code",
                        parset:".reset-inp",
                        value: this.reset_captcha_code
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "message_code",
                        el: ".reset_message_code",
                        parset:".reset-inp",
                        value: this.reset_message_code
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "password",
                        el: ".reset_pwd",
                        parset:".reset-inp",
                        value: this.reset_pwd
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "password",
                        el: ".reset_re_pwd",
                        parset:".reset-inp",
                        value: this.reset_re_pwd
                    })) {
                    return false;
                }
                if (!common.form_Verification({
                        type: "repassword",
                        el: ".reset_re_pwd",
                        parset:".reset-inp",
                        value: this.reset_re_pwd,
                        oldvalue: this.reset_pwd
                    })) {
                    return false;
                }
                if(this.regist_reset_code  == 86){
                    if(this.reset_mobile.length != 11){
                        layer.msg("手机号码格式不正确");
                        return;
                    }
                }else if(this.regist_reset_code  == 886){
                    if(this.reset_mobile.length != 9){
                        layer.msg("手机号码格式不正确");
                        return;
                    }
                };

                this.is_reg_disabled = true;
                var url = '/ac/password_find';
                var data = {
                    'mobile': this.reset_mobile,
                    'phone_code': this.regist_reset_code,
                    'password': this.reset_pwd,
                    'password_confirm': this.reset_re_pwd,
                    'message_code': this.reset_message_code
                };
                var _this = this;
                this.$http.post(url, data).then(function(res) {
                    // var start = common.post_Verification(res);
                    res = res.data;
                    if (res.code==1) {
                        layer.msg('找回密码成功', {
                            time: 2000
                        }, function() {
                            // var this_referrer = document.referrer;
                            // if (this_referrer) {
                            //     if (this_referrer.indexOf('setting') != -1) {
                            //         window.location.href = '/';
                            //     } else {
                            //         window.location.href = this_referrer;
                            //     };
                            // } else {
                            //     window.location.href = '/';
                            // };
                            window.location.href = window.location.href;
                        });
                    } else if (res.code == -4||res.code == 0) {
                        layer.msg(res.msg, {
                            time: 2000
                        }, function() {
                           
                        });
                    }
                });
            },
            
            // 绑定手机号
            bindFun: function(ind) {
                var url = '/user/Usercenter/doBuild';
                var _this = this;
                var data = {};
                if (ind === 0) { //更换绑定手机号和第三方登录第一次绑定
                    if (!common.form_Verification({
                            type: "phone_code",
                            el: ".regist_phone_code",
                            parset:".reset-inp",
                            value: this.regist_bind_code
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "mobile",
                            el: ".bind_mobile",
                            parset:".bind-inp",
                            value: _this.bind_mobile
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".bind_captcha_code",
                            parset:".bind-inp",
                            value: _this.bind_captcha_code
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "message_code",
                            el: ".bind_message_code",
                            parset:".bind-inp",
                            value: _this.bind_message_code
                        })) {
                        return false;
                    }

                    if(_this.regist_bind_code  == 86){
                        if(_this.bind_mobile.length != 11){
                            layer.msg("手机号码格式不正确");
                            return;
                        }
                    }else if(_this.regist_bind_code  == 886){
                        if(_this.bind_mobile.length != 9){
                            layer.msg("手机号码格式不正确");
                            return;
                        }
                    };

                    data = {
                        'mobile': _this.bind_mobile,
                        'phone_code': this.regist_bind_code,
                        'build_type': 1,
                        'mcode': _this.bind_message_code
                    };
                    _this.$http.post(url, data).then(function(res) {
                        res = res.data;
                        // 第三方登录手机号已存在
                        if (res.code === 101) {
                            this.popShow = 7;

                        } else if (res.code === 100||res.code === 0) {
                            layer.msg(res.msg);

                        } else {
                            var ispwd = res.data.is_password;
                            if(ispwd===0){
                                layer.msg('您尚未设置登录密码,请设置', {
                                    time: 1000
                                }, function() {
                                    _this.noPwdShow = true;
                                });
                            }else if(ispwd===1){

                                layer.msg('绑定成功', {
                                    time: 3000
                                }, function() {
                                    // var this_referrer = document.referrer;
                                    // if (this_referrer) {
                                    //     if (this_referrer.indexOf('setting') != -1) {
                                    //         window.location.href = '/m-index.html';
                                    //     } else {
                                    //         window.location.href = this_referrer;
                                    //     };
                                    // } else {
                                    //     window.location.href = '/m-index.html';
                                    // };
                                    // 
                                    window.location.href = window.location.href;
                                });
                            };
                        };
                    });
                } else if (ind === 1) { //继续绑定，合并
                    data = {
                        'mobile': _this.bind_mobile,
                        'phone_code': this.regist_bind_code,
                        'build_type': 2,
                        'mcode': _this.bind_message_code
                    };
                    _this.$http.post(url, data).then(function(res) {
                        res=res.data;
                        if (res.code === 101) {
                            this.popShow = 7;
                            return;
                        } else if (res.code === 102) {
                            this.popShow = 8;
                            return;
                        } else if (res.code === 100||res.code === 0) {
                            layer.msg(res.msg, {
                                time: 2000
                            }, function() {
                                window.location.href = window.location.href;
                            });
                            return;
                        } else {
                            _this.bindPopShowFun(5);
                            setTimeout(function(){
                                // var this_referrer = document.referrer;
                                // if (this_referrer) {
                                //     if (this_referrer.indexOf('setting') != -1) {
                                //         window.location.href = '/m-index.html';
                                //     } else {
                                //         window.location.href = this_referrer;
                                //     };
                                // } else {
                                //     window.location.href = '/m-index.html';
                                // };
                                window.location.href = window.location.href;
                            },3000);
                        };
                    });
                } else if (ind === 2) { //绑定其它手机号
                    if (!common.form_Verification({
                            type: "phone_code",
                            el: ".regist_phone_code",
                            parset:".reset-inp",
                            value: this.regist_bind_other_code
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                        type: "mobile",
                        el: ".bind_other_mobile",
                        parset:".bind-other-inp",
                        value: _this.bind_other_mobile
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".bind_other_captcha_code",
                            parset:".bind-other-inp",
                            value: _this.bind_other_captcha_code
                        })) {
                        return false;
                    }
                    if (!common.form_Verification({
                            type: "captcha_code",
                            el: ".bind_other_message_code",
                            parset:".bind-other-inp",
                            value: _this.bind_other_message_code
                        })) {
                        return false;
                    }

                    if(_this.regist_bind_other_code  == 86){
                        if(_this.bind_other_mobile.length != 11){
                            layer.msg("手机号码格式不正确");
                            return;
                        }
                    }else if(_this.regist_bind_other_code  == 886){
                        if(_this.bind_other_mobile.length != 9){
                            layer.msg("手机号码格式不正确");
                            return;
                        }
                    };


                    data = {
                        'mobile': _this.bind_other_mobile,
                        'phone_code': this.regist_bind_other_code,
                        'build_type': 1,
                        'mcode': _this.bind_other_message_code
                    };
                    _this.$http.post(url, data).then(function(res) {
                        // var start = common.post_Verification(res);
                        res=res.data;
                        if (res.code === 101) {
                            this.popShow = 7;
                            return;
                        } else if (res.code === 102) {
                            this.popShow = 8;
                            return;
                        } else if (res.code === 100||res.code === 0) {
                            layer.msg(res.msg);
                            return;
                        } else {
                            _this.bindPopShowFun(5);
                            setTimeout(function(){
                                // var this_referrer = document.referrer;
                                // if (this_referrer) {
                                //     if (this_referrer.indexOf('setting') != -1) {
                                //         window.location.href = '/m-index.html';
                                //     } else {
                                //         window.location.href = this_referrer;
                                //     };
                                // } else {
                                //     window.location.href = '/m-index.html';
                                // };
                                window.location.href = window.location.href;
                            },3000);
                        };
                    });
                }

            },
            // 绑定其它手机号
            bindOtherFun: function() {
                this.popShow = 4;
                this.refreshImgCode();
            },
            //注册陪玩协议
            agreement_fn:function(){
                layer.open({
                  type: 2,
                  title: ['刀锋电竞陪玩协议','text-align:center;color:#313131;font-size:18px;'],
                  shadeClose: true,
                  shade: 0.5,
                  area: ['800px', '600px'],
                  content: '/agreement/register.html' //iframe的url
                }); 
            },
            
            //刷新图形验证码
            refreshImgCode: function() {
                this.code_readonly = false;
                this.imgCode = img_code + "?x=" + Math.random();
            },
            // 切换登录方式
            changeLogin: function(ind) {
                var _this = this;
                this.loginTabShow = ind;
                this.refreshImgCode();
            },
            // 忘记密码切换
            forgetFun: function(ind) {
                this.popShow = ind;
                this.refreshImgCode();
            }
        }
    });

    // 新用户弹窗
    var receive = new Vue({
          el:"#public_new_receiveId",
              data:{
                isshow:false
              },
              mounted: function () {
                  var _this = this;            
                  this.$nextTick(function(){ 
                  });
              },
              methods:{
                receive_show:function(){
                    var _this = this;
                    tel_login_v1.isshow = false;
                    if(registerNum === 1){
                        _this.isshow = true;                      
                    }else{
                        _this.isshow =  false; 
                        window.location.href = window.location.href;
                    } 
                },
                receive_close:function(){
                    this.isshow = false;
                    window.location.href = window.location.href;
                },
              },
        });

    //老用户弹窗
    var oldUser = new Vue({
        el:"#public_old_oldUserId",
        data:{
            isshow:false,
        },
        mounted: function () {
            var _this = this;            
            this.$nextTick(function(){
            });
        },
        methods:{
            oldUser_show:function(){
                tel_login_v1.isshow = false;
                if(loginNum === 1){
                    this.isshow = true;
                    this.oldUser_info();
                }else{
                    this.isshow = false;
                    window.location.href = window.location.href;
                };
            },
            // 老用户领取红包
            oldUser_info:function(){
                this.$http.post("/user/bonusmoney/olduser").then(function(res){
                    res = res.body;
                    if(res.code == 200){
                    }else{
                        layer.msg(res.msg)
                    }
                },function(){
                    layer.msg("网络出现错误，请重试！")
                })
            },
            oldUser_close:function(){
                this.isshow = false;
                window.location.href = window.location.href;
            }
        },
    });


    /*==========================================*/

    // 调取common公共方法
    var modal = {
        get_common:function(res){
            // console.log(common);
            common = res;
        },
        jumpFun:function(){
            setTimeout(function(){
                tel_login_v1.testFun();//登录模块公共模板测试
            },1000)
        },
    };
    return modal;
})