<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">活动</text>
			<!-- <image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image> -->
		</div>
		<div class="act-nav">
			<text class="act-nav-font" @click="toMyActivities">最新活动</text>
			<text class="act-nav-font act-nav-crt">我参加的活动</text>
		</div>
		<div class="col-nav">
			<text class="col-nav-font" @click="toMyEnterActivities">进行中</text>
			<text class="col-nav-font  col-nav-crt">未开始</text>
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
						<div class="col-list-type">
							<text class="col-type">未开始</text>
						</div>
					</div>
				</div>
				<div class="act-list-btn">
					<text class="act-more" @click="toactdet(item.MyActionId)">详细</text>
					<text class="act-more act-hx" @click="getCode(item.MyActionId)">核销</text>
				</div>
				<div class="model-box" v-if="model.boolSign">
					<div class="model-wrapper">
				    	<image class="model-close" :src="cuo" @click="close()"></image>
				    	<text class="model-title">{{model.title}}</text>
						<image class="wx-code" :src="code"></image>
				    	<div class="model-bottom-btn-wrapper">
				    		<text class="model-bottom-btn model-bottom-btn-left" @click="sure()">确定</text>
				    	</div>
				    </div>
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
				code:this.$store.state.get_img_path("code.png"),
				cuo:this.$store.state.get_img_path("cuo.png"),
				ajaxUrl:'api/action/getmyactionlist',
				ajaxUrl1:'api/action/getparticactionqrCode',
				USERID: 'UserId',
				TOKEN: 'Token',
				refreshing: false,//下拉刷新
				loadinging: false, //上拉加载
				loadType: true,
				TypeStatus:0,
				actionList:[],
				model:{
					boolSign: false,
					payInfo: false,
					title: '活动核销',
				}
		    }
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
			},
			toMyActivities(){
				this.$router.push({name:'MyActivities'});
			},
			toactdet(MyActionId){
				Bus.$emit('mainFootHide');
				this.$router.push({
					name:'actdet',
					params: { 
						pagename: '活动详情页面-未开始活动' ,
						actionId: MyActionId,
						type: 1
					},
				});
			},
			toMyEnterActivities(){
				this.$router.push({name:'MyEnterActivities'})
			},
			getCode(actionid){
				var self = this;
				Util.WeexAjax({
					url: this.ajaxUrl1+'?UserId='+self.USERID+'&MyActionId='+actionid,
					method: 'GET',
					type: 'JSON',
					token: self.TOKEN,
					callback: function(ret) {
						var rets = ret;
						if(ret.Status == 1){
							weex.requireModule('module').printLogs('log1',function (log){})
							var codeStr = rets.obj.QrCode;
							weex.requireModule('module').printLogs('log2',function (log){})
							weex.requireModule('module').genQrCode(codeStr,function (map){
								weex.requireModule('module').printLogs('log3',function (log){})
								weex.requireModule('modal').toast({
									message: map,
									duration: 1
								})
								var datas = Util.JsonFormat(map)
								self.code = datas.data.base64;
								self.model.boolSign = true;
								weex.requireModule('module').printLogs('log4',function (log){})
							})
							// console.log(codeStr);
							// self.model.boolSign = true;
						}
					}
				})
			},
			onrefresh(){
				if(this.refreshing) return;
				this.refreshing = true;
				this.creat()
			},
			creat(){
				var self = this
				Util.WeexAjax({
				    url: this.ajaxUrl+'?UserId='+self.USERID+'&StatusType=0',
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
			        self.creat()
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
	color: #777777;
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
	color: #333333;
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
	flex: 1;
	font-size: 24px;
	line-height: 30px;
	color: #777777;
}
.col-list-type{
	margin-top: 15px;
}
.col-type{
	width: 110px;
	height: 44px;
	font-size: 24px;
	color: #ffffff;
	line-height: 44px;
	text-align: center;
	background-color: #d86060;
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
	color: #333333;
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
	top: 270px;
	bottom: 100px;
	left: 0;
	right: 0;
}
.model-box{position: fixed;flex-direction: row;justify-content: flex-start;align-items: center;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0, 0, 0, .4)}
.model-wrapper{width: 710px;margin-left: 20px;margin-right: 20px;background-color: #fff;border-radius: 5px;padding-top: 35px;padding-left: 60px;padding-right: 60px;padding-bottom: 20px;border-radius: 15px;}
.model-close{position: absolute;width: 37px;height: 37px;top: 20px;right: 20px;}
.model-title{margin-bottom: 20px;font-size: 36px;color: #000000;line-height: 40px;text-align: center;}
.model-subtitle{margin-top: 40px;margin-bottom: 17px;font-size: 24px;color: #a3a3a3;text-align: center;}
.model-bottom-btn-wrapper{flex-direction: row;justify-content: center;align-items: center;margin-top: 43px;}
.model-bottom-btn{width: 220px;height: 88px;line-height: 88px;margin-left: 10px;margin-right: 10px;text-align: center;border-radius: 15px;}
.model-bottom-btn-left{background-color: #ffd700;}
.model-bottom-btn-right{background-color: #dadada;}
.model-bottom-btn-pay{font-size: 36px;color: #333333;}
.model-pay-wrapper{margin-top: 20px;}
.model-pay-list{flex-direction: row;justify-content: space-between;align-items: center;padding-top: 20px;padding-bottom: 20px;padding-left: 10px;padding-right: 10px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #f4f4f4;}
.model-pay-list-left{flex-direction: row;justify-content: center;align-items: center;}
.pay-image{width: 28px;height: 28px;margin-right: 20px;}
.pay-dui{width: 30px;height: 30px;}
.pay-title{font-size: 24px;color: #333333;}
.model-pay-money{font-size: 26px;color: #ff6204;}
.wx-code{width: 350px;height: 350px;margin-left: 120px;}
</style>
