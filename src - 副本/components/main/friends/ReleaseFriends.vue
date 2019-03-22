<template>
	<div class="wrapper">
		<div class="releaseTop">
			<text class="cancel" @click="toBack_G">取消</text>
			<text class="releaseTitle"></text>
			<text class="release" @click="addMessage">发送</text>
		</div>
		<list class="listBox">
			<cell class="cell">
				<textarea class="textBox" v-model="content" placeholder="说点新鲜事"></textarea>
				<div class="img-box">
					<image class="img" :src="item.imgUrl" v-for="(item,index) in imgList" :key="index"></image>
					<text class="addImg" @click="addImg(imgList.length)">+</text>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
	import BusFn from '@/components/public/BusFn.js'
	import Util from '@/components/public/utils.js'
	import Storage from '@/components/public/storage.js'
	export default {
		data() {
			return {
				photo:this.$store.state.imageUrl_G+"photo.png",
				num:'',
				content:'',
				USERID: 'UserId',
				TOKEN: 'Token',
				imgList: [],
				list:[],
				orderImg:[
					{
						ImageUrl: '',
					},
					{
						ImageUrl: '',
					},
					{
						ImageUrl: '',
					},
					{
						ImageUrl: '',
					},
					{
						ImageUrl: '',
					},
					{
						ImageUrl: '',
					},
					{
						ImageUrl: '',
					},
					{
						ImageUrl: '',
					},
					{
						ImageUrl: '',
					},
				]
			};
		},
		methods:{
			toBack_G() {
			    this.$router.back(-1);
				BusFn.mainFootShow_Fn();
			},
			add(){
				var self = this
				for(var i=0;i<self.list.length;i++){
					Util.WeexAjax({
						url: 'api/account/uploadpicbase',
						method: 'POST',
						type: 'JSON',
						token: self.TOKEN,
						body:{
							"UserId": self.USERID,
							"ImageFile": self.list[i].base64,
						},
						callback: function(ret) {
							var rets = ret;
							if (ret.Status == 0) {
								self.imgList.push({
									imgUrl:ret.Message
								})
							}
						}
					})
				}
			},
			addImg(name){
				var self = this
				self.num = 9-name
				console.log(self.num);
				weex.requireModule('module').callPhoto(self.num,'0',function (map){
					weex.requireModule('module').printLogs('log1',function (log){})
					/* weex.requireModule('modal').toast({
						message: map,
						duration: 5
					}) */
					weex.requireModule('module').printLogs('log2',function (log){})
					var datas = Util.JsonFormat(map)
					//调用nativie中的方法打日志，得出回调成功了
					if(datas.status === 100){
						//self.imgList = datas.data.imageList
						for(var i=0;i<datas.data.imageList.length;i++){
							Util.WeexAjax({
								url: 'api/account/uploadpicbase',
								method: 'POST',
								type: 'JSON',
								token: self.TOKEN,
								body:{
									"UserId": self.USERID,
									"ImageFile": datas.data.imageList[i].base64,
								},
								callback: function(ret) {
									var rets = ret;
									if (ret.Status == 0) {
										self.imgList.push({
											imgUrl:ret.Message
										})
									}
								}
							})
						}
						weex.requireModule('module').printLogs('log3',function (log){})
					}else{
						weex.requireModule('modal').toast({
							message: '拉起相册失败',
							duration: 1
						})
					}
					weex.requireModule('module').printLogs('log4',function (log){})
				})
			},
			addMessage(){
				var self = this
				for(var i=0;i<this.imgList.length;i++){
					self.orderImg[i].ImageUrl = self.imgList[i].imgUrl
				}
				if(self.content.replace(/(^\s+)|(\s+$)/g,"") != '' || self.imgList.length != 0){
					Util.WeexAjax({
						url: 'api/friendcircle/addMessage',
						method: 'POST',
						type: 'JSON',
						token: self.TOKEN,
						body:{
							"UserId": self.USERID,
							"Content": self.content,
							"ImageUrl1": self.orderImg[0].ImageUrl,
							"ImageUrl2": self.orderImg[1].ImageUrl,
							"ImageUrl3": self.orderImg[2].ImageUrl,
							"ImageUrl4": self.orderImg[3].ImageUrl,
							"ImageUrl5": self.orderImg[4].ImageUrl,
							"ImageUrl6": self.orderImg[5].ImageUrl,
							"ImageUrl7": self.orderImg[6].ImageUrl,
							"ImageUrl8": self.orderImg[7].ImageUrl,
							"ImageUrl9": self.orderImg[8].ImageUrl
						},
						callback: function(ret) {
							var rets = ret;
							if (ret.Status == 1) {
								console.log(rets)
								weex.requireModule('modal').toast({
									message: ret.Message,
									duration: 1
								})
								self.$router.back(-1);
								BusFn.mainFootShow_Fn();
							}else{
								weex.requireModule('modal').toast({
									message: '发布失败，请重新发布',
									duration: 1
								})
							}
						}
					})
				}else{
					weex.requireModule('modal').toast({
						message: '请填写内容',
						duration: 1
					})
				}
			}
		},
		created(){
			var self = this
			BusFn.mainFootHide_Fn();
			/* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
				self.$router.back(-1);
				BusFn.mainFootShow_Fn();
			}) */
			weex.requireModule('storage').getItem(this.USERID, event => {
				self.USERID = event.data
				weex.requireModule('storage').getItem(this.TOKEN, event => {
					self.TOKEN = event.data
				})
			})
		}
	}
</script>

<style>
	.releaseTop {
		height: 90px;
		border-bottom-color: #e5e5e5;
		border-bottom-style: solid;
		border-bottom-width: 2px;
		align-items: center;
		flex-direction: row;
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.cancel{
		font-size: 34px;
		color: #333333;
		line-height: 88px;
	}

	.releaseTitle {
		text-align: center;
		font-size: 42px;
		color: #333333;
		height: 88px;
		flex: 1;
	}

	.release {
		width: 120px;
		height: 60px;
		line-height: 60px;
		font-size: 34px;
		text-align: center;
		color: #ffffff;
		margin-top: 14px;
		background-color: #ffe8b0;
	}
	.textBox{
		min-height: 140px;
		font-size: 30px;
		line-height: 34px;
		color: #777777;
		margin-left: 40px;
		margin-right: 40px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.img-box{
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 40px;
	}
	.img{
		width: 200px;
		height: 200px;
		margin-left: 10px!important;
		margin-right: 10px!important;
		margin-top: 10px!important;
		margin-bottom: 10px!important;
	}
	.addImg{
		width: 200px;
		height: 200px;
		font-size: 100px;
		line-height: 196px;
		text-align: center;
		color: #cecece;
		border-color: #e5e5e5;
		border-style: dashed;
		border-width: 2px;
		margin-left: 10px!important;
		margin-right: 10px!important;
		margin-top: 10px!important;
		margin-bottom: 10px!important;
	}
</style>
