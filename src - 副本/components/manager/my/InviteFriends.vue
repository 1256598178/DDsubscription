<template>
	<div class="act">
		<!-- <v-header :title="活动详情"></v-header> -->
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">邀请好友</text>
			<image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>

		</div>
		<div class="person">
			<image class="person-content-camera-image" src="../src/static/images/ab1.png"></image>
			<div class="invite-box">
				<text class="invite-person-btn">邀请好友注册，好友成功消费后，进行消费金额返利，具体规则如下：</text>
				<text class="invite-person-btn">1、直接好友：返利5%；</text>
				<text class="invite-person-btn">2、间接好友（直接好友所邀请好友）：返利1%；</text>
				<text class="invite-person-btn">3、间接好友所邀请的好友，不享受返利。</text>
			</div>
			<text class="person-btn">确&nbsp;&nbsp;&nbsp;定</text>
			<div class="share-box">
				<div class="share-box-title">
					<div class="share-line"></div>
					<text class="invite-person invite-person-title">分享至</text>
					<div class="share-line"></div>
				</div>
				<div class="share-body">
					<div class="share-body-list">
						<image class="person-list-image" src="../src/static/images/share1.png"></image>
						<text class="invite-person invite-person-name">分享至</text>
					</div>
					<div class="share-body-list">
						<image class="person-list-image" src="../src/static/images/share2.png"></image>
						<text class="invite-person invite-person-name">分享至</text>
					</div>
					<div class="share-body-list">
						<image class="person-list-image" src="../src/static/images/share3.png"></image>
						<text class="invite-person invite-person-name">分享至</text>
					</div>
					<div class="share-body-list">
						<image class="person-list-image" src="../src/static/images/share4.png"></image>
						<text class="invite-person invite-person-name">分享至</text>
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
  		headerBox_G_toBack:this.$store.state.get_img_path("toback.png"),
  	}
  },
  methods: {
		toBack_G(){
        this.$router.back(-1);
    }
  }
}
</script>

<style lang="stylus" scoped>
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
.headerBox_G_addStock{
	position:absolute;
	right:20px;
	top:22px;
	color: #a6a6a6;
}
.headerBox_G_pageTip{
	color:#333333;
	font-size:36px;
	line-height:88px;
	text-align:center;
}
.person{position: fixed; top: 90px; left: 0; right: 0; bottom: 0; width: 750px;}
.person-content-camera-image{position: absolute; top: 0; width: 750px; height: 455px;}
.invite-box{margin-top: 185px; width: 710px; margin-left: 20px; margin-right: 20px;padding-top: 40px;padding-bottom: 80px; padding-left: 25px; padding-right: 25px;border-radius: 10px;background-color: #e4b94e}
.invite-person-btn{font-size: 26px; color: #ffffff; line-height: 40px;}
.person-btn{margin-top: 80px; margin-left: 20px;width: 710px; height: 80px; line-height: 80px; text-align: center; font-size: 36px; color: #333333; border-radius: 8.8px; background-color: #ffd46b;}
.share-box{margin-top: 80px;width: 710px;margin-left: 20px; marign-right: 20px;}
.share-box-title{display: flex; flex-direction: row;justify-content: center;align-items: center;}
.share-line{flex: 1; height: 1px; background-color: #bfbfbf;}
.invite-person{padding-left: 50px; padding-right: 20px; font-size: 20px; color: #777777;}
.invite-person-title{padding-left: 50px; padding-right: 50px;}
.share-body{margin-top: 25px;display: flex; flex-direction: row;justify-content: space-around;align-items: center;}
.share-body-list{display: flex; flex-direction: column;align-items: center;}
.person-list-image{width: 84px; height: 84px;}
.invite-person-name{margin-top: 20px; font-size: 22px;padding-left: 0; padding-right: 0;}
</style>