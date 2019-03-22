<template>
    <div class="appraiseCom">
        <div class="mainCont">
            
            <text class="title">服务评价</text>
            <div class="info">
                <div class="item1">
                    <text class="l">选择服务星级</text>
                    <div class="r starList">
                        <!-- <text :class="['iconFont','star',index<=Score?'staron':'']" v-for="(item,index) in 5" :key="'key'+index" @click="chooseStar(index)">&#xe8c2;</text> -->
						<image :src="index<=Score?$store.state.get_img_path('score.png'):$store.state.get_img_path('scores.png')" class="star" v-for="(item,index) in 5" :key="'key'+index" @click="chooseStar(index)"></image>
					</div>
                </div>
                <div class="item2">
                    <text class="l">填写评价内容</text>
                    <div class="r">
                       <textarea class="textarea" v-model="Comment"></textarea>
                    </div>
                </div>
            </div>
            <div class="btn">
                <text class="btnItem ok" @click="sure">确定</text>
                <text class="btnItem cancel" @click="close">取消</text>
            </div>
            <!-- <text class="close iconFont" @click="close">&#xe62a;</text> -->
			<image class="model-close close" :src="$store.state.get_img_path('cuo.png')" @click="close"></image>
        </div>
    </div>
</template>

<script>
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
import BusFn from '@/components/public/BusFn.js'
import Bus from '@/components/public/Bus.js'
export default {
	props:{
	    // 用户ID
	    UserId:{
	        type:String
	    },
		Token:{
		    type:String
		},
		// 需求ID
		DemandId:{
		    type:Number
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
	            UserId:this.UserId,
				Token:this.Token,
				DemandId:this.DemandId,
	            isshowFoot:this.isshowFoot
	        }
	    }
	},
	inject:['reload'],
    data(){
        return{
			// cuo:this.$store.state.get_img_path("cuo.png"),
			// score:this.$store.state.get_img_path("score.png"),
			// scores:this.$store.state.get_img_path("scores.png"),
            Score:0,
			Comment:''
        }
    },
    created() {
    },
    methods:{
        chooseStar(index){
            this.Score = index;
        },
		sure() {
			var self = this
			console.log(self.getprops.UserId)
			Util.WeexAjax({
		      url: 'api/demand/evaluateDemand',
		      method: 'POST',
		      type: 'JSON',
		      token: self.getprops.Token,
		      body: {
		        "UserId": self.getprops.UserId,
		        "DemandId": self.getprops.DemandId,
				"Score":self.Score+1,
				"Comment":self.Comment
				
		      },
		      callback: function(ret) {
		        var rets = ret;
		        if(ret.Status == 1){
					weex.requireModule("modal").toast({
					    message: ret.Message,
					    duration: 2
					})
					self.reload()
		        }else{
					weex.requireModule("modal").toast({
					    message: ret.Message,
					    duration: 2
					})
					self.close()
				}
		        console.log(rets)
		      }
		  })
		},
        close(){
			//this.reload();
			
            Bus.$emit('appraiseShowToFalse');
            //console.log(this.model);
        }
    }
}
</script>

<style scoped>
    .iconFont{font-family: iconfont;}
    .starList{flex-direction: row;align-items: center;}
    .star{width:26px;height:26px;line-height:35px;margin-right: 15px;color: #333333;}
    .staron{color:#ffd262;}
    .appraiseCom{position: fixed;background-color: rgba(0,0,0,0.4);top:0;bottom:0;left:0;right:0;justify-content: center;align-items: center;}
    .mainCont{width:710px;background-color: #ffffff;border-radius: 8px;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:20px;}
    .close{width: 37px;height: 37px;position: absolute;top:20px;right:20px;}
    .title{color: #343434;text-align: center;font-size: 40px;padding-top: 13px;margin-bottom: 60px;}
    .item1{flex-direction: row;margin-bottom: 20px;}
    .l{color: #a3a3a3;font-size: 26px;}
    .starList{margin-left: 35px;}
    .textarea{height:300px;;border-color:#dcdcdc;border-style: solid;border-width:1px;border-radius: 7px;padding-top:15px;padding-left:10px;padding-bottom:15px;padding-right:10px;color:#333333;font-size: 26px;line-height:33px;margin-top: 20px;}
    .btn{margin-top:20px;flex-direction: row;justify-content: center;}
    .btnItem{width:220px;height: 88px;line-height: 88px;font-size: 36px;margin-left: 20px;text-align: center;color:#343331;border-radius: 8px;}
    .ok{background-color: #ffd701;justify-content: center;}
    .cancel{background-color: #dadada;}
</style>