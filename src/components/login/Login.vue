<template>
  <div class="LoginWarp wrapper">
    <div class="LoginBg">
      <image class="LoginBg_img" :src="LoginBg_img"  style="width:750px;height:1250px"></image>
    </div>
    <div class="LoginInfo">
      <div class="LoginLogo_imgbox">
        <image class="LoginLogo_img" :src="LoginLogo_img" style="width:279px;height:281px"></image>
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
              <input type="password" v-model="loginData.password" class='sec1input' placeholder="请输入密码" />
            </div>
          </div>
          <div class="forgetPas">
            <text class="forgetPas_text" @click="forgetPas_F">忘记密码</text>
          </div>
        </div>
        <text class="LoginButton" @click="toHome">登　录</text>
        <text class="SignText" @click="Sign">注册用户</text>
        <div class="otherLoginBox">
          <div class="otherLoginBox_line"></div>
          <text class="otherLoginBox_text">其他登录方式</text>
          <div class="otherLoginBox_line"></div>
        </div>
        <div class="otherLogins">
          <div class="otherLogin_item">
            <image :src="wxlogin_img" style="width:84px;height:84px"></image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      LoginBg_img: this.$store.state.imageUrl_G+"Login_bg.png",
      LoginLogo_img: this.$store.state.imageUrl_G+"Login_logo.png",
      username_img: this.$store.state.imageUrl_G+"Login_ico_yym.png",
      password_img: this.$store.state.imageUrl_G+"Login_ico_mm.png",
      wxlogin_img: this.$store.state.imageUrl_G+"Login_wx.png",
      loginData:{
        username:'',
        password:''
      },
      storage:null
    }
  },
  mounted(){
    this.storage = weex.requireModule('storage')
  },
  methods:{
    forgetPas_F(){
      this.$router.push({name:'findPsw'})
    },
    validator_login(user,pas){
      // todo 登录验证接口
      return true;
    },
    toHome(){
      if(this.validator_login()){
        this.storage.setItem('comingNight_login',JSON.stringify(this.loginData))
        this.$router.push({name:'main'})
      }
    },
    Sign(){
      this.$router.push({name:'register'})
    }
  }
};
</script>

<style scoped>
.LoginInfo {
  justify-content: center;
  width: 710px;
  position: absolute;
  top: 0;
  left: 0;
  height: 1250px;
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