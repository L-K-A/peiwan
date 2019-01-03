
$(document).ready(function () {

    $("#saveAvatar").click(function () {


        editavatar();

    });

});

function editavatar() {


    if ($(".container .cropped img")[0]!=null) {



        var imgClip = $(".container .cropped img")[0].src;


        $.ajax({
            type: "post",
            url: "http://u.tuwan.com/Avatar/upload?format=json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            data: { img: imgClip },
            success: function (data) {

                var ret = JSON.parse(data);

                if(ret.code==0){

                    if(ret.data.small!=null){


                        $(".pop_up_basicbox1").hide();
                        $("body").css('overflow-y', 'scroll');

                        //$("#head img")[0].src = imgClip;
                        $(".head_portrait img")[0].src = imgClip;
                        //$(".head_photo img")[0].src = imgClip;

                    }

                } else {

                    alert(ret.msg);
                }


            }
        });


    } else {
        alert("请先裁剪图片!");
    }



}