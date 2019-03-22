<template>
  <div class="wrapper">
    <div class="demandTop">
      <text class="Topname">需求</text>
      <div class="addOrderBtn" @click="openChooseAdd">
				<image :src="addOrderBtnImg" style="width:40px;height:40px;"></image>
			</div>
    </div>
    <div class="demandListNav">
      <div :class="['navItem',index==navList.length-1?'marginR0':'']" v-for="(item,index) in navList" :key="index">
        <text :class="['navItemText',item.page == choosedNav ? 'navItemActive':'']" @click="toDemandPage(item.page)">{{ item.name }}</text>
      </div>
    </div>
    <router-view v-if="isRouterAlive" />
    <div class="ChooseAddBox" v-if="openChooseAddBoxisShow">
      <div class="addItem hasBottomBorder"  @click="toDemandPageHideFoot('demandOrderStandard')">
        <image class="addItemImg" :src="addOrderImg1" style="width:26px;height:26px;"></image>
        <text class="addItemText">标准需求</text>
      </div>
      <div class="addItem"  @click="toDemandPageHideFoot('demandOrderCustom')">
        <image class="addItemImg" :src="addOrderImg2" style="width:24px;height:24px;"></image>
        <text class="addItemText">定制需求</text>
      </div>
    </div>
  </div>
</template>

<script>
import BusFn from '@/components/public/BusFn.js'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
export default {
  data () {
    return {
			isRouterAlive:true,
      addOrderBtnImg:this.$store.state.get_img_path("addorderbtn.png"),
      addOrderImg1:this.$store.state.get_img_path("addorderbtn1.png"),
      addOrderImg2:this.$store.state.get_img_path("addorderbtn2.png"),
      openChooseAddBoxisShow:false,
			USERID: 'UserId',
			TOKEN: 'Token',
      navList:[
        {
          page:'demandListStandard',
          name:'标准需求'
        },
        {
          page:'demandListCustom',
          name:'订制需求'
        }
      ],
      choosedNav:'demandListStandard',
			routers:0,
    }
  },
  methods:{
    toDemandPage(name){
      this.$router.push({name:name});
      this.choosedNav = name;
    },
    toDemandPageHideFoot(name){
      this.$router.push({name:name});
      BusFn.mainFootHide_Fn();
    },
    openChooseAdd(){
      this.openChooseAddBoxisShow = !this.openChooseAddBoxisShow;
    },
		reload(){
			this.isRouterAlive = false;
			this.$nextTick(function(){
				this.isRouterAlive = true;
			});
		}
  },
	created(){
	  var self = this
		console.log(self.routers)
		BusFn.mainFootShow_Fn();
		weex.requireModule('storage').getItem(this.USERID,event => {
			self.USERID = event.data
			weex.requireModule('storage').getItem(this.TOKEN,event => {
				self.TOKEN = event.data
				/* weex.requireModule('storage').getItem('routers',event => {
					self.routers = event.data
				}) */
			})
		});
	  setTimeout(function(){
	    // _this.toDemandPage('demandListStandard')
			var self = this
			Util.goLogin({
				 "USERID": self.USERID,
				 "TOKEN": self.TOKEN,
				 "success": function(){
					 //self.$router.push({name: 'demandListStandard'});
					 /* if(self.routers === 0){
						 self.chooseNav = 'demandListStandard'
					 }else{
						 self.chooseNav = 'demandListCustom'
					 } */
					 BusFn.JumpPath_Fn({path:'',mainName:'demand',pathName:'demandListStandard'});
				 },
				 "fail": function(){
					 console.log(1);
					 self.$router.push({name: 'login'});
					 console.log(2);
				 }
			})
	  },5)
	},
}
</script>

<style scoped>
  .demandTop{height:90px;border-bottom-color: #e5e5e5;border-bottom-style: solid;border-bottom-width: 2px;align-items: center;}
  .Topname{text-align: center;font-size:42px;color:#333333;line-height:88px;}
  .addOrderBtn{width:88px;height:88px;position: absolute;right:0px;top:0px;padding-left: 24px;padding-bottom: 24px;padding-right: 24px;padding-top: 24px;}
  .ChooseAddBox{padding-top:10px;padding-bottom:10px;position: fixed;right:20px;top:75px;border-style: solid;border-width: 3px;border-color: #e8e8e8;width:172px;background-color: #ffffff;}
  .hasBottomBorder{border-bottom-color: #cccccc;border-bottom-style: solid;border-bottom-width: 1px;}
  .addItem{flex-direction: row;align-items: center;height:60px;}
  .addItemImg{margin-left:15px;margin-right: 8px;}
  .addItemText{color: #333333;font-size:24px;}
  .demandListNav{height:110px;justify-content: center;align-items: center;flex-direction: row;}
  .navItemText{color: #777777;font-size: 32px;padding-bottom: 8px;border-bottom-color: #ffffff;border-bottom-style: solid;border-bottom-width: 5px;}
  .navItemActive{color:#ffd262;font-weight: bold;border-bottom-color: #ffd262;}
  .navItem{margin-right: 45px;}
  .marginR0{margin-right: 0px;}
</style>