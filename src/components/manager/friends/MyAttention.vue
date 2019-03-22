<template>
    <div class="wrapper">
        <div class="headerBox_G">
            <text class="headerBox_G_pageTip">朋友圈</text>
        </div>
        <div class="act-nav">
            <text class="act-nav-font" @click="dt">最新动态</text>
            <text class="act-nav-font act-nav-crt" @click="gz">我的关注</text>
        </div>
        <list class="activity-list">
            <refresh class="loading" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">下拉刷新...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <cell class="cell" v-for="(item,index) in recentArr" :key="index" @click="jump(item.ToUserId)" v-if="recentArr.length > 0">
                <div class="act-content">
                    <image class="act-img" :src="item.HeadImageUrl"></image>
                    <div class="act-content-r">
                        <text class="text-gray">{{item.NickName}}</text>
                    </div>
                </div>
            </cell>
            <cell class="cell" v-if="recentArr.length == 0">
                <v-nomore></v-nomore>
            </cell>
            <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
                <text class="indicator-text">加载更多...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </loading>
        </list>
         <v-loading v-if="temBool.loading"></v-loading>
    </div>
</template>
<script>
import NoMore from '@/components/public/NoMore.vue'
import utils from '@/components/public/utils.js'
import BusFn from '@/components/public/BusFn.js'
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
const GETCONCERNSUSERLIST = 'api/friendcircle/getconcernsuserlist'
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
            refreshing: false, //下拉刷新
            loadinging: false, //上拉加载
            headerBox_G_toBack: this.$store.state.get_img_path("toback.png"),
            photo: this.$store.state.get_img_path("photo.png"),
            USERID: 'UserId',
            TOKEN: 'Token',
            Page: 1,
            PageSize: 10,
            recentArr: {},
            hasMore: true,
        }
    },
    methods: {
        toBack_G() {
            this.$router.back(-1);
        },
        dt() {
            this.$router.push({ name: 'managerRecentNews' })
        },
        gz() {
            console.log(21)
            this.$router.push({ name: 'managerMyAttention' })
        },
        getinfo_list(obj) {
            var self = this;
            utils.WeexAjax({
                url: GETCONCERNSUSERLIST + '?Page=' + obj.Page + '&PageSize=' + self.PageSize + '&UserId=' + self.USERID,
                method: 'GET',
                type: 'JSON',
                token: self.TOKEN,
                callback: function(ret) {
                    // let rets = utils.JsonFormat(ret);
                    obj.Fn(ret);
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
                    }
                }
            });
        },
        onloading() {
            this.loadinging = true;
            var _this = this
            if (this.hasMore)
                _this.Page++;
            _this.getinfo_list({
                "Page": _this.Page,
                Fn: function(ret) {
                    console.log(ret)
                    if (ret.obj.Items.length <= 0) {
                        _this.hasMore = false;
                        console.log(_this.Page)
                        weex.requireModule("modal").toast({
                            message: '没有更多数据了',
                            duration: 1
                        })
                    } else {
                        for (var item in ret.obj.Items) {
                            _this.recentArr.push(ret.obj.Items[item])
                        }
                        console.log(_this.Page)
                        console.log(_this.recentArr)
                    }
                    _this.loadinging = false;
                }
            });
        },
        jump(msg) {
            this.$router.push({
                name: 'friendsInfo',
                query: {
                    "ToUserId": msg
                }
            })
            BusFn.mainFootHide_Fn();
        },

    },
    created: function() {
        var self = this
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
                                    self.temBool.loading = false;
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
    components: {
        "v-nomore": NoMore,
    },
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
    font-size: 42px;
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
}

.act-img {
    width: 80px;
    height: 80px;
    margin-right: 30px;
}

.act-content-r {
    flex: 1;
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
</style>