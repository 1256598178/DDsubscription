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
            <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">下拉刷新...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <!-- banner -->
            <cell>
                <slider class="banner-wrapper" auto-play="true" interval="4000">
                    <div class="banner-list" v-for="(banner,index) in bannerList" :key="index">
                        <image class="_banner" :src="banner.ImageUrl" style="width:750px;height:330px;"></image>
                    </div>
                    <indicator class="indicators"></indicator>
                </slider>
            </cell>
            <!-- notice -->
            <cell>
                <div class="homeNotice">
                    <image class="noticeImg" :src="noticeImg" style="width:35px;height:30px;"></image>
                    <text class="noticeText_info">{{noticeText_info[noticeText_info_index].Content}}</text>
                    <image class="noticeText_infoBtn" :src="noticeText_infoBtn" style="width:20px;height:29px;"></image>
                </div>
            </cell>
            <!-- 8元素模块 -->
            <cell>
                <div class="eightNavBox">
                    <div class="eightItemLine" v-for="(line,index) in eightNavList_split" :key="index">
                        <div :class="['eightItem',((index+1) % 4 == 0)?'marginR0':'']" :key="index" v-for="(item,index) in line" @click="jumptoDemand(item.CategoryName,item.CategoryId)">
                            <image class="eightItemImg" :src="item.ImageUrl"></image>
                            <text class="eightItemTitle">{{item.CategoryName}}</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <div class="eightBox" v-for="(val,key,index) in NavTitles" :key="index">
                    <div class="eightBoxTitle">
                        <text class="eightBoxTitleText">{{val.CategroyName}}</text>
                        <image :src="eightBoxTitleImg" class="eightBoxTitleImg"></image>
                    </div>
                    <div class="eightBoxImgs">
                        <scroller scroll-direction="horizontal" class="eightBoxImgsScroller">
                            <div :class="['eightBoxImgItem',index==val.ShopList.length-1?'marginR0':'']" v-for="(item,index) in val.ShopList" :key="index" @click="shopdetailed(item.ShopId,item.CategoryName)">
                                <image class="eightBoxImgItem_image" :src="item.ImageUrl"></image>
                                <text class="eightBoxImgItem_t1">{{item.ShopName}}</text>
                                <text class="eightBoxImgItem_t2">￥{{ item.MinPrice }}起</text>
                            </div>
                        </scroller>
                    </div>
                </div>
            </cell>
            <cell>
                <div class="eightBox">
                    <div class="eightBoxTitle">
                        <text class="eightBoxTitleText">人气经理人</text>
                        <image :src="eightBoxTitleImg" class="eightBoxTitleImg"></image>
                    </div>
                    <div class="eightBoxImgs">
                        <scroller scroll-direction="horizontal" class="eightBoxImgsScroller">
                            <div :class="['eightBoxImgItem',index==homeManger.length-1?'marginR0':'']" v-for="(item,index) in homeManger" :key="index" @click="jumptoFriendsInfo(item.UserID)">
                                <image class="eightBoxImgItem_image2" :src="item.HeadImageUrl"></image>
                                <text class="eightBoxImgItem_t3">{{ item.NickName }}</text>
                                <!-- <text class="eightBoxImgItem_hot iconFont">&#xe7a4; {{ item.hot }}</text> -->
                            </div>
                        </scroller>
                    </div>
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
        <div class="model-box" v-if="model.boolSign">
            <div class="model-wrapper">
                <image class="model-close" :src="cuo" @click="close()"></image>
                <text class="model-title">{{model.title}}</text>
                <text class="model-subtitle">获取当前定位？</text>
                <div class="model-bottom-btn-wrapper">
                    <text class="model-bottom-btn model-bottom-btn-left" @click="sure()">确定</text>
                    <text class="model-bottom-btn model-bottom-btn-right" @click="close()">取消</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BusFn from '@/components/public/BusFn.js'
import Util from '@/components/public/utils.js'
import Stroage from '@/components/public/storage.js'
export default {
    data() {
        return {
            ImageUrl: this.$store.state.imageUrl_G,
            cuo: this.$store.state.get_img_path("cuo.png"),
            homeTopMoreCity_Img: this.$store.state.get_img_path("morecity.png"),
            homeTopSearch_Img: this.$store.state.get_img_path("homesearch.png"),
            homeTopMy_Img: this.$store.state.get_img_path("hometopMy.png"),
            noticeImg: this.$store.state.get_img_path("home_notice.png"),
            noticeText_infoBtn: this.$store.state.get_img_path("home_noticeinfo.png"),
            eightBoxTitleImg: this.$store.state.get_img_path("home_righttitle.png"),
            homeTopSearchInp: "",
            HomeCity_pop_scroller_show: false,
            city: "合肥市",
            ajaxUrl: 'api/shop/getshoplist',
            USERID: 'UserId',
            TOKEN: 'Token',
            TYPEID: 'TypeId',
            lon: 'Lon',
            lat: 'Lat',
            TypeStatus: 0,
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            info: [],
            model: {
                boolSign: false,
                payInfo: false,
                title: '提示',
                ids: '',
                status: ''
            },
            bannerList: [],
            noticeText_info: [
                { Content: '' }
            ],
            noticeText_info_index: 0,
            noticeNum: 0,
            eightNavLists: [],
            NavTitles: [],
            eightNavList: [],
            eightItemsList: {},
            homeManger: []
        }
    },
    computed: {
        eightNavList_split: function() {
            var temArry = [
                [],
                [],
                []
            ];
            this.eightNavLists.forEach(function(item, idx) {
                var i = Math.floor(idx / 4);
                temArry[i].push(item);
            })
            return temArry;
        }

    },
    created() {
        var self = this
		var globalEvent = weex.requireModule('globalEvent');
		globalEvent.addEventListener("geolocation",function(e){
			weex.requireModule('module').printLogs('log3',function (log){})
			weex.requireModule('module').getLocation(function(map) {
			    weex.requireModule('module').printLogs('log4',function (log){})
			    var datas = Util.JsonFormat(map)
				weex.requireModule('module').printLogs('log5',function (log){})
			    self.lon = datas.data.lon
				weex.requireModule('module').printLogs('log6',function (log){})
			    self.lat = datas.data.lat
				weex.requireModule('module').printLogs('log7',function (log){})
			    self.city = datas.data.cityName
				weex.requireModule('module').printLogs('log8',function (log){})
			    self.model.boolSign = false;
				weex.requireModule('module').printLogs('log9',function (log){})
			    Stroage.setItems({
			        "Lon": self.lon,
			        "Lat": self.lat,
			        "CityName": self.city
			    })
				weex.requireModule('module').printLogs('log10',function (log){})
			})
		});
        /* weex.requireModule('storage').getItem(this.lon, event => {
            self.lon = event.data
            weex.requireModule('storage').getItem(this.lat, event => {
                self.lat = event.data
                weex.requireModule('storage').getItem('CityName', event => {
                    if (event.data != 'undefined' && event.data != 'null') {
                        self.city = event.data
                    }
                    if (self.lon === 'undefined' || self.lon === 'Lon' || self.lon === 'null' || self.lat === 'undefined' || self.lat === 'Lon' || self.lat === 'null') {
                        setTimeout(function(){
                            self.model.boolSign = true
                        },2000)
                    } else {
                        self.model.boolSign = false
                    }
                })
            })
        }); */
        // var fontModule = weex.requireModule("dom");
        BusFn.mainFootShow_Fn();
        // fontModule.addRule('fontFace', {
        //     'fontFamily': "iconfont",
        //     'src': 'url(' + this.$store.state.iconUrl + ')'
        // })

        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                weex.requireModule('storage').getItem(self.TYPEID, event => {
                    self.TYPEID = event.data
                    Util.goLogin({
                            "USERID": self.USERID,
                            "TOKEN": self.TOKEN,
                            "success": function() {
                                //self.$router.push({name: 'home'})
                                if (self.TYPEID === '2') {
                                    self.$router.push({
                                        name: 'managerHome'
                                    })
                                }
                            },
                            "fail": function() {
                                self.$router.push({
                                    name: 'login'
                                })
                            }
                        })
						self.onrefresh()
                })
            })
        });
    },
    methods: {
        showCity_pop() {
            this.HomeCity_pop_scroller_show = true;
            BusFn.mainFootHide_Fn();
        },
        hideCity_pop() {
            this.HomeCity_pop_scroller_show = false;
            BusFn.mainFootShow_Fn();
        },
        chooseCity(city) {
            var self = this
			if (self.refreshing) return;
			self.refreshing = true;
            this.HomeCity_pop_scroller_show = false;
            BusFn.mainFootShow_Fn();
            this.city = city.Name;
            Stroage.setItems({
                "CityName": self.city
            })
            Util.WeexAjax({
                url: 'api/recommend/getuserapphome?UserId=' + self.USERID + '&lng=' + self.lon + '&lat=' + self.lat + '&Area=' + self.city,
                method: 'GET',
                type: 'JSON',
                token: self.TOKEN,
                callback: function(ret) {
                    var rets = ret;
                    if (ret.Status == 1) {
                        console.log(ret)
                        //self.NavTitles = rets.obj;
                        self.noticeText_info = ret.obj.NoticeList
                        self.bannerList = ret.obj.BannerList
                        self.noticeNum = ret.obj.NoticeList.length
                        self.NavTitles = ret.obj.RecommendShopList
                        self.homeManger = ret.obj.RecommendManagerList
						self.refreshing = false
                    }
                }
            })
            // todo重新刷新数据源。。。
        },
        toMy() {
            //BusFn.mainJump_Fn('my');
			this.$router.push({
			    name: 'Test'
			})
        },
        onrefresh() {
            var self = this;
            if (self.refreshing) return;
            self.refreshing = true;
			
			//获取城市列表
            Util.WeexAjax({
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
            
            //获取商家分类列表
            Util.WeexAjax({
                url: 'api/demand/getdemandcategorylist',
                method: 'GET',
                type: 'JSON',
                callback: function(ret) {
                    var rets = ret;
                    if (ret.Status == 1) {
                        console.log(rets.obj)
                        self.eightNavLists = rets.obj;
                    }
                }
            })
			
			if(self.USERID !== 'undefined'){
				//获取首页数据
				Util.WeexAjax({
				    url: 'api/recommend/getuserapphome?UserId=' + self.USERID + '&lng=' + self.lon + '&lat=' + self.lat + '&Area=' + self.city,
				    method: 'GET',
				    type: 'JSON',
				    token: self.TOKEN,
				    callback: function(ret) {
				        var rets = ret;
				        if (ret.Status == 1) {
				            console.log(ret)
				            //self.NavTitles = rets.obj;
				            self.noticeText_info = ret.obj.NoticeList
				            self.bannerList = ret.obj.BannerList
				            self.noticeNum = ret.obj.NoticeList.length
				            self.NavTitles = ret.obj.RecommendShopList
				            self.homeManger = ret.obj.RecommendManagerList;
							self.refreshing = false;
				        }
				    }
				})
			}
        },
        shopdetailed($msg = 0, CategoryName) {
            var _this = this;
            if ($msg != 0) {
                _this.$router.push({
                    name: 'shopdetail',
                    params: {
                        ShopId: $msg,
                        CategroyName: CategoryName
                    }
                })
                BusFn.mainFootHide_Fn();
            }
        },
        jumptoFriendsInfo(name) {
            this.$router.push({
                name: 'managerMyfriendsInfo',
                query: {
                    ToUserId: name
                },
            })
            BusFn.mainFootHide_Fn();
        },
        jumptoDemand(msg, id) {
            console.log(msg)
            var _this = this;
            _this.$router.push({
                name: 'categorylist',
                /* params: {
                    CategoryId: id,
                    CategroyName: msg,
                } */
            })
			Stroage.setItems({
			    "CID": id,
			    "CategroyName": msg,
			})
            BusFn.mainFootHide_Fn();
        },
        sure() {
            var self = this
            weex.requireModule('module').getLocation(function(map) {
                /* weex.requireModule("modal").toast({
                    message: map,
                    duration: 2
                }) */
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
        },
        close() {
            this.model.boolSign = false;
        },
    },
    mounted() {
        var _this = this;
        // notice循环
        var noticeTime = setInterval(function() {
            if (_this.noticeText_info_index < _this.noticeNum - 1) {
                _this.noticeText_info_index += 1;
            } else {
                _this.noticeText_info_index = 0;
            }
        }, 3000);
    }
}
</script>
<style scoped>
.iconFont {
    font-family: iconfont;
}

.refresh {
    width: 750px;
    height: 120px;
    background-color: #f5f5f5;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
}

.indicator-text {
    color: #666666;
    font-size: 30px;
    text-align: center;
    margin-top: 16px;
}

.indicator {
    margin-top: 10px;
    height: 40px;
    width: 40px;
    color: #999999;
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

.refresh {
    text-align: center;
}

.loading {
    text-align: center;
}

.banner-wrapper {
    height: 330px;
    width: 750px;
}

.indicators {
    item-color: #ffffff;
    item-selected-color: #ffd262;
    item-size: 20px;
    width: 750px;
    height: 20px;
    position: absolute;
    left: 0;
    bottom: 20px;
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