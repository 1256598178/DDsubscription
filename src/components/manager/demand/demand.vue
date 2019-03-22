<template>
    <div class="wrapper">
        <div class="demandTop">
            <text class="Topname">需求大厅</text>
            <image class="hometopMy" :src="hometopMyImg" style="width:39px;height:39px;" @click="toMy"></image>
        </div>
        <list class="scroller">
            <refresh class="loading" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">下拉刷新...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <cell class="orderListWrapper">
                <div class="listBox">
                    <div class="listItem" v-for="(val,key) in info" v-if="info.length > 0">
                        <div class="itemTop">
                            <div class="itemTipbox itemTopTipbox">
                                <div class="itemImgbox">
                                    <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
                                </div>
                                <text class="itemTipbox_t1">发布时间</text>
                                <text class="itemTipbox_t2">{{val.AddTime}}</text>
                            </div>
                            <div class="itemState">
                                <text class="stateT stateNotDoing">未接单</text>
                            </div>
                        </div>
                        <div class="orderInfo">
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.category" style="width:30px;height:30px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">类别</text>
                                    <text class="itemTipbox_t2">{{val.CategoryName}}</text>
                                </div>
                            </div>
                            <div class="infoItem" v-if="val.TypeID == 1">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.nums" style="width:34px;height:26px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">人数</text>
                                    <text class="itemTipbox_t2">{{val.Number}}人</text>
                                </div>
                            </div>
                            <div class="infoItem" v-if="val.TypeID == 1">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.time" style="width:34px;height:34px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">时间</text>
                                    <text class="itemTipbox_t2">{{val.BeginTime}}-{{val.EndTime}}</text>
                                </div>
                            </div>
                            <div class="infoItem" v-if="val.TypeID == 1">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.addr" style="width:34px;height:32px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">地址</text>
                                    <text class="itemTipbox_t2 messageT">{{val.Address}}</text>
                                </div>
                            </div>
                            <div class="infoItem" v-if="val.TypeID == 1">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.nearby" style="width:34px;height:34px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">附近起止公里数</text>
                                    <text class="itemTipbox_t2">{{val.Distance}}KM</text>
                                </div>
                            </div>
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox messageBoxItem">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.message" style="width:34px;height:29px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">留言</text>
                                    <text class="itemTipbox_t2 messageT">{{val.Message}}</text>
                                </div>
                            </div>
                            <div class="infoItem" v-if="val.TypeID == 1">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">诚意金</text>
                                    <text class="itemTipbox_t2 red">{{val.Money}}元</text>
                                </div>
                            </div>
                            <div class="infoItem" v-if="val.TypeID == 2">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.phone" style="width:30px;height:32px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">手机</text>
                                    <text class="itemTipbox_t2">{{val.Phone}}</text>
                                </div>
                            </div>
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.manager" style="width:32px;height:32px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">客户</text>
                                    <text class="itemTipbox_t2">{{val.NickName}}</text>
                                </div>
                            </div>
                        </div>
                        <div class="handle">
                            <button class="getOrderBtn" @click="open(val.DemandID)">接 单</button>
                        </div>
                    </div>
                    <v-nomore v-if="info.length == 0"></v-nomore>
                </div>
            </cell>
            <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
                <text class="indicator-text">加载更多...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </loading>
        </list>        
        <div class="appraiseCom" v-if="getOrderComr">
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
        <v-toast :img="toastImg" :text="toastText" v-if="openToast" v-on:close="closeTotas"></v-toast>
        <v-loading v-if="temBool.loading"></v-loading>
    </div>
</template>
<script>
import BusFn from '@/components/public/BusFn.js'
import utils from '@/components/public/utils.js'
import toast from '@/components/public/toast.vue'
import NoMore from '@/components/public/NoMore.vue'
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const ajaxUrl = 'api/demand/getmanagerdemandlist'
export default {
    data() {
        return {
            /////////////
            //控制组件显示隐藏 //
            /////////////
            temBool: {
                loading: true,
            },
            TypeStatus: 0,
            Page: 1,
            PageSize: 20,
            CategoryID: 0,
            lon:'Lon',
            lat:'Lat',
            keyword: '',
            info: '',
            Receipt: {
                ManagerUID: '',
                DemandID: ''
            },
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            USERID: 'UserId',
            TOKEN: 'Token',
            hometopMyImg: this.$store.state.get_img_path("hometopmy.png"),
            getOrderComr: false,
            hasMore: true,
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
                phone: this.$store.state.get_img_path("oderlist12.png"),
                cuo: this.$store.state.get_img_path("cuo.png"),
            },
            statesList: {
                notDoing: {
                    name: '未接单',
                    handles: {
                        handleItem_change: '修改',
                        handleItem_delete: '删除'
                    }
                },
                doing: {
                    name: '已接单',
                    handles: {
                        handleItem_end: '完单'
                    }
                },
                ending: {
                    name: '已完成',
                    handles: {
                        handleItem_star: '评价'
                    }
                }
            },
            toastImg: {
                url: this.$store.state.get_img_path("ok.png"),
                width: '96px',
                height: '74px'
            },
            toastText: "接单成功",
            openToast: false,
        }
    },
    components: {
        "v-toast": toast,
        "v-nomore": NoMore,
    },
    created() {
        BusFn.mainFootShow_Fn();

        var _this = this;
        weex.requireModule('storage').getItem(this.USERID, event => {
            _this.USERID = event.data
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                _this.TOKEN = event.data
                    weex.requireModule('storage').getItem(this.lon,event => {
                        _this.lon = event.data
                        weex.requireModule('storage').getItem(this.lat,event => {
                            _this.lat = event.data
                            utils.goLogin({
                                "USERID": _this.USERID,
                                "TOKEN": _this.TOKEN,
                                "success": function() {
                                    _this.getinfo({
                                        "Page": _this.Page,
                                        "PageSize": _this.PageSize,
                                        "CategoryID": _this.CategoryID,
                                        "lon": _this.lon,
                                        "lat": _this.lat,
                                        "keyword": _this.keyword,
                                        "UserId": _this.USERID,
                                        Fn: function(ret) {
                                            _this.temBool.loading = false;
                                            if(ret.Status == 1){
                                                _this.info = ret.obj.Items;
                                            }
                                        }
                                    });
                                },
                                "fail": function() {
                                    _this.$router.push({ name: 'login' })
                                }
                            })
                        })
                    })
            })
        });
        // weex.requireModule('globalEvent').addEventListener('androidback', function(e) {
        //     if (_this.TypeStatus === 0) {
        //         _this.TypeStatus = 1
        //         weex.requireModule('modal').toast({
        //             message: '再点一次退出程序',
        //             duration: 3
        //         })
        //         setTimeout(function() {
        //             _this.TypeStatus = 0
        //         }, 3000)
        //     } else if (_this.TypeStatus === 1) {
        //         weex.requireModule('close').closeApp()
        //     }

        // })
        // utils.WeexAjax()
        // this.Page=1;

    },
    methods: {
        getinfo(obj) {
            var that = this;
            utils.WeexAjax({
                url: ajaxUrl + '?Page=' + obj.Page + '&PageSize=' + obj.PageSize + '&CategoryID=' + obj.CategoryID + '&lng=' + obj.lon + '&lat=' + obj.lat + '&keyword=' + obj.keyword + '&UserId=' + obj.UserId,
                method: 'GET',
                type: 'JSON',
                token: that.TOKEN,
                callback: function(ret) {
                    // let rets = utils.JsonFormat(ret);
                    obj.Fn(ret);
                    console.log(ret)
                }
            })
        },
        onrefresh() {
            var _this = this;
            if (this.refreshing) return;
            this.refreshing = true;
            _this.Page = 1;
            _this.hasMore = true;
            _this.getinfo({
                "Page": _this.Page,
                "PageSize": _this.PageSize,
                "CategoryID": _this.CategoryID,
                "lon": _this.lon,
                "lat": _this.lat,
                "keyword": _this.keyword,
                "UserId": _this.USERID,
                Fn: function(ret) {
                    if(ret.Status == 1){
                        _this.info = ret.obj.Items;
                        _this.refreshing = false;
                    }
                }
            });
        },
        onloading() {
            this.loadinging = true;
            var _this = this
            if (this.hasMore)
                _this.Page++;
            utils.goLogin({
                "USERID": _this.USERID,
                "TOKEN": _this.TOKEN,
                "success": function() {
                    _this.getinfo({
                        "Page": _this.Page,
                        "PageSize": _this.PageSize,
                        "CategoryID": _this.CategoryID,
                        "lon": _this.lon,
                        "lat": _this.lat,
                        "keyword": _this.keyword,
                        "UserId": _this.USERID,
                        Fn: function(ret) {
                            if (ret.obj.Items.length <= 0) {
                                this.hasMore = false;
                                weex.requireModule("modal").toast({
                                    message: '没有更多数据了',
                                    duration: 1
                                })
                            } else {
                                for (var item in ret.obj.Items) {
                                    _this.info.push(ret.obj.Items[item])
                                }
                            }
                            _this.loadinging = false;
                            console.log(_this.info);
                        }
                    });
                },
                "fail": function() {
                    _this.$router.push({ name: 'login' })
                }
            })
        },
        toMy() {
            BusFn.mainJump_Fn('MydemandListStandard');
            BusFn.mainFootHide_Fn();
        },
        open(msg) {
            this.getOrderComr = true;
            this.Receipt.DemandID = msg;
            console.log(msg)
        },
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
                                    // console.log(_this.info)
                                    for (var item in _this.info) {
                                        if (_this.info[item].DemandID == _this.Receipt.DemandID) {
                                            // 本地动态删除对应接单项
                                            _this.info.splice(item, 1)
                                            // console.log(_this.info)
                                        }
                                    }
                                    // let rets = utils.JsonFormat(ret);
                                }
                                console.log(ret);
                                // _this.info = ret.obj.Items;
                                // console.log(_this.info)
                            }
                        })
                    }
                },
                "fail": function() {
                    _this.$router.push({ name: 'login' })
                }
            })
            this.getOrderComr = false;
        },
        closeTotas() {
            this.openToast = false;
            console.log(2)
        }
    }
}
</script>
<style scoped>

.indicator-text {
    color: #666666;
    font-size: 30px;
    text-align: center;
    margin-top: 16px;
}

.indicator {
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

.demandTop {
    height: 90px;
    border-bottom-color: #e5e5e5;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    align-items: center;
}

.Topname {
    text-align: center;
    font-size: 42px;
    color: #333333;
    line-height: 88px;
}

.hometopMy {
    position: absolute;
    right: 20px;
    top: 25px;
}


.scroller {
    position: fixed;
    top: 90px;
    bottom: 120px;
    left: 0px;
}

.orderListWrapper {
    width: 750px;
    padding-left: 20px;
    padding-right: 20px;
}

.listItem {
    border-style: solid;
    border-color: #e8e8e8;
    border-width: 2px;
    padding-left: 18px;
    padding-right: 18px;
    padding-top: 18px;
    padding-bottom: 18px;
    margin-top: 20px;
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
    align-items: baseline;
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

.t2Box {
    flex: 2;
    margin-left: 18px;
}

.itemTipbox_t2 {
    font-size: 28px;
    color: #777777;
    margin-left: 18px;
    line-height: 40px;
    flex: 2;
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

.stateNotDoing {
    background-color: #d86060;
}

.red {
    color: #ff6204;
}

.infoItem {
    margin-top: 20px;
}

.managerInfo {
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #e8e8e8;
    margin-top: 20px;
}

.handle {
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #e8e8e8;
    margin-top: 20px;
    height: 91px;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
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

.stateDoing {
    background-color: #66a773;
}

.statePersonInfo {
    background-color: #853f81;
    margin-left: 25px;
}

/* .noflexGrow{flex:inherit;} */
.stateEnding {
    background-color: #e77a32;
}

.t2StarsBox {
    flex: 2;
    margin-left: 18px;
}

.itemTipbox_t2_starts {
    margin-top: 15px;
    font-size: 28px;
    color: #777777;
    line-height: 40px;
}

.starWrap {
    color: #000000;
}

.alignTop {
    align-items: flex-start;
}

.getOrderBtn {
    padding: 15px 50px;
    background-color: #ffd700;
    border-radius: 10px;
    margin-top: 20px;
}


.iconFont {
    font-family: iconfont;
}

.starList {
    flex-direction: row;
}

.star {
    font-size: 35px;
    line-height: 35px;
    padding-right: 15px;
    color: #333333;
}

.staron {
    color: #ffd262;
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

.starList {
    margin-left: 35px;
}

.textarea {
    height: 300px;
    ;
    border-color: #dcdcdc;
    border-style: solid;
    border-width: 1px;
    border-radius: 7px;
    padding-top: 15px;
    padding-left: 10px;
    padding-bottom: 15px;
    padding-right: 10px;
    color: #333333;
    font-size: 26px;
    line-height: 33px;
    margin-top: 20px;
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
</style>