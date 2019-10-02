<template>
  <v-autocomplete
    v-model="internalValue"
    :items="items"
    :loading="isLoading"
    item-text="name"
    item-value="id"
    label="顧客名"
    return-object
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      require: false,
      default: () => ({ id: 0, name: '' }),
    },
  },
  data: () => ({
    entries: [],
    isLoading: false,
    search: null,
  }),
  computed: {
    items() {
      return this.entries.map(entry => {
        return Object.assign({}, entry)
      })
    },
    internalValue: {
      get() {
        return this.value
      },
      set(newVal) {
        if (this.value !== newVal) this.$emit('input', newVal)
      },
    },
  },
  created: function() {
    // Lazily load input items
    this.$store
      .dispatch('getTableItem', 'master/customer/')
      .then(response => {
        this.entries = response.results
      })
      .catch(error => console.log(error))
      .finally(() => (this.isLoading = false))
  },
}
</script>
