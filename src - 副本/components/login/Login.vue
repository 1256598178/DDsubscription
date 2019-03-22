<template>
    <div class="LoginWarp wrapper">
        <div class="LoginBg">
            <image class="LoginBg_img" :src="LoginBg_img"></image>
        </div>
        <div class="LoginInfo">
            <div class="LoginLogo_imgbox">
                <image class="LoginLogo_img" :src="LoginLogo_img" style="width:152px;height:163px"></image>
            </div>
            <div class="LoginForm">
                <div class="sec1">
                    <div class="sec1item username">
                        <div class="sec1itembox">
                            <image :src="username_img" class="sec1img" style="width:34px;height:34px"></image>
                            <input type="text" v-model="loginData.username" class='sec1input' placeholder="请输入用户名" />
                        </div>
                    </div>
                    <div class="sec1item password">
                        <div class='sec1itembox'>
                            <image :src="password_img" class="sec1img" style="width:31px;height:39px"></image>
                            <input type="password" v-model="loginData.password" @keyup.enter="toHome" class='sec1input' placeholder="请输入短信验证码" />
                        </div>
                    </div>
                    <div class="forgetPas">
                        <text class="forgetPas_text" @click="forgetPas_F">忘记密码</text>
                    </div>
                </div>
                <text class="LoginButton" @click="toHome()">登　录</text>
                <text class="SignText" @click="Sign">注册用户</text>
                <!-- <div class="otherLoginBox">
                    <div class="otherLoginBox_line"></div>
                    <text class="otherLoginBox_text">其他登录方式</text>
                    <div class="otherLoginBox_line"></div>
                </div>
                <div class="otherLogins">
                    <div class="otherLogin_item">
                        <image :src="wxlogin_img" style="width:84px;height:84px" @click="wxLogin"></image>
                    </div>
                </div> -->
            </div>
        </div>
        <v-loading v-if="nomoreBool" :openCenter="true"></v-loading>
    </div>
</template>
<script>
const animation = weex.requireModule('animation');
import Util from '../public/utils.js'
import Stroage from '../public/storage.js'
import mixin from '@/components/public/mixins.js'
const LOGIN_URL = 'api/account/login'
export default {
    data() {
        return {
            nomoreBool: false,
            LoginBg_img: mixin.get_img_path("login_bg.png"),
            LoginLogo_img: mixin.get_img_path("login_logo.png"),
            username_img: mixin.get_img_path("login_ico_yym.png"),
            password_img: mixin.get_img_path("login_ico_mm.png"),
            wxlogin_img: mixin.get_img_path("login_wx.png"),
            USERID: 'UserId',
            TOKEN: 'Token',
            loginData: {
                username: '',
                password: ''
            },
            storage: null,
            wxLoginUserId: '',
            wxonce: false,
        }
    },
    methods: {
        forgetPas_F() {
            this.$router.push({ name: 'findPsw' })
        },
        validator_login(user, pas) {
            // todo 登录验证接口
            if ((/^1[12345678]\d{9}$/.test(user)) && (/^[0-9]{4,6}$/.test(pas)))
                return true;
            else
                return false;
        },
        wxLogin() {
            var self = this
            weex.requireModule('module').wxThirdLogin(function(map) {
                // weex.requireModule('modal').toast({
                //  message: map,
                //  duration: 2
                // })
                var datas = Util.JsonFormat(map)
                if (datas.status === 100) {
                    weex.requireModule('storage').getItem(this.USERID, event => {
                        self.USERID = event.data
                        weex.requireModule('storage').getItem(this.TOKEN, event => {
                            self.TOKEN = event.data
                            Util.WeexAjax({
                                url: 'api/account/wxLogin',
                                method: 'POST',
                                type: 'JSON',
                                body: {
                                    "Code": datas.data.unionid,
                                },
                                callback: function(ret) {
                                    var rets = ret;
                                    if (ret.Status == 1) {
                                        console.log(rets.obj)
                                    }
                                }
                            })
                        })
                    });
                } else {
                    weex.requireModule('modal').toast({
                        message: '微信登录失败',
                        duration: 2
                    })
                }
            })
        },
        toHome() {
            var _this = this;
            if (this.validator_login(_this.loginData.username, _this.loginData.password)) {
                _this.nomoreBool = true;
                Util.WeexAjax({
                    method: 'POST',
                    url: LOGIN_URL,
                    type: 'JSON',
                    loginbool: _this.nomoreBool,
                    body: {
                        "MobilePhone": _this.loginData.username,
                        "PassWord": _this.loginData.password,
                    },
                    callback: function(res) {
                        _this.nomoreBool = false;
                        if (res.Status == 1) {
                            Util.modalPanel(res.Message, 1)
                            Stroage.setItems({
                                "Token": res.obj.Token,
                                "TypeId": res.obj.TypeId,
                                "UserId": res.obj.UserId,
                                "wxLoginUserId": res.obj.UserId
                            })
                            // this.storage.setItem('comingNight_login',JSON.stringify(this.loginData))
                            _this.$store.state.Logins = true

                            // 微信绑定  使用直接把注释去掉
                            // weex.requireModule('module').wxThirdLogin(function(map) {
                            //     var datas = Util.JsonFormat(map)
                            //     if (datas.status === 100) {
                            //         weex.requireModule('storage').getItem(_this.USERID, event => {
                            //             _this.USERID = event.data
                            //             weex.requireModule('storage').getItem('wxLoginUserId', event => {
                            //                 _this.wxLoginUserId = event.data
                          //                     Util.WeexAjax({
                          //                         url: 'api/account/bindWx',
                          //                         method: 'POST',
                          //                         type: 'JSON',
                          //                         token: _this.TOKEN,
                          //                         body: {
                          //                             "UserId": _this.USERID,
                          //                             "Code": datas.data.unionid,
                          //                         },
                          //                         callback: function(ret) {
                          //                             console.log(ret)
                          //                         }
                          //                     })
                            //             })
                            //         })
                            //     } else {
                            //         weex.requireModule('modal').toast({
                            //             message: '微信登录失败',
                            //             duration: 2
                            //         })
                            //     }
                            // })

                            if (res.obj.TypeId == 1) {
                                _this.$router.push({ name: 'home' })
                            } else if (res.obj.TypeId == 2) {
                                _this.$router.push({ name: 'managerHome' })
                            }
                        } else {
                            Util.modalPanel(res.Message, 1)
                        }
                        console.log(res)
                    },
                    backLogding: function(ret) {
                        _this.nomoreBool = ret;
                    }
                })
            } else {
                // console.log(2)
                Util.modalPanel('请输入正确的用户名或短信验证码', 1)
            }
        },
        Sign() {
            this.$router.push({ name: 'register' })
        }
    }
};
</script>
<style scoped>
.LoginWarp {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
}

.LoginBg_img {
    width: 750px;
    height: 1344px;
}

.LoginInfo {
    justify-content: center;
    width: 710px;
    height: 1150px;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    margin-left: 20px;
}

.LoginLogo_imgbox {
    width: 710px;
    justify-content: center;
    flex-direction: row;
}

.LoginForm {
    margin-top: 30px;
    width: 710px;
}

.sec1item {
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 60px;
    width: 710px;
    border-bottom-width: 1px;
    border-bottom-color: #e5e5e5;
    border-bottom-style: solid;
}

.sec1itembox {
    height: 90px;
    flex-direction: row;
    align-items: center;
}

.sec1input {
    background-color: transparent;
    margin-left: 15px;
    flex: 2;
    color: #ffffff;
    font-size: 24px;
    line-height: 90px;
    height: 90px;
}

.sec1input::placeholder {
    color: #e4e4e4;
}

.forgetPas {
    margin-top: 30px;
    width: 710px;
}

.forgetPas_text {
    text-align: right;
    font-size: 24px;
    color: #e3e3e3;
}

.LoginButton {
    margin-top: 90px;
    width: 710px;
    height: 80px;
    text-align: center;
    font-size: 36px;
    color: #333333;
    line-height: 80px;
    background-image: linear-gradient(to right, #ffd262, #ffe8b0);
    border-radius: 10px;
}

.SignText {
    margin-top: 30px;
    text-align: center;
    color: #e3e3e3;
    font-size: 24px;
}

.otherLoginBox {
    margin-top: 60px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.otherLoginBox_line {
    width: 170px;
    height: 1px;
    background-color: #bfbfbf;
}

.otherLoginBox_text {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 20px;
    color: #777777;
}

.otherLogins {
    margin-top: 30px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.otherLogin_item {
    width: 84px;
    height: 84px;
}
</style>