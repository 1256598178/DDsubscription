<template>
    <div class="act">
        <div class="headerBox_G">
            <text class="headerBox_G_pageTip">新增存酒</text>
            <image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
        </div>
        <!-- <v-header :title="活动详情"></v-header> -->
        <div class="person">
            <text class="person-title-name">请准确输入一下内容</text>
            <!-- 			<div class="person-content-box">
				<div class="person-content-camera-box">
					<image class="person-content-camera-image" src="../src/static/images/camera.png"></image>
				</div>
				<text class="person-content-camera-name">更换照片</text>
			</div> -->
            <div class="person-listbox">
                <div class="person-listbox-list">
                    <text class="person-name">客户</text>
                    <text class="person-come-red namewidth">*</text>
                    <text class="person-name person-inout-height" @click="getCustomers()">{{ContentInfo.CustomerName}}</text>
                    <image class="person-button person-name" :src="headerBox_G_click" @click="getCustomers()"></image>
                </div>
                <div class="person-listbox-list">
                    <text class="person-name">酒名</text>
                    <text class="person-come-red namewidth">*</text>
                    <input class="person-name person-inout-height" v-model="ContentInfo.Wine" placeholder="" type="text" name="">
                </div>
                <div class="person-listbox-list">
                    <text class="person-name">数量</text>
                    <text class="person-come-red namewidth">*</text>
                    <input class="person-name person-inout-height" v-model="ContentInfo.Num" placeholder="" type="text" name="">
                </div>
                <div class="person-listbox-list">
                    <text class="person-name">商家</text>
                    <text class="person-come-red namewidth">*</text>
                    <text class="person-name person-inout-height" @click="getBusiness()">{{ContentInfo.BusinessName}}</text>
                    <image class="person-button person-name" :src="headerBox_G_click" style=""></image>
                </div>
                <div class="person-listbox-list">
                    <text class="person-name">到期时间</text>
                    <text class="person-come-red namewidth">*</text>
                    <input class="person-name person-inout-height" v-model="ContentInfo.data" placeholder="" type="date" name="">
                </div>
                <!-- <input class="person-listbox-list" placeholder="酒名*" type="text" name="">
				<input class="person-listbox-list" placeholder="数量*" type="text" name="">
				<input class="person-listbox-list" placeholder="商家*" type="text" name="">
				<input class="person-listbox-list" placeholder="到期时间*" type="text" name=""> -->
                <text class="person-btn" @click="addStock">确定新增</text>
                <v-toast :img="toastImg" :text="toastText" v-if="openToast" v-on:close="closeTotas"></v-toast>
            </div>
        </div>
    </div>
</template>
<script>
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
const picker = weex.requireModule('picker')
const GETSHOPLIST_URL = 'api/shop/getshoplist'
import BusFn from '@/components/public/BusFn.js'
import utils from '@/components/public/utils.js'
import Bus from '@/components/public/Bus.js'
import toast from '@/components/public/toast.vue'
export default {
    data() {
        return {
            headerBox_G_toBack: this.$store.state.get_img_path("toback.png"),
            headerBox_G_click: this.$store.state.get_img_path("selector_xl.png"),
            Page: 1,
            PageSize: 20,
            USERID: 'UserId',
            TOKEN: 'Token',
            ContentInfo: {
                Customer: [],
                CustomerList: [],
                CustomerName: '请选择',
                CustomerIndex: 0,
                Business: [],
                BusinessList: [],
                BusinessName: '请选择',
                BusinessIndex: 0,
                Wine: '',
                Num: '',
                data: '',
            },
            toastImg: {
                url: this.$store.state.get_img_path("ok.png"),
                width: '96px',
                height: '74px'
            },
            toastText: "存酒成功",
            openToast: false,
        }
    },
    created() {
        BusFn.mainFootShow_Fn();
        BusFn.mainNameJump_Fn("managerMy");
        var self = this
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            console.log(event.data);
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                utils.goLogin({
                    "USERID": self.USERID,
                    "TOKEN": self.TOKEN,
                    "success": function() {
                        var ajaxUrl = 'api/wine/getmycustomerlist?UserId=' + self.USERID;
                        utils.WeexAjax({
                            url: ajaxUrl,
                            method: 'GET',
                            type: 'JSON',
                            token: self.TOKEN,
                            callback: function(ret) {
                                console.log(ret.obj)
                                self.ContentInfo.Customer = ret.obj
                                for(var item in ret.obj){
                                    self.ContentInfo.CustomerList.push(ret.obj[item].UserName)
                                }
                                console.log(self.ContentInfo.Customer)
                            }
                        })
                        utils.WeexAjax({
                            url: GETSHOPLIST_URL + '?UserId=' + self.USERID,
                            method: 'GET',
                            type: 'JSON',
                            token: self.TOKEN,
                            callback: function(ret) {
                                console.log(ret.obj)
                                self.ContentInfo.Business = ret.obj
                                for(var item in ret.obj){
                                    self.ContentInfo.BusinessList.push(ret.obj[item].ShopName)
                                }
                                console.log(self.ContentInfo.BusinessList)
                            }
                        })
                    },
                    "fail": function() {
                        self.$router.push({ name: 'login' })
                    }
                })
            })
        });
      //   weex.requireModule('globalEvent').addEventListener('androidback', function(e) {
      //     self.$router.back(-1);
      // })
    },
    methods: {
        toBack_G() {
            this.$router.back(-1);
        },
        //获取商家列表
        getCustomers() {
            weex.requireModule('picker').pick({
                items: this.ContentInfo.CustomerList
            }, event => {
                if (event.result === 'success') {
                    this.ContentInfo.CustomerName = this.ContentInfo.Customer[event.data].UserName
                    this.ContentInfo.CustomerIndex = this.ContentInfo.Customer[event.data].UserId
                }
            })
        },
        getBusiness() {
            weex.requireModule('picker').pick({
                items: this.ContentInfo.BusinessList
            }, event => {
                if (event.result === 'success') {
                    this.ContentInfo.BusinessName = this.ContentInfo.Business[event.data].ShopName
                    this.ContentInfo.BusinessIndex = this.ContentInfo.Business[event.data].ShopId
                }
            })
        },
        //添加存酒
        addStock() {
            var that = this;
            console.log(that.ContentInfo.data)
            var ajaxUrl = 'api/wine/addWine';
            utils.WeexAjax({
                url: ajaxUrl,
                method: 'POST',
                type: 'JSON',
                token: that.TOKEN,
                body: {
                    "UserId": that.USERID,
                    "WineName": that.ContentInfo.Wine,
                    "Expdate": that.ContentInfo.data,
                    "AddAmount": that.ContentInfo.Num,
                    "CustomerId": that.ContentInfo.CustomerIndex,
                    "SellerId": that.ContentInfo.BusinessIndex
                },
                callback: function(ret) {
                    console.log(ret)
                    if(ret.Status == 1){
                        that.openToast = true;
                        setTimeout(function(){
                            that.$router.push({name: 'managerMyStock'})
                        },1500)
                    }else{
                        weex.requireModule("modal").toast({
                            message: ret.Message,
                            duration: 1
                        })
                    }
                }
            })
        },
        closeTotas() {
            this.openToast = false;
            console.log(2)
        }
    },
    components: {
        "v-toast": toast
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

.headerBox_G_addStock {
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

.person-button {
    width: 28px;
    height: 19px;
}

.person {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 0;
    padding-left: 20px;
    padding-right: 20px;
}

.person-title-name {
    padding-top: 30px;
    padding-bottom: 30px;
    font-size: 24px;
    color: #777777;
}

.person-content-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.person-content-camera-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    background-color: #e5e5e5;
}

.person-content-camera-image {
    width: 88px;
    height: 76px;
}

.person-content-camera-name {
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 24px;
    color: #333333;
}

.person-listbox {
    margin-top: 3px;
}

.person-listbox-list {
    height: 90px;
    line-height: 90px;
    border-bottom-width: 1px;
    border-bottom-color: #e3e3e3;
    border-bottom-style: solid;
    flex-direction: row;
    align-items: center;
}

.person-btn {
    margin-top: 100px;
    width: 710px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    color: #333333;
    border-radius: 8.8px;
    background-color: #ffd46b;
}

.namewidth {
    width: 75px;
}

.person-inout-height {
    height: 88px;
    flex: 1;
    line-height: 88px;
    color: #333333;
    font-size: 24px
}

.person-come-red {
    color: #ff0000
}

.person-name {
    color: #333333;
}

input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #e3e3e3;
}

input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #e3e3e3;
}

input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #e3e3e3;
}

input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #e3e3e3;
}

.person-btn {
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