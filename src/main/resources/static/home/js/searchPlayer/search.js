/**
 * search
 * wanglong
 */
"use strict";
require([
        'common',
        'vue',
        'resource',
    ],function(common,Vue,resource){
        Vue.use(resource);//Vue注册http请求模板
        common.home_render_nav(false,nav_focus_index);//当前位置
        // 热门陪玩
        var vm = new Vue({
            el:'#search',
            data:{
                playermess:'',//搜索结果数据
                loading:true,//加载中
                bgclass:false,//没有数据
                keyword:''//搜索的关键字
            },
            mounted: function () {
                var _this = this;
                this.$nextTick(function(){
                    _this.keyword = localStorage.getItem('searchKey');
                    _this.sort_ajax();
                });
            },
            methods:{
                //ajax请求
                sort_ajax:function(scroll){
                    var _this = this;
                    var urls = '/index/peiwan/searchpw';
                    var data ={
                        key:this.keyword,
                    }
                    // console.log(data);
                    this.$http.post(urls,data).then(function(res){
                        var start = common.post_Verification(res);
                        // console.log(res.body.data);
                        if(start){
                            if(res.body.data.data==''){
                                _this.bgclass = true;
                                _this.loading = false;
                            }else{
                                _this.loading = false;
                                //增加展示出来的折后信息在数据中新加一个字段this_discount（10为没有折扣不显示）
                                common.discounted_data_fn(res.body.data.data);
                                _this.playermess = res.body.data.data;
                            }
                        }else{
                            _this.bgclass = true;
                            _this.loading = false;
                        }
                    },function(){
                        _this.bgclass = true;
                        _this.loading = false;
                    });
                }
            }
        });
    }
);