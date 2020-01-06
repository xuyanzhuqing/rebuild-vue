<template>
  <el-scrollbar
    ref="scroll"
    :style="{height: height + 'px'}"
    class="scroll-list"
    @mouseenter.native="stopScroll"
    @mouseleave.native="startScroll">
    <ul>
      <li class="scroll-item" v-for="(val, index) in value" :key="index">
        <slot :value="val">{{val}}</slot>
      </li>
    </ul>
  </el-scrollbar>
</template>
<script>
export default {
  name: 'scroll-list',
  props: {
    value: {
      required: false,
      type: Array,
      default: () => (Object.keys(new Array(100).fill('')))
    },
    height: {
      type: Number,
      default: 400
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      top: 0,
      timer: null
    }
  },
  mounted () {
    this.startScroll()
  },
  methods: {
    startScroll () {
      this.stopScroll()
      this.top = this.getPosition()
      this.timer = window.setInterval(() => {
        this.top += 1
        this.loop && this.loopLayout()
        this.scrollTo(this.top)
      }, 50)
    },
    stopScroll () {
      window.clearInterval(this.timer)
    },
    // 首尾循环列表
    loopLayout () {
      if (this.top % 40 === 0) {
        const last = this.value.pop()
        this.value.unshift(last)
      }
    },
    getPosition () {
      const scrollTop = this.$refs.scroll.wrap.scrollTop
      return Math.round(scrollTop)
    },
    scrollTo (top) {
      const bar = this.$refs.scroll
      const el = bar.wrap

      // 滚动到底部时
      if (top >= el.scrollHeight - this.height) {
        this.top = top = 0
        console.info('to the end')
        el.scroll({
          top
        })
      } else {
        el.scroll({
          top,
          behavior: 'smooth'
        })
      }
      bar.update()
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
    .scroll-item {
      height: 20px;
      padding: 5px;
      color: #000;
      background: purple;
      text-align: center;
      &:hover {
        background: black;
        color: #fff;
      }
    }
  }
</style>
