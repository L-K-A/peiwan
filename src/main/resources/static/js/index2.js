
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
    _public.swiper_video_status = false;
    _public.rank_load_state = false;
    // 图片懒加载
    var img_lazy_load_status = false;
    var img_lazy_load = function(scrollTop) {
        if(scrollTop>1000){
            rank.ranking_all_list();
        }
    };

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
        el: "#rankings_wrapper",
        data: {
            tabShow1: 1, //魅力榜 1|周榜 2|总榜

            // 总榜
            //charm: [], //魅力

            // 总榜前三
            //top_charm: [], //魅力

            // 周榜
            seven_charm: [], //魅力

            // 周榜前三
            top_seven_charm: [], //魅力


            // 榜单头像
            leftTopBgImg1:"",
            leftTopBgImg2:"",

            middleTopBgImg1:"",
            middleTopBgImg2:"",

            rightTopBgImg1:"",
            rightTopBgImg2:""


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
                    var url = "/item/"+pid+".html";
                    window.open(url);
                }else{
                    return;
                }
            },
            // 周榜总榜切换
            // 魅力
            tabFun1: function(ind) {
                this.tabShow1 = ind;
            },

            //等级图片
            levelImgFun: function(level) {
                if(level!=undefined){
                    return common.levelImgFun(level);
                }
            },
            //爵位图片
            jewelImgFun: function(noble) {
                if(noble!=undefined){
                    if(!common.jewelImgFun(noble)){
                        return 0;
                    }
                    return common.jewelImgFun(noble);
                }
            },
            // 排名框
            frameFun: function(ind) {
                var imgUrl =  public_domain +"/images/ico_num_";
                var imgind = ind + 1;
                return imgUrl + imgind + ".png";
            },

            //由于页面进行了优化排行榜的三个接口合并成一个接口
            ranking_all_list:function(){
                var _this = this;
                this.$http.post("/index/index/index_bang").then(function(res){
                    res = res.body;    //周榜和总榜的榜单前三
                    if(res.code === 1){
                        //魅力榜
                        // 周榜
                        $.each(res.data.charm.seven, function(index, item) {
                            if (index > 2) {
                                _this.seven_charm.push(item);
                            } else {
                                _this.top_seven_charm.push(item);
                            }
                        });
                        if (_this.top_seven_charm[0]) {
                            _this.leftTopBgImg1=_this.top_seven_charm[0].avatar;
                        } else {
                            _this.leftTopBgImg1= '';
                        }

                        // 总榜
                        $.each(res.data.charm.all, function(index, item) {

                            if (index > 2) {
                                _this.charm.push(item);
                            } else {
                                _this.top_charm.push(item);
                            }
                        });
                        if (_this.top_charm[0]) {
                            _this.leftTopBgImg2=_this.top_charm[0].avatar;
                        } else {
                            _this.leftTopBgImg2='';
                        }
                        setTimeout(function() {
                            img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
                        }, 500);
                    }
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
                            }
                        });
                        _this.leftTopBgImg1=_this.top_seven_charm[0].avatar;

                        // 总榜
                        $.each(json.all, function(index, item) {
                            if (index > 2) {
                                _this.charm.push(item);
                            } else {
                                _this.top_charm.push(item);
                            }
                        });
                        _this.leftTopBgImg2=_this.top_charm[0].avatar;
                    }
                    setTimeout(function() {
                        img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
                    }, 500);
                }, function() {
                    //layer.msg("排行榜数据更新出错，请稍后再试");
                });
                setTimeout(function() {
                    img_lazy_load(document.documentElement.scrollTop || document.body.scrollTop); //懒加载
                }, 100);
            }

        }
    });

    //rank.ranking_all_list();

});
