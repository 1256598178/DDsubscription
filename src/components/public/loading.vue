<template>
    <div :class="['loading-wrapper',openCenter == false ? 'loading-wrapper-false' : '']">
        <div class="loading-box">
            <image class="loading" :src="$store.state.get_img_path('loading.gif')" />
            <text class="tip">页面正在加载中....</text>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        openCenter: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            version: '0.0.0'
        }
    },
    created() {
        // const _self = this
        // //本来是不需要传递一个 参数给 getVersionName 方法的，由于ios有个蛋疼的问题，如果不传参数就拿不到数据，所以习惯性的给一个空过去
        // weex.requireModule('module').showLoading('页面加载中请稍后');
    }
}
</script>
<style scoped>
.loading-wrapper {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    justify-content: center;
    align-items: center;
}
.loading-wrapper-false{
    background-color: #fff;
}

.loading-box {
    width: 400px;
    height: 130px;
    padding: 20px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.loading {
    width: 50px;
    height: 50px;
}

.tip {
    text-align: center;
    color: #fff;
}
</style>