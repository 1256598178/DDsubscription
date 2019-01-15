<template>
  <div class="wrapper">
    <text class="text" @click="toDemandPage('demandOrderStandard')">添加标准需求</text>
    <text class="text" @click="toDemandPage('demandOrderCustom')">添加订制需求</text>
    <div style="height:50px;"></div>
    <text class="text" @click="toDemandPage('demandListStandard')">切换到标准需求</text>
    <text class="text" @click="toDemandPage('demandListCustom')">切换到订制需求</text>
    <div style="height:50px;"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    toDemandPage(name){
      this.$router.push({name:name});
    }
  }
}
</script>

<style scoped>
  .wrapper{}
  .text{font-size: 40px;margin-bottom: 10px;}
</style>