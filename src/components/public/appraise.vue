<template>
    <div class="appraiseCom">
        <div class="mainCont">
            
            <text class="title">服务评价</text>
            <div class="info">
                <div class="item1">
                    <text class="l">选择服务星级</text>
                    <div class="r starList">
                        <text :class="['iconFont','star',index<=newIndex?'staron':'']" v-for="(item,index) in 5" :key="'key'+index" @click="chooseStar(index)">&#xe8c2;</text>
                    </div>
                </div>
                <div class="item2">
                    <text class="l">填写评价内容</text>
                    <div class="r">
                       <textarea class="textarea"></textarea>
                    </div>
                </div>
            </div>
            <div class="btn">
                <text class="btnItem ok" @click="close">确定</text>
                <text class="btnItem cancel" @click="close">取消</text>
            </div>
            <text class="close iconFont" @click="close">&#xe62a;</text>
        </div>
    </div>
</template>

<script>
import BusFn from '@/components/public/BusFn.js'
import Bus from '@/components/public/Bus.js'
export default {
    data(){
        return{
            newIndex:0
        }
    },
    created() {
      var fontModule = weex.requireModule("dom");
      fontModule.addRule('fontFace', {
          'fontFamily': "iconfont",
          'src': 'url("//at.alicdn.com/t/font_1005984_39pje44rbmx.ttf")'
      })
    },
    methods:{
        chooseStar(index){
            this.newIndex = index;
        },
        close(){
            Bus.$emit('appraiseShowToFalse');
            // console.log('appraiseShowToFalse');
        }
    }
}
</script>

<style scoped>
    .iconFont{font-family: iconfont;}
    .starList{flex-direction: row;}
    .star{font-size: 35px;line-height:35px;padding-right: 15px;color: #333333;}
    .staron{color:#ffd262;}
    .appraiseCom{position: fixed;background-color: rgba(0,0,0,0.8);top:0;bottom:0;left:0;right:0;justify-content: center;}
    .mainCont{width:710px;background-color: #ffffff;border-radius: 8px;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:20px;margin-left:20px;}
    .close{color:#ff5500;font-size: 37px;line-height: 37px;position: absolute;top:20px;right:20px;}
    .title{color: #343434;text-align: center;font-size: 40px;padding-top: 13px;margin-bottom: 60px;}
    .item1{flex-direction: row;margin-bottom: 20px;}
    .l{color: #a3a3a3;font-size: 26px;}
    .starList{margin-left: 35px;}
    .textarea{height:300px;;border-color:#dcdcdc;border-style: solid;border-width:1px;border-radius: 7px;padding-top:15px;padding-left:10px;padding-bottom:15px;padding-right:10px;color:#333333;font-size: 26px;line-height:33px;margin-top: 20px;}
    .btn{margin-top:20px;flex-direction: row;justify-content: flex-end;}
    .btnItem{width:220px;height: 88px;line-height: 88px;font-size: 36px;margin-left: 20px;text-align: center;color:#343331;border-radius: 8px;}
    .ok{background-color: #ffd701;justify-content: center;}
    .cancel{background-color: #dadada;}
</style>