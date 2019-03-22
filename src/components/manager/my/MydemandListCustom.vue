<template>
    <div>
        <list class="scroller">
            <refresh class="loading" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">下拉刷新...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <cell class="orderListWrapper">
                <div class="listBox">
                    <div class="listItem" v-for="(val,index) in DmandList" v-if="DmandList.length > 0">
                        <div class="itemTop">
                            <div class="itemTipbox itemTopTipbox">
                                <div class="itemImgbox">
                                    <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
                                </div>
                                <text class="itemTipbox_t1">发布时间</text>
                                <text class="itemTipbox_t2">{{val.AddTime}}</text>
                            </div>
                            <div class="itemState">
                                <!--  -->
                                <text class="stateT" :class="[val.Status == '未联系' ? 'stateDoing' : 'stateEnding']">{{val.Status}}</text>
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
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox messageBoxItem">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.message" style="width:34px;height:29px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">留言</text>
                                    <text class="itemTipbox_t2 messageT">{{val.Message}}</text>
                                </div>
                            </div>
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox messageBoxItem">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.phone" style="width:34px;height:29px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">手机</text>
                                    <text class="itemTipbox_t2 messageT">{{val.Phone}}</text>
                                </div>
                            </div>
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.manager" style="width:30px;height:30px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">客户</text>
                                    <text class="itemTipbox_t2 itemTipbox_tm noflexGrow">{{val.NickName}}</text>
                                    <text class="stateT statePersonInfo" @click="look(val.UserId)">查看TA</text>
                                </div>
                            </div>
                        </div>
                        <div class="managerInfo">
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">接单时间</text>
                                    <text class="itemTipbox_t2">{{val.OrderTime}}</text>
                                </div>
                            </div>
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">成交金额</text>
                                    <text class="itemTipbox_t2 red">{{val.PayMoney}}元</text>
                                </div>
                            </div>
                            <div class="infoItem">
                                <div class="itemTipbox itemTopTipbox messageBoxItem">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.message" style="width:34px;height:29px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">方案</text>
                                    <text class="itemTipbox_t2 messageT">{{val.Programme}}</text>
                                </div>
                            </div>
                            <div class="infoItem" v-if="val.Status == '已评价'">
                                <div class="itemTipbox itemTopTipbox alignTop">
                                    <div class="itemImgbox">
                                        <image :src="oderListImg.stars" style="width:29px;height:29px;"></image>
                                    </div>
                                    <text class="itemTipbox_t1">服务评价</text>
                                    <div class="t2StarsBox">
                                        <div class="starWrap">
                                            <vstars :starNums="val.Score"></vstars>
                                        </div>
                                        <text class="itemTipbox_t2_starts">{{val.Comment}}</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="handle">
                            <!-- rightBMP0 -->
                            <text class="handleItem" :class="[val.showStatus == true ? 'handleItem_programme' : 'handleItem_act']" @click="prome(index)">方案</text>
                            <text class="handleItem handleItem_star" @click="handleItem_change(val.DemandID)">跟单</text>
                            <text class="handleItem rightBMP0" :class="[val.showStatus == true ? 'handleItem_delete' : 'handleItem_act']" @click="signUp(index)">状态</text>
                        </div>
                    </div>
                    <v-nomore v-if="DmandList.length == 0"></v-nomore>
                </div>
            </cell>
            <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
                <text class="indicator-text">加载更多...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </loading>
        </list>
        <div class="model-box" v-if="model.boolSign">
            <div class="model-wrapper">
                <image class="model-close" :src="oderListImg.cuo" @click="close()"></image>
                <text class="model-title">{{model.title}}</text>
                <div class="model-pay-wrapper">
                    <div class="model-pay-list" v-for="(item,childindex) in modelStatus.payment" :key="childindex" @click="selectPay(childindex)">
                        <text class="pay-title">{{item.name}}</text>
                        <image class="pay-dui" :src="modelStatus.selectName == item.name ? modelStatus.select : modelStatus.unselect"></image>
                    </div>
                </div>
                <div class="model-bottom-btn-wrapper">
                    <text class="model-bottom-btn model-bottom-btn-left" @click="sure()">确定</text>
                </div>
            </div>
        </div>
        <v-programme v-if="programmeShow" v-bind:DemandID="DemandId" v-bind:USERID="USERID" v-bind:TOKEN="TOKEN" v-bind:Content="Programme" v-on:transmitCustom="transmitCustoms"></v-programme>
        <vappraise v-if="addrecordShow"></vappraise>
        <v-toast :img="toastImg" :text="toastText" v-if="openToast" v-on:close="closeTotas"></v-toast>
        <v-loading v-if="temBool.loading"></v-loading>
    </div>
</template>
<script>
import stars from '@/components/public/stars.vue'
import appraise from '@/components/public/appraise.vue'
import addrecord from '@/components/public/addrecord.vue'
import programme from '@/components/public/programme.vue'
import NoMore from '@/components/public/NoMore.vue'
import toast from '@/components/public/toast.vue'
import Bus from '@/components/public/Bus.js'
import BusFn from '@/components/public/BusFn.js'
import utils from '@/components/public/utils.js'
const UPDATESTATUS_URL = 'api/demand/updateOrderStatus'
export default {
    components: {
        vstars: stars,
        vappraise: appraise,
        "vappraise": addrecord,
        "v-programme": programme,
        "v-toast": toast,
        "v-nomore": NoMore,
    },
    data() {
        return {
            /////////////
            //控制组件显示隐藏 //
            /////////////
            temBool: {
                loading: true,
            },
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            hasMore: true,
            addrecordShow: false,
            programmeShow: false,
            lon:'Lon',
            lat:'Lat',
            USERID: 'UserId',
            TOKEN: 'Token',
            TypeId: '2',
            ajaxUrl: 'api/demand/getmanagermydemandlist',
            DmandList: [],
            DemandId: 0,
            // 方案内容
            Programme: '',
            // 方案索引
            ProgrammeIndex: 0,
            model: {
                boolSign: false,
                payInfo: false,
                title: '状态变更',
            },
            Receipt: {
                index: 0,
                name: '',
                Status: '',
                DemandID: ''
            },
            modelStatus: {
                boolSign: false,
                payInfo: false,
                selectName: '未联系',
                title: '提示',
                select: this.$store.state.get_img_path('dui.png'),
                unselect: this.$store.state.get_img_path('quans.png'),
                payment: [{
                    "status": "1",
                    "name": '未联系',
                }, {
                    "status": "2",
                    "name": '已联系',
                }, {
                    "status": "3",
                    "name": '报价中',
                }, {
                    "status": "4",
                    "name": '已签约',
                }, {
                    "status": "5",
                    "name": '服务中',
                }, {
                    "status": "6",
                    "name": '已完成',
                }, {
                    "status": "7",
                    "name": '已搁置',
                }, {
                    "status": "10",
                    "name": '已放弃',
                }]
            },
            appraiseShow: false,
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
                phone: this.$store.state.get_img_path("oderlist12.png"),
            },
            Page: 1, //页数
            PageSize: 10, //每页多少
            statesList: {
                notDoing: {
                    name: '未接单',
                    handles: {
                        handleItem_change: '跟单',
                        handleItem_delete: '状态'
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
            toastText: "方案更改成功",
            openToast: false,
        }
    },
    methods: {
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
        handleItem_star() {
            this.appraiseShow = true;
        },
        handleItem_change(msg) {
            console.log(msg)
            this.$router.push({
                name: 'managerMydocumentary',
                query: {
                    "DemandId": msg
                }
            }) //跟单记录
        },
        getinfo_stand(obj) {
            var that = this;
            var ajaxUrl = 'api/demand/getmanagermydemandlist?Page=' + obj.Page + '&PageSize=' + obj.PageSize + '&TypeId=' + obj.TypeId + '&lng=' + obj.lon + '&lat=' + obj.lat + '&UserId=' + obj.USERID;
            utils.WeexAjax({
                url: ajaxUrl,
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
        signUp(index) {
            if (this.DmandList[index].showStatus) {
                this.model.boolSign = true;
                this.Receipt.index = index;
                this.Receipt.DemandID = this.DmandList[index].DemandID;
                this.modelStatus.selectName = this.DmandList[index].Status
            }
        },
        close() {
            this.model.boolSign = false;
        },
        sure() {
            this.model.boolSign = false;
            var self = this;
            utils.WeexAjax({
                url: UPDATESTATUS_URL,
                method: 'POST',
                type: 'JSON',
                token: self.TOKEN,
                body: {
                    "UserId": self.USERID,
                    "DemandId": self.Receipt.DemandID,
                    "Status": self.Receipt.Status,
                },
                callback: function(ret) {
                    if (ret.Status == 1) {
                        // console.log(self.modelStatus.payment[self.Receipt.Status - 1].name)
                        self.DmandList[self.Receipt.index].Status = self.Receipt.name
                        self.modelStatus.selectIndex = parseInt(self.Receipt.Status) - 1;
                        if (self.Receipt.name == '已完成' || self.Receipt.name == '已搁置' || self.Receipt.name == '已放弃') {
                            self.DmandList[self.Receipt.index].showStatus = false;
                        }
                        // 打开弹窗
                        self.toastText = '状态更改成功'
                        self.openToast = true;
                        console.log(self.modelStatus.selectIndex + '---' + self.Receipt.Status)
                    } else {
                        weex.requireModule("modal").toast({
                            message: '更改错误',
                            duration: 1
                        })
                    }
                    console.log(ret)
                }
            })
        },
        cancel() {
            this.model.boolSign = false;
        },
        selectPay(msg) {
            this.modelStatus.selectIndex = msg;
            this.modelStatus.selectName = this.modelStatus.payment[msg].name;
            console.log(this.modelStatus.payment[msg].status + '---' + this.modelStatus.payment[msg].name)
            this.Receipt.Status = this.modelStatus.payment[msg].status;
            this.Receipt.name = this.modelStatus.payment[msg].name;
            // this.$refs[msg].children[1]
        },
        onrefresh() {
            var _this = this;
            if (this.refreshing) return;
            this.refreshing = true;
            _this.Page = 1;
            _this.hasMore = true;
            _this.getinfo_stand({
                "Page": _this.Page,
                "PageSize": _this.PageSize,
                "TypeId": _this.TypeId,
                "lon": _this.lon,
                "lat": _this.lat,
                "USERID": _this.USERID,
                Fn: function(ret) {
                    if (ret.Status == 1) {
                        _this.DmandList = ret.obj.Items
                        _this._showStatusFn()
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
                    _this.getinfo_stand({
                        "Page": _this.Page,
                        "PageSize": _this.PageSize,
                        "TypeId": _this.TypeId,
                        "lon": _this.lon,
                        "lat": _this.lat,
                        "USERID": _this.USERID,
                        Fn: function(ret) {
                            if (ret.obj.Items.length <= 0) {
                                this.hasMore = false;
                                weex.requireModule("modal").toast({
                                    message: '没有更多数据了',
                                    duration: 1
                                })
                            } else {
                                for (var item in ret.obj.Items) {
                                    _this.DmandList.push(ret.obj.Items[item])
                                }
                                _this._showStatusFn()
                            }
                            _this.loadinging = false;
                        }
                    });
                },
                "fail": function() {
                    _this.$router.push({ name: 'login' })
                }
            })
        },
        prome(index) {
            if (this.DmandList[index].showStatus) {
                this.ProgrammeIndex = index
                this.DemandId = this.DmandList[index].DemandID;
                this.Programme = this.DmandList[index].Programme
                this.programmeShow = true;
            }
        },
        _showStatusFn() {
            var self = this
            for (var item in self.DmandList) {
                if (self.DmandList[item].Status == '已完成' || self.DmandList[item].Status == '已搁置' || self.DmandList[item].Status == '已放弃' || self.DmandList[item].Status == '已确认' || self.DmandList[item].Status == '已评价') {
                    self.DmandList[item].showStatus = false;
                } else {
                    self.DmandList[item].showStatus = true;
                }
            }
        },
        transmitCustoms(data) {
            console.log(data)
            this.Programme = data;
            this.DmandList[this.ProgrammeIndex].Programme = this.Programme
            // 打开弹窗
            this.toastText = '方案更改成功'
            this.openToast = true;
        },
        closeTotas() {
            this.openToast = false;
        }
    },
    created() {
        BusFn.mainFootHide_Fn();
        var _this = this
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
                                _this.getinfo_stand({
                                    "Page": _this.Page,
                                    "PageSize": _this.PageSize,
                                    "TypeId": _this.TypeId,
                                    "lon": _this.lon,
                                    "lat": _this.lat,
                                    "USERID": _this.USERID,
                                    Fn: function(ret) {
                                        if (ret.Status == 1) {
                                            _this.DmandList = ret.obj.Items
                                            _this._showStatusFn()
                                            console.log(_this.DmandList)
                                            _this.temBool.loading = false;
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
        //     _this.$router.back(-1);
        // })
    },
    mounted() {
        var _this = this;
        Bus.$on('appraiseShowToFalse', function() {
            _this.appraiseShow = false;
        })
        Bus.$on('programmeShowToFalse', function() {
            _this.programmeShow = false;
        })
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

.scroller {
    position: fixed;
    top: 200px;
    bottom: 0px;
    width: 750px;
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

.itemTipbox_tm {
    flex: none;
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

.handleItem_act {
    color: #999;
}

.handleItem_end {
    color: #3381a9;
}

.handleItem_star {
    color: #ffb400;
}

.handleItem_programme {
    color: #226852;
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
</style>