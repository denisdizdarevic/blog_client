<!-- https://vuetifyjs.com/en/examples/wireframes/constrained/ -->
<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-tabs color="grey darken-1" centered ref="tabs">
        <v-tab v-for="link in links" :key="link.name" :to="link.path">
          {{ link.name }}
        </v-tab>
      </v-tabs>

      <v-btn v-show="!loggedIn" @click="loginActive = true"> Login </v-btn>
      <v-btn v-show="loggedIn" @click="logOut"> Logout </v-btn>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-show="drawerActive"
        class="ml-4"
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
      <router-view
        @activateDrawer="setDrawerActive"
        @openLogin="loginActive = true"
        v-show="!apiError"
      />
      <api-error v-show="apiError" />
    </v-main>

    <v-dialog v-model="loginActive" max-width="400px">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
            label="Username"
            required
            v-model="username"
          ></v-text-field>
          <v-text-field
            label="Password"
            required
            v-model="password"
            :append-icon="passwordHidden ? mdiEye : mdiEyeOff"
            @click:append="() => (passwordHidden = !passwordHidden)"
            :type="passwordHidden ? 'password' : 'text'"
          ></v-text-field>
          <v-alert type="error" v-show="loginFailed">Login Failed</v-alert>
          <v-alert type="error" v-show="registerFailed"
            >Register Failed</v-alert
          >
          <v-row justify="space-around" class="mt-4">
            <v-btn
              :loading="processing"
              :disabled="processing"
              @click="register"
            >
              Register
            </v-btn>
            <v-btn :loading="processing" :disabled="processing" @click="logIn">
              Login
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import ApiError from "@/views/ApiError";
import { mdiEye, mdiEyeOff } from "@mdi/js";

export default {
  name: "App",
  components: { ApiError },
  data: () => ({
    username: "",
    password: "",
    loginActive: false,
    loginFailed: false,
    registerFailed: false,
    processing: false,
    drawerActive: false,
    drawer: null,
    passwordHidden: true,
    links: [
      { name: "Home", path: "/" },
      { name: "Browse", path: "/browse" },
    ],
    mdiEye,
    mdiEyeOff,
  }),
  methods: {
    setDrawerActive(value) {
      this.drawerActive = value;
      this.$refs.tabs.callSlider(); //to fix late layout change
    },
    async logIn() {
      this.loginFailed = false;
      this.registerFailed = false;
      this.processing = true;
      try {
        let api = await this.$store.state.api;

        await api.retrieveAuth(null, null, {
          withCredentials: true,
          auth: {
            username: this.username,
            password: this.password,
          },
        });

        await this.$store.dispatch("logIn", {
          username: this.username,
          password: this.password,
        });
        this.loginActive = false;
      } catch {
        this.loginFailed = true;
      }
      this.processing = false;
    },
    async register() {
      this.loginFailed = false;
      this.registerFailed = false;
      this.processing = true;
      try {
        let api = await this.$store.state.api;

        await api.registerAuth(null, {
          username: this.username,
          password: this.password,
        });

        await this.$store.dispatch("logIn", {
          username: this.username,
          password: this.password,
        });
        this.loginActive = false;
      } catch {
        this.registerFailed = true;
      }
      this.processing = false;
    },
    logOut() {
      this.username = "";
      this.password = "";
      this.$store.dispatch("logOut");
    },
  },
  computed: mapState(["apiError", "loggedIn"]),
};
</script>
