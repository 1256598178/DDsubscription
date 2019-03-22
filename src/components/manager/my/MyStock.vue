<template>
	<div class="wrapper">
		<div class="headerBox_GG">
		    <text class="headerBox_G_pageTip">我的存酒</text>
			<image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
			<image class="headerBox_G_addStock" :src="headerBox_G_addStock" style="width:39px;height:39px;" @click="addStock_G"></image>

		</div>
		<div class="act-nav">
			<div class="act-nav-font act-nav-crt" @click="stockin">
				<text class="act-nav-fonts act-nav-y">存入</text>
				<text class="act-nav-fonts act-nav-red">({{infoNumber}})</text>
			</div>
			<text class="act-nav-font" @click="stockout">取出</text>
		</div>
		<list class="activity-list">
			<refresh class="loading" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">下拉刷新...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
			<cell class="cell" v-for="item in info" v-if="info.length > 0">
				<div class="act-content">
					<div class="act-stock-t">
						<text class="wine-name">{{item.WineName}}</text>
						<text class="wine-num">{{item.AddAmount}}瓶</text>
					</div>
					<div class="act-stock-b">
						<text class="text-gray">位置：{{item.ShopName}}</text>
						<text class="text-gray">经理人：{{item.NickName}}</text>
						<text class="text-gray">{{item.Expdate}}前有效</text>
					</div>
				</div>
			</cell>
			<cell v-if="info.length == 0">
				<v-nomore></v-nomore>
			</cell>
			<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
                <text class="indicator-text">加载更多...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </loading>
		</list>
		<v-loading v-if="temBool.loading"></v-loading>
	</div>
</template>

<script>
	import NoMore from '@/components/public/NoMore.vue'
	import BusFn from '@/components/public/BusFn.js'
	import utils from '@/components/public/utils.js'
	const animation = weex.requireModule('animation')
    const storage = weex.requireModule('storage')
	const modal = weex.requireModule('modal')
	export default {
		data(){
		    return{
	            /////////////
	            //控制组件显示隐藏 //
	            /////////////
	            temBool: {
	                loading: true,
	            },
	            refreshing: false, //下拉刷新
	            loadinging: false, //上拉加载
	            hasMore: true,
		        headerBox_G_toBack:this.$store.state.get_img_path("toback.png"),
		        headerBox_G_addStock:this.$store.state.get_img_path("addorderbtn.png"),
		        Page:1,
		        PageSize:10,
		        ajaxUrl:'api/wine/getwinelist',
				USERID: 'UserId',
				TOKEN: 'Token',
				info:[],
				infoNumber:'',
                storage:null
		    }
		},
		created(){
			// BusFn.loadingShow_Fn();
			var self= this
			weex.requireModule('storage').getItem(this.USERID,event => {
				self.USERID = event.data
				console.log(event.data);
				weex.requireModule('storage').getItem(this.TOKEN,event => {
					self.TOKEN = event.data
			        self.getWineList({
			        	"Page": self.Page,
			        	Fn: function(ret){
							console.log(ret)
			            	if(ret.Status == 1){
			            		self.info = ret.obj.Items;
			            		self.infoNumber = ret.obj.TotalItems
			            		self.temBool.loading = false;
			            	}
			            	// BusFn.loadingHide_Fn();
			        	}
			        })
				})
			});
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
		    },
		    addStock_G(){
		    	this.$router.push({name:'manageraddStock'})
		    },
		    stockin(){
		    	this.$router.push({name:'managerMyStock'})
		    },
		    stockout(){
		    	this.$router.push({name:'managerTakeOutStock'})
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
			getWineList(obj) {
				var self= this
				utils.WeexAjax({
		            url: this.ajaxUrl+'?Page='+obj.Page+'&PageSize='+self.PageSize+'&UserId='+self.USERID,
		            method: 'GET',
		            type: 'JSON',
		            token: self.TOKEN,
		            callback: function(ret) {
		            	obj.Fn(ret);
		            }
		        })
			},
	        onrefresh() {
	            var _this = this;
	            if (this.refreshing) return;
	            this.refreshing = true;
	            _this.Page = 1;
           		_this.hasMore = true;
	            _this.getWineList({
	                "Page": _this.Page,
	                Fn: function(ret) {
	                    if (ret.Status == 1) {
	                        _this.info = ret.obj.Items;
			            	_this.infoNumber = ret.obj.TotalItems
	                        _this.refreshing = false;
	                        console.log(_this.info)
	                    }
	                }
	            });
	        },
	        onloading() {
	            this.loadinging = true;
	            var _this = this
	            if (this.hasMore)
	                _this.Page++;
	            _this.getWineList({
	                "Page": _this.Page,
	                Fn: function(ret) {
	                    if (ret.obj.Items.length <= 0) {
	                        this.hasMore = false;
	                        weex.requireModule("modal").toast({
	                            message: '没有更多数据了',
	                            duration: 1
	                        })
	                    } else {
	                        for (var item in ret.obj.Items) {
	                            _this.info.push(ret.obj.Items[item])
	                        }
	                        console.log(_this.info)
	                    }
	                    _this.loadinging = false;
	                }
	            });
	        },
		},
	    components: {
	        "v-nomore": NoMore,
    	},
	}
</script>

<style scoped>
.indicator-text {
    color: #666666;
    font-size: 30px;
    text-align: center;
    margin-top: 16px;
}

.indicator {
    margin-top: 10px;
    height: 30px;
    width: 30px;
    color: #999999;
}

.loading {
    width: 750px;
    height: 100px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    background-color: #f5f5f5;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
}

.headerBox_GG{
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
.headerBox_G_addStock{
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
	flex-direction: row;
}
.act-nav-fonts{
	font-size: 32px;
	line-height: 52px;
	color: #777;
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
	color: #333;
}
.wine-num{
	/*width: auto;*/
	font-size: 28px;
	line-height: 30px;
	color: #ff6204;
}
.act-stock-b{
	flex-direction: row;
	justify-content: space-between;
}
.text-gray{
	/*width: auto;*/
	font-size: 24px;
	line-height: 26px;
	color: #777;
	padding-top: 20px;
}
.activity-list{
	position: fixed;
	top: 200px;
	bottom: 100px;
	left: 0;
	right: 0;
}

</style>
