<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">跟单记录</text>
			<image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
			<text class="headerBox_G_addStock" @click="handleItem_star">填写记录</text>
		</div>
<!-- 		<div class="act-nav">
			<div class="act-nav-font act-nav-crt" @click="stockin">
				<text class="act-nav-fonts act-nav-y">存入</text>
				<text class="act-nav-fonts act-nav-red">(10)</text>
			</div>
			<text class="act-nav-font" @click="stockout">取出</text>
		</div> -->
		<list class="activity-list">
			<refresh class="loading" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator-text">下拉刷新...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
			<cell class="cell" v-for="item in info">
				<div class="act-content">
					<div class="act-stock-t">
						<text class="wine-name">{{item.Content}}</text>
					</div>
					<div class="act-stock-b">
						<text class="text-gray">{{item.AddTime}}</text>
					</div>
				</div>
			</cell>
			<loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
                <text class="indicator-text">加载更多...</text>
                <loading-indicator class="indicator"></loading-indicator>
            </loading>
		</list>
	<vappraise v-if="addrecordShow" v-bind:DemandID="DemandId" v-bind:USERID="USERID" v-bind:TOKEN="TOKEN" v-on:transmitObj="receiveObj"></vappraise>
	<v-toast :img="toastImg" :text="toastText" v-if="openToast" v-on:close="closeTotas"></v-toast>
	</div>
</template>

<script>
	import utils from '@/components/public/utils.js'
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	import addrecord from '@/components/public/addrecord.vue'
	import toast from '@/components/public/toast.vue'
	import Bus from '@/components/public/Bus.js'
	export default {
		data(){
		    return{
	            refreshing: false, //下拉刷新
	            loadinging: false, //上拉加载
            	hasMore: true,
		    	addrecordShow:false,
		        headerBox_G_toBack:this.$store.state.get_img_path("toback.png"),
		        headerBox_G_addStock:this.$store.state.get_img_path("addorderbtn.png"),
		        Page:1,
		        PageSize:10,
	            USERID: 'UserId',
	            TOKEN: 'Token',
		        DemandId:0,
		        info:[],
	            toastImg:{
	                url:this.$store.state.get_img_path("ok.png"),
	                width:'96px',
	                height:'74px'
	            },
	            toastText:"跟单成功",
	            openToast:false,
		    }
		},
		created(){
			var _this = this
			this.DemandId = this.$route.query.DemandId;
	        weex.requireModule('storage').getItem(this.USERID, event => {
	            this.USERID = event.data
	            console.log(event.data);
	            weex.requireModule('storage').getItem(this.TOKEN, event => {
	                this.TOKEN = event.data
					_this.getinfo({
						"Page": _this.Page,
						Fn: function(ret){
				              _this.info = ret.obj.Items;
				              console.log(_this.info)
						}
					});
	            })
	        });
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
		    },
		    // addStock_G(){
		    // 	this.$router.push({name:'manageraddStock'})
		    // },
		    getinfo(obj){
				var that = this;
	  			var ajaxUrl='api/orderrecord/getorderrecordemandlist?Page='+obj.Page+'&PageSize='+this.PageSize+'&UserId='+this.USERID+'&DemandId='+this.DemandId;
					utils.WeexAjax({
				          url: ajaxUrl,
				          method: 'GET',
				          type: 'JSON',
				          token: that.TOKEN,
				          callback: function(ret) {
				          	obj.Fn(ret);
				          }
				    })		
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
			handleItem_star(){
		      this.addrecordShow=true;
		    },
		    receiveObj(data){
		    	this.info.splice(0,0,data)
		    	this.openToast = true;
		    },
	        closeTotas() {
	            this.openToast = false;
	        },
	        onrefresh() {
	            var _this = this;
	            if (this.refreshing) return;
	            this.refreshing = true;
	            _this.Page = 1;
	            _this.hasMore = true;
	            _this.getinfo({
	                "Page": _this.Page,
	                Fn: function(ret) {
	                    if (ret.Status == 1) {
	                    	_this.info = ret.obj.Items;
	                    	console.log(_this.info)
	                        _this.refreshing = false;
	                    }
	                }
	            });
	        },
	        onloading() {
	            this.loadinging = true;
	            var _this = this
	            if (this.hasMore)
	                _this.Page++;
	            _this.getinfo({
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
	                    }
	                    _this.loadinging = false;
	                }
	            });
	        },
		},
	   	components:{
	    	vappraise:addrecord,
	    	"v-toast": toast
	  	},
		mounted(){
		    var _this = this;
		    Bus.$on('addrecordShowToFalse',function(){
		      _this.addrecordShow=false;
		    })
		}
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
	top:22px;
}
.headerBox_G_addStock{
	font-size: 36px;
	position:absolute;
	right:20px;
	top:22px;
	color: #a6a6a6;
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
	justify-content: flex-end;
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
	top: 90px;
	bottom: 0px;
	left: 0;
	right: 0;
}

</style>
