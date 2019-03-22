<template>
    <div class="wrapper">
        <!-- 主页顶部 -->
        <div class="homeTop">
            <div class="homeTopCity" @click="showCity_pop">
                <text class="homeTopCityName">{{city}}</text>
                <image :src="homeTopMoreCity_Img" class="homeTopMoreCity_Img" style="width:21px;height:13px"></image>
            </div>
            <div class="homeTopSearch">
                <image :src="homeTopSearch_Img" class="homeTopSearch_Img" style="width:33px;height:33px"></image>
                <input type="text" v-model="homeTopSearchInp" class='homeTopSearchInp' placeholder="搜索经商、经理人" />
            </div>
            <div class="homeTopMy" @click="toMy">
                <image :src="homeTopMy_Img" class="homeTopMy_Img" style="width:40px;height:39px"></image>
            </div>
        </div>
        <!-- 主页中间主体 -->
        <list class="homeMain">
            <refresh class="loading" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">下拉刷新...</text>
                <loading-indicator class="indicators"></loading-indicator>
            </refresh>
            <!-- banner -->
            <cell>
                <slider class="banner-wrapper" auto-play="true" interval="4000">
                    <div class="banner-list" v-for="(banner,index) in homePage.bannerList" :key="index">
                        <image class="_banner" :src="banner.ImageUrl" style="width:750px;height:330px;" :placeholder="slotimg"></image>
                    </div>
                    <indicator class="indicator"></indicator>
                </slider>
            </cell>
            <!-- notice -->
            <cell>
                <div class="homeNotice">
                    <image class="noticeImg" :src="noticeImg" style="width:35px;height:30px;"></image>
                    <text class="noticeText_info" v-if="noticeText_info.length > 0">{{noticeText_info[noticeText_info_index].Content}}</text>
                    <image class="noticeText_infoBtn" :src="noticeText_infoBtn" style="width:20px;height:29px;"></image>
                </div>
            </cell>
            <cell>
                <div class="eightBox">
                    <div class="eightBoxTitle">
                        <text class="eightBoxTitleText">最新需求</text>
                        <image :src="eightBoxTitleImg" class="eightBoxTitleImg"></image>
                    </div>
                    <slider class="list-wrapper" interval="4000" v-if="homePage.ManagerDemandList.length > 0">
                        <div class="banner-list" v-for="(item,index) in homePage.ManagerDemandList" :key="index">
                            <div class="orderListWrapper">
                                <div class="listBox">
                                    <div class="listItem">
                                        <div class="itemTop">
                                            <div class="itemTipbox itemTopTipbox">
                                                <div class="itemImgbox">
                                                    <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
                                                </div>
                                                <text class="itemTipbox_t1">发布时间</text>
                                                <text class="itemTipbox_t2">{{item.AddTime}}</text>
                                            </div>
                                        </div>
                                        <div class="orderInfo">
                                            <div class="infoItem">
                                                <div class="itemTipbox itemTopTipbox">
                                                    <div class="itemImgbox">
                                                        <image :src="oderListImg.category" style="width:30px;height:30px;"></image>
                                                    </div>
                                                    <text class="itemTipbox_t1">类别</text>
                                                    <text class="itemTipbox_t2">{{item.CategoryName}}</text>
                                                </div>
                                            </div>
                                            <div class="infoItem">
                                                <div class="itemTipbox itemTopTipbox">
                                                    <div class="itemImgbox">
                                                        <image :src="oderListImg.nums" style="width:34px;height:26px;"></image>
                                                    </div>
                                                    <text class="itemTipbox_t1">人数</text>
                                                    <text class="itemTipbox_t2">{{item.Number}}人</text>
                                                </div>
                                            </div>
                                            <div class="infoItem">
                                                <div class="itemTipbox itemTopTipbox">
                                                    <div class="itemImgbox">
                                                        <image :src="oderListImg.time" style="width:34px;height:34px;"></image>
                                                    </div>
                                                    <text class="itemTipbox_t1">时间</text>
                                                    <text class="itemTipbox_t2">{{item.BeginTime}}-{{item.EndTime}}</text>
                                                </div>
                                            </div>
                                            <div class="infoItem">
                                                <div class="itemTipbox itemTopTipbox">
                                                    <div class="itemImgbox">
                                                        <image :src="oderListImg.addr" style="width:34px;height:32px;"></image>
                                                    </div>
                                                    <text class="itemTipbox_t1">地址</text>
                                                    <text class="itemTipbox_t2 messageT">{{item.Address}}</text>
                                                </div>
                                            </div>
                                            <div class="infoItem">
                                                <div class="itemTipbox itemTopTipbox">
                                                    <div class="itemImgbox">
                                                        <image :src="oderListImg.nearby" style="width:34px;height:34px;"></image>
                                                    </div>
                                                    <text class="itemTipbox_t1">附近起止公里数</text>
                                                    <text class="itemTipbox_t2">{{item.Distance}}KM</text>
                                                </div>
                                            </div>
                                            <div class="infoItem">
                                                <div class="itemTipbox itemTopTipbox messageBoxItem">
                                                    <div class="itemImgbox">
                                                        <image :src="oderListImg.message" style="width:34px;height:29px;"></image>
                                                    </div>
                                                    <text class="itemTipbox_t1">留言</text>
                                                    <text class="itemTipbox_t2 messageT">{{item.Message}}</text>
                                                </div>
                                            </div>
                                            <div class="infoItem">
                                                <div class="itemTipbox itemTopTipbox">
                                                    <div class="itemImgbox">
                                                        <image :src="oderListImg.manager" style="width:32px;height:32px;"></image>
                                                    </div>
                                                    <text class="itemTipbox_t1">客户</text>
                                                    <text class="itemTipbox_t2">{{item.NickName}}</text>
                                                    <text class="stateT statePersonInfo" @click="look(item.UserId)">查看TA</text>
                                                </div>
                                            </div>
                                            <div class="infoItem">
                                                <div class="itemTipbox itemTopTipbox">
                                                    <div class="itemImgbox">
                                                        <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
                                                    </div>
                                                    <text class="itemTipbox_t1">诚意金</text>
                                                    <text class="itemTipbox_t2 red">{{item.Money}}元</text>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="handle">
                                            <text class="getOrderBtn" @click="open(item.DemandID)">接 单</text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <indicator class="indicator listBannerNav"></indicator>
                    </slider>
                    <v-nomore v-if="homePage.ManagerDemandList.length == 0"></v-nomore>
                </div>
            </cell>
        </list>
        <!-- 城市选择弹出 -->
        <scroller class="HomeCity_pop_scroller" v-if="HomeCity_pop_scroller_show">
            <div class="HomeCity_pop" @click="hideCity_pop">
                <div class="HomeCity_popClose">
                    <text class="HomeCity_popCloseText" @click="hideCity_pop">取消</text>
                </div>
                <div class="HomeCity_popCityList">
                    <div class="HomeCity_popCityItem" v-for="(item,index) in cityList" :key="index" @click="chooseCity(item)">
                        <text :class="['HomeCity_popCityItemText',(item.Name==city)?'HomeCity_popCityItemTextActive':'']">{{item.Name}}</text>
                    </div>
                </div>
            </div>
        </scroller>
        <div class="appraiseCom" v-if="temBool.getOrderComr">
            <div class="mainCont">
                <text class="title">提示</text>
                <text class="l">确认是否接单？</text>
                <div class="btn btnbox">
                    <text class="btnItem ok" @click="close(1)">确定</text>
                    <text class="btnItem cancel" @click="close">取消</text>
                </div>
                <image class="close" :src="oderListImg.cuo" @click="close"></image>
            </div>
        </div>
        <!-- <div class="model-box" v-if="model.boolSign">
            <div class="model-wrapper">
                <image class="model-close" :src="oderListImg.cuo" @click="closes()"></image>
                <text class="model-title">{{model.title}}</text>
                <text class="model-subtitle">获取当前定位？</text>
                <div class="model-bottom-btn-wrapper">
                    <text class="model-bottom-btn model-bottom-btn-left" @click="sure()">确定</text>
                    <text class="model-bottom-btn model-bottom-btn-right" @click="closes()">取消</text>
                </div>
            </div>
        </div> -->
        <v-toast :img="toastImg" :text="toastText" v-if="openToast" v-on:close="closeTotas"></v-toast>
        <v-loading v-if="temBool.loading"></v-loading>
    </div>
</template>
<script>
import BusFn from '@/components/public/BusFn.js'
import utils from '@/components/public/utils.js'
import toast from '@/components/public/toast.vue'
import Stroage from '@/components/public/storage.js'
import NoMore from '@/components/public/NoMore.vue'
const GETHOMEPAGE_URL = 'api/recommend/getmanagerdemandhomepage'
export default {
    data() {
        return {
            /////////////
            //控制组件显示隐藏 //
            /////////////
            temBool: {
                loading: true,
                getOrderComr: false,
            },
            Receipt: {
                ManagerUID: '',
                DemandID: ''
            },
            homeTopMoreCity_Img: this.$store.state.get_img_path("morecity.png"),
            homeTopSearch_Img: this.$store.state.get_img_path("homesearch.png"),
            homeTopMy_Img: this.$store.state.get_img_path("hometopmy.png"),
            noticeImg: this.$store.state.get_img_path("home_notice.png"),
            noticeText_infoBtn: this.$store.state.get_img_path("home_noticeinfo.png"),
            eightBoxTitleImg: this.$store.state.get_img_path("home_righttitle.png"),
            slotimg: this.$store.state.get_img_path("slot.png"),
            homeTopSearchInp: "",
            HomeCity_pop_scroller_show: false,
            city: "",
            TypeStatus: 0,
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            USERID: 'UserId',
            TOKEN: 'Token',
            lon: 'Lon',
            lat: 'Lat',
            CityName: 'CityName',
            noticeText_info: [],
            noticeText_info_index: 0,
            oderListImg: {
                update: this.$store.state.get_img_path("oderlist1.png"),
                category: this.$store.state.get_img_path("oderlist2.png"),
                nums: this.$store.state.get_img_path("oderlist3.png"),
                time: this.$store.state.get_img_path("oderlist4.png"),
                addr: this.$store.state.get_img_path("oderlist5.png"),
                nearby: this.$store.state.get_img_path("oderlist6.png"),
                message: this.$store.state.get_img_path("oderlist7.png"),
                price: this.$store.state.get_img_path("oderlist8.png"),
                manager: this.$store.state.get_img_path("oderlist9.png"),
                state: this.$store.state.get_img_path("oderlist10.png"),
                stars: this.$store.state.get_img_path("oderlist11.png"),
                cuo: this.$store.state.get_img_path("cuo.png"),
            },
            model: {
                boolSign: false,
                payInfo: false,
                title: '提示',
                ids: '',
                status: ''
            },
            homePage: {
                bannerList: [], //存放首页banner
                NoticeList: [], //存放通知
                ManagerDemandList: [], //存放需求
            },
            toastImg: {
                url: this.$store.state.get_img_path("ok.png"),
                width: '96px',
                height: '74px'
            },
            toastText: "接单成功",
            openToast: false,
            cityList: [],
        }
    },
    created() {
        // BusFn.loadingShow_Fn();
        // weex.requireModule('module').showLoading('页面加载中请稍后');
        var self = this
        var globalEvent = weex.requireModule('globalEvent');
            globalEvent.addEventListener("geolocation",function(e){
            weex.requireModule('module').getLocation(function(map) {
                var datas = Util.JsonFormat(map)
                self.lon = datas.data.lon
                self.lat = datas.data.lat
                self.city = datas.data.cityName
                self.model.boolSign = false;
                Stroage.setItems({
                    "Lon": self.lon,
                    "Lat": self.lat,
                    "CityName": self.city
                })
            })
        });
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                self.getHomme({
                    Fn: function() {
                    },
                    cal: function(){
                        // 关闭加载动画
                        self.temBool.loading = false;
                        // BusFn.loadingHide_Fn();
                        // weex.requireModule('module').hideLoading();
                    }
                });
            })
        })
        // 请求地区选项
        utils.WeexAjax({
            url: 'api/basci/getallcitylist',
            method: 'GET',
            type: 'JSON',
            callback: function(ret) {
                var rets = ret;
                if (ret.Status == 1) {
                    console.log(ret)
                    //self.NavTitles = rets.obj;
                    self.cityList = ret.obj
                }
            }
        })
        // self.TypeStatus = utils.closeAppStore(self.TypeStatus)
    },
    mounted() {
        this.$nextTick(function() {
            var self = this;
            // 加载经纬度 进行请求
            weex.requireModule('storage').getItem(this.lon, event => {
                self.lon = event.data
                weex.requireModule('storage').getItem(this.lat, event => {
                    self.lat = event.data
                    weex.requireModule('storage').getItem(this.CityName, event => {
                        // if (event.data != 'undefined' && event.data != 'null') {
                            self.city = event.data
                            self.CityName = event.data
                        // }
                        // if (self.lon === 'undefined' || self.lon === 'Lon' || self.lon === 'null' || self.lat === 'undefined' || self.lat === 'Lon' || self.lat === 'null') {
                        //     setTimeout(function(){
                        //         self.model.boolSign = true
                        //     },2000)
                        // } else {
                        //     console.log(self.CityName)
                            // self.model.boolSign = false
                            self.getHomme({
                                Fn: function() {},
                                cal:function(){}
                            });
                        // }
                    })
                })
            });

        })
    },
    methods: {
        close($res = '') {
            var _this = this;
            utils.goLogin({
                "USERID": _this.USERID,
                "TOKEN": _this.TOKEN,
                "success": function() {
                    if ($res == 1) {
                        utils.WeexAjax({
                            url: 'api/demand/orderTakingDemand',
                            method: 'POST',
                            type: 'JSON',
                            token: _this.TOKEN,
                            body: {
                                "UserId": _this.USERID,
                                "DemandID": _this.Receipt.DemandID
                            },
                            callback: function(ret) {
                                if (ret.Status == 1) {
                                    _this.openToast = true;
                                    for (var item in _this.homePage.ManagerDemandList) {
                                        if (_this.homePage.ManagerDemandList[item].DemandID == _this.Receipt.DemandID) {
                                            // 本地动态删除对应接单项
                                            _this.homePage.ManagerDemandList.splice(item, 1)
                                        }
                                    }
                                }
                                console.log(ret);
                            }
                        })
                    }
                },
                "fail": function() {
                    _this.$router.push({ name: 'login' })
                }
            })
            this.temBool.getOrderComr = false;
        },
        closeTotas() {
            this.openToast = false;
        },
        open(msg) {
            this.temBool.getOrderComr = true;
            this.Receipt.DemandID = msg;
        },
        // 查看TA
        look(msg) {
            this.$router.push({
                name: 'friendsInfo',
                query: {
                    "ToUserId": msg
                }
            })
            BusFn.mainFootHide_Fn();
        },
        showCity_pop() {
            this.HomeCity_pop_scroller_show = true;
            BusFn.mainFootHide_Fn();
        },
        hideCity_pop() {
            this.HomeCity_pop_scroller_show = false;
            BusFn.mainFootShow_Fn();
        },
        chooseCity(city) {
            this.HomeCity_pop_scroller_show = false;
            BusFn.mainFootShow_Fn();
            this.city = city.Name;
            this.lon = city.Lag
            this.lat = city.Lat
            this.CityName = city.Name
            weex.requireModule('storage').setItem("Lon", city.Lag, event => {
                weex.requireModule('storage').setItem("Lat", city.Lat, event => {
                    weex.requireModule('storage').setItem("CityName", city.Name, event => {
                    })
                })
            })
            this.onrefresh();
            // todo重新刷新数据源。。。
        },
        toMy() {
            BusFn.mainJump_Fn('managerMy');
            this.$router.push({ name: 'managerMy' })
        },
        onrefresh() {
            var _this = this;
            if (this.refreshing) return;
            this.refreshing = true;
            _this.getHomme({
                Fn: function() {
                    console.log(_this.CityName)
                    _this.refreshing = false;
                },
                cal:function(){}
            });
        },
        jumptoDemand() {
            BusFn.JumpPath_Fn({ path: '/main/demand', mainName: 'demand', pathName: 'demand' });
        },
        getHomme(obj) {
            var self = this
            weex.requireModule('storage').getItem('CityName', event => {
            // if (event.data != 'undefined' && event.data != 'null') {
                self.city = event.data
                self.CityName = event.data
            })
            utils.WeexAjax({
                url: GETHOMEPAGE_URL + '?UserId=' + self.USERID + '&lng=' + self.lon + '&lat=' + self.lat + '&Area=' + self.city,
                method: 'GET',
                type: 'JSON',
                token: self.TOKEN,
                callback: function(ret) {
                    console.log(ret)
                    obj.cal();
                    if (ret.Status == 1) {
                        self.homePage.bannerList = ret.obj.BannerList;
                        self.noticeText_info = ret.obj.NoticeList;
                        self.homePage.ManagerDemandList = ret.obj.ManagerDemandList;
                        self.noticeText_info_index = 0;
                        var noticeNum = self.noticeText_info.length;
                        clearInterval(noticeTime)
                        var noticeTime = setInterval(function() {
                            if (self.noticeText_info_index < noticeNum - 1) {
                                self.noticeText_info_index += 1;
                            } else {
                                self.noticeText_info_index = 0;
                            }
                        }, 6000);
                        obj.Fn();
                    } else {
                        weex.requireModule("modal").toast({
                            message: ret.Message,
                            duration: 1
                        })
                    }
                }
            })
        },
        sure() {
            var self = this
            weex.requireModule('module').getLocation(function(map) {
                var datas = utils.JsonFormat(map)
                self.lon = datas.data.lon
                self.lat = datas.data.lat
                self.city = datas.data.cityName
                self.model.boolSign = false;
                Stroage.setItems({
                    "Lon": self.lon,
                    "Lat": self.lat,
                    "CityName": self.city
                })
                self.getHomme({
                    Fn: function() {
                    },
                    cal: function(){
                    }
                });
            })
        },
        closes() {
            console.log(1)
            this.model.boolSign = false;
        },
    },
    components: {
        "v-toast": toast,
        "v-nomore": NoMore,
    },
}
</script>
<style scoped>
.indicator-text {
    color: #666666;
    font-size: 30px;
    text-align: center;
    margin-top: 16px;
}

.indicators {
    margin-top: 10px;
    height: 30px;
    width: 30px;
    color: #999999;
}

.loading {
    width: 750px;
    height: 100px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    background-color: #f5f5f5;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
}

.homeTop {
    height: 88px;
    width: 750px;
    position: fixed;
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
}

.homeTopCity {
    height: 58px;
    flex: 1;
    flex-direction: row;
    align-items: center;
    width: 128px;
}

.homeTopCityName {
    font-size: 24px;
    margin-right: 8px;
}

.homeTopSearch {
    border-radius: 8px;
    background-color: #f0f0f0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 510px;
    height: 58px;
    padding-left: 20px;
    padding-right: 20px;
}

.statePersonInfo {
    background-color: #853f81;
    margin-left: 25px;
}


.homeTopSearchInp {
    flex: 2;
    background-color: transparent;
    font-size: 28px;
    color: #333333;
    margin-left: 10px;
    line-height: 58px;
}

.homeTopMy {
    height: 58px;
    padding-left: 30px;
    align-items: center;
    flex-direction: row;
}

.homeMain {
    position: fixed;
    top: 88px;
    bottom: 100px;
    left: 0;
    right: 0;
}

.HomeCity_pop_scroller {
    position: fixed;
    top: 0;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color: #ffffff;
}

.HomeCity_popClose {
    height: 90px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-width: 2px;
    border-bottom-color: #eaeaea;
    border-bottom-style: solid;
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


.banner-wrapper {
    height: 330px;
    width: 750px;
}

.list-wrapper {
    height: 870px;
}

.indicator {
    item-color: #ffffff;
    item-selected-color: #ffd262;
    item-size: 20px;
    width: 750px;
    height: 20px;
    position: absolute;
    left: 0;
    bottom: 10px;
}

.homeNotice {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    height: 82px;
    border-bottom-color: #f0f0f0;
    border-bottom-width: 2px;
    border-bottom-style: solid;
}

.noticeText_info {
    flex: 2;
    lines: 1;
    padding-left: 18px;
    padding-right: 18px;
    font-size: 30px;
    color: #333333;
    justify-content: center;
}

.eightItemLine {
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.eightItem {
    width: 140px;
    margin-right: 50px;
}

.eightItemTitle {
    text-align: center;
    font-size: 26px;
    color: #333333;
    margin-top: 15px;
}

.eightItemImg {
    width: 140px;
    height: 140px;
    border-radius: 70px;
    border-top-width: 5px;
    border-top-color: #f3eee7;
    border-top-style: solid;
    border-bottom-width: 5px;
    border-bottom-color: #f3eee7;
    border-bottom-style: solid;
    border-left-width: 5px;
    border-left-color: #f3eee7;
    border-left-style: solid;
    border-right-width: 5px;
    border-right-color: #f3eee7;
    border-right-style: solid;
}

.eightNavBox {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 40px;
}

.eightBox {
    margin-top: 40px;
    padding-bottom: 15px;
}

.eightBoxTitle {
    font-size: 26px;
    color: #333333;
    margin-top: 15px;
    text-align: center;
}

.eightBoxTitleImg {
    width: 433px;
    height: 8px;
}

.eightBoxTitle {
    align-items: center;
}

.eightBox {
    padding-left: 20px;
    padding-right: 20px;
}

.eightBoxTitleText {
    font-size: 48px;
    color: #333333;
    margin-bottom: 15px;
}

.eightBoxImgs {
    margin-top: 35px;
}

.eightBoxImgsScroller {
    width: 710px;
    flex-direction: row;
}

.eightBoxImgItem {
    margin-right: 20px;
}

.eightBoxImgItem_image {
    width: 345px;
    height: 200px;
}

.eightBoxImgItem_t1 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 30px;
    color: #333333;
}

.eightBoxImgItem_t2 {
    color: #f26100;
    font-size: 30px;
}

.eightBoxImgItem_image2 {
    width: 345px;
    height: 376px;
    border-style: solid;
    border-width: 2px;
    border-color: #ffd262;
    margin-bottom: 15px;
}

.eightBoxImgItem_hot {
    position: absolute;
    right: 0;
    bottom: 6px;
    color: #f24d62;
    font-size: 24px;
}

.eightBoxImgItem_t3 {
    font-size: 30px;
    color: #333333;
}

.marginR0 {
    margin-right: 0px;
}

.listBannerNav .weex-indicator-item {
    background-color: #d2d2d2
}

.orderListWrapper {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 20px;
}

.listItem {
    border-style: solid;
    border-color: #e8e8e8;
    border-width: 2px;
    padding-left: 18px;
    padding-right: 18px;
    padding-top: 18px;
    padding-bottom: 18px;
    margin-bottom: 20px;
}

.itemTop {
    border-bottom-style: solid;
    border-bottom-color: #e8e8e8;
    border-bottom-width: 1px;
    height: 60px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
}

.itemTipbox {
    flex-direction: row;
    align-items: center;
}

.itemImgbox {
    flex-direction: row;
    width: 34px;
    height: 34px;
    justify-content: center;
}

.itemTipbox_t1 {
    font-size: 30px;
    color: #333333;
    margin-left: 10px;
    line-height: 34px;
}

.itemTipbox_t2 {
    font-size: 28px;
    color: #777777;
    margin-left: 18px;
    line-height: 40px;
}

.stateT {
    padding-left: 20px;
    padding-right: 20px;
    height: 44px;
    line-height: 44px;
    border-radius: 8px;
    text-align: center;
    font-size: 24px;
    color: #ffffff;
}

.state1 {
    background-color: #d86060;
}

.red {
    color: #ff6204;
}

.infoItem {
    margin-top: 20px;
}

.handle {
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #e8e8e8;
    margin-top: 20px;
    height: 91px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}

.handleItem {
    padding-right: 24px;
    margin-right: 25px;
    border-right-width: 1px;
    border-right-color: #dcdcdc;
    border-right-style: solid;
    font-size: 30px;
    line-height: 34px;
    ;
}

.rightBMP0 {
    border-right-width: 0;
    margin-right: 0;
    padding-right: 0px;
}

.handleItem_change {
    color: #ffd262;
}

.handleItem_delete {
    color: #ff0000;
}

.handleItem_end {
    color: #3381a9;
}

.handleItem_star {
    color: #ffb400;
}

.getOrderBtn {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #ffd700;
    border-radius: 10px;
    margin-top: 20px;
}


.appraiseCom {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
}

.mainCont {
    width: 710px;
    background-color: #ffffff;
    border-radius: 8px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    margin-left: 20px;
}

.close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 37px;
    height: 37px;
}


.title {
    color: #343434;
    text-align: center;
    font-size: 40px;
    padding-top: 13px;
    margin-bottom: 60px;
}

.item1 {
    flex-direction: row;
    margin-bottom: 20px;
}

.l {
    color: #a3a3a3;
    font-size: 26px;
    text-align: center;
    margin-bottom: 60px;
}

.btn {
    margin-top: 20px;
    flex-direction: row;
    justify-content: flex-end;
}

.btnItem {
    width: 220px;
    height: 88px;
    line-height: 88px;
    font-size: 36px;
    margin-left: 20px;
    text-align: center;
    color: #343331;
    border-radius: 8px;
}

.btn {
    margin-top: 20px;
    flex-direction: row;
    justify-content: flex-end;
}

.btnItem {
    width: 220px;
    height: 88px;
    line-height: 88px;
    font-size: 36px;
    margin-left: 20px;
    text-align: center;
    color: #343331;
    border-radius: 8px;
}

.ok {
    background-color: #ffd701;
    justify-content: center;
}

.cancel {
    background-color: #dadada;
}

.btnbox {
    justify-content: center;
}

.model-box {
    position: fixed;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4)
}

.model-wrapper {
    width: 710px;
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
</style>