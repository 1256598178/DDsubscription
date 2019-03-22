<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">关于我们</text>
			<image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
		</div>
		<div class="my-bg-box">
			<image class="my-bg" :src="myBg"></image>
			<text class="my-pro">ComingNight</text>
		</div>
		<div class="pro-intro-box">
			<text class="pro-intro">Coming night是上11  海赢开信息科技有限公司与上海智宁投资咨询有限公司共同出资打造的全国轻奢商娱经理人共享平台。</text>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
		    return{
		        headerBox_G_toBack:this.$store.state.get_img_path("toback.png"),
				myBg:this.$store.state.get_img_path("mybg.png")
		    }
		},
		created() {
			// var self = this;
			// weex.requireModule('globalEvent').addEventListener('androidback', function(e) {
	  //         self.$router.back(-1);
	  //     })
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
		    }
		}
	}
</script>

<style>
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
.my-bg{
	width: 750px;
	height: 254px;
}
.my-pro{
	width: 750px;
	position: absolute;
	bottom: 65px;
	left: 0;
	font-size: 36px;
	color: #ffd262;
	text-align: center;
}
.pro-intro-box{
	margin-left: 20px;
	margin-right: 20px;
	margin-top: -30px;
	padding-top: 40px;
	padding-bottom: 40px;
	padding-left: 20px;
	padding-right: 20px;
	border-radius: 10px;
	background-color: #fff;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.pro-intro{
	font-size: 26px;
	line-height: 36px;
	color: #333;
}
</style>
