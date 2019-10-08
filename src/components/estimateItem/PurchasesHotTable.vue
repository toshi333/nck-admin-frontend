<template>
  <div>
    <div class="d-flex">
      <div class="align-self-end">購入</div>
      <div class="ml-auto">
        <v-btn class="ma-2" small color="info" @click="copyItem()">
          <v-icon left>mdi-playlist-plus</v-icon>行追加
        </v-btn>
      </div>
    </div>
    <hot-table
      :root="root"
      :data="data"
      :settings="hotSettings"
      ref="estimatePurchaseGrid"
    />
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
export default {
  name: 'PurchaseHotTable',
  props: ['data'],
  components: {
    HotTable,
  },
  data() {
    return {
      root: 'testhot',
      hotSettings: {
        data: this.data,
        colHeaders: [
          '品名',
          '数量',
          '仕入単価',
          '見積単価',
          '仕入金額',
          '見積金額',
          '利益',
          'メモ',
        ],
        dataSchema: {
          name: null,
          quantity: 0,
          purchase_price: 0,
          estimate_price: 0,
          purchase_amount: 0,
          estimate_amount: 0,
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
            data: 'purchase_price',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
          },
          {
            data: 'estimate_price',
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
            data: 'estimate_amount',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
            readOnly: true,
          },
          {
            data: 'profit',
            type: 'numeric',
            numericFormat: { pattern: '0,0' },
            readOnly: true,
          },
          { data: 'memo', type: 'text' },
        ],
        autoColumnSize: true,
        enterBeginsEditing: false,
        rowHeights: 30,
        //minSpareRows: 1,
        minRows: 3,
        stretchH: 'all',
        contextMenu: true,
        manualColumnResize: true,
        rowHeaders: true,
        formulas: true,
      },
    }
  },
  watch: {
    data: function(newdata) {
      newdata.forEach((item, key) => {
        let index = key + 1
        item.purchase_amount = '=B' + index + '*C' + index
        item.estimate_amount = '=B' + index + '*D' + index
        item.profit = '=F' + index + '-E' + index
      })
    },
  },
}
</script>
