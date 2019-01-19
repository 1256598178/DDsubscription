<template>
  <div class="wrapper">
    <div class="demandTop">
      <text class="Topname">需求</text>
      <image class="addOrderBtn" :src="addOrderBtnImg" style="width:39px;height:39px;" @click="openChooseAdd"></image>
    </div>
    
    <div style="height:50px;"></div>
    <text class="text" @click="toDemandPage('demandListStandard')">切换到标准需求</text>
    <text class="text" @click="toDemandPage('demandListCustom')">切换到订制需求</text>
    <div style="height:50px;"></div>
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
      addOrderBtnImg:this.$store.state.imageUrl_G+"addOrderBtn.png",
      addOrderImg1:this.$store.state.imageUrl_G+"addOrderBtn1.png",
      addOrderImg2:this.$store.state.imageUrl_G+"addOrderBtn2.png",
      openChooseAddBoxisShow:false
    }
  },
  mounted(){
    var _this = this;
    setTimeout(function(){
      _this.toDemandPageHideFoot('demandListStandard')
    },5)
    
  },
  methods:{
    toDemandPage(name){
      this.$router.push({name:name});
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
  .text{font-size: 40px;margin-bottom: 10px;}
  .demandTop{height:90px;border-bottom-color: #e5e5e5;border-bottom-style: solid;border-bottom-width: 2px;align-items: center;}
  .Topname{text-align: center;font-size:42px;color:#333333;line-height:88px;}
  .addOrderBtn{position: absolute;right:20px;top:25px;}
  .ChooseAddBox{padding-top:10px;padding-bottom:10px;position: fixed;right:20px;top:75px;border-style: solid;border-width: 3px;border-color: #e8e8e8;width:172px;background-color: #ffffff;}
  .hasBottomBorder{border-bottom-color: #cccccc;border-bottom-style: solid;border-bottom-width: 1px;}
  .addItem{flex-direction: row;align-items: center;height:60px;}
  .addItemImg{margin-left:15px;margin-right: 8px;}
  .addItemText{color: #333333;font-size:24px;}
</style>