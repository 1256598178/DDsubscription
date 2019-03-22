<template>
<scroller class="scroller">
  <div class="orderListWrapper">
    <div class="listBox">
      <div class="listItem">
        <div class="itemTop">
          <div class="itemTipbox itemTopTipbox">
            <div class="itemImgbox">
              <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
            </div>
            <text class="itemTipbox_t1">发布时间</text>
            <text class="itemTipbox_t2">2018年12月1日 12:05:00</text>
          </div>
          <div class="itemState">
            <text class="stateT stateNotDoing">未接单</text>
          </div>
        </div>
        <div class="orderInfo">
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.category" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">类别</text>
              <text class="itemTipbox_t2">KTV</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.nums" style="width:34px;height:26px;"></image>
              </div>
              <text class="itemTipbox_t1">人数</text>
              <text class="itemTipbox_t2">5人</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.time" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">时间</text>
              <text class="itemTipbox_t2">2018年12月1日-2018年12月2日</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.addr" style="width:34px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">地址</text>
              <text class="itemTipbox_t2 messageT">上海市浦东新区灵岩南路295号</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.nearby" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">附近起止公里数</text>
              <text class="itemTipbox_t2">5KM</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox messageBoxItem">
              <div class="itemImgbox">
                <image :src="oderListImg.message" style="width:34px;height:29px;"></image>
              </div>
              <text class="itemTipbox_t1">留言</text>
              <text class="itemTipbox_t2 messageT">上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">诚意金</text>
              <text class="itemTipbox_t2 red">500元</text>
            </div>
          </div>
        </div>
        <div class="handle">
          <text v-for="(val,key,index) in statesList.notDoing.handles" :key="index" :class="['handleItem',key,index==Object.keys(statesList.notDoing.handles).length-1 ? 'rightBMP0':'']">{{ val }}</text>
        </div>
      </div>
      <div class="listItem">
        <div class="itemTop">
          <div class="itemTipbox itemTopTipbox">
            <div class="itemImgbox">
              <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
            </div>
            <text class="itemTipbox_t1">发布时间</text>
            <text class="itemTipbox_t2">2018年12月1日 12:05:00</text>
          </div>
          <div class="itemState">
            <text class="stateT stateDoing">已接单</text>
          </div>
        </div>
        <div class="orderInfo">
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.category" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">类别</text>
              <text class="itemTipbox_t2">KTV</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.nums" style="width:34px;height:26px;"></image>
              </div>
              <text class="itemTipbox_t1">人数</text>
              <text class="itemTipbox_t2">5人</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.time" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">时间</text>
              <text class="itemTipbox_t2">2018年12月1日-2018年12月2日</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.addr" style="width:34px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">地址</text>
              <text class="itemTipbox_t2 messageT">上海市浦东新区灵岩南路295号</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.nearby" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">附近起止公里数</text>
              <text class="itemTipbox_t2">5KM</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox messageBoxItem">
              <div class="itemImgbox">
                <image :src="oderListImg.message" style="width:34px;height:29px;"></image>
              </div>
              <text class="itemTipbox_t1">留言</text>
              <text class="itemTipbox_t2 messageT">上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">诚意金</text>
              <text class="itemTipbox_t2 red">500元</text>
            </div>
          </div>
        </div>
        <div class="managerInfo">
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.manager" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">经理人</text>
              <text class="itemTipbox_t2 noflexGrow">张某某</text>
              <text class="stateT statePersonInfo">查看</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">接单时间</text>
              <text class="itemTipbox_t2">2018年12月1日 12:15:00</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.state" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">执行状态</text>
              <text class="itemTipbox_t2">已接单，未联系</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">成交金额</text>
              <text class="itemTipbox_t2 red">500元</text>
            </div>
          </div>
        </div>
        <div class="handle">
          <text v-for="(val,key,index) in statesList.doing.handles" :key="index" :class="['handleItem',key,index==Object.keys(statesList.doing.handles).length-1 ? 'rightBMP0':'']">{{ val }}</text>
        </div>
      </div>
      <div class="listItem">
        <div class="itemTop">
          <div class="itemTipbox itemTopTipbox">
            <div class="itemImgbox">
              <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
            </div>
            <text class="itemTipbox_t1">发布时间</text>
            <text class="itemTipbox_t2">2018年12月1日 12:05:00</text>
          </div>
          <div class="itemState">
            <text class="stateT stateEnding">已完单</text>
          </div>
        </div>
        <div class="orderInfo">
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.category" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">类别</text>
              <text class="itemTipbox_t2">KTV</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.nums" style="width:34px;height:26px;"></image>
              </div>
              <text class="itemTipbox_t1">人数</text>
              <text class="itemTipbox_t2">5人</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.time" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">时间</text>
              <text class="itemTipbox_t2">2018年12月1日-2018年12月2日</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.addr" style="width:34px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">地址</text>
              <text class="itemTipbox_t2 messageT">上海市浦东新区灵岩南路295号</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.nearby" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">附近起止公里数</text>
              <text class="itemTipbox_t2">5KM</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox messageBoxItem">
              <div class="itemImgbox">
                <image :src="oderListImg.message" style="width:34px;height:29px;"></image>
              </div>
              <text class="itemTipbox_t1">留言</text>
              <text class="itemTipbox_t2 messageT">上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">诚意金</text>
              <text class="itemTipbox_t2 red">500元</text>
            </div>
          </div>
        </div>
        <div class="managerInfo">
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.manager" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">经理人</text>
              <text class="itemTipbox_t2 noflexGrow">张某某</text>
              <text class="stateT statePersonInfo">查看</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">接单时间</text>
              <text class="itemTipbox_t2">2018年12月1日 12:15:00</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.state" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">执行状态</text>
              <text class="itemTipbox_t2">已接单，未联系</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">成交金额</text>
              <text class="itemTipbox_t2 red">500元</text>
            </div>
          </div>
        </div>
        <div class="handle">
          <text v-for="(val,key,index) in statesList.ending.handles" @click="handleItem_star" :key="index" :class="['handleItem',key,index==Object.keys(statesList.ending.handles).length-1 ? 'rightBMP0':'']">{{ val }}</text>
        </div>
      </div>
      <div class="listItem">
        <div class="itemTop">
          <div class="itemTipbox itemTopTipbox">
            <div class="itemImgbox">
              <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
            </div>
            <text class="itemTipbox_t1">发布时间</text>
            <text class="itemTipbox_t2">2018年12月1日 12:05:00</text>
          </div>
          <div class="itemState">
            <text class="stateT stateEnding">已完单</text>
          </div>
        </div>
        <div class="orderInfo">
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.category" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">类别</text>
              <text class="itemTipbox_t2">KTV</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.nums" style="width:34px;height:26px;"></image>
              </div>
              <text class="itemTipbox_t1">人数</text>
              <text class="itemTipbox_t2">5人</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.time" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">时间</text>
              <text class="itemTipbox_t2">2018年12月1日-2018年12月2日</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.addr" style="width:34px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">地址</text>
              <text class="itemTipbox_t2 messageT">上海市浦东新区灵岩南路295号</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.nearby" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">附近起止公里数</text>
              <text class="itemTipbox_t2">5KM</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox messageBoxItem">
              <div class="itemImgbox">
                <image :src="oderListImg.message" style="width:34px;height:29px;"></image>
              </div>
              <text class="itemTipbox_t1">留言</text>
              <text class="itemTipbox_t2 messageT">上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵岩南路295号上海市浦东新区灵</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">诚意金</text>
              <text class="itemTipbox_t2 red">500元</text>
            </div>
          </div>
        </div>
        <div class="managerInfo">
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.manager" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">经理人</text>
              <text class="itemTipbox_t2 noflexGrow">张某某</text>
              <text class="stateT statePersonInfo">查看</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.update" style="width:34px;height:34px;"></image>
              </div>
              <text class="itemTipbox_t1">接单时间</text>
              <text class="itemTipbox_t2">2018年12月1日 12:15:00</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.state" style="width:30px;height:30px;"></image>
              </div>
              <text class="itemTipbox_t1">执行状态</text>
              <text class="itemTipbox_t2">已接单，未联系</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox">
              <div class="itemImgbox">
                <image :src="oderListImg.price" style="width:30px;height:32px;"></image>
              </div>
              <text class="itemTipbox_t1">成交金额</text>
              <text class="itemTipbox_t2 red">500元</text>
            </div>
          </div>
          <div class="infoItem">
            <div class="itemTipbox itemTopTipbox alignTop">
              <div class="itemImgbox">
                <image :src="oderListImg.stars" style="width:29px;height:29px;"></image>
              </div>
              <text class="itemTipbox_t1">服务评价</text>
              <div class="t2StarsBox">
                <div class="starWrap">
                  <vstars :starNums="4"></vstars>
                </div>
                <text class="itemTipbox_t2_starts">服务效率高，态度好，有保障！</text>
              </div>
            </div>
          </div>
          <vappraise v-if="appraiseShow"></vappraise>
        </div>
      </div>
    </div>
  </div>
</scroller>
</template>

<script>
import stars from '../../public/stars.vue'
import appraise from '../../public/appraise.vue'
import Bus from '@/components/public/Bus.js'
export default {
  components:{
    vstars:stars,
    vappraise:appraise
  },
  data () {
    return {
      appraiseShow:false,
      oderListImg:{
        update:this.$store.state.imageUrl_G+"oderList1.png",
        category:this.$store.state.imageUrl_G+"oderList2.png",
        nums:this.$store.state.imageUrl_G+"oderList3.png",
        time:this.$store.state.imageUrl_G+"oderList4.png",
        addr:this.$store.state.imageUrl_G+"oderList5.png",
        nearby:this.$store.state.imageUrl_G+"oderList6.png",
        message:this.$store.state.imageUrl_G+"oderList7.png",
        price:this.$store.state.imageUrl_G+"oderList8.png",
        manager:this.$store.state.imageUrl_G+"oderList9.png",
        state:this.$store.state.imageUrl_G+"oderList10.png",
        stars:this.$store.state.imageUrl_G+"oderList11.png"
      },
      statesList:{
        notDoing:{
          name:'未接单',
          handles:{
            handleItem_change:'修改',
            handleItem_delete:'删除'
          }
        },
        doing:{
          name:'已接单',
          handles:{
            handleItem_end:'完单'
          }
        },
        ending:{
          name:'已完成',
          handles:{
            handleItem_star:'评价'
          }
        }
      },
      Page:1,
      PageSize:20,
      UserId:6,
      TypeId:2,
      lng:0,
      lat:0,

    }
  },
  created(){
      this.getbusiness();
      console.log(123);
  },
  methods:{
    handleItem_star(){
      this.appraiseShow=true;
    },
    getbusiness(){
      var that = this;
        var ajaxUrl='api/demand/getmanagermydemandlist?Page='+this.Page+'&PageSize='+this.PageSize+'&TypeId='+this.TypeId+'&lng='+this.lng+'&lat='+this.lat+'&UserId='+this.UserId
        utils.WeexAjax({
                url: ajaxUrl,
                method: 'GET',
                type: 'JSON',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIxMzIyNjA2ODk5MyIsIm5iZiI6MTU0ODg0MDAyOSwiZXhwIjoxNTY0MzkyMDI5LCJpYXQiOjE1NDg4NDAwMjl9.JH8yY9YMx2663MYUn9xrAXflS8X6OE4kViuaG01blbI',
                callback: function(ret) {
                    // let rets = utils.JsonFormat(ret);
                    that.info = ret;
                    console.log(that.info)
                }
          })  
    },
  },
  mounted(){
    var _this = this;
    Bus.$on('appraiseShowToFalse',function(){
      _this.appraiseShow=false;
    })

  }
}
</script>

<style scoped>
  .scroller{position: fixed;top:200px;bottom: 120px;width:750px;left:0px;}
  .orderListWrapper{width:750px;padding-left:20px;padding-right:20px;}
  .listItem{border-style:solid;border-color:#e8e8e8;border-width: 2px;padding-left:18px;padding-right:18px;padding-top:18px;padding-bottom:18px;margin-bottom: 20px;}
  .itemTop{border-bottom-style:solid;border-bottom-color:#e8e8e8;border-bottom-width: 1px;height:60px;flex-direction: row;justify-content: space-between;align-items: center;padding-bottom: 15px;}
  .itemTipbox{flex-direction: row;align-items: center;}
  .itemImgbox{flex-direction: row;width:34px;height:34px;justify-content: center;}
  .itemTipbox_t1{font-size: 30px;color: #333333;margin-left: 10px;line-height: 34px;}
  .t2Box{flex:2;margin-left:18px;}
  .itemTipbox_t2{font-size: 28px;color: #777777;margin-left: 18px;line-height: 40px;flex:2;}
  .stateT{padding-left:20px;padding-right:20px;height:44px;line-height:44px;border-radius: 8px;text-align: center;font-size: 24px;color: #ffffff;}
  .stateNotDoing{background-color: #d86060;}
  .red{color:#ff6204;}
  .infoItem{margin-top:20px;}
  .managerInfo{border-top-style:solid;border-top-width:1px;border-top-color:#e8e8e8;margin-top:20px;}
  .handle{border-top-style:solid;border-top-width:1px;border-top-color:#e8e8e8;margin-top:20px;height:91px;flex-direction: row;justify-content: flex-end;align-items: center;}
  .handleItem{padding-right: 24px;margin-right: 25px;border-right-width: 1px;border-right-color: #dcdcdc;border-right-style: solid;font-size: 30px;line-height:34px;;}
  .rightBMP0{border-right-width:0;margin-right:0;padding-right:0px;}
  .handleItem_change{color: #ffd262;}
  .handleItem_delete{color: #ff0000;}
  .handleItem_end{color: #3381a9;}
  .handleItem_star{color: #ffb400;}
  .stateDoing{background-color: #66a773;}
  .statePersonInfo{background-color: #853f81;margin-left: 25px;}
  /* .noflexGrow{flex:inherit;} */
  .stateEnding{background-color: #e77a32;}
  .t2StarsBox{flex:2;margin-left: 18px;}
  .itemTipbox_t2_starts{margin-top:15px;font-size: 28px;color: #777777;line-height: 40px;}
  .starWrap{color:#000000;}
  .alignTop{align-items: flex-start;}
</style>