<template>
  <div class="wrapper">
    <image :src="helloPage" class="helloImg"></image>
  </div>
</template>

<script>
import mixin from '@/components/public/mixins.js'
export default {
  data () {
    return {
      helloPage:mixin.get_img_path('hellopage.png'),
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