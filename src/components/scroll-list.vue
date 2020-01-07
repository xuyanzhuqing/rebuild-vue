<template>
  <el-scrollbar
    ref="scroll"
    :style="{height: height + 'px'}"
    class="scroll-list"
    @mouseenter.native="stopScroll"
    @mouseleave.native="startScroll">
    <slot v-for="(val, index) in value" :value="val" :index="index">
      <div class="scroll-item" :key="index" style="height:40px">
        {{val}}
      </div>
    </slot>
  </el-scrollbar>
</template>

<!--
  用法:
  <scroll-list v-model="list">
    <template slot-scoped="{value, index}"">
      <div>{{value}}</div>
    </template>
  </scroll-list>
-->

<script>
export default {
  name: 'scroll-list',
  props: {
    // 数据源
    value: {
      required: false,
      type: Array,
      default: () => (Object.keys(new Array(112).fill('')))
    },
    // 滚动取域高度
    height: {
      type: Number,
      default: 400
    },
    // 首尾相接滚动
    loop: {
      type: Boolean,
      default: false
    },
    // 步长 [1, 2]
    step: {
      type: Number,
      default: 1
    },
    // 刷新时间 单位ms（间隔时间大于50ms画面更流畅）
    interval: {
      type: Number,
      validator (val) {
        return val >= 50
      },
      default: 50
    }
  },
  data () {
    return {
      top: 0,
      timer: null
    }
  },
  computed: {
    hasScrollbar () {
      const bar = this.$refs.scroll
      const el = bar.wrap
      return bar.$el.scrollHeight < el.firstChild.clientHeight
    }
  },
  watch: {
    value (n, o) {
      // 第一次赋值
      if (o.length === 0) {
        this.startScroll()
      }
    }
  },
  mounted () {
    this.startScroll()
  },
  methods: {
    // 开始滚动
    startScroll () {
      this.stopScroll()
      if (this.value.length && this.hasScrollbar) {
        this.scroll()
      }
    },
    // 停止滚动
    stopScroll () {
      window.clearInterval(this.timer)
    },
    // 滚动
    scroll () {
      this.top = this.getPosition()
      this.timer = window.setInterval(() => {
        this.top += this.step
        this.scrollTo(this.top)
      }, this.interval)
    },
    // 首尾循环列表
    loopLayout () {
      const last = this.value.shift()
      this.value.push(last)
    },
    // 获取当前的位置
    getPosition () {
      const scrollTop = this.$refs.scroll.wrap.scrollTop
      return Math.round(scrollTop)
    },
    scrollTo (top) {
      const bar = this.$refs.scroll
      const el = bar.wrap
      // 滚动到底部时
      if (top >= el.scrollHeight - this.height) {
        // 循环滚动
        if (this.loop) {
          const lastItem = el.firstChild.lastChild
          const height = parseInt(this.getStyle(lastItem, 'height'))

          this.top = top = top - height
          this.loopLayout()
        } else {
          this.top = top = 0
        }

        this.nativeScroll(el, {top})
      } else {
        this.nativeScroll(el, {
          top,
          behavior: 'smooth'
        })
      }
      bar.update()
    },
    nativeScroll (el, params) {
      // 减容chrome、ff
      if (el.scroll) {
        el.scroll(params)
      } else {
        // 减容ie
        el.scrollTop = params.top
      }
    },
    getStyle (element, attr) {
      if (element.currentStyle) {
        return element.currentStyle[attr]
      } else {
        return getComputedStyle(element, false)[attr]
      }
    }
  },
  destroyed () {
    this.stopScroll()
  }
}
</script>
<style lang="scss">

  .scroll-list {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
