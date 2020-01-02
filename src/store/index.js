import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const getAllFiles = () => {
  const files = require.context('./modules', false, /\.js$/)
  const utils = {}

  // 获取当前文件夹下各模块的属性
  files.keys().forEach(path => {
    const key = path.replace(/(^\.\/|.js$)/g, '')
    const util = files(path).default
    Object.assign(utils, {
      [key]: util
    })
  })
  return utils
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: getAllFiles()
})
