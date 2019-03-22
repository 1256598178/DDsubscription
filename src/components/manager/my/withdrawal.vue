<template>
  <div class="act">
    <div class="headerBox_G">
        <text class="headerBox_G_pageTip">{{ header_title }}</text>
        <div class="back_box" @click="toBack_G">
          <image :src="$store.state.get_img_path('toback.png')" style="width:31px;height:44px;"></image>
        </div>
      <text class="detail" @click="toWithdrawalRecord">明细</text>
    </div>
    <list>
      <cell>
        <text class="act-t1">选择收款账户</text>
        <div class="model-pay-list" @click="selectPay('alipay')" ref="alipay">
              <div class="model-pay-list-left"><image class="pay-image" :src="model.payment.alipayImage"></image><text class="pay-title">{{model.payment.alipay}}</text></div>
              <image class="pay-dui" :src="model.payment.alipayselect"></image>
            </div>
            <div class="model-pay-list" @click="selectPay('bank')" ref="wechat">
              <div class="model-pay-list-left"><image class="pay-image" :src="model.payment.wechatImage"></image><text class="pay-title">{{model.payment.wechat}}</text></div>
              <image class="pay-dui" :src="model.payment.wechatselect"></image>
            </div>
            <div class="widthdraw">
              <text class="act-t3">提现金额</text>
          <div class="widthdraw-input-box">
            <image class="pay-doller" :src="doller"></image>
            <input class="widthdraw-input" v-model="paymoney" type="number" name="">
          </div>
            </div>
        <text class="act-t4">可用余额 {{money}}</text>
        <text class="person-btn" @click="pay">确&nbsp;&nbsp;&nbsp;定</text>
      </cell>
    </list>
    <div class="model-box" v-if="model.boolSign">
      <div class="model-wrapper">
        <image class="model-close" :src="cuo" @click="close"></image>
        <text class="model-title">{{model.title}}</text>
        <text class="model-subtitle">提现金额{{paymoney}}</text>
        <div class="model-bottom-btn-wrapper">
          <text class="pswBox" v-for="(item,index) in pswlist">{{item}}</text>
          <input class="psw-input" ref="psw" @input="psw" maxlength="6" autofocus="true" v-model="paypsw" type="number" name="">
        </div>
        <div class="wjPsw-box">
          <text class="wjPsw-btn" @click="toPayPsw">忘记支付密码</text>
        </div>
      </div>
    </div>
    <v-loading v-if="temBool.loading"></v-loading>
  </div>
</template>

<script>
import header from '../../public/header'
import BusFn from '@/components/public/BusFn.js'
import Util from '@/components/public/utils.js'
import Storage from '@/components/public/storage.js'
export default {
  data() {
    return {
    temBool: {
        loading: false,
    },
    header_title:'余额提现',
    doller:this.$store.state.get_img_path("doller.png"),
    cuo: this.$store.state.get_img_path("cuo.png"),
    USERID: 'UserId',
    TOKEN: 'Token',
    money:'',
    paymoney:'',
    paypsw:'',
    accountType: 1,
    pswlist:['','','','','',''],
    bool:false,
      model:{
        boolSign: false,
        payInfo: false,
        title: '输入支付密码',
        payment:{
          alipay: '支付宝',
          alipayImage: this.$store.state.get_img_path("d1.png"),
          alipayselect: this.$store.state.get_img_path("dui.png"),
          wechat: '银行卡',
          wechatImage: this.$store.state.get_img_path("d2.png"),
          wechatselect: this.$store.state.get_img_path("quans.png"),
          money: '500',
          moneyImaeg: this.$store.state.get_img_path("d3.png"),
          select: this.$store.state.get_img_path("dui.png"),
          unselect: this.$store.state.get_img_path("quans.png")
        }
      }
    }
  },
  methods: {
  toBack_G(){
      this.$router.back(-1);
  },
  toPayPsw(){
    this.$router.push({
      name:'managerpayPsw',
    })
  },
    selectPay(msg){
      if(msg == 'alipay'){
        this.model.payment.wechatselect = this.model.payment.unselect
        this.model.payment.alipayselect = this.model.payment.select
      this.accountType = 1
      }else if(msg == 'bank'){
        this.model.payment.alipayselect = this.model.payment.unselect
        this.model.payment.wechatselect = this.model.payment.select
      this.accountType = 2
      }
  },
  psw(){
    var self = this
    var s1 = this.paypsw;
    var ss1 = s1.split('');
    console.log(ss1.length)
    for(var i=0;i<ss1.length;i++){
      this.pswlist[i] = '•'
    }
    for(var i=0;i<6-ss1.length;i++){
      this.pswlist[ss1.length+i] = ''
    }
    if(ss1.length==6){
      self.temBool.loading = true
      Util.WeexAjax({
        url: 'api/cashwithdrawal/addcashwithdrawal',
        method: 'POST',
        type: 'JSON',
        token: self.TOKEN,
        body:{
          "UserId": self.USERID,
          "PayPassWord": self.paypsw,
          "Money": self.paymoney,
          "AccountType": self.accountType,
        },
        callback: function(ret) {
          var rets = ret;
          if(ret.Status == 1){
            console.log(rets)
            self.model.boolSign = false
            Util.modalPanel('提现成功',1)
            self.temBool.loading = false
            self.$router.push({
              name:'managerResultsWithdrawals',
              params: {
                  CashId: ret.obj,
              }
            })
          }else{
            Util.modalPanel(ret.Message,1)
            self.model.boolSign = false
            self.temBool.loading = false
            self.paypsw = ''
            self.pswlist = ['','','','','','']
          }
        }
      })
    }
  },
  close() {
      this.model.boolSign = false;
  },
  inputshow(){
    this.bool = true
  },
  inputhide(){
    this.bool = false
  },
  pay(){
    var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if(isNum.test(this.paymoney) && this.paymoney !=0.0 && this.paymoney != 0.00){
      this.model.boolSign = true
    }else{
      Util.modalPanel('金额错误，请重新输入',1)
    }
  },
  toWithdrawalRecord(){
    this.$router.push({name:'managerWithdrawalRecord'})
  }
  },
  created(){
    var self= this
    BusFn.mainFootHide_Fn();
    /* weex.requireModule('globalEvent').addEventListener('androidback',function(e){
      self.$router.back(-1);
    }) */
    weex.requireModule('storage').getItem(this.USERID,event => {
      self.USERID = event.data
      console.log(event.data);
      weex.requireModule('storage').getItem(this.TOKEN,event => {
        self.TOKEN = event.data
        Util.WeexAjax({
            url: 'api/account/getmybalance?UserId='+self.USERID,
            method: 'GET',
            type: 'JSON',
            token: self.TOKEN,
            callback: function(ret) {
              var rets = ret;
              if(ret.Status == 1){
                console.log(rets)
              //self.DmandList=rets.obj.Items
              self.money = rets.obj.BalanceNum
              }
            }
        })
      })
    });
  },
  components: {
    vheader:header
  },
}
</script>

<style lang="stylus" scoped>
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
.detail{
  position:absolute;
  right:20px;
  top:0;
  width: 70px;
  height: 90px;
  font-size: 32px;
  color: #333333;
  line-height: 88px;
  text-align: right;
}
.act{position: fixed; top:0; left: 0; right: 0; bottom: 0;}
.act-t1{padding-right: 20px;line-height: 85px;font-size: 24px;color: #777777; width: 710px; margin-left: 20px; margin-right: 20px;}
.act-t3{font-size: 26px; color: #333333;}
.act-t4{margin-top: 15px; margin-left: 20px; margin-right: 20px; font-size: 24px; color: #777777; }
.model-pay-list{
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #f4f4f4;
}
.model-pay-list-left{flex-direction: row;justify-content: center;align-items: center;}
.pay-image{width: 33px;height: 33px;margin-right: 32px;}
.pay-dui{width: 30px;height: 30px;}
.pay-title{font-size: 24px;color: #333333;}
.widthdraw{margin-top: 40px;padding-left: 20px;padding-right: 20px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #f4f4f4;}
.widthdraw-input-box{margin-top: 12px;margin-bottom: 10px;flex-direction: row;justify-content: flex-start;align-items: center;}
.pay-doller{margin-left: 20px;width: 16px; height: 23px;}
.widthdraw-input{flex: 1; margin-left: 15px;height: 63px;}
.person-btn{width: 710px; margin-left: 20px; margin-top: 150px; height: 80px; line-height: 80px; text-align: center; font-size: 36px; color: #333333; border-radius: 8.8px; background-color: #ffd46b;}
.model-box {
    position: fixed;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4)
  }

  .model-wrapper {
    width: 710px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 5px;
    padding-top: 35px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 20px;
    border-radius: 15px;
  }

  .model-close {
    position: absolute;
    width: 37px;
    height: 37px;
    top: 20px;
    right: 20px;
  }

  .model-title {
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 36px;
    color: #000000;
    line-height: 40px;
    text-align: center;
  }

  .model-subtitle {
    font-size: 24px;
    color: #333333;
    text-align: center;
    margin-left: 30px;
    margin-right: 30px;
  }

  .model-bottom-btn-wrapper {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 43px;
  }

  .model-bottom-btn {
    width: 220px;
    height: 88px;
    line-height: 88px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    border-radius: 15px;
  }

  .model-bottom-btn-left {
    background-color: #ffd700;
  }

  .model-bottom-btn-right {
    background-color: #dadada;
  }

  .model-bottom-btn-pay {
    font-size: 36px;
    color: #333;
  }

  .model-pay-wrapper {
    margin-top: 20px;
  }

  .model-pay-list {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #f4f4f4;
  }

  .model-pay-list-left {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
.pswBox{
  width: 110px;
  height: 110px;
  font-size: 70px;
  line-height: 108px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: #cccccc;
}
.wjPsw-box{
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: flex-end;
}
.wjPsw-btn{
  width: auto;
  font-size: 24px;
  color: #ffd262;
  margin-top: 10px;
  margin-bottom: 20px;
}
.psw-input{
  width: 690px;
  height: 110px;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
</style>