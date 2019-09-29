<template>
  <v-row justify="center">
    <v-dialog v-model="internalValue" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-card-text>
          {{ text }}
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="error" text @click="internalValue = false">
            キャンセル
          </v-btn>

          <v-btn color="primary" text @click="internalValue = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'OkCancelDialog',
  props: {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    value: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      dialog: false,
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
