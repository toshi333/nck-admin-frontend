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
import ht from '@/plugins/hotSettings.js'
export default {
  name: 'EstimateTaskHotTable',
  props: {
    data: {
      type: Array,
      require: false,
    },
  },
  components: {
    HotTable,
  },
  data() {
    return {
      root: 'testhot',
      hotSettings: Object.assign(ht.settings(), {
        data: this.data,
        colHeaders: ['タスク', '見積金額', '原価', '利益率', '工数', 'メモ'],
        colWidths: [300, 100, 100, 70, 70],
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
        afterChange: () => {
          this.tableChange()
        },
        /*
        afterRowMove: () => {
          var rows = this.$refs.hottbl.hotInstance.countRows()
          for (var i = 0; i < rows; i++) {
            this.$refs.hottbl.hotInstance.setDataAtRowProp(i, 'row_num', i)
          }
        },
        */
      }),
    }
  },
  methods: {
    addrow() {
      this.$refs.hottbl.hotInstance.alter('insert_row', this.data.length + 1)
    },
    tableChange() {
      this.data.forEach((row, key) => {
        row.row_num = key
        row.cost = row.time * 3500
        row.profit = row.estimate_price
          ? (row.estimate_price - row.cost) / row.estimate_price
          : 0
      })
      this.$refs.hottbl.hotInstance.render()
    },
  },
}
</script>

<style>
.ht_master tr td {
  color: #000;
}
</style>
