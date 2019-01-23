<template>
	<div class="wrapper">
		<div class="zhye-bg">
			<image class="zhye-img" :src="accountBg"></image>
		</div>
		<vheader :title="header_title"  :isshowFoot="true"></vheader>
		<div class="zhye-money">
			<text class="zhye-money-t">1000.00</text>
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
	</div>
</template>

<script>
	import Bus from '@/components/public/Bus.js'
	import header from '../../public/header'
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	export default {
		 components: {
			vheader:header
		},
		data(){
		    return{
		        headerBox_G_toBack:this.$store.state.imageUrl_G+"toBack.png",
				accountBg:this.$store.state.imageUrl_G+"account-bg.png",
				yemxBg:this.$store.state.imageUrl_G+"yemx-bg.png",
				zhtxBg:this.$store.state.imageUrl_G+"zhtx-bg.png",
				homeNoticeInfo:this.$store.state.imageUrl_G+"home_noticeInfo.png",
				header_title:'账户余额'
		    }
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
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
.headerBox_G_toBack{
	position:absolute;
	left:20px;
	top:22px;
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
	color: #333;
	text-align: center;
	margin-top: 30px;
}
.zhye-money-b{
	font-size: 26px;
	line-height: 30px;
	color: #333;
	text-align: center;
}
.zhye-link{
	flex-direction: row;
	align-items: center;
	height: 80px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #fff;
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
