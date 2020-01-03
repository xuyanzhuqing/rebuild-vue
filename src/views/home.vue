<template>
  <div>
    <dntTable :column="columns7" :data="data6"/>
    <el-button type="primary">111</el-button>
  </div>
</template>
<script>
import dntTable from '@/components/biz/dnt-table'
export default {
  components: {dntTable},
  data () {
    return {
      columns7: [
        {
          label: 'Name',
          prop: 'name',
          which: 'input',
          jsx: {
            on: {
              change () {
                debugger
              }
            },
            style: {
              color: 'red'
            },
            attrs: {
              style: 'color: red',
              size: 'mini'
            }
          }
        },
        {
          label: 'Age',
          prop: 'age'
        },
        {
          label: 'Address',
          prop: 'address',
          which: 'select',
          options: [{
            value: 'Beijing',
            label: '北京'
          }, {
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Nanjing',
            label: '南京'
          }, {
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }]
        },
        {
          label: 'Action',
          prop: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return (
              <el-button>jsx</el-button>
            )
          }
        }
      ],
      data6: [
        {
          name: 'John Brown',
          age: 18,
          address: 'Beijing'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'Shenzhen'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Chengdu'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Shanghai'
        }
      ]
    }
  }
}
</script>
