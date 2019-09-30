<template>
  <v-container fluid>
    <v-row justify-center wrap>
      <v-col md12>
        <v-card>
          <v-app-bar dark color="teal darken-2">
            <v-btn icon class="hidden-xs-only" @click="$router.push('/user/')">
              <v-icon>mdi-arrow-left-circle</v-icon>
            </v-btn>
            <v-toolbar-title>社員</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-btn
              class="ma-2"
              color="success"
              :loading="loading"
              :disabled="loading"
              @click="save()"
              ><v-icon left>mdi-pencil</v-icon>保存</v-btn
            >
            <v-btn class="ma-2" color="info" @click="copyItem()"
              ><v-icon left>mdi-content-copy</v-icon>コピー</v-btn
            >
            <v-btn class="ma-2" color="error" @click="deleteItem()">
              <v-icon left>mdi-delete</v-icon>削除</v-btn
            >
          </v-app-bar>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="社員番号" v-model="user.code" />
              </v-col>
              <v-col>
                <UtilTeamSelect v-model="user.team" />
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  label="メール"
                  v-model="user.email"
                  :readonly="isCreate"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field label="性" v-model="user.last_name" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="名" v-model="user.first_name" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserItem',
  data: () => ({
    endpoint: '/auth/user/',
    user: {},
    teamList: {},
    isCreate: false,
    loading: false,
  }),

  created() {
    if (this.$route.params.id === '0') {
      this.user.id = 0
    } else {
      this.isCreate = true
      this.getData()
    }
  },

  methods: {
    getData() {
      this.$store
        .dispatch('getTableList', `${this.endpoint}${this.$route.params.id}/`)
        .then(response => {
          console.log(response)
          this.user = response
        })
        .catch(error => console.log(error))
    },

    updateData(endpoint, method) {
      let item = this.user
      console.log(item.first_name)
      this.$store
        .dispatch('updateTableItem', { endpoint, method, item })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    save() {
      if (this.user.id === 0) {
        this.updateData(this.endpoint, 'POST', this.user)
      } else {
        console.log(this.user)
        this.updateData(`${this.endpoint}${this.user.id}/`, 'PUT')
      }
    },

    copyItem() {
      this.user.id = 0
      this.isCreate = false
    },

    deleteItem() {
      if (confirm('このデータを削除しますか？')) {
        this.updateData(`${this.endpoint}${this.user.id}/`, 'DELETE')
        this.$router.push('/user/')
      }
    },
  },
}
</script>
