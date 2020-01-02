/*
 * @Author: michael
 * @Description: 工具文件
 * @Date: 2019-12-31 15:07:37
 * @LastEditors  : michael
 * @LastEditTime : 2019-12-31 18:16:12
 */
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

export default {
  getAllFiles,
  ...getAllFiles()
}
