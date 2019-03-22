<template>
    <div class="appraiseCom">
        <div class="mainCont">
            <text class="title">填写方案</text>
            <div class="info">
                <div class="item2">
                    <!-- <text class="l">填写评价内容</text> -->
                    <div class="r">
                       <textarea class="textarea" placeholder="多行输入" v-model="Contents"></textarea>
                    </div>
                </div>
            </div>
            <div class="btn">
                <text class="btnItem ok" @click="close(1)">确定</text>
                <text class="btnItem cancel" @click="close">取消</text>
            </div>
            <image class="close" :src="$store.state.get_img_path('cuo.png')" @click="close"></image>
        </div>
    </div>
</template>

<script>
import utils from '@/components/public/utils.js'
import BusFn from '@/components/public/BusFn.js'
import Bus from '@/components/public/Bus.js'
export default {
    props: {
        DemandID: {
            type: Number
        },
        USERID: {
            type: String
        },
        TOKEN: {
            type: String
        },
        Content: {
            type: String,
            defalt: ''
        }
    },
    data(){
        return{
            newIndex:0,
            Contents: this.Content,
            emitBool: false,
            // oderListImg: {
            //     cuo: this.$store.state.get_img_path("cuo.png"),
            // },
        }
    },
    created() {
    },
    methods:{
        postinfo(){
            var that = this;
            var ajaxUrl='api/demand/editMadeDemandProgramme';
            var emits = this.$emit("transmitCustom",that.Contents)
            utils.WeexAjax({
                  url: ajaxUrl,
                  method: 'POST',
                  type: 'JSON',
                  token: that.TOKEN,
                  body:{"UserId": that.USERID,"DemandID": that.DemandID,"Programme": that.Contents},
                  callback: function(ret) {
                    if(ret.Status == 1){
                        emits
                    }
                  }
            })      
        },
        // chooseStar(index){
        //     this.newIndex = index;
        // },
        close($res=''){
            if($res == 1){
                if(this.Contents.length != 0){
                    this.postinfo();
                }else{
                    weex.requireModule("modal").toast({
                        message: '内容为空,请重新输入',
                        duration: 1
                    })
                }
            }
            Bus.$emit('programmeShowToFalse');
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
    .close{position: absolute;top:20px;right:20px;width: 37px;height: 37px;}
    .title{color: #343434;text-align: center;font-size: 40px;padding-top: 13px;margin-bottom: 60px;}
    .item1{flex-direction: row;margin-bottom: 20px;}
    .l{color: #a3a3a3;font-size: 26px;}
    .starList{margin-left: 35px;}
    .textarea{height:300px;;border-color:#dcdcdc;border-style: solid;border-width:1px;border-radius: 7px;padding-top:15px;padding-left:10px;padding-bottom:15px;padding-right:10px;color:#333333;font-size: 26px;line-height:33px;margin-top: 20px;}
    .btn{margin-top:20px;flex-direction: row;justify-content: center;}
    .btnItem{width:220px;height: 88px;line-height: 88px;font-size: 36px;margin-left: 20px;text-align: center;color:#343331;border-radius: 8px;}
    .ok{background-color: #ffd701;justify-content: center;}
    .cancel{background-color: #dadada;}
        input::-webkit-input-placeholder{
            color:#d7d7d7;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#d7d7d7;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#d7d7d7;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#d7d7d7;
        }
</style>