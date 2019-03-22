<template>
  <div class="wrapper">
    <div class="demandTop">
      <text class="Topname">我的需求</text>
      <div class="back_box" @click="toBack_G">
        <image :src="headerBox_G_toBack" style="width:31px;height:44px;"></image>
      </div>
      <!-- <image class="addOrderBtn" :src="addOrderBtnImg" style="width:39px;height:39px;" @click="openChooseAdd"></image> -->
    </div>
    <div class="demandListNav">
      <div :class="['navItem',index==navList.length-1?'marginR0':'']" v-for="(item,index) in navList" :key="index">
        <text :class="['navItemText',item.page == choosedNav ? 'navItemActive':'']" @click="toDemandPage(item.page)">{{ item.name }}</text>
      </div>
    </div>
    <router-view />
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
export default {
  data () {
    return {
      headerBox_G_toBack:this.$store.state.get_img_path("toback.png"),
      addOrderBtnImg:this.$store.state.get_img_path("addorderbtn.png"),
      addOrderImg1:this.$store.state.get_img_path("addorderbtn1.png"),
      addOrderImg2:this.$store.state.get_img_path("addorderbtn2.png"),
      openChooseAddBoxisShow:false,
      navList:[
        {
          page:'MydemandListStandard',
          name:'标准需求'
        },
        {
          page:'MydemandListCustom',
          name:'定制需求'
        }
      ],
      choosedNav:'MydemandListStandard'
    }
  },
  mounted(){
    var _this = this;
    setTimeout(function(){
      // _this.toDemandPage('demandListStandard')
      BusFn.JumpPath_Fn({path:'',mainName:'demand',pathName:'MydemandListStandard'});
    },5)
    
  },
  methods:{
    toBack_G(){
        BusFn.mainNameJump_Fn("managerDemand");
        this.$router.push({name: 'managerDemand'});
    },
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
.back_box{
  position:absolute;
  left:0;
  top:0;
  height: 90px;
  width: 71px;
  justify-content: center;
  align-items: center;
}
.headerBox_G_addStock{
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
  .demandTop{height:90px;border-bottom-color: #e5e5e5;border-bottom-style: solid;border-bottom-width: 2px;align-items: center;}
  .Topname{text-align: center;font-size:42px;color:#333333;line-height:88px;}
  .addOrderBtn{position: absolute;right:20px;top:25px;}
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