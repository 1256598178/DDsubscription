<template>

  <div class="wrapper">
      <!-- <image :src="helloPage" class="helloImg" /> -->
      <text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, ipsa. Vitae, necessitatibus reprehenderit maxime nam libero sit, commodi expedita impedit provident incidunt accusamus asperiores praesentium dolores vel? Maxime, pariatur mollitia!</text>
  </div>
</template>

<script>
export default {
  data () {
    return {
      helloPage:'http://192.168.2.201:8082/helloPage.png',
      toHomeTime:null
    }
  },
  methods:{
    toHome(){
      this.toHomeTime = setTimeout(()=>{
        this.$router.push({name:'Home'})
      },3000)
    }
  },
  mounted(){
    this.toHome()
  }
}
</script>

<style scoped>
  .helloImg{width:750px;height:1250px;}
</style>


