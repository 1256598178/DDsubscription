<template>
	<div class="act">
		<vheader :title="header_title"  :isshowFoot="true"></vheader>
		<div class="person">
			<text class="person-title-name">请填写完善个人资料信息</text>
			<div class="person-content-box">
				<div class="person-content-camera-box" @click="selectImage">
					<image class="person-content-camera-image" :src="orderForm.HeadImageUrl"></image>
				</div>
				<text class="person-content-camera-name">更换照片</text>
			</div>
			<div class="person-listbox">
				<input class="person-listbox-list" v-model="orderForm.NickName" placeholder="昵称" type="text" name="">
				<input class="person-listbox-list" v-model="orderForm.RealName" placeholder="姓名" type="text" name="">
				<input class="person-listbox-list" v-model="orderForm.BankAccount" placeholder="银行账户" type="text" name="">
				<input class="person-listbox-list" v-model="orderForm.AlipayAccount" placeholder="支付宝账户" type="text" name="">
				<input class="person-listbox-list" v-model="orderForm.Email" placeholder="邮箱" type="text" name="">
			</div>
		</div>
		<div class="person-btn-box">
			<text class="person-btn" @click="sure">确&nbsp;&nbsp;&nbsp;定</text>
		</div>
		<vtoast @close="closeToast" :img="toastImg" :text="toastText" v-if="openToast"></vtoast>
	</div>
</template>

<script>
import Bus from '@/components/public/Bus.js'
import BusFn from '@/components/public/BusFn.js'
import header from '../../public/header'
import toast from '../../public/toast'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
export default {
	components:{
	  vheader:header,
	  vtoast:toast
	},
  data() {
  	return {
		header_title:'个人信息',
		ajaxUrl:'api/account/setmyprofile',
		USERID: 'UserId',
		TOKEN: 'Token',
		orderForm:{
			HeadImageUrl:'',
			NickName:'',
			RealName:'',
			Email:'',
			AlipayAccount:'',
			BankAccount:''
		},
		toastImg:{
		  url:this.$store.state.get_img_path("ok.png"),
		  width:'96px',
		  height:'74px'
		},
		toastText:"提交完成",
		openToast:false
  	}
  },
  methods: {
	selectImage(){
		var self = this
		weex.requireModule('module').callPhoto(1,'0',function (map){
			weex.requireModule('module').printLogs('log1',function (log){})
			/* weex.requireModule('modal').toast({
				message: map,
				duration: 5
			}) */
			weex.requireModule('module').printLogs('log2',function (log){})
			//调用nativie中的方法打日志，得出回调成功了
			var datas = Util.JsonFormat(map)
			if(datas.status === 100){
				weex.requireModule('module').printLogs('log3',function (log){})
				Util.WeexAjax({
					url: 'api/account/uploadpicbase',
					method: 'POST',
					type: 'JSON',
					token: self.TOKEN,
					body:{
						"UserId": self.USERID,
						"ImageFile": datas.data.imageList[0].base64,
					},
					callback: function(ret) {
						var rets = ret;
						if (ret.Status == 0) {
							self.orderForm.HeadImageUrl = ret.Message
						}
					}
				})
				//self.orderForm.HeadImageUrl = datas.data.imageList[0].base64
			}
			weex.requireModule('module').printLogs('log4',function (log){})
		})
	},
	sure(){
		var self = this
		Util.WeexAjax({
		    url: this.ajaxUrl,
		    method: 'POST',
		    type: 'JSON',
		    token: self.TOKEN,
				body:{
					"UserId": self.USERID,
					"HeadImageUrl": self.orderForm.HeadImageUrl,
					"NickName": self.orderForm.NickName,
					"RealName": self.orderForm.RealName,
					"Email": self.orderForm.Email,
					"AlipayAccount": self.orderForm.AlipayAccount,
					"BankAccount": self.orderForm.BankAccount
				},
		    callback: function(ret) {
		    	var rets = ret;
				console.log(ret)
		    	if(ret.Status == 1){
		    		console.log(rets)
					self.toastText = rets.Message
					self.openToast = true;
					setTimeout(function(){
						self.closeToast()
						BusFn.mainFootShow_Fn();
						self.$router.push({name:'my'})
					},1000)
		    	}else{
					weex.requireModule('modal').toast({
						message: ret.Message,
						duration: 1
					})
				}
		    }
		})
	},
	closeToast(){
	  this.openToast = false;
	},
  },
  created() {
  	var self= this
	BusFn.mainFootHide_Fn();
	/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
		self.$router.back(-1);
		BusFn.mainFootShow_Fn();
	}) */
  	weex.requireModule('storage').getItem(this.USERID,event => {
  		self.USERID = event.data
  		console.log(event.data);
  		weex.requireModule('storage').getItem(this.TOKEN,event => {
  			self.TOKEN = event.data
  	        Util.WeexAjax({
  	            url: 'api/account/getuserinfo'+'?UserId='+self.USERID,
  	            method: 'GET',
  	            type: 'JSON',
  	            token: self.TOKEN,
  	            callback: function(ret) {
  	            	var rets = ret;
  	            	if(ret.Status == 1){
  	            		console.log(rets)
  						//self.DmandList=rets.obj.Items
  						//self.orderForm.HeadImageUrlL = rets.obj.HeadImageUrlL
						if(rets.obj.HeadImageUrl != 'undefined' && rets.obj.HeadImageUrl != 'null'){
							self.orderForm.HeadImageUrl = rets.obj.HeadImageUrl
						}else{
							self.orderForm.HeadImageUrl = self.$store.state.get_img_path("camera.png")
						}
						if(rets.obj.NickName != 'undefined' && rets.obj.NickName != 'null'){
							self.orderForm.NickName = rets.obj.NickName
						}
						if(rets.obj.RealName != 'undefined' && rets.obj.RealName != 'null'){
							self.orderForm.RealName = rets.obj.RealName
						}
						if(rets.obj.Email != 'undefined' && rets.obj.Email != 'null'){
							self.orderForm.Email = rets.obj.Email
						}
						if(rets.obj.AlipayAccount != 'undefined' && rets.obj.AlipayAccount != 'null'){
							self.orderForm.AlipayAccount = rets.obj.AlipayAccount
						}
						if(rets.obj.BankAccount != 'undefined' && rets.obj.BankAccount != 'null'){
							self.orderForm.BankAccount = rets.obj.BankAccount
						}
  						/* self.orderForm.NickName = rets.obj.NickName
  						self.orderForm.RealName = rets.obj.RealName
  						self.orderForm.Email = rets.obj.Email
  						self.orderForm.AlipayAccount = rets.obj.AlipayAccount
  						self.orderForm.BankAccount = rets.obj.BankAccount */
  	            	}
  	            }
  	        })
  		})
  	});
  }
}
</script>

<style lang="stylus" scoped>
.person{width: 750px; padding-left: 20px; padding-right: 20px;}
.person-title-name{padding-top: 30px; padding-bottom: 30px; font-size: 24px; color: #777777;}
.person-content-box{ flex-direction: row;justify-content: flex-start;align-items: center; }
.person-content-camera-box{ flex-direction: row;justify-content: center;align-items: center;width: 150px; height: 150px; background-color: #e5e5e5;}
.person-content-camera-image{width: 150px; height: 150px;}
.person-content-camera-name{flex: 1;padding-left: 20px; padding-right: 20px;font-size: 24px; color: #333333;}
.person-listbox{margin-top: 3px;}
.person-listbox-list{height: 90px; line-height: 90px;border-bottom-width: 1px; border-bottom-color: #000000; border-bottom-style: solid;font-size: 24px; color: #333333;}
.person-btn-box{margin-left: 20px;margin-right: 20px;margin-top: 80px;}
.person-btn{flex: 1; height: 80px; line-height: 80px; text-align: center; font-size: 36px; color: #333333; border-radius: 8.8px; background-color: #ffd46b;}
</style>