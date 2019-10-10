<template>
  <v-container fluid>
    <v-row justify-center wrap>
      <v-col md12>
        <v-card v-if="db_data">
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
              v-shortkey="['ctrl', 's']"
              @shortkey="save()"
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
              <v-col cols="12" sm="12">
                <v-stepper v-model="db_data.status">
                  <v-stepper-header>
                    <v-stepper-step
                      :complete="db_data.status > 1 && db_data.status != 9"
                      step="1"
                      editable
                      >下書き</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step
                      :complete="db_data.status > 2 && db_data.status != 9"
                      step="2"
                      editable
                      >申請中</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step
                      :complete="db_data.status > 3 && db_data.status != 9"
                      step="3"
                      editable
                      :rules="[() => db_data.status != 3]"
                      >差戻し</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step
                      :complete="db_data.status > 4 && db_data.status != 9"
                      step="4"
                      color="success"
                      editable
                      >承認済</v-stepper-step
                    >
                    <v-divider></v-divider>
                    <v-stepper-step
                      step="9"
                      editable
                      :rules="[() => db_data.status != 9]"
                      >キャンセル</v-stepper-step
                    >
                  </v-stepper-header>
                </v-stepper>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="px-4" cols="12" sm="6">
                <v-text-field
                  label="プロジェクトコード"
                  v-model="db_data.project"
                />
                <UtilCustomerSelect v-model="db_data.customer" />
                <v-text-field label="件名" v-model="db_data.name" />
                <UtilTeamSelect v-model="db_data.user" />
                <UtilUserSelect v-model="db_data.user" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col class="display-1 pl-24">
                        見積金額：
                      </v-col>
                      <v-col class="display-1 text-end">
                        ￥{{ total_amount | numeral('0,0') }}
                      </v-col>
                    </v-row>
                    <v-divider />
                    <v-row>
                      <v-col class="title  pl-24">
                        購入原価：
                      </v-col>
                      <v-col class="title text-end">
                        ￥{{ pur_cost_total | numeral('0,0') }}
                      </v-col>
                    </v-row>
                    <v-divider inset />
                    <v-row>
                      <v-col class="title  pl-24">
                        作業原価：
                      </v-col>
                      <v-col class="title text-end">
                        ￥{{ tsk_cost_total | numeral('0,0') }}
                      </v-col>
                    </v-row>
                    <v-divider inset />
                    <v-row>
                      <v-col class="title pl-24">
                        経費：
                      </v-col>
                      <v-col class="title text-end">
                        ￥{{ 0 | numeral('0,0') }}
                      </v-col>
                    </v-row>
                    <v-divider inset />
                    <v-row>
                      <v-col class="title pl-24">
                        利益率：
                      </v-col>
                      <v-col class="title text-end">
                        {{ total_profit | numeral('0.[00]%') }}
                      </v-col>
                    </v-row>
                    <v-divider inset />
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col class="px-4" cols="12" sm="12">
                <v-textarea
                  label="説明"
                  v-model="db_data.description"
                  auto-grow
                  rows="3"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <EstimateItemPurchasesHotTable
              :data="db_data.purchases"
              @purchases-sum="onPurchasesSum"
            />
          </v-card-text>
          <v-card-text>
            <EstimateItemTaskHotTable
              :data="db_data.tasks"
              @tasks-sum="onTasksSum"
            />
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
    db_data: null,
    pur_est_total: 0,
    pur_cost_total: 0,
    tsk_est_total: 0,
    tsk_cost_total: 0,
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

  computed: {
    total_amount: function() {
      // 見積金額合計
      return this.pur_est_total + this.tsk_est_total
    },
    total_cost: function() {
      // 原価合計
      return this.pur_cost_total + this.tsk_cost_total
    },
    total_profit: function() {
      // 利益率
      return this.total_amount
        ? (this.total_amount - this.total_cost) / this.total_amount
        : 0
    },
  },

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
    onPurchasesSum(pur_est_total, pur_cost_total) {
      this.pur_cost_total = pur_cost_total
      this.pur_est_total = pur_est_total
    },
    onTasksSum(tsk_est_total, tsk_cost_total) {
      this.tsk_est_total = tsk_est_total
      this.tsk_cost_total = tsk_cost_total
    },
  },
}
</script>
