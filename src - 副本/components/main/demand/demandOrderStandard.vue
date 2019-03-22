<template>
	<div class="wrapper">
		<vheader :title="header_title" :isshowFoot="true"></vheader>
		<scroller class="formWrapperScroller">
			<div class="formWrapper">
				<text class="tipNode">请准确输入以下需求内容</text>
				<div class="formItem formInputItem">
					<div class="labelBox">
						<text class="label">类别</text><text class="requiredFlag">*</text>
					</div>
					<div class="enterBox">
						<div class="selector">
							<div class="selectorTextBox" @click="popOpen('category_pop_scroller_show')">
								<text class="selectorText">{{ orderForm.category }}</text>
								<image class="selectorXL" :src="selectorXLImg"></image>
							</div>
						</div>
					</div>
				</div>
				<div class="formItem formInputItem">
					<div class="labelBox">
						<text class="label">人数</text><text class="requiredFlag">*</text>
					</div>
					<div class="enterBox">
						<div class="inputBox">
							<input type="number" v-model="orderForm.Number" class="inputBox_inp">
						</div>
					</div>
				</div>
				<div class="formItem formInputItem">
					<div class="labelBox">
						<text class="label">开始日期</text><text class="requiredFlag">*</text>
					</div>
					<div class="enterBox">
						<div class="inputBox">
							<input type="date" @change="onchange" @input="oninput" v-model="orderForm.begindate" class="inputBox_inp">
						</div>
					</div>
				</div>
				<div class="formItem formInputItem">
					<div class="labelBox">
						<text class="label">开始时间</text><text class="requiredFlag">*</text>
					</div>
					<div class="enterBox">
						<div class="inputBox">
							<input type="time" @change="onchange" @input="oninput" v-model="orderForm.begintime" class="inputBox_inp">
						</div>
					</div>
				</div>
				<div class="formItem formInputItem">
					<div class="labelBox">
						<text class="label">结束日期</text><text class="requiredFlag">*</text>
					</div>
					<div class="enterBox">
						<div class="inputBox">
							<input type="date" @change="onchange" @input="oninput" v-model="orderForm.enddate" class="inputBox_inp">
						</div>
					</div>
				</div>
				<div class="formItem formInputItem">
					<div class="labelBox">
						<text class="label">结束时间</text><text class="requiredFlag">*</text>
					</div>
					<div class="enterBox">
						<div class="inputBox">
							<input type="time" @change="onchange" @input="oninput" v-model="orderForm.endtime" class="inputBox_inp">
						</div>
					</div>
				</div>
				<div class="formItem formInputItem">
					<div class="labelBox">
						<text class="label">地址</text><text class="requiredFlag">*</text>
					</div>
					<div class="enterBox">
						<div class="inputBox">
							<input type="text" v-model="orderForm.address" class="inputBox_inp">
						</div>
					</div>
				</div>
				<!--<div class="formItem formInputItem">
           <div class="labelBox">
            <text class="label">附近起止公里数</text><text class="requiredFlag">*</text>
          </div> 
          <div class="enterBox">
            <div class="inputBox">
              <input type="text" v-model="orderForm.areaNUm" class="inputBox_inp">
            </div>
          </div>
        </div>-->
				<div class="formItem formInputItem">
					<div class="labelBox">
						<text class="label">手机号码</text><text class="requiredFlag">*</text>
					</div>
					<div class="enterBox">
						<div class="inputBox">
							<input type="tel" v-model="orderForm.phone" class="inputBox_inp">
						</div>
					</div>
				</div>
				<div class="messageInfo">
					<textarea class="messageInfoText" v-model="orderForm.messageInfo"></textarea>
				</div>
				<div class="price">
					<text class="priceTip">请选择预付诚意金</text>
					<div class="priceItemBox">
						<div :class="['priceItem', 'priceChoose',index==priceList[0].length-1?'marginR0':'']" v-for="(item,index) in priceList[0]"
						 :key="index">
							<text :class="['priceText',item==choosedPrice?'priceItemActive':'']" @click="choosePrice(item)">{{item}}元</text>
						</div>
					</div>
					<div class="priceItemBox marginB0">
						<div :class="['priceItem', 'priceChoose']" v-for="(item,index) in priceList[1]" :key="index">
							<text :class="['priceText',item==choosedPrice?'priceItemActive':'']" @click="choosePrice(item)">{{item}}元</text>
						</div>
						<input class="priceItem priceInput marginR0" type="number" placeholder="其他金额" v-model="otherPrice" @change="choosePriceByinput">
					</div>
				</div>
				<text class="LoginButton" @click="GetOrder">发布需求</text>
			</div>
		</scroller>

		<scroller class="HomeCity_pop_scroller" v-if="category_pop_scroller_show">
			<div class="HomeCity_pop" @click="hideCity_pop">
				<div class="HomeCity_popClose">
					<text class="HomeCity_popCloseText" @click="hidePop('category_pop_scroller_show')">取消</text>
				</div>
				<div class="HomeCity_popCityList">
					<div class="HomeCity_popCityItem" v-for="(item,index) in categorySelectorList" :key="index" @click="chooseCategory(item)">
						<text :class="['HomeCity_popCityItemText',(item.CategoryName==orderForm.category)?'HomeCity_popCityItemTextActive':'']">{{item.CategoryName}}</text>
					</div>
				</div>
			</div>
		</scroller>
		
		<div class="model-box" v-if="model.boolSign">
			<div class="model-wrapper">
				<image class="model-close" :src="cuo" @click="cancel()"></image>
				<text class="model-title">{{model.title}}</text>
				<text class="model-subtitle" v-if="!model.payInfo">请确认是否发布需求？</text>
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
					<text class="model-bottom-btn model-bottom-btn-left" @click="sure()">确定</text>
					<text class="model-bottom-btn model-bottom-btn-right" @click="cancel()">取消</text>
				</div>
			</div>
		</div>

		<vtoast @close="closeToast" :img="toastImg" :text="toastText" v-if="openToast"></vtoast>
		<v-loading v-if="temBool.loading"></v-loading>
	</div>
</template>

<script>
	import header from '../../public/header'
	import toast from '../../public/toast'
	import Bus from '@/components/public/Bus.js'
	import BusFn from '@/components/public/BusFn.js'
	import Util from '@/components/public/utils.js'
	import Storage from '@/components/public/storage.js'
	export default {
		components: {
			vheader: header,
			vtoast: toast
		},
		data() {
			return {
				temBool: {
				    loading: true,
				},
				header_title: "发布标准需求",
				selectorXLImg: this.$store.state.get_img_path("selector_xl.png"),
				cuo: this.$store.state.get_img_path("cuo.png"),
				ajaxUrl: '',
				USERID: 'UserId',
				TOKEN: 'Token',
				TYPEID: '1',
				Id: '',
				choosedPrice: "",
				otherPrice: "",
				lon: "Lon",
				lat: "Lat",
				accountType: 0,
				DemandId:'',
				PayType: 1,
				orderForm: {
					category: "请选择",
					DemandID: "",
					categoryId: "",
					Number: "",
					begindate: "",
					begintime: "",
					enddate: "",
					endtime: "",
					address: "",
					phone: "",
					messageInfo: "",
					money: "",
				},
				category_pop_scroller_show: false,
				categorySelectorList: [],
				priceList: [
					['100', '200', '500', '1000'],
					['2000', '5000']
				],
				model: {
					boolSign: false,
					payInfo: false,
					title: '提示',
					payment: {
						alipay: '支付宝',
						alipayImage: this.$store.state.get_img_path('d1.png'),
						alipayselect: this.$store.state.get_img_path('dui.png'),
						wechat: '微信',
						wechatImage: this.$store.state.get_img_path('d2.png'),
						wechatselect: this.$store.state.get_img_path('quans.png'),
						money: '金额获取中',
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
			popOpen(name) {
				this[name] = true;
			},
			hidePop(name) {
				this[name] = false;
			},
			chooseCategory(item) {
				this.orderForm.category = item.CategoryName;
				this.orderForm.categoryId = item.CategoryId;
				this.hidePop('category_pop_scroller_show');
				//console.log(item.CategoryId);
			},
			choosePrice(item) {
				this.choosedPrice = item;
				this.otherPrice = "";
				console.log(this.choosedPrice);
			},
			choosePriceByinput() {
				this.choosedPrice = "";
			},
			closeToast() {
				this.openToast = false;
			},
			jump() {
				this.$router.push({
					name: 'demandListStandard'
				});
				BusFn.mainFootShow_Fn();
			},
			cancel() {
				/* this.model.boolSign = false;
				this.model.payInfo = false; */
				this.jump();
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
			sure() {
				var self = this;
				// todo  参与活动
				self.temBool.loading = true
				console.log(self.accountType)
				if(self.accountType == 0){
					self.payUrl = 'api/pay/aliPay'
				}else if(self.accountType == 1){
					self.payUrl = 'api/pay/wxPay'
				}
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
							self.temBool.loading = false
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
										//Util.modalPanel(datas.message, 1)
										self.toastText = datas.Message
										self.openToast = true;
										setTimeout(function() {
											self.jump()
										}, 1000)
									}else{
										Util.modalPanel(ret.Message, 1)
										setTimeout(function() {
											self.jump()
										}, 1000)
										/* self.model.boolSign = false;
										self.model.payInfo = false; */
									}
								})
							}else if(self.accountType == 1){
								console.log(self.accountType);
								weex.requireModule('module').printLogs('log3',function (log){})
								weex.requireModule('module').wxPay(self.payData,function (map){
									weex.requireModule('module').printLogs('log4',function (log){})
									var datas = Util.JsonFormat(map)
									if(datas.status == 100){
										self.toastText = datas.Message
										self.openToast = true;
										setTimeout(function() {
											self.jump()
										}, 1000)
									}else{
										Util.modalPanel(ret.Message, 1)
										setTimeout(function() {
											self.jump()
										}, 1000)
									}
								})
							}
						} else {
							self.temBool.loading = false
							Util.modalPanel(ret.Message, 1)
							setTimeout(function() {
								self.jump()
							}, 1000)
						}
					}
				})
			},
			submit(){
				var self = this
				self.temBool.loading = true
				Util.WeexAjax({
					url: self.ajaxUrl,
					method: 'POST',
					type: 'JSON',
					token: self.TOKEN,
					body: {
						"UserId": self.USERID,
						"TypeId": self.TYPEID,
						"DemandID": self.orderForm.DemandID,
						"CategoryID": self.orderForm.categoryId,
						"BeginDate": self.orderForm.begindate,
						"BeginTimes": self.orderForm.begintime,
						"EndDate": self.orderForm.enddate,
						"EndTimes": self.orderForm.endtime,
						"Number": self.orderForm.Number,
						"Lag": self.lon,
						"Lat": self.lat,
						"Address": self.orderForm.address,
						"Phone": self.orderForm.phone,
						"Money": self.orderForm.money,
						"Message": self.orderForm.messageInfo
					},
					callback: function(ret) {
						var rets = ret;
						if (ret.Status == 1) {
							self.model.payment.money = self.orderForm.money
							self.DemandId = ret.obj
							if (self.Id === undefined) {
								self.temBool.loading = false
								self.model.boolSign = true;
								self.model.payInfo = true;
								self.model.title = '报名支付';
							}else{
								self.temBool.loading = false
								self.toastText = rets.Message
								self.openToast = true;
								setTimeout(function() {
									self.jump()
								}, 1000)
							}
						}else{
							self.temBool.loading = false
							weex.requireModule("modal").toast({
								message: ret.Message,
								duration: 2
							})
						}
					}
				})
			},
			GetOrder() {
				var self = this
				if (self.otherPrice != '') {
					self.orderForm.money = self.otherPrice
				} else {
					self.orderForm.money = self.choosedPrice
				}
				if (this.Id === undefined) {
					this.ajaxUrl = 'api/demand/addDemand'
				} else {
					this.ajaxUrl = 'api/demand/editDemand'
				}
				if(self.orderForm.categoryId != ''){
					if(self.orderForm.Number.toString().replace(/(^\s+)|(\s+$)/g,"") != '' && self.orderForm.Number > 0){
						if(self.orderForm.begindate != ''){
							if(self.orderForm.begintime != ''){
								if(self.orderForm.enddate != ''){
									if(self.orderForm.endtime != ''){
										if(self.orderForm.address.toString().replace(/(^\s+)|(\s+$)/g,"") != ''){
											if(self.orderForm.phone != ''){
												if((/^1[34578]\d{9}$/.test(self.orderForm.phone))){
													if(self.orderForm.money != ''){
														self.submit()
													}else{
														weex.requireModule("modal").toast({
															message: '请选择诚意金',
															duration: 1
														})
													}
												}else{
													weex.requireModule("modal").toast({
														message: '请填写正确的手机号码',
														duration: 1
													})
												}
											}else{
												weex.requireModule("modal").toast({
													message: '手机号码不能为空，请填写手机号码',
													duration: 1
												})
											}
										}else{
											weex.requireModule("modal").toast({
												message: '地址不能为空，请填写地址',
												duration: 1
											})
										}
									}else{
										weex.requireModule("modal").toast({
											message: '请选择结束时间',
											duration: 1
										})
									}
								}else{
									weex.requireModule("modal").toast({
										message: '请选择结束日期',
										duration: 1
									})
								}
							}else{
								weex.requireModule("modal").toast({
									message: '请选择开始时间',
									duration: 1
								})
							}
						}else{
							weex.requireModule("modal").toast({
								message: '请选择开始日期',
								duration: 1
							})
						}
					}else{
						weex.requireModule("modal").toast({
							message: '人数不能为空，请填写人数',
							duration: 1
						})
					}
				}else{
					weex.requireModule("modal").toast({
						message: '类别不能为空，请选择类别',
						duration: 1
					})
				}
			},
			onchange(event) {
				this.txtChange = event.value;
				console.log('onchange', event.value);
			},
			oninput(event) {
				this.txtInput = event.value;
				console.log('oninput', event.value);
			},
		},

		created() {
			//console.log(this.$route.params.id);
			this.Id = this.$route.params.id
			BusFn.mainFootHide_Fn();
			var self = this
			/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
				self.$router.push({
					name: 'demandListStandard',
				});
				BusFn.mainFootShow_Fn();
			}) */
			weex.requireModule('storage').getItem(self.USERID, event => {
				self.USERID = event.data
				weex.requireModule('storage').getItem(self.TOKEN, event => {
					self.TOKEN = event.data
					weex.requireModule('storage').getItem(self.lon, event => {
						self.lon = event.data
						weex.requireModule('storage').getItem(self.lat, event => {
							self.lat = event.data
							Util.WeexAjax({
								url: 'api/demand/getdemandcategorylist',
								method: 'GET',
								type: 'JSON',
								token: self.TOKEN,
								callback: function(ret) {
									var rets = ret;
									if (ret.Status == 1) {
										console.log(rets)
										self.categorySelectorList = rets.obj
									}
								}
							})
							if (self.Id != undefined) {
								Util.WeexAjax({
									url: 'api/demand/getDemand?UserId=' + self.USERID + '&DemandId=' + self.Id,
									method: 'GET',
									type: 'JSON',
									token: self.TOKEN,
									callback: function(ret) {
										var rets = ret;
										self.retss = ret
										if (ret.Status == 1) {
											console.log(rets)
											self.orderForm.category = rets.obj.CategoryName
											self.orderForm.DemandID = rets.obj.DemandID
											self.orderForm.categoryId = rets.obj.CategoryID
											self.orderForm.begindate = rets.obj.BeginDate
											self.orderForm.begintime = rets.obj.BeginTimes
											self.orderForm.enddate = rets.obj.EndDate
											self.orderForm.endtime = rets.obj.EndTimes
											self.orderForm.Number = rets.obj.Number
											self.orderForm.address = rets.obj.Address
											self.orderForm.areaj = rets.obj.Lag
											self.orderForm.areaw = rets.obj.Lat
											self.orderForm.phone = rets.obj.Phone
											self.orderForm.messageInfo = rets.obj.Message
											self.orderForm.money = rets.obj.Money
											if (self.orderForm.money == 100 || self.orderForm.money == 200 || self.orderForm.money == 500 || self.orderForm
												.money == 1000 || self.orderForm.money == 2000 || self.orderForm.money == 5000) {
												self.choosedPrice = self.orderForm.money
											} else {
												self.otherPrice = self.orderForm.money
											}
											self.temBool.loading = false
										}else{
											self.temBool.loading = false
											Util.modalPanel(ret.Message, 1)
										}
									}
								})
							}else{
								self.temBool.loading = false
							}
						})
					})
				})
			});
		},
		mounted() {
			var self = this
			console.log(self.Id)
			console.log(self.TOKEN)
		}
	}
</script>

<style scoped>
	.formWrapperScroller {
		width: 750px;
		padding-left: 20px;
		padding-right: 20px;
		position: fixed;
		top: 90px;
		bottom: 0px;
	}

	.formWrapper {
		padding-top: 30px;
	}

	.tipNode {
		font-size: 24px;
		color: #777777;
		margin-bottom: 30px;
	}

	.formItem {
		height: 84px;
		border-bottom-style: solid;
		border-bottom-color: #e5e5e5;
		border-bottom-width: 1px;
		width: 710px;
		flex-direction: row;
		align-items: center;
	}

	.labelBox {
		flex-direction: row;
		margin-right: 20px;
	}

	.label {
		font-size: 24px;
		color: #333333;
	}

	.requiredFlag {
		color: #ff0000;
	}

	.enterBox {
		flex: 2;
	}

	.selector {
		flex: 2;
	}

	.selectorTextBox {
		flex-direction: row;
		align-items: center;
	}

	.selectorText {
		flex: 2;
		line-height: 83px;
		font-size: 26px;
		color: #333333;
	}

	.selectorXL {
		width: 28px;
		height: 19px;
	}

	.inputBox {
		flex: 2;
	}

	.inputBox_inp {
		flex: 2;
		line-height: 83px;
		height: 83px;
		font-size: 26px;
		color: #333333;
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

	.messageInfo {
		margin-top: 30px;
	}

	.messageInfoText {
		height: 300px;
		;
		border-color: #dcdcdc;
		border-style: solid;
		border-width: 1px;
		border-radius: 7px;
		padding-top: 15px;
		padding-left: 10px;
		padding-bottom: 15px;
		padding-right: 10px;
		color: #333333;
		font-size: 26px;
		line-height: 33px;
	}

	.price {
		margin-top: 50px;
	}

	.priceTip {
		color: #333333;
		font-size: 24px;
		margin-bottom: 30px;
	}

	.priceItemBox {
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.priceItem {
		width: 150px;
		align-items: center;
		margin-right: 36px;
	}

	.priceText {
		text-align: center;
		width: 150px;
		height: 60px;
		border-width: 1px;
		border-style: solid;
		border-color: #dcdcdc;
		border-radius: 8px;
		align-items: center;
		justify-content: center;
		line-height: 58px;
		color: #ffd262;
		font-size: 24px;
	}

	.priceInput {
		placeholder-color: #cccccc;
		font-size: 24px;
		;
		flex: 2;
		height: 60px;
		border-width: 1px;
		border-style: solid;
		border-color: #dcdcdc;
		border-radius: 8px;
		align-items: center;
		justify-content: center;
		line-height: 58px;
		padding-right: 8px;
		padding-left: 8px;
		color: #333333;
	}

	.priceItemActive {
		border-color: #ffd262;
		background-color: #ffd262;
		color: #ffffff;
	}

	.LoginButton {
		margin-top: 60px;
		margin-bottom: 50px;
		width: 710px;
		height: 80px;
		text-align: center;
		font-size: 36px;
		color: #333333;
		line-height: 80px;
		background-image: linear-gradient(to right, #ffd262, #ffe8b0);
		border-radius: 10px;
	}

	.marginR0 {
		margin-right: 0px;
	}

	.marginB0 {
		margin-bottom: 0px;
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
