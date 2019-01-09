$('#form').submit(function(){
    flag = !0;
    var name = $('#name').val();
    var pregname = /^[\u4E00-\u9FA5]{2,4}$/;
    if(!pregname.test(name)){
        $('#name').addClass('add_input');
        flag = !1;
    }
    var idcard = $('#idcard').val();
    var regcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!regcard.test(idcard)){
        $('#idcard').addClass('add_input');
        flag = !1;
    }
    var file_text1 = $('#file_text1').val();
    var file_text2 = $('#file_text2').val();
    if(file_text1 == '' || file_text2 == '') alert('请上传图片'),flag = !1;
    return flag;
})
getImageWidthAndHeight('upfile1', function (obj) {},1)
getImageWidthAndHeight('upfile2', function (obj) {},2)
function getImageWidthAndHeight(id, callback,flag) {
      var _URL = window.URL || window.webkitURL;
      $("#" + id).change(function (e) {
        var file, img;
        var thisFiles = this.files[0];
        if ((file = this.files[0])) {
          img = new Image();
          img.onload = function () {
            var widthsnum = this.width * 1;
            var heightsnum = this.height * 1;
            var ext = $("#" + id).val().substr($("#" + id).val().lastIndexOf('.')+1);
            ext = ext.toLocaleLowerCase();
            if(flag == 1){
                if($("#" + id).val().substr($("#" + id).val().lastIndexOf('.')+1) == 'jpg' || ext == 'jpeg' || ext == 'jpg' || ext == 'png'){
                    lrz(thisFiles, {width:widthsnum, height:heightsnum}, function (results){
                        var ba = results.base64;
                        $('#file_text1').val(ba);
                    })
                    lrz(thisFiles, {width: 160, height: 136}, function (results){
                        var ba = results.base64;
                        $('.img_box').eq(0).html("<img src='"+ba+"'/>");
                    })
                }
            }else{
                lrz(thisFiles, {width:widthsnum, height:heightsnum}, function (results){
                    var ba = results.base64;
                    $('#file_text2').val(ba);
                })
                lrz(thisFiles, {width: 160, height: 136}, function (results){
                    var ba = results.base64;
                    $('.img_box').eq(1).html("<img src='"+ba+"'/>");
                })
            }
        };
          img.src = _URL.createObjectURL(file);
        }
      });
    }

$(".classify_box li").click(function() {
    $(this).parents().find(".classify_box li").removeClass("left_border")
    $(this).addClass("left_border").siblings().removeClass("left_border")
})

$('.user_cousor_01').click(function() {
    $('#Modify_password').show();

})


$('.user_cousor_02').click(function() {
    if($('.user_cousor_02').index(this) == 0){
        $('#Modify_mobile .input_title').html('修改手机号');
        $('#Modify_mobile .mobile_01').html('修改已绑定的手机号请联系客服');
        $('#Modify_mobile .mobile_02').html('（注意！客服不会索要您的密码）');
    }
    if($('.user_cousor_02').index(this) == 1){
        $('#Modify_mobile .input_title').html('修改微信');
        $('#Modify_mobile .mobile_01').html('修改已绑定的微信请联系客服');
        $('#Modify_mobile .mobile_02').html('（注意！客服不会索要您的密码）');
    }
    if($('.user_cousor_02').index(this) == 2){
        $('#Modify_mobile .input_title').html('修改银行卡');
        $('#Modify_mobile .mobile_01').html('修改已绑定的银行卡请联系客服');
        $('#Modify_mobile .mobile_02').html('（注意！客服不会索要您的密码）');
    }
    $('#Modify_mobile').show();
})


$('.display_none04').click(function() {
    $('#Real_name').show();

})
$('.display_none01').click(function() {
    $('#Bound_phone').show();

})
$('.layer1-cell-close').click(function() {
        $('#Modify_password').hide();
        $('#Modify_mobile').hide();
        $('#Modify_alipay').hide();
        $('#Modify_wechat').hide();
        $('#Real_name').hide();
        $('#Bound_phone').hide();


    })


$(window).scroll(function(){
    var ling=$(document).scrollTop();
    if(ling<100){ 
        $("#fixed_left_box").removeClass("fixed_left_01");  
    } 
    if(ling>100){ 
        $("#fixed_left_box").addClass("fixed_left_01");
    }   
})

function checkphone(a) {
    return a.length != 11 ? !1 : null != a.match(/[1-9][0-9]{10}/) ? !0 : !1
}
function bindphone() {
    if (!chktel(false)) return false;
    if (!chktelpwd(false)) return false;
    if (!chkcode()) return false;
    if (!$("#ctl00_mainContent_txt_phone").hasClass("add_input") && !$("#chk_tel_pwd").hasClass("add_input")) {
        var a = {
            om: 0
        };
        a.tel = $("#ctl00_mainContent_txt_phone").val();
        a.pwd = $("#chk_tel_pwd").val();
        a.code = $("#ctl00_mainContent_txt_code").val();
        a = packSendData_general(a);
        $.ajax({
            type: "post",
            url: "/editmobile",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                data: a
            },
            success: function(a) {
                if (0 == a.code) $("#telnum").html($("#ctl00_mainContent_txt_phone").val().substr(0,3)+'****'+$("#ctl00_mainContent_txt_phone").val().substr(7,4)),
                $("#Bound_phone").hide(),
                $('#edittel').hide(),
                $('#edittel1').show(),
                location.href = location.href,
                state = !0;
                else {
                    publicKey = a.data;
                    switch (a.code) {
                    case - 2 : $("#chk_tel_pwd").addClass("add_input");
                        break;
                    case - 3 : $("#ctl00_mainContent_txt_code").addClass("add_input");
                        alert("验证码错误");
                        break;
                    case - 5 : $("#ctl00_mainContent_txt_phone").addClass("add_input");
                        break;
                    default:
                        alert("验证码错误");
                        $("#ctl00_mainContent_txt_code").addClass("add_input");
                    }
                    state = !1
                }
            }
        })
    }
}
function changepwd() {
    if (!chkoldpwd(!1)) return 
    !1;
    if (!chkpwd()) return 
    !1;
    if (!chkrpwd()) return 
    !1;
    if (!$("#oldpwd").hasClass("add_input") && !$("#ctl00_mainContent_txt_password").hasClass("add_input") && !$("#repeatpwd").hasClass("add_input")) {
        var a = {};
        a.oldpassword = $("#oldpwd").val();
        a.newpassword = $("#ctl00_mainContent_txt_password").val();
        a = packSendData_general(a);
        $.ajax({
            type: "post",
            url: "/editpassword",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                data: a
            },
            success: function(a) {
                0 == a.code ? (alert("密码修改成功!请重新登录"), setTimeout("relogin()", 1E3), state = !0) : (publicKey = a.data, $("#oldpwd").addClass("add_input"), state = !1)
            }
        })
    }
}
function relogin() {
    $.ajax({
        url: "/useraction.ashx?method\x3dloginout",
        dataType: "jsonp",
        success: function(a) {
            window.location.href = window.location.href
        }
    })
}


$(document).ready(function() {
    var a = function(a) {
        $("#getcode").click(function() {
            if (!chktel(!1)) return !1;
            var c = a.getValidate();
            if (c) if (checkphone($("#ctl00_mainContent_txt_phone").val())) {
                var d = {};
                d.t = $("#ctl00_mainContent_txt_phone").val();
                d.c = c.geetest_challenge;
                d.v = c.geetest_validate;
                d.s = c.geetest_seccode;
                c = packSendData_general(d);
                console.log(c)
                $.ajax({
                    type: "post",
                    url: "/requestCode.ashx?t\x3d" + (new Date).getTime(),
                    dataType: "jsonp",
                    jsonp: "callback",
                    data: {
                        data: c
                    },
                    success: function(a) {}
                });
                settime($("#getcode"))
            } else $("#ctl00_mainContent_txt_phone").addClass("add_input")
        });
        a.appendTo("#captcha");
        a.bindOn("#getcode")
    };
    $.ajax({
        url: "/getSlider.ashx?t\x3d" + (new Date).getTime(),
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(b) {
            initGeetest({
                gt: b.gt,
                challenge: b.challenge,
                product: "popup",
                offline: !b.success
            },
            a)
        }
    });
    $("#oldpwd").blur(function() {
        chkoldpwd(true)
    });
    $("#chk_tel_pwd").blur(function() {
        chktelpwd(true)
    });
    $("#ctl00_mainContent_txt_password").blur(function() {
        chkpwd();
        chkrpwd()
    });
    $("#repeatpwd").blur(function() {
        chkpwd();
        chkrpwd()
    });
    $("#ctl00_mainContent_txt_phone").blur(function() {
        chktel(true)
    });
    $("#ctl00_mainContent_txt_code").blur(function() {
        chkcode()
    })
});



function chktelpwd(a) {
    if ("" == $("#chk_tel_pwd").val()) return $("#chk_tel_pwd").addClass("add_input"),setErrMsg("密码不能为空"),
    !1;
    if (a) {
        a = {};
        a.password = $("#chk_tel_pwd").val();
        a = packSendData_general(a);
        var b = false;
        $.ajax({
            type: "post",
            url: "/checkpassword",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                data: a
            },
            success: function(a) {
				if(a.code==0){
					$("#chk_tel_pwd").removeClass("add_input");
					setErrMsg();
					b = !0;
				}else{
					publicKey = a.data;
					$("#chk_tel_pwd").addClass("add_input");
					setErrMsg("密码错误");
					b = !1
				}
				
            }
        });
        return b
    }
    return ! 0
}
function chkoldpwd(a) {
    if ("" == $("#oldpwd").val()) return $("#oldpwd").addClass("add_input"),
    !1;
    if (a) {
        a = {};
        a.password = $("#oldpwd").val();
        a = packSendData_general(a);
        var b = !1;
        $.ajax({
            type: "post",
            url: "/checkpassword",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                data: a
            },
            success: function(a) {
                0 == a.code ? ($("#oldpwd").removeClass('add_input'), b = !0) : (publicKey = a.data, $("#oldpwd").addClass("add_input"), b = !1)
            }
        });
        return b
    }
    return ! 0
}
function chkpwd() {
    if ("" == $("#ctl00_mainContent_txt_password").val()) return $("#ctl00_mainContent_txt_password").addClass("add_input"),
    !1;
    if (20 < $("#ctl00_mainContent_txt_password").val().length || 6 > $("#ctl00_mainContent_txt_password").val().length) return $("#ctl00_mainContent_txt_password").addClass("add_input"),
    !1;
    if ($("#ctl00_mainContent_txt_password").val() == $(".usern").html()) return $("#ctl00_mainContent_txt_password").addClass("add_input"),
    !1;
    if ($("#ctl00_mainContent_txt_password").val() == $("#telnum").html()) return $("#ctl00_mainContent_txt_password").addClass("add_input"),
    !1;
    if ($("#ctl00_mainContent_txt_password").val() == $("#oldpwd").val()) return $("#ctl00_mainContent_txt_password").addClass("add_input"),
    !1;
    $("#ctl00_mainContent_txt_password").removeClass("add_input");
    return ! 0
}
function chkrpwd() {
    if ($("#repeatpwd").val() != $("#ctl00_mainContent_txt_password").val()) return $("#repeatpwd").addClass("add_input"),
    !1;
    if ("" == $("#repeatpwd").val()) return $("#repeatpwd").addClass("add_input"),
    !1;
    $("#repeatpwd").removeClass("add_input");
    return ! 0
}
function chktel(a) {
    if ("" == $.trim($("#ctl00_mainContent_txt_phone").val())) return $("#ctl00_mainContent_txt_phone").addClass("add_input"),setErrMsg("手机号不能为空"),
    !1;
    if (checkphone($.trim($("#ctl00_mainContent_txt_phone").val()))) {
        if (a) {
            a = {};
            a.username = $.trim($("#ctl00_mainContent_txt_phone").val());
            a.platform = "mobile";
            a = packSendData_general(a);
            var b = !1;
            $.ajax({
                type: "post",
                url: "/chkuser",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    data: a
                },
                success: function(a) {
                    0 == a.code ? ($("#ctl00_mainContent_txt_phone").removeClass("add_input"), b = !0) : (publicKey = a.data, $("#ctl00_mainContent_txt_phone").addClass("add_input"), b = !1)
                    if (b == !1) {
						setErrMsg("手机号已被绑定");
					}else{
						setErrMsg();
					};
                }
            });
            return b
        }
        return ! 0
    }
    setErrMsg("手机号错误");
    $("#ctl00_mainContent_txt_phone").addClass("add_input");
    return ! 1
}
function chkcode() {
    if ("" == $.trim($("#ctl00_mainContent_txt_code").val())) return $("#ctl00_mainContent_txt_code").addClass("add_input"),
    !1;
    $("#ctl00_mainContent_txt_code").removeClass("add_input");
    return ! 0
}

function setErrMsg(msg){
	if(msg){
		
		$('#errMsgBox').html(msg);
	}else{
		
		$('#errMsgBox').html('&nbsp;');
	}
}

function settime(a) {
    var countdown = 60;
    settimea(a)
    function settimea(a) {
        0 >= countdown ? (a[0].removeAttribute("disabled"), a[0].style.backgroundColor = "", a[0].style.cursor = "pointer", a[0].value = "获取验证码", countdown = 60) : (a[0].setAttribute("disabled", !0), a[0].style.cursor = "wait", a[0].value = "重新发送(" + countdown + ")", countdown--, setTimeout(function() {
            settimea(a)
        },1E3))
    }
}
$('input').focus(function(){
    $(this).removeClass('add_input');
})
$('select').focus(function(){
    $(this).removeClass('add_input');
})

//校验数据发送验证码
function getcheckcode(type){
    if(checkinfo(type)) getapicode(type);
}

//校验微信数据支付宝数据
function checkinfo(type){
    if(type === 1){ //微信
        var wxcode = $('#wxcode').val().trim();
        if(wxcode.length > 0 && wxcode.length <= 30) return !0;
        else{
            $('#wxcode').addClass('add_input');
            return !1;
        }
    }
    if(type === 2){ //支付宝
        var alicode = $('#alicode').val().trim();
        var checkname = $('#checkname').val().trim();
        var pregcheckname = /^[\u4E00-\u9FA5]{2,4}$/;
        if(alicode.length > 0 && alicode.length <= 30){
            if(pregcheckname.test(checkname)) return !0;
            else $('#checkname').addClass('add_input');
            return !1;
        }
        else{
            $('#alicode').addClass('add_input');
            return !1;
        }
    }
    if(type === 3){ //银行卡
        var bank_id = $('#bank_id').val().trim();
        var bank_name = $('#bank_name').val().trim();
        var bank_from = $('#bank_from').val().trim();
        var bank_area = $('#bank_area').val().trim();
        var pregcheckbank_name = /^[\u4E00-\u9FA5]{2,4}$/;
        var pregchecknum = /^\d+$/;
        var flagc = !0;
        if(!pregcheckbank_name.test(bank_name)){
            $('#bank_name').addClass('add_input');
            flagc = !1;
        }
        if(!pregchecknum.test(bank_id)){
            $('#bank_id').addClass('add_input');
            flagc = !1;
        }
        if(!pregchecknum.test(bank_from)){
            $('#bank_from').addClass('add_input');
            flagc = !1;
        }
        if(bank_area.length <= 0 || bank_area.length > 30){
            $('#bank_area').addClass('add_input');
            flagc = !1;
        }
        return flagc;
    }
}


// api发送验证码
function getapicode(type){
    $.ajax({
        url: 'https://api.tuwan.com/playteach/?data=getcode&format=jsonp&paytype='+type,
        dataType: 'jsonp',
        success: function (obj) {
            if(obj.code == 0){
                if(type == 1) settime($('#wxg'));
                if(type == 2) settime($('#alig'));
                if(type == 3) settime($('#bank'));
            }else{
                alert('获取验证码间隔1分钟');
            }
        }
    })
}

//绑定
function bind(type){
    if(checkinfo(type)) submitbind(type);
}


//校验code
function submitbind(type){
    if(type===1){
        var wxcode = $('#wxcode').val().trim();
        var wxcheckcode = $('#wxcheckcode').val().trim();
        if(wxcheckcode.length <= 0){
            $('#wxcheckcode').addClass('add_input');
            return !1;
        }else{
            var data = 'paytype='+type+'&code='+wxcode+'&checkcode='+wxcheckcode;
        }
    }
    if(type===2){
        var alicode = $('#alicode').val().trim();
        var checkname = $('#checkname').val().trim();
        var alicheckcode = $('#alicheckcode').val().trim();
        if(alicheckcode.length <= 0){
            $('#alicheckcode').addClass('add_input');
            return !1;
        }else{
            var data = 'paytype='+type+'&code='+alicode+'&checkname='+checkname+'&checkcode='+alicheckcode;
        }
    }
    if(type===3){
        var bank_id = $('#bank_id').val().trim();
        var bank_name = $('#bank_name').val().trim();
        var bank_from = $('#bank_from').val().trim();
        var bank_area = $('#bank_area').val().trim();
        var bankcheckcode = $('#bankcheckcode').val().trim();
        if(bankcheckcode.length <= 0){
            $('#bankcheckcode').addClass('add_input');
            return !1;
        }else{
            var data = 'paytype='+type+'&bank_id='+bank_id+'&bank_name='+bank_name+'&bank_from='+bank_from+'&bank_area='+bank_area+'&checkcode='+bankcheckcode;
        }
    }
    $.ajax({
        url: '/?data=bindpaytype&format=json',
        type: "post",
        data: data,
        crossDomain:true,
        datatype: "json",
        xhrFields: {  withCredentials: true  },
        success: function (obj){
            if(JSON.parse(obj).code==0){
                if(type==1) $('#wxcheckcode').removeClass('add_input');
                if(type==2) $('#alicheckcode').removeClass('add_input');
                if(type==3) $('#bankcheckcode').removeClass('add_input');
                location.href = location.href;
            }else{
                if(type==1) $('#wxcheckcode').addClass('add_input');
                if(type==2) $('#alicheckcode').addClass('add_input');
                if(type==3) $('#bankcheckcode').addClass('add_input');
            }
        }
    })
}