import Vue from 'vue'
import home from '@/views/home.vue'

describe('home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('span').textContent)
      .toEqual('111')
  })
})