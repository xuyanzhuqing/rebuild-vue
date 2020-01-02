/*
 * @Author: michael
 * @Description: 全局指令
 * @Date: 2019-12-31 15:58:32
 * @LastEditors  : michael
 * @LastEditTime : 2019-12-31 18:20:25
 */
import Vue from 'vue'
const getAllFiles = () => {
  const files = require.context('./', false, /\.js$/)
  const utils = {}

  // 获取当前文件夹下各模块的属性
  files.keys().forEach(path => {
    if (path === './index.js') return
    const key = path.replace(/(^\.\/|.js$)/g, '')
    const util = files(path).default
    Object.assign(utils, {
      [key]: util
    })
  })
  return utils
}

const directives = getAllFiles()
Object.keys(directives).forEach(v => {
  Vue.use(directives[v])
})
