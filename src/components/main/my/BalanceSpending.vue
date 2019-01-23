<template>
	<div class="wrapper">
		<vheader :title="header_title"></vheader>
		<div class="act-nav">
			<text class="act-nav-font" @click="toBalanceIncome">收入</text>
			<text class="act-nav-font act-nav-crt">支出</text>
		</div>
		<list class="activity-list">
			<cell class="cell" v-for="item in 15" :key="item">
				<div class="act-content">
					<div class="act-stock-b">
						<text class="text-gray fir">支出</text>
						<text class="text-gray sec">-100.00</text>
						<text class="text-gray">2018年11月12日</text>
					</div>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
	import header from '../../public/header'
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	export default {
		components: {
			vheader:header
		},
		data(){
		    return{
				headerBox_G_toBack:this.$store.state.imageUrl_G+"toBack.png",
				header_title:'账户余额'
		    }
		},
		methods:{
		    toBack_G(){
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
			toBalanceIncome(){
				this.router.push({
					name:'BalanceIncome'
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
.act-stock-b{
	flex-direction: row;
	justify-content: space-between;
}
.text-gray{
	width: auto;
	font-size: 28px;
	line-height: 30px;
	color: #777;
	padding-top: 20px;
}
.fir{
	width: 200px;
}
.sec{
	color: #ff6204;
}
.activity-list{
	position: fixed;
	top: 200px;
	bottom: 100px;
	left: 0;
	right: 0;
}

</style>
