/*global Vue*/
// 手机端测试要删除vue的引入，不然没有效果
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
Vue.use(Vuex)
// if (WXEnvironment.platform !== 'Web') {
//     Vue.use(Vuex)
// }
// var stream = weex.requireModule('stream')
var store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store