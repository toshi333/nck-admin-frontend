<template>
  <div>
    <hot-table
      :root="root"
      :data="data"
      :settings="hotSettings"
      ref="estimateTaskGrid"
    />
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import 'handsontable-key-value'
export default {
  name: 'EstimateTaskHotTable',
  props: ['data'],
  components: {
    HotTable,
  },
  data() {
    return {
      root: 'testhot',
      userList: [
        { id: 'bc7b7561-d40c-4104-9b84-5f6a775545e5', username: 'ほげやま' },
      ],
      hotSettings: {
        data: this.data,
        colHeaders: ['タスク', '担当者', '工数', 'メモ'],
        dataSchema: {
          id: null,
          name: null,
          user: null,
          time: null,
          memo: null,
        },
        columns: [
          { data: 'name', type: 'text' },
          {
            type: 'key-value',
            data: 'user',
            filter: false,
            source: this.userList,
            keyProperty: 'id',
            valueProperty: 'username',
          },
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
  created: function() {
    // Lazily load input items
    this.$store
      .dispatch('getTableItem', 'auth/user/')
      .then(response => {
        this.userList = response.results
        console.log(this.userList)
      })
      .catch(error => console.log(error))
  },
  methods: {},
}
</script>
