<template>
	<div class="act">
		<div class="headerBox_G">
			<text class="headerBox_G_pageTip">一键预约</text>
			<div class="back_box" @click="toBack_G">
				<image :src="$store.state.get_img_path('toback.png')" style="width:31px;height:44px;"></image>
			</div>
		</div>
		<!-- <v-header :title="活动详情"></v-header> -->
		<scroller class="person">
			<text class="person-title-name">请准确输入以下需求内容</text>
			<!-- 			<div class="person-content-box">
				<div class="person-content-camera-box">
					<image class="person-content-camera-image" src="../src/static/images/camera.png"></image>
				</div>
				<text class="person-content-camera-name">更换照片</text>
			</div> -->
			<div class="person-listbox">

				<div class="person-listbox-list">
					<text class="person-name namewidth">预约类型<span class="person-come-red">*</span></text>
					<text class="person-name person-inout-height" @click="showCity_pop()">{{demand}}</text>
					<image class="person-name" :src="headerBox_G_click" style="width:28px;height:19px;"></image>
				</div>
				<div class="person-listbox-list">
					<text class="person-name namewidth">联系方式<span class="person-come-red">*</span></text>
					<input class="person-name person-inout-height" placeholder="" type="tel" v-model="MobilePhone" name="">
				</div>
				<div class="person-listbox-list">
					<text class="person-name namewidth">到店人数<span class="person-come-red">*</span></text>
					<input class="person-name person-inout-height" placeholder="" type="number" v-model="PersonNum" name="">
				</div>
				<div class="person-listbox-list">
					<text class="person-name namewidth">姓名(选填)<span class="person-come-red">*</span></text>
					<input class="person-name" placeholder="" type="text" name="" v-model="UserName" style="width: 360px; height: 88px;">
					<div class="person-sex"><text v-for="sexn in sex" :class="['sex',sexn.index == sexIndex ? 'sex_color_yellow' : 'sex_color_black']"
						 @click="sexindex(sexn.index)">{{sexn.name}}</text></div>
				</div>
				<div class="person-listbox-list-none">
					<text class="person-name namewidth" style="margin-top: 20px;">描述<span class="person-come-red"></span></text>
					<textarea class="person-name cloumns" placeholder="" type="text" v-model="contents" name="" style="height: 180px; width: 700px;"></textarea>
				</div>


				<text class="person-btn" @click="signUp()">确定预约</text>
			</div>
			<div class="model-box" v-if="model.boolSign">
				<div class="model-wrapper">
					<image class="model-close" :src="cuopng" @click="cancel()"></image>
					<text class="model-title">{{model.title}}</text>
					<text class="model-subtitle" v-if="!model.payInfo">请发布需求需要扣除200诚意金，发布后概不退还。如不需要则诚意金可累积到下次发布需求</text>
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
		</scroller>
		<!-- 城市选择弹出 -->
		<scroller class="HomeCity_pop_scroller" v-if="HomeCity_pop_scroller_show">
			<div class="HomeCity_pop" @click="hideCity_pop">
				<div class="HomeCity_popClose">
					<text class="HomeCity_popCloseText" @click="hideCity_pop">取消</text>
				</div>
				<div class="HomeCity_popCityList">
					<div class="HomeCity_popCityItem" v-for="(dd,index) in demandlist" :key="index" @click="chooseCity(dd)">
						<text :class="['HomeCity_popCityItemText',(dd.CategoryName==demand)?'HomeCity_popCityItemTextActive':'']">{{dd.CategoryName}}</text>
					</div>
				</div>
			</div>
		</scroller>
		<v-loading v-if="temBool.loading"></v-loading>
	</div>
</template>

<script>
	import BusFn from '@/components/public/BusFn.js'
	import Util from '@/components/public/utils.js'
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	export default {
		data() {
			return {
				temBool: {
				    loading: true,
				},
				headerBox_G_toBack: this.$store.state.get_img_path("toback.png"),
				headerBox_G_click: this.$store.state.get_img_path("selector_xl.png"),
				cuopng: this.$store.state.get_img_path("cuo.png"),
				sexIndex: '1',
				sex: [{
					name: '先生',
					index: '1'
				}, {
					name: '女士',
					index: '2'
				}],
				USERID: 'UserId',
				TOKEN: 'Token',
				shopid: '',
				MobilePhone: '',
				AppointDate: '',
				AppointTime: '',
				PersonNum: '',
				UserName: '',
				content: '',
				Sex: '',
				contents: '',
				PayAmount: '',
				HomeCity_pop_scroller_show: false,
				reserveType: '',
				demandlist: [],
				demand: '请选择',
				demandid: '',
				CategoryId: '',
				CategroyName: '',
				AppointId: '',
				payUrl: '',
				accountType: 0,
				PayType: 4,
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
						money: '200',
						moneyImaeg: this.$store.state.get_img_path('d3.png'),
						select: this.$store.state.get_img_path('dui.png'),
						unselect: this.$store.state.get_img_path('quans.png')
					}
				},
			}
		},
		created() {
			BusFn.mainFootHide_Fn();
			var self = this;
			/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
				self.$router.push({
					name: 'categorylist',
					params: {
						CategoryId: self.CategoryId,
						CategroyName: self.CategroyName
					},
				});
			}) */
			this.shopid = this.$route.params.ShopId;
			this.AppointDate = this.$route.params.AppointDate;
			this.AppointTime = this.$route.params.AppointTime;
			self.CategoryId = this.$route.params.CategoryId
			self.CategroyName = this.$route.params.CategroyName
			weex.requireModule('storage').getItem(this.USERID, event => {
				self.USERID = event.data
				console.log('Userid', event.data);
				weex.requireModule('storage').getItem(this.TOKEN, res => {
					self.TOKEN = res.data
					console.log('token', res.data);
					Util.goLogin({
						"USERID": self.USERID,
						"TOKEN": self.TOKEN,
						"success": function() {
							//self.$router.push({name: 'home'})
							Util.WeexAjax({
								url: 'api/demand/getdemandcategorylist',
								method: 'GET',
								type: 'JSON',
								token: self.TOKEN,
								callback: function(ret) {
									var rets = ret;
									if (ret.Status == 1) {
										console.log(rets)
										self.temBool.loading = false
										self.demandlist = rets.obj;
									}else{
										self.temBool.loading = false
										Util.modalPanel(ret.Message, 1)
									}
								}
							})
						},
						"fail": function() {
							self.$router.push({
								name: 'login'
							})
						}
					})

				})
			});
		},
		methods: {
			toBack_G() {
				this.$router.push({
					name: 'shopdetail',
				});
			},
			signUp() {
				if (this.demandid != '') {
					if (this.MobilePhone != '') {
						if ((/^1[34578]\d{9}$/.test(this.MobilePhone))) {
							if (this.PersonNum != '' && this.PersonNum > 0) {
								if (this.UserName != '') {
									this.model.boolSign = true;
								} else {
									weex.requireModule("modal").toast({
										message: '姓名不能为空，请填写姓名',
										duration: 1
									})
								}
							} else {
								weex.requireModule("modal").toast({
									message: '人数不能为空，请填写人数',
									duration: 1
								})
							}
						} else {
							weex.requireModule("modal").toast({
								message: '请填写正确的手机号',
								duration: 1
							})
						}
					} else {
						weex.requireModule("modal").toast({
							message: '手机号码不能为空，请填写手机号',
							duration: 1
						})
					}
				} else {
					weex.requireModule("modal").toast({
						message: '类别不能为空，请选择类别',
						duration: 1
					})
				}
			},
			close() {
				this.model.boolSign = false;
			},
			showCity_pop() {
				this.HomeCity_pop_scroller_show = true;
			},
			hideCity_pop() {
				this.HomeCity_pop_scroller_show = false;
			},
			chooseCity(city) {
				this.HomeCity_pop_scroller_show = false;

				this.demand = city.CategoryName;
				this.demandid = city.CategoryId;
				// todo重新刷新数据源。。。
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
			jump(){
				this.$router.push({
					name: 'MyReservation',
				});
			},
			sure() {
				var self = this;
				/* var date = new Date();
				console.log(date); */
				if (!this.model.payInfo) {
					this.submit()
				} else {
					// todo  参与活动
					self.temBool.loading = true
					console.log(self.accountType)
					if (self.accountType == 0) {
						self.payUrl = 'api/pay/aliPay'
					} else if (self.accountType == 1) {
						self.payUrl = 'api/pay/wxPay'
					}
					console.log(self.payUrl)
					Util.WeexAjax({
						url: self.payUrl,
						method: 'POST',
						type: 'JSON',
						token: self.TOKEN,
						body: {
							"OrderId": self.AppointId,
							"PayType": self.PayType
						},
						callback: function(ret) {
							var rets = ret;
							console.log(ret)
							if (ret.Status == 1) {
								self.temBool.loading = false
								//Util.modalPanel(ret.Message, 1)
								weex.requireModule('module').printLogs('log5', function(log) {})
								self.payData = ret.obj.payData
								weex.requireModule('module').printLogs('log6', function(log) {})
								console.log(self.payData)
								if (self.accountType == 0) {
									weex.requireModule('module').printLogs('log1', function(log) {})
									weex.requireModule('module').aliPay(self.payData, function(map) {
										weex.requireModule('module').printLogs('log2', function(log) {})
										var datas = Util.JsonFormat(map)
										if (datas.status == 100) {
											self.temBool.loading = false
											//Util.modalPanel(datas.message, 1)
											self.toastText = datas.Message
											self.openToast = true;
											setTimeout(function() {
												self.jump()
											}, 1000)
										} else {
											self.temBool.loading = false
											Util.modalPanel(ret.Message, 1)
											setTimeout(function() {
												self.jump()
											}, 1000)
											/* self.model.boolSign = false;
											self.model.payInfo = false; */
										}
									})
								} else if (self.accountType == 1) {
									console.log(self.accountType);
									weex.requireModule('module').printLogs('log3', function(log) {})
									weex.requireModule('module').wxPay(self.payData, function(map) {
										weex.requireModule('module').printLogs('log4', function(log) {})
										var datas = Util.JsonFormat(map)
										if (datas.status == 100) {
											self.temBool.loading = false
											self.toastText = datas.Message
											self.openToast = true;
											setTimeout(function() {
												self.jump()
											}, 1000)
										} else {
											self.temBool.loading = false
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
				}
			},
			submit() {
				var self = this
				self.temBool.loading = true
				Util.WeexAjax({
					url: 'api/shop/shopAppointment',
					method: 'POST',
					type: 'JSON',
					token: this.TOKEN,
					body: {
						ShopId: this.shopid,
						UserId: this.USERID,
						TypeId: this.demandid,
						MobilePhone: this.MobilePhone,
						AppointDate: this.AppointDate,
						AppointTime: this.AppointTime,
						PersonNum: this.PersonNum,
						UserName: this.UserName,
						Sex: this.sexIndex,
						Message: this.contents

					},
					callback: function(ret) {
						var rets = ret;
						console.log(ret);
						if (ret.Status == 1) {
							self.temBool.loading = false
							self.AppointId = ret.obj.Id
							self.model.payInfo = true;
							self.model.title = '报名支付';
							Util.modalPanel(ret.Message, 1)
						}else{
							self.temBool.loading = false
							self.model.boolSign = false;
							Util.modalPanel(ret.Message, 1)
						}
					}
				})
			},
			cancel() {
				this.model.boolSign = false;
				this.jump()
			},
			choiceImg() {
				this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
			},
			sexindex(msg) {
				this.sexIndex = msg;
				console.log(this.sexIndex);
			},

			// 上传图片，需要对面提供原生module
			getFile() {
				console.log(123)
				var that = this;
				Util.WeexAjax({
					url: 'api/action/uploadpic',
					method: 'GET',
					type: 'JSON',
					token: that.TOKEN,
					callback: function(ret) {
						var rets = ret;
						if (ret.Status == 1) {
							console.log(rets)

						}
					}
				})
				const inputFile = this.$refs.filElem.files[0];
				if (inputFile) {
					if (inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif') {
						alert('不是有效的图片文件！');
						return;
					}
					this.imgInfo = Object.assign({}, this.imgInfo, {
						name: inputFile.name,
						size: inputFile.size,
						lastModifiedDate: inputFile.lastModifiedDate.toLocaleString()
					})
					const reader = new FileReader();
					reader.readAsDataURL(inputFile);
					reader.onload = function(e) {
						that.imgSrc = this.result;
					}
				} else {
					return;
				}
			}

		}
	}
</script>

<style lang="stylus" scoped>
	.headerBox_G {
		height: 90px;
		width: 750px;
		border-bottom-width: 2px;
		border-bottom-color: #eaeaea;
		border-bottom-style: solid;
	}

	.back_box {
		position: absolute;
		left: 0;
		top: 0;
		height: 90px;
		width: 71px;
		justify-content: center;
		align-items: center;
	}

	.headerBox_G_pageTip {
		color: #333333;
		font-size: 36px;
		line-height: 88px;
		text-align: center;
	}

	.person {
		position: fixed;
		top: 90px;
		left: 0;
		right: 0;
		bottom: 20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	.person-title-name {
		padding-top: 30px;
		padding-bottom: 30px;
		font-size: 24px;
		color: #777777;
	}

	.person-content-box {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.person-content-camera-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 150px;
		height: 150px;
		background-color: #e5e5e5;
	}

	.person-content-camera-image {
		width: 88px;
		height: 76px;
	}

	.person-content-camera-name {
		flex: 1;
		padding-left: 20px;
		padding-right: 20px;
		font-size: 24px;
		color: #333333;
	}

	.person-listbox {
		margin-top: 3px;
	}

	.person-listbox-list {
		height: 90px;
		line-height: 90px;
		border-bottom-width: 1px;
		border-bottom-color: #e3e3e3;
		border-bottom-style: solid;
		font-size: 24px;
		color: #333333;
		flex-direction: row;
		align-items: center;
	}

	.person-sex {
		height: 90px;
		line-height: 90px;
		font-size: 24px;
		color: #333333;
		flex-direction: row;
		align-items: center;
	}

	.person-listbox-list-none {
		height: 270px; 
		line-height: 90px;
		font-size: 24px;
		color: #333333;
		flex-direction: column;
		align-items: flex-start; 
	}

	.person-btn {
		margin-top: 20px;
		width: 710px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		font-size: 36px;
		color: #333333;
		border-radius: 8.8px;
		background-color: #ffd46b;
	}

	.person-inout-height {
		height: 88px;
		width: 450px;
		line-height: 88px;
	}

	.person-come-red {
		color: #fd1f20
	}

	.namewidth {
		width: 170px;
	}

	.person-button {
		margin-left: 60px;
	}

	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #e3e3e3;
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #e3e3e3;
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #e3e3e3;
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #e3e3e3;
	}

	.person-btn {
		background: -webkit-linear-gradient(left, #ffd700, #ffe9b0);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #ffd700, #ffe9b0);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #ffd700, #ffe9b0);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #ffd700, #ffe9b0);
		/* 标准的语法 */
	}

	.cloumns {
		border-width: 1px;
		border-style: solid;
		border-color: #e3e3e3;
		border-radius: 10px;
		margin-top: 10px;
	}

	.sex {
		padding-top: 8px;
		padding-bottom: 8px;
		padding-left: 14px;
		padding-right: 14px;
		font-size: 14px;
		border-width: 1px;
		border-style: solid;
		margin-right: 20px;
	}

	.sex_color_black {
		border-color: #dcdcdc;
		color: #777777;
	}

	.sex_color_yellow {
		border-color: #ffd262;
		color: #ffd262;
	}

	.model-box {
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .4)
	}

	.model-wrapper {
		width: 710px;
		margin-left: 20px;
		margin-right: 20px;
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
		marign-bottom: 20px;
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
		display: flex;
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
