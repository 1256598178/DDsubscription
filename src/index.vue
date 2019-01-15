<template>
  <div class="wrapper PubStyle">
    <router-view/>
  </div>
</template>

<script>
import Bus from '@/components/public/Bus.js'
export default {
  name: 'App',
  methods:{
    // 页面跳转+底部主导航配合激活
    JumpPath(obj){
        if(obj.pathName){
            this.$router.push({name:obj.pathName});
        }else{
            this.$router.push(obj.path);
        }
        Bus.$emit('mainNameJump',obj.mainName);
    }
  },
  mounted(){
    var _this=this;
    // obj={path,mainName,pathName}
    Bus.$on('globalPageJump',function(obj){
      _this.JumpPath(obj);
    })
  }
}
</script>

<style scoped>

</style>
