<template>
  <div class="wrapper">
    <v-header :title="header_title"></v-header>
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
            <input type="text" class='sec1input' placeholder="请输入手机号码" />
          </div>
          <text @click="getCode" :class="['getCodeBtn',!getCodeFlg?'disable':'']">{{ getCodeText }}</text>
        </div>
        <div class="sec1item">
          <div class='sec1itembox'>
            <image :src="password_img" class="sec1img" style="width:31px;height:39px"></image>
            <input type="text" class='sec1input' placeholder="请确认验证码" />
          </div>
        </div>
      </div>
      <text class="LoginButton" @click="toLogin">提交注册</text>
    </div>
  </div>
</template>

<script>
import header from '../public/header'
export default {
  components:{
    'v-header':header
  },
  data(){
    return{
      header_title:'用户注册',
      password_img: "http://192.168.2.201:8082/images/Login_ico_mm.png",
      phone_img: "http://192.168.2.201:8082/images/Login_ico_phone.png",
      getCodeFlg:1, //1:点击后触发函数 0:点击后不触发函数
      getCodeText:'获取验证码',
      sendTime:null,
      intervalTime:null,
      countdown:60,
      radios1:{
        'custom':'客户账号',
        'manager':'经理人账号',
      },
      radios1_get:'custom'
    }
  },
  methods:{
    toLogin(){
      this.$router.push({name:'login'})
    },
    // 点击获取验证码触发
    getCode() {
      if(this.getCodeFlg){
        // 现获取接口，成功后执行下面的方法
        this.settime();
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