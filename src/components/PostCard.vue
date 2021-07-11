<template>
  <v-card tile elevation="0">
    <div class="subtitle-2 pt-2 pl-4">
      {{ new Date(post.timestamp_created).toLocaleDateString() }}
    </div>
    <v-card-title class="pt-0">
      {{ post.title }}
    </v-card-title>
    <v-card-text>
      <div v-html="post.description" />
    </v-card-text>
    <v-subheader>
      Author:
      <v-chip link label class="ma-2" @click="authorClicked(post.author)">{{
        authorName
      }}</v-chip>
    </v-subheader>
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
  },
};
</script>
