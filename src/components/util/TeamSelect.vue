<template>
  <v-select
    v-model="internalValue"
    :items="entries"
    item-value="id"
    item-text="name"
    label="所属"
    clearable
  ></v-select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    entries: [],
  }),
  computed: {
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
    this.$store
      .dispatch('getTableItem', '/master/team/')
      .then(response => {
        this.entries = response.results
      })
      .catch(error => console.log(error))
      .finally(() => (this.isLoading = false))
  },
}
</script>
