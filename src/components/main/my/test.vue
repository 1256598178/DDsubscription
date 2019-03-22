<template>
	<div>
		<vheader :title="header_title"  :isshowFoot="true"></vheader>
		<text class="btn gen" @click="gen">获取二维码</text>
		<text class="btn scan" @click="scan">扫码</text>
		<text class="btn pay" @click="pay">支付</text>
		<text class="btn login" @click="login">登录</text>
		<text class="btn fx" @click="fx">分享</text>
		<text class="btn dw" @click="dw">定位</text>
		<text class="btn txxz" @click="txxz">头像选择</text>
		<text class="btn back" @click="back">回退</text>
	</div>
</template>

<script>
	import header from '../../public/header'
	export default {
		components: {
			vheader:header
		},
		data(){
		    return{
		        headerBox_G_toBack:this.$store.state.imageUrl_G+"toBack.png",
				myBg:this.$store.state.imageUrl_G+"my-bg.png",
				header_title:'测试'
		    }
		},
		methods:{
			gen(){
				weex.requireModule('module').genQrCode("weex is beach",function (map){
					//modal.toast({title:"wori",duration:2})
					//console.log(map);
					weex.requireModule('modal').toast({
					    message: map,
					    duration: 5
					})
					//调用nativie中的方法打日志，得出回调成功了
					weex.requireModule('module').log(map);
				})
			},
			scan(){
                weex.requireModule('module').scanQrCode("weex is beach",function (map){
					//modal.toast({title:"wori",duration:2})
					//console.log(map);
					weex.requireModule('modal').toast({
					    message: map,
					    duration: 5
					})
					//调用nativie中的方法打日志，得出回调成功了
					weex.requireModule('module').log(map);
                })
			},
			pay(){
				weex.requireModule('module').printLogs("weex is beach",function (map){
					//modal.toast({title:"wori",duration:2})
					//console.log(map);
					weex.requireModule('modal').toast({
					    message: map,
					    duration: 5
					})
					//调用nativie中的方法打日志，得出回调成功了
					weex.requireModule('module').log(map);
				})
			},
			login(){
				weex.requireModule('module').printLogs("weex is beach",function (map){
					//modal.toast({title:"wori",duration:2})
					//console.log(map);
					weex.requireModule('modal').toast({
					    message: map,
					    duration: 5
					})
					//调用nativie中的方法打日志，得出回调成功了
					weex.requireModule('module').log(map);
				})
			},
			fx(){
				weex.requireModule('module').share("标题","描述","https://img-blog.csdn.net/20151112155229755","https://www.baidu.com/",function (map){
					//modal.toast({title:"wori",duration:2})
					//console.log(map);
					weex.requireModule('modal').toast({
					    message: map,
					    duration: 5
					})
					//调用nativie中的方法打日志，得出回调成功了
					weex.requireModule('module').log(map);
				})
			},
			dw(){
				weex.requireModule('module').getLocation(function (map){
					//modal.toast({title:"wori",duration:2})
					//console.log(map);
					weex.requireModule('modal').toast({
					    message: map,
					    duration: 5
					})
					//调用nativie中的方法打日志，得出回调成功了
					weex.requireModule('module').log(map);
				})
			},
			txxz(){
			weex.requireModule('module').callPhoto('1','0',function (map){
			 weex.requireModule('modal').toast({
				 message: map,
				 duration: 5
			 })
			 //调用nativie中的方法打日志，得出回调成功了
			 weex.requireModule('module').log(map);
			})
		   },
			back(){
				weex.requireModule('module').printLogs("weex is beach",function (map){
					//modal.toast({title:"wori",duration:2})
					//console.log(map);
					weex.requireModule('modal').toast({
					    message: map,
					    duration: 5
					})
					//调用nativie中的方法打日志，得出回调成功了
					weex.requireModule('module').log(map);
				})
			}
		}
	}
</script>

<style>
	.btn{
		width: 710px;
		height: 60px;
		background-image: linear-gradient(to right, #ffd262, #ffe8b0);
		color: #333333;
		text-align: center;
		line-height: 60px;
		margin-left: 20px!important;
		margin-top: 20px!important;
	}
</style>
