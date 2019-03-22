/*global Vue*/

/* weex initialized here, please do not move this line */
import router from './router'
import Vuex from 'vuex'
import state from '@/store/state.js'
import App from '@/index.vue'
import Loading from '@/components/public/loading.vue'
/* eslint-disable no-new */
Vue.use(Vuex)
Vue.component('v-loading',Loading)
var store = new Vuex.Store({
    state,
})
new Vue(Vue.util.extend({el: '#root', router , store}, App));
router.push('/main/home');