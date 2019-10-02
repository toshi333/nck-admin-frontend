<template>
  <v-container fluid>
    <v-row justify-center wrap>
      <v-col md12>
        <v-card>
          <v-app-bar dark color="primary">
            <v-btn icon class="hidden-xs-only" @click="$router.push('/user/')">
              <v-icon>mdi-arrow-left-circle</v-icon>
            </v-btn>
            <v-toolbar-title>プロフィール</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-btn
              class="ma-2"
              color="success"
              :loading="loading"
              :disabled="loading"
              @click="save()"
              ><v-icon left>mdi-pencil</v-icon>保存</v-btn
            >
          </v-app-bar>
          <v-card-text>
            <v-alert
              v-if="alert"
              text
              dense
              color="error"
              icon="mdi-alert-circle"
              border="left"
            >
              {{ message }}}
            </v-alert>

            <img :src="avatarImage" height="150" @click="pickFile()" />

            <input
              type="file"
              style="display: none"
              ref="avatarImage"
              accept="image/*"
              @change="onFilePicked"
            />

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="社員番号" v-model="user.code" />
              </v-col>
              <v-col>
                <UtilTeamSelect name="team" v-model="user.team" />
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field label="メール" v-model="user.email" readonly />
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
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
          {{ message }}
          <v-btn text color="white" @click="snack = false">
            閉じる
          </v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserProfile',
  data: () => ({
    endpoint: '/auth/user/',
    user: {},
    avatarImage: '',
    avatarFile: '',
    loading: false,
    alert: false,
    snack: false,
    snackColor: '',
    message: '',
  }),

  created() {
    this.user = this.$store.getters.loginUser
    this.avatarImage = this.user.avatar
  },

  methods: {
    updateData(endpoint, method, formData) {
      let item = formData
      console.log(item.first_name)
      this.$store
        .dispatch('updateFormItem', { endpoint, method, item })
        .then(response => {
          console.log(response)
          this.snackColor = 'success'
          this.message = '保存しました'
          this.user.avatar = this.avatarImage
          this.snack = true
        })
        .catch(error => {
          console.log(error)
          this.message = error
          this.alert = true
        })
    },

    save() {
      let formData = new FormData()
      formData.append('id', this.user.id)
      formData.append('team', this.user.team)
      formData.append('email', this.user.email)
      formData.append('last_name', this.user.last_name)
      formData.append('first_name', this.user.first_name)
      if (this.avatarFile) formData.append('avatar', this.avatarFile)

      this.updateData(`${this.endpoint}${this.user.id}/`, 'PATCH', formData)
    },

    pickFile() {
      this.$refs.avatarImage.click()
    },
    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        if (files[0].name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.avatarImage = fr.result
          this.avatarFile = files[0]
        })
      }
    },
  },
}
</script>
