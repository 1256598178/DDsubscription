<template>
    <div class="scrollimg" @click="stopPropag">
        <slider class="scrollimg-wrapper" interval="4000">
            <div class="scrollimg-wrapper" v-for="(item,index) in imgarr" :key="index" @click="hidenshow">
                <image style="width: 500px;height: 500px" :src="item.ImageUrl" @load="onImageLoad(index)" @click="stopPropag" ref="img"></image>
            </div>
        </slider>
        <div class="close" @click="close"><text class="close-font">x</text></div>
    </div>
</template>

<script>
export default {
    props:{
        imgarr: {
            type: Array
        }
    },
    data(){
        return{
            imgWidth: '200px',
            imgHeight: '200px',
        }
    },
    methods:{
        stopPropag(e){
            e.stopPropagation();
        },
        onImageLoad(index){
            var event = window.event || event
            const view = this.$refs['img'][index]
            console.log(view)
            if(event.success){
                var scales = event.size.naturalWidth/750;
                console.log(scales)
                if (WXEnvironment.platform === 'Web'){
                    view.style.width= event.size.naturalWidth*scales+'px';
                    view.style.height= event.size.naturalHeight*scales+'px';
                }else {
                    animation.transition(view, {
                        styles: {
                            width: event.size.naturalWidth*scales + 'px',
                            height: event.size.naturalHeight*scales + 'px'
                        },
                        duration: 0, //需要设置为0，否则无效
                        timingFunction: 'ease',
                        delay: 0,
                        needLayout: true, //变化后刷新界面
                    })
                }
            }else{
                weex.requireModule("modal").toast({
                    message: '图片尺寸设置失败',
                    duration: 1
                })
            }
        },
        hidenshow(){
            this.$emit("hidelist")
        },
        close(){
            this.hidenshow();
        }
    }
}
</script>

<style scoped>
.close{
    position: fixed;
    top: 0px;
    right: 0px;
    width: 50px;
    height: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.close-font{
    font-size: 30px;
    color: #fff;
    text-align: right;
    font-weight: bold;
}
.scrollimg{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 100px;
    right: 0;
    background-color: rgba(0,0,0,.8);
}
.scrollimg-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>