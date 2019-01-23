<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">我的存酒</text>
			<image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
		</div>
		<div class="act-nav">
			<div class="act-nav-font act-nav-crt">
				<text class="act-nav-fonts act-nav-y">存入</text>
				<text class="act-nav-fonts act-nav-red">(10)</text>
			</div>
			<text class="act-nav-font" @click="toTakeOutStock">取出</text>
		</div>
		<list class="activity-list">
			<cell class="cell" v-for="item in 15" :key="item">
				<div class="act-content">
					<div class="act-stock-t">
						<text class="wine-name">百威精酿</text>
						<text class="wine-num">5瓶</text>
					</div>
					<div class="act-stock-b">
						<text class="text-gray">位置：MUSEK</text>
						<text class="text-gray">经理人：张某某</text>
						<text class="text-gray">2018年11月12日</text>
					</div>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
  import Bus from '@/components/public/Bus.js'
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	export default {
		data(){
		    return{
		        headerBox_G_toBack:this.$store.state.imageUrl_G+"toBack.png",
		    }
		},
		methods:{
		    toBack_G(){
				Bus.$emit('mainFootShow');
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
			toTakeOutStock(){
				this.$router.push({
					name:'TakeOutStock'
				})
			}
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
.headerBox_G_toBack{
	position:absolute;
	left:20px;
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
	width: auto;
	font-size: 28px;
	line-height: 30px;
	color: #ff6204;
}
.act-stock-b{
	flex-direction: row;
	justify-content: space-between;
}
.text-gray{
	width: auto;
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
