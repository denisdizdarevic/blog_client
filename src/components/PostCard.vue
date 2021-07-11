<template>
  <v-card tile elevation="0">
    <div class="subtitle-2 pt-2 pl-4">
      {{ new Date(post.timestamp_created).toLocaleDateString() }}
    </div>
    <v-card-title class="pt-0 pb-0">
      {{ post.title }}
    </v-card-title>
    <v-chip
      link
      label
      class="ma-2 mr-0"
      v-for="tag in post.tags"
      :key="tag"
      @click="tagClicked(tag)"
    >
      {{ tag }}
    </v-chip>
    <v-divider />
    <v-card-text>
      <div v-html="post.description" />
    </v-card-text>
    <v-divider />
    <v-row align="center" class="mx-4 mt-0">
      <v-col cols="auto">
        Author:
        <v-chip link label @click="authorClicked(post.author)">{{
          authorName
        }}</v-chip>
      </v-col>
      <v-divider vertical />
      <v-col cols="auto">
        Likes:
        <v-chip class="ma-2">{{ post.like_count }}</v-chip>
      </v-col>
      <v-divider vertical />
      <v-col cols="auto">
        Comments:
        <v-chip class="ma-2">{{ post.comment_count }}</v-chip>
      </v-col>
      <v-spacer />
      <v-col cols="auto" class="mx-4">
        <v-btn @click="postOpen(post)"> Open </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { authorName } from "@/util";

export default {
  name: "PostCard",
  props: ["post"],
  computed: {
    authorName() {
      return authorName(this.post.author);
    },
  },
  methods: {
    async tagClicked(tag) {
      await this.$router.push({ query: { tag: tag } });
    },
    async authorClicked(author) {
      await this.$router.push({ query: { author: author.id } });
    },
    async postOpen(post) {
      await this.$router.push({
        path: `/post/${post.id}`,
      });
    },
  },
};
</script>
