<!-- https://vuetifyjs.com/en/examples/wireframes/constrained/ -->
<template>
  <v-app id="inspire">
    <v-toolbar flat class="px-2" style="max-height: 64px">
      <v-tabs color="grey darken-1">
        <v-tab v-for="link in links" :key="link.name" :to="link.path">
          {{ link.name }}
        </v-tab>
      </v-tabs>

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-show="drawerActive"
      />
    </v-toolbar>

    <v-navigation-drawer
      right
      app
      temporary
      v-model="drawer"
      v-show="drawerActive"
    >
      <router-view name="navbar" />
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <router-view @activateDrawer="setDrawerActive" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawerActive: false,
    drawer: null,
    links: [
      { name: "Home", path: "/" },
      { name: "Browse", path: "/browse" },
    ],
  }),
  methods: {
    setDrawerActive(value) {
      this.drawerActive = value;
    },
  },
};
</script>
