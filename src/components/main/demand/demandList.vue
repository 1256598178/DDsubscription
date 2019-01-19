<template>
  <div class="wrapper">
    <text class="text" @click="toDemandPageHideFoot('demandOrderStandard')" ref="orderStandard">添加标准需求</text>
    <text class="text" @click="toDemandPageHideFoot('demandOrderCustom')">添加订制需求</text>
    <div style="height:50px;"></div>
    <text class="text" @click="toDemandPage('demandListStandard')">切换到标准需求</text>
    <text class="text" @click="toDemandPage('demandListCustom')">切换到订制需求</text>
    <div style="height:50px;"></div>
    <router-view />
  </div>
</template>

<script>
import BusFn from '@/components/public/BusFn.js'
export default {
  data () {
    return {

    }
  },
  mounted(){
    var _this = this;
    setTimeout(function(){
      _this.toDemandPageHideFoot('demandOrderStandard')
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
  }
}
</script>

<style scoped>
  .text{font-size: 40px;margin-bottom: 10px;}
</style>