<template>
    <div class="act">
        <div class="headerBox_G">
            <text class="headerBox_G_pageTip">活动详情</text>
            <image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
        </div>
        <div class="act-nav">
            <text class="act-nav-font act-nav-crt" @click="mtdetail">活动详情</text>
            <text class="act-nav-font " @click="myrecord">报名记录</text>
        </div>
        <!-- <v-header :title="活动详情"></v-header> -->
        <list>
            <cell>
                <text class="act-t1">{{form.ActionName}}</text>
                <div class="act-t2">
                    <div class="act-t2-content">
                        <text class="act-t2-text">限</text><text class="act-t2-text-ac">{{form.LimitPersons}}</text><text class="act-t2-text">人</text>
                    </div>
                    <div class="act-t2-content">
                        <text class="act-t2-text">最低</text><text class="act-t2-text-ac">{{form.BottomPrice}}</text><text class="act-t2-text">元</text>
                    </div>
                    <div class="act-t2-content">
                        <text class="act-t2-text">{{form.RegionName}}</text>
                    </div>
                </div>
                <div class="act-t2-info-wrapper">
                    <div class="act-t2-info">
                        <image class="act-t2-info-show" :src="t1"></image>
                        <text class="act-t2-info-title">参与时间</text>
                        <text class="act-t2-info-content">{{form.StartTime}}-{{form.EndTime}}</text>
                    </div>
                    <div class="act-t2-info">
                        <image class="act-t2-info-show" :src="t2"></image>
                        <text class="act-t2-info-title">活动地址</text>
                        <text class="act-t2-info-content">{{form.Address}}</text>
                    </div>
                    <div class="act-t2-info">
                        <image class="act-t2-info-show" :src="t3"></image>
                        <text class="act-t2-info-title">参与方式</text>
                        <text class="act-t2-info-content">{{form.PartInName}}</text>
                    </div>
                    <div class="act-t2-info">
                        <image class="act-t2-info-show" :src="t4"></image>
                        <text class="act-t2-info-title">所属经理人</text>
                        <text class="act-t2-info-content">{{form.OwnManager}}</text>
                    </div>
                    <!-- <div class="btn-box">
                        <text class="baoming-btn" @click="signUp()" v-if="hasBM">我要报名</text>
                        <text class="baoming-btn noclickBtn" v-if="!hasBM">已报名</text>
                    </div> -->
                </div>
                <text class="act-t1 act-t3">活动详情</text>
                <div class="act-image-box">
                    <image class="act-t3-image" :src="t5"></image>
                </div>
                <div class="clearon"></div>
                <div class="model-box" v-if="model.boolSign">
                    <div class="model-wrapper">
                        <image class="model-close" :src="cuo" @click="close()"></image>
                        <text class="model-title">{{model.title}}</text>
                        <text class="model-subtitle" v-if="!model.payInfo">请确认是否报名？</text>
                        <div class="model-pay-wrapper" v-if="model.payInfo">
                            <div class="model-pay-list" @click="selectPay('alipay')" ref="alipay">
                                <div class="model-pay-list-left">
                                    <image class="pay-image" :src="model.payment.alipayImage"></image>
                                    <text class="pay-title">{{model.payment.alipay}}</text>
                                </div>
                                <image class="pay-dui" :src="model.payment.alipayselect"></image>
                            </div>
                            <div class="model-pay-list" @click="selectPay('wechat')" ref="wechat">
                                <div class="model-pay-list-left">
                                    <image class="pay-image" :src="model.payment.wechatImage"></image>
                                    <text class="pay-title">{{model.payment.wechat}}</text>
                                </div>
                                <image class="pay-dui" :src="model.payment.wechatselect"></image>
                            </div>
                            <div class="model-pay-list">
                                <div class="model-pay-list-left">
                                    <image class="pay-image" :src="model.payment.moneyImaeg"></image>
                                    <text class="pay-title">支付金额</text>
                                </div>
                                <text class="model-pay-money">{{model.payment.money}}</text>
                            </div>
                        </div>
                        <div class="model-bottom-btn-wrapper">
                            <text class="model-bottom-btn model-bottom-btn-left" @click="sure()">确定</text>
                            <text class="model-bottom-btn model-bottom-btn-right" @click="cancel()">取消</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <v-loading v-if="temBool.loading"></v-loading>
    </div>
</template>
<script>
const animation = weex.requireModule('animation');
import header from '../../public/header'
import Bus from '@/components/public/Bus.js'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
export default {
    data() {
        return {
            /////////////
            //控制组件显示隐藏 //
            /////////////
            temBool: {
                loading: true,
            },
            headerBox_G_toBack: this.$store.state.get_img_path("toback.png"),
            actImg: this.$store.state.get_img_path("act-img01.png"),
            clock: this.$store.state.get_img_path("clock.png"),
            t1: this.$store.state.get_img_path("oderlist4.png"),
            t2: this.$store.state.get_img_path("oderlist5.png"),
            t3: this.$store.state.get_img_path("oderlist14.png"),
            t4: this.$store.state.get_img_path("oderlist9.png"),
            // t5:this.$store.state.get_img_path("t5.png"),
            t5: '', //活动图片
            cuo: this.$store.state.get_img_path("cuo.png"),
            code: this.$store.state.get_img_path("code.png"),
            ajaxUrl: 'api/action/getactiondetail',
            ajaxUrl2: 'api/action/partinaction',
            ajaxUrl3: 'api/action/ispartinaction',
            USERID: 'UserId',
            TOKEN: 'Token',
            hasBM: true,
            actionId: '',
            model: {
                boolSign: false,
                payInfo: false,
                title: '提示',
                payment: {
                    alipay: '支付宝',
                    alipayImage: this.$store.state.get_img_path('d1.png'),
                    alipayselect: this.$store.state.get_img_path('dui.png'),
                    wechat: '微信',
                    wechatImage: this.$store.state.get_img_path('d2.png'),
                    wechatselect: this.$store.state.get_img_path('quans.png'),
                    money: '金额获取中',
                    moneyImaeg: this.$store.state.get_img_path('d3.png'),
                    select: this.$store.state.get_img_path('dui.png'),
                    unselect: this.$store.state.get_img_path('quans.png')
                }
            },
            form: {
                ActionName: '',
                LimitPersons: '',
                BottomPrice: '',
                RegionName: '',
                StartTime: '',
                EndTime: '',
                Address: '',
                PartInName: '',
                OwnManager: '',
                PartInType: ''
            }
        }
    },
    methods: {
        toBack_G() {
            this.$router.push({ name: 'managerMypersonalActivities' });
        },
        mtdetail() {
            this.$router.push({ name: 'managerMyactdet' })
        },
        myrecord() {
            this.$router.push({
                name: 'managerMyEntryrecord',
                params: {
                    actionId: this.actionId
                }
            })
        },
        signUp() {
            this.model.boolSign = true;
        },
        close() {
            this.model.boolSign = false;
            this.model.payInfo = false;
        },
        sure() {
            if (!this.model.payInfo) {
                this.model.payInfo = true;
                this.model.title = '报名支付';
            } else {
                // todo  参与活动
                var self = this;
                Util.WeexAjax({
                    url: self.ajaxUrl2,
                    method: 'POST',
                    type: 'JSON',
                    token: self.TOKEN,
                    body: {
                        "UserId": self.USERID,
                        "ActionId": self.actionId,
                        "PartInType": self.form.PartInType
                    },
                    callback: function(ret) {
                        var rets = ret;
                        if (ret.Status == 1) {
                            console.log(rets)
                            self.hasBM = false;
                            self.model.boolSign = false;
                            self.model.payInfo = false;
                        } else {
                            Util.modalPanel(ret.Message, 1)
                        }
                    }
                })
            }
        },
        cancel() {
            this.model.boolSign = false;
            this.model.payInfo = false;
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
    },
    created() {
        var self = this
        this.actionId = this.$route.params.actionId
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            console.log(event.data);
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                Util.WeexAjax({
                    url: this.ajaxUrl + '?UserId=' + self.USERID + '&ActionId=' + self.actionId,
                    method: 'GET',
                    type: 'JSON',
                    token: self.TOKEN,
                    callback: function(ret) {
                        var rets = ret;
                        if (ret.Status == 1) {
                            console.log('111', rets)
                            //self.actionList=rets.obj
                            self.form.ActionName = rets.obj.ActionName
                            self.form.LimitPersons = rets.obj.LimitPersons
                            self.form.BottomPrice = rets.obj.BottomPrice
                            self.form.RegionName = rets.obj.RegionName
                            self.form.StartTime = rets.obj.StartTime
                            self.form.EndTime = rets.obj.EndTime
                            self.form.Address = rets.obj.Address
                            self.form.OwnManager = rets.obj.OwnManager
                            self.form.PartInName = rets.obj.PartInName
                            self.form.PartInType = rets.obj.PartInType
                            self.t5 = rets.obj.ImageUrl
                            self.model.payment.money = rets.obj.BottomPrice
                            self.temBool.loading = false;
                        }
                    }
                })
                // 获取是否已参加活动
                Util.WeexAjax({
                    url: this.ajaxUrl3 + '?UserId=' + self.USERID + '&ActionId=' + self.actionId,
                    method: 'GET',
                    type: 'JSON',
                    token: self.TOKEN,
                    callback: function(ret) {
                        var rets = ret;
                        if (ret.Status == 1) {
                            console.log('11111', rets)
                            if (rets.obj.IsPartin == 1) {
                                self.hasBM = false;
                            }
                        }
                    }
                })
            })
        });
    },
    components: {

    },
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

.headerBox_G_toBack {
    position: absolute;
    left: 20px;
    top: 22px;
}

.headerBox_G_pageTip {
    color: #333333;
    font-size: 36px;
    line-height: 88px;
    text-align: center;
}

.act-nav {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 27px;
    padding-bottom: 27px;
    flex-direction: row;
    justify-content: center;
}

.act-nav-font {
    font-size: 32px;
    line-height: 52px;
    color: #777;
    margin-left: 25px;
    margin-right: 25px;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
}

.act-nav-crt {
    font-weight: bold;
    color: #ffd262;
    border-bottom-color: #ffd262;
}

.act-t1 {
    padding-left: 20px;
    padding-right: 20px;
    line-height: 85px;
    font-size: 34px;
    color: #333333;
    border-bottom-width: 1px;
    border-bottom-color: #dcdcdc;
    border-bottom-style: solid;
}

.act-t2 {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 22px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.act-t2-content {
    margin-right: 29px;
    display: flex;
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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 23px;
}

.act-t2-info-show {
    width: 34px;
    height: 34px;
    margin-right: 26px;
}

.act-t2-info-title {
    font-size: 30px;
    color: #333333;
    margin-right: 20px;
}

.act-t2-info-content {
    font-size: 30px;
    color: #777777;
    flex: 1;
}

.btn-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 55px;
}

.baoming-btn {
    width: 710px;
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
    height: 975px;
}

.model-box {
    position: fixed;
    display: flex;
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
    marign-bottom: 20px;
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
    display: flex;
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
    display: flex;
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
    display: flex;
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

.clearon {
    padding-bottom: 90px;
}

.noclickBtn {
    background-color: #ccc;
    color: #333333;
}

#grad {
    background: -webkit-linear-gradient(left, #ffd700, #ffe9b0);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #ffd700, #ffe9b0);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #ffd700, #ffe9b0);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #ffd700, #ffe9b0);
    /* 标准的语法 */

}
</style>