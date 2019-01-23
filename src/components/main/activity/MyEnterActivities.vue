<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">活动</text>
			<image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
		</div>
		<div class="act-nav">
			<text class="act-nav-font" @click="toMyActivities">最新活动</text>
			<text class="act-nav-font act-nav-crt">我参加的活动</text>
		</div>
		<div class="col-nav">
			<text class="col-nav-font col-nav-crt">进行中</text>
			<text class="col-nav-font" @click="toMyEnterActivitiesNotBegin">未开始</text>
		</div>
		<list class="activity-list">
			<cell class="cell">
				<div class="act-content">
					<image class="act-img" :src="actImg"></image>
					<div class="act-content-r">
						<div class="act-list-title">
							<text class="act-title">活动名称活动名称</text>
						</div>
						<div class="act-list-intro">
							<div class="act-person">
								<text class="text-gray">限</text>
								<text class="text-red">50</text>
								<text class="text-gray">人</text>
							</div>
							<div class="act-person">
								<text class="text-gray">最低</text>
								<text class="text-red">500</text>
								<text class="text-gray">元</text>
							</div>
							<div class="act-person">
								<text class="text-gray">静安区</text>
							</div>
						</div>
						<div class="act-list-time">
							<image class="clock-icon" :src="clock"></image>
							<text class="act-time-gray">时间</text>
							<text class="act-time">2018年12月1日-2018年12月2日</text>
						</div>
						<div class="col-list-type">
							<text class="col-type">进行中</text>
						</div>
					</div>
				</div>
				<div class="act-list-btn">
					<text class="act-more" @click="toactdet">详细</text>
					<text class="act-more act-hx">核销</text>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
	import Bus from '@/components/public/Bus.js'
	export default {
		data(){
		    return{
		        headerBox_G_toBack:this.$store.state.imageUrl_G+"toBack.png",
		        actImg:this.$store.state.imageUrl_G+"act-img01.png",
		        clock:this.$store.state.imageUrl_G+"clock.png",
		    }
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
			},
			toMyActivities(){
				this.$router.push({name:'MyActivities'});
			},
			toactdet(){
				Bus.$emit('mainFootHide');
				this.$router.push({name:'actdet', params: { pagename: '活动详情页面-进行中' }});
			},
			toMyEnterActivitiesNotBegin(){
				this.$router.push({name:'MyEnterActivitiesNotBegin'})
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
.col-nav{
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 10px;
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: #dcdcdc;
}
.col-nav-font{
	font-size: 26px;
	line-height: 56px;
	color: #777;
	margin-right: 35px;
	border-bottom-width: 4px;
	border-bottom-style: solid;
	border-bottom-color: transparent;
}
.col-nav-crt{
	color: #ffd262;
	border-bottom-color: #ffd262;
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
	width: 220px;
	height: 140px;
	margin-right: 20px;
}
.act-content-r{
	flex: 1;
}
.act-title{
	height: 64px;
	font-size: 28px;
	line-height: 32px;
	color: #333;
}
.act-list-intro{
	flex-direction: row;
}
.act-person{
	width: auto;
	flex-direction: row;
	margin-right: 30px;
}
.text-gray{
	width: auto;
	font-size: 24px;
	line-height: 30px;
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
.act-time-gray{
	width: auto;
	font-size: 24px;
	line-height: 30px;
	color: #333;
	margin-right: 15px;
}
.act-time{
	width: auto;
	font-size: 24px;
	line-height: 30px;
	color: #777;
}
.col-list-type{
	margin-top: 15px;
}
.col-type{
	width: 110px;
	height: 44px;
	font-size: 24px;
	color: #fff;
	line-height: 44px;
	text-align: center;
	background-color: #66a773;
	border-radius: 10px;
}
.act-list-btn{
	flex-direction: row;
	justify-content: flex-end;
	margin-top: 20px;
}
.act-more{
	width: 150px;
	height: 60px;
	font-size: 30px;
	color: #333;
	line-height: 60px;
	text-align: center;
	background-color: #ffd700;
	border-radius: 10px;
}
.act-hx{
	background-color: #dadada;
	margin-left: 20px;
}
.activity-list{
	position: fixed;
	top: 200px;
	bottom: 100px;
	left: 0;
	right: 0;
}

</style>
