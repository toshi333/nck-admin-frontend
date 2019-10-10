<template>
  <v-container fluid>
    <v-row justify-center wrap>
      <v-col md12>
        <v-card>
          <v-app-bar dark color="blue-grey darken-2">
            <v-toolbar-title>見積一覧</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-btn class="ma-2" color="primary" @click="createItem()">
              <v-icon left>mdi-plus-box-outline</v-icon>登録
            </v-btn>
          </v-app-bar>
          <v-card-text>
            <v-row wrap>
              <v-col>
                <v-text-field label="社員番号" v-model="filterUserCode" />
              </v-col>
              <v-col>
                <v-text-field label="社員名" v-model="filterUserName" />
              </v-col>
              <v-col>
                <UtilTeamSelect v-model="filterUserTeam" />
              </v-col>
              <v-col>
                <v-btn class="ma-2" color="primary" @click="getData()">
                  <v-icon left>mdi-magnify</v-icon>検索
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card>
              <v-data-table
                class="elevation-1"
                :headers="headers"
                :items="UserList"
                :loading="loading"
                :options.sync="options"
                :server-items-length="totalCount"
                :footer-props="{
                  showFirstLastPage: true,
                  showCurrentPage: true,
                  itemsPerPageOptions: this.rowsAmount,
                }"
              >
                <template v-slot:item.action="{ item }">
                  <v-icon class="mr-2" @click="editItem(item)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
              </v-data-table>
              <v-snackbar v-model="snack" :timeout="2500" :color="snackColor">{{
                snackText
              }}</v-snackbar>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserList',
  data: () => ({
    filterUserCode: '',
    filterUserName: '',
    filterUserTeam: null,
    loading: true,
    snack: false,
    snackColor: '',
    snackText: '',
    UserList: [],
    totalCount: 0,
    options: {
      page: 1,
      itemsPerPage: 50,
      sortBy: ['date'],
      sortDesc: [false],
    },
    rowsAmount: [25, 50, 75, 100],
    headers: [
      { text: '--操作--', value: 'action', sortable: false },
      { text: '作番', value: 'project' },
      { text: '件名', value: 'name', sortable: false },
      { text: '顧客名', value: 'customer_name', sortable: false },
      { text: '見積金額', value: 'price', sortable: false },
      { text: '担当者', value: 'user_name', sortable: false },
    ],
  }),

  // called when page is created before dom
  created() {
    this.getData()
  },
  watch: {
    // データテーブルのヘッダーを監視し、変化があったらデータを取り直す
    options: {
      handler() {
        this.getData()
      },
      deep: true,
    },
  },
  methods: {
    // APIでデータ取得
    getData() {
      this.$store
        .dispatch('getTableItem', `/sales/estimate-list/${this.searchKey()}`)
        .then(response => {
          console.log(response)
          this.UserList = response.results
          this.totalCount = response.count
          this.loading = false
        })
        .catch(error => console.log(error))
    },

    // 編集ボタン処理
    editItem(item) {
      this.$router.push(`/estimate-item/${item.id}/`)
    },

    // 新規登録ボタン処理
    createItem() {
      this.$router.push('/estimate-item/0/')
    },

    // 削除処理
    deleteItem(item) {
      if (confirm(`このデータを削除しますか？：${item.username}`)) {
        let endpoint = `/sales/estimate/${item.id}/`
        let method = 'delete'
        this.$store
          .dispatch('updateTableItem', { endpoint, item, method })
          .then(response => {
            console.log(response)
            this.snackColor = 'success'
            this.snackText = '削除しました'
            this.snack = true
            this.getData()
          })
          .catch(error => {
            console.log(error)
            this.snackColor = 'error'
            this.snackText = '失敗しました'
            this.snack = true
          })
      }
    },

    searchKey() {
      let sorts = []
      if (this.options.sortBy !== null) {
        this.options.sortBy.forEach((value, index) => {
          sorts.push((this.options.sortDesc[index] ? '-' : '') + value)
        })
      }
      let offset = (this.options.page - 1) * this.options.itemsPerPage
      let searchKey = `?ordering=${sorts.join(',')}&offset=${offset}&code=${
        this.filterUserCode
      }&user=${this.filterUserName}`
      if (this.filterUserTeam) {
        searchKey = searchKey + '&team=' + this.filterUserTeam
      }
      return searchKey
    },
  },
}
</script>
