<template>
  <v-container fluid>
    <v-row justify-center wrap>
      <v-col md12>
        <v-card>
          <v-app-bar dark color="teal darken-2">
            <v-toolbar-title>社員一覧</v-toolbar-title>
            <div class="flex-grow-1"></div>
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
                <v-btn color="primary" @click="getData()">
                  検索
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card>
              <v-card-title>
                <v-btn color="primary" @click="createItem()">
                  新規登録
                </v-btn>
                <div class="flex-grow-1"></div>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="検索"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                class="elevation-1"
                :headers="headers"
                :items="UserList"
                :search="search"
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
              <v-snackbar v-model="snack" :timeout="2500" :color="snackColor">
                {{ snackText }}
              </v-snackbar>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
      sortBy: ['code'],
      sortDesc: [false],
    },
    rowsAmount: [25, 50, 75, 100],
    search: '',
    headers: [
      { text: '--操作--', value: 'action', sortable: false },
      { text: '社員番号', align: 'left', value: 'code' },
      { text: '名前', value: 'username', sortable: false },
      { text: '所属', value: 'team_name', sortable: false },
      { text: 'email', value: 'email', sortable: false },
      { text: '管理者', value: 'is_staff', sortable: false },
      { text: '有効', value: 'is_active', sortable: false },
    ],
  }),

  // called when page is created before dom
  created() {
    this.getData()
  },
  watch: {
    options: {
      handler() {
        this.showoption()
      },
      deep: true,
    },
  },
  methods: {
    showoption() {
      console.log(this.options)
      this.getData()
    },

    getData() {
      this.$store
        .dispatch('getTableItem', `/auth/user/${this.searchKey()}`)
        .then(response => {
          console.log(response)
          this.UserList = response.results
          this.totalCount = response.count
          this.loading = false
        })
        .catch(error => console.log(error))
    },

    editItem(item) {
      this.$router.push(`/user-item/${item.id}/`)
    },

    createItem() {
      this.$router.push('/user-item/0/')
    },

    deleteItem(item) {
      if (confirm(`このデータを削除しますか？：${item.username}`)) {
        let endpoint = `/auth/user/${item.id}/`
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
      }&last_name=${this.filterUserName}`
      if (this.filterUserTeam) {
        searchKey = searchKey + '&team=' + this.filterUserTeam
      }
      return searchKey
    },
  },
}
</script>
