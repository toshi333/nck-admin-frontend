<template>
  <div>
    <div class="d-flex">
      <div class="align-self-end">タスク</div>
      <div class="ml-auto">
        <v-btn class="ma-2" small color="info" @click="addrow()">
          <v-icon left>mdi-playlist-plus</v-icon>行追加
        </v-btn>
      </div>
    </div>
    <hot-table :root="root" :data="data" :settings="hotSettings" ref="hottbl" />
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
      hotSettings: {
        data: this.data,
        colHeaders: ['タスク', '見積金額', '原価', '利益率', '工数', 'メモ'],
        dataSchema: {
          name: null,
          estimate_price: 0,
          cost: 0,
          profit: 0,
          time: 0,
          memo: null,
        },
        columns: [
          { data: 'name', type: 'text' },
          {
            data: 'estimate_price',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
          },
          {
            data: 'cost',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
            readOnly: true,
          },
          {
            data: 'profit',
            type: 'numeric',
            width: 100,
            numericFormat: { pattern: '0.0%' },
            readOnly: true,
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
        minRows: 5,
        stretchH: 'all',
        contextMenu: true,
        manualColumnResize: true,
        rowHeaders: true,
        manualRowMove: true,
        formulas: true,
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
  methods: {
    addrow() {
      this.$refs.hottbl.hotInstance.alter('insert_row', this.data.length + 1)
    },
  },
  watch: {
    data: function(newdata) {
      newdata.forEach((item, key) => {
        let index = key + 1
        item.row_num = index
        item.cost = '=E' + index + '*3500'
        item.profit = '=(B' + index + '-C' + index + ')/' + 'B' + index
      })
    },
  },
}
</script>

<style>
.ht_master tr td {
  color: #000;
}
</style>
