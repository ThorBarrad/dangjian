import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExpand, faPause, faPlay, faStop, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
library.add(
  faPlay,
  faPause,
  faStop,
  faVolumeUp,
  faVolumeMute,
  faExpand
);

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import hls from 'videojs-contrib-hls'
Vue.use(VideoPlayer)
Vue.use(hls)


import waterfall from 'vue-waterfall2'

Vue.use(waterfall)
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://39.104.80.226:6262/'
// 通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = "Bearer " + window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
