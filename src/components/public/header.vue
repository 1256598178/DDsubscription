<template>
    <div class="headerBox_G">
        <text class="headerBox_G_pageTip">{{ title }}</text>
        <image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
    </div>
</template>

<script>
import BusFn from '@/components/public/BusFn.js'
export default {
    props:{
        // 顶部标题
        title:{
            type:String
        },
        // 点击回退时，是否显示main底部导航，true：显示
        isshowFoot:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        getprops(){
            return {
                title:this.title,
                isshowFoot:this.isshowFoot
            }
        }
    },
    data(){
        return{
            headerBox_G_toBack:this.$store.state.imageUrl_G+'toBack.png'
        }
    },
    methods:{
        toBack_G(){
            if(this.getprops.isshowFoot==true){
                BusFn.mainFootShow_Fn();
            }
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>
.headerBox_G{
  height:90px;
  width:750px;
  border-bottom-width:2px;
  border-bottom-color:#eaeaea;
  border-bottom-style:solid;
}
.headerBox_G_toBack{
  position:absolute;
  left:20px;
  top:22px;
}
.headerBox_G_pageTip{
  color:#333333;
  font-size:36px;
  line-height:88px;
  text-align:center;
}
</style>