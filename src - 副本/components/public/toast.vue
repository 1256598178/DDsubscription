<template>
    <div class="ToastWrap">
        <div class="ToastMain">
            <image :src="getprops.img.url" :style="{width:getprops.img.width,height:getprops.img.height}"></image>
            <text class="text">{{getprops.text}}</text>   
        </div>
    </div>
</template>

<script>
import BusFn from '@/components/public/BusFn.js'
export default {
    props:{
        // 图片
        img:{
            type:Object,
            default:null
        },
        // 标题
        text:{
            type:String,
            default:""
        }
    },
    computed:{
        getprops(){
            return {
                img:this.img,
                text:this.text
            }
        }
    },
    data(){
        return{
            
        }
    },
    mounted(){
        var _this = this;
        var closeTime = setTimeout(function(){
            _this.$emit('close')
            console.log(1)
        },1000);
    }
}
</script>

<style scoped>
    .ToastWrap{position:fixed;top:0;bottom:0;width:750px;justify-content: center;align-items: center;}
    .ToastMain{background-color:#535353;border-radius: 10px;width:330px;height: 330px;align-items: center;justify-content: center;opacity: 0.8;}
    .text{color:#ffffff;font-size: 34px;margin-top: 60px;text-align: center;}
</style>