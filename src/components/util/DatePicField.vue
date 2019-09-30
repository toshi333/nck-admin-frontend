<template>
  <div>
    <v-menu
      :close-on-content-click="false"
      v-model="menu"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="internalValue"
        :label="label"
        prepend-icon="event"
        readonly
        @input="$emit('input', $event.target.value)"
      />
      <v-date-picker
        v-model="internalValue"
        locale="ja"
        no-title
        scrollable
        header-color="primary"
        color="primary"
        @input="menu = false"
      />
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'DatePicField',
  props: {
    label: {
      type: String,
      require: true,
      default: '',
    },
    value: {
      type: String,
      require: true,
      default: '',
    },
  },
  data() {
    return {
      menu: false,
    }
  },
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
}
</script>
