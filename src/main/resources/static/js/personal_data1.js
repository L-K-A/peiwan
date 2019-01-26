// JavaScript Document
//左侧栏
$(".classify_box li").click(function () {
    $(this).parents().find(".classify_box li").removeClass("left_border")
    $(this).addClass("left_border").siblings().removeClass("left_border")
})
$('.cheak').click(function () {
    if ($(this).attr('flag') == 'off') {
        $(this).find('.cheak_hover02').show();
        $(this).find('.cheak_hover').hide();
        $(this).attr('flag', 'on');
        $(this).css('color', '#999999');

    } else {
        $(this).find('.cheak_hover').show()
        $(this).find('.cheak_hover02').hide()
        $(this).attr('flag', 'off');
        $(this).css('color', '#25e198');
    }
})
var audio = document.createElement("audio");

$(function () {
    var indexii = 0;
    $("body #cloudBody").each(function (index, el) {
        $(this).click(function (event) {
            var cloud = $(this),
                music_src = cloud.attr("data-music"),
                thisaudio = cloud;
            audio.load();
            audio.pause();
            audio.src = music_src;
            audio.play();

            $("body #cloudBody").attr("style", "");
            cloud.css({
                "background-image": 'url()'
            });
            audio.addEventListener('timeupdate', function () {
                if (!isNaN(audio.duration)) {
                    var surplus = audio.duration - audio.currentTime;
                    if (parseInt(surplus) == 0) {
                        cloud.attr("style", "");
                    }
                }
                ;
            }, false);
        });
    });
});
var flag = 0;
$('.voice_hover').click(function () {
    if (flag == 0) {
        $('.voice_hover01').hide();
        $('.voice_hover02').show();
        flag = 1;
    } else {
        $('.voice_hover01').show();
        $('.voice_hover02').hide();
        audio.pause();
        flag = 0;
    }

})
$(".close").click(function () {
    $('#mailer_box').hide();
})

/*$.ajax({
   url: "",
   dataType: 'jsonp',
   success: function (obj) {
       if (obj.code == 0) {
           if (obj.data['tel'].length > 0) {
               $('#phone').html(obj.data['tel'])
               $('.sure_box1').hide();
               $('.sure_box').show();
           } else {
               $('.sure_box').hide();
               $('.sure_box1').show();
               $('.sure_box1').click(function(){
                   alert('请先绑定手机号！');
               })

               $('#phone').html('<a href="javascript:;" onclick="bindp()" style="color: #fc848a;cursor: pointer;text-decoration: underline;">未绑定</a>');
           }
       }
   }
})*/
$(document).ready(function () {
    var a = function (a) {
        $("#getcode").click(function () {
            if (!chktel(!1)) return !1;
            var c = a.getValidate();
            if (c) if (checkphone($("#ctl00_mainContent_txt_phone").val())) {
                var d = {};
                d.t = $("#ctl00_mainContent_txt_phone").val();
                d.c = c.geetest_challenge;
                d.v = c.geetest_validate;
                d.s = c.geetest_seccode;
                c = packSendData_general(d);
                $.ajax({
                    type: "post",
                    url: "?t\x3d" + (new Date).getTime(),
                    dataType: "jsonp",
                    jsonp: "callback",
                    data: {
                        data: c
                    },
                    success: function (a) {
                    }
                });
                settime($("#getcode"))
            } else $("#ctl00_mainContent_txt_phone").focus(),
                $("#ctl00_mainContent_txt_phone").addClass("add_input")
        });
        a.appendTo("#captcha");
        a.bindOn("#getcode")
    };
    $.ajax({
        url: "?t\x3d" + (new Date).getTime(),
        type: "get",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (b) {
            initGeetest({
                gt: b.gt,
                challenge: b.challenge,
                product: "popup",
                offline: !b.success
            }, a)
        }
    });
    $("#chk_tel_pwd").blur(function () {
        chktelpwd(!0)
    });
    $("#ctl00_mainContent_txt_phone").blur(function () {
        chktel(!0)
    });
    $("#ctl00_mainContent_txt_code").blur(function () {
        chkcode()
    })
});


function bindp() {
    $('#Bound_phone').show();
}

function checkphone(a) {
    return a.length != 11 ? !1 : null != a.match(/[1-9][0-9]{10}/) ? !0 : !1
}

function bindphone() {
    if (!chktel(!1)) return !1;
    if (!chktelpwd(!1)) return !1;
    if (!chkcode()) return !1;
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
            url: "",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                data: a
            },
            success: function (a) {
                if (0 == a.code) $("#phone").html($("#ctl00_mainContent_txt_phone").val().substr(0, 3) + '****' + $("#ctl00_mainContent_txt_phone").val().substr(7, 4)),
                    $("#Bound_phone").hide(),
                    $('#edittel').hide(),
                    $('#edittel1').show(),
                    $('.sure_box1').hide(),
                    $('.sure_box').show(),
                    state = !0;
                else {
                    publicKey = a.data;
                    switch (a.code) {
                        case -2 :
                            $("#chk_tel_pwd").addClass("add_input");
                            break;
                        case -3 :
                            $("#ctl00_mainContent_txt_code").addClass("add_input");
                            setErrMsg("验证码错误");
                            break;
                        case -5 :
                            $("#ctl00_mainContent_txt_phone").addClass("add_input");
                            break;
                        default:
                            setErrMsg("验证码错误");
                            $("#ctl00_mainContent_txt_code").addClass("add_input");
                    }
                    state = !1
                }
            }
        })
    }
}

function chktelpwd(a) {
    if ("" == $("#chk_tel_pwd").val()) return $("#chk_tel_pwd").addClass("add_input"), setErrMsg("密码不能为空"),
        !1;
    if (a) {
        a = {};
        a.password = $("#chk_tel_pwd").val();
        a = packSendData_general(a);
        var b = !1;
        $.ajax({
            type: "post",
            url: "checkpassword",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                data: a
            },
            success: function (a) {
                0 == a.code ? ($("#chk_tel_pwd").removeClass("add_input"), b = !0) : (publicKey = a.data, $("#chk_tel_pwd").addClass("add_input"), setErrMsg("密码错误"), b = !1)
            }
        });
        return b
    }
    return !0
}

function chktel(a) {
    if ("" == $.trim($("#ctl00_mainContent_txt_phone").val())) {
        $("#ctl00_mainContent_txt_phone").addClass("add_input");
        setErrMsg("手机号不能为空");
        return !1;

    }
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
                success: function (a) {
                    0 == a.code ? ($("#ctl00_mainContent_txt_phone").removeClass("add_input"), b = !0) : (publicKey = a.data, $("#ctl00_mainContent_txt_phone").addClass("add_input"), b = !1)
                    if (b == !1) {
                        setErrMsg("手机号已被绑定")
                    }
                    ;
                }
            });
            return b
        }
        return !0
    }
    setErrMsg("手机号错误"),
        $("#ctl00_mainContent_txt_phone").addClass("add_input");
    return !1
}

function chkcode() {
    if ("" == $.trim($("#ctl00_mainContent_txt_code").val())) return $("#ctl00_mainContent_txt_code").addClass("add_input"),
        !1;
    $("#ctl00_mainContent_txt_code").removeClass("add_input");
    return !0
}


function setErrMsg(msg) {
    if (msg) {

        $('#errMsgBox').html(msg);
    } else {

        $('#errMsgBox').html('&nbsp;');
    }
}


function settime(a) {
    var countdown = 60;
    settimea(a)

    function settimea(a) {
        0 >= countdown ? (a[0].removeAttribute("disabled"), a[0].style.backgroundColor = "", a[0].style.cursor = "pointer", a[0].value = "获取验证码", countdown = 60) : (a[0].setAttribute("disabled", !0), a[0].style.cursor = "wait", a[0].value = "重新发送(" + countdown + ")", countdown--, setTimeout(function () {
            settimea(a)
        }, 1E3))
    }
}


$('.layer1-cell-close').click(function () {
    $('#Bound_phone').hide();
})

$("#saveAvatar").click(function () {
    editavatar();
});

$(document).ready(function () {
    /* 定义所有class为copy-input标签，点击后可复制class为input的文本 */
    $(".copy-input").zclip({
        path: "",
        copy: function () {
            return $("#share_link").val();
        },
        afterCopy: function () { /* 复制成功后的操作 */
            var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'>☺ 复制成功</div></div>");
            $("body").find(".copy-tips").remove().end().append($copysuc);
            $(".copy-tips").fadeOut(3000);
        }
    });
});


$(".head_title").click(function () {
    $("#pop_up").show();
    $("body").css("overflow-y", "hidden");
})
$(".close, .keep_box2").click(function () {
    $("#pop_up").hide();
    $("body").css('overflow-y', 'scroll');
})

function editavatar() {
    if ($(".container .cropped img")[0] != null) {
        var imgClip = $(".container .cropped img")[0].src;
        $('#headimg').attr('src', imgClip);
        $('#img64').val(imgClip);
        $("#pop_up").hide();
        $("body").css('overflow-y', 'scroll');
    } else {
        alert("请先裁剪图片!");
    }
}

$(window).load(function () {
    var options =
        {
            thumbBox: '.thumbBox',
            spinner: '.spinner',
            imgSrc: ''
        }
    var cropper = $('.imageBox').cropbox(options);
    $('#upload-file').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            options.imgSrc = e.target.result;
            cropper = $('.imageBox').cropbox(options);
            $('#ori_avatar').val(e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
        this.files = [];
    })
    $('#btnCrop').on('click', function () {
        var img = cropper.getDataURL();
        $('.cropped').html('');
        $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
        $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
        $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
    })
    $('#btnZoomIn').on('click', function () {
        cropper.zoomIn();
    })
    $('#btnZoomOut').on('click', function () {
        cropper.zoomOut();
    })
});

$(".head_title").click(function () {
    $("#pop_up").show();
})
$(".close, .keep_box2").click(function () {
    $("#pop_up").hide()
});
$('#province').change(function () {
    var id = $(this).val();
    if (id != 0) {
        $.ajax({
            url: '' + id,
            dataType: "jsonp",
            success: function (obj) {
                var str = '';
                for (var x in obj) {
                    str += '<option value="' + obj[x].Id + '">' + obj[x].Name + '</option>';
                }
                $('#city').html(str);
            }
        })
    } else {
        $('#city').html('<option value="0" selected="selected">选择城市</option>');
    }
})
$('#area_id').change(function () {
    var gameID = $('#gameID').val();
    if ($('#gameID').val().length != 0) {
        var area_id = $(this).val();
        get_area_grading(gameID, area_id);
    }
})
$('#gameID').blur(function () {
    var area_id = $('#area_id').val();
    if (area_id != 0) {
        var gameID = $(this).val();
        get_area_grading(gameID, area_id);
    }
})

function get_area_grading(gameID, area_id) {
    $.ajax({
        url: "?player=" + gameID + "&areaid=" + area_id,
        dataType: 'jsonp',
        success: function (obj) {
            if (obj.status == 0) {
                if (obj.rank_num != 0) {
                    $('#area_grading').val(obj.rank);
                } else {
                    $('#area_grading').val("无段位");
                }
            }
            if (obj.status == 1) {
                $('#area_grading').val("游戏ID或者游戏大区无效");
            }
            $('#check_area_grading').val(obj.status);
        }
    })
}

$("#datamp3").change(function () {
    $("#cloudBody").attr('data-music', '');
    $('.time_box').html('');
    var ext = $("#datamp3").val().substr($("#datamp3").val().lastIndexOf('.') + 1);
    ext = ext.toLocaleLowerCase();
    if (ext == 'mp3') {
        var size = this.files[0].size;
        if (size > '5242880') {
            $('#flagmp3').val(-2);
        } else {
            $('#flagmp3').val(1);
            $('#voice_hover').hide();
        }
    } else {
        $('#flagmp3').val(-2);
    }
})

$('input').blur(function () {
    $(this).removeClass('add_input');
})
$('select').change(function () {
    $('select').removeClass('add_input');
})

$('#form').submit(function () {
    return subform();
});

/*表单*/
function subform() {
    flag = true;
    if ($('#img64').val() == '') {
        alert('请上传头像');
        flag = false;
        return false;
    }
    if ($('#personNickname').val().trim().length == 0 || $('#personNickname').val().trim().length > 20) {
        $('#personNickname').addClass('add_input');
        alert('请填写昵称');
        flag = false;
    }
    var pregbirthday = /^\d{4}年\d{2}月\d{2}日$/;
    if (!pregbirthday.test($('#birthday').val())) {
        $('#birthday').addClass('add_input');
        flag = false;
    }
    if ($('#province').val() == 0 || $('#city').val() == 0) {
        $('#province, #city').addClass('add_input');
        flag = false;
    }
    var pregqq = /^\d{5,10}$/;
    if (!pregqq.test($('#personQq').val())) {
        $('#personQq').addClass('add_input');
        alert('请填写QQ账号');
        flag = false;
    }
    //标签限制
    var tagLength = $("input:checkbox[name='tag[]']:checked").length;
    if (tagLength != 2) {
        alert('个性标签只能选择两项' + tagLength);
        return false;
    }

    if (randimgFlag == 0) {
        if ($("#upfile").val() == '') {
            alert('请上传图片');
            flag = false;
            return false;
        }
        var ext = $("#upfile").val().substr($("#upfile").val().lastIndexOf('.') + 1);
        ext = ext.toLocaleLowerCase();
        alert(ext);
        if (ext != 'jpg' && ext != 'jpeg' && ext != 'png' && ext != 'JPG' && ext != 'JPEG' && ext != 'PNG') {
            flag = false;
            alert('格式上传错误');
            return false;
        }
        if ($('#file_64').val().length > 3145728) {
            flag = false;
            alert('图片大小不能超过1M');
            return false;
        }
    }
    if ($('#short_desc').val() == '') {
        $('#short_desc').addClass('add_input');
        alert('请填写个性签名');
        flag = false;
    }

    /*
    if(UM)
    {
        var desctext = getContent();
    }else{
        var desctext = $('#myEditor').val();
    }

    if(desctext.length==0){
        //alert('服务描述不能为空');
        //flag = false;
    }*/
    // var obj = desctext.match(/(src|href)\s*=\s*('|")[^"'?]+/g);
    // if(obj!=null){
    //     for (var i = obj.length - 1; i >= 0; i--) {
    //         if(obj[i].indexOf('http://www.tuwan.com')<0 && obj[i].indexOf('http://t.tuwan.com')<0 && obj[i].indexOf('http://lol.tuwan.com')<0 && obj[i].indexOf('https://imgcache.qq.com')<0){
    //             alert('链接必须为tuwan.com或者https://imgcache.qq.com');
    //             flag = false;
    //             break;
    //         }
    //     }
    // }

    var organ = jqchk('organ');
    if (organ !== '' && organ.length > 3) {
        alert('魅力部位最多选三个');
        flag = false;
    }
    var dtids = 31540;
    $('.status_lolhover').each(function () {
        if ($(this).css('display') !== 'none') {
            dtids = $(this).parent().attr('dtid');
        }
    })
    if (dtids == '31540') {
        if ($('#gameID').val() == '') {
            $('#gameID').addClass('add_input');
            flag = false;
        }
        if ($('#grading').val() == '') {
            $('#grading').addClass('add_input');
            flag = false;
        }
        // if($('#check_area_grading').val() == 1){
        //     $('#gameID').addClass('add_input');
        //     $('#area_id').addClass('add_input');
        //     alert('填写正确的游戏大区或地址');
        //     flag = false;
        // }
    }
    var Sheight = $('#Sheight').val();
    var pregSheight = /^\d{1,3}$/;
    if (Sheight !== '' && !pregSheight.test(Sheight)) {
        alert('请填写正确的身高');
        $('#Sheight').addClass('add_input');
        flag = false;
    }
    var weight = $('#weight').val();
    var pregweight = /^\d{1,3}$/;
    if (weight !== '' && !pregweight.test(weight)) {
        alert('请填写正确的体重');
        $('#weight').addClass('add_input');
        flag = false;
    }
    var like = $('#like').val();
    if (like !== '' && like.length > 20) {
        alert('兴趣爱好不超过20个字');
        $('#like').addClass('add_input');
        flag = false;
    }
    /*
    if($('#gamelist').css('display') != 'none'){
        var gamelist = jqchk('gamelist');
        if(gamelist == ''  || gamelist.length == 0){
            alert('请选择QQ可接段位');
            flag = false;
        }
    }

    if($('#gamelistV2').css('display') != 'none'){
        var gamelistv2 = jqchk('gamelistV2');
        if(gamelistv2 == '' || gamelistv2.length == 0){
            alert('请选择微信可接段位');
            flag = false;
        }
    }*/
    return flag;
}


try {
    var audio = new Audio($("body #cloudBody").attr("data-music"));
    audio.addEventListener('canplay', function () {
        var mp3 = Math.ceil(this.duration);
        $('.time_box').html(mp3 + 's');
    });
} catch (ex) {

}


function jqchk(classname) { //jquery获取复选框值
    var chk_value = [];
    $('input[class="' + classname + '"]:checked').each(function () {
        chk_value.push($(this).val());
    });
    return chk_value;
}


/*if (UM) {
    var um = UM.getEditor('myEditor');
    um.execCommand('unlink');

    function getContent() {
        var arr = [];
        arr.push(UM.getEditor('myEditor').getContent());
        return arr.join("\n");
    }
} */

         
