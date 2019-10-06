<template>
  <div>
    <hot-table
      :root="root"
      :data="data"
      :settings="hotSettings"
      ref="estimateTaskGrid"
    ></hot-table>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
export default {
  name: 'EstimateTaskHotTable',
  props: ['data'],
  components: {
    HotTable,
  },
  data() {
    return {
      root: 'testhot',
      userList: {},
      hotSettings: {
        data: this.data,
        colHeaders: ['タスク', '担当者', '工数', 'メモ'],
        columns: [
          { data: 'name', type: 'text' },
          { data: 'user', type: 'dropdown', source: this.userList },
          {
            data: 'time',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
          },
          { data: 'memo', type: 'text' },
        ],
        autoColumnSize: true,
        enterBeginsEditing: false,
        rowHeights: 30,
        minSpareRows: 1,
        minRows: 3,
        stretchH: 'all',
        contextMenu: true,
        manualColumnResize: true,
        rowHeaders: true,
      },
    }
  },
  methods: {},
}
</script>
