<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">账户余额</text>
		    <div class="back_box" @click="toBack_G">
		      <image :src="$store.state.get_img_path('toback.png')" style="width:31px;height:44px;"></image>
		    </div>
		</div>
		<div class="act-nav">
			<text class="act-nav-font" @click="toBalanceIncome">收入</text>
			<text class="act-nav-font act-nav-crt">支出</text>
		</div>
		<list class="activity-list">
			<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="indicator-text">下拉刷新...</text>
				<loading-indicator class="indicator"></loading-indicator>
			</refresh>
			<cell class="cell" v-for="(item,index) in incomeList" :key="index" v-if="incomeList.length > 0">
				<div class="act-content">
					<div class="act-stock-b">
						<text class="text-gray fir">收入</text>
						<text class="text-gray sec">{{item.Money}}</text>
						<text class="text-gray">{{item.AddTimes}}</text>
					</div>
				</div>
			</cell>
			<cell v-if="incomeList.length == 0">
				<v-nomore></v-nomore>
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
	import header from '../../public/header'
	import BusFn from '@/components/public/BusFn.js'
	import NoMore from '@/components/public/NoMore.vue'
	import Util from '@/components/public/utils.js'
	import Storage from '@/components/public/storage.js'
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
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
				header_title:'账户余额',
				refreshing: false, //下拉刷新
				loadinging: false, //上拉加载
				loadType: true,
				USERID: 'UserId',
				TOKEN: 'Token',
				ajaxUrl: 'api/cashwithdrawal/getmybalancelist',
				Page:1,
				PageSize:20,
				TypeId: 2,
				incomeList:[]
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
			toBalanceIncome(){
				this.$router.push({
					name:'managerBalanceIncome'
				})
			},
			onrefresh(){
				var self = this;
				if(self.refreshing) return;
				self.refreshing = true;
				self.Page = 1;
				Util.WeexAjax({
					url: this.ajaxUrl+'?Page='+self.Page+'&PageSize='+self.PageSize+'&UserId='+self.USERID+'&TypeId='+self.TypeId,
					method: 'GET',
					type: 'JSON',
					token: self.TOKEN,
					callback: function(ret) {
						var rets = ret;
						if(ret.Status == 1){
							self.incomeList = ret.obj.Items
							weex.requireModule('modal').toast({
								message: "刷新成功",
								duration: 1
							})
							self.loadType = true
							self.refreshing = false
						}else{
							weex.requireModule('modal').toast({
								message: "刷新失败",
								duration: 1
							})
							self.refreshing = false;
						}
					}
				})
			},
			onloading(){
				var self = this
				if (self.loadinging) return;
				self.loadinging = true
				if (self.loadType) {
					this.Page = this.Page + 1
					Util.WeexAjax({
						url: this.ajaxUrl+'?Page='+self.Page+'&PageSize='+self.PageSize+'&UserId='+self.USERID+'&TypeId='+self.TypeId,
						method: 'GET',
						type: 'JSON',
						token: self.TOKEN,
						callback: function(ret) {
							var rets = ret;
							if (ret.Status == 1) {
								if (rets.obj.Items.length != 0) {
									self.incomeList = self.incomeList.concat(rets.obj.Items) 
									self.loadinging = false
								} else {
									self.loadType = false
									self.loadinging = false
									weex.requireModule('modal').toast({
										message: '没有更多数据了',
										duration: 1
									})
								}
							}else {
								weex.requireModule('modal').toast({
									message: ret.Message,
									duration: 1
								})
							}
						}
					})
				} else {
					setTimeout(() => {
						this.loadinging = false
						weex.requireModule('modal').toast({
							message: '没有更多数据了',
							duration: 1
						})
					}, 2000)
				}
			}
		},
		created(){
			var self = this
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
			            url: this.ajaxUrl+'?Page='+self.Page+'&PageSize='+self.PageSize+'&UserId='+self.USERID+'&TypeId='+self.TypeId,
			            method: 'GET',
			            type: 'JSON',
			            token: self.TOKEN,
			            callback: function(ret) {
			            	if(ret.Status == 1){
			            		console.log(ret)
			        			self.incomeList = ret.obj.Items
								self.temBool.loading = false
			            	}else{
			        			weex.requireModule('modal').toast({
			        			    message: "加载失败",
			        			    duration: 1
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
.act-stock-b{
	flex-direction: row;
	justify-content: space-between;
}
.text-gray{
	width: auto;
	font-size: 28px;
	line-height: 30px;
	color: #777777;
	padding-top: 20px;
}
.fir{
	width: 200px;
}
.sec{
	color: #ff6204;
}
.activity-list{
	position: fixed;
	top: 200px;
	bottom: 0;
	left: 0;
	right: 0;
}

</style>
