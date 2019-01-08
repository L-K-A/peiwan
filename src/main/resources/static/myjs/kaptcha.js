$(function() {
    $('#kaptchaImage').click(function() {
        $(this).attr('src', 'kaptcha.jpg?' + Math.floor(Math.random() * 100));
    });

    $('#kaptcha').bind({
        focus : function() {
            //            if (this.value == this.defaultValue){
            //                this.value="";
            //            }
        },
        blur : function() {
            //var paramsTime = $("#kaptcha").val();
            var paramsTime = {
                kaptcha : this.value
            };
            $.ajax({
                url : "kaptcha",
                data : paramsTime,
                type : "POST",
                success : function(data) {
                    if (data == "kaptcha_error") {
                        //显示验证码错误信息
                        show_validate_msg("#kaptcha", "error", "验证码错了");
                        //禁用按钮
                        $('#user_insert_btn').attr('disabled',"true");
                    }else{
                        //显示验证码正确信息
                        show_validate_msg("#kaptcha", "success", "验证码正确");
                        $('#user_insert_btn').removeAttr("disabled");
                    }

                }
            });
        }
    });
});
