import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
// 初始化 Vuex 并注册此模块
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user: User
  }
})
export default store
