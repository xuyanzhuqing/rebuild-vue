<template>
  <el-table
    ref="table"
    v-bind="$attrs"
    v-on="$listeners"
    class="el-table--self"
    style="width: 100%">
    <table-column v-for="(val, index) in column" :value="val" :key="index"/>
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  // 核心点
  inheritAttrs: false,
  props: {
    // 开启自定义单选
    radio: {
      required: false,
      type: Boolean,
      default: false
    },
    // 单选表头信息
    radioLabel: {
      required: false,
      type: String,
      default: '请选择'
    },
    enableFilters: {
      required: false,
      type: Boolean,
      default: false
    },
    // 表头字段过滤
    filters: {
      required: false,
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      radioValue: null,
      filterField: []
    }
  },
  created () {
    this.filterField = this.filters.slice(0)
  },
  computed: {
    radioCol () {
      const me = this
      const {rowKey} = me.$attrs
      const col = {
        label: me.radioLabel,
        prop: 'radio',
        render (h, {row, $index}) {
          return (
            <el-radio v-model={me.radioValue} label={row[rowKey] || $index} class="no--label" onChange={(v) => me.$emit('radio-change', v)}></el-radio>
          )
        }
      }
      return col
    },
    filterCol () {
      const me = this
      const {column = []} = me.$attrs

      const cols = []
      column.forEach(v => {
        cols.push({
          prop: v.prop,
          label: v.label
        })
      })

      const col = {
        prop: '_filters',
        width: 40,
        renderHead: () => {
          return (
            <el-popover
              placement="right"
              width="400"
              trigger="hover">
              <el-checkbox-group v-model={me.filterField} onChange={me.filterChange}>
                {
                  cols.map(v => (
                    <el-checkbox label={v.prop}>{v.label}</el-checkbox>
                  ))
                }
              </el-checkbox-group>
              <i slot="reference" class="el-icon-arrow-down el-icon--right"></i>
            </el-popover>
          )
        }
      }
      return col
    },
    column () {
      const {radio, enableFilters, filterCol, radioCol} = this
      const result = []

      if (radio) {
        result.push(radioCol)
      }
      result.push(...this.turnColumn())

      if (enableFilters) {
        result.push(filterCol)
      }
      return result
    }
  },
  methods: {
    turnColumn () {
      let {column = []} = this.$attrs
      return column
    },
    // 清除选中效果
    clearRadioValue () {
      this.radioValue = null
    },
    // 设置默认选中
    setRadioSelect (v) {
      this.radioValue = v
    },
    filterChange (v) {
      console.info(v)
    }
  },
  components: {
    'table-column': {
      props: {
        value: {
          required: true,
          type: Object,
          default: () => ({})
        }
      },
      render: function (h) {
        const attrs = this.value

        if (attrs.type) {
          return (
            <el-table-column {...{attrs}}/>
          )
        }

        return (
          <el-table-column
            {...{attrs}}
            scopedSlots={{
              default: ({row, column, $index}) => {
                return this.value.render ? this.value.render(h, {row, column, $index}) : row[column.property]
              },
              header: ({column, $index}) => {
                return this.value.renderHead ? this.value.renderHead(h, {column, $index}) : column.label
              }
            }}>
          </el-table-column>
        )
      }
    }
  }
}
</script>
