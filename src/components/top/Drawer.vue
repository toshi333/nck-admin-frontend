<template>
  <v-navigation-drawer
    app
    dark
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="@/assets/logo.png"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>NCK Admin</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { to: '/', title: 'ダッシュボード', icon: 'mdi-chart-bar' },
        {
          to: '/project',
          title: 'プロジェクト',
          icon: 'mdi-account-supervisor',
        },
        { to: '/estimate', title: '見積伝票', icon: 'mdi-clipboard-text' },
        { to: '/purchuse', title: '購入伝票', icon: 'mdi-cart' },
        { to: '/user', title: '社員', icon: 'mdi-account' },
        { to: '/customer', title: '顧客', icon: 'mdi-briefcase-account' },
      ],
      mini: false,
    }
  },
}
</script>
