<!--
 * @Author: michael
 * @Description: 实现自定义类型的表格控件
 * @Date: 2020-01-03 14:03:29
 * @LastEditors  : michael
 * @LastEditTime : 2020-01-03 16:49:28
 -->

<script>
import elTable from '@/components/el-table.vue'
export default {
  name: 'dnt-table',
  extends: elTable,
  methods: {
    turnColumn () {
      const {column = []} = this.$attrs
      column.forEach(v => {
        if (v.which) {
          const fn = this.renderWhat(v.which)
          v.render = this[fn](v)
        }
      })
      return column
    },
    renderWhat (which) {
      return 'render' + which.replace(/\w/, v => v.toLocaleUpperCase())
    },
    // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
    renderInput ({jsx = {}}) {
      return (h, {row, column, $index}) => (
        <el-input v-model={row[column.property]} {...jsx}></el-input>
      )
    },
    renderSelect (col) {
      const options = JSON.parse(JSON.stringify(col.options))
      return (h, {row, column, $index}) => (
        <el-select v-model={row[column.property]} placeholder="请选择">
          {
            options.map(props => (
              <el-option {...{props}}></el-option>
            ))
          }
        </el-select>
      )
    }
  }
}
</script>
<style lang="scss">

</style>
