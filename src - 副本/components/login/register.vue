<template>
  <div class="wrapper">
    <vheader :title="header_title"></vheader>
    <div class="mainContain">
      <text class="textinfo">请输入您的常用手机号码</text>
      <div class="sec1">
        <div class="radioBox_G radioBox">
          <!-- 单选组件实现 -->
          <div class="radioitem_G" v-for="(value,key) in radios1" :key="key" @click="radio_G_fun(key,'radios1_get')">
            <div :class="['radioitem_G_img',(key != radios1_get)?'':'radioitem_G_img_on']"></div>
            <text class="radioitem_G_text">{{ value }}</text>
          </div>
          <!-- <text>{{radios1_get}}</text> -->
        </div>
        <div class="sec1item">
          <div class="sec1itembox">
            <image :src="phone_img" class="sec1img" style="width:28px;height:42px"></image>
            <input type="text" class='sec1input' placeholder="请输入手机号码" v-model="phoneNmu" maxlength="11" />
          </div>
          <text @click="getCode" :class="['getCodeBtn',!getCodeFlg?'disable':'']">{{ getCodeText }}</text>
        </div>
        <div class="sec1item">
          <div class='sec1itembox'>
            <image :src="password_img" class="sec1img" style="width:31px;height:39px"></image>
            <input type="text" class='sec1input' placeholder="请确认验证码" v-model="ValidateCode" />
          </div>
        </div>
				<div class="sec1item">
				  <div class='sec1itembox'>
				    <image :src="password_img" class="sec1img" style="width:31px;height:39px"></image>
				    <input type="text" class='sec1input' placeholder="请输入密码" v-model="PassWord" />
				  </div>
				</div>
      </div>
      <text class="LoginButton" @click="toLogin">提交注册</text>
    </div>
    <v-loading v-if="nomoreBool"></v-loading>
  </div>
</template>
<script>
import header from '../public/header'
import Util from '../public/utils.js'
import mixin from '@/components/public/mixins.js'
const REGISTER_URL = 'api/account/register'
const CODE_URL = 'api/account/getsmscode'
export default {
  components:{
    'vheader':header
  },
  data(){
    return{
      nomoreBool: false,
      header_title:'用户注册',
      password_img: mixin.get_img_path("login_ico_mm.png"),
      phone_img: mixin.get_img_path("login_ico_phone.png"),
      phoneNmu: '',//手机号
      ValidateCode: '',//验证码
			PassWord: '',//密码
      getCodeFlg:1, //1:点击后触发函数 0:点击后不触发函数
      getCodeText:'获取验证码',
      sendTime:null,
      intervalTime:null,
      countdown:60,
      // 区分注册id 默认客户1 经理2
      typeId: 1,
      radios1:{
        'custom':'客户账号',
        'manager':'经理人账号',
      },
      radios1_get:'custom'
    }
  },
  methods:{
    toLogin(){
      var _this = this;
      _this.nomoreBool = true;
      Util.WeexAjax({
          method: 'POST',
          url: REGISTER_URL,
          type: 'JSON',
          body: {
            "MobilePhone": _this.phoneNmu,
            "TypeId": _this.typeId,
            "ValidateCode": _this.ValidateCode,
            "PassWord": _this.PassWord,
            "InvitationCode": ''
          },
          callback: function(res){
            _this.nomoreBool = false;
            if(res.Status == 1){
              Util.modalPanel("注册成功",1)
              _this.$router.push({name:'login'})
            }else if(res.Message == '此手机号码已注册'){
              Util.modalPanel(res.Message,1)
            }else{
              Util.modalPanel("注册失败",1)
            }
            console.log(res)
          }
      })
      Util.TimeOutHint({
        "bool": _this.nomoreBool,
        "time": 6000,
        Fn: function(res){
          _this.nomoreBool = res;
        }
      })
    },
    // 点击获取验证码触发
    getCode() {
      var _this = this;
      if(this.getCodeFlg){
        // 现获取接口，成功后执行下面的方法
        this.settime();
        Util.WeexAjax({
          method: 'POST',
          url: CODE_URL,
          type: 'JSON',
          body: {
            "MobilePhone": _this.phoneNmu
          },
          callback: function(res){
            if(res.Status == 1){
              Util.modalPanel("发送成功",1)
            }else{
              Util.modalPanel("发送失败",1)
            }
            console.log(res)
          }
        })
        return false;
      }else{
        return false;
      }
    },
    // 获取验证码倒计时控制
    settime(){
      var _this=this;
      if (this.countdown == 0) {
        this.getCodeFlg=1;    
        this.getCodeText="获取验证码";  
        this.countdown = 60;  
        return false;  
      } else {
        this.getCodeFlg=0;   
        this.getCodeText = "重新发送(" + this.countdown + ")";  
        this.countdown--;  
      }  
      setTimeout(function() {  
        _this.settime();  
      },1000);  
    },
    radio_G_fun(key,radio_cache){
      // debugger
      this[radio_cache]=key;
      if(this[radio_cache] == 'custom'){
        this.typeId = 1;
      }else if(this[radio_cache] == 'manager'){
        this.typeId = 2;
			}
			console.log(this.typeId);
    }
  }
}
</script>

<style src='../public/style.css'></style>
<style scoped>
.wrapper{
  width:750px;
}
.textinfo{
  font-size:26px;
  color:#777777;
  line-height:40px;
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
  color: #333333;
  font-size: 24px;
  line-height: 90px;
  height: 90px;
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
.getCodeBtn{
  color:#ffffff;
  width:200px;
  height:80px;
  line-height:80px;
  font-size:24px;
  background-color:#f7ad4b;
  border-radius:8px;
  text-align:center;
  position:absolute;
  right:0;
  bottom:0;
}
.disable{
  background-color:#cecece;
}
.radioBox{
  margin-top: 50px;
}
.radioBox_G{
  flex-direction: row;
}
.radioitem_G{
  flex-direction: row;
  align-items: center;
  margin-right:70px;
}
.radioitem_G_img{
  width:30px;
  height:30px;
  border-top-width:10px;
  border-top-color:#ececec;
  border-top-style:solid;
  border-right-width:10px;
  border-right-color:#ececec;
  border-right-style:solid;
  border-bottom-width:10px;
  border-bottom-color:#ececec;
  border-bottom-style:solid;
  border-left-width:10px;
  border-left-color:#ececec;
  border-left-style:solid;
  border-radius: 15px;
  margin-right:10px;
}
.radioitem_G_img_on{
  border-top-color:#00a8ff;
  border-right-color:#00a8ff;
  border-bottom-color:#00a8ff;
  border-left-color:#00a8ff;
}
.radioitem_G_text{
  font-size:24px;
  color:#333333;
}
</style>