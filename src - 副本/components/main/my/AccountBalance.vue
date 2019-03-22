<template>
	<div class="wrapper">
		<div class="zhye-bg">
			<image class="zhye-img" :src="accountBg"></image>
		</div>
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">账户余额</text>
		    <div class="back_box" @click="toBack_G">
		      <image :src="$store.state.get_img_path('toback.png')" style="width:31px;height:44px;"></image>
		    </div>
		</div>
		<div class="zhye-money">
			<text class="zhye-money-t">{{money}}</text>
			<text class="zhye-money-b">账户余额（元）</text>
		</div>
		<div class="zhye-link" @click="toPage('BalanceIncome',{text:'text'})">
			<image class="zhye-link-icon" :src="yemxBg"></image>
			<text class="zhye-link-text">余额明细</text>
			<image class="zhye-arrow-icon" :src="homeNoticeInfo"></image>
		</div>
		<div class="zhye-link" @click="towithdrawal">
			<image class="zhye-link-icon" :src="zhtxBg"></image>
			<text class="zhye-link-text">账户提现</text>
			<image class="zhye-arrow-icon" :src="homeNoticeInfo"></image>
		</div>
		<div class="zhye-link" @click="toPage('payPsw',{text:'text'})">
			<image class="zhye-link-icon" :src="payPsw"></image>
			<text class="zhye-link-text">支付密码设置</text>
			<image class="zhye-arrow-icon" :src="homeNoticeInfo"></image>
		</div>
	</div>
</template>

<script>
	import Bus from '@/components/public/Bus.js'
	import BusFn from '@/components/public/BusFn.js'
	import header from '../../public/header'
	import Util from '@/components/public/utils.js'
	import Storage from '@/components/public/storage.js'
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	export default {
		 components: {
			vheader:header
		},
		data(){
		    return{
		        headerBox_G_toBack:this.$store.state.get_img_path("toback.png"),
				accountBg:this.$store.state.get_img_path("accountbg.png"),
				yemxBg:this.$store.state.get_img_path("yemxbg.png"),
				zhtxBg:this.$store.state.get_img_path("zhtxbg.png"),
				payPsw:this.$store.state.get_img_path("paypsw.png"),
				homeNoticeInfo:this.$store.state.get_img_path("home_noticeinfo.png"),
				header_title:'账户余额',
				money:'',
				USERID: 'UserId',
				TOKEN: 'Token',
		    }
		},
		methods:{
		    toBack_G(){
				Bus.$emit('mainFootShow');
		        this.$router.push({name:'myIndex'});
			},
			toPage(pagename,params={}){
				// alert(params)
				this.$router.push({
					'name':pagename,
					'params':params
				})
			},
			towithdrawal(){
				Bus.$emit('mainFootHide');
				this.$router.push({
					name:'withdrawal'
				})
			}
		},
		created(){
			var self = this
			BusFn.mainFootHide_Fn();
			/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
				self.$router.push({name:'myIndex'});
				Bus.$emit('mainFootShow');
			}) */
			weex.requireModule('storage').getItem(this.USERID,event => {
				self.USERID = event.data
				console.log(event.data);
				weex.requireModule('storage').getItem(this.TOKEN,event => {
					self.TOKEN = event.data
					Util.WeexAjax({
					    url: 'api/account/getmybalance?UserId='+self.USERID,
					    method: 'GET',
					    type: 'JSON',
					    token: self.TOKEN,
					    callback: function(ret) {
					    	var rets = ret;
					    	if(ret.Status == 1){
					    		console.log(rets)
								//self.DmandList=rets.obj.Items
								self.money = rets.obj.BalanceNum
					    	}
					    }
					})
				})
			});
		}
	}
</script>

<style scoped>
.zhye-bg{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #f9f9f9;
}
.zhye-img{
	width: 750px;
	height: 353px;
}
.headerBox_G{
  height:90px;
  width:750px;
  border-bottom-width:2px;
  border-bottom-color:#eaeaea;
  border-bottom-style:solid;
}
.back_box{
  position:absolute;
  left:0;
  top:0;
  height: 90px;
  width: 71px;
  justify-content: center;
  align-items: center;
}
.headerBox_G_pageTip{
  color:#333333;
  font-size:36px;
  line-height:88px;
  text-align:center;
}
.account-head{
	border-bottom-color: transparent;
}
.zhye-money{
	width: 750px;
	height: 220px;
}
.zhye-money-t{
	font-size: 62px;
	line-height: 64px;
	color: #333333;
	text-align: center;
	margin-top: 30px;
}
.zhye-money-b{
	font-size: 26px;
	line-height: 30px;
	color: #333333;
	text-align: center;
}
.zhye-link{
	flex-direction: row;
	align-items: center;
	height: 80px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #ffffff;
}
.zhye-link-icon{
	width: 29px;
	height: 29px;
	margin-right: 15px;
}
.zhye-link-text{
	flex: 1;
	font-size: 26px;
	line-height: 80px;
	color: #333;
}
.zhye-arrow-icon{
	width: 13px;
	height: 20px;
}
</style>
