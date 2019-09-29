<template>
  <v-app>
    <div class="fill-height d-flex align-center justify-center">
      <v-card width="600" class="elevation-3 pa-10">
        <v-card-text>
          <div class="layout column align-center">
            <h1 class="flex my-4">NCK Admin</h1>
          </div>
          <v-form @submit.prevent="login">
            <v-text-field
              prepend-inner-icon="mdi-account"
              name="login"
              label="email"
              type="text"
              v-model="username"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-textbox-password"
              name="password"
              label="password"
              id="password"
              type="password"
              v-model="password"
            ></v-text-field>

            <v-alert
              v-if="loginError"
              text
              dense
              color="error"
              icon="mdi-alert-circle"
              border="left"
            >
              メールアドレスか、パスワードが正しくありません。
            </v-alert>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary" :loading="loading">
              サインイン
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data: function() {
    return {
      loading: false,
      loginError: false,
      username: '',
      password: '',
      showPassword: false,
    }
  },

  // Sends action to Vuex that will log you in and redirect to the dash otherwise, error
  methods: {
    login: function() {
      this.loading = true
      let username = this.username
      let password = this.password
      this.$store
        .dispatch('login', { username, password })
        .then(() => {
          this.loading = false
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.loginError = true
          this.loading = false
        })
    },
  },
}
</script>
