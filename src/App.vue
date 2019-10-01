<template>
  <transition mode="out-in">
    <router-view />
  </transition>
</template>

<script>
// 401認証エラーが返った場合は保持しているトークンを削除しログアウトとする
export default {
  name: 'App',
  created: function() {
    this.$http.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error.response.status === 401 || error.response.status === 403) {
          this.$store.dispatch('logout')
          this.$router.push('/login/')
        } else {
          return Promise.reject(error)
        }
      }
    )
  },
}
</script>
