import Bus from './Bus'

var BusFn = {
    // 底部导航显示切换
    mainFootShow_Fn(){
        Bus.$emit('mainFootShow')
    },
    // 底部导航显示切换
    mainFootHide_Fn(){
        Bus.$emit('mainFootHide')
    },
    // 底部导航跳转功能
    mainJump_Fn(path){
        Bus.$emit('mainJump',path);
    },
    // 页面跳转+底部主导航配合激活
    // obj={path,mainName,pathName}
    // BusFn.JumpPath_Fn({path:'/main/demand',mainName:'demand',pathName:'demand'});
    JumpPath_Fn(obj){
        Bus.$emit('globalPageJump',obj);
    },
    mainNameJump_Fn(obj){
        Bus.$emit('mainNameJump',obj);
    },
    loadingShow_Fn(){
        Bus.$emit('loadingShow')
    },
    loadingHide_Fn(){
        Bus.$emit('loadingHide')
    }
}

export default BusFn
