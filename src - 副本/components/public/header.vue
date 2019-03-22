<template>
    <div class="headerBox_G">
        <text class="headerBox_G_pageTip">{{ title }}</text>
        <div class="back_box" @click="toBack_G">
          <image :src="$store.state.get_img_path('toback.png')" style="width:31px;height:44px;"></image>
        </div>
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
            // headerBox_G_toBack:this.$store.state.get_img_path('toback.png')
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
.back_box{
  position:absolute;
  left:0;
  top:0;
  height: 90px;
  width: 71px;
  justify-content: center;
  align-items: center;
}
.headerBox_G_pageTip{
  color:#333333;
  font-size:36px;
  line-height:88px;
  text-align:center;
}
</style>