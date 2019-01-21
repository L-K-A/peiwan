/**
 * 报名参加通宵专区页面
 */

"use strict";
require([
	'vue',
	'common',
	'resource',
	'layer'
	],function(Vue,common,resource,layer){
		Vue.use(resource);//Vue注册http请求模板
		common.home_render_nav(false,nav_focus_index);//当前位置
		var time1,time2,time3,this_time;//time1今天的报名开始时间time2今天报名的截至时间单位都是this_time现在的时间单位都是s
		var getTime = function(){
			var date1 = new Date();
			date1.setHours(0);
			date1.setMinutes(0);
			date1.setSeconds(0);
			date1.setMilliseconds(0);
			var num1 = date1.getTime();//当天的凌晨时间
                  //修改时间
			var num4 = num1+((16*60+30)*60*1000);
			var date4 = new Date(num4);//显示距离开始报名的倒计时
			var num2 = num1+((18*60+30)*60*1000);
			var date2 = new Date(num2);//当天开始报名时间
			var num3 = num1+((22*60+30)*60*1000);
			var date3 = new Date(num3);//当天的截至报名时间
			time1 = date4.getTime()/1000;
			time2 = date2.getTime()/1000;
			time3 = date3.getTime()/1000;
		};getTime();
		var all_list = [];
		new Vue({
			el:"section",
			data:{
				status:1,//1还早2倒计时报名时间3报名中4报名截止
				this_time:0,
				time1:time1,//开始显示距离报名倒计时的时间
				time2:time2,//开始报名的时间
				time3:time3,//报名截止时间
				s_time1:0,//距离报名的时间多少秒
				s_time2:0,//报名的剩余时间多少秒
				user_status:parseInt(document.querySelector(".txtBox").getAttribute("user_status")),//用户报名状态1未报名2已报名
				list:[],//列表数据
				last_page:0,//最后一页
				current_page:1,//当前页
				total:0,//总条数
				all_num:0
			},
			created:function(){
				this.get_time();
				this.get_list();

			},
			//生命周期实例化完成
            mounted:function(){
                var _this = this;
                this.$nextTick(function(){
                    
                });
            },
            //过滤器
            filters:{
            	//返回时分秒时间格式
                timer2:function(value){
                    return common.return_formattime(value);
                },
                //返回金钱单位10.00元
                money:function(num){
                    return common.money_conversion(num);
                }
            },
            methods:{
            	//取消报名
            	quxiao:function(){

            	},
            	//报名
            	bao_ming:function(){
            		this.$http.post("/index/activity/join_txzq").then(function(res){
            			if(res.body.code===1){
            				layer.msg(res.body.msg,{time:1000},function(){
            					location = location;
            				});
            			}else{
            				layer.msg(res.body.msg);
            			};
            		});
            	},
            	//报名
            	sign_up:function(){
            		if(this.status ===1 || this.status ===2 || this.status ===4){
            			return;
            		};
            		if(this.user_status===2){
            			//取消报名
            			this.quxiao();
            		}else{
            			//前往报名
            			this.bao_ming();
            		};
            	},
            	//加载下一页
            	add_list:function(){
            		var page = this.current_page;
            		this.get_list(++page);
            	},
            	//获取数据列表
            	get_list:function(page){
            		var _this = this;
            		this.$http.post("/index/activity/show_txzq",{page:page,page_size:16}).then(function(res){
            			if(res.body.code === 1){
            				_this.last_page = res.body.data.last_page;
							_this.current_page = res.body.data.current_page;
							_this.total = res.body.data.total;
            				var arr = [
            					{
            						avatar:"",
            						nickname:"西门1",
            						price:"10.22",
            						sex:1,
            						pw_uid:11026
            					},
            					{
            						avatar:"",
            						nickname:"西门2",
            						price:"10.22",
            						sex:1,
            						pw_uid:11026
            					},
            					{
            						avatar:"",
            						nickname:"西门3",
            						price:"10.22",
            						sex:1,
            						pw_uid:11026
            					},
            					{
            						avatar:"",
            						nickname:"西门4",
            						price:"10.22",
            						sex:2,
            						pw_uid:11026
            					},
            					{
            						avatar:"",
            						nickname:"西门5",
            						price:"10.22",
            						sex:2,
            						pw_uid:11026
            					},
            					{
            						avatar:"",
            						nickname:"西门6",
            						price:"10.22",
            						sex:1,
            						pw_uid:11026
            					},
            					{
            						avatar:"",
            						nickname:"西门7",
            						price:"10.22",
            						sex:1,
            						pw_uid:11026
            					},
            					{
            						avatar:"",
            						nickname:"西门8",
            						price:"10.22",
            						sex:2,
            						pw_uid:11026
            					},
            					{
            						avatar:"",
            						nickname:"西门9",
            						price:"10.22",
            						sex:1,
            						pw_uid:11026
            					}
            				];
            				all_list = all_list.concat(res.body.data.data);
            				_this.all_num = res.body.data.total;
            				var arr1 = [];
            				(function(){
            					var num1 = all_list.length;
            					var num2 = parseInt(num1/4);
            					if(num1%4){
            						num2++;
            					};
            					var k=0;
            					for(var i=0;i<num2;i++){
            						var arr2 = [];
            						for(var j=0;j<4;j++){
            							if(all_list[k]){
            								arr2.push(all_list[k]);
            							};
            							k++;
            						};
            						arr1.push(arr2);
            					};
            				}());
            				_this.list = arr1;//res.body.data;
            			};
            		});
            	},
            	//获取服务器的时间戳
            	get_time:function(){
            		var _this = this;
            		this.$http.post("/index/activity/timestamp").then(function(res){
            			if(res.body.code === 1){
            				_this.this_time = res.body.data;
                                    console.log(_this.this_time);
                                    console.log(time1);
                                    console.log(time2);
                                    console.log(time3);
            				if(_this.this_time<time1){
            					//还很早
	            				_this.status = 1;
	            			}else if(_this.this_time >= time1 && _this.this_time < time2){
	            				//马上到报名时间
	            				_this.status = 2;
	            			}else if(_this.this_time >= time2 && _this.this_time < time3){
	            				//报名进行中
	            				_this.status = 3;
	            			}else{
	            				//报名已经截止
	            				_this.status = 4;
	            			};
            				_this.set_time_move();
            			};
            		});
            	},
            	//计时器
            	set_time_move:function(){
            		var _this = this;
            		setInterval(function(){
            			_this.this_time++;
            			if(_this.this_time<time1){
            				//还很早
            				_this.status = 1;
            			}else if(_this.this_time >= time1 && _this.this_time < time2){
            				//马上到报名时间
            				_this.status = 2;
            			}else if(_this.this_time >= time2 && _this.this_time < time3){
            				//报名进行中
            				_this.status = 3;
            			}else{
            				//报名已经截止
            				_this.status = 4;
            			};
            		},1000);
            	}
            }
		});
	}
);