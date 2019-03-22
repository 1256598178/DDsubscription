<template>
	<div class="act">
		<list>
			<cell>
				<div class="my-title-bg">
					<image class="my-title-bgImage" :src="titBg"></image>
					<text class="my-title-text">我的</text>
					<div class="my-heart-box">
						<div class="my-head-img-box"><image class="my-heart-box-image" :src="tit"></image></div>
						<text class="my-heart-box-name">{{NickName}}</text>
						<text class="my-heart-box-subname">{{Type}}</text>
					</div>
				</div>
				<div class="my-demand-box">
					<div class="my-demand-balance-box">
						<div class="my-demand-balance-list my-demand-balance-list-left" @click="toPage('AccountBalance',true)">
							<text class="my-demand-balance-list-title">账户余额(元)</text>
							<text class="my-demand-balance-list-num">{{money}}</text>
						</div>
						<div class="my-demand-balance-list" @click="toPage('MyStock',true)">
							<text class="my-demand-balance-list-title">存酒(瓶)</text>
							<text class="my-demand-balance-list-num">{{wineLength}}</text>
						</div>
					</div>
					<div class="my-demand-active-box">
						<div class="my-demand-active-box-list"  @click="toPage('demandList',false)">
							<image class="my-demand-active-box-list-image" :src="a1"></image>
							<text class="my-demand-active-box-list-name">我的需求</text>
							<div class="my-demand-active-box-list-num-box">
								<text class="my-demand-active-box-list-num-text my-demand-active-box-list-num-textleft">{{demandLength}}</text>
								<text class="my-demand-active-box-list-num-text">个</text>
							</div>
						</div>
						<div class="my-demand-active-box-list"  @click="toPage('activity',false,true)">
							<image class="my-demand-active-box-list-image" :src="a2"></image>
							<text class="my-demand-active-box-list-name">我的活动</text>
							<div class="my-demand-active-box-list-num-box">
								<text class="my-demand-active-box-list-num-text my-demand-active-box-list-num-textleft">{{activityLength}}</text>
								<text class="my-demand-active-box-list-num-text">个</text>
							</div>
						</div>
					</div>
				</div>
				<div class="info-box">
					<!-- <div class="info-box-list" @click="toPage('InviteFriends',true)">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" :src="s1"></image>
							<text class="info-box-list-left-text">邀请好友</text>
						</div>
						<div class="info-box-list-left-box">
							<text class="info-box-list-right-text">赚取佣金</text>
							<image class="info-box-list-right-image" :src="left"></image>
						</div>
					</div> -->
					<div class="info-box-list" @click="toPage('personlInfo',true)">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" :src="s2"></image>
							<text class="info-box-list-left-text">个人信息</text>
						</div>
						<div class="info-box-list-left-box">
							<image class="info-box-list-right-image" :src="left"></image>
						</div>
					</div>
					<div class="info-box-list" @click="toPage('MyReservation',true)">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" :src="s2"></image>
							<text class="info-box-list-left-text">我的预约</text>
						</div>
						<div class="info-box-list-left-box">
							<image class="info-box-list-right-image" :src="left"></image>
						</div>
					</div>
					<div class="info-box-list" @click="toPage('AboutUs',true)">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" :src="s3"></image>
							<text class="info-box-list-left-text">关于我们</text>
						</div>
						<div class="info-box-list-left-box">
							<image class="info-box-list-right-image" :src="left"></image>
						</div>
					</div>
					<div class="info-box-list" @click="Logout">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" :src="s4"></image>
							<text class="info-box-list-left-text">退出登录</text>
						</div>
					</div>
					<div class="info-box-list" @click="toPage('Test',true)">
						<div class="info-box-list-left-box">
							<image class="info-box-list-left-image" :src="s4"></image>
							<text class="info-box-list-left-text">测试</text>
						</div>
						<div class="info-box-list-left-box">
							<image class="info-box-list-right-image" :src="left"></image>
						</div>
					</div>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
import Bus from '@/components/public/Bus.js'
import BusFn from '@/components/public/BusFn.js'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
export default {
  data() {
  	return {
		titBg:this.$store.state.get_img_path("titbg.png"),
		tit:'',
		a1:this.$store.state.get_img_path("a1.png"),
		a2:this.$store.state.get_img_path("a2.png"),
		s1:this.$store.state.get_img_path("s1.png"),
		s2:this.$store.state.get_img_path("s2.png"),
		s3:this.$store.state.get_img_path("s3.png"),
		s4:this.$store.state.get_img_path("s4.png"),
		left:this.$store.state.get_img_path("left.png"),
		ajaxUrl:'api/account/getuserinfo',
		USERID: 'UserId',
		TOKEN: 'Token',
		Type:'',
		NickName:'',
		money: 0,
		demandL: 0,
		demandLs: 0,
		demandLength: 0,
		activityL: 0,
		activityLs: 0,
		activityLength: 0,
		wineLength: 0,
		TypeStatus:0
  	}
  },
  methods:{
	  toPage(pagename,hideFoot,mainJump){
		  if(hideFoot) Bus.$emit('mainFootHide');
		  if(mainJump) Bus.$emit('mainJump',pagename);
		  this.$router.push({
			  name:pagename
		  })
	  },
	  Logout(){
		var self = this
		weex.requireModule('storage').removeItem('UserId', event => {
			weex.requireModule('storage').removeItem('Token', event => {
				weex.requireModule('storage').removeItem('TypeId', event => {
					self.$router.push({name:'login'})
					console.log('delete value:', event.data)
				})
			})
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
				 },
				 "fail": function(){
					 self.$router.push({name: 'login'})
				 }
			})
  	        Util.WeexAjax({
  	            url: this.ajaxUrl+'?UserId='+self.USERID,
  	            method: 'GET',
  	            type: 'JSON',
  	            token: self.TOKEN,
  	            callback: function(ret) {
  	            	var rets = ret;
  	            	if(ret.Status == 1){
  	            		console.log(rets)
  						//self.DmandList=rets.obj.Items
						self.NickName = rets.obj.NickName
						if(rets.obj.HeadImageUrl !=''){
							self.tit = rets.obj.HeadImageUrl
						}
						if(rets.obj.TypeId == 1){
							self.Type = '客户'
						}else if(rets.obj.TypeId == 2){
							self.Type = '经理人'
						}
						console.log(self.Type);
  	            	}
  	            }
  	        })
			Util.WeexAjax({
			    url: 'api/account/getmyhomepage'+'?UserId='+self.USERID,
			    method: 'GET',
			    type: 'JSON',
			    token: self.TOKEN,
			    callback: function(ret) {
			    	var rets = ret;
			    	if(ret.Status == 1){
			    		console.log(rets)
						//self.DmandList=rets.obj.Items
						self.money = rets.obj.BalanceNum
						self.demandLength = rets.obj.DemandNum
						self.activityLength = rets.obj.ActivitiesNum
						self.wineLength = rets.obj.WineNumb
			    	}
			    }
			})
  		})
  	});
  }
}
</script>

<style lang="stylus" scoped> 
.act{background-color: #f4f4f4;}
.my-title-bg{position: relative; height: 410px;}
.my-title-bgImage{ position: absolute;top: 0;left: 0;right: 0;bottom: 0; }
.my-title-text{ font-size: 42px;color: #333333; text-align: center; font-weight: bold; line-height: 80px; margin-bottom: 30px; }
.my-heart-box{ flex-direction: column; justify-content: center;align-items: center;  }
.my-head-img-box{width: 150px; height: 150px; border-radius: 75px; margin-bottom: 15px; background-color: rgba(255,255,255,0.4);}
.my-heart-box-image{ width: 150px; height: 150px; border-radius: 75px;}
.my-heart-box-name{ font-size: 30px; color: #333333;}
.my-heart-box-subname{ font-size: 24px; color: #333333;}

.my-demand-box{position: relative;margin-top: -65px;}
.my-demand-balance-box{ margin-top: 25px; width: 710px;height: 180px; margin-left: 20px;  flex-direction: row; justify-content: center;align-items: center; box-shadow: 0 0 3px 5px #eeeeee; border-radius: 15px;padding: 20px; background-color: #ffffff;}
.my-demand-balance-list{ flex: 1; }
.my-demand-balance-list-left{ border-right-width: 1px; border-right-color: #e5e5e5; border-right-style: solid; }
.my-demand-balance-list-title{ margin-top: 20px;text-align: center;font-size: 24px;color: #777777;}
.my-demand-balance-list-num{ text-align: center;font-size: 52px; color: #333333; margin-top:15px; margin-bottom: 20px;}

.my-demand-active-box{margin-top: 10px; margin-left: 20px; margin-right: 20px; padding-bottom: 25px; width: 710px; flex-direction: row; justify-content: space-between;align-items: center;}
.my-demand-active-box-list{width:350px; flex-direction: column; justify-content: center;align-items: center;border-radius: 15px; box-shadow: 0 0 3px 5px #eee; padding: 15px; height: 185px;background-color: #ffffff; }
.my-demand-active-box-list-image{width: 55px; height: 55px; margin: 15px 20px;}
.my-demand-active-box-list-name{ font-size: 24px; color: #777777; }
.my-demand-active-box-list-num-box{flex-direction: row; justify-content: center;align-items: center;}
.my-demand-active-box-list-num-text{ font-size: 24px; color:#777777; line-height: 30px;}
.my-demand-active-box-list-num-textleft{color:#ff6204}


.info-box-list{ line-height: 82px; height: 82px; flex-direction: row; justify-content: space-between;align-items: center; background-color: #ffffff; padding-left: 20px;padding-right: 20px; }
.info-box-list-left-box{  flex-direction: row;justify-content: flex-start;align-items: center; }
.info-box-list-left-image{ width: 28px; height: 30px; margin-right: 10px;}
.info-box-list-left-text{ font-size: 26px; color:#333333; }
.info-box-list-right-text{  font-size: 26px; color:#777777;  }
.info-box-list-right-image{ width: 13px; height: 20px; margin-left: 25px; }
</style>