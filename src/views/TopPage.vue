<template>
  <v-app>
    <top-appbar />
    <top-drawer />
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
