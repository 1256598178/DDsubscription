<template>
    <div class="input">
        <input class="input-wrap" type="text" name="" autofocus="true" v-model="contents" @keyup.enter="go()">
        <text class="go" @click="go()">发送</text>
    </div>
</template>
<script>
export default {
    data() {
        return {
            contents: ''
        }
    },
    methods: {
        go() {
            console.log(/\S/g.test(this.contents))
            if(!/\S/g.test(this.contents)){
                weex.requireModule("modal").toast({
                  message: "内容为空",
                  duration: 1
                })
                this.contents = ''
            }else{
                this.$emit("goContent",this.contents)
                this.contents = ''
            }
        }
    }
}
</script>
<style scoped>
.input {
    position: fixed;
    bottom: 100px;
    width: 750px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #f5f5f5;
    height: 90px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.input-wrap {
    width: 580px;
    height: 60px;
    background-color: #fff;
    line-height: 60px;
    padding: 10px;
    font-size: 30px;
    color: #808080;
    margin-right: 10px;
}

.go {
    flex: 1;
    height: 60px;
    background-color: #fff;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    color: #808080;
}
</style>