<template>
  <div class="wrapper">
    <vheader :title="header_title"></vheader>
    <list>
			<cell class="mainContain">
			  <text class="textinfo">请设置一个支付密码</text>
			  <div class="sec1">
			    <div class="sec1item newpassword">
			      <div class="sec1itembox">
			        <!-- <image :src="password_img" class="sec1img" style="width:34px;height:34px"></image> -->
			        <input type="password" maxlength="6" v-model="Psw" class='sec1input' placeholder="输入密码" />
			      </div>
			    </div>
			    <div class="sec1item confirmpassword">
			      <div class='sec1itembox'>
			        <!-- <image :src="password_img" class="sec1img" style="width:31px;height:39px"></image> -->
			        <input type="password" maxlength="6" v-model="Psws" class='sec1input' placeholder="确认输入密码" />
			      </div>
			    </div>
					<text class="textinfo">6位（数字）</text>
			  </div>
			  <text class="LoginButton" @click="submit">确认设置</text>
			</cell>
		</list>
		<vtoast @close="closeToast" :img="toastImg" :text="toastText" v-if="openToast"></vtoast>
  </div>
</template>

<script>
import header from '@/components/public/header'
import mixin from '@/components/public/mixins.js'
import BusFn from '@/components/public/BusFn.js'
import toast from '../../public/toast'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
export default {
  components:{
    vheader:header,
		vtoast:toast
  },
  data(){
    return{
      header_title:'支付密码设置',
      password_img: mixin.get_img_path("login_ico_mm.png"),
			Psw:'',
			Psws:'',
			ajaxUrl: 'api/account/setpaypassword',
			USERID: 'UserId',
			TOKEN: 'Token',
			toastImg:{
			  url:this.$store.state.get_img_path("ok.png"),
			  width:'96px',
			  height:'74px'
			},
			toastText:"提交完成",
			openToast:false
    }
  },
  methods:{
		closeToast(){
		  this.openToast = false;
		},
    submit(){
			var self = this
			if(self.Psw === self.Psws && self.Psw.replace(/(^\s+)|(\s+$)/g,"") != '' && self.Psw.length == 6){
				Util.WeexAjax({
				    url: this.ajaxUrl,
				    method: 'POST',
				    type: 'JSON',
				    token: self.TOKEN,
						body:{
							"UserId": self.USERID,
							"PassWord": self.Psw,
						},
				    callback: function(ret) {
				    	var rets = ret;
				    	if(ret.Status == 1){
				    		console.log(ret)
								self.toastText = rets.Message
								self.openToast = true;
								setTimeout(function(){
									self.closeToast()
									self.$router.push({name:'AccountBalance'})
								},1000)
				    	}else{
								weex.requireModule('modal').toast({
									message: ret.Message,
									duration: 1
								})
							}
				    }
				})
			}else{
				weex.requireModule('modal').toast({
					message: '格式错误，请重新输入',
					duration: 1
				})
			}
		}
  },
	created(){
		var self = this
		BusFn.mainFootHide_Fn();
		weex.requireModule('storage').getItem(this.USERID, event => {
			self.USERID = event.data
			weex.requireModule('storage').getItem(this.TOKEN, event => {
				self.TOKEN = event.data
			})
		})
	}
}
</script>

<style scoped>
.wrapper{
  width:750px;
}
.textinfo{
  font-size:26px;
  color:#777777;
  line-height:70px;
	margin-left: 15px;
	margin-top: 10px;
}
.sec1item {
  /* padding-left: 40px;
  padding-right: 40px;
  margin-top: 60px; */
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
  font-size: 30px;
  line-height: 90px;
  height: 90px;
}
.LoginButton {
  margin-top: 90px;
	margin-left: 20px;
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