<template>
  <div class="wrapper">
    <!-- 发布定制需求 -->
    <header :title="header_title" :isshowFoot="true"></header>
  </div>
</template>

<script>
import header from '../../public/header'
export default {
  components:{
    header:header
  },
  data () {
    return {
      header_title:"发布定制需求"
    }
  },
  methods:{
    
  }
}
</script>

<style scoped>

</style>