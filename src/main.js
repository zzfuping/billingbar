import Vue from 'vue'
import App from './App'
import $store from "@store"
import { $router, parseRoute } from "@router"
import '@utils/index'

// import "@vant/weapp/common/index.wxss"
import "@css/vant-weapp-theme.wxss"
import "@assets/iconfont/iconfont.wxss"

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = $store
Vue.prototype.$router = $router

Vue.mixin({
  onLoad() {
    const { $mp } = this.$root
    this._route = parseRoute($mp)
  },
  onShow() {
    this.$router.app = this
    this.$router.currentRoute = this._route
  }
})

Object.defineProperty(Vue.prototype, '$route', {
  get() { return this._route }
})

const app = new Vue(App)
app.$mount()
