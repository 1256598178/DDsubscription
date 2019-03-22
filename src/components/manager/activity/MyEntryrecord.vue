<template>
    <div class="wrapper">
        <div class="headerBox_GG">
            <text class="headerBox_G_pageTip">活动详情</text>
            <div class="back_box" @click="toBack_G">
                <image :src="headerBox_G_toBack" style="width:31px;height:44px;"></image>
            </div>
        </div>
        <!-- 		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">朋友圈</text>
		</div> -->
        <div class="act-nav">
            <text class="act-nav-font" @click="mtdetail">活动详情</text>
            <text class="act-nav-font act-nav-crt" @click="myrecord">报名记录</text>
        </div>
        <list class="activity-list">
            <cell class="cell" v-for="(item,index) in cellList" :key="index" v-if="cellList.length > 0">
                <div class="act-content">
                    <image class="act-img" v-if="item.HeadImageUrl" :src="item.HeadImageUrl"></image>
                    <image class="act-img" v-if="!item.HeadImageUrl" :src="photo"></image>
                    <div class="act-content-r">
                        <text class="text-gray" v-if="item.UserName">{{item.UserName}}</text>
                        <text class="text-gray" v-if="!item.UserName">DD用户</text>
                        <text class="text-gray" style="margin-left: 15px;">报名时间&nbsp; {{item.AddTimes}}</text>
                    </div>
                    <text class="act-more act-hx" v-if="item.Status==0" @click="removeRecord(item.PayCode)">核销</text>
                    <text class="act-more act-hx" v-if="item.Status!=0">已核销</text>
                </div>
            </cell>
            <cell v-if="cellList.length == 0">
                <v-nomore :changeName="true" :name="nomoreName"></v-nomore>
            </cell>
        </list>
        <v-loading v-if="temBool.loading"></v-loading>
        <v-toast :img="toastImg" :text="toastText" v-if="openToast" v-on:close="closeTotas"></v-toast>
    </div>
</template>
<script>
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
import header from '../../public/header'
import Bus from '@/components/public/Bus.js'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
import NoMore from '@/components/public/NoMore.vue'
import toast from '@/components/public/toast.vue'
export default {
    data() {
        return {
            /////////////
            //控制组件显示隐藏 //
            /////////////
            temBool: {
                loading: true,
            },
            nomoreName: "活动已经截止",
            headerBox_G_toBack: this.$store.state.get_img_path("toback.png"),
            photo: this.$store.state.get_img_path("photo.png"),
            cellList: [],
            ajaxUrl: 'api/action/getparticlist',
            ajaxUrl2: 'api/action/entranceinaction',
            USERID: 'UserId',
            TOKEN: 'Token',
            temCode: '',
            toastImg: {
                url: this.$store.state.get_img_path("ok.png"),
                width: '96px',
                height: '74px'
            },
            toastText: "核销成功",
            openToast: false,
        }
    },
    methods: {
        toBack_G() {
            this.mtdetail();
        },
        removeRecord(PayCode) {
            var self = this;

            weex.requireModule('module').scanQrCode(function(map) {
                // weex.requireModule('modal').toast({
                //     message: map,
                //     duration: 5
                // })
                var datas = Util.JsonFormat(map)
                self.temCode = datas.data;
                //调用nativie中的方法打日志，得出回调成功了
                // weex.requireModule('module').log(map);
                if(self.temCode == PayCode){
	                Util.WeexAjax({
	                    url: self.ajaxUrl2,
	                    method: 'POST',
	                    type: 'JSON',
	                    token: self.TOKEN,
	                    body: {
	                        "UserId": self.USERID,
	                        // "PayCode":PayCode
	                        "PayCode": self.temCode
	                    },
	                    callback: function(ret) {
	                        if (ret.Status == 1) {
	                            Util.WeexAjax({
	                                url: self.ajaxUrl + '?ActionId=' + self.actionId + '&UserId=' + self.USERID,
	                                method: 'GET',
	                                type: 'JSON',
	                                token: self.TOKEN,
	                                callback: function(ret) {
	                                    if (ret.Status == 1) {
                                            self.openToast = true;
	                                        self.cellList = ret.obj;
	                                    }
	                                }
	                            })
	                        }else{
                                weex.requireModule('modal').toast({
                                    message: '核销失败',
                                    duration: 1
                                })
                            }
	                        self.temCode = "";
	                    }
	                })
                }else {
                	weex.requireModule('modal').toast({
	                    message: '核销失败',
	                    duration: 1
	                })
                }
            })
        },
        mtdetail() {
            this.$router.push({
                name: 'managerMyactdet',
                params: {
                    actionId: this.actionId
                }
            })
        },
        myrecord() {
            this.$router.push({ name: 'managerMyEntryrecord' })
        },
        dt() {
            this.$router.push({ name: 'managerRecentNews' })
        },
        gz() {
            this.$router.push({ name: 'managerMyAttention' })
        },
        closeTotas() {
            this.openToast = false;
        }

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
                    url: this.ajaxUrl + '?ActionId=' + self.actionId + '&UserId=' + self.USERID,
                    method: 'GET',
                    type: 'JSON',
                    token: self.TOKEN,
                    callback: function(ret) {
                        var rets = ret;
                        console.log(ret)
                        self.temBool.loading = false;
                        if (ret.Status == 1) {
                            self.cellList = rets.obj;
                        }
                    }
                })
            })
        });
    },
    components: {
        "v-nomore": NoMore,
        "v-toast": toast
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
    align-items: center;
}

.act-img {
    width: 80px;
    height: 80px;
    margin-right: 30px;
}

.act-content-r {
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
}

.text-gray {
    /*width: auto;*/
    font-size: 28px;
    line-height: 80px;
    color: #333;
}

.activity-list {
    position: fixed;
    top: 200px;
    bottom: 100px;
    left: 0;
    right: 0;
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
</style>