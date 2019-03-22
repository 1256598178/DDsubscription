<template>
    <div class="act">
        <list>
            <cell>
                <div class="my-title-bg">
                    <image class="my-title-bgImage" :src="titBg" :placeholder="slotimg"></image>
                    <text class="my-title-text" style="font-weight: bold;">我的</text>
                    <div class="my-heart-box">
                        <image class="my-heart-box-image" :src="UserInfo.HeadImageUrl"></image>
                        <text class="my-heart-box-name">{{UserInfo.NickName}}</text>
                        <text class="my-heart-box-subname">经理人</text>
                        <div class="my-heart-box-subname mt-heart-box-contart">
                            <text class="my-hear-box-thetime">合同有效期:2019-10-10</text>
                            <div class="my-hear-box-look">
                                <text class="my-heart-look-contart">查看合同</text>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-demand-box">
                    <div class="my-demand-balance-box">
                        <div class="my-demand-balance-list my-demand-balance-list-left" @click="mymoney">
                            <text class="my-demand-balance-list-title">账户余额(元)</text>
                            <text class="my-demand-balance-list-num">{{UserInfo.BalanceNum | toFixeds}}</text>
                        </div>
                        <div class="my-demand-balance-list" @click="mystock">
                            <text class="my-demand-balance-list-title">存酒(瓶)</text>
                            <text class="my-demand-balance-list-num">{{UserInfo.WineNumb}}</text>
                        </div>
                    </div>
                    <div class="my-demand-active-box">
                        <div class="my-demand-active-box-list" @click="myneeds">
                            <image class="my-demand-active-box-list-image" :src="a1" :placeholder="slotimg"></image>
                            <text class="my-demand-active-box-list-name">我的需求</text>
                            <div class="my-demand-active-box-list-num-box">
                                <text class="my-demand-active-box-list-num-text my-demand-active-box-list-num-textleft">{{UserInfo.DemandNum}}</text><text class="my-demand-active-box-list-num-text">个</text>
                            </div>
                        </div>
                        <div class="my-demand-active-box-list" @click="myact">
                            <image class="my-demand-active-box-list-image" :src="a2" :placeholder="slotimg"></image>
                            <text class="my-demand-active-box-list-name">我的活动</text>
                            <div class="my-demand-active-box-list-num-box">
                                <text class="my-demand-active-box-list-num-text my-demand-active-box-list-num-textleft">{{UserInfo.ActivitiesNum}}</text><text class="my-demand-active-box-list-num-text">个</text>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info-box">
                    <div class="info-box-list" @click="personalinfo">
                        <div class="info-box-list-left-box">
                            <image class="info-box-list-left-image" :src="s2"></image>
                            <text class="info-box-list-left-text">个人信息</text>
                        </div>
                        <div class="info-box-list-left-box">
                            <image class="info-box-list-right-image" :src="left"></image>
                        </div>
                    </div>
                    <div class="info-box-list" @click="aboutus">
                        <div class="info-box-list-left-box">
                            <image class="info-box-list-left-image" :src="s3"></image>
                            <text class="info-box-list-left-text">关于我们</text>
                        </div>
                        <div class="info-box-list-left-box">
                            <image class="info-box-list-right-image" :src="left"></image>
                        </div>
                    </div>
                    <div class="info-box-list" @click="login">
                        <div class="info-box-list-left-box">
                            <image class="info-box-list-left-image" :src="s4"></image>
                            <text class="info-box-list-left-text">退出登录</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<script>
import utils from '@/components/public/utils.js'
import BusFn from '@/components/public/BusFn.js'
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
const GETUSERINFO_URL = 'api/account/getuserinfo'
const GETHOMEPAGE_URL = 'api/account/getmyhomepage'
export default {

    data() {
        return {
            TypeStatus: 0,
            USERID: 'UserId',
            TOKEN: 'Token',
            UserInfo: {
                NickName: '', //用户名
                HeadImageUrl: '', //头像
                BalanceNum: 0, //账户余额
                DemandNum: 0, //需求数量
                WineNumb: 0, //存酒数量
                ActivitiesNum: 0, //活动数量
            },
            titBg: this.$store.state.get_img_path("titbg.png"),
            tit: this.$store.state.get_img_path("tit.png"),
            s1: this.$store.state.get_img_path("s1.png"),
            left: this.$store.state.get_img_path("left.png"),
            s2: this.$store.state.get_img_path("s2.png"),
            s3: this.$store.state.get_img_path("s3.png"),
            s4: this.$store.state.get_img_path("s4.png"),
            a1: this.$store.state.get_img_path("a1.png"),
            a2: this.$store.state.get_img_path("a2.png"),
            slotimg: this.$store.state.get_img_path("slot.png"),
        }
    },
    created() {
        var self = this
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                utils.goLogin({
                    "USERID": self.USERID,
                    "TOKEN": self.TOKEN,
                    "success": function() {
                        self.getUserInfo({
                            urls: GETUSERINFO_URL,
                            Fn: function(ret) {
                                console.log(ret)
                                if (ret.Status = 1) {
                                    self.UserInfo.NickName = ret.obj.NickName;
                                    self.UserInfo.HeadImageUrl = ret.obj.HeadImageUrl;
                                }
                            }
                        });
                        self.getUserInfo({
                            urls: GETHOMEPAGE_URL,
                            Fn: function(ret) {
                                console.log(ret)
                                if (ret.Status = 1) {
                                    self.UserInfo.BalanceNum = ret.obj.BalanceNum;
                                    self.UserInfo.DemandNum = ret.obj.DemandNum;
                                    self.UserInfo.WineNumb = ret.obj.WineNumb;
                                    self.UserInfo.ActivitiesNum = ret.obj.ActivitiesNum;
                                }
                            }
                        });
                    },
                    "fail": function() {
                        self.$router.push({ name: 'login' })
                    }
                })
            })
        });
        // weex.requireModule('globalEvent').addEventListener('androidback', function(e) {
        //     if (self.TypeStatus === 0) {
        //         self.TypeStatus = 1
        //         weex.requireModule('modal').toast({
        //             message: '再点一次退出程序',
        //             duration: 3
        //         })
        //         setTimeout(function() {
        //             self.TypeStatus = 0
        //         }, 3000)
        //     } else if (self.TypeStatus === 1) {
        //         weex.requireModule('close').closeApp()
        //     }

        // })
    },
    methods: {
        invitef() {
            this.$router.push({ name: 'managerInviteFriends' })
        },
        personalinfo() {

            this.$router.push({ name: 'managerpersonlInfo' })
        },
        aboutus() {
            this.$router.push({ name: 'managerAboutUs' })
        },
        login() {
            weex.requireModule('storage').removeItem('TypeId')
            weex.requireModule('storage').removeItem('UserId')
            weex.requireModule('storage').removeItem('Token')
            this.$router.push({ name: 'login' })
        },
        myneeds() {
            this.$router.push({ name: 'MydemandListCustom' })
        },
        myact() {
            BusFn.mainNameJump_Fn("managerActivity");
            this.$router.push({ name: 'managerMypersonalActivities' })
        },
        mystock() {
            this.$router.push({ name: 'managerMyStock' })
        },
        mymoney() {
            this.$router.push({ name: 'managerAccountBalance' })
        },
        getUserInfo(obj) {
            var self = this;
            utils.WeexAjax({
                url: obj.urls + "?UserId=" + self.USERID,
                method: 'GET',
                type: 'JSON',
                token: self.TOKEN,
                callback: function(ret) {
                    obj.Fn(ret)
                }
            })
        }
    },
    filters: {
    	toFixeds(val) {
    		return val.toFixed(2)
    	}
    }
}
</script>
<style lang="stylus" scoped>
.act {
    background-color: #f4f4f4;
}

.my-title-bg {
    position: relative;
    height: 480px;
}

.my-title-bgImage {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.my-title-text {
    font-size: 42px;
    color: #333;
    text-align: center;
    font-weight: blod;
    line-height: 80px;
    margin-bottom: 30px;
}

.my-heart-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.my-heart-box-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 15px;
}

.my-heart-box-name {
    font-size: 30px;
    color: #333333;
}

.my-heart-box-subname {
    font-size: 24px;
    color: #333333;
    margin-top: 15px
}

.mt-heart-box-contart {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    justify-content: flex-start;
}

.my-hear-box-thetime {
    display: inline-block;
    color: #ffffff;
    font-size: 18px;
    padding-right: 22px;
}

.my-hear-box-look {
    display: inline-block;
    height: 45px;
    width: 100px;
    border-radius: 10px;
    background-color: #cca033;
    align-items: center;
    justify-content: center;
}

.my-heart-look-contart {
    color: #ffffff;
    font-size: 18px;
    line-height: 45px;
    text-align: center;
}

.my-demand-box {
    position: relative;
    margin-top: -50px;
}

.my-demand-balance-box {
    width: 710px;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 3px 5px #eee;
    border-radius: 15px;
    padding: 20px;
    background-color: #fff;
}

.my-demand-balance-list {
    flex: 1;
}

.my-demand-balance-list-left {
    border-right-width: 1px;
    border-right-color: #e5e5e5;
    border-right-style: solid;
}

.my-demand-balance-list-title {
    margin-top: 20px;
    text-align: center;
    font-size: 24px;
    color: #777777;
}

.my-demand-balance-list-num {
    text-align: center;
    font-size: 52px;
    color: #333333;
    margin-top: 15px;
    margin-bottom: 20px;
}

.my-demand-active-box {
    margin-top: 25px;
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 25px;
    width: 710px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.my-demand-active-box-list {
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 0 0 3px 5px #eee;
    padding: 15px;
    height: 185px;
    background-color: #fff;
}

.my-demand-active-box-list-image {
    width: 55px;
    height: 55px;
    margin: 15px 20px;
}

.my-demand-active-box-list-name {
    font-size: 24px;
    color: #777777;
}

.my-demand-active-box-list-num-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.my-demand-active-box-list-num-text {
    font-size: 24px;
    color: #777777;
    line-height: 30px;
}

.my-demand-active-box-list-num-textleft {
    color: #ff6204
}


.info-box-list {
    line-height: 82px;
    height: 82px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
}

.info-box-list-left-box {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.info-box-list-left-image {
    width: 28px;
    height: 30px;
    margin-right: 10px;
}

.info-box-list-left-text {
    font-size: 26px;
    color: #333333;
}

.info-box-list-right-text {
    font-size: 26px;
    color: #777;
}

.info-box-list-right-image {
    width: 13px;
    height: 20px;
    margin-left: 25px;
}
</style>