<template>
  <div class="wrapper">
    <image :src="helloPage" class="helloImg"></image>
  </div>
</template>

<script>
export default {
  data () {
    return {
      helloPage:this.$store.state.imageUrl_G+'helloPage.png',
      toHomeTime:null
    }
  },
  methods:{
    toHome(){
      var _this = this;
      _this.toHomeTime = setTimeout(function(){
        _this.$router.push({name:'login'})
      },500)
    }
  },
  mounted(){
    this.toHome()
  }
}
</script>

<style scoped>
  .helloImg{
    width:750px;
    height:1250px;
  }
</style>