<!--
 * @Author: michael
 * @Date: 2019-12-31 10:58:05
 * @LastEditors  : michael
 * @LastEditTime : 2020-01-03 11:03:28
 -->

<template>
  <div>
    home
    <dntTable :column="columns7" :data="data6"/>
    <div class="icon ico-4"></div>
  </div>
</template>
<script>
import dntTable from '@/components/el-table'
export default {
  components: {dntTable},
  data () {
    return {
      columns7: [
        {
          label: 'Name',
          prop: 'name'
        },
        {
          label: 'Age',
          prop: 'age'
        },
        {
          label: 'Address',
          prop: 'address'
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
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  }
}
</script>
