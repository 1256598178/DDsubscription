<template>
    <div class="wrapper" @touchstart="comment(current)">
        <!-- <div class="headerBox_G">
            <text class="headerBox_G_pageTip">朋友圈</text>
        </div> -->
        <div class="demandTop">
          <text class="Topname">朋友圈</text>
          <image class="addOrderBtn" :src="addOrderBtnImg" style="width:50px;height:50px;" @click="toDemandPageHideFoot('managerReleaseFriends')"></image>
        </div>
        <div class="act-nav">
            <text class="act-nav-font act-nav-crt" @click="dt">最新动态</text>
            <text class="act-nav-font" @click="gz">我的关注</text>
        </div>
        <list class="activity-list" @touchstart="comment(current)">
            <refresh class="loading" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">下拉刷新...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <cell class="cell" v-for="(item,index) in recentArr" :key="index" v-if="recentArr.length > 0">
                <div class="act-content">
                    <image class="act-img" :src="item.HeadImageUrl" @click="jump(item.UserId)" :placeholder="slotimg"></image>
                    <div class="act-content-r">
                        <div class="act-list-title">
                            <text class="act-title" @click="jump(item.UserId)">{{item.UserName}}</text>
                        </div>
                        <div class="act-list-intro">
                            <text class="text-gray">{{item.Content}}</text>
                        </div>
                        <div class="img-list">
                            <image :class="['list-img',item.ImageList.length == 1 ? 'f-img':'s-img']" v-for="(val,indexs) in item.ImageList" :src="val.ImageUrl" @click="showscole(index)" :placeholder="slotimg"></image>
                        </div>
                        <div class="act-list-time">
                            <div class="act-ti">
                                <text class="act-time">{{item.AddTimes}}</text>
                                <text class="act-time act-del" v-if="item.UserId == userIds" @click="delRecen(index,item.MessageId)">删除</text>
                            </div>
                            <div class="comments-box">
                                <div class="comm" ref="comm">
                                    <div class="like" @click="thumbs(item.MessageId,index)">
                                        <image class="like-img" :src="likeW"></image>
                                        <text class="text-w">赞</text>
                                    </div>
                                    <div class="comments border-l" @click="CommentBtn()">
                                        <image class="coms-img" :src="commentsW"></image>
                                        <text class="text-w">评论</text>
                                    </div>
                                </div>
                            </div>
                            <image class="com-img" @click="comment(index)" :src="commentsY"></image>
                        </div>
                        <div class="comments-content">
                            <div class="like-person" v-if="item.userNameList.length > 0">
                                <image class="like-img" :src="likeY" @click="thumbs(item.MessageId,index)"></image>
                                <div v-for="(child,childindex) in item.userNameList" :key="childindex" v-if="childindex < 10 && child.TypeId == 1">
                                    <text class="text-y" v-if="childindex < 9" @click="jump(child.UserId)">{{child.UserName}}</text>
                                    <text v-for="item in 1" v-if="childindex > 8">...</text>
                                </div>
                            </div>
                            <div class="com-f" v-if="child.TypeId == 2" v-for="child in item.CommentList">
                                <text class="com-name" @click="jump(child.UserId)">{{child.UserName}}: </text>
                                <text class="com-text">{{child.Content}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
            <cell v-if="recentArr.length == 0">
                <v-nomore :changeName="true" :name="nomoreName"></v-nomore>
            </cell>
            <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
                <text class="indicator-text">加载更多...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </loading>
        </list>
        <v-input v-if="showInput" v-on:goContent="goContents"></v-input>
        <v-loading v-if="temBool.loading"></v-loading>
        <v-scrolimg v-if="solce" :imgarr="imageList" v-on:hidelist="hidelists"></v-scrolimg>
    </div>
</template>
<script>
// const animation = weex.requireModule('animation')
import utils from '@/components/public/utils.js'
import BusFn from '@/components/public/BusFn.js'
import NoMore from '@/components/public/NoMore.vue'
import input from '@/components/public/input.vue'
import VScrolimg from '@/components/public/scroolimg'
const modal = weex.requireModule('modal')
const GETMESSAGELIST_URL = 'api/friendcircle/getmessagelist'
const COMMENT_URL = 'api/friendcircle/addComment'
const GETUSERINFO_URL = 'api/account/getuserinfo'
const DELMESSAGE_URL = 'api/friendcircle/delMessage'
export default {
    components: {
        "v-input": input,
        "v-nomore": NoMore,
        VScrolimg
    },
    data() {
        return {
            solce: false,
            imageList: [],
            temBool: {
                loading: true,
            },
            nomoreName:'暂无动态',
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            addOrderBtnImg:this.$store.state.get_img_path("addorderbtn.png"),
            headerBox_G_toBack: this.$store.state.get_img_path("toback.png"),
            photo: this.$store.state.get_img_path("photo.png"),
            likeW: this.$store.state.get_img_path("likewicon.png"),
            likeY: this.$store.state.get_img_path("likeyicon.png"),
            commentsW: this.$store.state.get_img_path("commentswicon.png"),
            commentsY: this.$store.state.get_img_path("commentsyicon.png"),
            slotimg: this.$store.state.get_img_path("slot.png"),
            USERID: 'UserId',
            TOKEN: 'Token',
            Page: 1,
            PageSize: 10,
            recentArr: {},
            transform: false,
            showInput: false,
            TypeStatus:0,
            imgList: [],
            recentObj: {
                index: 0,
                MessageId: 0,
            },
            hasMore: true,
            userName: 'DD订用户',
            userIds: 0,
            current:'',
        }
    },
    created() {
        BusFn.mainFootShow_Fn();
        var self = this
        // weex.requireModule('globalEvent').addEventListener('androidback',function(e){
        //     self.$router.push({name:'home'});
        // })
        weex.requireModule('storage').getItem(this.USERID, event => {
            self.USERID = event.data
            weex.requireModule('storage').getItem(this.TOKEN, event => {
                self.TOKEN = event.data
                utils.goLogin({
                    "USERID": self.USERID,
                    "TOKEN": self.TOKEN,
                    "success": function() {
                        self.getinfo_list({
                            "Page": self.Page,
                            Fn: function(ret) {
                                if (ret.Status == 1) {
                                    self.recentArr = ret.obj.Items
                                    console.log(self.recentArr)
                                    for(var item in self.recentArr){
                                        self.recentArr[item].userNameList = [];
                                        for(var items in self.recentArr[item].CommentList){
                                            if(self.recentArr[item].CommentList[items].TypeId == 1){
                                                self.recentArr[item].userNameList.push(self.recentArr[item].CommentList[items])
                                            }
                                        }
                                        self.recentArr[item].userNameList.reverse();
                                    }
                                    console.log(self.recentArr)
                                    self.temBool.loading = false
                                    utils.WeexAjax({
                                        url: GETUSERINFO_URL + "?UserId=" + self.USERID,
                                        method: 'GET',
                                        type: 'JSON',
                                        token: self.TOKEN,
                                        callback: function(ret) {
                                            console.log(ret)
                                            if(ret.obj.RealName !== null && ret.obj.RealName !== ''){
                                                self.userName = ret.obj.RealName
                                                console.log(self.userName)
                                            }
                                            self.userIds = ret.obj.UserId
                                        }
                                    })
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
    },
    methods: {
        //删除朋友圈
        delRecen(index,msg){
            var that = this;
            weex.requireModule('modal').confirm({
                message: '是否确定删除该动态?',
                okTitle: '确定',
                cancelTitle:'取消',
                duration: 0.3
            }, function (value) {
                if(value == '确定'){
                    utils.WeexAjax({
                        url: DELMESSAGE_URL,
                        method: 'POST',
                        type: 'JSON',
                        token: that.TOKEN,
                        body: {
                            "UserId": that.userIds,
                            "Id": msg
                        },
                        callback: function(ret) {
                            // let rets = utils.JsonFormat(ret);
                            console.log(ret)
                            if(ret.Status == 1){
                                // 本地删除对应数组
                                if(that.recentArr.splice(index,1)){
                                    weex.requireModule('modal').toast({
                                        message: '删除成功',
                                        duration: 1
                                    })
                                    // 如果删除较多 动态加载
                                    if(that.recentArr.length < 5){
                                        that.onloading();
                                    }
                                }else{
                                    // 本地删除异常处理
                                    weex.requireModule('modal').toast({
                                        message: '删除异常',
                                        duration: 1
                                    })
                                }
                            }
                        }
                    })
                }
            })
        },
        // 放大图片方法
        showscole(index){
            console.log(index)
            this.solce = true;
            this.imageList = this.recentArr[index].ImageList;
        },
        hidelists(){
            this.solce = false;
        },
        toBack_G() {
            this.$router.back(-1);
        },
        toDemandPageHideFoot(name){
          this.$router.push({name:name});
          BusFn.mainFootHide_Fn();
        },
        dt() {
            this.$router.push({ name: 'managerRecentNews' })
        },
        gz() {
            this.$router.push({ name: 'managerMyAttention' })
        },
        comment(index) {
            var self = this;
            this.showInput = false;
            if(this.current === ''){
                this.current = index
                if(index === ''){
                    //console.log(2);
                }else{
                    var com = this.$refs.comm[this.current]
                    this.recentObj.index = this.current
                    this.recentObj.MessageId = this.recentArr[this.current].MessageId
                    weex.requireModule('animation').transition(com, {
                        styles: {
                            transform: 'translate(-270px, 0)'
                        },
                        duration: 800, //ms
                        timingFunction: 'ease',
                        needLayout: false,
                        delay: 0 //ms
                    }, function() {
                        //self.transform = true
                    })
                }
            }else if(this.current === index){
                var com = this.$refs.comm[this.current]
                this.recentObj.index = this.current
                this.recentObj.MessageId = this.recentArr[this.current].MessageId
                weex.requireModule('animation').transition(com, {
                    styles: {
                        transform: 'translate(0px, 0)'
                    },
                    duration: 800, //ms
                    timingFunction: 'ease',
                    needLayout: false,
                    delay: 0 //ms
                }, function() {
                    //self.transform = false
                    self.current = ''
                })
            }else{
                var com = this.$refs.comm[this.current]
                this.recentObj.index = this.current
                this.recentObj.MessageId = this.recentArr[this.current].MessageId
                weex.requireModule('animation').transition(com, {
                    styles: {
                        transform: 'translate(0px, 0)'
                    },
                    duration: 800, //ms
                    timingFunction: 'ease',
                    needLayout: false,
                    delay: 0 //ms
                }, function() {
                    //self.transform = false
                })
                self.current = index
                var coms = self.$refs.comm[self.current]
                self.recentObj.index = self.current
                self.recentObj.MessageId = self.recentArr[self.current].MessageId
                weex.requireModule('animation').transition(coms, {
                    styles: {
                        transform: 'translate(-270px, 0)'
                    },
                    duration: 800, //ms
                    timingFunction: 'ease',
                    needLayout: false,
                    delay: 0 //ms
                }, function() {
                    //self.transform = true
                })
            }
            
            
        },
        getinfo_list(obj) {
            var that = this;
            utils.WeexAjax({
                url: GETMESSAGELIST_URL + "?Page=" + obj.Page + "&PageSize=" + that.PageSize + "&UserId=" + that.USERID,
                method: 'GET',
                type: 'JSON',
                token: that.TOKEN,
                callback: function(ret) {
                    // let rets = utils.JsonFormat(ret);
                    obj.Fn(ret);
                }
            })
        },
        thumbs(msg, index) {
            var self = this
            utils.WeexAjax({
                url: COMMENT_URL,
                method: 'POST',
                type: 'JSON',
                token: self.TOKEN,
                body: {
                    "MessageId": msg,
                    "UserId": self.USERID,
                    "TypeId": 1,
                },
                callback: function(ret) {
                    console.log(ret)
                    if (ret.Status == 1) {
                        console.log(ret)
                        self.recentArr[index].CommentList.splice(self.recentArr[index].CommentList.length,0,{UserName: self.userName,UserId: self.userIds,TypeId: 1})
                        console.log(self.recentArr[index])
                        for(var item in self.recentArr){
                            self.recentArr[item].userNameList = [];
                            for(var items in self.recentArr[item].CommentList){
                                if(self.recentArr[item].CommentList[items].TypeId == 1){
                                    self.recentArr[item].userNameList.push(self.recentArr[item].CommentList[items])
                                }
                            }
                            self.recentArr[item].userNameList.reverse();
                        }
                    }else{
                        weex.requireModule("modal").toast({
                            message: ret.Message,
                            duration: 1
                        })
                    }
                    var com = self.$refs.comm[index]
                    self.recentObj.index = self.current
                    self.recentObj.MessageId = self.recentArr[index].MessageId
                    weex.requireModule('animation').transition(com, {
                        styles: {
                            transform: 'translate(0px, 0)'
                        },
                        duration: 800, //ms
                        timingFunction: 'ease',
                        needLayout: false,
                        delay: 0 //ms
                    }, function() {
                        //self.transform = false
                        self.current = ''
                    })
                }
            })
        },
        CommentBtn() {
            var self = this
            this.showInput = true;
            var com = self.$refs.comm[self.current]
            self.recentObj.index = self.current
            self.recentObj.MessageId = self.recentArr[self.current].MessageId
            weex.requireModule('animation').transition(com, {
                styles: {
                    transform: 'translate(0px, 0)'
                },
                duration: 800, //ms
                timingFunction: 'ease',
                needLayout: false,
                delay: 0 //ms
            }, function() {
                //self.transform = false
                self.current = ''
            })
        },
        jump(msg) {
            BusFn.mainFootHide_Fn();
            this.$router.push({
                name: 'friendsInfo',
                query: {
                    "ToUserId": msg
                }
            })
        },
        goContents(data) {
            var self = this
            utils.WeexAjax({
                url: COMMENT_URL,
                method: 'POST',
                type: 'JSON',
                token: self.TOKEN,
                body: {
                    "MessageId": self.recentObj.MessageId,
                    "UserId": self.USERID,
                    "TypeId": 2,
                    "Content": data
                },
                callback: function(ret) {
                    console.log(ret)
                    if (ret.Status == 1) {
                        self.showInput = false;
                        self.recentArr[self.recentObj.index].CommentList.push({ Content: data, TypeId: 2, UserName: self.userName })
                        console.log(self.recentArr)
                        weex.requireModule("modal").toast({
                            message: ret.Message,
                            duration: 1
                        })
                    } else {
                        weex.requireModule("modal").toast({
                            message: "发送失败",
                            duration: 1
                        })
                    }
                }
            })
        },
        onrefresh() {
            var _this = this;
            if (this.refreshing) return;
            this.refreshing = true;
            _this.Page = 1;
            _this.hasMore = true;
            _this.getinfo_list({
                "Page": _this.Page,
                Fn: function(ret) {
                    if (ret.Status == 1) {
                        _this.recentArr = ret.obj.Items
                        _this.refreshing = false;
                        console.log(_this.recentArr)
                        for(var item in _this.recentArr){
                            _this.recentArr[item].userNameList = [];
                            for(var items in _this.recentArr[item].CommentList){
                                if(_this.recentArr[item].CommentList[items].TypeId == 1){
                                    _this.recentArr[item].userNameList.push(_this.recentArr[item].CommentList[items])
                                }
                            }
                            _this.recentArr[item].userNameList.reverse();
                        }
                        weex.requireModule("modal").toast({
                            message: '刷新成功',
                            duration: 1
                        })
                    }else{
                        weex.requireModule("modal").toast({
                            message: '刷新失败',
                            duration: 1
                        })
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
                    _this.getinfo_list({
                        "Page": _this.Page,
                        Fn: function(ret) {
                            if (ret.obj.Items.length <= 0) {
                                _this.hasMore = false;
                                weex.requireModule("modal").toast({
                                    message: '没有更多数据了',
                                    duration: 1
                                })
                            } else {
                                for (var item in ret.obj.Items) {
                                    _this.recentArr.push(ret.obj.Items[item])
                                }
                                for(var item in _this.recentArr){
                                    _this.recentArr[item].userNameList = [];
                                    for(var items in _this.recentArr[item].CommentList){
                                        if(_this.recentArr[item].CommentList[items].TypeId == 1){
                                            _this.recentArr[item].userNameList.push(_this.recentArr[item].CommentList[items])
                                        }
                                    }
                                    _this.recentArr[item].userNameList.reverse();
                                }
                                console.log(_this.recentArr)
                                // for(var item in _this.recentArr){
                                //     var map = {},
                                //         demp = [];
                                //     for(var items in _this.recentArr[item].CommentList){
                                //         if(!map[_this.recentArr[item].CommentList[items].UserId]){
                                //             demp.push({UserName: _this.recentArr[item].CommentList[items].UserName,UserId: _this.recentArr[item].CommentList[items].UserId})
                                //             map[_this.recentArr[item].CommentList[items].UserId] = _this.recentArr[item].CommentList[items]
                                //         }
                                //     }
                                //     _this.recentArr[item].userNameList = demp.reverse();
                                // }
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
    },
}
</script>
<style scoped>
.demandTop{height:90px;border-bottom-color: #e5e5e5;border-bottom-style: solid;border-bottom-width: 2px;align-items: center;}
.Topname{text-align: center;font-size:42px;color:#333333;line-height:88px;}
.addOrderBtn{position: absolute;right:20px;top:20px;}
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
.act-list-title{
    flex-direction: row;
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
    width: 80px;
    height: 80px;
    margin-right: 20px;
}

.act-content-r {
    flex: 1;
}

.act-title {
    font-size: 28px;
    line-height: 30px;
    color: #d69900;
    margin-bottom: 15px;
}

.act-person {
    /*width: auto;*/
    flex-direction: row;
    margin-right: 30px;
}

.text-gray {
    /*width: auto;*/
    font-size: 26px;
    line-height: 40px;
    color: #333333;
}

.text-red {
    /*width: auto;*/
    font-size: 24px;
    line-height: 30px;
    color: #ff6204;
}

.clock-icon {
    width: 30px;
    height: 30px;
    margin-right: 8px;
}

.act-list-time {
    height: 70px;
    flex-direction: row;
}

.comments-box {
    width: 270px;
    overflow: hidden;
}

.comm {
    width: 270px;
    height: 70px;
    padding-top: 14px;
    padding-bottom: 14px;
    border-radius: 10px;
    color: #ffffff;
    background-color: #585858;
    flex-direction: row;
    margin-left: 270px;
}

.like {
    width: 135px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
}

.comments {
    width: 135px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
}

.like-img {
    width: 26px;
    height: 26px;
}

.coms-img {
    width: 28px;
    height: 25px;
}

.com-img {
    width: 34px;
    height: 32px;
    margin-top: 19px;
    margin-left: 5px;
}

.text-w {
    /*width: auto;*/
    font-size: 24px;
    color: #ffffff;
    margin-left: 20px;
}

.border-l {
    border-left-width: 1px;
    border-left-style: solid;
    border-left-color: #626262;
}

.act-time-gray {
    /*width: auto;*/
    font-size: 24px;
    line-height: 30px;
    color: #333333;
    margin-right: 15px;
}
.act-ti{
    flex: 1;
    flex-direction: row;
}
.act-time {
    font-size: 24px;
    line-height: 30px;
    color: #777777;
    margin-top: 20px;
    margin-right: 15px;
}
.act-del{
    color: #d69900;
}

.comments-content {
    background-color: #fafafa;
}

.like-person {
    padding-top: 13px;
    padding-bottom: 13px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
}

.com-f {
    padding-top: 13px;
    padding-bottom: 13px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    align-items: flex-start;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #dcdcdc;
}

.text-y {
    font-size: 26px;
    line-height: 40px;
    color: #d69900;
    margin-left: 15px;
}

.com-name {
    font-size: 26px;
    line-height: 40px;
    color: #d69900;
}

.com-text {
    font-size: 26px;
    line-height: 40px;
    color: #333333;
    flex: 1;
}

.arrow-bg {
    width: 18px;
    height: 13px;
    position: absolute;
    top: -13px;
    left: 28px;
}

.activity-list {
    position: fixed;
    top: 200px;
    bottom: 100px;
    left: 0;
    right: 0;
}
.act-list-intro{
    margin-bottom: 20px;
}
.img-list{
    width: 480px;
    flex-direction: row;
    flex-wrap: wrap;
}
.list-img{
    
}
.f-img{
    width: 470px;
    height: 470px;
    margin-bottom: 10px;
}
.s-img{
    width: 150px;
    height: 150px;
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>