<template>
  <div class="wrapper">
    <text @click="toBack_G">返回上一页</text>
    <text>发布订制需求</text>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    toBack_G(){
        this.$router.back(-1);
    }
  }
}
</script>

<style scoped>

</style>