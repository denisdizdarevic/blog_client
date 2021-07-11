<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="9">
        <div class="text-center mb-3" v-show="loading">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="70"
            :width="7"
          />
        </div>
        <post-entry
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="mb-3"
        />
        <v-container>
          <v-row justify="center">
            <v-col cols="12" lg="6" sm="9">
              <v-pagination
                v-model="currentPage"
                :length="pageCount"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col md="3" v-show="$vuetify.breakpoint.mdAndUp">
        <side-bar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostEntry from "../components/PostCard";
import SideBar from "@/components/SideBar";
import { mapState } from "vuex";

export default {
  name: "Browse",

  data: () => ({
    loading: true,
  }),
  components: {
    PostEntry,
    SideBar,
  },
  computed: {
    pageCount() {
      return Math.ceil(
        this.$store.state.postCount / this.$store.state.postsPerPage
      );
    },
    currentPage: {
      get() {
        return this.$route.query.page | 1;
      },
      async set(value) {
        await this.$router.push({
          query: Object.assign({}, this.$route.query, { page: value }),
        });
      },
    },
    ...mapState(["posts"]),
  },
  async mounted() {
    this.$emit("activateDrawer", !this.$vuetify.breakpoint.mdAndUp);
    await this.loadPosts();
  },
  watch: {
    "$vuetify.breakpoint.mdAndUp": function (value) {
      this.$emit("activateDrawer", !value);
    },
    $route: async function () {
      await this.loadPosts();
    },
  },
  beforeDestroy() {
    this.$emit("activateDrawer", false);
  },
  methods: {
    async loadPosts() {
      this.$data.loading = true;
      await this.$store.dispatch("loadPosts", this.$route.query);
      this.$data.loading = false;
    },
  },
};
</script>

<style scoped></style>
