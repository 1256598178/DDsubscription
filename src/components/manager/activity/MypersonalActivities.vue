<template>
    <div class="wrapper">
        <div class="headerBox_GG">
            <text class="headerBox_G_pageTip">我的活动</text>
            <image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
            <image class="headerBox_G_mypersonal" :src="headerBox_G_mypersonal" style="width:39px;height:39px;" @click="toAdd_G"></image>
        </div>
        <list class="activity-list">
            <cell class="cell" v-for="(item,index) in info" :key="index" v-if="info.length > 0">
                <div class="act-content">
                    <image class="act-img" :src="item.ImageUrl" :placeholder="slotimg"></image>
                    <div class="act-content-r">
                        <div class="act-list-title act-flex">
                            <text class="act-title">{{item.ActionName}}</text>
                        </div>
                        <div class="act-list-intro">
                            <div class="act-person">
                                <text class="text-gray">限</text>
                                <text class="text-red">{{item.LimitPersons}}</text>
                                <text class="text-gray">人</text>
                            </div>
                            <div class="act-person">
                                <text class="text-gray">最低</text>
                                <text class="text-red">{{item.BottomPrice}}</text>
                                <text class="text-gray">元</text>
                            </div>
                            <div class="act-person">
                                <text class="text-gray">{{item.Address}}</text>
                            </div>
                        </div>
                        <div class="act-list-time">
                            <image class="clock-icon" :src="clock"></image>
                            <text class="act-time-gray">时间</text>
                            <text class="act-time">{{item.StartTime}}-{{item.EndTime}}</text>
                        </div>
                        <div class="col-list-type">
                            <!-- StatusType 活动状态--0未开始  1--进行中 2--已结束< -->
                            <text class="col-type" style="background-color:#D86060;" v-if="item.StatusType==0">未开始</text>
                            <text class="col-type" style="background-color:#66A773;" v-if="item.StatusType==1">进行中</text>
                            <text class="col-type" style="background-color:#F4C09F;" v-if="item.StatusType==2">已结束</text>
                        </div>
                    </div>
                </div>
                <div class="act-list-btn">
                    <text class="act-more" @click="actdetials(item.ActionId)">详细</text>
                    <!-- <text class="act-more act-hx">核销</text> -->
                </div>
            </cell>
            <cell v-if="info.length == 0">
				<v-nomore></v-nomore>
			</cell>
        </list>
        <v-loading v-if="temBool.loading"></v-loading>
    </div>
</template>
<script>
import BusFn from '@/components/public/BusFn.js'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
import NoMore from '@/components/public/NoMore.vue'
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
            actImg: this.$store.state.get_img_path("actimg01.png"),
            clock: this.$store.state.get_img_path("clock.png"),
            headerBox_G_mypersonal: this.$store.state.get_img_path("addorderbtn.png"),
            slotimg: this.$store.state.get_img_path("slot.png"),
            USERID: 'UserId',
            TOKEN: 'Token',
            StatusType: 1,
            info: [],
        }
    },
    created() {
        BusFn.mainFootShow_Fn();
        var self = this;
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data

            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data

                Util.goLogin({
                    "USERID": self.USERID,
                    "TOKEN": self.TOKEN,
                    "success": function() {

                        self.TOKEN = this.TOKEN;
                        self.userid = this.USERID;
                        console.log(this.USERID);
                        console.log(self.TOKEN);
                        self.getinfo();
                    },
                    "fail": function() {
                        console.log(123);
                        self.$router.push({ name: 'login' });

                    }
                })

            })
        });
    },
    methods: {
        toBack_G() {
            this.$router.push({name: 'managerActivity'});
        },
        newsact() {
            this.$router.push({ name: 'managerMyActivities' })

        },
        myadd() {
            this.$router.push({ name: 'managerMyEnterActivities' })

        },
        actdetials(ActionId) {
            this.$router.push({
                name: 'managerMyactdet',
                params: {
                    pagename: '活动详情页面',
                    actionId: ActionId
                }
            })
        },
        toAdd_G() {
            console.log(11)
            this.$router.push({ name: 'managerAddactivities' })
        },
        //获取我参加的活动
        getinfo() {
            var that = this;
            // var ajaxUrl='api/action/getmyactionlist?UserId='+this.UserId+'&StatusType='+this.StatusType;
            var ajaxUrl = 'api/action/getactionissuelist?UserId=' + that.USERID + '&StatusType=-1';
            Util.WeexAjax({
                url: ajaxUrl,
                method: 'GET',
                type: 'JSON',
                token: that.TOKEN,
                callback: function(ret) {
                    // let rets = utils.JsonFormat(ret);
                    // that.info = ret.obj;
                    let [notBegin, beging, hasEnd] = [[],[],[]]
                    for(var item in ret.obj){
                        if(ret.obj[item].StatusType == 0)
                            notBegin.push(ret.obj[item])
                        else if(ret.obj[item].StatusType == 1)
                            beging.push(ret.obj[item])
                        else
                            hasEnd.push(ret.obj[item])
                    }
                    that.info = notBegin.concat(beging,hasEnd)
                    that.temBool.loading = false;
                    console.log(that.info)
                }
            })
        }
    },
	components: {
        "v-nomore": NoMore,
    },
}
</script>
<style scoped>
.headerBox_GG {
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

.headerBox_G_mypersonal {
    position: absolute;
    right: 20px;
    top: 22px;
}

.headerBox_G_pageTip {
    color: #333333;
    font-size: 36px;
    line-height: 88px;
    text-align: center;
}

.col-nav {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #dcdcdc;
}

.col-nav-font {
    font-size: 26px;
    line-height: 56px;
    color: #777;
    margin-right: 35px;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
}

.col-nav-crt {
    color: #ffd262;
    border-bottom-color: #ffd262;
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

.cell {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #dcdcdc;
}

.act-content {
    flex-direction: row;
}

.act-img {
    width: 220px;
    height: 220px;
    margin-right: 20px;
}

.act-content-r {
    flex: 1;
}

.act-title {
    height: 64px;
    font-size: 28px;
    line-height: 32px;
    color: #333;
    display: inline-block;
}

.act-list-intro {
    flex-direction: row;
}

.act-person {
    /*width: auto;*/
    flex-direction: row;
    margin-right: 30px;
}

.text-gray {
    /*width: auto;*/
    font-size: 24px;
    line-height: 30px;
    color: #333;
}

.text-red {
    /*width: auto;*/
    font-size: 24px;
    line-height: 30px;
    color: #ff6204;
}

.act-list-time {
    flex-direction: row;
    margin-top: 15px;
}

.clock-icon {
    width: 30px;
    height: 30px;
    margin-right: 8px;
}

.act-time-gray {
    /*width: auto;*/
    font-size: 24px;
    line-height: 30px;
    color: #333;
    margin-right: 15px;
}

.act-time {
    /*width: auto;*/
    font-size: 24px;
    line-height: 30px;
    color: #777;
    flex: 1;
}

.col-list-type {
    margin-top: 15px;
}

.col-type {
    width: 110px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    line-height: 44px;
    text-align: center;
    background-color: #d86060;
    border-radius: 10px;
    display: inline-block;
}

.act-list-btn {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
}

.act-more {
    width: 150px;
    height: 60px;
    font-size: 30px;
    color: #333;
    line-height: 60px;
    text-align: center;
    background-color: #ffd700;
    border-radius: 10px;
}

.act-hx {
    background-color: #dadada;
    margin-left: 20px;
}

.activity-list {
    position: fixed;
    top: 115px;
    bottom: 100px;
    left: 0;
    right: 0;
}

.act-flex {
    flex-direction: row;
    justify-content: space-between;
}
</style>