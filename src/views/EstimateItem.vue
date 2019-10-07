<template>
  <v-container fluid>
    <v-row justify-center wrap>
      <v-col md12>
        <v-card>
          <v-app-bar dark color="teal darken-2">
            <v-btn
              icon
              class="hidden-xs-only"
              @click="$router.push('/estimate/')"
            >
              <v-icon>mdi-arrow-left-circle</v-icon>
            </v-btn>
            <v-toolbar-title>見積伝票</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-btn
              class="ma-2"
              color="success"
              :loading="loading"
              :disabled="loading"
              @click="save()"
            >
              <v-icon left>mdi-pencil</v-icon>保存
            </v-btn>
            <v-btn class="ma-2" color="info" @click="copyItem()">
              <v-icon left>mdi-content-copy</v-icon>コピー
            </v-btn>
            <v-btn class="ma-2" color="error" @click="deleteItem()">
              <v-icon left>mdi-delete</v-icon>削除
            </v-btn>
          </v-app-bar>
          <v-card-text>
            <v-alert
              v-if="alert"
              text
              dense
              color="error"
              icon="mdi-alert-circle"
              border="left"
              >{{ message }}}</v-alert
            >
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="プロジェクトコード"
                  v-model="db_data.project"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <UtilCustomerSelect v-model="db_data.customer" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="件名" v-model="db_data.name" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="見積金額" v-model="db_data.price" />
              </v-col>
              <v-col cols="12" sm="6">
                <UtilUserSelect v-model="db_data.user" />
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field label="説明" v-model="db_data.description" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <div class="subheading">製品</div>
            <EstimateItemTaskHotTableCopy :data="tasks" />
          </v-card-text>
        </v-card>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
          {{ message }}
          <v-btn text color="white" @click="snack = false">閉じる</v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EstimateItem',
  data: () => ({
    endpoint: '/sales/estimate/',
    db_data: {},
    tasks: {},
    loading: false,
    alert: false,
    snack: false,
    snackColor: '',
    message: '',
  }),

  created() {
    if (this.$route.params.id === '0') {
      this.db_data.id = 0
    } else {
      this.getData()
    }
  },

  methods: {
    getData() {
      this.$store
        .dispatch('getTableItem', `${this.endpoint}${this.$route.params.id}/`)
        .then(response => {
          console.log(response)
          this.db_data = response
          this.tasks = this.deleteEmptyRow(this.db_data.tasks)
        })
        .catch(error => {
          console.log(error)
          this.message = error
          this.alert = true
        })
    },

    updateData(endpoint, method) {
      let item = this.db_data
      item.tasks = this.deleteEmptyRow(this.tasks)

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

    copyItem() {
      this.db_data.id = 0
      this.snackColor = 'primary'
      this.message = 'コピーしました'
      this.snack = true
    },

    deleteItem() {
      if (confirm('このデータを削除しますか？')) {
        this.updateData(`${this.endpoint}${this.db_data.id}/`, 'DELETE')
        this.$router.push('/estimate/')
      }
    },

    // 更新処理の前にグリッドの空白行を除去する
    deleteEmptyRow(data) {
      return data.filter(row => {
        for (let col in row) {
          if (row[col]) return true
        }
        return false
      })
    },
  },
}
</script>
