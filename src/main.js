import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import store from "./store";
import "./js/cookie";
import './config/rem';

Vue.prototype.$store = store;

let Base64 = require('js-base64').Base64
Vue.prototype.$Base64 = Base64;
// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import animated from 'animate.css'
Vue.use(animated)



import { Button, Search, Loading, Empty } from 'vant';
Vue.use(Button).use(Search).use(Loading).use(Empty)

// import 'font-awesome/css/font-awesome.css';
import '../src/style/font/iconfont'

import Tinymce from 'tinymce'
Vue.prototype.$tinymce = Tinymce;

import * as $filters from './utils/filters'
Object.keys($filters).forEach(key => {
    Vue.filter(key, $filters[key])
})

import * as api from "./utils/api";
Vue.prototype.$api = api;
import * as fun from "./utils/fun";
Vue.prototype.$fun = fun;

import { get, post } from "./utils/index";
Vue.prototype.$axios = axios;
Vue.prototype.$http = {
    get,
    post
};


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");