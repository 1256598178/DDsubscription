<template>
    <div class="act">
        <div class="headerBox_G">
            <text class="headerBox_G_pageTip">商家详情</text>
            <div class="back_box" @click="toBack_G">
                <image :src="$store.state.get_img_path('toback.png')" style="width:31px;height:44px;"></image>
            </div>
        </div>
        <list class="act-box">
            <cell>
                <div class="bannner">
                    <slider class="banner-wrapper" auto-play="true" interval="4000">
                        <div class="banner-list" v-for="(banner,index) in fromsdetail.ImageList" :key="index">
                            <image class="" :src="banner.ImageUrl" style="width:750px;height:330px;;"></image>
                        </div>
                        <indicator class="indicator"></indicator>
                    </slider>
                    <!-- 简介信息 -->
                    <div class="infos-show">
                        <div class="infomation" style="width: 600px;">
                            <div class="name-title">
                                <div class="title-content"><text class="name-title-text">{{fromsdetail.ShopName}}</text></div>
                                <div class="title-content-radios"><text class=" name-title-text-bro">¥{{fromsdetail.MinPrice}}起</text></div>
                            </div>
                            <div class="name-info">
                                <div class="name-info-tet"><text class="name-info-whit">销量{{fromsdetail.OrderNum}}</text></div>
                                <div class="name-info-txt"> <text class="name-info-whit">|</text></div>
                                <div class="name-info-tet"><text class="name-info-whit">{{fromsdetail.ViewNum}}人浏览</text></div>
                            </div>
                        </div>
                        <!-- <div class="share infomation" @click="share()">
                            <image class="_banner" :src="t2"></image>
                            <text style="color: #ffffff; font-size: 30px; text-align: center;">分享</text>
                        </div> -->
                    </div>
                </div>
            </cell>
            <cell class="addtop">
                <div class="address">
                    <div class="address-top">
                        <div class="address-top-left" style="align-items: center;">
                            <div class="item1">
                                <div class="r starList">
                                    <!--  <text :class="['iconFont','star',index<=fromsdetail.StarNum-1?'staron':'']" v-for="(item,index) in 5" :key="'key'+index" @click="chooseStar(index)">&#xe8c2;</text> -->
                                    <image :src="[index<=fromsdetail.StarNum-1 ? score : scores]" v-for="(items,index) in 5" :key="'key'+index" class='star'></image>
                                </div>
                            </div>
                            <div><text class="stared">{{fromsdetail.StarNum}}</text></div>
                        </div>
                        <div class="address-top-right" @click="showCity_pop">
                            <text class="address-button">一键预约</text>
                        </div>
                    </div>
                    <div class="address-top address-rim">
                        <div class="act-t2-info">
                            <image class="act-t2-info-show" :src="t1"></image>
                            <text class="act-t2-info-title">{{fromsdetail.Address}}</text>
                        </div>
                        <div style="width: 150px;">
                            <text style="font-size: 24px; color: #484848;">{{fromsdetail.Distance}}km</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <div class="act-top">
                    <div class="act-dd act-top">
                        <text class="mydetail  act-t3"></text>
                        <text class="act-t1 act-t3">商家介绍</text>
                    </div>
                </div>
                <div class="act-image-box">
                    <!-- 						<image class="act-t3-image" :src="t5" ref="img" @load="onImageLoad"></image> -->
                    <text>{{fromsdetail.Content}}</text>
                    <!-- 						<div class="banner-list" v-for="(banner,index) in imageurl" :key="index">
		                    <image class="act-t3-image" :src="banner.url" style="width:710px;height:410px;;"></image>
		                </div> -->
                </div>
                <div class=" addtop" style="margin-bottom: 8px;">
                    <div class="act-dd act-top">
                        <text class="mydetail  act-t3"></text>
                        <text class="act-t1 act-t3">接单经理</text>
                    </div>
                    <div class="act-dd address-top-left " style="padding-top: 0px;">
                        <!-- <div class="act-dd-right"><text class='address-top-left-name address-color'>成交最多</text><image class="add-image"></image></div> -->
                        <div class="act-dd-right" v-for="(item,index) of detailmanager" :key="index" @click="jump(item.path)">
                            <text :class="['address-top-left-name',item.path == manager ? 'address-color' : '']">{{item.title}}</text>
                            <image class="add-image" :src="details_01"></image>
                        </div>
                    </div>
                </div>
                <div class="addressed">
                    <div class="address-top address-yx" v-for="manlist in managerlist">
                        <div class="manager-image">
                            <image class="my-heart-box-image" :src="tit"></image>
                        </div>
                        <div class="address-tor">
                            <div><text class="address-top-left-nas">{{manlist.NickName}}</text></div>
                            <div class="address-top-left" style="margin-top: 25px;">
                                <div class="address-top">
                                    <image :src="details_18" style="width: 20px; height: 23px;"></image>
                                    <text class="ted-fs jg-txt">粉丝</text>
                                    <text class="ted-fs">{{manlist.Fans}}</text>
                                </div>
                                <div class="address-top" style="margin-left: 15px;">
                                    <image :src="details_20" style="width: 20px; height: 23px;"></image>
                                    <text class="ted-fs jg-txt">订单</text>
                                    <text class="ted-fs">{{manlist.OrderNum}}15</text>
                                </div>
                            </div>
                        </div>
                        <div class="address-top-left" style="align-items: center;">
                            <div class="item1">
                                <div class="r starList">
                                    <!-- <text :class="['iconFont','star',index<=manlist.Score?'staron':'']" v-for="(item,index) in 5" :key="'key'+index" @click="chooseStar(index)">&#xe8c2;</text> -->
                                    <image :src="[index<=manlist.Score ? score : scores]" v-for="(items,index) in 5" :key="'key'+index" class='star'></image>
                                </div>
                            </div>
                            <div><text class="stared">{{manlist.Score}}</text></div>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <scroller class="HomeCity_pop_scroller" v-if="HomeCity_pop_scroller_show">
            <div class="homecity"></div>
            <div class="HomeCity_pop">
                <div class="HomeCity_popClose">
                    <text></text>
                    <div class="detail_flex"><text class="detail_flex_bot"></text><text class="detail_flex_title">请选择预约到店时间</text><text class="detail_flex_bot"></text></div>
                    <text class="HomeCity_popCloseText" @click="hideCity_pop">
                        <image style="width: 37px; height: 37px;" :src="cuo"></image>
                    </text>
                </div>
                <div class="HomeCity_popCityList">
                    <scroller class="date_day" scroll-direction="horizontal">
                        <div v-for="(wek,index) in onwek" :key="index" class="date_day_til" @click="onweek(wek.AppointDateValue,index)">
                            <text style="font-size: 24px;" :class="[wek.AppointDateValue == daty ? 'black':'groy']">{{wek.AppointDateValue}}</text>
                        </div>
                    </scroller>
                    <div class="date_day date_t">
                        <div class="date_day date_day_ce ">
                            <div :class="['date_day','date_pb',moning==1?'day_night':'']" @click="monig(1)">
                                <image :src="[moning==1 ? day1 : day2]" style="width: 35px; height: 35px;"></image><text style="font-size: 22px;" :class="[moning==1?'day_nights':'']">00:00-11:00</text>
                            </div>
                        </div>
                        <div class="date_day date_day_ce ">
                            <div :class="['date_day','date_pb',moning==2?'day_night':'']" @click="monig(2)">
                                <image :src="[moning==2 ? night1 : night2]" style="width: 35px; height: 35px;"></image><text style="font-size: 22px;" :class="[moning==2?'day_nights':'']">12:00-23:00</text>
                            </div>
                        </div>
                        <!-- <div class="date_day date_day_ce" ><image style="width: 35px; height: 35px;"></image><text>00:00-11:00</text></div> -->
                    </div>
                    <div class="date_day date_time date_t">
                        <template v-if="moning == 1">
                            <div v-for="tame in times" class="date_time_lt">
                                <text :class="['date_times',hour >= tame.time ? 'date_outime':'' , timeing == tame.time ? 'day_time_rs':'']" @click="hours(tame.time)">{{tame.time}}:00</text>
                            </div>
                        </template>
                        <template v-else>
                            <div v-for="tamen in timenig" class="date_time_lt">
                                <text :class="['date_times',hour >= tamen.time ? 'date_outime':'' , timeing == tamen.time ? 'day_time_rs':'']" @click="hours(tamen.time)">{{tamen.time}}:00</text>
                            </div>
                        </template>
                    </div>
                    <!-- 	                <div class="HomeCity_popCityItem" v-for="(item,index) in cityList" :key="index" @click="chooseCity(item)">
	                    <text :class="['HomeCity_popCityItemText',(item.name==city)?'HomeCity_popCityItemTextActive':'']">{{item.name}}</text>
	                </div> -->
                </div>
                <text class="person-btn" @click="sure">下一步，填写预约信息</text>
            </div>
        </scroller>
        <v-loading v-if="temBool.loading"></v-loading>
    </div>
</template>
<script>
const animation = weex.requireModule('animation');
import header from '../../public/header'
import Bus from '@/components/public/Bus.js'
import Util from '@/components/public/utils.js'
import Stroage from '@/components/public/storage.js'
import BusFn from '@/components/public/BusFn.js'
export default {
    components: {
        vheader: header
    },
    data() {
        return {
            temBool: {
                loading: true,
            },
            header_title: '商家详情',
            headerBox_G_toBack: this.$store.state.get_img_path("toback.png"),
            t1: this.$store.state.get_img_path("details_14.png"),
            t2: this.$store.state.get_img_path("details_03.png"),
            t3: this.$store.state.get_img_path("oderlist14.png"),
            t4: this.$store.state.get_img_path("oderlist9.png"),
            tit: this.$store.state.get_img_path("tit.png"),
            details_18: this.$store.state.get_img_path("details_18.png"),
            details_20: this.$store.state.get_img_path("details_20.png"),
            details_01: this.$store.state.get_img_path("detail01.png"),
            score: this.$store.state.get_img_path("score.png"),
            scores: this.$store.state.get_img_path("scores.png"),
            cuo: this.$store.state.get_img_path("cuo.png"),
            day1: this.$store.state.get_img_path('day_1.png'),
            day2: this.$store.state.get_img_path('day_2.png'),
            night1: this.$store.state.get_img_path('night_1.png'),
            night2: this.$store.state.get_img_path('night_2.png'),
            ajaxUrl: 'api/shop/getshopdetail',
            USERID: 'UserId',
            TOKEN: 'Token',
            actionId: '',
            newIndex: 2,
            Lng: 0,
            Lat: 0,
            Page: 1,
            PageSize: 20,
            OrderType: 1,
            Area: '',
            manager: '1',
            ShopId: '',
            CategoryId: '',
            CategroyName: '',
            HomeCity_pop_scroller_show: false,
            detailmanager: [{
                title: '成交最多',
                path: '1',
            }, {
                title: '人气最高',
                path: '2',
            }, {
                title: '评分最高',
                path: '3',
            }],
            fromsdetail: [],
            moning: 1,
            times: [
                { time: '00' }, { time: '01' }, { time: '02' }, { time: '03' },
                { time: '04' }, { time: '05' }, { time: '06' }, { time: '07' },
                { time: '08' }, { time: '09' }, { time: '10' }, { time: '11' },
            ],
            timenig: [
                { time: '12' }, { time: '13' }, { time: '14' }, { time: '15' },
                { time: '16' }, { time: '17' }, { time: '18' }, { time: '19' },
                { time: '20' }, { time: '21' }, { time: '22' }, { time: '23' },
            ],
            timeing: '',
            hour: '',
            onwek: [],
            managerlist: [],
            daty: '',
            addinfo: false
            // nowDay: ''
        }
    },
    methods: {
        // 分享方法
        // share(){
        //     weex.requireModule('module').share('','','','', function(res){
                
        //     })
        // },
        toBack_G() {
            this.$router.push({
                name: 'categorylist',
            });
        },
        showCity_pop() {
            this.HomeCity_pop_scroller_show = true;
            BusFn.mainFootHide_Fn();
            var self = this;
            Util.WeexAjax({
                url: 'api/shop/getshopapponitmentdetail',
                method: 'GET',
                type: 'JSON',
                token: this.TOKEN,
                callback: function(ret) {
                    var rets = ret;
                    if (ret.Status == 1) {
                        console.log('222', rets)
                        self.onwek = rets.obj;
                        self.daty = rets.obj[0].AppointDateValue;
                        console.log(self.daty);
                    }
                }
            })

        },
        hideCity_pop() {
            this.HomeCity_pop_scroller_show = false;
            //BusFn.mainFootShow_Fn();
        },
        chooseCity(city) {
            this.HomeCity_pop_scroller_show = false;
            //BusFn.mainFootShow_Fn();
            this.city = city.name;
            // todo重新刷新数据源。。。
        },
        chooseStar(index) {
            this.newIndex = index;
        },
        selectPay(msg) {
            if (msg == 'alipay') {
                this.model.payment.wechatselect = this.model.payment.unselect
                this.model.payment.alipayselect = this.model.payment.select
            } else if (msg == 'wechat') {
                this.model.payment.alipayselect = this.model.payment.unselect
                this.model.payment.wechatselect = this.model.payment.select
            }
            this.$refs[msg].children[1]
        },
        onImageLoad(event) {
            console.log(event.size.naturalWidth + ',' + event.size.naturalHeight)
            var that = this;
            var scales = 710 / event.size.naturalWidth;
            console.log(this.$getConfig().env.deviceWidth)
            const view = that.$refs['img']
            console.log(view);
            if (event.success) {
                if (WXEnvironment.platform === 'Web') {
                    //view.style.width = event.size.naturalWidth*scales + 'px';
                    view.style.height = event.size.naturalHeight * scales + 'px';
                } else {
                    animation.transition(view, {
                        styles: {
                            //width: event.size.naturalWidth*scales + 'px',
                            height: event.size.naturalHeight * scales + 'px'
                        },
                        duration: 0, //需要设置为0，否则无效
                        timingFunction: 'ease',
                        delay: 0,
                        needLayout: true, //变化后刷新界面
                    })
                }
            }
        },
        jump(msg) {
            console.log(msg);
            this.manager = msg;
            this.getorderlist();
        },
        sure() {
            if (this.addinfo) {
                this.$router.push({
                    name: 'reserve',
                    params: {
                        ShopId: this.ShopId,
                        AppointTime: this.timeing,
                        AppointDate: this.daty,
                        CategoryId: this.CategoryId,
                        CategroyName: this.CategroyName
                    },
                })
            } else {
                weex.requireModule('modal').toast({
                    message: '请选择正确的时间段',
                    duration: 1
                })
            }

        },
        getorderlist() {
            var self = this;
            Util.WeexAjax({
                url: 'api/demand/getmanagerdemandorderlist?Page=' + this.Page + '&PageSize=' + this.PageSize + '&UserId=' + this.USERID + '&OrderType=' + this.manager + '&Area=' + this.Area,
                method: 'GET',
                type: 'JSON',
                token: this.TOKEN,
                callback: function(ret) {

                    var rets = ret;
                    if (ret.Status == 1) {
                        console.log(rets)
                        self.managerlist = rets.obj.Items;
                    }
                }
            })
        },
        monig(msg) {
            this.moning = msg;
            console.log(this.moning);
        },
        hours(time) {
            console.log(time);
            console.log(this.hour)
            if (this.hour < time) {
                this.addinfo = true;
                this.timeing = time;
                console.log('可以填写信息')
            } else {
                this.addinfo = false;
                console.log('不可以填写信息')
            }
        },
        onweek(msg, index) {
            // msg=msg.substring(msg.length-2);
            this.daty = msg;
            if (index == 0) {
                var t = new Date();
                this.hour = t.getHours();
                console.log(this.hour)
            } else {
                this.hour = -1;
                console.log(this.hour)
            }
            // $(this).addClass('weekend');
            console.log(msg)
        }
    },
    created() {
        var t = new Date();
        var self = this
        BusFn.mainFootHide_Fn();
        /* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
        	self.$router.push({
        		name: 'categorylist',
        		params: {
        			CategoryId: self.CategoryId,
        			CategroyName: self.CategroyName
        		},
        	});
        }) */
        //self.ShopId =  this.$route.params.ShopId
        //self.CategroyName = this.$route.params.CategroyName
        /* if (this.$route.params.CategoryId !== 'undefined') {
        	Stroage.setItems({
        	    "ShopId": this.$route.params.ShopId
        	})
        } */
        // self.nowDay = t.getDate().toString.length == 1 ? '0'+t.getDate() : t.getDate();
        self.hour = t.getHours();
        // console.log("现在的时间是" +self.nowDay + '-' + self.hour);
        // var fontModule = weex.requireModule("dom");
        //    fontModule.addRule('fontFace', {
        //        'fontFamily': "iconfont",
        //        'src': 'url("//at.alicdn.com/t/font_1005984_39pje44rbmx.ttf")'
        //    })
        // 获取商家详情数据
        this.actionId = this.$route.params.actionId
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            console.log(event.data);
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                weex.requireModule('storage').getItem('ShopId', event => {
                    self.ShopId = event.data
                    Util.WeexAjax({
                        url: this.ajaxUrl + '?ShopId=' + self.ShopId + '&Lng=' + self.Lng + '&Lat=' + self.Lat,
                        method: 'GET',
                        type: 'JSON',
                        token: self.TOKEN,
                        callback: function(ret) {

                            var rets = ret;
                            self.getorderlist();
                            if (ret.Status == 1) {
                                console.log(rets)
                                //self.actionList=rets.obj    
                                self.fromsdetail = rets.obj
                                self.CategoryId = ret.obj.CategoryId
                                console.log(self.fromsdetail.Content)
                                self.temBool.loading = false
                            }
                        }
                    })
                })
            })
        });
    },
    mounted() {
        var _this = this;
        Bus.$on('mainJump', function(path) {
            _this.jump(path)
        });
        // Bus.$on('mainNameJump', function(mainName) {
        //     _this.jumpMain(mainName)
        // });
    }
}
</script>
<style lang="stylus" scoped>
.headerBox_G {
    height: 90px;
    width: 750px;
    border-bottom-width: 2px;
    border-bottom-color: #eaeaea;
    border-bottom-style: solid;
}

.back_box {
    position: absolute;
    left: 0;
    top: 0;
    height: 90px;
    width: 71px;
    justify-content: center;
    align-items: center;
}

.headerBox_G_pageTip {
    color: #333333;
    font-size: 36px;
    line-height: 88px;
    text-align: center;
}

.act-box {
    position: fixed;
    top: 90px;
    bottom: 0;
    left: 0;
    right: 0;
}

.act-t1 {
    padding-left: 20px;
    padding-right: 20px;
    line-height: 85px;
    font-size: 34px;
    color: #333333;
}

.act-t2 {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 22px;
    padding-bottom: 20px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.act-t2-content {
    margin-right: 29px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.act-t2-text {
    font-size: 24px;
    color: #333333;
}

.act-t2-text-ac {
    color: #ff6204;
    font-size: 24px;
}

.act-t2-info-wrapper {
    padding-top: 8px;
    padding-left: 20px;
    padding-right: 20px;
}

.act-t2-info {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.act-t2-info-show {
    width: 18px;
    height: 24px;
    margin-right: 26px;
}

.act-t2-info-title {
    font-size: 24px;
    color: #333333;
    width: 450px;
}

.act-t2-info-content {
    font-size: 30px;
    color: #777777;
    width: 550px;
}

.btn-box {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}

.baoming-btn {
    width: 200px;
    height: 60px;
    line-height: 60px;
    font-size: 30px;
    color: #333333;
    background-color: #ffd700;
    text-align: center;
    border-radius: 10px;
}

.act-t3 {
    font-size: 26px;
    margin-top: 5px;
}

.act-image-box {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}

.act-t3-image {
    width: 710px;
}

.model-box {
    position: fixed;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4)
}

.model-wrapper {
    width: 710px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 5px;
    padding-top: 35px;
    padding-left: 60px;
    padding-right: 60px;
    padding-bottom: 20px;
    border-radius: 15px;
}

.model-close {
    position: absolute;
    width: 37px;
    height: 37px;
    top: 20px;
    right: 20px;
}

.model-title {
    margin-bottom: 20px;
    font-size: 36px;
    color: #000000;
    line-height: 40px;
    text-align: center;
}

.model-subtitle {
    margin-top: 40px;
    margin-bottom: 17px;
    font-size: 24px;
    color: #a3a3a3;
    text-align: center;
}

.model-bottom-btn-wrapper {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 43px;
}

.model-bottom-btn {
    width: 220px;
    height: 88px;
    line-height: 88px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    border-radius: 15px;
}

.model-bottom-btn-left {
    background-color: #ffd700;
}

.model-bottom-btn-right {
    background-color: #dadada;
}

.model-bottom-btn-pay {
    font-size: 36px;
    color: #333;
}

.model-pay-wrapper {
    margin-top: 20px;
}

.model-pay-list {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #f4f4f4;
}

.model-pay-list-left {
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.pay-image {
    width: 28px;
    height: 28px;
    margin-right: 20px;
}

.pay-dui {
    width: 30px;
    height: 30px;
}

.pay-title {
    font-size: 24px;
    color: #333333;
}

.model-pay-money {
    font-size: 26px;
    color: #ff6204;
}

.banner-wrapper {
    height: 330px;
    width: 750px;
}

.indicator {
    item-color: #ffffff;
    item-selected-color: #ffd262;
    item-size: 20px;
    width: 750px;
    height: 20px;
    position: absolute;
    left: 0;
    bottom: 20px;
}

.item1 {
    flex-direction: row;
}

.starList {
    flex-direction: row;
}

.staron {
    color: #ffd262;
}

.star {
    margin-right: 10px;
    width: 26px;
    height: 26px;
}

.stared {
    font-size: 30px;
}

.iconFont {
    font-family: iconfont;
}

._banner {
    width: 84px;
    height: 84px;
}

.infos-show {
    margin-top: 25px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 25px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
}

.infomation {}

.bannner {
    background-color: #ffd262;
}

.name-title {
    font-size: 30px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}

.title-content {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
}

.name-title-text {
    color: #ffffff;
    font-weight: bold;
    font-size: 36px;
    flex: 1;
    margin-right: 18px;
}

.name-title-text-bro {
    color: #f26100;
    font-size: 36px;
}

.title-content-radios {
    border-radius: 15px;
    background-color: #ffffff;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 25px;
    padding-right: 25px;
}

.name-info {
    margin-top: 5px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.name-info-tet {}

.name-info-whit {
    color: #ffffff;
    font-size: 30px;
}

.name-info-txt {
    margin-left: 8px;
    margin-right: 8px;
}

.act-top {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.act-dd {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
}

.addtop {
    border-bottom-width: 1px;
    border-bottom-color: #dcdcdc;
    border-bottom-style: solid;
}

.address {
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.address {
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
}

.address-rim {
    margin-top: 18px;
}

.address-yx {
    padding-bottom: 15px;
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #dcdcdc;
    border-bottom-style: solid;
}

.address-button {
    background-color: #ffd700;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 8px;
    font-size: 30px;
}

.address-top-left {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}

.address-top {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.address-top-left-name {
    font-size: 24px;
}

.add-image {
    width: 20px;
    height: 10px;
}

.act-dd-right {
    margin-right: 70px;
    flex-direction: row;
    align-items: center;
}

.mydetail {
    width: 5px;
    height: 26px;
    background-color: #ffd262;
    border-radius: 5px;
    margin-right: 10px;
}

.banner-list {
    margin-top: 5px;
}

.my-heart-box-image {
    width: 150px;
    height: 150px;
    border-radius: 20px;
}

.ted-fs {
    color: #777777;
    font-size: 24px;
}

.jg-txt {
    margin-right: 8px;
    margin-left: 8px;
}

.address-tor {
    margin-left: 15px;
    margin-right: 15px;
}

.manager-image {
    border-width: 1px;
    border-style: solid;
    border-color: #ffd772;
    border-radius: 100px;
}

.address-top-left-nas {
    font-size: 28px;
}

.address-color {
    color: #ffd262;
}

.HomeCity_pop_scroller {
    position: fixed;
    top: 0;
    bottom: 0px;
    left: 0;
    right: 0;
}

.HomeCity_popClose {
    height: 90px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.HomeCity_popCloseText {
    color: #0067c5;
    font-size: 30px;
    line-height: 90px;
    text-align: right;
}

.HomeCity_popCityItem {
    padding-left: 20px;
    padding-right: 20px;
    height: 55px;
    border-bottom-color: #cccccc;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.HomeCity_popCityItemText {
    color: #333333;
    font-size: 24px;
    text-align: center;
    line-height: 55px;
}

.HomeCity_popCityItemTextActive {
    color: #ffd262;
}

.HomeCity_popCityList {
    margin-top: 20px;
}

.homecity {
    position: fixed;
    top: 0;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    height: inherit;
}

.HomeCity_pop {
    position: fixed;
    bottom: 0;
    width: 750px;
    height: 800px;
    background-color: #ffffff;
    z-index: 101;
}

.detail_flex {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.detail_flex_bot {
    border-bottom-color: #999999;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    width: 90px
}

.detail_flex_title {
    padding-left: 18px;
    padding-right: 18px;
    font-size: 26px;
}

.date_day {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.date_day_til {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 20px;
    margin-right: 20px;
    height: 60px;
    font-size: 26px;
    color: #777777;
}

.date_day_ce {
    width: 375px;
    justify-content: center;
}

.date-days {
    margin-top: 40px;
    padding-bottom: 40px;
}

.date_time {
    flex-wrap: wrap;
    margin-top: 37px;
}

.date_times {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 48px;
    padding-right: 46px;
    font-size: 26px;
    border-width: 1px;
    border-style: solid;
    border-color: #dcdcdc;
}

.date_time_lt {
    margin-left: 20px;
    border-radius: 5px;
    margin-top: 20px;
}

.date_t {
    margin-top: 40px;
}

.date_pb {
    padding-bottom: 20px;
}

.black {
    color: #000000;
}

.groy {
    color: #777777;
}

/*日夜选择样式*/
.day_night {
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-bottom-color: #ffd262;
}

.day_nights {
    color: #ffd262;
}

/*时间选择样式*/
.day_time_rs {
    border-color: #ffd262;
    color: #ffd262;
}

.person-btn {
    width: 710px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 26px;
    color: #333333;
    border-radius: 8.8px;
    background-color: #ffd46b;
    margin-left: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 36px;
}

.date_outime {
    background-color: #e5e5e5;
    color: #ffffff;
}

.weekend {
    color: #000000;
}
</style>