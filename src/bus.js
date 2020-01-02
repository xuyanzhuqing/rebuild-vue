/*
 * @Author: michael
 * @Description: 事件总线 用法参见https://www.jianshu.com/p/e95ee2d71bad
 * @Date: 2020-01-02 13:49:11
 * @LastEditors  : michael
 * @LastEditTime : 2020-01-02 14:09:15
 */
const install = (Vue) => {
  const Bus = new Vue({
    methods: {
      on (event, callback) {
        this.$on(event, callback)
      },
      emit (event, ...args) {
        this.$emit(event, ...args)
      },
      off (event, callback) {
        this.$off(event, callback)
      }
    }
  })

  Vue.prototype.$bus = Bus
}

export default install
