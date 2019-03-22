<template>
    <div class="noMoreBox_G">
        <image class="noMoreBox_G_toBack" :src="nomore" style="width:149px;height:128px;"></image>
        <text class="noMoreBox_G_pageTip" v-if="!changeName">{{content}}</text>
        <text class="noMoreBox_G_pageTip" v-if="changeName">{{name}}</text>
    </div>
</template>
<script>
import mixin from '@/components/public/mixins.js'
export default {
    props: {
        changeName: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        }
    },
    data() {
        return {
            content: '暂无数据哦！',
            nomore: mixin.get_img_path("nomore.png")
        }
    }
}
</script>
<style scoped>
.noMoreBox_G {
    height: 870px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.noMoreBox_G_pageTip {
    margin-top: 27px;
    font-size: 24px;
    color: #777777;
}
</style>