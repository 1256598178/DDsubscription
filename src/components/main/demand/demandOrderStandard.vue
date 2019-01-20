<template>
  <div class="wrapper">
    <vheader :title="header_title" :isshowFoot="true"></vheader>
    <scroller class="formWrapperScroller">
      <div class="formWrapper">
        <text class="tipNode">请准确输入以下需求内容</text>
        <div class="formItem formInputItem">
          <div class="labelBox">
            <text class="label">类别</text><text class="requiredFlag">*</text>
          </div>
          <div class="enterBox">
            <div class="selector">
              <div class="selectorTextBox" @click="popOpen('category_pop_scroller_show')">
                <text class="selectorText">{{ orderForm.category }}</text>
                <image class="selectorXL" :src="selectorXLImg"></image>
              </div>  
            </div>
          </div>
        </div>
        <div class="formItem formInputItem">
          <div class="labelBox">
            <text class="label">人数</text><text class="requiredFlag">*</text>
          </div>
          <div class="enterBox">
            <div class="inputBox">
              <input type="text" v-model="orderForm.Number" class="inputBox_inp">
            </div>
          </div>
        </div>
        <div class="formItem formInputItem">
          <div class="labelBox">
            <text class="label">起止时间</text><text class="requiredFlag">*</text>
          </div>
          <div class="enterBox">
            <div class="inputBox">
              <input type="text" v-model="orderForm.time" class="inputBox_inp">
            </div>
          </div>
        </div>
        <div class="formItem formInputItem">
          <div class="labelBox">
            <text class="label">地址</text><text class="requiredFlag">*</text>
          </div>
          <div class="enterBox">
            <div class="inputBox">
              <input type="text" v-model="orderForm.address" class="inputBox_inp">
            </div>
          </div>
        </div>
        <div class="formItem formInputItem">
          <div class="labelBox">
            <text class="label">附近起止公里数</text><text class="requiredFlag">*</text>
          </div>
          <div class="enterBox">
            <div class="inputBox">
              <input type="text" v-model="orderForm.areaNUm" class="inputBox_inp">
            </div>
          </div>
        </div>
        <div class="formItem formInputItem">
          <div class="labelBox">
            <text class="label">手机号码</text><text class="requiredFlag">*</text>
          </div>
          <div class="enterBox">
            <div class="inputBox">
              <input type="text" v-model="orderForm.phone" class="inputBox_inp">
            </div>
          </div>
        </div>
        <div class="messageInfo">
           <textarea class="messageInfoText" v-model="orderForm.messageInfo"></textarea>
        </div>
        <div class="price">
            <text class="priceTip">请选择预付诚意金</text>
            <div class="priceItemBox">
              <div :class="['priceItem', 'priceChoose',index==priceList[0].length-1?'marginR0':'']" v-for="(item,index) in priceList[0]" :key="index">
                <text :class="['priceText',item==choosedPrice?'priceItemActive':'']" @click="choosePrice(item)">{{item}}元</text>
              </div>
            </div>
            <div class="priceItemBox marginB0">
              <div :class="['priceItem', 'priceChoose']" v-for="(item,index) in priceList[1]" :key="index">
                <text :class="['priceText',item==choosedPrice?'priceItemActive':'']" @click="choosePrice(item)">{{item}}元</text>
              </div>
              <input class="priceItem priceInput marginR0" type="text" placeholder="其他金额" v-model="otherPrice" @change="choosePriceByinput">
            </div>
        </div>
        <text class="LoginButton" @click="GetOrder">发布需求</text>
      </div>
    </scroller>

    <scroller class="HomeCity_pop_scroller" v-if="category_pop_scroller_show">
        <div class="HomeCity_pop" @click="hideCity_pop">
            <div class="HomeCity_popClose">
                <text class="HomeCity_popCloseText" @click="hidePop('category_pop_scroller_show')">取消</text>
            </div>
            <div class="HomeCity_popCityList">
                <div class="HomeCity_popCityItem" v-for="(item,index) in categorySelectorList" :key="index" @click="chooseCategory(item)">
                    <text :class="['HomeCity_popCityItemText',(item.value==orderForm.category)?'HomeCity_popCityItemTextActive':'']">{{item.value}}</text>
                </div>
            </div>
        </div>
    </scroller>

    <vtoast @close="closeToast" :img="toastImg" :text="toastText" v-if="openToast"></vtoast>
  </div>
</template>

<script>
import header from '../../public/header'
import toast from '../../public/toast'
export default {
  components:{
    vheader:header,
    vtoast:toast
  },
  data () {
    return {
      header_title:"发布标准需求",
      selectorXLImg: this.$store.state.imageUrl_G+"selector_xl.png",
      orderForm:{
        category:"请选择",
        Number:"",
        time:"",
        address:"",
        areaNUm:"",
        phone:"",
        messageInfo:""
      },
      category_pop_scroller_show:false,
      categorySelectorList:[
        {
          key:"0",
          value:"酒店"
        },
        {
          key:"2",
          value:"KTV"
        },
        {
          key:"3",
          value:"游艇"
        }
      ],
      priceList:[['100','200','500','1000'],['2000','5000']],
      choosedPrice:"",
      otherPrice:"",
      toastImg:{
        url:this.$store.state.imageUrl_G+"ok.png",
        width:'96px',
        height:'74px'
      },
      toastText:"发布成功",
      openToast:false
    }
  },
  methods:{
    popOpen(name){
      this[name]=true;
    },
    hidePop(name){
      this[name]=false;
    },
    chooseCategory(item){
      this.orderForm.category = item.value;
      this.hidePop('category_pop_scroller_show');
    },
    choosePrice(item){
      this.choosedPrice=item;
      this.otherPrice="";
    },
    choosePriceByinput(){
      this.choosedPrice="";
    },
    closeToast(){
      this.openToast = false;
    },
    GetOrder(){
      this.openToast = true;
    }
  }
}
</script>

<style scoped>
  .formWrapperScroller{width: 750px;padding-left:20px;padding-right: 20px;position: fixed;top:90px;bottom: 0px;}
  .formWrapper{padding-top:30px;}
  .tipNode{font-size:24px;color: #777777;margin-bottom: 30px;}
  .formItem{height: 84px;border-bottom-style: solid;border-bottom-color: #e5e5e5;border-bottom-width: 1px;width:710px;flex-direction: row;align-items: center;}
  .labelBox{flex-direction: row;margin-right: 20px;}
  .label{font-size: 24px;color:#333333;}
  .requiredFlag{color:#ff0000;}
  .enterBox{flex:2;}
  .selector{flex:2;}
  .selectorTextBox{flex-direction: row;align-items: center;}
  .selectorText{flex:2;line-height:83px;font-size: 26px;color:#333333;}
  .selectorXL{width: 28px;height: 19px;}
  .inputBox{flex:2;}
  .inputBox_inp{flex:2;line-height: 83px;height:83px;font-size: 26px;color: #333333;}
  .HomeCity_pop_scroller{position: fixed;top:0;bottom:0px;left:0;right:0;background-color:#ffffff;}
  .HomeCity_popClose{height: 90px;padding-left:20px;padding-right: 20px;border-bottom-width:2px;border-bottom-color:#eaeaea;border-bottom-style:solid;}
  .HomeCity_popCloseText{color: #0067c5;font-size: 30px;line-height: 90px;text-align: right;}
  .HomeCity_popCityItem{padding-left:20px;padding-right: 20px;height: 55px;border-bottom-color:#cccccc;border-bottom-width: 1px;border-bottom-style: solid;}
  .HomeCity_popCityItemText{color:#333333;font-size: 24px;text-align: center;line-height: 55px;}
  .HomeCity_popCityItemTextActive{color: #ffd262;}
  .messageInfo{margin-top:30px; }
  .messageInfoText{height:300px;;border-color:#dcdcdc;border-style: solid;border-width:1px;border-radius: 7px;padding-top:15px;padding-left:10px;padding-bottom:15px;padding-right:10px;color:#333333;font-size: 26px;line-height:33px;}
  .price{margin-top:50px;}
  .priceTip{color: #333333;font-size: 24px;margin-bottom: 30px;}
  .priceItemBox{flex-direction: row;justify-content:space-between;margin-bottom: 20px;}
  .priceItem{width: 150px;align-items: center;margin-right: 36px;}
  .priceText{text-align:center;width: 150px;height:60px;border-width: 1px;border-style:solid;border-color:#dcdcdc;border-radius: 8px;align-items: center;justify-content: center;line-height: 58px;color:#ffd262;font-size: 24px;}
  .priceInput{placeholder-color:#cccccc;font-size:24px;;flex:2;height:60px;border-width: 1px;border-style:solid;border-color:#dcdcdc;border-radius: 8px;align-items: center;justify-content: center;line-height: 58px;padding-right: 8px;padding-left:8px;color:#333333;}
  .priceItemActive{border-color: #ffd262;background-color: #ffd262;color:#ffffff;}
  .LoginButton {margin-top: 60px;margin-bottom:50px;width: 710px;height: 80px;text-align: center;font-size: 36px;color: #333333;line-height: 80px;background-image: linear-gradient(to right, #ffd262, #ffe8b0);border-radius: 10px;}
  .marginR0{margin-right:0px;}
  .marginB0{margin-bottom: 0px;}
</style>