<!-- https://vuetifyjs.com/en/examples/wireframes/constrained/ -->
<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-tabs color="grey darken-1" centered ref="tabs">
        <v-tab v-for="link in links" :key="link.name" :to="link.path">
          {{ link.name }}
        </v-tab>
      </v-tabs>

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-show="drawerActive"
      />
    </v-app-bar>

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
      <router-view @activateDrawer="setDrawerActive" v-show="!apiError" />
      <api-error v-show="apiError" />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import ApiError from "@/views/ApiError";

export default {
  name: "App",
  components: { ApiError },
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
      this.$refs.tabs.callSlider(); //to fix late layout change
    },
  },
  computed: mapState(["apiError"]),
};
</script>
