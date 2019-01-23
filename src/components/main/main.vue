<template>
  <div class="wrapper">
    <div class="Foot" v-if="footShow">
        <div class="Foot-list" v-for="(item,index) of nav" :key="index" @click="jump(item.path)">
            <text :class="['iconFont',navIndex == item.path ? 'nav-cn-active' : 'nav-cn']">{{item.iconText}}</text>
            <text :class="['font-text',navIndex == item.path ? 'nav-cn-active' : 'nav-cn']">{{item.title}}</text>
        </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import Bus from '@/components/public/Bus.js'
  export default{
    data(){
      return{
        footShow:true,
        navIndex: 'home',
        nav: [{
                title: '首页',
                iconText: '\ue619', //'&#xe619;'转换成'\ue619'是为了解决在v-for循环中直接显示字符串的bug
                path: 'home'
            }, {
                title: '需求',
                iconText: '\ue61a',
                path: 'demand'
            },
            {
                title: '朋友圈',
                iconText: '\ue618',
                path: 'friends'
            },
            {
                title: '活动',
                iconText: '\ue61d',
                path: 'activity'
            },
            {
                title: '我的',
                iconText: '\ue61b',
                path: 'my'
            }]
      }
    },
    methods: {
      jump(msg) {
          this.$router.push({name:msg});
          this.navIndex = msg;
      },
      jumpMain(mainName){
          this.navIndex = mainName;
      }
    },
    created() {
      var fontModule = weex.requireModule("dom");
      fontModule.addRule('fontFace', {
          'fontFamily': "iconfont",
          'src': 'url('+this.$store.state.iconUrl+')'
      })
    },
    mounted(){
        var _this = this;
        Bus.$on('mainFootShow',function(){
            _this.footShow=true;
        });
        Bus.$on('mainFootHide',function(){
            _this.footShow=false;
        });
        Bus.$on('mainJump',function(path){
            _this.jump(path)
        });
        Bus.$on('mainNameJump',function(mainName){
            _this.jumpMain(mainName)
        });
    }
  }
</script>
<style scoped>
  .iconFont{
    font-family: iconfont;
    font-size:45px;
    font-weight:bold;
  }
  .Foot {
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 750px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top-width: 2px;
    border-top-color: #f0f0f0;
    border-top-style: solid;
    background-color: #ffffff;
}
.Foot-list {
    width: 150px;
    height: 98px;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    padding-top:10px;
    padding-bottom:10px;
}
.font-text{
    font-size:20px;
}
.nav-cn {
    color: #cccccc;
}
.nav-cn-active {
    /* color: #ffde8d; */
    color: #000000;
}
</style>
