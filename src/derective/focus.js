/*
 * @Author: michael
 * @Description: 自动focus
 * @Date: 2019-12-31 17:58:11
 * @LastEditors  : michael
 * @LastEditTime : 2019-12-31 18:23:36
 */

import Vue from 'vue'

export default Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    el.querySelector('input').focus()
  }
})
