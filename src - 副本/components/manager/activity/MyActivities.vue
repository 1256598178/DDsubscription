<template>
	<div class="wrapper">
		<div class="headerBox_GG">
		    <text class="headerBox_G_pageTip">活动</text>
			<image class="headerBox_G_mypersonal" :src="headerBox_G_mypersonal" style="width:40px;height:39px;" @click="toPersonal_G"></image>
		</div>
		<div class="act-nav">
			<text class="act-nav-font act-nav-crt" @click="newsact">进行中的活动</text>
			<text class="act-nav-font" @click="myadd">未开始活动</text>
		</div>
		<list class="activity-list" >
			<cell class="cell" v-for="(item,index) in info" :key="index" v-if="info.length > 0">
				<div class="act-content">
					<image class="act-img" :src="item.ImageUrl" :placeholder="slotimg"></image>
					<div class="act-content-r">
						<div class="act-list-title act-flex">
							<text class="act-title">{{item.ActionName}}</text>
							<text class="col-type">进行中</text>
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
					<text class="act-more" @click="actdetials(item.ActionId)">详细</text>
					<!-- <text class="act-more act-hx" @click="getCode(item.MyActionId)">核销</text> -->
				</div>
			</cell>
			<cell v-if="info.length == 0">
				<v-nomore></v-nomore>
			</cell>
		</list>
		<v-loading v-if="temBool.loading"></v-loading>
	</div>
</template>

<script>
	import Bus from '@/components/public/Bus.js'
	import Util from '@/components/public/utils.js'
	import Storage from '@/components/public/storage.js'
	import NoMore from '@/components/public/NoMore.vue'
	export default {
		data(){
		    return{
	            /////////////
	            //控制组件显示隐藏 //
	            /////////////
	            temBool: {
	                loading: true,
	            },
		        headerBox_G_toBack:this.$store.state.get_img_path("toback.png"),
				actImg:this.$store.state.get_img_path("actimg01.png"),
				clock:this.$store.state.get_img_path("clock.png"),
				headerBox_G_mypersonal:this.$store.state.get_img_path("hometopmy.png"),
				slotimg: this.$store.state.get_img_path("slot.png"),
				ajaxUrl1:'api/action/getparticactionqrCode',
		        userid:'UserId',
		        TOKEN:'Token',
				ProvinceId: 0,
				CityId: 0,
				info:[],
				storelist:{
					resut:"进行中",
					noresut:"未开始",
					end:"已结束"
				}
		    }
		},
		created(){
		    var self = this;
		    weex.requireModule('storage').getItem(this.userid,event => {
		        self.USERID = event.data

		        weex.requireModule('storage').getItem(this.TOKEN,event => {
		            self.TOKEN = event.data

		            Util.goLogin({
		                 "USERID": self.USERID,
		                 "TOKEN": self.TOKEN,
		                 "success": function(){
		                    self.TOKEN = this.TOKEN;
		                    self.userid = this.USERID;
		                     console.log(this.USERID);console.log(self.TOKEN);
		                    self.getinfo();
		                 },
		                 "fail": function(){
		                  console.log(123);
		                     self.$router.push({name: 'login'});

		                 }
		            })

		        })
		    });
		},
		methods:{
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
							console.log('11111',rets)
							
						}
					}
				})
			},
			getinfo(){
				var that = this;
	  			var ajaxUrl='api/action/getactionlist?UserId='+that.userid;
					Util.WeexAjax({
				          url: ajaxUrl,
				          method: 'GET',
				          type: 'JSON',
				          token: that.TOKEN,
				          callback: function(ret) {
				              // let rets = utils.JsonFormat(ret);
								console.log(ret)
				              if(ret.Status == 1){
					            that.info = ret.obj;
								console.log(that.info)
				              }
				              that.temBool.loading = false;
				          }
				    })		
			},
			newsact(){
				 this.$router.push({name:'managerMyActivities'})

			},
			myadd(){
				 this.$router.push({name:'managerMyEnterActivities'})
	
			},
			actdetials(ActionId){
				this.$router.push({
					name:'manageractdet',
					params: { 
						pagename: '活动详情页面-最新活动' ,
						actionId: ActionId
					}
					})
			},
			toPersonal_G(){
				this.$router.push({name:'managerMypersonalActivities'})
			}
		},
		components: {
	        "v-nomore": NoMore,
	    },
	}
</script>

<style scoped>
.headerBox_GG{
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
.headerBox_G_mypersonal{
	position:absolute;
	right:20px;
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
	color: #333;
}
.act-list-intro{
	flex-direction: row;
}
.act-person{
	/*width: auto;*/
	flex-direction: row;
	margin-right: 30px;
}
.text-gray{
	/*width: auto;*/
	font-size: 24px;
	line-height: 30px;
	color: #333;
}
.text-red{
	/*width: auto;*/
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
	/*width: auto;*/
	font-size: 24px;
	line-height: 30px;
	color: #333;
	margin-right: 15px;
}
.act-time{
	/*width: auto;*/
	font-size: 24px;
	line-height: 30px;
	color: #777;
	flex: 1;
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
.col-type{
	width: 110px;
	height: 44px;
	font-size: 24px;
	color: #fff;
	line-height: 44px;
	text-align: center;
	background-color: #66a773;
	border-radius: 10px;
	display: inline-block;
}
.act-flex{
	flex-direction: row;
	justify-content: space-between;
}

</style>
