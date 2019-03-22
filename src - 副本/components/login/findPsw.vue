<template>
  <div class="wrapper">
    <vheader :title="header_title"></vheader>
    <div class="mainContain">
      <text class="textinfo">请输入您的常用手机号码进行找回</text>
      <div class="sec1">
        <div class="sec1item">
          <div class="sec1itembox">
            <image :src="phone_img" class="sec1img" style="width:28px;height:42px"></image>
            <input type="text" class='sec1input' placeholder="请输入手机号码" v-model="phoneNmu" />
          </div>
          <text @click="getCode" :class="['getCodeBtn',!getCodeFlg?'disable':'']">{{ getCodeText }}</text>
        </div>
        <div class="sec1item">
          <div class='sec1itembox'>
            <image :src="password_img" class="sec1img" style="width:31px;height:39px"></image>
            <input type="text" class='sec1input' placeholder="请确认验证码" v-model="ValidateCode" />
          </div>
        </div>
      </div>
      <text class="LoginButton" @click="forgetPas_F">下一步</text>
    </div>
    <v-loading v-if="nomoreBool"></v-loading>
  </div>
</template>

<script>
import header from '../public/header'
import Util from '../public/utils.js'
import mixin from '@/components/public/mixins.js'
const FINDPASSWORD_URL = 'api/account/findpassword'
const CODE_URL = 'api/account/getsmscode'
export default {
  components:{
    'vheader':header
  },
  data(){
    return{
      nomoreBool: false,
      header_title:'找回密码',
      password_img: mixin.get_img_path("login_ico_mm.png"),
      phone_img: mixin.get_img_path("login_ico_phone.png"),
      phoneNmu: '',
      ValidateCode: '',
      modal:null,
      getCodeFlg:1, //1:点击后触发函数 0:点击后不触发函数
      getCodeText:'获取验证码',
      sendTime:null,
      intervalTime:null,
      countdown:60
    }
  },
  methods:{
    forgetPas_F(){
      var _this = this;
      _this.nomoreBool = true;
      Util.WeexAjax({
          method: 'POST',
          url: FINDPASSWORD_URL,
          type: 'JSON',
          body: {
            "MobilePhone": _this.phoneNmu,
            "ValidateCode": _this.ValidateCode,
            "PassWord": _this.ValidateCode
          },
          callback: function(res){
            _this.nomoreBool = false;
            if(res.Status == 1){
              Util.modalPanel(res.Message,1)
              _this.$router.push({name:'newPsw'})
            }else{
              Util.modalPanel("请求失败",1)
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
</style>