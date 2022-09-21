import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // 全局共享
  state,
  // 用于保存修改全局共享的数据的方法
  mutations,
  // mutations: {
  //   changeFullScreen (state, flag) {
  //     state.isFullScreen = flag
  //   }
  // },
  // 用于保存触发mutations中保存的方法的方法
  actions,
  // actions: {
  //   setFullScreen ({ commit }, flag) {
  //     commit('changeFullScreen', flag)
  //   }
  // },
  getters
  // getters: {
  //   isFullScreen (state) {
  //     return state.isFullScreen
  //   }
  // }
})
