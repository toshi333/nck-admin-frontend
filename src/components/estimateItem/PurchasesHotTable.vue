<template>
  <div>
    <div class="d-flex">
      <div class="align-self-end">購入</div>
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
  name: 'PurchaseHotTable',
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
        colHeaders: [
          '品名',
          '数量',
          '見積単価',
          '見積金額',
          '仕入単価',
          '仕入原価',
          '利益率',
          'メモ',
        ],
        colWidths: [300, 70, 100, 100, 100, 100, 70],
        dataSchema: {
          name: null,
          quantity: 0,
          estimate_price: 0,
          estimate_amount: 0,
          purchase_price: 0,

          purchase_amount: 0,

          profit: 0,
          memo: null,
        },
        columns: [
          { data: 'name', type: 'text' },
          {
            data: 'quantity',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
          },

          {
            data: 'estimate_price',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
          },
          {
            data: 'estimate_amount',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
            readOnly: true,
          },
          {
            data: 'purchase_price',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
          },
          {
            data: 'purchase_amount',
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
          { data: 'memo', type: 'text' },
        ],
        afterChange: () => {
          this.tableChange()
        },
      }),
    }
  },
  methods: {
    addrow() {
      this.$refs.hottbl.hotInstance.alter('insert_row', this.data.length + 1)
    },
    tableChange() {
      let pur_est_total = 0
      let pur_cost_total = 0
      this.data.forEach((row, key) => {
        row.row_num = key
        row.purchase_amount = row.purchase_price * row.quantity
        row.estimate_amount = row.estimate_price * row.quantity
        pur_est_total += row.estimate_amount ? row.estimate_amount : 0
        pur_cost_total += row.purchase_amount ? row.purchase_amount : 0
        row.profit = row.estimate_amount
          ? (row.estimate_amount - row.purchase_amount) / row.estimate_amount
          : 0
      })
      this.$refs.hottbl.hotInstance.render()
      this.$emit('purchases-sum', pur_est_total, pur_cost_total)
    },
  },
}
</script>
