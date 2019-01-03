// JavaScript Document
//
$(function(){
	$(window).scroll(function(){
	var ling=$(document).scrollTop();
	if(ling<100){	
		$("#fixed_left_box").removeClass("fixed_left_01");	
		}	
	if(ling>100){	
		$("#fixed_left_box").addClass("fixed_left_01");
	}		
		})
	})


//控制屏幕
$(".content_bg")[0].style.width = ($(window).width()-390)+"px";
   $(window).resize(function () {
   $(".content_bg")[0].style.width = ($(window).width()-390) + "px";
        })
$(".content_bg")[0].style.width = ($(window).width()-390)+"px";
   $(window).resize(function () {
   $(".content_bg")[0].style.width = ($(window).width()-390) + "px";
        })
//弹窗

$(".close").click(function(){
	$(".pop_up_box").hide();
	$(".pop_up_box2").hide();
	})
$(".self_culture").click(function(){
	$(".pop_up_box2").show();
	})
$(".fail").click(function(){
	$(".pop_up_box").hide();
	$(".pop_up_box2").hide();
	})