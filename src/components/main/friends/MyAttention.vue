<template>
	<div class="wrapper">
		<div class="headerBox_G">
		    <text class="headerBox_G_pageTip">朋友圈</text>
		</div>
		<div class="act-nav">
			<text class="act-nav-font" @click="toRecentNews">最新动态</text>
			<text class="act-nav-font act-nav-crt">我的关注</text>
		</div>
		<list class="activity-list">
			<cell class="cell" v-for="item in 15" :key="item">
				<div class="act-content">
					<image class="act-img" :src="photo"></image>
					<div class="act-content-r">
						<text class="text-gray">张某某-酒店经理人</text>
					</div>
				</div>
			</cell>
		</list>
	</div>
</template>

<script>
	const animation = weex.requireModule('animation')
	const modal = weex.requireModule('modal')
	export default {
		data(){
		    return{
		        headerBox_G_toBack:this.$store.state.imageUrl_G+"toBack.png",
				photo:this.$store.state.imageUrl_G+"photo.png",
				
		    }
		},
		methods:{
		    toBack_G(){
		        this.$router.back(-1);
			},
			toRecentNews(){
				this.$router.push({name:'RecentNews'});
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
}
.act-nav-crt{
	font-weight: bold;
	color: #ffd262;
	border-bottom-color: #ffd262;
}
.cell{
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: #dcdcdc;
}
.act-content{
	flex-direction: row;
}
.act-img{
	width: 80px;
	height: 80px;
	margin-right: 30px;
}
.act-content-r{
	flex: 1;
}
.text-gray{
	width: auto;
	font-size: 28px;
	line-height: 80px;
	color: #333;
}
.activity-list{
	position: fixed;
	top: 200px;
	bottom: 100px;
	left: 0;
	right: 0;
}

</style>
