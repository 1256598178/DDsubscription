<template>
    <div class="act">
        <div class="headerBox_G">
            <text class="headerBox_G_pageTip">发布活动</text>
            <image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
        </div>
        <!-- <v-header :title="活动详情"></v-header> -->
        <scroller class="person">
            <text class="person-title-name">请准确输入一下活动内容</text>
            <!--<div class="person-content-box">
				<div class="person-content-camera-box">
					<image class="person-content-camera-image" src="../src/static/images/camera.png"></image>
				</div>
				<text class="person-content-camera-name">更换照片</text>
			</div> -->
            <div class="person-listbox">
                <div class="person-listbox-list">
                    <div class="namewidth"><text class="person-name">活动名称</text><text class="person-come-red">*</text></div>
                    <input class="person-name person-inout-height" placeholder="" type="text" name="" v-model="ActionName">
                </div>
                <div class="person-listbox-list">
                    <div class="namewidth"><text class="person-name">起始时间</text><text class="person-come-red">*</text></div>
                    <input class="person-name person-inout-height" placeholder="起始日期" type="date" name="" v-model="StartTime">
                    <input class="person-name person-inout-height" placeholder="起始时间" type="time" name="" v-model="StartSecond">
                </div>
                <div class="person-listbox-list">
                    <div class="namewidth"><text class="person-name">结束时间</text><text class="person-come-red">*</text></div>
                    <input class="person-name person-inout-height" placeholder="结束日期" type="date" name="" v-model="EndTime">
                    <input class="person-name person-inout-height" placeholder="结束时间" type="time" name="" v-model="EndSecond">
                </div>
                <div class="person-listbox-list">
                    <div class="namewidth"><text class="person-name">活动地址</text><text class="person-come-red">*</text></div>
                    <input class="person-name person-inout-height" placeholder="" type="text" name="" v-model="Address">
                </div>
                <div class="person-listbox-list person-listbox-ss">
                    <div class="namewidth"><text class="person-name">参与方式</text><text class="person-come-red">*</text></div>
                    <text class="person-name person-inout-height" @click="showCity_pop">{{CategoryName}}</text>
                    <image class="person-name" :src="headerBox_G_click" style="width:28px;height:19px;"></image>
                </div>
                <div class="person-listbox-list">
                    <div class="namewidth"><text class="person-name">限人数</text><text class="person-come-red">*</text></div>
                    <input class="person-name person-inout-height" placeholder="" type="text" name="" v-model="LimitPersons">
                </div>
                <div class="person-listbox-list">
                    <div class="namewidth"><text class="person-name">最低费用</text><text class="person-come-red">*</text></div>
                    <input class="person-name person-inout-height" placeholder="" type="text" name="" v-model="BottomPrice">
                </div>
                <div class="person-listbox-list">
                    <div class="namewidth"><text class="person-name">所在区域</text><text class="person-come-red">*</text></div>
                    <input class="person-name person-inout-height" placeholder="" type="text" name="" v-model="RegionName">
                </div>
                <div class="person-listbox-list-none">
                    <div class="namewidth"><text class="person-name">详细描述</text><text class="person-come-red">*</text></div>
                    <textarea class="person-name cloumns" v-model="Introduction" placeholder="" type="text" name=""></textarea>
                </div>
                <div class="person-listbox-list">
                    <div class="namewidth"><text class="person-name">活动图片</text><text class="person-come-red">*</text></div>
                    <!-- <text class="person-name"  @click="getFile" style="padding:10px; background-color: #ffffff; border-radius: 10px; border: 1px solid #e3e3e3; color: #777777;">上传图片</text> -->
                    <text class="person-name" @click="GetPhoto" style="padding:10px; background-color: #ffffff; border-radius: 10px; border: 1px solid #e3e3e3; color: #777777;">上传图片</text>
                    <!-- <input class="person-name person-inout-height" @click="choiceImg" id="file" placeholder="" v-model="ImageUrl" type="text" name="" style="display: none;"> -->
                </div>
                <text class="person-btn" @click="addactivity">发布活动</text>
            </div>
        </scroller>
        <!-- 参与方式选择弹出 -->
        <scroller class="HomeCity_pop_scroller" v-if="HomeCity_pop_scroller_show">
            <div class="HomeCity_pop" @click="hideCity_pop">
                <div class="HomeCity_popClose">
                    <text class="HomeCity_popCloseText" @click="hideCity_pop">取消</text>
                </div>
                <div class="HomeCity_popCityList">
                    <div class="HomeCity_popCityItem" v-for="(item,index) in CategoryIdList" :key="index" @click="chooseCity(item)">
                        <text :class="['HomeCity_popCityItemText',(item.CategoryName==CategoryName)?'HomeCity_popCityItemTextActive':'']">{{item.CategoryName
                            }}</text>
                    </div>
                </div>
            </div>
        </scroller>
        <v-loading v-if="nomoreBool"></v-loading>
    </div>
</template>
<script>
import BusFn from '@/components/public/BusFn.js'
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
const IMAGE_URL = 'api/account/uploadpicbase'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
export default {
    data() {
        return {
            nomoreBool: false,
            headerBox_G_toBack: this.$store.state.get_img_path("toback.png"),
            headerBox_G_click: this.$store.state.get_img_path("selector_xl.png"),
            ajaxUrl: 'api/action/addactivities',
            USERID: 'UserId',
            TOKEN: 'Token',
            ActionName: '',
            CategoryId: '',
            // ImageUrl: 'http://cn-api.ipuyuan.com/Uploads/User/20190308/20190308140406_8232.jpg',
            ImageUrl: '',
            LimitPersons: '',
            BottomPrice: '',
            Address: '',
            RegionName: '',
            StartTime: '',
            EndTime: '',
            StartSecond: '',
            EndSecond: '',
            Introduction: '',
            CategoryName: '',
            CategoryIdList: [],
            HomeCity_pop_scroller_show: '',
            temImageUrl: '',
            temImageUrlWidth: '',
            temImageUrlHeight: '',
        }
    },
    created() {
        BusFn.mainFootHide_Fn();
        var self = this;
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                self.getCatogoryList();
            })
        });

    },
    methods: {
        GetPhoto() {
            var self = this;
            weex.requireModule('module').callPhoto('1', '0', function(map) {
                // weex.requireModule('modal').toast({
                //     message: map,
                //     duration: 5
                // })
                var datas = Util.JsonFormat(map)
                // self.temImageUrl = map.result.imageList[0].base64;
                self.ImageUrl = datas.data.imageList[0].base64;
                self.temImageUrlWidth = datas.data.imageList[0].width;
                self.temImageUrlHeight = datas.data.imageList[0].height;
                Util.WeexAjax({
                    url: IMAGE_URL,
                    method: 'POST',
                    type: 'JSON',
                    token: self.TOKEN,
                    body: {
                        "UserId": self.USERID,
                        "ImageFile": self.ImageUrl
                    },
                    callback: function(ret){
                        self.ImageUrl = ret.Message;
                    }
                })
                //调用nativie中的方法打日志，得出回调成功了
                //  weex.requireModule('module').log(map);
            })
        },
        showCity_pop() {
            this.HomeCity_pop_scroller_show = true;
            // BusFn.mainFootHide_Fn();
            // debugger	
        },
        hideCity_pop() {
            this.HomeCity_pop_scroller_show = false;
            // BusFn.mainFootShow_Fn();
        },
        chooseCity(Categoryitem) {
            this.HomeCity_pop_scroller_show = false;
            // BusFn.mainFootShow_Fn();
            this.CategoryName = Categoryitem.CategoryName;
            this.CategoryId = Categoryitem.CategoryId;
            // todo重新刷新数据源。。。
        },
        getCatogoryList() {
            var self = this;
            Util.WeexAjax({
                url: 'api/action/getparticcategoryList',
                method: 'GET',
                type: 'JSON',
                UserId: self.USERID,
                token: self.TOKEN,
                callback: function(ret) {
                    console.log(ret)
                    //   let rets = Util.JsonFormat(ret);
                    self.CategoryIdList = ret.obj;
                    //   console.log('CategoryIdList:',that.CategoryIdList)
                    // console.log('1111',ret)
                    // debugger
                }
            })
        },
        addactivity() {
            var self = this
            // for(var i = 0; i<20; i++){
            Util.WeexAjax({
                url: self.ajaxUrl,
                method: 'POST',
                type: 'JSON',
                token: self.TOKEN,
                body: {
                    "UserId": self.USERID,
                    "ActionName": self.ActionName,
                    "CategoryId": self.CategoryId,
                    // "ImageUrl": `https://www.baidu.com/img/baidu_jgylogo3.gif`,
                    "ImageUrl": self.ImageUrl,
                    "LimitPersons": self.LimitPersons,
                    "BottomPrice": self.BottomPrice,
                    "Address": self.Address,
                    "RegionName": self.RegionName,
                    "StartTime": self.StartTime+' '+self.StartSecond+':00',
                    "EndTime": self.EndTime+' '+self.EndSecond+':00',
                    "Introduction": self.Introduction,
                },
                callback: function(ret) {
                    self.nomoreBool = true;
                    console.log(ret)
                    if (ret.Status == 1) {
                        self.nomoreBool = false;
                        self.$router.back(-1);
                    } else {
                        self.nomoreBool = false;
                        weex.requireModule("modal").toast({
                            message: ret.Message,
                            duration: 1
                        })
                    }
                }
            })
        // }
        },
        toBack_G() {
            this.$router.back(-1);
        },
        // choiceImg() {
        //     this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
        // },
        // getFile() {
        //     console.log(123)
        //     var that = this;
        //     const inputFile = this.$refs.filElem.files[0];
        //     if (inputFile) {
        //         if (inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif') {
        //             alert('不是有效的图片文件！');
        //             return;
        //         }
        //         this.imgInfo = Object.assign({}, this.imgInfo, {
        //             name: inputFile.name,
        //             size: inputFile.size,
        //             lastModifiedDate: inputFile.lastModifiedDate.toLocaleString()
        //         })
        //         const reader = new FileReader();
        //         reader.readAsDataURL(inputFile);
        //         reader.onload = function(e) {
        //             that.imgSrc = this.result;
        //         }
        //     } else {
        //         return;
        //     }
        // }

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

.person {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 20px;
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
    font-size: 24px;
    color: #333333;
    flex-direction: row;
    align-items: center;
}

.person-listbox-list-none{
    height: 270px;
    flex-direction: column;
    align-items: flex-start; 
    font-size: 24px;
    color: #333333;
}
.person-listbox-ss{
    justify-content: space-between;
}
.person-btn {
    margin-top: 20px;
    width: 710px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    color: #333333;
    border-radius: 8.8px;
    background-color: #ffd46b;
}

.person-inout-height {
    height: 88px;
    flex: 1;
    line-height: 88px;
}

.person-come-red {
    color: #fd1f20
}

.namewidth {
    flex-direction: row;
    width: 210px;
}

.person-button {
    margin-left: 60px;
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

.cloumns {
    padding: 5px;
    height: 180px;
    width: 700px;
    border-width: 1px;
    border-style: solid;
    border-color: #e3e3e3;
    border-radius: 10px;
    margin-top: 10px;
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
</style>