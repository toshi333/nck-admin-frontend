<template>
  <v-card class="elevation-2" v-if="true" height="100%">
    <v-app-bar dark color="blue-grey darken-2">
      <v-toolbar-title>コメント</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-icon>mdi-comment-text</v-icon>
    </v-app-bar>
    <v-card-text class="pa-3">
      <v-card class="mx-auto" color="yellow lighten-5">
        <v-card-actions class="pa-0">
          <v-list-item class="grow">
            <v-list-item-avatar>
              <v-img
                class="elevation-3"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>田中 俊行</v-list-item-title>
              <v-list-item-subtitle>2019/10/21 15:32</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-comment-arrow-left</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card-actions>

        <v-card-text class="pt-0"
          >この案件だと、過去のA社B案件が参考になると思います。</v-card-text
        >
        <v-divider></v-divider>

        <v-card-actions class="pa-0">
          <v-list-item class="grow">
            <v-list-item-content class="text-end">
              <v-list-item-title>田中 俊行</v-list-item-title>
              <v-list-item-subtitle>2019/10/21 15:32</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-img
                class="elevation-3"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-actions>
        <v-card-text class="pt-0">ありがとうございます</v-card-text>

        <v-divider inset></v-divider>

        <v-card-actions class="pa-0">
          <v-list-item class="grow">
            <v-list-item-content class="text-end">
              <v-list-item-title>田中 俊行</v-list-item-title>
              <v-list-item-subtitle>2019/10/21 15:32</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-img
                class="elevation-3"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-actions>
        <v-card-text class="pt-0">ありがとうございます</v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Comment',
  data: () => ({
    endpoint: '/sales/comment/',
    db_data: null,
  }),

  created() {},

  computed: {},

  methods: {
    getData() {
      this.$store
        .dispatch('getTableItem', `${this.endpoint}${this.$route.params.id}/`)
        .then(response => {
          console.log(response)
          this.db_data = response
        })
        .catch(error => {
          console.log(error)
          this.message = error
          this.alert = true
        })
    },

    updateData(endpoint, method) {
      this.alert = false
      this.db_data.price = this.total_amount
      let item = this.db_data
      this.$store
        .dispatch('updateTableItem', { endpoint, method, item })
        .then(response => {
          console.log(response)
          this.snackColor = 'success'
          this.message = '保存しました'
          this.snack = true
        })
        .catch(error => {
          console.log(error)
          this.message = error
          this.alert = true
        })
    },

    save() {
      if (this.db_data.id === 0) {
        this.updateData(this.endpoint, 'POST', this.db_data)
      } else {
        this.updateData(`${this.endpoint}${this.db_data.id}/`, 'PUT')
      }
    },
  },
}
</script>
