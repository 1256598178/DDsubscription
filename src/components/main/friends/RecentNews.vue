<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">朋友圈</text>
		</div>
		<div class="act-nav">
			<text class="act-nav-font act-nav-crt">最新动态</text>
			<text class="act-nav-font" @click="toMyAttention">我的关注</text>
		</div>
		<list class="activity-list">
			<cell class="cell">
				<div class="act-content">
					<image class="act-img" :src="photo"></image>
					<div class="act-content-r">
						<div class="act-list-title">
							<text class="act-title">张某某-酒店经理人</text>
						</div>
						<div class="act-list-intro">
							<text class="text-gray">就在今天 · OPUS×HENRY FONG </text>
							<text class="text-gray">#致敬国际音乐制作人#</text>
							<text class="text-gray">震慑电音界的EDM骑士</text>
							<text class="text-gray">携强热带季风狂卷寒流</text>
							<text class="text-gray">炸场狂魔十级电音巨浪</text>
						</div>
						<div class="act-list-time">
							<text class="act-time">1小时</text>
							<div class="comments-box">
								<div class="comm" ref="comm">
									<div class="like">
										<image class="like-img" :src="likeW"></image>
										<text class="text-w">赞</text>
									</div>
									<div class="comments border-l">
										<image class="coms-img" :src="commentsW"></image>
										<text class="text-w">评论</text>
									</div>
								</div>
							</div>
							<image class="com-img" @click="comment" :src="commentsY"></image>
						</div>
						<div class="comments-content">
							<div class="like-person">
								<image class="like-img" :src="likeY"></image>
								<text class="text-y">张某某-酒店经理人</text>
							</div>
							<div class="com-f">
								<text class="com-name">张某某-酒店经理人</text>
								<text class="com-text">:非常不错</text>
							</div>
						</div>
					</div>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	export default {
		data(){
		    return{
		        headerBox_G_toBack:this.$store.state.imageUrl_G+"toBack.png",
				photo:this.$store.state.imageUrl_G+"photo.png",
		        likeW:this.$store.state.imageUrl_G+"like-w-icon.png",
		        likeY:this.$store.state.imageUrl_G+"like-y-icon.png",
		        commentsW:this.$store.state.imageUrl_G+"comments-w-icon.png",
		        commentsY:this.$store.state.imageUrl_G+"comments-y-icon.png",
		    }
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
		    },
			comment() {
				var com=this.$refs.comm
				animation.transition(com, {
				  styles: {
						transform: 'translate(-270px, 0)'
				  },
				  duration: 800, //ms
				  timingFunction: 'ease',
				  needLayout:false,
				  delay: 0 //ms
				}, function () {
				  //modal.toast({ message: 'animation finished.' })
				})
			},
			toMyAttention(){
				this.$router.push({name:'MyAttention'});
			}
		}
	}
</script>

<style scoped>
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
.act-nav{
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 27px;
	padding-bottom: 27px;
	flex-direction: row;
	justify-content: center;
}
.act-nav-font{
	font-size: 32px;
	line-height: 52px;
	color: #777;
	margin-left: 25px;
	margin-right: 25px;
	border-bottom-width: 4px;
	border-bottom-style: solid;
	border-bottom-color: transparent;
}
.act-nav-crt{
	font-weight: bold;
	color: #ffd262;
	border-bottom-color: #ffd262;
}
.cell{
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: #dcdcdc;
}
.act-content{
	flex-direction: row;
}
.act-img{
	width: 80px;
	height: 80px;
	margin-right: 20px;
}
.act-content-r{
	flex: 1;
}
.act-title{
	font-size: 28px;
	line-height: 30px;
	color: #d69900;
	margin-bottom: 15px;
}
.act-person{
	width: auto;
	flex-direction: row;
	margin-right: 30px;
}
.text-gray{
	width: auto;
	font-size: 26px;
	line-height: 40px;
	color: #333;
}
.text-red{
	width: auto;
	font-size: 24px;
	line-height: 30px;
	color: #ff6204;
}
.act-list-time{
	flex-direction: row;
	margin-top: 15px;
}
.clock-icon{
	width: 30px;
	height: 30px;
	margin-right: 8px;
}
.act-list-time{
	height: 70px;
	flex-direction: row;
}
.comments-box{
	width: 270px;
	overflow: hidden;
}
.comm{
	width: 270px;
	height: 70px;
	padding-top: 14px;
	padding-bottom: 14px;
	border-radius: 10px;
	color: #fff;
	background-color: #585858;
	flex-direction: row;
	margin-left: 270px;
}
.like{
	width: 135px;
	align-items: center;
	flex-direction: row;
	justify-content: center;
}
.comments{
	width: 135px;
	align-items: center;
	flex-direction: row;
	justify-content: center;
}
.like-img{
	width: 26px;
	height: 26px;
}
.coms-img{
	width: 28px;
	height: 25px;
}
.com-img{
	width: 34px;
	height: 32px;
	margin-top: 19px;
	margin-left: 5px;
}
.text-w{
	width: auto;
	font-size: 24px;
	color: #fff;
	margin-left: 20px;
}
.border-l{
	border-left-width: 1px;
	border-left-style: solid;
	border-left-color: #626262;
}
.act-time-gray{
	width: auto;
	font-size: 24px;
	line-height: 30px;
	color: #333;
	margin-right: 15px;
}
.act-time{
	flex: 1;
	font-size: 24px;
	line-height: 30px;
	color: #777;
	margin-top: 20px;
}
.comments-content{
	background-color: #fafafa;
}
.like-person{
	padding-top: 13px;
	padding-bottom: 13px;
	padding-left: 20px;
	padding-right: 20px;
	flex-direction: row;
	align-items: center;
}
.com-f{
	padding-top: 13px;
	padding-bottom: 13px;
	padding-left: 20px;
	padding-right: 20px;
	flex-direction: row;
	align-items: center;
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: #dcdcdc;
}
.text-y{
	font-size: 26px;
	line-height: 40px;
	color: #d69900;
	margin-left: 15px;
}
.com-name{
	font-size: 26px;
	line-height: 40px;
	color: #d69900;
}
.com-text{
	font-size: 26px;
	line-height: 40px;
	color: #333;
}
.arrow-bg{
	width: 18px;
	height: 13px;
	position: absolute;
	top: -13px;
	left: 28px;
}
.activity-list{
	position: fixed;
	top: 200px;
	bottom: 100px;
	left: 0;
	right: 0;
}

</style>
