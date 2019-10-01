<template>
  <v-app-bar app height="56" dark>
    <v-tabs>
      <v-tab>TODO</v-tab>
      <v-tab>チャット</v-tab>
      <v-tab>作業表</v-tab>
    </v-tabs>
    <div class="flex-grow-1" />

    <v-text-field
      prepend-inner-icon="mdi-magnify"
      class="mr-3 mt-2"
      label="検索.."
      hide-details
    />
    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-avatar v-on="on" size="36">
          <img :src="user.avatar" alt="avatar" />
        </v-avatar>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-avatar size="30">
            <img :src="user.avatar" alt="avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            {{ user.email }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/user-profile">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            プロフィール
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            設定
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            ログアウト
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Appbar',
  data: () => ({
    user: '',
  }),

  created() {
    this.user = this.$store.getters.loginUser
  },

  methods: {
    logout: function() {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>
