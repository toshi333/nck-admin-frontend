<template>
  <v-app-bar app height="56" dark>
    <v-tabs>
      <v-tab to="/">新着</v-tab>
      <v-tab to="/hello">ToDo</v-tab>
      <v-tab>Item Three</v-tab>
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
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="logout()">
          ログアウト
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
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
