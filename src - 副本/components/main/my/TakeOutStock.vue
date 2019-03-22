<template>
	<div class="wrapper">
		<vheader :title="header_title"></vheader>
		<div class="act-nav">
			<div class="act-nav-font" @click="toMyStock">
				<text class="act-nav-fonts">存入</text>
				<text class="act-nav-fonts">({{wineLength}})</text>
			</div>
			<text class="act-nav-font act-nav-crt">取出</text>
		</div>
		<list class="activity-list">
			<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="indicator-text">下拉刷新...</text>
					<loading-indicator class="indicator"></loading-indicator>
			</refresh>
			<cell class="cell" v-for="(item,index) in WineList" :key="index" v-if="WineList.length > 0">
				<div class="act-content">
					<div class="act-stock-t">
						<text class="wine-name">{{item.WineName}}</text>
						<text class="wine-num">{{item.TakeAmount}}瓶</text>
					</div>
					<div class="act-stock-b">
						<text class="text-gray">位置：{{item.ShopName}}</text>
						<text class="text-gray">{{item.AddTime}}</text>
					</div>
				</div>
			</cell>
			<cell v-if="WineList.length == 0">
				<v-nomore :changeName="true" :name="nomoreName"></v-nomore>
			</cell>
			<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
			  <text class="indicator-text">上拉加载更多 ...</text>
			  <loading-indicator class="indicator"></loading-indicator>
			</loading>
		</list>
		<v-loading v-if="temBool.loading"></v-loading>
	</div>
</template>

<script>
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	import header from '../../public/header'
	import BusFn from '@/components/public/BusFn.js'
	import NoMore from '@/components/public/NoMore.vue'
	import Util from '@/components/public/utils.js'
	import Storage from '@/components/public/storage.js'
	export default {
		components: {
			vheader:header,
			"v-nomore": NoMore,
		},
		data(){
		    return{
				temBool: {
				    loading: true,
				},
				nomoreName:'暂无取酒',
				header_title:'我的存酒',
		        headerBox_G_toBack:this.$store.state.imageUrl_G+"toBack.png",
				ajaxUrl:'api/wine/gettakewinelist',
				USERID: 'UserId',
				TOKEN: 'Token',
				WineList:[],
				wineLength: 0,
				refreshing: false,//下拉刷新
				loadinging: false,//上拉加载
				loadType: true,
		    }
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
		    },
			toMyStock(){
				this.$router.push({
					name:'MyStock'
				})
			},
			onrefresh (){
			  var self = this;
			  if(self.refreshing) return;
				self.refreshing = true;
				self.Page = 1;
				Util.WeexAjax({
				    url: this.ajaxUrl+'?Page='+self.Page+'&PageSize='+self.PageSize+'&UserId='+self.USERID,
				    method: 'GET',
				    type: 'JSON',
				    token: self.TOKEN,
				    callback: function(ret) {
				    	var rets = ret;
				    	if(ret.Status == 1){
				    		console.log(rets)
							self.WineList = rets.obj.Items
							weex.requireModule('modal').toast({
							    message: "刷新成功",
							    duration: 2
							})
							self.loadType = true
							self.refreshing = false
				    	}else{
							weex.requireModule('modal').toast({
							    message: "刷新失败",
							    duration: 2
							})
							self.refreshing = false;
						}
				    }
				})
			},
			onloading(event) {
				var self = this
				if (self.loadinging) return;
				self.loadinging = true
				if (self.loadType) {
					this.Page = this.Page + 1
					Util.WeexAjax({
						url: this.ajaxUrl + '?Page=' + self.Page + '&PageSize=' + self.PageSize + '&UserId=' + self.USERID,
						method: 'GET',
						type: 'JSON',
						token: self.TOKEN,
						callback: function(ret) {
							var rets = ret;
							if (ret.Status == 1) {
								if (rets.obj.Items.length != 0) {
									self.WineList = self.WineList.concat(rets.obj.Items) 
									self.loadinging = false
								} else {
									self.loadType = false
									self.loadinging = false
									weex.requireModule('modal').toast({
										message: '没有更多数据了',
										duration: 2
									})
								}
							}else {
								weex.requireModule('modal').toast({
									message: ret.Message,
									duration: 2
								})
							}
						}
					})
				} else {
					setTimeout(() => {
						this.loadinging = false
						weex.requireModule('modal').toast({
							message: '没有更多数据了',
							duration: 2
						})
					}, 2000)
				}
			},
		},
		created() {
			var self= this
			BusFn.mainFootHide_Fn();
			/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
				self.$router.back(-1);
			}) */
			weex.requireModule('storage').getItem(this.USERID,event => {
				self.USERID = event.data
				console.log(event.data);
				weex.requireModule('storage').getItem(this.TOKEN,event => {
					self.TOKEN = event.data
			        Util.WeexAjax({
			            url: this.ajaxUrl+'?Page='+self.Page+'&PageSize='+self.PageSize+'&UserId='+self.USERID,
			            method: 'GET',
			            type: 'JSON',
			            token: self.TOKEN,
			            callback: function(ret) {
			            	if(ret.Status == 1){
			            		console.log(ret)
			        			self.WineList = ret.obj.Items
								self.temBool.loading = false
			            	}else{
			        			weex.requireModule('modal').toast({
			        			    message: "加载失败",
			        			    duration: 2
			        			})
			        		}
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
	top:15px;
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
	flex-direction: row;
}
.act-nav-fonts{
	font-size: 32px;
	line-height: 52px;
	color: #777777;
}
.act-nav-red{
	color: #ff0000;
}
.act-nav-y{
	font-weight: bold;
	color: #ffd262;
}
.act-nav-crt{
	font-weight: bold;
	color: #ffd262;
	border-bottom-color: #ffd262;
}
.cell{
	padding-top: 20px;
	padding-bottom: 20px;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: #dcdcdc;
}
.act-stock-t{
	flex-direction: row;
}
.wine-name{
	flex: 1;
	font-size: 28px;
	line-height: 30px;
	color: #333333;
}
.wine-num{
	width: auto;
	font-size: 28px;
	line-height: 30px;
	color: #ff6204;
}
.act-stock-b{
	flex-direction: row;
	justify-content: space-between;
}
.text-gray{
	width: auto;
	font-size: 24px;
	line-height: 26px;
	color: #777777;
	padding-top: 20px;
}
.activity-list{
	position: fixed;
	top: 200px;
	bottom: 0;
	left: 0;
	right: 0;
}

</style>
