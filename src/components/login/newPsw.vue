<template>
  <div class="wrapper">
    <header :title="header_title"></header>
    <div class="mainContain">
      <text class="textinfo">请输入您的新密码，密码格式为6-8位，由大写字母、小写字母、数字构成</text>
      <div class="sec1">
        <div class="sec1item newpassword">
          <div class="sec1itembox">
            <image :src="password_img" class="sec1img" style="width:34px;height:34px"></image>
            <input type="password" class='sec1input' placeholder="请输入新密码" />
          </div>
        </div>
        <div class="sec1item confirmpassword">
          <div class='sec1itembox'>
            <image :src="password_img" class="sec1img" style="width:31px;height:39px"></image>
            <input type="password" class='sec1input' placeholder="请确认新密码" />
          </div>
        </div>
      </div>
      <text class="LoginButton">提　交</text>
    </div>
  </div>
</template>

<script>
import header from '../public/header'
export default {
  components:{
    header
  },
  data(){
    return{
      header_title:'设置新密码',
      password_img: "http://192.168.2.201:8082/images/Login_ico_mm.png"
    }
  },
  methods:{
    
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
</style>