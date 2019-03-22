<template>
	<div class="wrapper">
		<div class="headerBox_G">
			<text class="headerBox_G_pageTip">{{CategroyName}}</text>
			<div class="back_box" @click="toBack_G">
			  <image :src="$store.state.get_img_path('toback.png')" style="width:31px;height:44px;"></image>
			</div>
		</div>
		<div class="act-nav addtop">
			<!-- 			<text class="act-nav-font act-nav-crt">最新活动</text>
			<text class="act-nav-font" @click="toMyEnterActivities">我参加的活动</text> -->
			<!-- <div class="act-nav-title" @click="jump(citypath)"><text class="totel-title">{{city}}</text>
				<image style="width: 20px; height: 10px;"></image>
			</div> -->
			<div class="act-nav-title" v-for="(item,index) of categorylist" :key="index" @click="jump(item.path)">
				<text :class="['totel-title',item.path == categoryindex ? 'totel-titles' : '']">{{item.title}}</text>
				<image style="width: 20px; height: 10px;"></image>
			</div>
			<!-- <div class="act-nav-title"><text class="totel-title">人气最高</text><image style="width: 20px; height: 10px;"></image></div> -->
			<!-- <div class="act-nav-title"><text class="totel-title">价格最高</text><image  style="width: 20px; height: 10px;"></image></div> -->

		</div>
		<list class="activity-list">
			<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="indicator-text">下拉刷新...</text>
					<loading-indicator class="indicator"></loading-indicator>
			</refresh>
			<cell class="cell">
				<div class="act-content addtop" v-for="(item,index) in actionList" v-if="actionList.length > 0" :key="index" @click="shopdetailed(item.ShopId)">
					<image class="act-img" :src="item.ImageUrl"></image>

					<div class="act-content-r ">
						<div class="act-list-title act-list-intro" style="margin-top: 0px;">
							<text class="act-title">{{item.ShopName}}</text>
							<div class="address-top-left" style="margin-left: 10px;">
								<div class="item1">
									<div class="r starList">
										<!-- <text :class="['iconFont','star',index<=item.StarNum-1?'staron':'']" v-for="(items,index) in 5" :key="'key'+index">&#xe8c2;</text> -->
										<image :src="[index<=item.StarNum-1 ? score : scores]" v-for="(items,index) in 5" :key="'key'+index" class='star'></image>
									</div>
								</div>
								<div style="margin-left: 10px;"><text style="color: #ffd262;">{{item.StarNum}}</text></div>
							</div>
						</div>
						<div class="act-list-intro">
							<div class="act-person">
								<text class="text-red">￥{{item.MinPrice}}起</text>
							</div>
							<div class="act-person">
								<text class="text-gray">{{item.ViewNum}}人浏览</text>
							</div>
						</div>
						<div class="act-list-intro" style="margin-top: 0px;">
							<div class="act-list-time">
								<image class="clock-icon" :src="details_14"></image>
								<text class="act-time-gray">{{item.Address}}</text>
							</div>
							<div class="act-person act-ma">
								<text class="text-gray">{{item.Distance}}km</text>
							</div>
						</div>

					</div>
				</div>
				<!-- 				<div class="act-list-btn">
					<text class="act-more"  @click="toactdet(item.ActionId)">详细</text>
				</div> -->
				<v-nomore v-if="actionList.length == 0"></v-nomore>


			</cell>
			<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
				<text class="indicator-text">上拉加载更多...</text>
				<loading-indicator class="indicator"></loading-indicator>
			</loading>

		</list>

		<!-- 城市选择弹出 -->
		<scroller class="HomeCity_pop_scroller" v-if="HomeCity_pop_scroller_show">
			<div class="HomeCity_pop" @click="hideCity_pop">
				<div class="HomeCity_popClose">
					<text class="HomeCity_popCloseText" @click="hideCity_pop">取消</text>
				</div>
				<div class="HomeCity_popCityList">
					<div class="HomeCity_popCityItem" v-for="(ths,index) in cityList" :key="index" @click="chooseCity(ths)">
						<text :class="['HomeCity_popCityItemText',(ths.name==city)?'HomeCity_popCityItemTextActive':'']">{{ths.name}}</text>
					</div>
				</div>
			</div>
		</scroller>
		<v-loading v-if="temBool.loading"></v-loading>
	</div>
</template>

<script>
	const modal = weex.requireModule('modal')
	const animation = weex.requireModule('animation');
	import dataMock from '@/mock/dataMock'
	import NoMore from '@/components/public/NoMore.vue'
	import BusFn from '@/components/public/BusFn.js'
	import Bus from '@/components/public/Bus.js'
	import Util from '@/components/public/utils.js'
	import Stroage from '@/components/public/storage.js'
	export default {
		components: {
			"v-nomore": NoMore,
		},
		data() {
			return {
				temBool: {
				    loading: true,
				},
				HomeCity_pop_scroller_show: false,
				city: "全部",
				citypath: 'local',
				headerBox_G_toBack: this.$store.state.get_img_path("toBack.png"),
				home_img1: this.$store.state.get_img_path("home_img1.png"),
				details_14: this.$store.state.get_img_path("details_14.png"),
				Arrow: this.$store.state.get_img_path("clock.png"),
				score: this.$store.state.get_img_path("score.png"),
				scores: this.$store.state.get_img_path("scores.png"),
				ajaxUrl: 'api/action/getactionlist',
				USERID: 'UserId',
				TOKEN: 'Token',
				Page: 1,
				PageSize: 10,
				lng: 'Lon',
				lat: 'Lat',
				CID:'',
				CategroyName:'',
				CityName:'CityName',
				refreshing: false,//下拉刷新
				loadinging: false, //上拉加载
				loadType: true,
				TypeStatus:0,
				titlename: '',
				CategoryId: '',
				actionList: [],
				newIndex: 2,
				categoryindex: 'distance',
				OrderType:1,
				tip:'加载中...',
				categorylist: [{
					title: '离我最近',
					path: 'distance',
				}, {
					title: '人气最高',
					path: 'Popularity',
				}, {
					title: '价格最高',
					path: 'price',
				}],
			}
		},
		computed: {
			cityList: function() {
				return dataMock.cityList
			},
		},
		methods: {
			openPicker() {
				this.showPicker = true;
			},
			pickerOverlayClick(e) {
				this.showPicker = false;
			},
			change(e) {
				console.log(e)
			},
			toBack_G() {
				this.$router.push({
					name: 'home'
				});
			},
			toMyEnterActivities() {
				this.$router.push({
					name: 'MyEnterActivities'
				});
			},
			toactdet(ActionId) {
				Bus.$emit('mainFootHide');
				this.$router.push({
					name: 'actdet',
					params: {
						pagename: '活动详情页面-最新活动',
						actionId: ActionId
					},
				});
			},
			jump(msg) {
				console.log(msg);
				if (msg == 'distance') {
					this.getdistanceshoplist(1);
					this.OrderType = 1
				} else if (msg == 'Popularity') {
					this.getdistanceshoplist(2);
					this.OrderType = 2
				} else if (msg == 'price') {
					this.getdistanceshoplist(3);
					this.OrderType = 3
				} else {
					console.log('选择城市');
					this.showCity_pop();
				}
				this.categoryindex = msg;

			},
			jumpMain(mainName) {
				this.navIndex = mainName;
			},
			getdistanceshoplist(msg) {
				var that = this;
				that.Page = 1
				Util.WeexAjax({
					url: 'api/shop/getdistanceshoplist?Page=' + that.Page + '&PageSize=' + that.PageSize + '&UserId=' + that.USERID +
						'&OrderType=' + msg + '&CategoryId=' + that.CID + '&Lng=' + that.lng + '&Lat=' + that.lat+'&Area='+that.CityName,
					method: 'GET',
					type: 'JSON',
					token: that.TOKEN,
					callback: function(ret) {
						var rets = ret;
						if (ret.Status == 1) {
							console.log(rets);
							that.actionList = rets.obj.Items
							that.temBool.loading = false
							//that.titlename = rets.obj.Items[0].CategroyName
							//console.log(that.titlename)
						}
					}
				})
			},
			onloading() {
				var self = this;
				if(self.loadinging) return;
				self.loadinging = true
				if(self.loadType){
					self.Page = self.Page+1
					Util.WeexAjax({
						url: 'api/shop/getdistanceshoplist?Page=' + self.Page + '&PageSize=' + self.PageSize + '&UserId=' + self.USERID +
							'&OrderType=' + self.OrderType + '&CategoryId=' + self.CID + '&Lng=' + self.lng + '&Lat=' + self.lat+'&Area='+self.CityName,
						method: 'GET',
						type: 'JSON',
						token: self.TOKEN,
						callback: function(ret) {
							var rets = ret;
							if (ret.Status == 1) {
								if(ret.obj.Items.length != 0){
									self.actionList = self.actionList.concat(ret.obj.Items)
									self.loadinging = false
								}else{
									self.loadType = false
									self.loadinging = false
									weex.requireModule('modal').toast({ message: '没有更多数据了', duration: 2 })
								}
							}else{
								weex.requireModule('modal').toast({ message: ret.Message, duration: 2 })
							}
						}
					})
				}else{
					setTimeout(() => {
					  this.loadinging = false
						weex.requireModule('modal').toast({ message: '没有更多数据了', duration: 2 })
					},2000)
				}
			},

			shopdetailed($msg = 0) {
				var _this = this;
				if ($msg != 0) {
					_this.$router.push({
						name: 'shopdetail',
						/* params: {
							ShopId: $msg,
							CategroyName: this.CategroyName,
						} */
					})
					Stroage.setItems({
					    "ShopId": $msg,
					})
					// BusFn.mainFootHide_Fn();
				}
			},
			showCity_pop() {
				this.HomeCity_pop_scroller_show = true;
				BusFn.mainFootHide_Fn();
			},
			hideCity_pop() {
				this.HomeCity_pop_scroller_show = false;
				BusFn.mainFootShow_Fn();
			},
			chooseCity(city) {
				this.HomeCity_pop_scroller_show = false;
				BusFn.mainFootShow_Fn();
				this.city = city.name;
				// todo重新刷新数据源。。。
			},
			onrefresh (){
			  var self = this;
			  if(self.refreshing) return;
				self.refreshing = true;
				self.Page = 1;
				Util.WeexAjax({
					url: 'api/shop/getdistanceshoplist?Page=' + self.Page + '&PageSize=' + self.PageSize + '&UserId=' + self.USERID +
						'&OrderType=' + self.OrderType + '&CategoryId=' + self.CID + '&Lng=' + self.lng + '&Lat=' + self.lat+'&Area='+self.CityName,
					method: 'GET',
					type: 'JSON',
					token: self.TOKEN,
					callback: function(ret) {
						var rets = ret;
						if (ret.Status == 1) {
							console.log(rets);
							self.actionList = rets.obj.Items
							weex.requireModule('modal').toast({
								message: "刷新成功",
								duration: 2
							})
							self.loadType = true
						}else{
							weex.requireModule('modal').toast({
								message: "刷新失败",
								duration: 2
							})
							self.refreshing = false;
						}
					}
				})
			}
		},
		created() {
			var self = this
			BusFn.mainFootHide_Fn();
			/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
				self.$router.push({
					name: 'home'
				});
			}) */
			//self.CID = this.$route.params.CategoryId
			//self.CategroyName = this.$route.params.CategroyName
			//console.log(self.CID);
			/* weex.requireModule('storage').getItem(this.CategoryId, event => {
				self.CategoryId = event.data
			}) */
			var fontModule = weex.requireModule("dom");
			fontModule.addRule('fontFace', {
					'fontFamily': "iconfont",
					'src': 'url("//at.alicdn.com/t/font_1005984_39pje44rbmx.ttf")'
				}),
				weex.requireModule('storage').getItem(this.USERID, event => {
					self.USERID = event.data
					weex.requireModule('storage').getItem(this.TOKEN, event => {
						self.TOKEN = event.data
						weex.requireModule('storage').getItem(this.lng, event => {
							self.lng = event.data
							weex.requireModule('storage').getItem(this.lat, event => {
								self.lat = event.data
								weex.requireModule('storage').getItem(this.CityName, event => {
									self.CityName = event.data
									weex.requireModule('storage').getItem('CID', event => {
										self.CID = event.data
										weex.requireModule('storage').getItem('CategroyName', event => {
											self.CategroyName = event.data
											Util.goLogin({
												"USERID": self.USERID,
												"TOKEN": self.TOKEN,
												"success": function() {
													//self.$router.push({name: 'home'})
											
													// console.log(0);
													self.getdistanceshoplist(1);
													//self.jump('distance');
												},
												"fail": function() {
													self.$router.push({
														name: 'login'
													})
												}
											})
										})
									})
								})
							})
						})
						//    Util.WeexAjax({
						//        url: this.ajaxUrl+'?UserId='+self.USERID,
						//        method: 'GET',
						//        type: 'JSON',
						//        token: self.TOKEN,
						//        callback: function(ret) {
						//        	var rets = ret;
						//        	if(ret.Status == 1){
						//        		console.log(rets)
						// self.actionList=rets.obj
						//        	}
						//        }
						//    })
						//    
					})
				});


		},
		mounted() {
			var _this = this
			Bus.$on('mainJump', function(path) {
				_this.jump(path)
			});
			Bus.$on('mainNameJump', function(mainName) {
				_this.jumpMain(mainName)
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
	
	.noList{
		font-size: 20px;
		line-height: 30px;
		margin-top: 50px;
		text-align: center;
		color: #999999;
	}

	.act-nav {
		padding-left: 20px;
		padding-right: 20px;
		padding-top: 27px;
		padding-bottom: 27px;
		flex-direction: row;
		justify-content: space-around;
	}

	.act-nav-font {
		font-size: 32px;
		line-height: 52px;
		color: #777777;
		margin-left: 25px;
		margin-right: 25px;
		border-bottom-width: 4px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}

	.addtop {
		border-bottom-width: 1px;
		border-bottom-color: #dcdcdc;
		border-bottom-style: solid;
	}

	.act-nav-crt {
		font-weight: bold;
		color: #ffd262;
		border-bottom-color: #ffd262;
	}

	.cell {

		padding-bottom: 15px;


	}

	.act-content {
		flex-direction: row;
		padding-bottom: 35px;
		padding-top: 35px;
		padding-left: 20px;
		padding-right: 20px;
	}

	.act-img {
		width: 220px;
		height: 140px;
		margin-right: 20px;
	}

	.act-content-r {
		flex: 1;
	}

	.act-title {

		font-size: 28px;

		color: #333333;
		font-weight: bold;
		width: 280px;
	}

	.act-list-intro {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
		align-items: center;
	}

	.act-person {
		flex-direction: row;
	}

	.act-ma {
		margin-top: 15px;
	}

	.text-gray {
		font-size: 24px;
		line-height: 30px;
		color: #333;
	}

	.text-red {
		width: 200px;
		font-size: 24px;
		line-height: 30px;
		color: #ff6204;
	}

	.act-list-time {
		flex-direction: row;
		margin-top: 15px;
	}

	.clock-icon {
		width: 18px;
		height: 24px;
		margin-right: 8px;
	}

	.act-time-gray {
		width: 250px;
		font-size: 24px;
		line-height: 35px;
		color: #333333;
		margin-right: 15px;
	}

	.act-time {
		width: 400px;
		font-size: 24px;
		line-height: 30px;
		color: #777777;
	}

	.act-list-btn {
		flex-direction: row;
		justify-content: flex-end;
		margin-top: 20px;
	}

	.act-more {
		width: 150px;
		height: 60px;
		font-size: 30px;
		color: #333333;
		line-height: 60px;
		text-align: center;
		background-color: #ffd700;
		border-radius: 10px;
	}

	.activity-list {
		position: fixed;
		top: 200px;
		bottom: 1px;
		left: 0;
		right: 0;
	}

	.act-nav-title {
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.iconFont {
		font-family: iconfont;
	}

	.address-top-left {
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.item1 {
		flex-direction: row;
	}

	.starList {
		flex-direction: row;
	}

	.staron {
		color: #ffd262;
	}

	.star {
		width: 26px;
		height: 26px;
	}

	.totel-title {
		font-size: 28px;
	}

	.totel-titles {
		color: #ffd262;
	}

	.HomeCity_pop_scroller {
		position: fixed;
		top: 0;
		bottom: 0px;
		left: 0;
		right: 0;
		background-color: #ffffff;
	}

	.HomeCity_popClose {
		height: 90px;
		padding-left: 20px;
		padding-right: 20px;
		border-bottom-width: 2px;
		border-bottom-color: #eaeaea;
		border-bottom-style: solid;
	}

	.HomeCity_popCloseText {
		color: #0067c5;
		font-size: 30px;
		line-height: 90px;
		text-align: right;
	}

	.HomeCity_popCityItem {
		padding-left: 20px;
		padding-right: 20px;
		height: 55px;
		border-bottom-color: #cccccc;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.HomeCity_popCityItemText {
		color: #333333;
		font-size: 24px;
		text-align: center;
		line-height: 55px;
	}

	.HomeCity_popCityItemTextActive {
		color: #ffd262;
	}

	.indicator {
		margin-top: 16px;
		height: 40px;
		width: 40px;
		color: blue;
	}
</style>
