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
  components: {
    HotTable,
  },
  data() {
    return {
      root: 'testhot',
      data: [
        {
          brand: 1,
          sales: 10,
          year: 2000,
        },
        {
          brand: 2,
          sales: 20,
          year: 2001,
        },
        {
          brand: 3,
          sales: 30,
          year: 2002,
        },
        {
          brand: 4,
          sales: 40,
          year: 2003,
        },
      ],
      userList: [
        {
          id: 1,
          name: 'Ford',
        },
        {
          id: 2,
          name: 'Tesla',
        },
        {
          id: 3,
          name: 'Toyota',
        },
        {
          id: 4,
          name: 'Honda',
        },
      ],
      hotSettings: {
        data: this.data,
        filtersKeyValue: true,
        dropdownMenu: ['filter_by_value', 'filter_action_bar'],
        columns: [
          {
            type: 'key-value',
            filter: false, // Same parameter as in `autocomplete`
            data: 'brand', // The field containing the key value in your data
            // List of source items
            source: this.userList,
            keyProperty: 'id', // The field containing the key value in your items
            valueProperty: 'name', // The field containing the display value in your items
          },
          {
            type: 'numeric',
            data: 'sales',
          },
          {
            type: 'numeric',
            data: 'year',
          },
        ],
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
