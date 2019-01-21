<template>
    <div class="starsCom">
        <text class="star iconFont starItem" v-for="(item,index) in getprops.starNums" :key="'key'+index">&#xe8c2;</text>
        <text class="nonstar iconFont starItem" v-for="(item,index) in (5-getprops.starNums)" :key="index">&#xe8c3;</text>
    </div>
</template>

<script>
import BusFn from '@/components/public/BusFn.js'
export default {
    props:{
        // 数量
        starNums:{
            type:Number,
            default:0
        }
    },
    computed:{
        getprops(){
            return {
                starNums:this.starNums
            }
        }
    },
    data(){
        return{
            
        }
    },
    created() {
      var fontModule = weex.requireModule("dom");
      fontModule.addRule('fontFace', {
          'fontFamily': "iconfont",
          'src': 'url('+this.$store.state.iconUrl+')'
      })
    },
}
</script>

<style scoped>
    .iconFont{font-family: iconfont;}
    .starsCom{flex-direction: row;}
    .starItem{width:26px;height:26px;margin-right: 10px;font-size: 26px;line-height:26px;}
    .star{color: #ffd262;}
</style>