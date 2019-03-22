<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">活动</text>
			<!-- <image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image> -->
		</div>
		<div class="act-nav">
			<text class="act-nav-font act-nav-crt">最新活动</text>
			<text class="act-nav-font" @click="toMyEnterActivities">我参加的活动</text>
		</div>
		<list class="activity-list">
			<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="indicator-text">下拉刷新...</text>
				<loading-indicator class="indicator"></loading-indicator>
			</refresh>
			<cell class="cell" v-for="(item,index) in actionList" :key="index" v-if="actionList.length > 0">
				<div class="act-content">
					<image class="act-img" :src="item.ImageUrl"></image>
					<div class="act-content-r">
						<div class="act-list-title">
							<text class="act-title">{{item.ActionName}}</text>
						</div>
						<div class="act-list-intro">
							<div class="act-person">
								<text class="text-gray">限</text>
								<text class="text-red">{{item.LimitPersons}}</text>
								<text class="text-gray">人</text>
							</div>
							<div class="act-person">
								<text class="text-gray">最低</text>
								<text class="text-red">{{item.BottomPrice}}</text>
								<text class="text-gray">元</text>
							</div>
							<div class="act-person">
								<text class="text-gray">{{item.RegionName}}</text>
							</div>
						</div>
						<div class="act-list-time">
							<image class="clock-icon" :src="clock"></image>
							<text class="act-time-gray">时间</text>
							<text class="act-time">{{item.StartTime}}-{{item.EndTime}}</text>
						</div>
					</div>
				</div>
				<div class="act-list-btn">
					<text class="act-more"  @click="toactdet(item.ActionId)">详细</text>
				</div>
			</cell>
			<cell v-if="actionList.length == 0">
				<v-nomore></v-nomore>
			</cell>
		</list>
		<v-loading v-if="temBool.loading"></v-loading>
	</div>
</template>

<script>
	import Bus from '@/components/public/Bus.js'
	import BusFn from '@/components/public/BusFn.js'
	import Util from '@/components/public/utils.js'
	import Storage from '@/components/public/storage.js'
	import NoMore from '@/components/public/NoMore.vue'
	export default {
		components: {
			"v-nomore": NoMore,
		},
		data(){
		    return{
				temBool: {
				    loading: true,
				},
		        headerBox_G_toBack:this.$store.state.get_img_path("toback.png"),
				actImg:this.$store.state.get_img_path("act_img01.png"),
				clock:this.$store.state.get_img_path("clock.png"),
				ajaxUrl:'api/action/getactionlist',
				USERID: 'UserId',
				TOKEN: 'Token',
				refreshing: false,//下拉刷新
				loadinging: false, //上拉加载
				loadType: true,
				TypeStatus:0,
				actionList:[]
		    }
		},
		methods:{
			toMyEnterActivities(){
				this.$router.push({name:'MyEnterActivities'});
			},
			toactdet(ActionId){
				Bus.$emit('mainFootHide');
				this.$router.push({
					name:'actdet',
					params: { 
						pagename: '活动详情页面-最新活动' ,
						actionId: ActionId,
						type: 0
					},
				});
			},
			onrefresh(){
				if(this.refreshing) return;
				this.refreshing = true;
				this.creat()
			},
			creat(){
				var self = this
				Util.WeexAjax({
				    url: this.ajaxUrl+'?UserId='+self.USERID,
				    method: 'GET',
				    type: 'JSON',
				    token: self.TOKEN,
				    callback: function(ret) {
				    	var rets = ret;
				    	if(ret.Status == 1){
				    		console.log(rets)
							self.actionList=rets.obj
							self.refreshing = false
							self.temBool.loading = false
							weex.requireModule('modal').toast({
								message: "刷新成功",
								duration: 1
							})
				    	}else{
							weex.requireModule('modal').toast({
								message: "刷新失败",
								duration: 1
							})
						}
				    }
				})
			}
		},
		created() {
			var self= this
			BusFn.mainFootShow_Fn();
			/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
				self.$router.push({name:'home'});
			}) */
			weex.requireModule('storage').getItem(this.USERID,event => {
				self.USERID = event.data
				console.log(event.data);
				weex.requireModule('storage').getItem(this.TOKEN,event => {
					self.TOKEN = event.data
					Util.goLogin({
						 "USERID": self.USERID,
						 "TOKEN": self.TOKEN,
						 "success": function(){
							 //self.$router.push({name: 'home'})
							 self.creat()
						 },
						 "fail": function(){
							 self.$router.push({name: 'login'})
						 }
					})
				})
			});
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
.refresh {
	width: 750px;
	height: 120px;
	background-color: #f5f5f5;
	display: -ms-flex;
	display: -webkit-flex;
	display: flex;
	-ms-flex-align: center;
	-webkit-align-items: center;
	-webkit-box-align: center;
	align-items: center;
	text-align: center;
}
.indicator-text {
    color: #666666;
    font-size: 30px;
    text-align: center;
	margin-top: 16px;
}
.indicator {
	margin-top: 10px;
	height: 40px;
	width: 40px;
	color: #999999;
}

.loading {
	width: 750px;
	height: 120px;
	display: -ms-flex;
	display: -webkit-flex;
	display: flex;
	background-color: #f5f5f5;
	-ms-flex-align: center;
	-webkit-align-items: center;
	-webkit-box-align: center;
	align-items: center;
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
	color: #777777;
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
	padding-top: 25px;
	padding-bottom: 15px;
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
	height: 220px;
	margin-right: 20px;
}
.act-content-r{
	flex: 1;
}
.act-title{
	height: 64px;
	font-size: 28px;
	line-height: 32px;
	color: #333333;
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
	color: #333333;
	margin-right: 15px;
}
.act-time{
	width: 400px;
	font-size: 24px;
	line-height: 30px;
	color: #777777;
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
	color: #333333;
	line-height: 60px;
	text-align: center;
	background-color: #ffd700;
	border-radius: 10px;
}
.activity-list{
	position: fixed;
	top: 200px;
	bottom: 100px;
	left: 0;
	right: 0;
}

</style>
