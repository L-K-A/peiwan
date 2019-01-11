/**
 * index
 * 2018-3-22
 * 改版
 */
"use strict";
require([
	'common',
	'vue',
	'resource',
	'store',
	'layer',
	'swiper'
], function(common, Vue, resource, store, layer, swiper) {
	Vue.use(resource); //Vue注册http请求模板
	common.home_render_nav(false, nav_focus_index); //当前位置
	var global = {};//全局
	var _public = {};
	_public.swiper_video = null;//视频专区图片swiper实例
	_public.swiper_video_status = false;
	_public.rank_load_state = false;
	// 图片懒加载
	var img_lazy_load_status = false;
	var img_lazy_load = function(scrollTop) {
		if (img_lazy_load_status) {
			return;
		};
		img_lazy_load_status = true;
		var clientHeight = document.documentElement.clientHeight;
		//var scrollHeight = document.body.scrollHeight;
		$("img[data-path]").each(function(index, el) {
			var _top = $(this).offset().top;
			if ((scrollTop + clientHeight) > _top) {
				$(this).attr("src", $(this).attr("data-path"));
				$(this).removeAttr('data-path');
			};
		});
		img_lazy_load_status = false;
		if(scrollTop>1000){
			if(_public.rank_load_state){return;};
			_public.rank_load_state = true;
			rank.ranking_all_list();
		};
	};
	window.addEventListener('scroll', function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		img_lazy_load(scrollTop);
	});
	/**
	 * banner
	 */
	(function() {
		var swiper = new Swiper('.banner_wrapper .swiper-container', { //swiper
			pagination: '.banner_wrapper .swiper-pagination',
			paginationClickable: true,
			speed: 1500,
			loop: true,
			observer: true,
			observeParents: true,
			autoplayDisableOnInteraction: false,
			autoplay: 7000,
			prevButton: '.banner_wrapper .swiper-button-next',
			nextButton: '.banner_wrapper .swiper-button-prev',
		});
		var swiper1 = new Swiper('.wall_hot_wrapper .swiper-container', { //swiper
			pagination: '.wall_hot_wrapper .swiper-pagination',
			slidesPerView: 2,
			spaceBetween: 30,
			slidesPerGroup: 2,
			speed: 1500,
			loop: false,

			loopFillGroupWithBlank: true,
			prevButton: '.wall_hot_wrapper .swiper-button-next',
			nextButton: '.wall_hot_wrapper .swiper-button-prev',
		});
		var swiper2 = new Swiper('.gift_content .swiper-container', { //swiper
			pagination: '.gift_content .swiper-pagination',
			paginationClickable: true,
			speed: 1500,
			loop: true,
			observer: true,
			observeParents: true,
			autoplayDisableOnInteraction: false,
			autoplay: 4000,
		});
		//视频专区swiper插件实例
		if($(".swiper-container-video").length>0){
			_public.swiper_video = new Swiper('.swiper-container-video', {
				slidesPerView: 'auto',
				slidesPerGroup: 5,
				speed: 1500,
				spaceBetween: 0,
				prevButton: '.swiper-button-next-video',
				nextButton: '.swiper-button-prev-video',
			});
		};
	}());
	// 今日头条之星（统计的是昨日收到礼物最高的人）
	new Vue({
		el:".star_wrapper",
		data:{
			starImgUrl:"",//昨日头条
			starNickname:"",//昵称
			starShow: false,
			pw_uid:'', //陪玩uid
			pw_status:'', //陪玩状态值 0否，1陪玩，2被禁陪玩
		},
		mounted: function() {
			this.$nextTick(function() {
				 this.get_gift_list();	
			});
		},
		methods:{
			//获取礼物头条
            get_gift_list: function() {
                var _this = this;
                this.$http.post("/index/index/getGiftRank").then(function(res) {
                    res = res.data;
                    if(res.code === 1){
                        var json = res.data;
                        global.gift_large.get_list(json.large_amount);

                        if(json.yesterday[0].value!=0){
                        	_this.starShow = true;
                        	_this.starImgUrl = json.yesterday[0].avatar;
                        	_this.pw_uid = json.yesterday[0].pw_uid;
                        	_this.pw_status = json.yesterday[0].pw_status;
                        	_this.starNickname = json.yesterday[0].nickname;
                        }else {
                        	_this.starImgUrl = "";
                        };
                        

                    };
                });
            },
            //昨日头条跳转陪玩详情页
            detailUrl:function(){
            	var _this = this;
            	if(_this.pw_status == 1){
					var url = "/item/"+_this.pw_uid+".html";
				 	window.open(url);
				}else{
					return;
				};
            },
		}
	});
			
	// 热门推荐
	new Vue({
		el:".hot_box",
		data:{
			changeStatus: true,//换一批状态，防止重复点击
			hotList: [],//热门推荐列表
			curPage:0,//当前页数
			hot_status:false,//热门推荐是否被第一次点击
			moreShow:false,//更多按钮显示
			loadingShow:true,//loading效果
		},
		mounted: function(){
			this.$nextTick(function(){
				//this.getHotList(this.curPage);
				setTimeout(function(){
					img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
				},100);
			});
		},
		methods: {
			// 陪玩详情链接
			detailUrl: function(uid) {
				 
				var url = "/item/"+uid+".html";
				 window.open(url);
			},
			// 热门推荐陪玩详情链接
			hotDetailUrl: function(item) {
				var url = "/item/"+item.uid+".html?classid="+item.class_id;
				 window.open(url);
			},
			// 判断边框存在 frame_red,frame_purple,frame_yellow
			// 判断角标是否存在 recommend_on
			existenceClass: function(item,className){
				
				var classArry = item.tags;

				if(classArry.length>0){
					 for(var i = 0; i < classArry.length; i++){
				        if(className === classArry[i]){
				            return true;
				        }
				    }
				}else {
					return 0;
				};
			},
			// 换一批
			changePage: function() {
				if(!this.hot_status){
					this.hot_status = true;
				};
				if(this.changeStatus){
					if(this.curPage > 20){
						this.curPage = 0;
						this.getHotList(this.curPage);
					}else {
						this.curPage = this.curPage + 1;
						this.getHotList(this.curPage);
					};
					this.loadingShow = true;//loading
				}
			},
			// 热门推荐列表
			getHotList: function(page) {

				var _this = this;
				_this.changeStatus = false;//点击状态
				_this.moreShow = false;//more按钮
				
				_this.hotList = [];
				//this.$http.post("/index/index/hotpw",{"page":page}).then(function(res) {
                this.$http.post("person/addPage",{"page":page}).then(function(res) {
					res = res.data;
					if(res.code ==1){
						var json = res.data;
						if(json.length == 0){
							_this.curPage = 0;

							_this.getHotList(_this.curPage);
						}else {
							 _this.loadingShow = false;
							_this.hotList = json;
							_this.changeStatus = true;
							_this.moreShow = true;
						};
						setTimeout(function() {
							img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
						}, 500);
					};
				});
			}
		},
	});
	// 新人推荐
	new Vue({
		el: ".new_person_wrapper",
		data: {
			newList: [], //新人推荐列表
		},
		mounted: function() {
			this.$nextTick(function() {
				this.get_list();
			});
		},
		methods: {
			//获取新人推荐
			get_list: function() {
				var _this = this;
				/**
				 * 新人推荐区域
				 */
				setTimeout(function() {
					var swiper = new Swiper('.swiper-container2', {
						slidesPerView: 'auto',
						slidesPerGroup: 8,
						speed: 1500,
						spaceBetween: 0,
						prevButton: '.swiper-button-next2',
						nextButton: '.swiper-button-prev2',
					});
					setTimeout(function(){
						img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
					},100);
				}, 200);
				return;
				this.$http.post("/index/index/newer", {
					limit: 20
				}).then(function(res) {
					if (res.body.code === 1) {
						_this.newList = res.body.data;
						console.log(_this.newList);
						/**
						 * 新人推荐区域
						 */
						setTimeout(function() {
							var swiper = new Swiper('.swiper-container2', {
								slidesPerView: 'auto',
								slidesPerGroup: 8,
								speed: 1500,
								spaceBetween: 0,
								prevButton: '.swiper-button-next2',
								nextButton: '.swiper-button-prev2',
							});
							setTimeout(function(){
								img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
							},100);
						}, 200);
					};
				});
			}
		},
	});

	/**
	 * 排行榜
	 * _public.ranking 排行榜总数据 
	 * 里面存放6个对象
	 * charm 魅力总榜
	 * pop 人气总榜
	 * contribute 富豪榜
	 * 七日榜 以上字段加seven_
	 */
	var rank = new Vue({
		el: ".rankings_wrapper",
		data: {
			tabShow1: 1, //魅力榜 1|周榜 2|总榜
			tabShow2: 1, //人气榜 1|周榜 2|总榜
			tabShow3: 1, //富豪榜 1|周榜 2|总榜
			// 总榜
			charm: [], //魅力
			pop: [], //人气
			contribute: [], //富豪榜
			// 总榜前三
			top_charm: [], //魅力
			top_pop: [], //人气
			top_contribute: [], //富豪榜
			// 周榜
			seven_charm: [], //魅力
			seven_pop: [], //人气
			seven_contribute: [], //富豪榜
			// 周榜前三
			top_seven_charm: [], //魅力
			top_seven_pop: [], //人气
			top_seven_contribute: [], //富豪榜

			// 榜单头像
			leftTopBgImg1:"",
			leftTopBgImg2:"",

			middleTopBgImg1:"",
			middleTopBgImg2:"",

			rightTopBgImg1:"",
			rightTopBgImg2:"",


		},
		mounted: function() {
			this.$nextTick(function() {
				//this.get_charm(); //魅力总榜
				//this.get_contribute(); //contribute 富豪榜
				//this.get_pop(); //pop 人气总榜
				//合并后的榜单接口
				//this.ranking_all_list();
				//rank.ranking_all_list();
			});
		},
		methods: {
			// 排行榜陪玩详情链接
			detailUrl: function(uid,pw_status) {
				if(pw_status == 1){
					var url = "/item/"+uid+".html";
				 	window.open(url);
				}else{
					return;
				};
			},
			// 周榜总榜切换
			// 魅力
			tabFun1: function(ind) {
				this.tabShow1 = ind;
			},
			// 人气
			tabFun2: function(ind) {
				this.tabShow2 = ind;
			},
			// 富豪
			tabFun3: function(ind) {
				this.tabShow3 = ind;
			},
			// 没有昵称转匿名
			returnstr: function(itm) {
				var str = "";
				if (itm.nickname) {
					str = itm.nickname;
				} else {
					var str1 = itm.uid + "";
					str = '匿名用户' + (str1.substring(0, (str1.length - 2))) + "**";
				};
				return str;
			},
			//等级图片
			levelImgFun: function(level) {
				if(level!=undefined){
                    return common.levelImgFun(level);
                };
			},
			//爵位图片
			jewelImgFun: function(noble) {
				if(noble!=undefined){
                    if(!common.jewelImgFun(noble)){
                        return 0;
                    };
                    return common.jewelImgFun(noble);
                };
			},
			// 排名框
			frameFun: function(ind) {
				var imgUrl =  public_domain +"/static/home/img/index_v2/ico_num_";
				var imgind = ind + 1;
				return imgUrl + imgind + ".png";
			},
			//由于页面进行了优化排行榜的三个接口合并成一个接口
			ranking_all_list:function(){
				var _this = this;
				this.$http.post("/index/index/index_bang").then(function(res){
					res = res.body;
					if(res.code === 1){
						//魅力榜
						// 周榜
						$.each(res.data.charm.seven, function(index, item) {
							if (index > 2) {
								_this.seven_charm.push(item);
								
							} else {
								_this.top_seven_charm.push(item);
							};
						});
						if (_this.top_seven_charm[0]) {
                            _this.leftTopBgImg1=_this.top_seven_charm[0].avatar;
						} else {
                            _this.leftTopBgImg1= '';
						}

						// console.log(_this.seven_charm);
						// 总榜
						$.each(res.data.charm.all, function(index, item) {

							if (index > 2) {
								_this.charm.push(item);
							} else {
								_this.top_charm.push(item);
							};
						});
						if (_this.top_charm[0]) {
                            _this.leftTopBgImg2=_this.top_charm[0].avatar;
						} else {
                            _this.leftTopBgImg2='';
						}


						//人气榜
						// 周榜
						$.each(res.data.pop.seven, function(index, item) {
							if (index > 2) {
								_this.seven_pop.push(item);
								
							} else {
								_this.top_seven_pop.push(item);
							};
						});
						if (_this.top_seven_pop[0]) {
                            _this.middleTopBgImg1=_this.top_seven_pop[0].avatar;
						} else {
                            _this.middleTopBgImg1= '';
						}

						// 总榜
						$.each(res.data.pop.all, function(index, item) {
							if (index > 2) {
								_this.pop.push(item);
							} else {
								_this.top_pop.push(item);
							};
						});
						if (_this.top_pop[0]) {
                            _this.middleTopBgImg2=_this.top_pop[0].avatar;
						} else {
                            _this.middleTopBgImg2 = '';
						}


						//富豪榜
						// 周榜
						$.each(res.data.contribute.seven, function(index, item) {
							if (index > 2) {
								_this.seven_contribute.push(item);
								
							} else {
								_this.top_seven_contribute.push(item);
							};
						});
						if (_this.top_seven_contribute[0]) {
                            _this.rightTopBgImg1=_this.top_seven_contribute[0].avatar;
						} else {
                            _this.rightTopBgImg1='';
						}

						// 总榜
						$.each(res.data.contribute.all, function(index, item) {
							if (index > 2) {
								_this.contribute.push(item);
								
							} else {
								_this.top_contribute.push(item);
							};
						});
						if (_this.top_contribute[0]) {
                            _this.rightTopBgImg2=_this.top_contribute[0].avatar;
						} else {
                            _this.rightTopBgImg2='';
						}

						setTimeout(function() {
							img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
						}, 500);
					};
				});
			},
			//魅力榜
			get_charm: function() {
				var _this = this;
				this.$http.post("/index/index/charm").then(function(res) {
					res = res.data;
					var json = res.data;
					if (res.code === 1) {
						// 周榜
						$.each(json.seven, function(index, item) {
							if (index > 2) {
								_this.seven_charm.push(item);
								
							} else {
								_this.top_seven_charm.push(item);
							};
						});
						_this.leftTopBgImg1=_this.top_seven_charm[0].avatar;
						// console.log(_this.seven_charm);
						// 总榜
						$.each(json.all, function(index, item) {

							if (index > 2) {
								_this.charm.push(item);
							} else {
								_this.top_charm.push(item);
							};
						});
						_this.leftTopBgImg2=_this.top_charm[0].avatar;
					};
					setTimeout(function() {
						img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
					}, 500);
				}, function() {
					//layer.msg("排行榜数据更新出错，请稍后再试");
				});
				setTimeout(function() {
					img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
				}, 100);
			},
			//pop 人气总榜
			get_pop: function() {
				var _this = this;
				this.$http.post("/index/index/pop").then(function(res) {
					res = res.data;
					var json = res.data;
					if (res.code === 1) {
						// 周榜
						$.each(json.seven, function(index, item) {
							if (index > 2) {
								_this.seven_pop.push(item);
								
							} else {
								_this.top_seven_pop.push(item);
							};
						});
						_this.middleTopBgImg1=_this.top_seven_pop[0].avatar;
						// 总榜
						$.each(json.all, function(index, item) {
							if (index > 2) {
								_this.pop.push(item);
							} else {
								_this.top_pop.push(item);
							};
						});
						_this.middleTopBgImg2=_this.top_pop[0].avatar;
					};
					setTimeout(function() {
						img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
					}, 500);
				}, function() {
					//layer.msg("排行榜数据更新出错，请稍后再试");
				});
				setTimeout(function() {
					img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
				}, 100);
			},
			//contribute 富豪榜
			get_contribute: function() {
				var _this = this;
				this.$http.post("/index/index/contribute").then(function(res) {
					res = res.data;
					var json = res.data;
					if (res.code === 1) {
						// 周榜
						$.each(json.seven, function(index, item) {
							if (index > 2) {
								_this.seven_contribute.push(item);
								
							} else {
								_this.top_seven_contribute.push(item);
							};
						});
						_this.rightTopBgImg1=_this.top_seven_contribute[0].avatar;
						// 总榜
						$.each(json.all, function(index, item) {
							if (index > 2) {
								_this.contribute.push(item);
								
							} else {
								_this.top_contribute.push(item);
							};
						});
						_this.rightTopBgImg2=_this.top_contribute[0].avatar;
					};
					setTimeout(function() {
						img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
					}, 500);
				}, function() {
					//layer.msg("排行榜数据更新出错，请稍后再试");
				});
				setTimeout(function() {
					img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
				}, 100);
			},
		},
	});

	var vm_renwu,lingHB;//每日任务弹窗实例,领取昨天任务红包实例
    /**
     * 每日任务的显示
     */
    vm_renwu = new Vue({
        el:".daily_tasks",
        data:{
            isshow:false,
            ordernum:0,
            num:0,
            classC:0
        },
        mounted: function () {
            var _this = this;

            
            this.$nextTick(function(){
                if(pw_status === 1){
                	//2018/7/23这个活动取消了
                    //this.getOrderNum();
                };
            });
        },
        methods:{
            //获取当前用户当天接单数
            //接口修改了和领取昨天订单红包成一个接口了
            getOrderNum:function(){
                Vue.http.post("/user/activity/order_count").then(function(res){
                    if(res.body.code == 1)
                    {
                        var timer1 = window.localStorage.getItem("renwu_time");
                        //领取昨天红包奖励
                        if(res.body.data.reward_code == 1){
                            //领取奖励
                            lingHB.isshow = true;
                        };
                        if(res.body.data.order_count < 1){return;};
                        if(timer1)
                        {
                            timer1 = parseInt(timer1);
                            var nowTime = (new Date()).getTime();
                            //上次关闭时间距现在大于1.5个小时再次出现
                            if(nowTime - timer1> (30*60*1000))
                            {
                                //成功读取到接单数
                                vm_renwu.isshow = true;
                                vm_renwu.ordernum = parseInt(res.body.data.order_count);
                                vm_renwu.loadshow();
                            };
                        }else
                        {
                            vm_renwu.isshow = true;
                            vm_renwu.ordernum = parseInt(res.body.data.order_count);
                            vm_renwu.loadshow();
                        };
                    }else
                    {

                    };
                });
            },
            close:function(){
                var _this = this;
                //关闭任务弹窗
                this.isshow = false;
                window.localStorage.setItem("renwu_time",(new Date()).getTime());
                setTimeout(function(){
                    this.num = 0;
                    this.classC = 0;
                },1000);
            },
            //判断每日任务弹窗是不是应该显示
            loadshow:function(){
                var _this = this;
                setTimeout(function(){
                    if(_this.ordernum>9){
                        _this.num = 3;
                    }else if(_this.ordernum>4)
                    {
                        _this.num = 2;
                    }else if(_this.ordernum>2)
                    {
                        _this.num = 1;
                    }else{
                        _this.num = 0;
                    };
                    _this.classC = _this.ordernum;
                },1000);
            }
        }
    });

    /**
     * 查看是否有红包可以领取
     */
    lingHB = new Vue({
        el:".receive_red",
        data:{
            isshow:false,
            red_id:0
        },
        mounted: function () {
            var _this = this;
            this.$nextTick(function(){
                if(loginstatus === 1){
                    //_this.lingqu();	
                };
            });
        },
        methods:{
            receive:function(){
                this.isshow = false;
            },
            lingqu:function(){
                var _this = this;

                Vue.http.post("/user/activity/pick_rewards").then(function(res){
                    if(res.body.status)
                    {
                        _this.isshow = true;
                    };
                });
            }
        }
    });
    // 大额礼物
    global.gift_large = new Vue({
        el:".gift_pop_wrapper",
        data: {
        	//礼物三段 1| 100-500|紫（普通数字 斜体） 501-1000|黄 》1001|火箭
        	giftShow:false,
            list: [],//礼物
            right:0,//外层弹窗right距离
            rightTime:"",
            timeout:false,//定时器开启关闭
        },
        watch:{
        	// 监听礼物外层向左滚动距离
        	right:function(value,oldValue){
        		value = value.split("p")[0];
        		// 距离大于-700 停止定时器
        		if(value >= 0){
        			clearInterval(this.rightTime);
        		}
        	}
        },
        mounted: function() {
            var _this = this;
            _this.$nextTick(function(){

                 
            });
        },
        methods:{
        	// 大额礼物列表
            get_list:function(data) {
            	var _this = this;
            	var data_arr = data;
            	// 本地存储不存在，直接存储数据
            	if(store.get("data_arr")==undefined){
            		store.set("data_arr",data_arr);
            		_this.list = data;
            	}else {
            		// 本地存储存在，判断，新数据中的数据是否在本地存储中存在，不存在，加入数据list中
            		$.each(data_arr,function(index,item){
            			var res = _this.contentCZ(item,store.get("data_arr"));
            			 if(!(res.length>1||res[0]==="1")){
            			 	_this.list.push(res[0]);
            			 };
            		});
            		// 本地存储
            		store.set("data_arr",data_arr);
            	};
            	_this.$nextTick(function(){
            		var scrollLeft;
            		var data_length = _this.list.length;//礼物个数
            		var window_width = $(window).width(); //屏幕宽度
            		var wid = 200*data_length+window_width;//两个礼物之间距离*礼物个数+屏幕宽度
            		

            		if($(".gift_pop_item").length){//每个礼物元素宽度计算
            			$(".gift_pop_item").each(function(){
	            			wid+=$(this).width();//宽度累加
	            		});
	            		$(".gift_pop_wrapper").css({//礼物整个外框宽度
	            			"width":wid,
	            			"right":-wid
	            		});
	            		_this.giftShow = true;//显示礼物
	            		_this.rightTime = setInterval(_this.scroll_left, 3);//启动定时器礼物外框向左滚动
	            		$(".gift_pop_item").mouseover(function(event) {
	            			clearInterval(_this.rightTime);
	            		}).mouseout(function(event) {
	            			clearInterval(_this.rightTime);
	            			_this.rightTime = setInterval(_this.scroll_left,3);//启动定时器礼物外框向左滚动
	            		});
            		};
            		
	            });
            },
            // 向左滚动
            scroll_left:function(){
            	
            	$(".gift_pop_wrapper").css({
            			"right":"+=1"
            		});
            	this.right = $(".gift_pop_wrapper").css("right");

            },
            // 三种类型礼物 small,big,large
            returen_class:function(item) {
            	if(item.price/10>=100&&item.price/10<500){
            		item.logo = false;
            		return "small";
    			}else if(item.price/10>=500&&item.price/10<1000){
    				item.logo = true;
    				item.numArr = this.numToArr(item.num);
            		return "big";
    			}else if(item.price/10>=1000){
    				item.logo = true;
    				item.bg = 4;
    				item.numArr = this.numToArr(item.num);
            		return "large";
    			}else {
    				item.logo = false;
            		return "small";
    			}
            },
            // 数字转数组
            numToArr:function(num){  
            	var arr = [];
			    num = Number(num); 
			    var a = num;
			    var b = 0;
			    var num_length = num.toString().length;
			    
			    for(var i=0;i<num_length;i++)  
			    {  
			        b=a%10;  
			        a=(a-b)/10;  
			        arr[i]=b;  
			    }  
			    return arr.reverse();
			},
			// 数字转图片
			return_num_ico:function(num){
				var img_url = public_domain +"/static/home/img/index_v2/gift/";
				var return_url = img_url+num+".png";
				return img_url+num+".png";
			},
			// 判断是否存在
			contentCZ:function(aa, item) {//aa新json，item原json
				var _this = this;
			    var arry = [];
			    
			    for (var m = 0; m < item.length; m++) { //原数组循环遍历
			        if (item[m].orderid == aa.orderid) { //判断原数组中元素在返回结果集数组中是否存在
			            arry.push("1");
			        } else {
			            arry.push(aa);
			        }
			    }
			    var al = arry.length;
			    var res = this.Deduplication(arry, al);
			    return res;
			},
			// 去重
			Deduplication:function(Array, l) {
			    var newArray = [];
			    for (var i = 0; i < l; i++) {
			        var items = Array[i];
			        if ($.inArray(items, newArray) == -1) {
			            newArray.push(items)
			        }
			    }
			    return newArray;
			}
        },
    });

	//注册开撩
	var register = new Vue({
		el:".register",
        data:{
        	isshow:false,
        },
        mounted: function () {
            var _this = this;            
            this.$nextTick(function(){
            	_this.register();
            });
        },
        methods:{
        	register:function(){
        		var islogin = registerId.getAttribute('islogin');
        		if (islogin == "0") {
                    this.isshow = true;
                };
        	},
        	register_enter:function(){
                tel_login_v1.isshow = true;
                tel_login_v1.loginTabShow = 2;
                tel_login_v1.refreshImgCode();
        	},
        },
	});


	// //换装秀横条，广告效果
	// _public.dressing_show = {};
	// _public.dressing_show.timenum = 5;//5秒钟消失
	// _public.dressing_show.time1 = 1000;//1s钟后显示广告
	// _public.dressing_show.time2 = null;//定时器
	// _public.dressing_show.bigdom = document.querySelector(".dressing_show_stripe");
	// _public.dressing_show.bigdom.querySelector(".close_box img").onclick = function(){
	// 	$(_public.dressing_show.bigdom).animate({
	// 			bottom: -200},
	// 			1000);
	// };
	// _public.dressing_show.domspan = _public.dressing_show.bigdom.querySelector(".close_box span");
	// _public.dressing_show.domspan.innerHTML = "剩余"+_public.dressing_show.timenum+"秒";
	// $(_public.dressing_show.bigdom).animate({
	// 	bottom: 0},
	// 	500);
	// //setTimeout(function(){
	// 	_public.dressing_show.bigdom.classList.add("move");
	// 	_public.dressing_show.time2 = setInterval(function(){
	// 		_public.dressing_show.timenum -- ;
	// 		if(_public.dressing_show.timenum<0){
	// 			clearInterval(_public.dressing_show.time2);
	// 			//_public.dressing_show.bigdom.classList.remove("move");
	// 			$(_public.dressing_show.bigdom).animate({
	// 			bottom: -200},
	// 			1000);
	// 			return;
	// 		};
	// 		_public.dressing_show.domspan.innerHTML = "剩余"+_public.dressing_show.timenum+"秒";
	// 	},1000);
	// //},_public.dressing_show.time1);


});