<template>
	<div class="wrapper">
		<vheader :title="header_title" :isshowFoot="true"></vheader>
		<list class="scroller">
			<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<text class="indicator-text">下拉刷新...</text>
				<loading-indicator class="indicator"></loading-indicator>
			</refresh>
			<cell class="orderListWrapper">
				<div class="listBox">
					<div class="listItem" v-for="(val,index) in DmandList" v-if="DmandList.length > 0">
						<div class="itemTop">
							<div class="itemTipbox itemTopTipbox">
								<div class="itemImgbox">
									<image :src="oderListImg.update" style="width:34px;height:34px;"></image>
								</div>
								<text class="itemTipbox_t1">预约时间</text>
								<text class="itemTipbox_t2">{{val.AddTime}}</text>
							</div>
							<div class="itemState">
								<text v-if="val.PayStatus == 0" class="stateT stateNotDoing">未支付</text>
								<text v-if="val.OrderStatus == 1" class="stateT stateDoing">已支付</text>
							</div>
						</div>
						<div class="orderInfo">
							<div class="infoItem">
								<div class="itemTipbox itemTopTipbox">
									<div class="itemImgbox">
										<image :src="oderListImg.category" style="width:30px;height:30px;"></image>
									</div>
									<text class="itemTipbox_t1">商家名称</text>
									<text class="itemTipbox_t2">{{val.ShopName}}</text>
								</div>
							</div>
							<div class="infoItem">
								<div class="itemTipbox itemTopTipbox">
									<div class="itemImgbox">
										<image :src="oderListImg.nums" style="width:34px;height:26px;"></image>
									</div>
									<text class="itemTipbox_t1">人数</text>
									<text class="itemTipbox_t2">{{val.PersonNum}}人</text>
								</div>
							</div>
							<div class="infoItem">
								<div class="itemTipbox itemTopTipbox">
									<div class="itemImgbox">
										<image :src="oderListImg.phone" style="width:31px;height:31px;"></image>
									</div>
									<text class="itemTipbox_t1">联系方式</text>
									<text class="itemTipbox_t2 messageT">{{val.MobilePhone}}</text>
								</div>
							</div>
							<div class="infoItem">
								<div class="itemTipbox itemTopTipbox">
									<div class="itemImgbox">
										<image :src="oderListImg.manager" style="width:30px;height:30px;"></image>
									</div>
									<text class="itemTipbox_t1">姓名</text>
									<text class="itemTipbox_t2 messageT" v-if="val.Sex==1">{{val.UserName}}先生</text>
									<text class="itemTipbox_t2 messageT" v-if="val.Sex==2">{{val.UserName}}女士</text>
								</div>
							</div>
							<div class="infoItem">
								<div class="itemTipbox itemTopTipbox">
									<div class="itemImgbox">
										<image :src="oderListImg.money" style="width:35px;height:35px;"></image>
									</div>
									<text class="itemTipbox_t1">金额</text>
									<text class="itemTipbox_t2">{{val.PayAmount}}元</text>
								</div>
							</div>
							<div class="infoItem">
								<div class="itemTipbox itemTopTipbox messageBoxItem">
									<div class="itemImgbox">
										<image :src="oderListImg.message" style="width:34px;height:29px;"></image>
									</div>
									<text class="itemTipbox_t1">描述</text>
									<text class="itemTipbox_t2 messageT">{{val.Message}}</text>
								</div>
							</div>
							<div class="infoItem">
								<div class="itemTipbox itemTopTipbox">
									<div class="itemImgbox">
										<image :src="oderListImg.price" style="width:30px;height:32px;"></image>
									</div>
									<text class="itemTipbox_t1">诚意金</text>
									<text class="itemTipbox_t2 red">200元</text>
								</div>
							</div>
						</div>
						<div class="infoItem" v-if="val.Status == '已评价'">
							<div class="itemTipbox itemTopTipbox alignTop">
								<div class="itemImgbox">
									<image :src="oderListImg.stars" style="width:29px;height:29px;"></image>
								</div>
								<text class="itemTipbox_t1">服务评价</text>
								<div class="t2StarsBox">
									<div class="starWrap">
										<vstars :starNums="val.Score"></vstars>
									</div>
									<text class="itemTipbox_t2_starts">{{val.Comment}}</text>
								</div>
							</div>
						</div>
						<div class="handle">
							<!-- <text v-if="val.Status == '已确认'" class="handleItem handleItem_star rightBMP0" @click="handleItem_star(val.DemandID)">评价</text>
							<text v-if="val.Status == '已完成'" class="handleItem handleItem_end rightBMP0" @click="signUp({'demandId':val.DemandID,'status':1,'text':'是否确认完成该需求'})">完单</text>
							<text v-if="val.PayStatus == '未支付'" class="handleItem handleItem_change" @click="toDemandPage({'demandId':val.DemandID,'path':'demandOrderStandard'})">修改</text>
							<text v-if="val.PayStatus == '未支付'" class="handleItem handleItem_delete rightBMP0" @click="signUp({'demandId':val.DemandID,'status':2,'text':'是否确认删除该需求'})">删除</text> -->
							<text v-if="val.PayStatus == 0" class="handleItem handleItem_pay rightBMP0" @click="pay({'demandId':val.AppointId,'PayType':4,'status':3})">去支付</text>
						</div>
					</div>
					<v-nomore v-if="DmandList.length == 0"></v-nomore>
				</div>
			</cell>
			<div class="model-box" v-if="model.boolSign">
				<div class="model-wrapper">
					<image class="model-close" :src="cuo" @click="cancel()"></image>
					<text class="model-title">{{model.title}}</text>
					<text class="model-subtitle" v-if="!model.payInfo">{{model.subtitle}}？</text>
					<div class="model-pay-wrapper" v-if="model.payInfo">
						<div class="model-pay-list" @click="selectPay('alipay')" ref="alipay">
							<div class="model-pay-list-left">
								<image class="pay-image" :src="model.payment.alipayImage"></image>
								<text class="pay-title">{{model.payment.alipay}}</text>
							</div>
							<image class="pay-dui" :src="model.payment.alipayselect"></image>
						</div>
						<div class="model-pay-list" @click="selectPay('wechat')" ref="wechat">
							<div class="model-pay-list-left">
								<image class="pay-image" :src="model.payment.wechatImage"></image>
								<text class="pay-title">{{model.payment.wechat}}</text>
							</div>
							<image class="pay-dui" :src="model.payment.wechatselect"></image>
						</div>
						<div class="model-pay-list">
							<div class="model-pay-list-left">
								<image class="pay-image" :src="model.payment.moneyImaeg"></image>
								<text class="pay-title">支付金额</text>
							</div>
							<text class="model-pay-money">{{model.payment.money}}</text>
						</div>
					</div>
					<div class="model-bottom-btn-wrapper">
						<text v-if="model.status===1" class="model-bottom-btn model-bottom-btn-left" @click="sure(model.ids)">确定</text>
						<text v-if="model.status===2" class="model-bottom-btn model-bottom-btn-left" @click="deletes(model.ids)">确定</text>
						<text v-if="model.status===3" class="model-bottom-btn model-bottom-btn-left" @click="paysure(model.ids)">确定</text>
						<text class="model-bottom-btn model-bottom-btn-right" @click="cancel()">取消</text>
					</div>
				</div>
			</div>
			<vappraise v-if="appraiseShow" :UserId="USERID" :Token="TOKEN" :DemandId="model.ids"></vappraise>
			<vtoast @close="closeToast" :img="toastImg" :text="toastText" v-if="openToast"></vtoast>
			<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
				<text class="indicator-text">上拉加载更多 ...</text>
				<loading-indicator class="indicator"></loading-indicator>
			</loading>
		</list>
		<v-loading v-if="temBool.loading"></v-loading>
	</div>
</template>

<script>
	import stars from '../../public/stars.vue'
	import appraise from '../../public/appraise.vue'
	import toast from '../../public/toast'
	import header from '../../public/header'
	import NoMore from '@/components/public/NoMore.vue'
	import Bus from '@/components/public/Bus.js'
	import BusFn from '@/components/public/BusFn.js'
	import Util from '@/components/public/utils.js'
	import Storage from '@/components/public/storage.js'
	export default {
		components: {
			vstars: stars,
			vappraise: appraise,
			vtoast: toast,
			"v-nomore": NoMore,
			vheader:header
		},
		inject: ['reload'],
		data() {
			return {
				temBool: {
				    loading: true,
				},
				header_title:'我的预约',
				cuo: this.$store.state.get_img_path("cuo.png"),
				appraiseShow: false,
				ajaxUrl: 'api/shop/getshopapponitmentlist',
				USERID: 'UserId',
				TOKEN: 'Token',
				DmandList: [],
				CategoryId: '',
				Ids: '',
				lon: 'Lon',
				lat: 'Lat',
				TypeId: 1,
				Page: 1,
				PageSize: 10,
				refreshing: false, //下拉刷新
				loadinging: false, //上拉加载
				loadType: true,
				TypeStatus:0,
				paymoneys: '',
				DemandId:'',
				PayType: 4,
				accountType: 0,
				oderListImg: {
					update: this.$store.state.get_img_path("oderlist1.png"),
					category: this.$store.state.get_img_path("shopname.png"),
					nums: this.$store.state.get_img_path("oderlist3.png"),
					time: this.$store.state.get_img_path("oderlist4.png"),
					addr: this.$store.state.get_img_path("oderlist5.png"),
					nearby: this.$store.state.get_img_path("oderlist6.png"),
					message: this.$store.state.get_img_path("oderlist7.png"),
					price: this.$store.state.get_img_path("oderlist8.png"),
					manager: this.$store.state.get_img_path("oderlist9.png"),
					state: this.$store.state.get_img_path("oderlist10.png"),
					stars: this.$store.state.get_img_path("oderlist11.png"),
					phone: this.$store.state.get_img_path("mobile.png"),
					plan: this.$store.state.get_img_path("oderlist13.png"),
					money: this.$store.state.get_img_path("oderlist15.png")
				},
				model: {
					boolSign: false,
					payInfo: false,
					title: '提示',
					subtitle: '',
					ids: '',
					status: '',
					payment: {
						alipay: '支付宝',
						alipayImage: this.$store.state.get_img_path('d1.png'),
						alipayselect: this.$store.state.get_img_path('dui.png'),
						wechat: '微信',
						wechatImage: this.$store.state.get_img_path('d2.png'),
						wechatselect: this.$store.state.get_img_path('quans.png'),
						money: '200',
						moneyImaeg: this.$store.state.get_img_path('d3.png'),
						select: this.$store.state.get_img_path('dui.png'),
						unselect: this.$store.state.get_img_path('quans.png')
					}
				},
				toastImg: {
					url: this.$store.state.get_img_path("ok.png"),
					width: '96px',
					height: '74px'
				},
				toastText: "发布成功",
				openToast: false,
			}
		},
		methods: {
			toDemandPage(name) {
				var self = this
				this.$router.push({
					name: name.path,
					params: {
						id: name.demandId
					},
				});
				Storage.setItems({
					"demandId": name.demandId
				})
				BusFn.mainFootHide_Fn();
				//this.choosedNav = name;
			},
			look(name) {
				this.$router.push({
					name: 'managerMyfriendsInfo',
					query: {
						ToUserId: name
					},
				})
				BusFn.mainFootHide_Fn();
			},
			selectPay(msg) {
				if (msg == 'alipay') {
					this.model.payment.wechatselect = this.model.payment.unselect
					this.model.payment.alipayselect = this.model.payment.select
					this.accountType = 0
				} else if (msg == 'wechat') {
					this.model.payment.alipayselect = this.model.payment.unselect
					this.model.payment.wechatselect = this.model.payment.select
					this.accountType = 1
				}
				this.$refs[msg].children[1]
			},
			signUp(name) {
				this.model.boolSign = true;
				this.model.ids = name.demandId;
				this.model.status = name.status;
				this.model.subtitle = name.text;
			},
			close() {
				this.model.boolSign = false;
			},
			paysure() {
				var self = this;
				if (!this.model.payInfo) {
					
				} else {
					// todo  参与活动
					console.log(self.accountType)
					if(self.accountType == 0){
						self.payUrl = 'api/pay/aliPay'
					}else if(self.accountType == 1){
						self.payUrl = 'api/pay/wxPay'
					}
					self.temBool.loading = true
					console.log(self.payUrl)
					Util.WeexAjax({
						url: self.payUrl,
						method: 'POST',
						type: 'JSON',
						token: self.TOKEN,
						body: {
							"OrderId": self.DemandId,
							"PayType": self.PayType
						},
						callback: function(ret) {
							var rets = ret;
							console.log(ret)
							if (ret.Status == 1) {
								//Util.modalPanel(ret.Message, 1)
								weex.requireModule('module').printLogs('log5',function (log){})
								self.payData = ret.obj.payData
								weex.requireModule('module').printLogs('log6',function (log){})
								console.log(self.payData)
								if(self.accountType == 0){
									weex.requireModule('module').printLogs('log1',function (log){})
									weex.requireModule('module').aliPay(self.payData,function (map){
										weex.requireModule('module').printLogs('log2',function (log){})
										var datas = Util.JsonFormat(map)
										if(datas.status == 100){
											Util.modalPanel(datas.message, 1)
											self.temBool.loading = false
											self.onrefresh();
										}else{
											Util.modalPanel(ret.Message, 1)
											self.temBool.loading = false
											self.model.boolSign = false;
											self.model.payInfo = false;
										}
									})
								}else if(self.accountType == 1){
									console.log(self.accountType);
									weex.requireModule('module').printLogs('log3',function (log){})
									weex.requireModule('module').wxPay(self.payData,function (map){
										weex.requireModule('module').printLogs('log4',function (log){})
										var datas = Util.JsonFormat(map)
										if(datas.status == 100){
											Util.modalPanel(datas.message, 1)
											self.temBool.loading = false
											self.onrefresh()
										}else{
											Util.modalPanel(ret.Message, 1)
											self.temBool.loading = false
											self.model.boolSign = false;
											self.model.payInfo = false;
										}
									})
								}
							} else {
								Util.modalPanel(ret.Message, 1)
								self.temBool.loading = false
								self.model.boolSign = false;
								self.model.payInfo = false;
							}
						}
					})
				}
			
			},
			pay(obj){
				this.model.boolSign = true;
				this.model.payInfo = true;
				this.model.title = '报名支付';
				this.DemandId = obj.demandId
				this.model.ids = obj.demandId;
				this.model.status = obj.status;
				this.model.payment.money = obj.paymoney
			},
			cancel() {
				this.model.boolSign = false;
				this.model.payInfo = false;
				this.model.title = '提示';
			},
			handleItem_star(name) {
				this.appraiseShow = true;
				this.model.ids = name;
			},
			closeToast() {
				this.openToast = false;
			},
			onrefresh() {
				var self = this;
				if (self.refreshing) return;
				self.refreshing = true;
				self.Page = 1;
				Util.WeexAjax({
					url: self.ajaxUrl + '?Page=' + self.Page + '&PageSize=' + self.PageSize + '&UserId=' + self
							.USERID,
					method: 'GET',
					type: 'JSON',
					token: self.TOKEN,
					callback: function(ret) {
						var rets = ret;
						if (ret.Status == 1) {
							console.log(rets)
							self.refreshing = false;
							self.DmandList = rets.obj.Items
							weex.requireModule('modal').toast({
								message: "刷新成功",
								duration: 1
							})
							self.loadType = true
						} else {
							weex.requireModule('modal').toast({
								message: "刷新失败",
								duration: 1
							})
							self.refreshing = false;
						}
					}
				})
				/* setTimeout(function(){
					self.refreshing = false;
				},2000) */
			},
			onloading() {
				var self = this
				//weex.requireModule('modal').toast({ message: 'Loading', duration: 1 })
				if (self.loadinging) return;
				self.loadinging = true
				if (self.loadType) {
					this.Page = this.Page + 1
					Util.WeexAjax({
						url: self.ajaxUrl +'?Page=' + self.Page + '&PageSize=' + self.PageSize + '&UserId=' + self
							.USERID,
						method: 'GET',
						type: 'JSON',
						token: self.TOKEN,
						callback: function(ret) {
							var rets = ret;
							if (ret.Status == 1) {
								console.log(rets)
								if (rets.obj.Items.length != 0) {
									self.DmandList = self.DmandList.concat(rets.obj.Items)
									self.loadinging = false
								} else {
									self.loadType = false
									self.loadinging = false
									weex.requireModule('modal').toast({
										message: '没有更多数据了',
										duration: 1
									})
								}
							} else {
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
			},
		},
		created(){
			var self = this
			BusFn.mainFootHide_Fn();
			/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
				self.$router.push({name:'home'});
			}) */
			weex.requireModule('storage').getItem(this.lon,event => {
				self.lon = event.data
				weex.requireModule('storage').getItem(this.lat,event => {
					self.lat = event.data
				})
			});
		}, 
		mounted() {
			var self = this
			Bus.$on('appraiseShowToFalse', function() {
				self.appraiseShow = false;
			})
			//self.getlocation();
			
			weex.requireModule('storage').getItem(this.USERID, event => {
				self.USERID = event.data
				weex.requireModule('storage').getItem(this.TOKEN, event => {
					self.TOKEN = event.data
					Util.WeexAjax({
						url: self.ajaxUrl + '?Page=' + self.Page + '&PageSize=' + self.PageSize + '&UserId=' + self
							.USERID,
						method: 'GET',
						type: 'JSON',
						token: self.TOKEN,
						callback: function(ret) {
							var rets = ret;
							if (ret.Status == 1) {
								console.log(rets)
								self.DmandList = rets.obj.Items
								self.temBool.loading = false
							}else{
								self.temBool.loading = false
							}
						}
					})
				})
			});
		}
	}
</script>

<style scoped>
	.scroller {
		position: fixed;
		top: 90px;
		bottom: 0px;
		width: 750px;
		left: 0px;
		padding-top: 20px;
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

	.orderListWrapper {
		width: 750px;
		padding-left: 20px;
		padding-right: 20px;
	}

	.listItem {
		border-style: solid;
		border-color: #e8e8e8;
		border-width: 2px;
		padding-left: 18px;
		padding-right: 18px;
		padding-top: 18px;
		padding-bottom: 18px;
		margin-bottom: 20px;
	}

	.itemTop {
		border-bottom-style: solid;
		border-bottom-color: #e8e8e8;
		border-bottom-width: 1px;
		height: 60px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 15px;
	}

	.itemTipbox {
		flex-direction: row;
		align-items: center;
	}

	.itemImgbox {
		flex-direction: row;
		width: 34px;
		height: 34px;
		justify-content: center;
	}

	.itemTipbox_t1 {
		font-size: 30px;
		color: #333333;
		margin-left: 10px;
		line-height: 34px;
	}

	.t2Box {
		flex: 2;
		margin-left: 18px;
	}

	.itemTipbox_t2 {
		font-size: 28px;
		color: #777777;
		margin-left: 18px;
		line-height: 40px;
		flex: 2;
	}

	.stateT {
		padding-left: 20px;
		padding-right: 20px;
		height: 44px;
		line-height: 44px;
		border-radius: 8px;
		text-align: center;
		font-size: 24px;
		color: #ffffff;
	}

	.stateNotDoing {
		background-color: #d86060;
	}

	.red {
		color: #ff6204;
	}

	.infoItem {
		margin-top: 20px;
	}

	.managerInfo {
		border-top-style: solid;
		border-top-width: 1px;
		border-top-color: #e8e8e8;
		margin-top: 20px;
	}

	.handle {
		border-top-style: solid;
		border-top-width: 1px;
		border-top-color: #e8e8e8;
		margin-top: 20px;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.handleItem {
		padding-right: 24px;
		margin-right: 25px;
		margin-top: 30px;
		margin-bottom: 20px;
		border-right-width: 1px;
		border-right-color: #dcdcdc;
		border-right-style: solid;
		font-size: 30px;
		line-height: 34px;
	}

	.rightBMP0 {
		border-right-width: 0;
		margin-right: 0;
		padding-right: 0px;
	}

	.handleItem_change {
		color: #ffd262;
	}

	.handleItem_delete {
		color: #ff0000;
	}

	.handleItem_end {
		color: #3381a9;
	}

	.handleItem_star {
		color: #ffb400;
	}
	
	.handleItem_pay{
		width: 110px;
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 24px;
		text-align: center;
		color: #333333;
		background-color: #ffd700;
		margin-top: 20px;
		margin-bottom: 10px;
		border-radius: 44px;
		margin-left: 40px;
	}

	.stateDoing {
		background-color: #66a773;
	}

	.statePersonInfo {
		background-color: #853f81;
		margin-left: 25px;
	}

	/* .noflexGrow{flex:inherit;} */
	.stateEnding {
		background-color: #e77a32;
	}

	.t2StarsBox {
		flex: 2;
		margin-left: 18px;
	}

	.itemTipbox_t2_starts {
		margin-top: 15px;
		font-size: 28px;
		color: #777777;
		line-height: 40px;
	}

	.starWrap {
		color: #000000;
	}

	.alignTop {
		align-items: flex-start;
	}

	.model-box {
		position: fixed;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4)
	}

	.model-wrapper {
		width: 710px;
		background-color: #fff;
		border-radius: 5px;
		padding-top: 35px;
		padding-left: 60px;
		padding-right: 60px;
		padding-bottom: 20px;
		border-radius: 15px;
	}

	.model-close {
		position: absolute;
		width: 37px;
		height: 37px;
		top: 20px;
		right: 20px;
	}

	.model-title {
		margin-bottom: 20px;
		font-size: 36px;
		color: #000000;
		line-height: 40px;
		text-align: center;
	}

	.model-subtitle {
		margin-top: 40px;
		margin-bottom: 17px;
		font-size: 24px;
		color: #a3a3a3;
		text-align: center;
	}

	.model-bottom-btn-wrapper {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 43px;
	}

	.model-bottom-btn {
		width: 220px;
		height: 88px;
		line-height: 88px;
		margin-left: 10px;
		margin-right: 10px;
		text-align: center;
		border-radius: 15px;
	}

	.model-bottom-btn-left {
		background-color: #ffd700;
	}

	.model-bottom-btn-right {
		background-color: #dadada;
	}

	.model-bottom-btn-pay {
		font-size: 36px;
		color: #333;
	}

	.model-pay-wrapper {
		margin-top: 20px;
	}

	.model-pay-list {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-top: 20px;
		padding-bottom: 20px;
		padding-left: 10px;
		padding-right: 10px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #f4f4f4;
	}

	.model-pay-list-left {
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.pay-image {
		width: 28px;
		height: 28px;
		margin-right: 20px;
	}

	.pay-dui {
		width: 30px;
		height: 30px;
	}

	.pay-title {
		font-size: 24px;
		color: #333333;
	}

	.model-pay-money {
		font-size: 26px;
		color: #ff6204;
	}
</style>
