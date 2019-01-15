import Vue from 'vue'
import weex from 'weex-vue-render'
/*global Vue*/

weex.init(Vue)
/* weex initialized here, please do not move this line */
import router from './router'
import store from '@/store/index.js'
import App from '@/index.vue'
import BusFn from '@/components/public/BusFn.js'
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router , store}, App));
router.push('/main/demand');

