<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="9">
        <post-entry
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="mb-3"
        />
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

export default {
  name: "Browse",

  components: {
    PostEntry,
    SideBar,
  },

  data: () => ({
    posts: [
      { id: 1, name: "Test Post 1", desc: "This is a Test Post" },
      { id: 2, name: "Test Post 2", desc: "This is a Test Post" },
    ],
  }),
  watch: {
    "$vuetify.breakpoint.mdAndUp": function (value) {
      this.$emit("activateDrawer", !value);
    },
  },
};
</script>
