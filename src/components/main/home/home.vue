<template>
  <div class="wrapper">
      <!-- 主页顶部 -->
    <div class="homeTop">
        <div class="homeTopCity" @click="showCity_pop">
            <text class="homeTopCityName">{{city}}</text>
            <image :src="homeTopMoreCity_Img" class="homeTopMoreCity_Img" style="width:21px;height:13px"></image>
        </div>
        <div class="homeTopSearch">
            <image :src="homeTopSearch_Img" class="homeTopSearch_Img" style="width:33px;height:33px"></image>
            <input type="text" v-model="homeTopSearchInp" class='homeTopSearchInp' placeholder="搜索经商、经理人" />
        </div>
        <div class="homeTopMy" @click="toMy">
            <image :src="homeTopMy_Img" class="homeTopMy_Img" style="width:40px;height:39px"></image>
        </div>
    </div>
    <!-- 主页中间主体 -->
    <list class="homeMain">
        <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
            <text class="refresh">下拉刷新...</text>
        </refresh>
        <!-- banner -->
        <cell>
            <slider class="banner-wrapper" auto-play="true" interval="4000">
                <div class="banner-list" v-for="(banner,index) in bannerList" :key="index">
                    <image class="_banner" :src="banner.url" style="width:750px;height:330px;;"></image>
                </div>
                <indicator class="indicator"></indicator>
            </slider>
        </cell>
        <!-- notice -->
        <cell>
            <div class="homeNotice">
                <image class="noticeImg" :src="noticeImg" style="width:35px;height:30px;"></image>
                <text class="noticeText_info">{{noticeText_info[noticeText_info_index].text}}</text>
                <image class="noticeText_infoBtn" :src="noticeText_infoBtn" style="width:20px;height:29px;"></image>
            </div>
        </cell>
        <!-- 8元素模块 -->
        <cell>
            <div class="eightNavBox">
                <div class="eightItemLine" v-for="(line,index) in eightNavList_split" :key="index">
                    <div :class="['eightItem',((index+1) % 4 == 0)?'marginR0':'']" :key="index" v-for="(item,index) in line" @click="jumptoDemand">
                        <image class="eightItemImg" :src="item.img"></image>
                        <text class="eightItemTitle">{{item.title}}</text>
                    </div>
                </div>
            </div>
        </cell>
        <cell>
            <div class="eightBox" v-for="(val,key,index) in eightItemsList" :key="index">
                <div class="eightBoxTitle">
                    <text class="eightBoxTitleText">{{key}}</text>
                    <image :src="eightBoxTitleImg" class="eightBoxTitleImg"></image>
                </div>
                <div class="eightBoxImgs">
                    <scroller scroll-direction="horizontal" class="eightBoxImgsScroller">
                        <div :class="['eightBoxImgItem',index==val.length-1?'marginR0':'']" v-for="(item,index) in val" :key="index">
                            <image class="eightBoxImgItem_image" :src="item.img"></image>
                            <text class="eightBoxImgItem_t1">{{ item.title }}</text>
                            <text class="eightBoxImgItem_t2">{{ item.price }}</text>
                        </div>
                    </scroller>
                </div>
            </div>
        </cell>
        <cell>
            <div class="eightBox">
                <div class="eightBoxTitle">
                    <text class="eightBoxTitleText">人气经理人</text>
                    <image :src="eightBoxTitleImg" class="eightBoxTitleImg"></image>
                </div>
                <div class="eightBoxImgs">
                    <scroller scroll-direction="horizontal" class="eightBoxImgsScroller">
                        <div :class="['eightBoxImgItem',index==homeManger.length-1?'marginR0':'']" v-for="(item,index) in homeManger" :key="index">
                            <image class="eightBoxImgItem_image2" :src="item.img"></image>
                            <text class="eightBoxImgItem_t3">{{ item.name }}</text>
                            <text class="eightBoxImgItem_hot iconFont">&#xe7a4; {{ item.hot }}</text>
                        </div>
                    </scroller>
                </div>
            </div>
        </cell>
        <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
            <text class="loading">加载更多...</text>
        </loading>
    </list>
    <!-- 城市选择弹出 -->
    <scroller class="HomeCity_pop_scroller" v-if="HomeCity_pop_scroller_show">
        <div class="HomeCity_pop" @click="hideCity_pop">
            <div class="HomeCity_popClose">
                <text class="HomeCity_popCloseText" @click="hideCity_pop">取消</text>
            </div>
            <div class="HomeCity_popCityList">
                <div class="HomeCity_popCityItem" v-for="(item,index) in cityList" :key="index" @click="chooseCity(item)">
                    <text :class="['HomeCity_popCityItemText',(item.name==city)?'HomeCity_popCityItemTextActive':'']">{{item.name}}</text>
                </div>
            </div>
        </div>
    </scroller>
  </div>
</template>

<script>
import BusFn from '@/components/public/BusFn.js'
import dataMock from '@/mock/dataMock'
export default {
    data () {
        return {
            homeTopMoreCity_Img:this.$store.state.imageUrl_G+"morecity.png",
            homeTopSearch_Img:this.$store.state.imageUrl_G+"homesearch.png",
            homeTopMy_Img:this.$store.state.imageUrl_G+"hometopMy.png",
            noticeImg:this.$store.state.imageUrl_G+"home_notice.png",
            noticeText_infoBtn:this.$store.state.imageUrl_G+"home_noticeInfo.png",
            eightBoxTitleImg:this.$store.state.imageUrl_G+"home_rightTitle.png",
            homeTopSearchInp:"",
            HomeCity_pop_scroller_show:false,
            city:"上海",
            refreshing: false,//下拉刷新
            loadinging: false,//上拉加载
            bannerList:[
                {
                    url:this.$store.state.imageUrl_G+"home_banner1.png"
                },
                {
                    url:this.$store.state.imageUrl_G+"home_banner1.png"
                }
            ],
            noticeText_info:[
                {
                    text:"热烈庆祝Coming Night APP正式上线！",
                    infoid:"456"
                },
                {
                    text:"骗子套路深！反诈中心提醒：春运购票谨防六种骗局",
                    infoid:"789"
                },
                {
                    text:"马云：我很嫉妒公司一些年轻人,但没办法老板还是我",
                    infoid:"123"
                },
            ],
            noticeText_info_index:0,
            eightNavList:[
                {
                    img:this.$store.state.imageUrl_G+"home_eight1.png",
                    title:"KTV",
                    path:"ktv"
                },
                {
                    img:this.$store.state.imageUrl_G+"home_eight2.png",
                    title:"酒吧",
                    path:"bar"
                },
                {
                    img:this.$store.state.imageUrl_G+"home_eight3.png",
                    title:"游艇",
                    path:"yacht"
                },
                {
                    img:this.$store.state.imageUrl_G+"home_eight4.png",
                    title:"别墅",
                    path:"house"
                },
                {
                    img:this.$store.state.imageUrl_G+"home_eight5.png",
                    title:"养生",
                    path:"health"
                },
                {
                    img:this.$store.state.imageUrl_G+"home_eight6.png",
                    title:"名酒",
                    path:"wine"
                },
                {
                    img:this.$store.state.imageUrl_G+"home_eight7.png",
                    title:"团购",
                    path:"groupBuy"
                },
                {
                    img:this.$store.state.imageUrl_G+"home_eight8.png",
                    title:"活动",
                    path:"activity"
                },
            ],
            eightItemsList:{
                "KTV":[
                        {
                          img:this.$store.state.imageUrl_G+"home_img1.png",
                          title:"王子公主奇遇记",
                          price:"¥350起",
                          path:"1234"
                        },
                        {
                          img:this.$store.state.imageUrl_G+"home_img2.png",
                          title:"MUSEK",
                          price:"¥230起",
                          path:"1234"
                        },
                        {
                          img:this.$store.state.imageUrl_G+"home_img1.png",
                          title:"王子公主奇遇记",
                          price:"¥350起",
                          path:"1234"
                        },
                        {
                          img:this.$store.state.imageUrl_G+"home_img2.png",
                          title:"MUSEK",
                          price:"¥230起",
                          path:"1234"
                        }
                        
                    ],
                "酒吧":[
                        {
                          img:this.$store.state.imageUrl_G+"home_img3.png",
                          title:"王子公主奇遇记",
                          price:"¥350起",
                          path:"1234"
                        },
                        {
                          img:this.$store.state.imageUrl_G+"home_img4.png",
                          title:"MUSEK",
                          price:"¥230起",
                          path:"1234"
                        }
                    ],
                "游艇":[
                        {
                          img:this.$store.state.imageUrl_G+"home_img5.png",
                          title:"王子公主奇遇记",
                          price:"¥350起",
                          path:"1234"
                        },
                        {
                          img:this.$store.state.imageUrl_G+"home_img6.png",
                          title:"MUSEK",
                          price:"¥230起",
                          path:"1234"
                        }
                    ],
                "别墅":[
                        {
                          img:this.$store.state.imageUrl_G+"home_img7.png",
                          title:"王子公主奇遇记",
                          price:"¥350起",
                          path:"1234"
                        },
                        {
                          img:this.$store.state.imageUrl_G+"home_img8.png",
                          title:"MUSEK",
                          price:"¥230起",
                          path:"1234"
                        }
                    ]
            },
            homeManger:[
                {
                    img:this.$store.state.imageUrl_G+"home_jlr1.png",
                    name:"钱某某",
                    hot:760,
                    path:675
                },
                {
                    img:this.$store.state.imageUrl_G+"home_jlr2.png",
                    name:"赵某某",
                    hot:760,
                    path:676
                },
                {
                    img:this.$store.state.imageUrl_G+"home_jlr2.png",
                    name:"赵某某",
                    hot:760,
                    path:676
                },
            ]
        }
    },
    computed:{
        cityList:function(){
            return dataMock.cityList
        },
        eightNavList_split:function(){
            var temArry = [[],[]];
            this.eightNavList.forEach(function(item,idx){
                if(idx<4){
                    temArry[0].push(item);
                }else{
                    temArry[1].push(item);
                }
            })
            return temArry;
        }
        
    },
    created() {
      var fontModule = weex.requireModule("dom");
      fontModule.addRule('fontFace', {
          'fontFamily': "iconfont",
          'src': "url('//at.alicdn.com/t/font_1005984_w2hc8tsdv5g.ttf')"
      })
    },
    methods:{
        showCity_pop(){
            this.HomeCity_pop_scroller_show=true;
            BusFn.mainFootHide_Fn();
        },
        hideCity_pop(){
            this.HomeCity_pop_scroller_show=false;
            BusFn.mainFootShow_Fn();
        },
        chooseCity(city){
            this.HomeCity_pop_scroller_show=false;
            BusFn.mainFootShow_Fn();
            this.city=city.name;
            // todo重新刷新数据源。。。
        },
        toMy(){
            BusFn.mainJump_Fn('my');
        },
        onrefresh (){
            var _this = this;
            if(this.refreshing) return;
			this.refreshing = true;
			setTimeout(function(){
				_this.refreshing = false;
			},2000)
		},
		onloading (){
            var _this = this;
            if(this.loadinging) return;
			this.loadinging = true;
			setTimeout(function(){
				_this.loadinging = false;
			},2000)
        },
        jumptoDemand(){
            BusFn.JumpPath_Fn({path:'/main/demand',mainName:'demand',pathName:'demand'});
        }
    },
    mounted(){
        var _this = this;
        // notice循环
        var noticeNum = _this.noticeText_info.length;
        var noticeTime = setInterval(function(){
            if(_this.noticeText_info_index < noticeNum-1){
                _this.noticeText_info_index += 1;
            }else{
                _this.noticeText_info_index = 0;
            }
        },6000);
    }
}
</script>

<style scoped>
    .iconFont{font-family: iconfont;}
    .homeTop{height:88px;width:750px;position:fixed;flex-direction: row;padding-left:20px;padding-right:20px;justify-content: space-between;align-items: center;padding-top:15px;padding-bottom:15px;}
    .homeTopCity{height: 58px;flex:1;flex-direction: row;align-items: center;width:128px;}
    .homeTopCityName{font-size: 24px;margin-right: 8px;}
    .homeTopSearch{border-radius: 8px;background-color: #f0f0f0;flex-direction: row;align-items: center;justify-content: space-between;width:510px;height: 58px;padding-left:20px;padding-right: 20px; }
    .homeTopSearchInp{flex:2;background-color: transparent;font-size: 28px;color:#333333;margin-left:10px;line-height: 58px;}
    .homeTopMy{height: 58px;padding-left:30px;align-items: center;flex-direction: row;}
    .homeMain{position:fixed;top:88px;bottom:100px;left:0;right:0;}
    .HomeCity_pop_scroller{position: fixed;top:0;bottom:0px;left:0;right:0;background-color:#ffffff;}
    .HomeCity_popClose{height: 90px;padding-left:20px;padding-right: 20px;border-bottom-width:2px;border-bottom-color:#eaeaea;border-bottom-style:solid;}
    .HomeCity_popCloseText{color: #0067c5;font-size: 30px;line-height: 90px;text-align: right;}
    .HomeCity_popCityItem{padding-left:20px;padding-right: 20px;height: 55px;border-bottom-color:#cccccc;border-bottom-width: 1px;border-bottom-style: solid;}
    .HomeCity_popCityItemText{color:#333333;font-size: 24px;text-align: center;line-height: 55px;}
    .HomeCity_popCityItemTextActive{color: #ffd262;}
    .refresh{text-align: center;}
    .loading{text-align: center;}
    .banner-wrapper{height: 330px;width:750px;}
    .indicator{item-color:#ffffff;item-selected-color:#ffd262;item-size:20px;width:750px;height: 20px;position: absolute;left:0;bottom:20px;}
    .homeNotice{flex-direction: row;align-items: center;justify-content: space-between;padding-left:20px;padding-right:20px;height: 82px;border-bottom-color: #f0f0f0;border-bottom-width: 2px;border-bottom-style: solid;}
    .noticeText_info{flex:2;lines:1;padding-left:18px;padding-right:18px;font-size: 30px;color:#333333;justify-content: center;}
    .eightItemLine{margin-top: 20px;flex-direction: row;justify-content: space-between;align-items: center;}
    .eightItem{width:140px;margin-right: 50px;}
    .eightItemTitle{text-align: center;font-size: 26px;color:#333333;margin-top: 15px;}
    .eightItemImg{width:140px;height:140px;border-radius:70px;border-top-width:5px;border-top-color:#f3eee7;border-top-style: solid;border-bottom-width:5px;border-bottom-color:#f3eee7;border-bottom-style: solid;border-left-width:5px;border-left-color:#f3eee7;border-left-style: solid;border-right-width:5px;border-right-color:#f3eee7;border-right-style: solid;}
    .eightNavBox{padding-left:20px;padding-right:20px;padding-bottom: 40px;}
    .eightBox{margin-top:40px;padding-bottom: 15px;}
    .eightBoxTitle{font-size:26px;color:#333333;margin-top: 15px;text-align: center;}
    .eightBoxTitleImg{width:433px;height:8px;}
    .eightBoxTitle{align-items:center;}
    .eightBox{padding-left:20px;padding-right:20px;}
    .eightBoxTitleText{font-size: 48px;color: #333333;margin-bottom:15px;}
    .eightBoxImgs{margin-top:35px;}
    .eightBoxImgsScroller{width: 710px;flex-direction: row;}
    .eightBoxImgItem{margin-right:20px;}
    .eightBoxImgItem_image{width:345px;height:200px;}
    .eightBoxImgItem_t1{margin-top:15px;margin-bottom: 15px;font-size: 30px;color: #333333;}
    .eightBoxImgItem_t2{color: #f26100;font-size: 30px;}
    .eightBoxImgItem_image2{width: 345px;height: 376px;border-style: solid;border-width: 2px;border-color: #ffd262;margin-bottom: 15px;}
    .eightBoxImgItem_hot{position: absolute;right:0;bottom: 6px;color:#f24d62;font-size: 24px;}
    .eightBoxImgItem_t3{font-size: 30px;color: #333333;}
    .marginR0{margin-right: 0px;}
</style>